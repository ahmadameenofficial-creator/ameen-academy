"""Deterministic, offline import of the pinned, redistributable upstream snapshot.

Preserve every source row. Missing repetitions/references stay missing; no
inferred religious claims. This script never fetches mutable remote data.
"""
from pathlib import Path
from collections import Counter
import hashlib
import json
import re
from curation import curate

ROOT = Path(__file__).resolve().parents[1]
COMMIT = "fbdfa017782c907fd0ca4ee2726060cbc527072f"
raw = (ROOT / "data/upstream/azkar.json").read_bytes()
rows = json.loads(raw)["rows"]

FEATURED = {
    "أذكار الصباح": ("morning", "sun", "ابدأ يومك بذكر الله", "daily"),
    "أذكار المساء": ("evening", "moon", "سكينة ترافق نهاية يومك", "daily"),
    "الأذكار بعد السلام من الصلاة": ("after-prayer", "prayer", "لحظات ذكر بعد كل صلاة", "prayer"),
    "أذكار النوم": ("sleep", "stars", "اختم يومك بقلب مطمئن", "daily"),
    "أذكار الاستيقاظ من النوم": ("waking", "sunrise", "ذكر مع أول لحظات اليوم", "daily"),
    "التسبيح، التحميد، التهليل، التكبير": ("tasbih", "sparkles", "كلمات قليلة، ومعانٍ عظيمة", "daily"),
}

def clean(value):
    # Upstream stores literal backslash-n sequences, not HTML.
    return str(value or "").replace("\\r\\n", "\n").replace("\\n", "\n").replace("\\r", "\n").strip()

def classify(title):
    if any(word in title for word in ["الصلاة", "السجود", "الركوع", "التشهد", "الوتر", "الوضوء", "المسجد", "الآذان", "الاستفتاح"]):
        return "prayer"
    if any(word in title for word in ["الحج", "المحرم", "الصفا", "المروة", "الجمار", "عرفة", "الحجر", "المشعر", "السفر", "المسافر", "الركوب", "القرية"]):
        return "travel"
    if "الرقية" in title or any(word in title for word in ["المريض", "وجعا", "عيادة", "المحتضر", "الميت", "القبور", "مصيبة", "دفن", "القبر", "التعزية"]):
        return "wellbeing"
    if any(word in title for word in ["الطعام", "الشراب", "المنزل", "الخلاء", "الثوب", "اللباس", "العطاس", "المجلس", "اﻟﻤﺠلس", "النوم", "الليل"]):
        return "daily"
    return "duas"

categories = []
entries = []
category_ids = {}
occurrences = Counter()
for row in rows:
    if len(row) != 6:
        raise ValueError("Unexpected source column count")
    title, text, note, count, reference, keywords = row
    title, text = clean(title), clean(text)
    if not title or not text:
        raise ValueError("Empty category or text")
    if title not in category_ids:
        feature = FEATURED.get(title)
        cid = feature[0] if feature else "c-" + hashlib.sha256(title.encode()).hexdigest()[:12]
        category_ids[title] = cid
        categories.append({
            "id": cid, "title": title,
            "icon": feature[1] if feature else "book",
            "description": feature[2] if feature else "أذكار وأدعية لكل لحظة",
            "group": feature[3] if feature else classify(title),
            "featured": bool(feature),
        })
    cid = category_ids[title]
    key = cid + ":" + text
    occurrences[key] += 1
    eid = "z-" + hashlib.sha256((key + ":" + str(occurrences[key])).encode()).hexdigest()[:16]
    repeat = int(count) if isinstance(count, int) and count > 0 else None
    if count not in (None, "") and repeat is None:
        raise ValueError(f"Invalid count: {count!r}")
    entries.append({
        "id": eid, "categoryId": cid, "text": text,
        "note": clean(note), "repeat": repeat, "reference": clean(reference),
        "keywords": clean(keywords), "sourceRow": len(entries) + 1,
    })

assert len(entries) == len(rows)
assert len({e["id"] for e in entries}) == len(entries)
(ROOT / "src/data").mkdir(parents=True, exist_ok=True)
(ROOT / "src/data/original-entries.json").write_text(json.dumps(entries, ensure_ascii=False, indent=2) + "\n")
categories, entries, corrections, migration, free_audit = curate(categories, entries)
assert len({e["id"] for e in entries}) == len(entries)
counts = Counter(e["categoryId"] for e in entries)
for category in categories:
    category["count"] = sum(counts[child] for child in category["children"]) if category.get("children") else counts[category["id"]]
featured_order = {value[0]: i for i, value in enumerate(FEATURED.values())}
categories.sort(key=lambda c: (not c["featured"], featured_order.get(c["id"], 0)))

output = {
    "version": 2,
    "source": {
        "name": "osamayy/azkar-db", "commit": COMMIT,
        "url": f"https://github.com/osamayy/azkar-db/tree/{COMMIT}",
        "sha256": hashlib.sha256(raw).hexdigest(),
        "permission": "Upstream README explicitly permits free use, modification and redistribution.",
        "religiousReview": "not-independently-verified",
        "originalRows": len(rows),
    },
    "categories": categories, "entries": entries,
}
(ROOT / "src/data").mkdir(parents=True, exist_ok=True)
(ROOT / "src/data/azkar.json").write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n")
(ROOT / "src/data/counter-migration.json").write_text(json.dumps(migration, ensure_ascii=False, indent=2) + "\n")
(ROOT / "data/corrections.json").write_text(json.dumps(corrections, ensure_ascii=False, indent=2) + "\n")
(ROOT / "data/free-counter-audit.json").write_text(json.dumps(free_audit, ensure_ascii=False, indent=2) + "\n")
report = {
    "sourceRows": len(rows), "importedEntries": len(entries), "categories": len(categories),
    "missingReferences": sum(not e["reference"] for e in entries),
    "missingRepetitions": sum(e["repeat"] is None for e in entries),
    "freeCounters": sum(e["counterKind"] == "free" for e in entries),
    "instructionCards": sum(e["counterKind"] == "instruction" for e in entries),
    "auditedOriginallyFreeCounters": len(free_audit),
    "correctedSourceRows": len(corrections),
    "textPreservation": "All 345 original rows preserved in original-entries.json. Explicit splits/corrections are recorded in corrections.json.",
    "independentReligiousReview": False,
}
(ROOT / "data/import-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
print(json.dumps(report, ensure_ascii=False, indent=2))

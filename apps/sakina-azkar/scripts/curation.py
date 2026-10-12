"""Explicit editorial corrections, separate from the immutable source snapshot.

Never derive a repetition count from arbitrary digits or reward descriptions.
Every correction identifies the original row and its reasoning/reference.
"""
import hashlib
from copy import deepcopy

PRAYER_GROUPS = [
    {"id": "after-prayer-fajr-maghrib", "title": "أذكار بعد الفجر والمغرب", "prayers": ["fajr", "maghrib"]},
    {"id": "after-prayer-dhuhr-asr-isha", "title": "أذكار بعد الظهر والعصر والعشاء", "prayers": ["dhuhr", "asr", "isha"]},
]

def curate(categories, original):
    by_row = {e["sourceRow"]: e for e in original}
    replacements = {}
    audit = []

    def part(row, key, text, repeat, title, note="", reference="", url="", kind=None, category=None, applies=None):
        base = by_row[row]
        cid = category or base["categoryId"]
        eid = "z-" + hashlib.sha256(f"curated:v2:{cid}:{row}:{key}".encode()).hexdigest()[:16]
        return {
            **base, "id": eid, "categoryId": cid, "text": text.strip(),
            "title": title, "repeat": repeat, "counterKind": kind or ("fixed" if repeat is not None else "free"),
            "note": note, "reference": reference or base["reference"],
            "referenceUrl": url, "appliesTo": applies or [], "curated": True,
        }

    def replace(row, parts, reason):
        replacements[row] = parts
        audit.append({"sourceRow": row, "reason": reason, "resultIds": [p["id"] for p in parts]})

    def formula(row):
        # Strip wrappers only on explicitly reviewed rows; never on Quran text.
        return by_row[row]["text"].removeprefix("((").split("))")[0].strip()

    # Post-prayer recipes: each independently counted formula has its own card.
    # The one-time tahlil variant below follows Muslim 593a, not the ambiguous
    # "three times" inserted into the upstream compound row.
    tahlil = "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ."
    for group in PRAYER_GROUPS:
        cid = group["id"]
        dawn_dusk = cid == "after-prayer-fajr-maghrib"
        specs = [
            (127, "istighfar", "أَسْتَغْفِرُ اللَّهَ.", 3, "الاستغفار", "", "صحيح مسلم 591", "https://sunnah.com/muslim:591"),
            (127, "salam", "اللَّهُمَّ أَنْتَ السَّلَامُ، وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ.", 1, "اللهم أنت السلام", "بعد الاستغفار ثلاثًا.", "حصن المسلم 66؛ صحيح مسلم 591", "https://sunnah.com/hisn:66"),
            (128, "tahlil", tahlil, 1, "التهليل بعد الصلاة", "هذه الصيغة مرة واحدة، ويتبعها الدعاء في البطاقة التالية.", "صحيح مسلم 593a", "https://sunnah.com/muslim:593a"),
            (128, "no-withholder", "اللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ، وَلَا مُعْطِيَ لِمَا مَنَعْتَ، وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ.", 1, "اللهم لا مانع لما أعطيت", "تتمة التهليل السابق، فُصلت لسهولة القراءة والعدّ.", "صحيح مسلم 593a", "https://sunnah.com/muslim:593a"),
            (129, "ibn-zubayr", formula(129), 1, "لا حول ولا قوة إلا بالله", "تُقرأ الصيغة كاملة كما وردت.", "حصن المسلم 68؛ صحيح مسلم 594", "https://sunnah.com/hisn:68"),
            (130, "tasbih", "سُبْحَانَ اللَّهِ.", 33, "التسبيح", "", "صحيح مسلم 597a", "https://sunnah.com/muslim:597a"),
            (130, "tahmid", "الْحَمْدُ لِلَّهِ.", 33, "التحميد", "", "صحيح مسلم 597a", "https://sunnah.com/muslim:597a"),
            (130, "takbir", "اللَّهُ أَكْبَرُ.", 33, "التكبير", "الصيغة المختارة هنا: 33 تسبيحة و33 تحميدة و33 تكبيرة، ثم التهليل تمام المائة.", "صحيح مسلم 597a", "https://sunnah.com/muslim:597a"),
            (130, "hundred", tahlil, 1, "تمام المائة", "بعد التسبيح والتحميد والتكبير.", "صحيح مسلم 597a", "https://sunnah.com/muslim:597a"),
            (132, "kursi", by_row[132]["text"].split("﴾")[0] + "﴾", 1, "آية الكرسي", "عقب كل صلاة مفروضة.", "البقرة 255؛ حصن المسلم 71", "https://sunnah.com/hisn:71"),
        ]
        for row, key, text, repeat, title, note, reference, url in specs:
            replacements.setdefault(row, []).append(part(row, key, text, repeat, title, note, reference, url, category=cid))
        for source_row, title in [(2, "سورة الإخلاص"), (3, "سورة الفلق"), (4, "سورة الناس")]:
            replacements.setdefault(131, []).append(part(
                131, title, by_row[source_row]["text"], 3 if dawn_dusk else 1, title,
                "تُقرأ كل سورة ثلاث مرات بعد الفجر والمغرب، ومرة بعد الظهر والعصر والعشاء.",
                f"{title}؛ حصن المسلم 70", "https://sunnah.com/hisn:70", category=cid))
        if dawn_dusk:
            replacements[133] = [part(133, "ten", formula(133), 10, "التهليل عشر مرات", "بعد الفجر والمغرب.", "حصن المسلم 72", "https://sunnah.com/hisn:72", category=cid)]
            replacements[134] = [part(134, "beneficial-knowledge", formula(134), 1, "دعاء خاص بالفجر", "هذا الدعاء بعد الفجر فقط، ويُخفى عند اختيار المغرب.", "حصن المسلم 73؛ ابن ماجه", "https://sunnah.com/hisn:73", category=cid, applies=["fajr"])]
    for row in range(127, 135):
        audit.append({"sourceRow": row, "reason": "Separated prayer recipe, verified counts and prayer applicability against Muslim and Hisn 66–73.", "resultIds": [p["id"] for p in replacements[row]]})

    # Counts explicitly present in the text but absent from the numeric column.
    for row, text, count, title in [
        (94, "سُبْحَانَ رَبِّيَ الْعَظِيمِ.", 3, "تسبيح الركوع"),
        (102, "سُبْحَانَ رَبِّيَ الْأَعْلَى.", 3, "تسبيح السجود"),
        (167, formula(167), 3, "دعاء عند الخوف من السلطان"),
        (232, "رَبِّ اغْفِرْ لِي، وَتُبْ عَلَيَّ، إِنَّكَ أَنْتَ التَّوَّابُ الْغَفُورُ.", 100, "الاستغفار في المجلس"),
        (291, "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.", 100, "التسبيح مائة مرة"),
        (292, tahlil, 10, "التهليل عشر مرات"),
        (295, "سُبْحَانَ اللَّهِ.", 100, "مائة تسبيحة"),
    ]:
        replace(row, [part(row, "counted", text, count, title, by_row[row]["text"] if row in [232,291,292,295] else "العدد مذكور صراحة في النص الأصلي.")], "Explicit repetition moved from source text into the counter; narration retained as note.")

    replace(92, [
        part(92, "takbir", "اللَّهُ أَكْبَرُ كَبِيرًا.", 3, "التكبير في الاستفتاح"),
        part(92, "tahmid", "الْحَمْدُ لِلَّهِ كَثِيرًا.", 3, "التحميد في الاستفتاح"),
        part(92, "tasbih", "سُبْحَانَ اللَّهِ بُكْرَةً وَأَصِيلًا.", 3, "التسبيح في الاستفتاح"),
        part(92, "refuge", "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ: مِنْ نَفْخِهِ، وَنَفْثِهِ، وَهَمْزِهِ.", 1, "الاستعاذة", kind="reading"),
    ], "Separate the repeated opening formulas; do not repeat the already-repeated source paragraph three more times.")

    bedtime_note = "تجمع كفيك وتنفث فيهما، ثم تقرأ السور الثلاث وتمسح ما استطعت من جسدك، وتكرر هذه الدورة ثلاث مرات. لكل سورة عدّاد مستقل لمتابعة القراءة."
    replace(136, [part(136, str(row), by_row[row]["text"], 3, title, bedtime_note, "صحيح البخاري 5017", "https://sunnah.com/bukhari:5017") for row,title in [(2,"سورة الإخلاص قبل النوم"),(3,"سورة الفلق قبل النوم"),(4,"سورة الناس قبل النوم")]], "Separate three Quran recitations, retaining the complete ritual instruction in the notes.")
    replace(143, [part(143, "tasbih", "سُبْحَانَ اللَّهِ.", 33, "التسبيح قبل النوم"), part(143, "tahmid", "الْحَمْدُ لِلَّهِ.", 33, "التحميد قبل النوم"), part(143, "takbir", "اللَّهُ أَكْبَرُ.", 34, "التكبير قبل النوم")], "Bedtime has 33/33/34; do not use the post-prayer 33/33/33 recipe.")
    replace(109, [part(109, "forgiveness", "رَبِّ اغْفِرْ لِي.", None, "بين السجدتين", "ورد اللفظ مكررًا في النص الأصلي؛ لا نضع عددًا حصريًا، وكل ضغطة هنا تقابل قول العبارة مرة واحدة.")], "Keep the unbounded supplication free, but remove inline duplication so each tap represents one utterance.")
    replace(207, [part(207, "rain", "اللَّهُمَّ أَغِثْنَا.", 3, "دعاء الاستسقاء", "اللفظ مكرر ثلاثًا في النص الأصلي.")], "Move the three explicit repeated utterances into a single-formula counter.")
    riding = by_row[243]["text"]
    riding_verse = "﴿" + riding.split("﴿")[1].split("﴾")[0] + "﴾"
    replace(243, [
        part(243, "begin", "بِسْمِ اللَّهِ، وَالْحَمْدُ لِلَّهِ.", 1, "عند الركوب", kind="reading"),
        part(243, "verse", riding_verse, 1, "دعاء الركوب", kind="reading"),
        part(243, "praise", "الْحَمْدُ لِلَّهِ.", 3, "التحميد عند الركوب"),
        part(243, "greatness", "اللَّهُ أَكْبَرُ.", 3, "التكبير عند الركوب"),
        part(243, "forgiveness", "سُبْحَانَكَ اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي؛ فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ.", 1, "الاستغفار عند الركوب", kind="reading"),
    ], "Separate riding instructions and repeated hamd/takbir; do not count an entire five-part paragraph as one free chant.")
    travel = by_row[244]["text"]
    travel_body = "﴿" + travel.split("﴿", 1)[1].split("، وإذا", 1)[0]
    replace(244, [part(244, "greatness", "اللَّهُ أَكْبَرُ.", 3, "التكبير في بداية السفر"), part(244, "travel", travel_body, 1, "دعاء السفر", "عند الرجوع يقول الدعاء ويزيد: آيبون، تائبون، عابدون، لربنا حامدون.", kind="reading")], "Separate three opening takbirs from the travel supplication; returning-only text is an explicit note.")
    replace(156, [part(156, "subhan", "سُبْحَانَ الْمَلِكِ الْقُدُّوسِ.", 3, "الذكر بعد الوتر", "في الثالثة يجهر بها ويمد صوته، كما في النص الأصلي."), part(156, "angels", "رَبِّ الْمَلَائِكَةِ وَالرُّوحِ.", 1, "تتمة المرة الثالثة", kind="reading")], "A three-time dhikr and its final appendage need distinct counters.")
    replace(254, [part(254, "takbir", "اللَّهُ أَكْبَرُ.", 3, "التكبير عند الرجوع من السفر", "على كل شرف، ثم الدعاء في البطاقة التالية."), part(254, "return", by_row[254]["text"].split("ثُمَّ يَقُولُ: ")[1].split("))")[0], 1, "دعاء الرجوع من السفر", kind="reading")], "Do not attach the takbir count to the entire travel supplication.")
    replace(273, [part(273, "approach", "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ. أَبْدَأُ بِمَا بَدَأَ اللَّهُ بِهِ.", 1, "عند الدنو من الصفا", "عند الدنو من الصفا أول مرة.", kind="reading"), part(273, "tahlil", "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ، أَنْجَزَ وَعْدَهُ، وَنَصَرَ عَبْدَهُ، وَهَزَمَ الْأَحْزَابَ وَحْدَهُ.", 3, "الذكر على الصفا والمروة", "يستقبل القبلة ويدعو بين التكرارات، ويفعل على المروة مثل ما فعل على الصفا.")], "Separate initial approach text from the repeated formula and retain instructions.")
    for row in [280,318]:
        replace(row, [part(row, "bismillah", "بِسْمِ اللَّهِ.", 3, "التسمية عند الألم", "ضع يدك على موضع الألم، ثم الذكر في البطاقة التالية.", "صحيح مسلم 2202", "https://sunnah.com/muslim:2202"), part(row, "refuge", "أَعُوذُ بِاللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ.", 7, "الاستعاذة عند الألم", "", "صحيح مسلم 2202", "https://sunnah.com/muslim:2202")], "Separate the 3-time and 7-time formulas; one combined free counter is incorrect.")

    # Open-ended praise remains genuinely free; the number of phrases in a
    # narration is not a prescribed repetition count.
    for row, words in [(298, ["سُبْحَانَ اللَّهِ.", "الْحَمْدُ لِلَّهِ.", "لَا إِلَهَ إِلَّا اللَّهُ.", "اللَّهُ أَكْبَرُ."]), (302, ["سُبْحَانَ اللَّهِ.", "الْحَمْدُ لِلَّهِ.", "لَا إِلَهَ إِلَّا اللَّهُ.", "اللَّهُ أَكْبَرُ.", "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ."]), (301,["الْحَمْدُ لِلَّهِ.", "لَا إِلَهَ إِلَّا اللَّهُ."])]:
        replace(row, [part(row, str(i), text, None, "ذكر مطلق", by_row[row]["text"]) for i,text in enumerate(words)], "Separate freely repeatable formulas; do not turn 'four phrases' into four repetitions.")

    # These are instructions/narrations, not words to chant repeatedly.
    instruction_rows = {85,87,151,175,186,236,256,262,276,279,281,285,286,290,303,304,339,340,341,342,343,344,345}
    for row in instruction_rows:
        if by_row[row]["repeat"] is None and row not in replacements:
            e = deepcopy(by_row[row]); e["counterKind"] = "instruction"; e["repeat"] = None
            e["curated"] = True; replacements[row] = [e]
            audit.append({"sourceRow": row, "reason": "Instruction or narration, not a chant; suppress the misleading free counter.", "resultIds": [e["id"]]})

    result = []
    migration = {}
    for entry in original:
        parts = replacements.get(entry["sourceRow"])
        if parts:
            result.extend(parts)
            # Keep bookmarks for corrected content. For prayer duplicates,
            # choose the first group instead of bookmarking identical copies.
            primary = [p for p in parts if not p["categoryId"].startswith("after-prayer-") or p["categoryId"] == PRAYER_GROUPS[0]["id"]]
            migration[entry["id"]] = [p["id"] for p in primary]
        else:
            result.append({**entry, "counterKind": "fixed" if entry["repeat"] is not None else "free"})

    for category in categories:
        if category["id"] == "after-prayer":
            category.update({"title": "أذكار بعد الصلاة", "children": [g["id"] for g in PRAYER_GROUPS]})
    for group in PRAYER_GROUPS:
        categories.append({**group, "icon": "prayer", "description": "نصوص منفصلة، وعدّاد مستقل لكل ذكر وصلاة", "group": "prayer", "featured": False})

    free_audit = [{"sourceRow": e["sourceRow"], "resultIds": [p["id"] for p in result if p["sourceRow"] == e["sourceRow"]], "classification": sorted(set(p["counterKind"] for p in result if p["sourceRow"] == e["sourceRow"])), "reason": next((a["reason"] for a in audit if a["sourceRow"] == e["sourceRow"]), "No explicit repetition target in upstream; remains free without inventing a religious count.")} for e in original if e["repeat"] is None]
    return categories, result, audit, migration, free_audit

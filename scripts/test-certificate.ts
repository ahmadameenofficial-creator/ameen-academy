// سكريبت معايرة مؤقت — بيولّد شهادتين تجريبيتين للمراجعة البصرية
import { writeFileSync } from "fs";
import { generateCertificatePDF } from "../src/lib/certificate";

async function main() {
const free = await generateCertificatePDF({
  studentName: "أحمد محمد عبد الرحمن",
  certificateCode: "AMN-1A2B3C4D",
  issuedAt: new Date(),
  isPaid: false,
});
writeFileSync("test-free.pdf", free);

const paid = await generateCertificatePDF({
  studentName: "Sara Mahmoud",
  certificateCode: "AMN-9F8E7D6C",
  issuedAt: new Date(),
  isPaid: true,
});
writeFileSync("test-paid.pdf", paid);

console.log("generated: test-free.pdf, test-paid.pdf");
}
main();

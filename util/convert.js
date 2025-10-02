const fs = require("fs");
const path = require("path");
const iconv = require("iconv-lite");

const filePath = path.join(__dirname, "법정동코드 전체자료.txt");

const buffer = fs.readFileSync(filePath);
const data = iconv.decode(buffer, "euc-kr");

const lines = data.trim().split("\n");

const json = lines.slice(1).map(line => {
    let parts = line.includes("|") ? line.split("|") : line.split("\t");
    if (parts.length < 3) return null;

    const [code, name, status] = parts;

    if (status && status.trim() === "폐지") return null;

    const seg = name.trim().split(" ");
    return {
        city: seg[0],
        district: seg[1],
        neighborhood: seg.slice(2).join(" "),
        code: code
    };
}).filter(Boolean);

const outputPath = path.join(__dirname, "locations.json");
fs.writeFileSync(outputPath, JSON.stringify(json, null, 2), "utf-8");

console.log("변환 완료! locations.json 파일이 생성되었습니다.");

// TABAKBO 앱 아이콘/스플래시용 로고를 만든다.
// 기타 TAB 악보의 "줄(현) 6개 + 프렛 마커 1개"를 형상화한 심플한 2톤 아이콘.
// 배경은 투명하게 두고(흰색 도형만), @capacitor/assets 의 --iconBackgroundColor 로
// 파란 배경을 합성한다 (Easy Mode).
const sharp = require("sharp");
const path = require("path");

const SIZE = 1024;
const STRING_COUNT = 6;
const TOP = 262;
const BOTTOM = 762;
const LEFT = 192;
const RIGHT = 832;
const STROKE = 26;

const gap = (BOTTOM - TOP) / (STRING_COUNT - 1);
let lines = "";
for (let i = 0; i < STRING_COUNT; i++) {
  const y = TOP + gap * i;
  lines += `<line x1="${LEFT}" y1="${y}" x2="${RIGHT}" y2="${y}" stroke="white" stroke-width="${STROKE}" stroke-linecap="round" />\n`;
}

// 가운데(3번째) 줄 위에 프렛 마커(원)를 얹어 기타 지판 인레이 느낌을 준다.
const markerY = TOP + gap * 2;
const marker = `<circle cx="512" cy="${markerY}" r="78" fill="white" />`;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  ${lines}
  ${marker}
</svg>
`;

const outDir = path.join(__dirname, "..", "assets");
sharp(Buffer.from(svg))
  .resize(SIZE, SIZE)
  .png()
  .toFile(path.join(outDir, "logo.png"))
  .then(() => console.log("wrote assets/logo.png"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

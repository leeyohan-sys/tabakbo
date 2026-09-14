// 저장소 루트의 index.html(웹 버전, GitHub Pages에서 서비스되는 것과 동일한 파일)을
// 그대로 www/ 에 복사한다. 앱과 웹이 하나의 소스 파일을 공유하도록 하기 위함이며,
// 네이티브 전용 코드는 index.html 안에서 window.TabakboNative 유무로 분기한다.
const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "..", "index.html");
const dest = path.join(__dirname, "www", "index.html");

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.copyFileSync(src, dest);
console.log(`copied ${src} -> ${dest}`);

const vendorSrc = path.join(__dirname, "..", "vendor");
const vendorDest = path.join(__dirname, "www", "vendor");
fs.mkdirSync(vendorDest, { recursive: true });
for (const file of fs.readdirSync(vendorSrc)) {
  fs.copyFileSync(path.join(vendorSrc, file), path.join(vendorDest, file));
}
console.log(`copied ${vendorSrc} -> ${vendorDest}`);

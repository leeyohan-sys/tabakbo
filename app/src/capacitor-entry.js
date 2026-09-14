// 이 파일은 esbuild로 번들되어 www/capacitor-bridge.js 로 출력됩니다.
// index.html(웹 버전)에서는 이 파일이 존재하지 않으므로 <script> 태그가 그냥
// 무시되고, window.TabakboNative 도 정의되지 않아 항상 웹(브라우저) 경로로 동작합니다.
import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

window.TabakboNative = {
  isNative: () => Capacitor.isNativePlatform(),
  Filesystem,
  Directory,
  Encoding,
};

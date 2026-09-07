"""pywebview에서 JS가 호출하는 파이썬 API (저장/불러오기/내보내기)."""
import base64
import os

import webview

JSON_FILE_TYPES = ("Tab 파일 (*.json)", "모든 파일 (*.*)")
TEXT_FILE_TYPES = ("텍스트 파일 (*.txt)", "모든 파일 (*.*)")
PNG_FILE_TYPES = ("PNG 이미지 (*.png)", "모든 파일 (*.*)")


def _first_path(result):
    if not result:
        return None
    return result[0] if isinstance(result, (list, tuple)) else result


class Api:
    def save_tab(self, data_json):
        window = webview.windows[0]
        result = window.create_file_dialog(
            webview.SAVE_DIALOG, save_filename="tab.json", file_types=JSON_FILE_TYPES
        )
        path = _first_path(result)
        if not path:
            return {"status": "cancelled"}
        if not path.lower().endswith(".json"):
            path += ".json"
        with open(path, "w", encoding="utf-8") as f:
            f.write(data_json)
        return {"status": "ok", "path": path}

    def load_tab(self):
        window = webview.windows[0]
        result = window.create_file_dialog(webview.OPEN_DIALOG, file_types=JSON_FILE_TYPES)
        path = _first_path(result)
        if not path:
            return {"status": "cancelled"}
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        return {"status": "ok", "data": content, "filename": os.path.basename(path)}

    def export_text(self, text_content):
        window = webview.windows[0]
        result = window.create_file_dialog(
            webview.SAVE_DIALOG, save_filename="tab.txt", file_types=TEXT_FILE_TYPES
        )
        path = _first_path(result)
        if not path:
            return {"status": "cancelled"}
        if not path.lower().endswith(".txt"):
            path += ".txt"
        with open(path, "w", encoding="utf-8") as f:
            f.write(text_content)
        return {"status": "ok", "path": path}

    def export_image(self, data_url):
        window = webview.windows[0]
        result = window.create_file_dialog(
            webview.SAVE_DIALOG, save_filename="tab.png", file_types=PNG_FILE_TYPES
        )
        path = _first_path(result)
        if not path:
            return {"status": "cancelled"}
        if not path.lower().endswith(".png"):
            path += ".png"
        try:
            _, encoded = data_url.split(",", 1)
            with open(path, "wb") as f:
                f.write(base64.b64decode(encoded))
            return {"status": "ok", "path": path}
        except Exception as e:
            return {"status": "error", "message": str(e)}

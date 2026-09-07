import os

import webview

from api import Api

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def main():
    api = Api()
    webview.create_window(
        "TABAKBO - 기타 탭 악보 편집기",
        os.path.join(BASE_DIR, "ui", "index.html"),
        js_api=api,
        width=1100,
        height=750,
        min_size=(800, 500),
    )
    webview.start()


if __name__ == "__main__":
    main()

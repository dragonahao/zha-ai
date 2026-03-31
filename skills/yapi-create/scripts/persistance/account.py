import json
import os

ACCOUNT_JSON_PATH = os.path.join(os.path.dirname(__file__), "account.json")
def load_account():
    if os.path.exists(ACCOUNT_JSON_PATH):
        with open(ACCOUNT_JSON_PATH, 'r', encoding='utf-8') as f:
            content = f.read().strip()
            if not content:
                return None, None
            v: dict = json.loads(content)
            if (v is not None) and ("userName" in v and "userPwd" in v):
                return v.get("userName"), v.get("userPwd")
    return None, None


def save_account(userName:str,userPwd:str):
    with open(ACCOUNT_JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump({"userName":userName,"userPwd":userPwd}, f, ensure_ascii=False, indent=2)


def clear_account():
    with open(ACCOUNT_JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump({}, f)

from playwright.sync_api import sync_playwright
import json
import os

def load_env_file(env_path=".yapi-env"):
    username = None
    password = None
    if os.path.exists(env_path):
        with open(env_path, 'r') as f:
            for line in f:
                line = line.strip()
                if line.startswith('YAPI_USERNAME=') or line.startswith('userName='):
                    username = line.split('=', 1)[1].strip()
                elif line.startswith('YAPI_PASSWORD=') or line.startswith('userPwd='):
                    password = line.split('=', 1)[1].strip()
    return username, password

def yapi_bean(user_url, user_name=None, user_pwd=None, env_path=".yapi-env"):
    login_url="https://yapi.lucahealthcare.cn/login"
    
    if not user_name or not user_pwd:
        user_name, user_pwd = load_env_file(env_path)
    
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(user_url)
        print(f"userUrl is {user_url},page.url is {page.url}")
        page.wait_for_timeout(3000)
        
        # 检查是否需要登录
        if  page.url.count(user_url) == 0:
            if(user_name is None or user_pwd is None):
                print("登录失败，请重新输入账号和密码")
                return "登录失败，请重新输入账号和密码"
            print(f"userUrl is {user_url},page.url is {page.url}")
            page.locator("a[href=\"/login\"]").first.click()
            print("点击登录链接")
            page.fill("#email", user_name)
            page.fill("#password", user_pwd)
            page.click("button[type='submit']")
            print("登录完成，等待页面加载...")
            page.wait_for_timeout(1000)
            if page.url.count(login_url) == 1:
                return "登录失败，请重新输入账号和密码"
            else:
                print("登录成功，重新访问接口页面...")
                page.goto(user_url)
                page.wait_for_timeout(1000)
        
        # 获取接口信息
        try:

            # 需要循环展开
            while page.locator(".ant-table-row-collapsed").count() > 0:
                page.locator(".ant-table-row-collapsed").first.click()
            print("接口详情已加载")

            api_data = page.evaluate('''() => {
                // 获取接口标题
                const title = document.querySelector('.interface-title, .title, h2, [class*="title"]')?.textContent?.trim() || '';
                
                // 获取请求方法
                const method = document.querySelector('.method, .ant-badge, [class*="method"]')?.textContent?.trim() || '';
                
                // 获取请求路径
                const path = document.querySelector('.path, .url, [class*="path"]')?.textContent?.trim() || '';
                
                // 尝试从页面中获取更多信息
                const allText = document.querySelector(".caseContainer").innerText;
                
                return {
                    title: title,
                    method: method,
                    path: path,
                    allText: allText
                };
            }''')
            print(json.dumps(api_data, ensure_ascii=False, indent=2))

            print(api_data["allText"])
            return api_data
        except Exception as e:
            print(f"获取接口信息失败，需要登录: {e}")
            return "获取接口信息失败，需要登录"

if __name__ == "__main__":
    import sys
    args = sys.argv[1:]
    url = args[0] if args else "https://yapi.lucahealthcare.cn/project/306/interface/api/19937"
    username = args[1] if len(args) > 1 else None
    password = args[2] if len(args) > 2 else None
    yapi_env_path = args[3] if len(args) > 3 else None
    result = yapi_bean(url, username, password, yapi_env_path)
    if result:
        print(f"{result}")

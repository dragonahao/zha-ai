import { chromium, Browser, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export interface YapiApiData {
  title: string;
  method: string;
  path: string;
  allText: string;
}

export interface Account {
  username: string;
  password: string;
}

function getAccountPath(): string {
  const dir = path.join(os.homedir(), '.yapi-create');
  return path.join(dir, 'account.json');
}

function loadAccount(): Account | null {
  try {
    const accountPath = getAccountPath();
    if (fs.existsSync(accountPath)) {
      const data = fs.readFileSync(accountPath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Failed to load account:', error);
  }
  return null;
}

function saveAccount(username: string, password: string): void {
  try {
    const dir = path.join(os.homedir(), '.yapi-create');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const account: Account = { username, password };
    fs.writeFileSync(getAccountPath(), JSON.stringify(account, null, 2));
  } catch (error) {
    console.error('Failed to save account:', error);
  }
}

function clearAccount(): void {
  try {
    const accountPath = getAccountPath();
    if (fs.existsSync(accountPath)) {
      fs.unlinkSync(accountPath);
    }
  } catch (error) {
    console.error('Failed to clear account:', error);
  }
}

function loadEnvFile(envPath: string = 'yapi.env'): { username?: string; password?: string } {
  let username: string | undefined = undefined;
  let password: string | undefined = undefined;

  if (!envPath || !fs.existsSync(envPath)) {
    return { username, password };
  }

  try {
    const content = fs.readFileSync(envPath, 'utf-8');
    const lines = content.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('userName=') || trimmed.startsWith('userName=')) {
        username = trimmed.split('=', 1)[1].trim();
      } else if (trimmed.startsWith('userPwd=') || trimmed.startsWith('userPwd=')) {
        password = trimmed.split('=', 1)[1].trim();
      }
    }
  } catch (error) {
    console.error('Failed to load env file:', error);
  }

  return { username, password };
}

export async function yapiCreate(
  userUrl: string,
  userName?: string,
  userPwd?: string,
  envPath: string = 'yapi.env'
): Promise<YapiApiData | string> {
  const loginUrl = 'https://yapi.lucahealthcare.cn/login';

  let username = userName;
  let password = userPwd;
  let browser: Browser | null = null;

  if (!username || !password) {
    const savedAccount = loadAccount();
    if (savedAccount) {
      username = savedAccount.username;
      password = savedAccount.password;
    } else {
      const envData = loadEnvFile(envPath);
      username = envData.username;
      password = envData.password;
    }
  }
  if (!username || !password) {
    clearAccount();
    return '登录失败，请重新输入账号和密码';
  }

  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(userUrl);
    await page.waitForTimeout(3000);

    const currentUrl = page.url();

    if (!currentUrl.includes(userUrl.split('/').pop() || '')) {

      await page.click('a[href="/login"]');
      await page.fill('#email', username);
      await page.fill('#password', password);
      await page.click('button[type="submit"]');

      await page.waitForTimeout(1000);

      if (page.url().includes('login')) {
        clearAccount();
        return '登录失败，请重新输入账号和密码';
      } else {
        saveAccount(username, password);
        await page.goto(userUrl);
        await page.waitForTimeout(1000);
      }
    }

    try {
      let collapsedCount = await page.locator('.ant-table-row-collapsed').count();
      while (collapsedCount > 0) {
        await page.locator('.ant-table-row-collapsed').first().click();
        await page.waitForTimeout(500);
        collapsedCount = await page.locator('.ant-table-row-collapsed').count();
      }

      const apiData = await page.evaluate((): YapiApiData => {
        const titleElement = document.querySelector('.interface-title, .title, h2, [class*="title"]');
        const methodElement = document.querySelector('.method, .ant-badge, [class*="method"]');
        const pathElement = document.querySelector('.path, .url, [class*="path"]');
        const allTextElement = document.querySelector('.caseContainer');

        return {
          title: titleElement?.textContent?.trim() || '',
          method: methodElement?.textContent?.trim() || '',
          path: pathElement?.textContent?.trim() || '',
          allText: allTextElement?.textContent?.trim() || ''
        };
      });

      return apiData;
    } catch (error) {
      console.error('Error extracting API data:', error);
      return '获取接口信息失败，需要登录';
    }
  } catch (error) {
    console.error('Browser error:', error);
    return '获取接口信息失败，需要登录';
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}



async function main() {
  const args = process.argv.slice(2);
  const url = args[0] || 'https://yapi.lucahealthcare.cn/project/306/interface/api/19937';
  const username = args[1] || undefined;
  const password = args[2] || undefined;
  const envPath = args[3] || 'yapi.env';

  const result = await yapiCreate(url, username, password, envPath);
  console.log(JSON.stringify(result, null, 2));
}

if (require.main === module) {
  main();
}

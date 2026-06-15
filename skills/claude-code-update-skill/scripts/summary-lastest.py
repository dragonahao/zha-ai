import asyncio
from playwright.async_api import async_playwright
import re

async def get_latest_update_summary():
    """Fetch the latest Claude version update summary using Playwright and format as table."""
    url = "https://code.claude.com/docs/zh-CN/whats-new"
    
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        
        try:
            await page.goto(url, wait_until="networkidle")
            
            # Wait for the first div with class="update"
            await page.wait_for_selector('div.update', timeout=10000)
            
            # Extract all update divs
            update_elements = await page.locator('div.update').all()
            
            if not update_elements:
                return "No update information found"
            
            # Format as markdown table
            table = "| 版本范围 | 摘要 |\n|--------|------|\n"
            
            column_split="<br>"
            
            # Iterate through all update elements
            for update in update_elements:
                # Get direct children divs only (using CSS selector "> div")
                child_divs = await update.locator('> div').all()
                
                if len(child_divs) >= 2:
                    # Extract content from first div (left column)
                    col1_elem = child_divs[0]
                    
                    # Extract Week label
                    week_label = await col1_elem.locator('[data-component-part="update-label"]').text_content()
                    week_label = week_label.strip() if week_label else ''
                    
                    # Extract version range
                    version_range = await col1_elem.locator('[data-component-part="update-tag"]').text_content()
                    version_range = version_range.strip() if version_range else ''
                    
                    # Extract date range
                    date_range = await col1_elem.locator('[data-component-part="update-description"]').text_content()
                    date_range = date_range.strip() if date_range else ''
                    
                    # Format col1 with line breaks
                    col1 = f"{week_label}{column_split}{version_range}{column_split}{date_range}"
                    
                    # Extract content from second div (right column)
                    col2 = await child_divs[1].text_content()
                    col2 = col2.strip() if col2 else 'N/A'
                    col2 = re.sub(r'\s+', ' ', col2)
                    
                    table += f"| {col1} | {col2} |\n"
            
            return table
        
        except Exception as e:
            return f"Error fetching the page: {e}"
        
        finally:
            await browser.close()

if __name__ == "__main__":
    result = asyncio.run(get_latest_update_summary())
    print(result)
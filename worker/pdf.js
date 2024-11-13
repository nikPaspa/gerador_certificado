const puppeteer = require("puppeteer");
const fs = require("fs").promises;
const path = require("path");

async function generatePDF(data) {
  try {
    let template = await fs.readFile(
      path.join(__dirname, "template.html"),
      "utf-8"
    );

    for (const [key, value] of Object.entries(data)) {
      const placeholder = `{{${key}}}`;
      template = template.replace(new RegExp(placeholder, "g"), value);
    }

    const browser = await puppeteer.launch({
      headless: "new",
    });
    const page = await browser.newPage();

    await page.setContent(template, {
      waitUntil: "networkidle0",
    });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    });

    await browser.close();
    return pdf;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
}

async function savePDF(pdf, name) {
  await fs.writeFile(name, pdf);
}

module.exports = { generatePDF, savePDF };

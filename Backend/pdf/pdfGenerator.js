import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import puppeteer from "puppeteer";

export const generatePDFBuffer = async (data) => {
  const templatePath = path.resolve("pdf/pdfTemplate.html");
  const html = fs.readFileSync(templatePath, "utf8");

  const template = handlebars.compile(html);
  const finalHTML = template(data);

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(finalHTML, { waitUntil: "networkidle0" });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();
  return pdf;
};

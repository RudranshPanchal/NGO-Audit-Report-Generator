
# NGO Audit Report Generator (MERN + AI + Puppeteer)

A production-ready audit report automation tool for NGOs. Generates downloadable professional PDF reports using Handlebars templates rendered through Puppeteer. Includes AI-based assistance for auto-filling financial data.

## Tech Stack
- **Frontend:** React (Vite), Tailwind / CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (future enhancement)
- **PDF Engine:** Puppeteer + Handlebars
- **Hosting:** (to be added)

## Features
✔ Generate professional CA-audit-style PDF  
✔ Upload organization data + financial details  
✔ AI-assisted fields (optional)  
✔ Custom logo + template support  
✔ Fully offline export — no watermark  

## Project Structure
Backend/
Frontend/

shell
Copy code

## Start Development
cd Backend
npm install
npm start

cd Frontend
npm install
npm run dev

bash
Copy code

## Environment Variables
Create `.env` in Backend:
AI_API_KEY=XXXXXXXX
PORT=5000

markdown
Copy code

## Contributors
- Your Name

```

NGO Report generator
├─ 📁Backend
│  ├─ 📁controllers
│  │  └─ 📄reportController.js
│  ├─ 📁node_modules
│  ├─ 📁pdf
│  │  ├─ 📁assets
│  │  │  └─ 📄caLogo.png
│  │  ├─ 📄multerConfig.js
│  │  ├─ 📄parseReport.js
│  │  ├─ 📄pdfController.js
│  │  ├─ 📄pdfGenerator.js
│  │  └─ 📄pdfTemplate.html
│  ├─ 📁routes
│  │  ├─ 📄pdfRoute.js
│  │  └─ 📄reportRoute.js
│  ├─ 📁utils
│  │  └─ 📄helper.js
│  ├─ 📄.env
│  ├─ 📄package-lock.json
│  ├─ 📄package.json
│  └─ 📄server.js
├─ 📁Frontend
│  ├─ 📁node_modules
│  ├─ 📁public
│  │  └─ 📄vite.svg
│  ├─ 📁src
│  │  ├─ 📁assets
│  │  │  └─ 📄react.svg
│  │  ├─ 📁components
│  │  │  ├─ 📄FakeDataFiller.jsx
│  │  │  ├─ 📄Loader.jsx
│  │  │  ├─ 📄ReportForm.jsx
│  │  │  └─ 📄ReportFormOLD.jsx
│  │  ├─ 📁pages
│  │  │  └─ 📄GenerateReport.jsx
│  │  ├─ 📁utils
│  │  │  └─ 📄pdfGenerator.js
│  │  ├─ 📄App.css
│  │  ├─ 📄App.jsx
│  │  ├─ 📄index.css
│  │  ├─ 📄main.jsx
│  │  └─ 📄report-pdf.css
│  ├─ 📄.gitignore
│  ├─ 📄eslint.config.js
│  ├─ 📄index.html
│  ├─ 📄package-lock.json
│  ├─ 📄package.json
│  ├─ 📄README.md
│  └─ 📄vite.config.js
├─ 📄.gitignore
└─ 📄README.md
```

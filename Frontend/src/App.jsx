import { useState, useRef } from "react";
import ReportForm from "./components/ReportForm";
import Loader from "./components/Loader";
import html2pdf from "html2pdf.js";
import { marked } from "marked";
import "./report-pdf.css";


function App() {
  const [reportText, setReportText] = useState("");
  const [htmlReport, setHtmlReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [isReportReady, setIsReportReady] = useState(false);
  const formDataRef = useRef({});


  const handleGenerateReport = async (formData) => {
    try {
      setLoading(true);
      setReportText("");
      setHtmlReport("");
      setIsReportReady(false);
      formDataRef.current = formData;

      const res = await fetch("http://localhost:5000/api/report/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setReportText(data.reportText);

      const html = marked.parse(data.reportText);
      setHtmlReport(html);

      setIsReportReady(true);

    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    const payload = {
      ngoName: formDataRef.current.ngoName,
      financialYear: formDataRef.current.financialYear,
      financialYearStart: formDataRef.current.financialYearStart,
      financialYearEnd: formDataRef.current.financialYearEnd,
      auditorName: formDataRef.current.auditorName,
      firmName: formDataRef.current.firmName,
      firmAddress: formDataRef.current.firmAddress,
      membershipNumber: formDataRef.current.membershipNumber,
      presidentName: formDataRef.current.presidentName,
      presidentDate: formDataRef.current.presidentDate,
      auditorDate: formDataRef.current.auditorDate,
      reportHTML: htmlReport,
    };

    const res = await fetch("http://localhost:5000/api/report/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "NGO_Audit_Report_Professional.pdf";
    a.click();
  };

  return (
    <>
      {/* pass flags so your form can switch button text if you want */}
      <ReportForm
        onGenerateReport={handleGenerateReport}
        loading={loading}
        isReportReady={isReportReady}
        downloadPDF={downloadPDF}
      />

      {/* PREVIEW AREA THAT html2pdf USES */}

      {/* {loading && <Loader />}

      {htmlReport && (
        <div className="mt-10 flex justify-center">
          <div
            id="report-preview"
            className="shadow-xl"
          >
            <div dangerouslySetInnerHTML={{ __html: htmlReport }} />
          </div>
        </div>
      )} */}

    </>
  );
}


export default App;

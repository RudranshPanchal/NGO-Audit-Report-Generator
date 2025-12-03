import { useState, useRef } from "react";
import ReportForm from "./components/ReportForm/ReportForm";
import { marked } from "marked";
import { API_BASE } from "./config/api";

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

      const res = await fetch(`${API_BASE}/report/generate`, {
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
      ...formDataRef.current,
      reportHTML: htmlReport,
    };

    const res = await fetch(`${API_BASE}/report/pdf`, {
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
      <ReportForm
        onGenerateReport={handleGenerateReport}
        loading={loading}
        isReportReady={isReportReady}
        downloadPDF={downloadPDF}
      />
    </>
  );
}


export default App;

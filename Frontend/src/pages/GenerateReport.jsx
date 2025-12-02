import { useState } from "react";
import ReportForm from "../components/ReportForm";
import { generateLongReportPDF } from "../utils/pdfGenerator";

export default function GenerateReport() {
  const [reportText, setReportText] = useState("");

  return (
    <div className="p-8">
      {!reportText ? (
        <ReportForm setReportText={setReportText} />
      ) : (
        <div>
          <div id="reportContent" className="whitespace-pre-wrap bg-white p-6 rounded-xl shadow">
            {reportText}
          </div>
          <button onClick={() => generateLongReportPDF(reportText)} className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg">
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
}

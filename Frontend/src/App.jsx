import ReportForm from "./components/ReportForm/ReportForm";
import { useReportGenerator } from "./hooks/useReportGenerator";

function App() {
  const { handleGenerateReport, downloadPDF, loading, isReportReady } =
    useReportGenerator();

  return (
    <ReportForm
      onGenerateReport={handleGenerateReport}
      loading={loading}
      isReportReady={isReportReady}
      downloadPDF={downloadPDF}
    />
  );
}

export default App;

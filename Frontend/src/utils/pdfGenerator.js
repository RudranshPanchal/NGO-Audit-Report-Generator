// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// export const generateLongReportPDF = (text) => {
//   const docDefinition = {
//     content: [
//       { text: "Annual NGO Audit Report", style: "header" },
//       { text, style: "body" },
//     ],
//     styles: {
//       header: { fontSize: 20, bold: true, margin: [0, 0, 0, 20] },
//       body: { fontSize: 11, lineHeight: 1.5 },
//     },
//     pageMargins: [40, 60, 40, 60],
//   };

//   pdfMake.createPdf(docDefinition).download("NGO_Annual_Audit_Report.pdf");
// };

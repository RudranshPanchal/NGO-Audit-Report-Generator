import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const generateAuditReport = async (req, res) => {
  try {
    const ngoData = req.body;

    const userPrompt = `
Prepare a complete NGO Annual Audit Report using ONLY the data below.

MANDATORY SECTIONS:
1. Cover Page  
2. Auditor’s Report  
3. Executive Summary  
4. NGO Overview  
5. Audit Scope  
6. Financial Summary  
7. Income & Expenditure Table  
8. Programme/Project-wise Utilization Table  
9. Donor & Grant Summary Table  
10. FCRA Summary Table  
11. Compliance Review  
12. Key Observations  
13. Recommendations  

REMEMBER:
- Do NOT invent ANY data.
- Add a clear separator (e.g., a page break or horizontal line) between sections when switching to a new section.
- Do NOT add anything after the Recommendations section (i.e., Recommendations is the last section).
- Do NOT include signature lines
- Do NOT include "President Signature", "Auditor Signature" or "Seal" section
- Do NOT create placeholder signature text like “(Space for Signature)”
(SIGNATURES WILL BE HANDLED SEPARATELY BY TEMPLATE)
- If something is missing, write “Not Provided”.
- All tables MUST be clean Markdown tables.
- Tone must match professional CA statutory audit style.

NGO DATA (JSON):
${JSON.stringify(ngoData, null, 2)}

Begin the full audit report now.
`;

    const completion = await openai.chat.completions.create({
      model: "google/gemma-3-27b-it:free",
      messages: [
        {
          role: "system",
          content: `
You are a qualified Chartered Accountant (CA) in India.

Your job is to generate a formal, ICAI-aligned NGO Annual Audit Report using ONLY the JSON provided by the user.

STRICT RULES:
1. You MUST NOT invent or fabricate ANY numbers, names, dates, donors, or financial figures.
2. If a field is not present, write “Not Provided”.
3. Every financial table must ONLY use values from the JSON.
4. All tables must be generated in clean Markdown table format.
5. Do NOT output examples, samples, templates, or assumptions.
6. Only output the final completed audit report.
`
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 8000,
    });

    const reportText = completion.choices[0]?.message?.content || "";
    res.json({ reportText });
  } catch (error) {
    console.error("❌ Error generating report:", error);
    res.status(500).json({ message: "Error generating report", error: error.message });
  }
};

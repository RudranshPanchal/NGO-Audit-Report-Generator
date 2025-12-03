import React, { useState, useEffect } from "react";
import { CheckCircle, Building2, DollarSign, Target, FileText, PenTool, AlertCircle } from "lucide-react";
import StepNGOBasics from "./StepNGOBasics";
import StepFinancials from "./StepFinancials";
import StepActivities from "./StepActivities";
import StepAuditorDetails from "./StepAuditorDetails";
import StepSignatures from "./StepSignatures";


const steps = [
  { title: "NGO Basics", icon: Building2, color: "blue" },
  { title: "Financials", icon: DollarSign, color: "green" },
  { title: "Activities & Impact", icon: Target, color: "purple" },
  { title: "Auditor Details", icon: FileText, color: "red" },
  { title: "Signatures & Compliance", icon: PenTool, color: "indigo" },
];

<style>
  {`
.spinner {
  border: 3px solid #ffffff50;
  border-top: 3px solid white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 0.65s linear infinite;
  display: inline-block;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
 100% { transform: rotate(360deg); }
}
`}
</style>


const ReportForm = ({ onGenerateReport, loading, isReportReady, downloadPDF }) => {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({

    // STEP 0 — NGO BASICS
    ngoName: "",
    registrationNumber: "",
    panNumber: "",
    address: "",
    taxExemption12A: "",
    taxExemption80G: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    financialYear: "",
    financialYearStart: "",
    financialYearEnd: "",
    dateOfReport: "",

    // STEP 2 — ACTIVITIES
    projectHighlights: "",


    // STEP 1 — FINANCIALS
    totalIncome: "",
    totalExpenditure: "",
    surplusDeficit: "",
    sourcesOfFunds: "",
    areasOfExpenditure: "",
    foreigncontribution: "",
    bankBalance: "",
    numberOfBeneficiaries: "",


    // STEP 3 — AUDITOR DETAILS
    auditorName: "",
    membershipNumber: "",
    udin: "",
    auditRemarks: "",
    boardChairName: "",
    secretaryName: "",

    // STEP 4 — SIGNATURES
    presidentSignature: "",
    auditorSignature: "",
    presidentName: "",
    presidentDate: "",
    auditorDate: "",

    // COMPLIANCE CHECKBOXES
    booksMaintained: false,
    returnsFiled: false,
    noViolation: false,
    fcraCompliance: false,
  });

  // ----DUMMY DATA FOR TESTING PUPOSE ---//

//   const [formData, setFormData] = useState({

//     // STEP 0 — NGO BASICS
//     ngoName: "Seva Jyoti Foundation",
//     registrationNumber: "NGO/MAH/2020/45219",
//     panNumber: "AACTS1234K",
//     address: "Plot 12, Shanti Nagar, Andheri East, Mumbai, Maharashtra - 400059",
//     taxExemption12A: "AAA12A1234Q",
//     taxExemption80G: "AAA80G5678Z",
//     contactPerson: "Radhika Verma",
//     contactEmail: "contact@sevajyoti.org",
//     contactPhone: "+91-9876543210",
//     financialYear: "2024-2025",
//     financialYearStart: "01-04-2024",
//     financialYearEnd: "31-03-2025",
//     dateOfReport: "30-06-2025",

//     // STEP 2 — ACTIVITIES
//     projectHighlights:
//       "Implemented community health camps, provided scholarships to underprivileged students, expanded clean water initiatives in 18 rural villages, and conducted livelihood training for 420 women.",

//     // STEP 1 — FINANCIALS
//     projectHighlights:
//   "Throughout FY 2024–25, Seva Jyoti Foundation implemented multi-dimensional development programs with significant financial deployment. A total of 32 community health camps were organised with an expenditure of ₹1,08,75,600 covering diagnostics (₹32,40,800), doctor consultations (₹18,20,000), medicines (₹27,15,600), camp logistics (₹14,50,200), and medical equipment rentals (₹16,48,000). The scholarship program accounted for ₹72,40,000, supporting 720 students with tuition fees (₹41,80,000), digital learning devices (₹12,60,000), study material kits (₹8,20,000), transportation stipends (₹6,35,000), and exam coaching support (₹3,45,000).\n\nThe clean water initiative utilised ₹1,03,20,500, which included installation of 36 solar-powered filtration systems (₹72,90,000), repairing 10 borewells (₹9,40,500), laying 3,200 meters of pipelines (₹12,80,000), constructing 5 rainwater harvesting tanks (₹5,95,000), and community water testing (₹2,15,000). The livelihood training program involved ₹28,75,200 in expenses, consisting of tailoring machines & kits (₹9,84,800), trainer fees (₹7,40,000), training hall rentals (₹3,28,000), digital literacy labs (₹5,10,000), and micro-business seed funding (₹3,12,400). These combined initiatives supported 12,450 direct beneficiaries.",

// totalIncome:
//   "₹1,84,50,000 – comprising:\n• Individual Donations: ₹83,02,500\n• Corporate CSR Funding: ₹64,57,500\n• Domestic Grants: ₹27,67,500\n• Interest & Miscellaneous Income: ₹9,22,500\nThe income includes restricted project grants for health (₹58,00,000), education (₹38,50,000), and water programs (₹49,00,000), as well as unrestricted operational support (₹39,00,000).",

// totalExpenditure:
//   "₹1,72,30,000 – allocated across:\n• Program Activities: ₹1,52,05,300\n• Administrative & Operational Expenses: ₹20,24,700\nProgram expenditures include medical service contracts (₹28,60,400), procurement of filtration units (₹72,90,000), scholarship disbursals (₹41,80,000), livelihood training materials (₹9,84,800), vehicle & field logistics (₹6,55,100), and community mobilisation (₹4,35,000).",

// surplusDeficit:
//   "₹12,20,000 Surplus – generated due to unspent operational allocations (₹4,80,000), cost optimisation in procurement (₹3,95,000), lower administrative overheads (₹2,35,000), and interest income (₹1,10,000). The surplus will be carried forward for upcoming health and water initiatives.",

// sourcesOfFunds:
//   "Individual Donations: 45% (₹83,02,500) – including small donations (₹12,80,000), digital fundraising (₹9,25,500), major donors (₹60,97,000).\nCorporate CSR: 35% (₹64,57,500) – from 11 companies; largest grant ₹14,00,000, smallest ₹2,10,000.\nGrants: 15% (₹27,67,500) – from 3 institutions providing ₹12,00,000, ₹9,50,000, and ₹6,17,500 respectively.\nOther Income: 5% (₹9,22,500) – interest earnings (₹3,10,200), community contributions (₹1,95,500), event sponsorship (₹4,16,800).",

// areasOfExpenditure:
//   "Education Programs: 40% (₹68,92,000) – including:\n  • Tuition support: ₹41,80,000\n  • Books & learning kits: ₹8,20,000\n  • Digital tablets/laptops: ₹12,60,000\n  • Mentorship workshops: ₹3,75,000\n  • Student counselling services: ₹2,57,000\n\nHealth Initiatives: 30% (₹51,69,000) – including:\n  • Medicines & supplies: ₹27,15,600\n  • Doctor & paramedic fees: ₹18,20,000\n  • Diagnostics: ₹6,33,400\n\nAdmin & Operations: 15% (₹25,84,500) – covering:\n  • Salaries: ₹14,80,000\n  • Office rent & utilities: ₹5,95,000\n  • Audit & compliance: ₹2,25,500\n  • Communication & travel: ₹2,84,000\n\nRural Development: 15% (₹25,84,500) – including:\n  • Water filtration systems: ₹72,90,000 (allocated across multi-year plan)\n  • Borewell repairs: ₹9,40,500\n  • Rainwater harvesting: ₹5,95,000\n  • Community training: ₹2,15,000",

// foreigncontribution:
//   "₹28,40,000 – received from 4 foreign donors:\n• USA Donor Foundation: ₹12,00,000\n• UK Global Aid Trust: ₹7,80,000\n• German Relief Fund: ₹5,20,000\n• Canadian Social Impact Group: ₹3,40,000\nUtilised for:\n• Health equipment procurement: ₹10,40,000\n• Water purification projects: ₹12,80,000\n• Livelihood women training: ₹5,20,000\nAll transactions reconciled with FCRA bank statements.",

// bankBalance:
//   "₹36,75,000 – consisting of:\n• Operational Account Balance: ₹14,22,400\n• Project-Restricted Funds: ₹9,85,600\n• FCRA Account Balance: ₹7,40,500\n• Fixed Reserve for 2025–26: ₹5,26,500",

// numberOfBeneficiaries:
//   "12,450 beneficiaries – including:\n• Health: 8,450\n• Education/Scholarships: 720\n• Livelihood Training: 420\n• Water Purification Access: 12,000+ community members (direct + indirect) – counted as 2,860 unique program beneficiaries for reporting standards.",


//     // STEP 3 — AUDITOR DETAILS
//     auditorName: "Vikrant Shah",
//     firmName: "BlackOak Consultants",
//     firmAddress: "102, Sector- ED, Nirvan Empire, Indore-452016, Madhya Pradesh",
//     membershipNumber: "MNO251478",
//     udin: "UDIN 25XYZ458612",
//     auditRemarks:
//       "The financial audit confirms accurate fund utilisation with diverse and well-distributed expenditures including program-specific disbursals exceeding ₹1.52 crore. Item-wise verification of 1,480 vouchers, 92 bank transactions, 43 procurement records, and 37 utilisation reports showed full compliance with accounting standards and donor reporting requirements. No financial irregularities or fund misallocations were detected, and foreign contribution utilisation matched statutory norms.",
//     boardChairName: "Arun Patil",
//     secretaryName: "Meera Sharma",

//     // STEP 4 — SIGNATURES
//     presidentSignature: "",
//     auditorSignature: "",
//     presidentName: "Arun Patil",
//     presidentDate: "30-06-2025",
//     auditorDate: "28-06-2025",

//     // COMPLIANCE CHECKBOXES
//     booksMaintained: true,
//     returnsFiled: true,
//     noViolation: true,
//     fcraCompliance: true,
//   });


  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 400);
    return () => clearTimeout(timer);
  }, [step]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 0) {
      if (!formData.ngoName) newErrors.ngoName = true;
      if (!formData.registrationNumber) newErrors.registrationNumber = true;
      if (!formData.financialYear) newErrors.financialYear = true;
    } else if (currentStep === 1) {
      if (!formData.totalIncome) newErrors.totalIncome = true;
      if (!formData.totalExpenditure) newErrors.totalExpenditure = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (!completedSteps.includes(step)) {
        setCompletedSteps([...completedSteps, step]);
      }
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (validateStep(step)) {
      await onGenerateReport(formData);
    }
  };

  const stepColors = {
    0: 'text-blue-500 stroke-blue-500',
    1: 'text-green-500 stroke-green-500',
    2: 'text-purple-500 stroke-purple-500',
    3: 'text-red-500 stroke-red-500',
    4: 'text-indigo-500 stroke-indigo-500',
  };

  // Use the current step color or fallback to blue
  const currentColorClass = stepColors[step]

  const StepIcon = steps[step].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Animated Header */}
        <div className="text-center mb-8 opacity-0 animate-fadeIn">
          <div className="inline-block p-3 bg-white rounded-2xl shadow-lg mb-4">
            <Building2 className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            NGO Annual Audit Report
          </h1>
          <p className="text-gray-600 text-lg">
            Professional report generation made simple
          </p>
        </div>

        {/* Progress Bar - Enhanced */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-8">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              const isCompleted = completedSteps.includes(idx) || idx < step;
              const isCurrent = idx === step;

              return (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center flex-1 relative">
                    <div
                      className={`
                        w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg
                        transition-all duration-500 transform
                        ${isCurrent ? 'scale-110 shadow-lg' : 'scale-100'}
                        ${isCompleted ? 'bg-green-500 text-white' :
                          isCurrent ? 'bg-blue-600 text-white' :
                            'bg-gray-200 text-gray-400'}
                      `}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-7 h-7" />
                      ) : (
                        <Icon className={`w-6 h-6 ${isCurrent ? 'animate-pulse' : ''}`} />
                      )}
                    </div>
                    <p
                      className={`
                        mt-3 text-xs font-semibold text-center max-w-[100px]
                        transition-colors duration-300
                        ${isCurrent ? 'text-blue-700' : 'text-gray-500'}
                      `}
                    >
                      {item.title}
                    </p>
                  </div>

                  {idx < steps.length - 1 && (
                    <div className="flex-1 h-1 mx-2 mt-[-40px] relative">
                      <div className="absolute inset-0 bg-gray-200 rounded-full" />
                      <div
                        className={`
                          absolute inset-0 rounded-full transition-all duration-700
                          ${isCompleted ? 'bg-green-500 w-full' : 'w-0'}
                        `}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className={`bg-gradient-to-r ${step === 0 ? 'from-blue-500 to-blue-600' : step === 1 ? 'from-green-500 to-green-600' : step === 2 ? 'from-purple-500 to-purple-600' : step === 3 ? 'from-red-500 to-red-600' : 'from-indigo-500 to-indigo-600'} p-6`}>
            <div className="flex items-center gap-4 text-white">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                <StepIcon className={`w-8 h-8 ${currentColorClass}`} />
              </div>
              <div>
                <p className="text-sm font-medium opacity-90">Step {step + 1} of 5</p>
                <h2 className="text-2xl font-bold">{steps[step].title}</h2>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div
              className={`
                transition-all duration-400
                ${isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}
              `}
            >


              {/* STEP 0 - NGO Basics */}
              {step === 0 && (
                <StepNGOBasics
                  formData={formData}
                  errors={errors}
                  handleChange={handleChange}
                  setFormData={setFormData}
                />
              )}



              {/* STEP 1 - Financials */}
              {step === 1 && (
                <StepFinancials
                  formData={formData}
                  errors={errors}
                  handleChange={handleChange}
                />
              )}

              {/* STEP 2 - Activities & Impact */}
              {step === 2 && (
                <StepActivities
                  formData={formData}
                  handleChange={handleChange}
                  StepIcon={Target}
                />
              )}

              {/* STEP 3 - Auditor Details */}
              {step === 3 && (
                <StepAuditorDetails
                  formData={formData}
                  handleChange={handleChange}
                />
              )}

              {/* STEP 4 - Signatures & Compliance */}
              {step === 4 && (
                <StepSignatures
                  formData={formData}
                  handleChange={handleChange}
                  setFormData={setFormData}
                  StepIconSignature={PenTool}
                  StepIconChecklist={CheckCircle}
                  StepIconWarning={AlertCircle}
                />
              )}

            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-10 pt-6 border-t-2 border-gray-100">

              {/* Previous Button */}
              {step > 0 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="cursor-pointer px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200 hover:shadow-md transform hover:-translate-x-1"
                >
                  ← Previous
                </button>
              ) : (
                <div></div>
              )}

              {/* NEXT / GENERATE / DOWNLOAD LOGIC */}
              {step < 4 ? (
                /* CONTINUE BUTTON */
                <button
                  type="button"
                  onClick={handleNext}
                  className={`px-8 py-3 cursor-pointer ${step === 0
                    ? "bg-gradient-to-r from-blue-500 to-blue-600"
                    : step === 1
                      ? "bg-gradient-to-r from-green-500 to-green-600"
                      : step === 2
                        ? "bg-gradient-to-r from-purple-500 to-purple-600"
                        : "bg-gradient-to-r from-red-500 to-red-600"
                    } text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:translate-x-1 hover:scale-105`}
                >
                  Continue →
                </button>
              ) : (
                /* LAST STEP → GENERATE OR DOWNLOAD PDF */
                <>
                  {!isReportReady ? (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={loading}
                      className={`cursor-pointer px-10 py-4 rounded-xl text-white font-bold text-lg shadow-xl transition-all duration-300 transform
            ${loading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-2xl hover:scale-105"
                        }
          `}
                    >
                      {loading ? (
                        <span className="flex items-center gap-3">

                          <svg
                            className="w-6 h-6 animate-spin text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M4 12a8 8 0 0 1 8-8"
                              stroke="currentColor"
                              strokeWidth="4"
                              strokeLinecap="round"
                            />
                          </svg>

                          <span className="animate-pulse">Generating Report…</span>
                        </span>
                      ) : (
                        "Generate Report 🚀"
                      )}

                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={downloadPDF}
                      className="cursor-pointer px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    >
                      Download PDF 📄
                    </button>
                  )}
                </>
              )}

            </div>

          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>Professional NGO audit reporting • Secure & Compliant</p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        input::placeholder,
        textarea::placeholder {
          color: #9ca3af;
        }

        input:focus::placeholder,
        textarea:focus::placeholder {
          color: #d1d5db;
        }
      `}</style>
    </div>
  );
};

export default ReportForm;
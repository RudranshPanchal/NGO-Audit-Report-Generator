import React, { useState, useEffect } from "react";
import { CheckCircle, Building2, DollarSign, Target, FileText, PenTool, AlertCircle } from "lucide-react";
import FakeDataFiller from './FakeDataFiller'


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

  // const [formData, setFormData] = useState({

  //   // STEP 0 — NGO BASICS
  //   ngoName: "",
  //   registrationNumber: "",
  //   panNumber: "",
  //   address: "",
  //   taxExemption12A: "",
  //   taxExemption80G: "",
  //   contactPerson: "",
  //   contactEmail: "",
  //   contactPhone: "",
  //   financialYear: "",
  //   financialYearStart: "",
  //   financialYearEnd: "",
  //   dateOfReport: "",

  //   // STEP 2 — ACTIVITIES
  //   projectHighlights: "",


  //   // STEP 1 — FINANCIALS
  //   totalIncome: "",
  //   totalExpenditure: "",
  //   surplusDeficit: "",
  //   sourcesOfFunds: "",
  //   areasOfExpenditure: "",
  //   foreigncontribution: "",
  //   bankBalance: "",
  //   numberOfBeneficiaries: "",


  //   // STEP 3 — AUDITOR DETAILS
  //   auditorName: "",
  //   membershipNumber: "",
  //   udin: "",
  //   auditRemarks: "",
  //   boardChairName: "",
  //   secretaryName: "",

  //   // STEP 4 — SIGNATURES
  //   presidentSignature: "",
  //   auditorSignature: "",
  //   presidentName: "",
  //   presidentDate: "",
  //   auditorDate: "",

  //   // COMPLIANCE CHECKBOXES
  //   booksMaintained: false,
  //   returnsFiled: false,
  //   noViolation: false,
  //   fcraCompliance: false,
  // });

  const [formData, setFormData] = useState({

    // STEP 0 — NGO BASICS
    ngoName: "Seva Jyoti Foundation",
    registrationNumber: "NGO/MAH/2020/45219",
    panNumber: "AACTS1234K",
    address: "Plot 12, Shanti Nagar, Andheri East, Mumbai, Maharashtra - 400059",
    taxExemption12A: "AAA12A1234Q",
    taxExemption80G: "AAA80G5678Z",
    contactPerson: "Radhika Verma",
    contactEmail: "contact@sevajyoti.org",
    contactPhone: "+91-9876543210",
    financialYear: "2024-2025",
    financialYearStart: "01-04-2024",
    financialYearEnd: "31-03-2025",
    dateOfReport: "30-06-2025",

    // STEP 2 — ACTIVITIES
    projectHighlights:
      "Implemented community health camps, provided scholarships to underprivileged students, expanded clean water initiatives in 18 rural villages, and conducted livelihood training for 420 women.",

    // STEP 1 — FINANCIALS
    totalIncome: "₹1,84,50,000",
    totalExpenditure: "₹1,72,30,000",
    surplusDeficit: "₹12,20,000 Surplus",
    sourcesOfFunds:
      "Individual Donations: 45%, Corporate CSR: 35%, Grants: 15%, Other: 5%",
    areasOfExpenditure:
      "Education Programs: 40%, Health Initiatives: 30%, Admin & Operations: 15%, Rural Development: 15%",
    foreigncontribution: "₹28,40,000",
    bankBalance: "₹36,75,000",
    numberOfBeneficiaries: "12,450",

    // STEP 3 — AUDITOR DETAILS
    auditorName: "Vikrant Shah",
    firmName: "BlackOak Consultants",
    firmAddress: "102, Sector- ED, Nirvan Empire, Indore-452016, Madhya Pradesh",
    membershipNumber: "MNO251478",
    udin: "UDIN 25XYZ458612",
    auditRemarks:
      "The financial statements give a true and fair view of the NGO’s financial position. No material discrepancies were noted.",
    boardChairName: "Arun Patil",
    secretaryName: "Meera Sharma",

    // STEP 4 — SIGNATURES
    presidentSignature: "",
    auditorSignature: "",
    presidentName: "Arun Patil",
    presidentDate: "30-06-2025",
    auditorDate: "28-06-2025",

    // COMPLIANCE CHECKBOXES
    booksMaintained: true,
    returnsFiled: true,
    noViolation: true,
    fcraCompliance: true,
  });


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
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      ["NGO Legal Name", "ngoName", "text", "e.g., Green Earth Foundation"],
                      ["Registration Number", "registrationNumber", "text", "e.g., REG/2020/12345"],
                      ["PAN Number", "panNumber", "text", "e.g., AAAAA0000A"],
                      ["12A Registration Number", "taxExemption12A", "text", "e.g., 12A/ABC/2022"],
                      ["80G Registration Number", "taxExemption80G", "text", "e.g., 80G/XYZ/2023"],
                      ["Contact Person", "contactPerson", "text", "Name of authorised representative"],
                      ["Contact Email", "contactEmail", "email", "e.g., contact@ngo.org"],
                      ["Contact Phone", "contactPhone", "text", "e.g., +91 9876543210"],
                      // ["Financial Year", "financialYear", "text", "e.g., 2024-25"],
                    ].map(([label, name, type, placeholder]) => (
                      <div key={name} className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {label}
                          {errors[name] && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <input
                          type={type}
                          name={name}
                          value={formData[name] || ""}
                          onChange={handleChange}
                          placeholder={placeholder}
                          className={`
                            w-full px-4 py-3 border-2 rounded-xl
                            transition-all duration-200
                            focus:outline-none focus:ring-4 focus:ring-blue-100
                            ${errors[name]
                              ? 'border-red-300 bg-red-50'
                              : 'border-gray-200 focus:border-blue-400'
                            }
                          `}
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Financial Year
                      </label>
                      <select
                        name="financialYear"
                        value={formData.financialYear}
                        onChange={(e) => {
                          const fy = e.target.value;
                          const startYear = fy.split("-")[0];
                          const endYear = parseInt(startYear) + 1;

                          setFormData({
                            ...formData,
                            financialYear: fy,
                            financialYearStart: `01 April ${startYear}`,
                            financialYearEnd: `31 March ${endYear}`,
                          });
                        }}
                        className={`
                            w-full px-4 py-3 border-2 rounded-xl
                            transition-all duration-200
                            focus:outline-none focus:ring-4 focus:ring-blue-100
                            ${errors[name]
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-200 focus:border-blue-400'
                          }
                          `}
                      >
                        <option value="">Select Financial Year</option>
                        {Array.from({ length: 15 }).map((_, i) => {
                          const yearStart = 2015 + i;
                          const yearEnd = yearStart + 1;
                          const label = `${yearStart}-${yearEnd.toString().slice(-2)}`;
                          return (
                            <option key={label} value={label}>
                              {label}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Financial Year Start Date
                      </label>
                      <input
                        placeholder="DD-MM-YY"
                        type="text"
                        name="financialYearStart"
                        value={formData.financialYearStart || ""}
                        readOnly
                        className={`
                            w-full px-4 py-3 border-2 rounded-xl
                            transition-all duration-200
                            focus:outline-none focus:ring-4 focus:ring-blue-100
                            ${errors[name]
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-200 focus:border-blue-400'
                          }
                          `}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Financial Year End Date
                      </label>
                      <input
                        placeholder="DD-MM-YY"
                        type="text"
                        name="financialYearEnd"
                        value={formData.financialYearEnd || ""}
                        readOnly
                        className={`
                            w-full px-4 py-3 border-2 rounded-xl
                            transition-all duration-200
                            focus:outline-none focus:ring-4 focus:ring-blue-100
                            ${errors[name]
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-200 focus:border-blue-400'
                          }
                          `}
                      />
                    </div>

                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Registered Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address || ""}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Complete registered address with pin code"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200"
                    />
                  </div>
                </div>
              )}

              {/* STEP 1 - Financials */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      ["Total Income / Receipts", "totalIncome", "₹"],
                      ["Total Expenditure / Payments", "totalExpenditure", "₹"],
                      ["Surplus (+) / Deficit (-)", "surplusDeficit", "₹"],
                      ["Cash & Bank Balance", "bankBalance", "₹"],
                      ["Foreign Contribution Received", "foreigncontribution", "₹"],
                      ["Number of Beneficiaries", "numberOfBeneficiaries", "", "e.g., 1200"],
                    ].map(([label, name, symbol]) => (
                      <div key={name} className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {label}
                          {errors[name] && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                            {symbol}
                          </span>
                          <input
                            type="text"
                            name={name}
                            value={formData[name] || ""}
                            onChange={handleChange}
                            placeholder="0.00"
                            className={`
                              w-full pl-10 pr-4 py-3 border-2 rounded-xl
                              transition-all duration-200
                              focus:outline-none focus:ring-4 focus:ring-green-100
                              ${errors[name]
                                ? 'border-red-300 bg-red-50'
                                : 'border-gray-200 focus:border-green-400'
                              }
                            `}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Main Sources of Funds
                    </label>
                    <textarea
                      name="sourcesOfFunds"
                      value={formData.sourcesOfFunds || ""}
                      onChange={handleChange}
                      rows="3"
                      placeholder="e.g., Donations, Grants, Membership fees, Interest income..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-400 transition-all duration-200"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Main Areas of Expenditure
                    </label>

                    <textarea
                      name="areasOfExpenditure"
                      value={formData.areasOfExpenditure || ""}
                      onChange={handleChange}
                      rows="3"
                      placeholder="e.g., Education Programs, Health Camps, Women Empowerment, Staff Salaries..."
                      className="
          w-full px-4 py-3 border-2 border-gray-200 rounded-xl
          focus:outline-none focus:ring-4 focus:ring-green-100
          focus:border-green-400 transition-all duration-200
        "
                    />
                  </div>

                </div>
              )}

              {/* STEP 2 - Activities & Impact */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 mb-6">
                    <div className="flex items-start gap-3">
                      <Target className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-purple-900 mb-2">Highlight Your Impact</h3>
                        <p className="text-sm text-purple-700">
                          Describe 3-5 major activities, projects, or initiatives undertaken during this financial year. Include beneficiary numbers and measurable outcomes.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Key Activities & Project Highlights
                    </label>
                    <textarea
                      name="projectHighlights"
                      rows="10"
                      value={formData.projectHighlights}
                      onChange={handleChange}
                      placeholder="Example:&#10;1. Education Program: Provided scholarships to 150 underprivileged children...&#10;2. Healthcare Initiative: Conducted 25 health camps reaching 5000+ beneficiaries...&#10;3. Skill Development: Trained 200 women in vocational skills..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all duration-200 font-mono text-sm"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3 - Auditor Details */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      ["Auditor Name", "auditorName", "e.g., CA John Doe"],
                      ["Firm Name", "firmName", "e.g., Shah & Assosiates"],
                      ["Firm Address", "firmAddress", "e.g., 102, Sector- ED, Nirvan Empire, Indore-452016"],
                      ["Membership No. / FRN", "membershipNumber", "e.g., 123456"],
                      ["UDIN (18-digit)", "udin", "18-digit unique number"],
                      ["Board Chairperson Name", "boardChairName", "e.g., Mr. Rajesh Kumar"],
                      ["Secretary Name", "secretaryName", "e.g., Ms. Anjali Mehta"],

                    ].map(([label, name, placeholder]) => (
                      <div key={name} className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {label}
                        </label>
                        <input
                          type="text"
                          name={name}
                          value={formData[name] || ""}
                          onChange={handleChange}
                          placeholder={placeholder}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-400 transition-all duration-200"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Audit Remarks / Observations
                    </label>
                    <textarea
                      name="auditRemarks"
                      rows="5"
                      value={formData.auditRemarks || ""}
                      onChange={handleChange}
                      placeholder="Any observations, qualifications, or remarks by the auditor..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-400 transition-all duration-200"
                    />
                  </div>
                </div>
              )}
              {/* STEP 4 - Signatures & Compliance */}
              {step === 4 && (
                <div className="space-y-8">

                  {/* Signature Upload Section */}
                  <div className="grid md:grid-cols-2 gap-8">
                    {[
                      ["presidentSignature", "President/Secretary Signature", "Upload signature of authorized signatory"],
                      ["auditorSignature", "Auditor Signature / Seal", "Upload auditor's signature or firm seal"],
                    ].map(([name, title, subtitle]) => (
                      <div key={name} className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {title}
                        </label>
                        <p className="text-xs text-gray-500 mb-3">{subtitle}</p>

                        <label className="relative block border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:border-indigo-400 hover:bg-indigo-50">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [name]: e.target.files[0],
                              })
                            }
                          />

                          {!formData[name] ? (
                            <div className="text-center">
                              <PenTool className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                              <p className="text-sm font-medium text-gray-600">Click to upload</p>
                              <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                            </div>
                          ) : (
                            <div className="relative">
                              <img
                                src={URL.createObjectURL(formData[name])}
                                className="w-full h-32 object-contain rounded-lg"
                                alt="Signature preview"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 rounded-lg flex items-center justify-center">
                                <p className="text-white text-sm font-medium opacity-0 hover:opacity-100">
                                  Click to change
                                </p>
                              </div>
                            </div>
                          )}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* Signature Names & Dates */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        President / Secretary Name
                      </label>
                      <input
                        type="text"
                        name="presidentName"
                        value={formData.presidentName || ""}
                        onChange={handleChange}
                        placeholder="Full name of the signatory"
                        className="
            w-full px-4 py-3 border-2 border-gray-200 rounded-xl
            focus:outline-none focus:ring-4 focus:ring-indigo-100
            focus:border-indigo-400 transition-all duration-200
          "
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date (President / Secretary)
                      </label>
                      <input
                        type="date"
                        name="presidentDate"
                        value={formData.presidentDate || ""}
                        onChange={handleChange}
                        className="
            w-full px-4 py-3 border-2 border-gray-200 rounded-xl
            focus:outline-none focus:ring-4 focus:ring-indigo-100
            focus:border-indigo-400 transition-all duration-200
          "
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date (Auditor)
                      </label>
                      <input
                        type="date"
                        name="auditorDate"
                        value={formData.auditorDate || ""}
                        onChange={handleChange}
                        className="
            w-full px-4 py-3 border-2 border-gray-200 rounded-xl
            focus:outline-none focus:ring-4 focus:ring-indigo-100
            focus:border-indigo-400 transition-all duration-200
          "
                      />
                    </div>
                  </div>

                  {/* Compliance Checklist */}
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border-2 border-indigo-200">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle className="w-6 h-6 text-indigo-600" />
                      <h3 className="text-lg font-bold text-gray-900">
                        Compliance Checklist
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {[
                        ["booksMaintained", "Books of accounts maintained properly as per accounting standards"],
                        ["returnsFiled", "All statutory returns (TDS/GST/FCRA) filed on time"],
                        ["noViolation", "No violation of Section 13(1)(c) or related party transactions"],
                        ["fcraCompliance", "FCRA funds (if any) used only for approved purposes"],
                      ].map(([name, label]) => (
                        <label
                          key={name}
                          className="flex items-start gap-3 p-4 bg-white rounded-lg cursor-pointer hover:shadow-md transition-all duration-200"
                        >
                          <input
                            type="checkbox"
                            name={name}
                            checked={formData[name]}
                            onChange={handleChange}
                            className="mt-1 w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                          />
                          <span className="text-sm text-gray-700 font-medium">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Final Check Warning */}
                  <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-amber-900 mb-1">Final Review</h4>
                        <p className="text-sm text-amber-700">
                          Please review all information carefully before generating the report.
                          Ensure all financial figures and compliance statements are accurate.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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
import React, { useState, useEffect } from "react";
import { CheckCircle, Building2, DollarSign, Target, FileText, PenTool, AlertCircle, Loader2, Check, X } from "lucide-react";

const steps = [
  { title: "NGO Basics", icon: Building2, color: "blue" },
  { title: "Financials", icon: DollarSign, color: "green" },
  { title: "Activities", icon: Target, color: "purple" },
  { title: "Auditor", icon: FileText, color: "red" },
  { title: "Compliance", icon: PenTool, color: "indigo" },
];

const ReportForm = ({ onGenerateReport }) => {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [errors, setErrors] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStage, setGenerationStage] = useState("");

  const [formData, setFormData] = useState({
    ngoName: "",
    registrationNumber: "",
    panNumber: "",
    address: "",
    financialYear: "",
    auditorName: "",
    dateOfReport: "",
    totalIncome: "",
    totalExpenditure: "",
    surplusDeficit: "",
    sourcesOfFunds: "",
    areasOfExpenditure: "",
    foreigncontribution: "",
    bankBalance: "",
    projectHighlights: "",
    membershipNumber: "",
    udin: "",
    auditRemarks: "",
    presidentSignature: "",
    auditorSignature: "",
    presidentName: "",
    presidentDate: "",
    auditorDate: "",
    booksMaintained: false,
    returnsFiled: false,
    noViolation: false,
    fcraCompliance: false,
  });

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
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
      if (!formData.ngoName.trim()) newErrors.ngoName = true;
      if (!formData.registrationNumber.trim()) newErrors.registrationNumber = true;
      if (!formData.financialYear.trim()) newErrors.financialYear = true;
    } else if (currentStep === 1) {
      if (!formData.totalIncome.trim()) newErrors.totalIncome = true;
      if (!formData.totalExpenditure.trim()) newErrors.totalExpenditure = true;
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const simulateProgress = async () => {
    const stages = [
      { progress: 15, stage: "Validating form data..." },
      { progress: 30, stage: "Processing financial information..." },
      { progress: 50, stage: "Analyzing compliance requirements..." },
      { progress: 70, stage: "Generating report structure..." },
      { progress: 85, stage: "Formatting document..." },
      { progress: 95, stage: "Finalizing report..." },
      { progress: 100, stage: "Report generated successfully!" }
    ];

    for (const { progress, stage } of stages) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setGenerationProgress(progress);
      setGenerationStage(stage);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;

    setIsGenerating(true);
    setGenerationProgress(0);
    setGenerationStage("Initializing report generation...");

    try {
      // Simulate progress while actual generation happens
      const progressPromise = simulateProgress();
      const generatePromise = onGenerateReport(formData);

      await Promise.all([progressPromise, generatePromise]);

      // Keep success message visible for a moment
      setTimeout(() => {
        setIsGenerating(false);
        setGenerationProgress(0);
        setGenerationStage("");
      }, 2000);
    } catch (error) {
      setGenerationStage("Error generating report. Please try again.");
      setTimeout(() => {
        setIsGenerating(false);
        setGenerationProgress(0);
        setGenerationStage("");
      }, 3000);
    }
  };

  const StepIcon = steps[step].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-4 sm:py-8 px-3 sm:px-4 lg:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 opacity-0 animate-fadeIn">
          <div className="inline-block p-2 sm:p-3 bg-white rounded-xl sm:rounded-2xl shadow-lg mb-3 sm:mb-4">
            <Building2 className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 px-4">
            NGO Annual Audit Report
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 px-4">
            Professional report generation made simple
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 mb-6 sm:mb-8">
          {/* Desktop Progress */}
          <div className="hidden lg:flex items-center justify-between">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              const isCompleted = completedSteps.includes(idx) || idx < step;
              const isCurrent = idx === step;

              return (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center flex-1 relative">
                    <div
                      className={`
                        w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                        transition-all duration-500 transform
                        ${isCurrent ? 'scale-110 shadow-lg' : 'scale-100'}
                        ${isCompleted ? 'bg-green-500 text-white' :
                          isCurrent ? 'bg-blue-600 text-white' :
                            'bg-gray-200 text-gray-400'}
                      `}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className={`w-5 h-5 ${isCurrent ? 'animate-pulse' : ''}`} />
                      )}
                    </div>
                    <p className={`mt-2 text-xs font-semibold text-center transition-colors duration-300 ${isCurrent ? 'text-blue-700' : 'text-gray-500'}`}>
                      {item.title}
                    </p>
                  </div>

                  {idx < steps.length - 1 && (
                    <div className="flex-1 h-1 mx-2 relative" style={{ marginTop: '-24px' }}>
                      <div className="absolute inset-0 bg-gray-200 rounded-full" />
                      <div className={`absolute inset-0 rounded-full transition-all duration-700 ${isCompleted ? 'bg-green-500 w-full' : 'w-0'}`} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Mobile Progress */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-blue-600 text-white font-bold`}>
                  <StepIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Step {step + 1} of {steps.length}</p>
                  <p className="text-sm font-bold text-gray-900">{steps[step].title}</p>
                </div>
              </div>
              <div className="text-right text-xs text-gray-500">
                {completedSteps.length}/{steps.length} completed
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
          <div className={`bg-gradient-to-r ${step === 0 ? 'from-blue-500 to-blue-600' : step === 1 ? 'from-green-500 to-green-600' : step === 2 ? 'from-purple-500 to-purple-600' : step === 3 ? 'from-red-500 to-red-600' : 'from-indigo-500 to-indigo-600'} p-4 sm:p-6`}>
            <div className="flex items-center gap-3 sm:gap-4 text-white">
              <div className="p-2 sm:p-3 bg-white bg-opacity-20 rounded-lg sm:rounded-xl">
                <StepIcon className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium opacity-90">Step {step + 1} of 5</p>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">{steps[step].title}</h2>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>

              {/* STEP 0 - NGO Basics */}
              {step === 0 && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {[
                      ["NGO Legal Name", "ngoName", "Green Earth Foundation"],
                      ["Registration Number", "registrationNumber", "REG/2020/12345"],
                      ["PAN Number", "panNumber", "AAAAA0000A"],
                      ["Financial Year", "financialYear", "2024-25"],
                    ].map(([label, name, placeholder]) => (
                      <div key={name} className="group">
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          {label}
                          {errors[name] && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <input
                          type="text"
                          name={name}
                          value={formData[name] || ""}
                          onChange={handleChange}
                          placeholder={placeholder}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 rounded-lg sm:rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${errors[name] ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-blue-400'}`}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="group">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                      Registered Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address || ""}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Complete registered address with pin code"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200"
                    />
                  </div>
                </div>
              )}

              {/* STEP 1 - Financials */}
              {step === 1 && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {[
                      ["Total Income", "totalIncome"],
                      ["Total Expenditure", "totalExpenditure"],
                      ["Surplus/Deficit", "surplusDeficit"],
                      ["Bank Balance", "bankBalance"],
                      ["Foreign Contribution", "foreigncontribution"],
                    ].map(([label, name]) => (
                      <div key={name} className="group">
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          {label}
                          {errors[name] && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm sm:text-base">₹</span>
                          <input
                            type="text"
                            name={name}
                            value={formData[name] || ""}
                            onChange={handleChange}
                            placeholder="0.00"
                            className={`w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border-2 rounded-lg sm:rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-100 ${errors[name] ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-green-400'}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="group">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                      Main Sources of Funds
                    </label>
                    <textarea
                      name="sourcesOfFunds"
                      value={formData.sourcesOfFunds || ""}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Donations, Grants, Membership fees, Interest income..."
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-400 transition-all duration-200"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2 - Activities */}
              {step === 2 && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-purple-50 border-2 border-purple-200 rounded-lg sm:rounded-xl p-4 sm:p-6">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <Target className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-sm sm:text-base text-purple-900 mb-1 sm:mb-2">Highlight Your Impact</h3>
                        <p className="text-xs sm:text-sm text-purple-700">
                          Describe 3-5 major activities undertaken this year with measurable outcomes.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                      Key Activities & Project Highlights
                    </label>
                    <textarea
                      name="projectHighlights"
                      rows="8"
                      value={formData.projectHighlights}
                      onChange={handleChange}
                      placeholder="1. Education Program: Scholarships to 150 children&#10;2. Healthcare Initiative: 25 health camps, 5000+ beneficiaries&#10;3. Skill Development: Trained 200 women..."
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all duration-200 font-mono"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3 - Auditor */}
              {step === 3 && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {[
                      ["Auditor Name & Firm", "auditorName", "CA John Doe & Associates"],
                      ["Membership No.", "membershipNumber", "123456"],
                      ["UDIN", "udin", "18-digit unique number"],
                    ].map(([label, name, placeholder]) => (
                      <div key={name} className="group">
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          {label}
                        </label>
                        <input
                          type="text"
                          name={name}
                          value={formData[name] || ""}
                          onChange={handleChange}
                          placeholder={placeholder}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-400 transition-all duration-200"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="group">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                      Audit Remarks / Observations
                    </label>
                    <textarea
                      name="auditRemarks"
                      rows="5"
                      value={formData.auditRemarks || ""}
                      onChange={handleChange}
                      placeholder="Any observations, qualifications, or remarks by the auditor..."
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-400 transition-all duration-200"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4 - Compliance */}
              {step === 4 && (
                <div className="space-y-6 sm:space-y-8">
                  {/* Signatures */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    {[
                      ["presidentSignature", "President Signature"],
                      ["auditorSignature", "Auditor Signature"],
                    ].map(([name, title]) => (
                      <div key={name} className="group">
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                          {title}
                        </label>

                        <label className="relative block border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl p-4 sm:p-6 cursor-pointer transition-all duration-200 hover:border-indigo-400 hover:bg-indigo-50">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => setFormData({ ...formData, [name]: e.target.files[0] })}
                          />

                          {!formData[name] ? (
                            <div className="text-center">
                              <PenTool className="w-8 h-8 sm:w-12 sm:h-12 mx-auto text-gray-400 mb-2 sm:mb-3" />
                              <p className="text-xs sm:text-sm font-medium text-gray-600">Click to upload</p>
                              <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                            </div>
                          ) : (
                            <img
                              src={URL.createObjectURL(formData[name])}
                              className="w-full h-24 sm:h-32 object-contain rounded-lg"
                              alt="Signature"
                            />
                          )}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* Compliance */}
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border-2 border-indigo-200">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                      <h3 className="text-base sm:text-lg font-bold text-gray-900">Compliance Checklist</h3>
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                      {[
                        ["booksMaintained", "Books maintained as per standards"],
                        ["returnsFiled", "All statutory returns filed on time"],
                        ["noViolation", "No related party violations"],
                        ["fcraCompliance", "FCRA funds used properly"],
                      ].map(([name, label]) => (
                        <label key={name} className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-white rounded-lg cursor-pointer hover:shadow-md transition-all duration-200">
                          <input
                            type="checkbox"
                            name={name}
                            checked={formData[name]}
                            onChange={handleChange}
                            className="mt-0.5 w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                          />
                          <span className="text-xs sm:text-sm text-gray-700 font-medium">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Warning */}
                  <div className="bg-amber-50 border-2 border-amber-200 rounded-lg sm:rounded-xl p-4 sm:p-5">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-sm sm:text-base text-amber-900 mb-1">Final Review</h4>
                        <p className="text-xs sm:text-sm text-amber-700">
                          Review all information carefully before generating the report.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-6 sm:mt-10 pt-4 sm:pt-6 border-t-2 border-gray-100">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isGenerating}
                  className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-gray-100 text-gray-700 font-semibold rounded-lg sm:rounded-xl hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Back
                </button>
              ) : <div></div>}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className={`px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base ${step === 0 ? 'bg-gradient-to-r from-blue-500 to-blue-600' : step === 1 ? 'bg-gradient-to-r from-green-500 to-green-600' : step === 2 ? 'bg-gradient-to-r from-purple-500 to-purple-600' : 'bg-gradient-to-r from-red-500 to-red-600'} text-white font-bold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105`}
                >
                  Next →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isGenerating}
                  className="px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base lg:text-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg sm:rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <span>Generate Report</span>
                      <span className="hidden sm:inline">🚀</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Progress Modal */}
        {isGenerating && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 transform scale-95 animate-scaleIn">
              <div className="text-center">
                <div className="mb-6">
                  {generationProgress < 100 ? (
                    <Loader2 className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-blue-600 animate-spin" />
                  ) : (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />
                    </div>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  {generationProgress < 100 ? 'Generating Report' : 'Report Ready!'}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-6">{generationStage}</p>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${generationProgress}%` }}
                  />
                </div>

                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Progress</span>
                  <span className="font-bold">{generationProgress}%</span>
                </div>

                {generationProgress === 100 && (
                  <div className="mt-4 text-sm text-gray-600">
                    Closing automatically...
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-gray-600 px-4">
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

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }

        input::placeholder,
        textarea::placeholder {
          color: #9ca3af;
        }

        input:focus::placeholder,
        textarea:focus::placeholder {
          color: #d1d5db;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default ReportForm;
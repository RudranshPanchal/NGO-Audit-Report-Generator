import React from "react";

const indianFakeData = {
  ngoName: "Prakriti Foundation",
  registrationNumber: "REG/2023/78901",
  panNumber: "ABCDE1234F",
  address: "45 MG Road, Bengaluru, Karnataka, India",
  financialYear: "2024-25",
  totalIncome: "2500000",
  totalExpenditure: "1800000",
  surplusDeficit: "700000",
  sourcesOfFunds: "Donations, CSR Grants, Membership fees",
  areasOfExpenditure: "Education, Healthcare, Rural Development",
  foreigncontribution: "150000",
  bankBalance: "500000",
  projectHighlights: "School renovation, Community health camps",
  membershipNumber: "MEM2023-4567",
  udin: "UDIN2023456789",
  auditRemarks: "All records verified as per FCRA guidelines",
  presidentSignature: "Ramesh Kumar",
  auditorSignature: "Anjali Sharma",
  presidentName: "Ramesh Kumar",
  presidentDate: "2025-03-31",
  auditorDate: "2025-04-05",
  booksMaintained: true,
  returnsFiled: true,
  noViolation: true,
  fcraCompliance: true,
};

const FakeDataFiller = ({ setFormData }) => {
  const handleFill = () => {
    setFormData(prev => {
      const newData = { ...prev };
      Object.keys(prev).forEach(key => {
        if (indianFakeData[key] !== undefined) {
          newData[key] = indianFakeData[key];
        }
      });
      return newData;
    });
  };

  return (
    <button
      type="button"
      onClick={handleFill}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    >
      Fill Indian Fake Data
    </button>
  );
};

export default FakeDataFiller;

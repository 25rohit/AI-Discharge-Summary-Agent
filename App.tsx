import { useState } from 'react';

export default function App() {
  const [selectedPatient, setSelectedPatient] = useState<'patient1' | 'patient2'>('patient1');

  const patientData = {
    patient1: {
      name: "Sarah Johnson",
      mrn: "78945612",
      age: 72,
      gender: "Female",
      admissionDate: "2026-05-20",
      dischargeDate: "2026-05-22",
      primaryDiagnosis: "Acute ST-Elevation Myocardial Infarction (STEMI), Inferior Wall",
      secondaryDiagnoses: [
        "Coronary Artery Disease",
        "Type 2 Diabetes Mellitus",
        "Hypertension",
        "Hyperlipidemia"
      ],
      hospitalCourse: "Patient presented with acute inferior STEMI and underwent emergent cardiac catheterization with successful PCI and stent placement to RCA. Post-procedure course uncomplicated. Patient remained hemodynamically stable with resolution of chest pain.",
      procedures: ["Percutaneous Coronary Intervention (PCI) with drug-eluting stent placement to right coronary artery"],
      allergies: ["Penicillin (rash)", "Sulfa drugs (hives)"],
      medicationChanges: {
        added: [
          { name: "Clopidogrel", dosage: "75mg", frequency: "daily" },
          { name: "Metoprolol", dosage: "25mg", frequency: "twice daily" },
          { name: "Atorvastatin", dosage: "80mg (increased)", frequency: "daily at bedtime" }
        ],
        removed: [
          { name: "Ibuprofen", dosage: "400mg", frequency: "as needed" }
        ]
      },
      safetyFlags: [
        { severity: "medium", description: "Patient on warfarin should have INR monitoring ordered" }
      ],
      clinicianReview: true
    },
    patient2: {
      name: "Robert Martinez",
      mrn: "45678923",
      age: 58,
      gender: "Male",
      admissionDate: "2026-05-18",
      dischargeDate: "2026-05-22",
      primaryDiagnosis: "Acute cholecystitis with choledocholithiasis",
      secondaryDiagnoses: [
        "Alcohol use disorder (in recovery)",
        "Hypertension",
        "Chronic pancreatitis"
      ],
      hospitalCourse: "Patient underwent successful ERCP with stone extraction followed by laparoscopic cholecystectomy. Post-operative course uncomplicated. Pain well controlled, tolerating diet.",
      procedures: [
        "ERCP with sphincterotomy and stone extraction",
        "Laparoscopic cholecystectomy"
      ],
      allergies: ["NKDA (No Known Drug Allergies)"],
      medicationChanges: {
        added: [
          { name: "Hydrocodone-Acetaminophen", dosage: "5-325mg", frequency: "q6h PRN pain" }
        ],
        removed: []
      },
      safetyFlags: [],
      clinicianReview: false
    }
  };

  const patient = patientData[selectedPatient];

  return (
    <div className="size-full bg-slate-50 overflow-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold">Discharge Summary Generator</h1>
        <p className="text-blue-100 mt-2">AI-Powered Medical Discharge Summaries</p>
      </div>

      {/* Patient Selector */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setSelectedPatient('patient1')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedPatient === 'patient1'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Patient 1: Sarah Johnson
          </button>
          <button
            onClick={() => setSelectedPatient('patient2')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedPatient === 'patient2'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Patient 2: Robert Martinez
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Patient Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Demographics Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">👤</span> Patient Demographics
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-semibold text-gray-900">{patient.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">MRN</p>
                  <p className="font-semibold text-gray-900">{patient.mrn}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="font-semibold text-gray-900">{patient.age}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-semibold text-gray-900">{patient.gender}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Admission</p>
                  <p className="font-semibold text-gray-900">{patient.admissionDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Discharge</p>
                  <p className="font-semibold text-gray-900">{patient.dischargeDate}</p>
                </div>
              </div>
            </div>

            {/* Allergies Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">⚠️</span> Allergies
              </h2>
              <div className="space-y-2">
                {patient.allergies.map((allergy, idx) => (
                  <div key={idx} className="bg-red-50 text-red-800 px-3 py-2 rounded-lg text-sm font-medium">
                    {allergy}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Clinical Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Clinician Review Alert */}
            {patient.clinicianReview && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🔴</span>
                  <div>
                    <h3 className="font-bold text-red-900">Clinician Review Required</h3>
                    <p className="text-red-700 text-sm">This discharge summary requires clinician review before finalization.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Diagnosis Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🏥</span> Diagnosis
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Primary Diagnosis</p>
                  <p className="font-semibold text-gray-900 bg-blue-50 p-3 rounded-lg">
                    {patient.primaryDiagnosis}
                  </p>
                </div>
                {patient.secondaryDiagnoses.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Secondary Diagnoses</p>
                    <ul className="space-y-2">
                      {patient.secondaryDiagnoses.map((diagnosis, idx) => (
                        <li key={idx} className="text-gray-800 flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>{diagnosis}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Hospital Course */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📋</span> Hospital Course
              </h2>
              <p className="text-gray-700 leading-relaxed">{patient.hospitalCourse}</p>
            </div>

            {/* Procedures */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">⚕️</span> Procedures
              </h2>
              <ul className="space-y-2">
                {patient.procedures.map((procedure, idx) => (
                  <li key={idx} className="bg-green-50 text-green-900 px-4 py-3 rounded-lg">
                    {procedure}
                  </li>
                ))}
              </ul>
            </div>

            {/* Medication Reconciliation */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">💊</span> Medication Reconciliation
              </h2>

              {patient.medicationChanges.added.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                    <span>✅</span> Added
                  </h3>
                  <div className="space-y-2">
                    {patient.medicationChanges.added.map((med, idx) => (
                      <div key={idx} className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                        <p className="font-semibold text-gray-900">{med.name}</p>
                        <p className="text-sm text-gray-600">{med.dosage} - {med.frequency}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {patient.medicationChanges.removed.length > 0 && (
                <div>
                  <h3 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                    <span>❌</span> Removed
                  </h3>
                  <div className="space-y-2">
                    {patient.medicationChanges.removed.map((med, idx) => (
                      <div key={idx} className="bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
                        <p className="font-semibold text-gray-900">{med.name}</p>
                        <p className="text-sm text-gray-600">{med.dosage} - {med.frequency}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Safety Flags */}
            {patient.safetyFlags.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-2xl">⚠️</span> Safety Flags
                </h2>
                <div className="space-y-3">
                  {patient.safetyFlags.map((flag, idx) => (
                    <div key={idx} className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                      <div className="flex items-start gap-3">
                        <span className="text-xl">⚠️</span>
                        <div>
                          <p className="font-semibold text-yellow-900 uppercase text-xs mb-1">
                            [{flag.severity}]
                          </p>
                          <p className="text-yellow-800">{flag.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm pb-6">
          <p>Generated by AI-Powered Discharge Summary Agent</p>
          <p className="mt-1">🤖 Powered by GPT-4 • Built for Dscribe AI Assignment</p>
        </div>
      </div>
    </div>
  );
}
import { useReadContract, useActiveAccount } from "thirdweb/react";
import { contract } from "../../../lib/thirdweb";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Prescription() {
  const account = useActiveAccount();
  const walletAddress = account?.address;
  const navigate = useNavigate();

  const [doctorNames, setDoctorNames] = useState({});
  const [doctorAddresses, setDoctorAddresses] = useState([]);

  const {
    data: role,
    isPending: isRolePending,
    error: roleError,
  } = useReadContract({
    contract,
    method: "function roles(address) view returns (uint8)",
    params: [walletAddress],
  });

  const {
    data: prescriptions,
    isPending,
    error,
  } = useReadContract({
    contract,
    method:
      "function viewPatientPrescriptions(address _patient) view returns ((string diagnosis, string medication, address doctor, uint256 timestamp)[])",
    params: [walletAddress],
  });

  const uniqueDoctorAddresses = [
    ...new Set(prescriptions?.map((p) => p.doctor.toLowerCase()) || []),
  ];

  // Fetch doctor names when the uniqueDoctorAddresses change
  useEffect(() => {
    const fetchDoctorNames = async () => {
      const names = {};
      for (const address of uniqueDoctorAddresses) {
        const { data } = await useReadContract({
          contract,
          method: "function getDoctorName(address _doctor) view returns (string)",
          params: [address],
        });
        names[address] = data;
      }
      setDoctorNames(names);
    };

    if (uniqueDoctorAddresses.length > 0) {
      fetchDoctorNames();
    }
  }, [uniqueDoctorAddresses]);

  const formatDate = (timestamp) => {
    const date = new Date(Number(timestamp) * 1000);
    return format(date, "dd MMM yyyy, hh:mm a");
  };

  if (!walletAddress) {
    return (
      <div className="text-yellow-400 text-center mt-10">
        Please connect your wallet to view prescriptions.
      </div>
    );
  }

  if (isRolePending) {
    return (
      <div className="text-gray-300 text-center mt-10 animate-pulse">
        Verifying role...
      </div>
    );
  }

  const numericRole = role ? Number(role) : null;

  if (numericRole !== 1) {
    return (
      <div className="text-red-500 text-center mt-10">
        You must be a <strong>patient</strong> to access this page.
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="text-center text-gray-300 mt-10 animate-pulse">
        Loading your prescriptions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">
        Failed to fetch prescriptions: {error.message}
      </div>
    );
  }

  if (!prescriptions || prescriptions.length === 0) {
    return (
      <div className="text-white text-center mt-10">
        No prescriptions found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4 py-12 flex items-center justify-center">
      <div className="bg-[#1e293b] p-6 sm:p-10 rounded-2xl shadow-2xl w-full max-w-5xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-teal-400 mb-8 text-center">
          My Prescriptions
        </h2>

        <div className="space-y-6 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-gray-700 pr-2">
          {prescriptions.map((prescription, index) => {
            const doctorAddress = prescription.doctor.toLowerCase();
            const doctorName =
              doctorNames[doctorAddress] || prescription.doctor;

            return (
              <div
                key={index}
                className="border border-gray-700 rounded-lg p-5 bg-[#0f172a] hover:border-teal-500 transition"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                  <h3 className="text-xl font-semibold text-white mb-2 sm:mb-0">
                    Diagnosis:{" "}
                    <span className="text-gray-300 font-normal">
                      {prescription.diagnosis}
                    </span>
                  </h3>
                  <p className="text-sm text-gray-400">
                    {formatDate(prescription.timestamp)}
                  </p>
                </div>

                <p className="text-lg text-gray-200">
                  <span className="font-medium text-white">Medication:</span>{" "}
                  {prescription.medication}
                </p>

                <p className="text-sm mt-2 text-gray-400 break-words">
                  <span className="font-medium text-white">Prescribed by: Dr.</span>{" "}
                  {doctorName}
                </p>
              </div>
            );
          })}
        </div>

        {/* 🔙 Back Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate("/patient")}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

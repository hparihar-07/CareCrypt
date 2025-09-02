import { useEffect, useState } from "react";
import { useReadContract, useActiveAccount } from "thirdweb/react";
import { readContract } from "thirdweb";
import { contract } from "../../../lib/thirdweb";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FaRegCopy } from "react-icons/fa";

export default function PatientProfile() {
  const account = useActiveAccount();
  const address = account?.address;
  const navigate = useNavigate();

  const [detailedPatients, setDetailedPatients] = useState([]);
  const [patientAddress, setPatientAddress] = useState("");
  const [patientName, setPatientName] = useState("");

  const { data: role } = useReadContract({
    contract,
    method: "function roles(address) view returns (uint8)",
    params: [address],
  });

  const {
    data: patientList,
    isPending,
    error,
  } = useReadContract({
    contract,
    method: "function getPatientList(address) view returns (address[])",
    params: [address],
  });

  useEffect(() => {
    if (detailedPatients.length > 0) {
      setPatientAddress(detailedPatients[0].addr);
      setPatientName(detailedPatients[0].name);
    }
  }, [detailedPatients]);

  useEffect(() => {
    const fetchNames = async () => {
      if (!patientList) return;

      const patientsWithNames = await Promise.all(
        patientList.map(async (addr) => {
          try {
            const data = await readContract({
              contract,
              method:
                "function getPatientName(address _patient) view returns (string)",
              params: [addr],
            });
            return { addr, name: data };
          } catch {
            return { addr, name: "Unknown" };
          }
        })
      );

      setDetailedPatients(patientsWithNames);
    };

    fetchNames();
  }, [patientList]);

  const handleCopy = () => {
    navigator.clipboard.writeText(patientAddress);
    toast.success("Address copied to clipboard");
  };

  if (isPending)
    return (
      <div className="text-gray-300 text-center mt-8">
        Loading patient list...
      </div>
    );

  if (error)
    return (
      <div className="text-red-400 text-center mt-8">
        Error loading patients: {error.message}
      </div>
    );

  if (!patientList || patientList.length === 0)
    return (
      <div className="text-gray-400 text-center mt-8">No patients found.</div>
    );

  if (role !== 2)
    return (
      <div className="text-yellow-400 text-center mt-8">
        You must be a doctor to view patients.
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4 py-12">
      <div className="bg-[#1E293B]/80 backdrop-blur-lg text-white p-8 sm:p-12 rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col gap-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-teal-400">
          Patient Profile
        </h2>

        {/* 👤 Patient Avatar and Info */}
        <div className="flex flex-col items-center gap-4">
          <img
            src="https://imgs.search.brave.com/-9tTe2zZB0nb2yUj-5Kb-l71--0Pz9LqcAXiHyNpLgI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdDIu/ZGVwb3NpdHBob3Rv/cy5jb20vNTAzMzc0/MDIvNDcxMTgvdi80/NTAvZGVwb3NpdHBo/b3Rvc180NzExODEy/NDQtc3RvY2staWxs/dXN0cmF0aW9uLWFj/Y2lkZW50LWJsdWUt/Z3JhZGllbnQtdmVj/dG9yLWljb24uanBn"
            alt="Patient Avatar"
            className="w-32 h-32 rounded-full border-4 border-teal-500 shadow-md object-cover"
          />

          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-3xl font-semibold text-white">
              <span className="text-green-300">{patientName || "Unknown Patient"}</span>
            </h3>

            <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-2 text-gray-300 text-sm sm:text-base break-words">
              <span className="font-medium">Wallet Address:</span>
              <div className="flex items-center gap-2 bg-[#334155] px-3 py-2 rounded-md">
                <span className="break-all max-w-[200px] sm:max-w-none">
                  {patientAddress}
                </span>
                <button
                  onClick={handleCopy}
                  title="Copy Address"
                  className="hover:text-teal-400 transition"
                >
                  <FaRegCopy />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 💊 Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-md text-lg min-w-[150px]"
            onClick={() => navigate("/viewrecord")}
          >
            View Record
          </button>
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-md text-lg min-w-[150px]"
            onClick={() => navigate("/consultancy")}
          >
            Prescription
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md text-lg min-w-[150px]"
            onClick={() => navigate("/doctor")}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

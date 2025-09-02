import  { useEffect, useState } from "react";
import { useReadContract, useActiveAccount } from "thirdweb/react";
import { readContract } from "thirdweb";
import { contract } from "../../../lib/thirdweb";
import { useNavigate } from "react-router-dom";

export default function PatientList() {
  const account = useActiveAccount();
  const address = account?.address;
  const navigate = useNavigate();
  const [detailedPatients, setDetailedPatients] = useState([]);

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
    const fetchNames = async () => {
      if (!patientList) return;

      const patientsWithNames = await Promise.all(
        patientList.map(async (addr) => {
          try {
            const data = await readContract({
              contract,
              method: "function getPatientName(address _patient) view returns (string)",
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

  if (isPending)
    return <div className="text-gray-300 text-center mt-8">Loading patient list...</div>;

  if (error)
    return <div className="text-red-400 text-center mt-8">Error loading patients: {error.message}</div>;

  if (!patientList || patientList.length === 0)
    return <div className="text-gray-400 text-center mt-8">No patients found.</div>;

  if (role !== 2)
    return <div className="text-yellow-400 text-center mt-8">You must be a doctor to view patients.</div>;

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white px-6 py-10">
      <h1 className="text-center text-3xl font-mono mb-10">Patient's List</h1>

      <div className="max-w-3xl mx-auto space-y-4">
        {detailedPatients.map((patient, index) => (
          <div
            key={index}
            className="border border-gray-700 rounded-md px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between bg-[#181818]"
          >
            <div className="mb-2 sm:mb-0">
              <p className="text-sm">
                <span className="text-yellow-400 font-mono">Patient :</span>{" "}
                <span className="font-medium">{index + 1}</span>
              </p>
              <p className="text-sm">
                <span className="text-orange-400 font-mono">Name :</span>{" "}
                <span>{patient.name}</span>
              </p>
              <p className="text-sm">
                <span className="text-gray-400">Address :</span>{" "}
                <span className="break-words">{patient.addr}</span>
              </p>
            </div>
            <button
              onClick={() => navigate(`/profile`)}
              className="bg-teal-600 hover:bg-teal-700 text-white text-sm px-4 py-1.5 rounded"
            >
              View
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={() => navigate("/doctor")}
          className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded font-semibold"
        >
          Back
        </button>
      </div>
    </div>
  );
}

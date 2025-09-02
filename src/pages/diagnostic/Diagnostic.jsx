import React, { useState, useEffect } from "react";
import { useReadContract, useActiveAccount } from "thirdweb/react";
import { contract } from "../../../lib/thirdweb";
import { useNavigate } from "react-router-dom";

const Diagnostic = () => {
  const [diagnosticName, setDiagnosticName] = useState("Loading...");
  const [diagnosticBio] = useState(
    "Your clinic in the digital age. Where care meets convenience."
  );
  const [diagnosticProfileImage] = useState(
    "https://imgs.search.brave.com/eEguCAoE_xbFKCJrn5fpOUZSY0rq_Pk37Guim-igm5A/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvcHJldmll/dy0xeC83MC8zMC9z/cGluZS1kaWFnbm9z/dGljLWNlbnRlci12/ZWN0b3ItMjE4Mjcw/MzAuanBn"
  ); // Example static profile image

  const wallet = useActiveAccount();
  const diagnosticAddress = wallet?.address;
  const navigate = useNavigate();

  const { data, isPending, error } = useReadContract({
    contract,
    method:
      "function getDiagnosticName(address _diagnostic) view returns (string)",
    params: [diagnosticAddress],
  });

  useEffect(() => {
    if (data && !isPending) {
      setDiagnosticName(data);
    }
  }, [data, isPending]);

  const renderError = error ? (
    <p className="text-red-500">{error.message}</p>
  ) : null;

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-6 text-gray-200">
      <div className="max-w-4xl w-full bg-gray-800 rounded-xl shadow-xl p-12 flex flex-col md:flex-row items-center gap-10">
        <img
          src={diagnosticProfileImage}
          alt={`${diagnosticName}'s profile`}
          className="h-40 w-40 rounded-full border-4 border-teal-400 object-cover"
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl font-extrabold mb-3 text-teal-400">
            {diagnosticName}
          </h1>
          <p className="text-gray-400 text-lg mb-4 break-all">{diagnosticAddress}</p>
          <p className="text-gray-300 max-w-xl italic">{diagnosticBio}</p>
          <button
            onClick={() => navigate("/diagnostic")}
            className="mt-8 px-8 py-3 border border-teal-400 rounded-md text-teal-400 hover:bg-teal-500 hover:text-gray-900 transition font-semibold"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
      {renderError} {/* Display error if any */}
    </div>
  );
};

export default Diagnostic;

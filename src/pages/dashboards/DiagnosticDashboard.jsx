import { BeakerIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useReadContract, useActiveAccount } from "thirdweb/react";
import { contract } from "../../../lib/thirdweb";

export default function DiagnosticDashboard() {
  const wallet = useActiveAccount();
  const account = wallet?.address;
  const navigate = useNavigate();
  const [diagnosticName, setDiagnosticName] = useState("...");

  const { data, isPending } = useReadContract({
    contract,
    method: "function getDiagnosticName(address _diagnostic) view returns (string)",
    params: [account],
  });

  useEffect(() => {
    if (data && !isPending) {
      setDiagnosticName(data);
    }
  }, [data, isPending]);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 antialiased font-sans">
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white mb-2">Welcome back, <span className="text-green-300">{diagnosticName}</span></h1>
          <p className="text-green-400 truncate text-center mb-2">{account}</p>
          <p className="text-gray-400 text-lg text-center">Here is your latest health overview.</p>
        </div>

        
        <div className="flex justify-center mb-10">
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl w-full">
            <ActionCard
              title="Profile"
              subtitle="Manage your diagnostic details"
              icon={BeakerIcon}
              path="/diag"
              navigate={navigate}
            />
            <ActionCard
              title="Create Reports"
              subtitle="Add new diagnostic reports"
              icon={DocumentTextIcon}
              path="/report"
              navigate={navigate}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

function ActionCard({ title, subtitle, icon: Icon, onClick, path, navigate }) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (path) {
      navigate(path);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-[#1e293b] hover:bg-[#2e3a4d] border border-gray-700 rounded-xl p-8 transition duration-200 shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between min-h-[180px]"
    >
      <div className="flex items-center space-x-4 mb-6">
        <div className="bg-[#334155] p-4 rounded-full">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

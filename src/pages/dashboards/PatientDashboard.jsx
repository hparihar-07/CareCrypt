import {
  UserCircleIcon,
  ClipboardDocumentIcon,
  DocumentTextIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useReadContract, useActiveAccount } from "thirdweb/react";
import { contract } from "../../../lib/thirdweb";

export default function PatientDashboard() {
  const wallet = useActiveAccount();
  const address = wallet?.address;
  const navigate = useNavigate();

  const [patientName, setPatientName] = useState("Patient");

  const { data, isPending } = useReadContract({
    contract,
    method: "function getPatientName(address _patient) view returns (string)",
    params: [address],
  });

  useEffect(() => {
    if (data && !isPending) {
      setPatientName(data);
    }
  }, [data, isPending]);

  return (
    <div className="min-h-screen bg-[#0f172a] px-4 sm:px-6 py-10 text-white font-sans">
      <main className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white">
            Welcome back, <span className="text-green-300">{patientName}</span>
          </h1>
          <p className="mt-3 text-gray-400 text-base sm:text-lg">
            Manage your health data and access key features below.
          </p>
        </header>

        {/* Dashboard Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ActionCard
            title="Your Profile"
            subtitle="Manage your personal details"
            icon={UserCircleIcon}
            path="/pat"
            navigate={navigate}
          />
          <ActionCard
            title="Medical Records"
            subtitle="View your uploaded reports"
            icon={ClipboardDocumentIcon}
            path="/record"
            navigate={navigate}
          />
          <ActionCard
            title="Upload New Record"
            subtitle="Add a document to your profile"
            icon={UsersIcon}
            path="/upload"
            navigate={navigate}
          />
          <ActionCard
            title="Grant Access"
            subtitle="Give your doctor access"
            icon={DocumentTextIcon}
            path="/permission"
            navigate={navigate}
          />
          <ActionCard
            title="Prescriptions"
            subtitle="View Prescriptions from Doctors"
            icon={ClipboardDocumentIcon}
            path="/prescriptions"
            navigate={navigate}
          />
        </section>
      </main>
    </div>
  );
}

function ActionCard({ title, subtitle, icon: Icon, path, navigate }) {
  const handleClick = () => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-[#1e293b] hover:bg-[#2e3a4d] border border-gray-700 rounded-xl p-6 transition duration-200 shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between min-h-[160px]"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-[#334155] p-3 rounded-full">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <p className="text-sm text-gray-400">{subtitle}</p>
    </div>
  );
}

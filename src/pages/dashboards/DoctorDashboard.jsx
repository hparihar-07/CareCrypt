import { useState, useEffect } from "react";
import { useReadContract } from "thirdweb/react";
import { contract } from "../../../lib/thirdweb";
import { FaUserMd, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useActiveAccount } from "thirdweb/react";

export default function DoctorDashboard() {
  const wallet = useActiveAccount();
  const account = wallet?.address;
  const [doctorName, setDoctorName] = useState("...");

  const navigate = useNavigate();

  const { data, isPending } = useReadContract({
    contract,
    method: "function getDoctorName(address _doctor) view returns (string)",
    params: [account],
  });

  useEffect(() => {
    if (data && !isPending) {
      setDoctorName(data);
    }
  }, [data, isPending]);

  return (
    <div className="flex h-screen bg-gray-900 antialiased text-gray-100">
      <main className="flex-1 overflow-y-auto p-10 font-sans">
        <header className="text-center mb-12">
            <h1 className="text-4xl font-extrabold sm:text-5xl leading-tight text-gray-50">
              Welcome back, Dr. <span className="text-green-300">{doctorName}</span>
            </h1>
          
        </header>

        <div className="flex justify-center mb-10">
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto w-full">
            <ActionCard
              title="Profile"
              subtitle="Manage your details"
              icon={FaUserMd}
              path="/doc"
              navigate={navigate}
            />
            <ActionCard
              title="Patients"
              subtitle="View your patient list"
              icon={FaUsers}
              path="/patients"
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
      className="bg-[#1e293b] hover:bg-[#2e3a4d] border border-gray-700 rounded-xl p-8 transition duration-200 shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between min-h-[180px]"
      onClick={handleClick}
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

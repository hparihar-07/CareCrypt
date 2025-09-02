import React, { useState, useEffect } from "react";
import { useReadContract, useActiveAccount } from "thirdweb/react";
import { contract } from "../../lib/thirdweb";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const wallet = useActiveAccount();
  const address = wallet?.address;
  const navigate = useNavigate();

  const { data: roleData, isPending, error } = useReadContract({
    contract,
    method: "function roles(address) view returns (uint8)",
    params: [address],
  });

  const [role, setRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Toast & redirect if wallet not connected (only once)
  useEffect(() => {
    if (!address) {
      toast.error("Please connect your wallet to log in.");
      const timer = setTimeout(() => navigate("/register"), 2500);
      return () => clearTimeout(timer);
    }
  }, [address, navigate]);

  // Update role & login status
  useEffect(() => {
    if (roleData !== undefined && !isPending) {
      const roleStr = roleData.toString();
      setRole(roleStr);
      setIsLoggedIn(roleStr !== "0");
    }
  }, [roleData, isPending]);

  const roleName = (roleId) => {
    switch (roleId) {
      case "1":
        return "Patient";
      case "2":
        return "Doctor";
      case "3":
        return "Diagnostic";
      default:
        return "Unknown Role";
    }
  };

  const handleGoToDashboard = () => {
    switch (role) {
      case "1":
        navigate("/patient");
        break;
      case "2":
        navigate("/doctor");
        break;
      case "3":
        navigate("/diagnostic");
        break;
      default:
        toast.error("Unknown role. Please contact support.");
    }
  };

  const renderContent = () => {
    if (isPending) {
      return (
        <p className="text-gray-400 text-center animate-pulse select-none">
          Loading your role...
        </p>
      );
    }

    if (error) {
      return (
        <p className="text-red-500 text-center font-semibold">
          Error: {error.message}
        </p>
      );
    }

    if (!isLoggedIn) {
      return (
        <div className="text-center text-gray-300">
          <h2 className="text-xl mb-4">No registered role found</h2>
          <p>Please register to continue.</p>
          <button
            onClick={() => navigate("/register")}
            className="mt-6 px-6 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition"
          >
            Go to Registration
          </button>
        </div>
      );
    }

    return (
      <div className="text-center">
        <h3 className="text-2xl text-white font-semibold mb-4">
          Welcome, <span className="text-green-300">{roleName(role)}</span>!
        </h3>
        <button
          onClick={handleGoToDashboard}
          className="px-8 py-3 bg-green-600 rounded-md text-white font-semibold hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-6">
      <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-8">
        <h1 className="text-3xl text-white font-bold mb-8 text-center">
          Login to Your Dashboard
        </h1>
        {renderContent()}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSendTransaction, useActiveAccount } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { contract } from "../../../lib/thirdweb";
import { toast } from "sonner";

const Permission = () => {
  const account = useActiveAccount();
  const address = account?.address;
  const navigate = useNavigate();

  const [walletAddress, setWalletAddress] = useState("");
  const { mutate: sendTransaction, isLoading } = useSendTransaction();

  const handleGiveAccess = async () => {
    if (!address) {
      toast.error("Please connect your wallet first.");
      return;
    }
    if (walletAddress.trim()) {
      try {
        const transaction = prepareContractCall({
          contract,
          method: "function grantPermission(address _doctor)",
          params: [walletAddress.trim()],
        });
        sendTransaction(transaction, {
          onSuccess: () => toast.success(`Access granted to ${walletAddress.trim()}`),
          onError: () => toast.error("An error occurred while granting access."),
        });
      } catch {
        toast.error("Already granted access to this doctor.");
      }
    } else {
      toast.error("Please fill in the wallet address.");
    }
  };

  const handleCancel = () => {
    navigate("/patient");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-xl border border-gray-700">
        <h1 className="text-2xl font-bold mb-6 text-center tracking-wide">
          Grant Permission to Doctor
        </h1>

        <label className="block text-sm text-gray-300 mb-2">Doctor Wallet Address</label>
        <input
          type="text"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder="e.g., 0x1234...abcd"
          className="w-full px-4 py-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 text-white placeholder-gray-500 transition"
          spellCheck="false"
          autoComplete="off"
        />

        <div className="flex justify-between gap-4 mt-6">
          <button
            onClick={handleGiveAccess}
            disabled={isLoading}
            className={`flex-1 py-3 rounded-md font-semibold text-white transition
              ${
                isLoading
                  ? "bg-green-600 cursor-not-allowed opacity-70"
                  : "bg-green-600 hover:bg-green-500"
              }`}
          >
            {isLoading ? "Processing..." : "Give Access"}
          </button>

          <button
            onClick={handleCancel}
            className="flex-1 py-3 rounded-md font-semibold text-white bg-gray-700 hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Permission;

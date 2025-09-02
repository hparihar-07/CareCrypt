import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { contract } from "../../lib/thirdweb";
import { toast } from "sonner";
import clsx from "clsx";
import { useActiveAccount } from "thirdweb/react";

const roles = ["Patient", "Doctor", "Diagnostic"];

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { mutate: sendTransaction, isPending } = useSendTransaction();
  const wallet = useActiveAccount();

  const handleRegister = () => {
    if (!selectedRole || !name.trim()) {
      toast.error("Please select a role and enter your name");
      return;
    }

    const functionSignature =
      selectedRole === "Doctor"
        ? "function registerDoctor(string _name)"
        : selectedRole === "Patient"
        ? "function registerPatient(string _name)"
        : "function registerDiagnostic(string _name)";

    const transaction = prepareContractCall({
      contract,
      method: functionSignature,
      params: [name.trim()],
    });

    sendTransaction(transaction, {
      onSuccess: () => {
        toast.success(`${selectedRole} registered successfully!`);
        navigate(`/${selectedRole.toLowerCase()}`);
      },
      onError: (err) => {
        console.error("Registration failed:", err);
        toast.error("Registration failed. Please try again.");
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gray-950">
      <h1 className="text-4xl font-bold mb-10 text-green-300 select-none">Register as</h1>

      {/* Role Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-4xl mb-12">
        {roles.map((role) => {
          const isSelected = selectedRole === role;
          return (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              aria-pressed={isSelected}
              className={clsx(
                "flex flex-col items-center justify-center p-8 rounded-xl border transition-transform duration-300 ease-in-out",
                isSelected
                  ? "bg-blue-600 border-blue-500 shadow-lg scale-105"
                  : "bg-gray-800 border-gray-700 hover:border-blue-500 hover:scale-105",
                "focus:outline-none focus:ring-4 focus:ring-blue-400"
              )}
              type="button"
            >
              <h2 className="text-2xl font-semibold text-white">{role}</h2>
            </button>
          );
        })}
      </div>

      {/* Name Input */}
      {selectedRole && (
        <div className="mb-8 w-full max-w-md">
          <label
            htmlFor="nameInput"
            className="block mb-2 text-white font-semibold"
          >
            {selectedRole} Name
          </label>
          <input
            id="nameInput"
            type="text"
            placeholder={`Enter your name`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isPending}
            className="w-full px-4 py-3 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
            autoComplete="off"
            autoFocus
          />
        </div>
      )}

      {/* Register Button */}
      <button
        onClick={handleRegister}
        disabled={!selectedRole || !name.trim() || isPending}
        className={clsx(
          "px-10 py-3 rounded-lg text-lg font-semibold transition",
          !selectedRole || !name.trim() || isPending
            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        )}
        type="button"
      >
        {isPending ? "Registering..." : "Register"}
      </button>
    </div>
  );
}

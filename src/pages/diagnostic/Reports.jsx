import { useState, useRef } from "react";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { contract } from "../../../lib/thirdweb";
import { toast } from "sonner";
import { HiCloudUpload } from "react-icons/hi";
import {useRecords} from "../patient/RecordsContext"; // Import the context to add uploaded URLs

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export default function Reports() {
  const account = useActiveAccount();
  const address = account?.address;
  const { addRecord } = useRecords(); // Access context to add the uploaded URL

  const { mutate: sendTransaction } = useSendTransaction();

  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const isValidType = ["application/pdf", "image/jpeg", "image/png"].includes(selected.type);
    const isValidSize = selected.size / 1024 / 1024 <= 5; // 5MB limit

    if (!isValidType) {
      toast.error("Invalid file type. Only PDF or images are allowed.");
      return;
    }

    if (!isValidSize) {
      toast.error("File is too large. Max size is 5MB.");
      return;
    }

    setFile(selected);
  };

  const uploadFileToCloudinary = async () => {
    if (!file) throw new Error("No file selected");

    const formDataCloud = new FormData();
    formDataCloud.append("file", file);
    formDataCloud.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
      {
        method: "POST",
        body: formDataCloud,
      }
    );

    const data = await res.json();
    if (!res.ok || !data.secure_url) {
      throw new Error(data.error?.message || "Upload to Cloudinary failed.");
    }

    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    if (!address) {
      toast.error("Connect your wallet first.");
      return;
    }

    setIsUploading(true);

    try {
      // Upload the file to Cloudinary and get the URL
      const uploadedUrl = await uploadFileToCloudinary();

      // Add the uploaded URL to the context (so it can be tracked in the app)
      addRecord(uploadedUrl);

      // Prepare the transaction using prepareContractCall
      const transaction = prepareContractCall({
        contract: contract,
        method: "function upload(string _ipfsHash)", // Ensure this is the correct method in your contract
        params: [uploadedUrl], 
      });

      // Send the transaction to the blockchain
      await sendTransaction(transaction);

      toast.success("File uploaded and record stored on blockchain!");

      // Optionally navigate to another page, e.g., All Records view
      // navigate("/records");

      // Reset file state
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4 py-10">
      <div className="bg-[#1E293B]/70 backdrop-blur-md border border-[#334155] rounded-xl p-8 w-full max-w-2xl shadow-2xl">
        <div className="flex items-center justify-center mb-6">
          <HiCloudUpload className="text-4xl text-teal-400 animate-bounce mr-2" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center">
            Upload Medical Report
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Connected Wallet
            </label>
            <input
              type="text"
              value={address || ""}
              readOnly
              className="w-full bg-[#334155] text-white p-3 rounded-lg border border-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Select Report File
            </label>
            <div className="relative w-full">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                ref={fileInputRef}
                onChange={handleFileChange}
                disabled={isUploading}
                className="block w-full p-3 bg-[#334155] text-white rounded-lg border border-gray-600 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700"
              />
            </div>
            {file && (
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-400 text-sm">
                  Selected: <span className="font-medium text-white">{file.name}</span>
                </p>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-teal-500 hover:text-teal-700"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className={`w-full py-3 rounded-lg text-white font-semibold text-lg transition duration-300 ${
              isUploading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
            }`}
          >
            {isUploading ? (
              <span className="flex justify-center items-center">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"
                  />
                </svg>
                <span className="ml-2">Uploading...</span>
              </span>
            ) : (
              "Upload"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

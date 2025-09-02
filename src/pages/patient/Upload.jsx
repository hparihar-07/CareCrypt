import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { useRecords } from './RecordsContext'; // Import the context
import { useNavigate } from 'react-router-dom';
import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { contract} from '../../../lib/thirdweb';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export default function Upload() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef();
  const { addRecord } = useRecords(); // Use context to add uploaded files
  const navigate = useNavigate();
  const { mutate: sendTransaction } = useSendTransaction(); // Thirdweb hook

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    setFile(selected);
  };

  const uploadFile = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    setIsUploading(true);

    try {
      // Uploading to Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Upload failed');
      }

      const cloudinaryUrl = data.secure_url; // Cloudinary URL

      // Add Cloudinary URL to context (optional)
      addRecord(cloudinaryUrl);

      // Send Cloudinary URL to smart contract
      const transaction = prepareContractCall({
        contract: contract, // Ensure the contract instance is defined and connected
        method: "function uploadRecord(string _ipfsHash)", // Smart contract method
        params: [cloudinaryUrl], // Pass the Cloudinary URL instead of IPFS hash
      });

      await sendTransaction(transaction); // Send transaction

      toast.success('Upload successful and record stored on blockchain!');
      
    } catch (error) {
      toast.error('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Upload Your Records</h1>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="mb-4 w-full max-w-md bg-gray-700 text-white p-3 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex gap-4 mb-6 flex-wrap justify-center">
        <button
          onClick={uploadFile}
          disabled={!file || isUploading}
          className={`px-6 py-3 rounded text-lg font-medium transition ${
            !file || isUploading
              ? 'bg-green-600 cursor-not-allowed'
              : 'border border-green-300 hover:bg-green-500'
          }`}
        >
          {isUploading ? 'Uploading...' : 'Upload Record'}
        </button>

        <button
          onClick={() => navigate('/patient')}
          className="px-6 py-3 rounded text-lg font-medium bg-red-600 hover:bg-red-700 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useReadContract, useActiveAccount } from "thirdweb/react";
import { contract } from "../../../lib/thirdweb";
import { useNavigate } from "react-router-dom";

const Doctor = () => {
  const [doctorName, setDoctorName] = useState("Loading...");
  const [doctorBio] = useState(
    "Healing with expertise, one patient at a time." // Example static bio
  );
  const [doctorProfileImage] = useState(
    "https://imgs.search.brave.com/zdkQBhpsJREOy9815KWgiyGBqQYbqVu1bY87qiZuf7A/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC81/NC84MS9kb2N0b3It/c2lsaG91ZXR0ZS1h/cnQtdmVjdG9yLTUz/MTQ1NDgxLmpwZw"
  ); // Example static profile image

  const wallet = useActiveAccount();
  const doctorAddress = wallet?.address; // Get the user's wallet address
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const { data, isPending, error } = useReadContract({
    contract,
    method: "function getDoctorName(address _doctor) view returns (string)",
    params: [doctorAddress],
  });

  // Effect to update patient name once data is fetched
  useEffect(() => {
    if (data && !isPending) {
      setDoctorName(data); // Setting the fetched patient name
    }
  }, [data, isPending]);

  const renderError = error ? (
    <p className="text-red-500">{error.message}</p>
  ) : null;

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-6 text-gray-200">
      <div className="max-w-4xl w-full bg-gray-800 rounded-xl shadow-xl p-12 flex flex-col md:flex-row items-center gap-10">
        <img
          src={doctorProfileImage}
          alt={`${doctorName}'s profile`}
          className="h-40 w-40 rounded-full mx-auto border-4 border-teal-400 object-cover"
        />
        <div className=" flex-1 text-center md:text-left">
          <h1 className="text-5xl font-extrabold mb-3 text-teal-400">
            {doctorName}
          </h1>
          <p className="text-gray-400 text-lg mb-4 break-all">
            {doctorAddress}
          </p>
          <p className="text-gray-300 max-w-xl italic">{doctorBio}</p>

          <button
            onClick={() => navigate("/doctor")}
            className="mt-8 px-8 py-3 border border-teal-400 rounded-md text-teal-400 hover:bg-teal-500 hover:text-gray-900 transition font-semibold"
          >
            Back
          </button>
        </div>
      </div>
      {renderError}
    </div>
  );
};

export default Doctor;

// import React, { useState, useEffect } from "react";
// import { useReadContract } from "thirdweb/react";
// import { contract } from "../../../lib/thirdweb"; // Make sure to import your contract
// import { useActiveAccount } from "thirdweb/react";
// import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

// const Patient = () => {
//   const [patientName, setPatientName] = useState("Loading...");
//   const [patientBio] = useState(
//     "Striving for balance and better health with every day.!" // Example static bio
//   );
//   const [patientProfileImage] = useState(
//     "https://imgs.search.brave.com/-sMooztNupOtjxx4ssWOAQVvBmF3ZMObjZg5LJqBy48/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9mZW1h/bGUtcGF0aWVudC1l/eGFtaW5hdGlvbi1i/ZWQtaWxsdXN0cmF0/aW9uLTc3NDM2NzM2/LmpwZw"
//   ); // Example static profile image

//   const wallet = useActiveAccount();
//   const patientAddress = wallet?.address; // Get the user's wallet address
//   const navigate = useNavigate(); // Initialize the useNavigate hook

//   const { data, isPending, error } = useReadContract({
//     contract,
//     method: "function getPatientName(address _patient) view returns (string)",
//     params: [patientAddress],
//   });

//   // Effect to update patient name once data is fetched
//   useEffect(() => {
//     if (data && !isPending) {
//       setPatientName(data); // Setting the fetched patient name
//     }
//   }, [data, isPending]);

//   // Handle potential errors
//   const renderError = error ? (
//     <p className="text-red-500">{error.message}</p>
//   ) : null;

//   return (
//     <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
//       <div className="bg-gray-800 text-white rounded-xl shadow-2xl overflow-hidden max-w-sm w-full transition-all duration-300 transform hover:scale-105">
//         <div className="relative h-32 bg-gray-700">
//           {/* Background banner could go here */}
//            <img src="/crypt.png" alt="logo" className="h-32 w-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
//         </div>
//         <div className="relative -mt-16 pt-4">
//           <img
//             className="h-24 w-24 rounded-full mx-auto border-4 border-gray-800 object-cover"
//             src={patientProfileImage || 'https://imgs.search.brave.com/s24MjbuXX8KetJ2qjDi0DRTMPOsNBNcqfNVHCGIOe0I/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMud2lraWEubm9j/b29raWUubmV0L2Fu/aW1lL2ltYWdlcy82/LzYwL0FlODYuanBn/L3JldmlzaW9uL2xh/dGVzdC9zY2FsZS10/by13aWR0aC1kb3du/LzI2OD9jYj0yMDIw/MDkwNzAwMzU1NA'}
//             alt={`${patientName}'s profile`}
//           />
//         </div>
//         <div className="text-center p-6">
//           <h2 className="text-3xl font-bold mb-2 text-teal-400">{patientName}</h2>
//           <p className="text-gray-400 text-lg mb-4">{patientAddress}</p>
//           <p className="text-gray-300 text-sm italic">{patientBio}</p>
//         </div>
//         <div className="p-4">
//           {/* Back Button */}
//           <button
//             onClick={() => navigate("/patient")} // Navigates to the /patient route
//             className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
//           >
//             Back
//           </button>
//         </div>
//       </div>
//       {renderError} {/* Display error if any */}
//     </div>
//   );
// };

// export default Patient;

import { useState, useEffect } from "react";
import { useReadContract, useActiveAccount } from "thirdweb/react";
import { contract } from "../../../lib/thirdweb";
import { useNavigate } from "react-router-dom";

const Patient = () => {
  const wallet = useActiveAccount();
  const patientAddress = wallet?.address;
  const navigate = useNavigate();

  const [patientName, setPatientName] = useState("Loading...");
  const [patientBio] = useState(
    "Committed to wellness and mindful living every day."
  );
  const patientProfileImage =
    "https://imgs.search.brave.com/-9tTe2zZB0nb2yUj-5Kb-l71--0Pz9LqcAXiHyNpLgI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdDIu/ZGVwb3NpdHBob3Rv/cy5jb20vNTAzMzc0/MDIvNDcxMTgvdi80/NTAvZGVwb3NpdHBo/b3Rvc180NzExODEy/NDQtc3RvY2staWxs/dXN0cmF0aW9uLWFj/Y2lkZW50LWJsdWUt/Z3JhZGllbnQtdmVj/dG9yLWljb24uanBn";

  const { data, isPending, error } = useReadContract({
    contract,
    method: "function getPatientName(address _patient) view returns (string)",
    params: [patientAddress],
  });

  useEffect(() => {
    if (data && !isPending) setPatientName(data);
  }, [data, isPending]);

  const renderError = error ? (
    <p className="text-red-500">{error.message}</p>
  ) : null;

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-6 text-gray-200">
      <div className="max-w-4xl w-full bg-gray-800 rounded-xl shadow-xl p-12 flex flex-col md:flex-row items-center gap-10">
        <img
          src={patientProfileImage}
          alt={`${patientName} avatar`}
          className="h-40 w-40 rounded-full border-4 border-teal-400 object-cover"
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl font-extrabold mb-3 text-teal-400">
            {patientName}
          </h1>
          <p className="text-gray-400 text-lg mb-4 break-all">
            {patientAddress}
          </p>
          <p className="text-gray-300 italic max-w-xl">{patientBio}</p>

          <button
            onClick={() => navigate("/patient")}
            className="mt-8 px-8 py-3 border border-teal-400 rounded-md text-teal-400 hover:bg-teal-500 hover:text-gray-900 transition font-semibold"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
      {renderError}
    </div>
  );
};

export default Patient;

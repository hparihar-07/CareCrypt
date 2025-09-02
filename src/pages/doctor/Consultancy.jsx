import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { prepareContractCall } from 'thirdweb';
import { useSendTransaction } from 'thirdweb/react';
import { contract } from '../../../lib/thirdweb'; // Adjust if needed
import { toast } from 'sonner';

export default function Consultancy() {
  const navigate = useNavigate();
  const { mutate: sendTransaction, isLoading } = useSendTransaction();

  const [patient, setPatient] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [medication, setMedication] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patient || !diagnosis || !medication) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      const transaction = prepareContractCall({
        contract,
        method:
          'function prescribe(address _patient, string _diagnosis, string _medication)',
        params: [patient, diagnosis, medication],
      });

      await sendTransaction(transaction);

      toast.success('Prescription submitted successfully!');
      setPatient('');
      setDiagnosis('');
      setMedication('');
    } catch (error) {
      console.error(error);
      toast.error(`Transaction failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#101820] px-4 py-10">
      <div className="bg-[#1A1F2E] text-white p-6 sm:p-10 rounded-xl w-full max-w-2xl shadow-lg">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
          Prescribe Medication
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 mb-6">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Patient Wallet Address
            </label>
            <input
              type="text"
              value={patient}
              onChange={(e) => setPatient(e.target.value)}
              className="w-full bg-[#2A2F3C] p-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="0x..."
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Diagnosis</label>
            <textarea
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              rows="3"
              className="w-full bg-[#2A2F3C] p-3 rounded-md text-white resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter diagnosis"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Medication / Prescription
            </label>
            <textarea
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              rows="3"
              className="w-full bg-[#2A2F3C] p-3 rounded-md text-white resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter medication"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-md text-white font-semibold text-lg transition duration-300 ${
              isLoading
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600'
            }`}
          >
            {isLoading ? 'Sending...' : 'Prescribe'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="w-full py-3 rounded-md bg-gray-700 hover:bg-gray-600 text-white font-semibold text-lg transition duration-300"
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
}

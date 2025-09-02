import { useNavigate } from 'react-router-dom';
import { useRecords } from '../patient/RecordsContext';
import { toast } from 'sonner';

export default function ViewRecord() {
  const { uploadedUrls } = useRecords(); // Get all uploaded URLs
  const navigate = useNavigate();

  const handleImageClick = (url) => {
    if (!url) {
      toast.error('No record to view.');
      return;
    }
    window.open(url, '_blank');
    toast.success('Opening record in a new tab!');
  };

  if (uploadedUrls.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
        <h2 className="text-xl mb-4">No records available to view.</h2>
        <button
          onClick={() => navigate('/profile')}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Uploaded Records</h1>

      {/* Displaying all the uploaded records */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {uploadedUrls.map((url, index) => (
          <div
            key={index}
            className="max-w-full max-h-[300px] cursor-pointer rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={url}
              alt={`Uploaded Record ${index + 1}`}
              onClick={() => handleImageClick(url)}
              className="w-full h-full object-contain transition duration-300 hover:scale-105"
            />
            <p className="mt-2 text-gray-400 text-sm break-all text-center">
              Click to open in a new tab
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/profile')}
        className="mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition duration-300"
      >
        Back
      </button>
    </div>
  );
}

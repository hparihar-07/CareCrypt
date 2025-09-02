
import { useRecords } from './RecordsContext'; // Import context to get the uploaded URLs
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Record() {
  
  const { uploadedUrls } = useRecords(); // Get uploaded URLs from the context
  const navigate = useNavigate();

  const handleView = (url) => {
    // Open the image link in a new tab
    window.open(url, '_blank');
    toast.success('Opening image in a new tab!');
  };

  // console.log('urls -> ', uploadedUrls);
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-6 py-10 font-mono flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">View Records</h1>

      <div className="w-full max-w-3xl space-y-4">
        {uploadedUrls.length === 0 ? (
          <p className="text-center text-gray-500">No records uploaded yet.</p>
        ) : (
          uploadedUrls.map((url, index) => (
            <div
              key={index}
              className="border border-gray-600 rounded-md p-4 flex justify-between items-center hover:bg-gray-800 transition"
            >
              <div>
                <p className="text-sm mb-1">
                  <span className="text-yellow-400">Record :</span> {index + 1}
                </p>
                <p className="text-sm mb-1">
                  <span className="text-orange-400">File URL :</span> {url}
                </p>
              </div>

              <button
                onClick={() => handleView(url)}
                className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-1 rounded text-sm transition"
              >
                View
              </button>
            </div>
          ))
        )}
      </div>

      <button
        onClick={() => navigate('/patient')}
        className="mt-10 bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded transition"
      >
        Back
      </button>
    </div>
  );
}

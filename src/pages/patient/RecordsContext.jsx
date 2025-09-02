import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const RecordsContext = createContext();

// Provider component
export const RecordsProvider = ({ children }) => {
  const [uploadedUrls, setUploadedUrls] = useState(() => {
    // Load from localStorage when app initializes
    const stored = localStorage.getItem('uploadedUrls');
    return stored ? JSON.parse(stored) : [];
  });

  // Save to localStorage every time uploadedUrls changes
  useEffect(() => {
    localStorage.setItem('uploadedUrls', JSON.stringify(uploadedUrls));
  }, [uploadedUrls]);

  // Function to update the uploaded URLs
  const addRecord = (url) => {
    setUploadedUrls((prev) => [...prev, url]);
  };

  return (
    <RecordsContext.Provider value={{ uploadedUrls, addRecord }}>
      {children}
    </RecordsContext.Provider>
  );
};

// Custom hook to use the context
export const useRecords = () => useContext(RecordsContext);

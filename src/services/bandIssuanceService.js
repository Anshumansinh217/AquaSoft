const STORAGE_KEY = 'bandIssuances';

// Helper function to safely generate IDs
const generateNextId = (data) => {
  if (data.length === 0) return 1;
  const maxId = data.reduce((max, item) => 
    Math.max(max, typeof item.id === 'number' ? item.id : 0), 0);
  return maxId + 1;
};

// Get all data with proper error handling
export const getAllBandIssuances = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading band issuances:', error);
    return [];
  }
};

// Get by ID
export const getBandIssuanceById = (id) => {
  const data = getAllBandIssuances();
  return data.find(item => item.id === id);
};

// Add new entry with validation
export const addBandIssuance = (newData) => {
  const data = getAllBandIssuances();
  const nextId = generateNextId(data);
  
  const newEntry = {
    id: nextId,
    ...newData,
    // Ensure these critical fields exist
    totalAmount: newData.totalAmount || 0,
    balanceAmount: newData.balanceAmount || 0,
    // Only set issueDate if not already provided
    issueDate: newData.issueDate || new Date().toISOString()
  };

  try {
    const updatedData = [...data, newEntry];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    return newEntry;
  } catch (error) {
    console.error('Error saving band issuance:', error);
    throw error;
  }
};

// Delete entry
export const deleteBandIssuance = (id) => {
  const data = getAllBandIssuances();
  const updatedData = data.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
};

// Update entry with validation
export const updateBandIssuance = (id, updatedData) => {
  const data = getAllBandIssuances();
  const updated = data.map(item =>
    item.id === id ? { 
      ...item, 
      ...updatedData,
      // Preserve these fields if not provided in update
      totalAmount: updatedData.totalAmount !== undefined ? updatedData.totalAmount : item.totalAmount,
      balanceAmount: updatedData.balanceAmount !== undefined ? updatedData.balanceAmount : item.balanceAmount
    } : item
  );
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};
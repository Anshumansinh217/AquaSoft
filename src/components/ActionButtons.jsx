import { useNavigate } from "react-router-dom";

const ActionButtons = ({ onSave }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between space-x-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="relative overflow-hidden px-6 py-3 rounded-xl font-medium text-purple-900 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-x-1"
      >
        <span className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </span>
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
      </button>

      {/* Save & Print Button */}
      <button
        onClick={onSave}
        className="relative overflow-hidden px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-x-1 group"
      >
        <span className="relative z-10 flex items-center">
          Save & Print
          <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
        <span className="absolute top-0 right-0 w-8 h-8 -mr-4 -mt-4 bg-white/30 rounded-full animate-ping"></span>
      </button>
    </div>
  );
};
export default ActionButtons;

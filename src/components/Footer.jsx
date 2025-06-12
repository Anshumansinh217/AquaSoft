const Footer = () => {
  return (
    <footer className="bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-xs">
      <div className="max-w-8xl mx-auto px-8 py-4 text-center">
        <p className="text-sm text-gray-600">
          Designed & Developed by{" "}
          <a
            href="https://pearlinfo.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-800 transition-all duration-300 hover:underline hover:underline-offset-4 hover:text-blue-700"
          >
            Add Pearlinfo Pvt. Ltd.
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

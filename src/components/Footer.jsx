import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Logo + Tagline */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 mb-3">
            <img
              src="/ccare.png" // Replace with your logo path
              alt="CareCrypt Logo"
              className="w-8 h-8"
            />
            <span className="text-white text-xl font-bold tracking-wide">CareCrypt</span>
          </div>
          <p className="text-sm text-gray-500 max-w-xs">
            Secure, decentralized health record management — built for privacy, trust, and control.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2 text-sm items-center md:items-start">
          <h4 className="text-white font-semibold mb-1">Quick Links</h4>
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/about" className="hover:text-white transition">About</Link>
          <Link to="/register" className="hover:text-white transition">Register</Link>
          <Link to="/creator" className="hover:text-white transition">Team</Link>
        </div>

        {/* Attribution with Link to Team */}
        <div className="flex flex-col items-center md:items-end text-sm text-center md:text-right">
          <h4 className="text-white font-semibold mb-1">Built With ♥</h4>
          <p>
            Created by{' '}
            <Link
              to="/creator"
              className="text-teal-400 font-medium hover:underline hover:text-teal-300 transition"
            >
              Team CareCrypt
            </Link>
          </p>
          <p className="text-gray-600 mt-2">
            © {new Date().getFullYear()} CareCrypt. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

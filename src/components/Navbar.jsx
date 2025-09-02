import { useState } from "react";
import { Link } from "react-router-dom";
import { ConnectButton } from "thirdweb/react";
import { client, wallets } from "../../lib/thirdweb";
import { sepolia } from "thirdweb/chains";

import { HiMenu, HiX } from "react-icons/hi"; // From react-icons

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="inset-x-0 top-4 z-50 h-16 sm:inset-x-6">
      <nav className="w-full flex justify-between items-center px-6 py-4 bg-black backdrop-blur-md shadow-2xl border border-gray-800 relative">
        <h1 className="font-bold text-green-300 text-3xl drop-shadow-[0_0_8px_rgba(45,212,191,0.6)]">
          CareCrypt
        </h1>

        {/* Hamburger menu icon for mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-teal-400 focus:outline-none text-3xl"
          >
            {isMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 uppercase items-center font-bold">
          <NavLinks />
          <li>
            <ConnectButton
              client={client}
              chain={sepolia}
              accountAbstraction={{ chain: sepolia, sponsorGas: true }}
              connectModal={{ showThirdwebBranding: false, size: "wide" }}
              wallets={wallets}
            />
          </li>
        </ul>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-black border-t border-gray-800 z-40 md:hidden">
            <ul className="flex flex-col gap-4 p-4 uppercase font-bold">
              <NavLinks onClick={() => setIsMenuOpen(false)} />
              <li>
                <ConnectButton
                  client={client}
                  chain={sepolia}
                  accountAbstraction={{ chain: sepolia, sponsorGas: true }}
                  connectModal={{ showThirdwebBranding: false, size: "wide" }}
                  wallets={wallets}
                />
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}

function NavLinks({ onClick = () => {} }) {
  const links = [
    { path: "/doctor", label: "Doc" },
    { path: "/patient", label: "Pat" },
    { path: "/diagnostic", label: "Lab" },
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/register", label: "Register" },
    { path: "/login", label: "Login" },
  ];

  return (
    <>
      {links.map((link) => (
        <li
          key={link.path}
          className="text-gray-400 hover:text-teal-400 transition-colors duration-300"
        >
          <Link to={link.path} onClick={onClick}>
            {link.label}
          </Link>
        </li>
      ))}
    </>
  );
}

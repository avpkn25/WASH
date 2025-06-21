// File: src/components/Header.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-orange-500">WASH</h2>

        <ul className="hidden md:flex space-x-6 font-medium text-gray-700">
          {isHome ? (
            <>
              <li>
                <a
                  href="#home"
                  onClick={(e) => scrollToSection(e, "home")}
                  className="hover:text-orange-500"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => scrollToSection(e, "about")}
                  className="hover:text-orange-500"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "contact")}
                  className="hover:text-orange-500"
                >
                  Contact
                </a>
              </li>
            </>
          ) : (
            <li>
              <Link to="/" className="hover:text-orange-500">
                Back to Home
              </Link>
            </li>
          )}
          <li>
            <Link to="/blog" className="hover:text-orange-500">
              Blog
            </Link>
          </li>
        </ul>

        <button
          className="hidden md:block bg-orange-500 text-white px-4 py-2 rounded-md font-semibold"
          onClick={() => navigate("/login")}
        >
          Login
        </button>

        <div className="md:hidden">
          {isOpen ? (
            <X
              className="w-6 h-6 text-orange-500"
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <Menu
              className="w-6 h-6 text-orange-500"
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 shadow-sm">
          <ul className="space-y-4 font-medium text-gray-700">
            {isHome && (
              <>
                <li>
                  <a href="#home" onClick={(e) => scrollToSection(e, "home")}>
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" onClick={(e) => scrollToSection(e, "about")}>
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#campaigns"
                    onClick={(e) => scrollToSection(e, "campaigns")}
                  >
                    Campaigns
                  </a>
                </li>
                <li>
                  <a
                    href="#donate"
                    onClick={(e) => scrollToSection(e, "donate")}
                  >
                    Donate
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, "contact")}
                  >
                    Contact
                  </a>
                </li>
              </>
            )}
            <li>
              <Link to="/blog" onClick={() => setIsOpen(false)}>
                Blog
              </Link>
            </li>
          </ul>
          <button
            className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md"
            onClick={() => {
              setIsOpen(false);
              navigate("/login");
            }}
          >
            Login
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;

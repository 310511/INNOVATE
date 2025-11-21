import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";
import { Menu, X, Star } from "lucide-react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => setMobileOpen(!mobileOpen)

  const isLoggedIn = !!localStorage.getItem("token");

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "font-semibold text-blue-600 border-b-2 border-blue-600 pb-1"
      : "font-semibold text-gray-600 hover:text-gray-900";

  // 👉 CLOSE DROPDOWN WHEN CLICK OUTSIDE
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="border-b border-gray-200 fixed top-0 left-0 w-full bg-white z-[999999]">
      <div className="max-w-8xl mx-auto px-10 py-4 flex items-center w-full">

        {/* LEFT */}
        <div className="flex items-center gap-2">
          <NavLink to="/" onClick={() => setMobileOpen(false)}>
            <img src={logo} alt="InnovativePitch" className="h-8 w-auto" />
          </NavLink>
          <span className="font-bold text-gray-800 text-base">
            <NavLink to="/">InnovativePitch</NavLink>
          </span>
        </div>

        {/* DESKTOP CENTER LINKS */}
        <div className="hidden lg:flex flex-1 justify-center">
          <div className="flex items-center gap-10 text-md">
            {!isLoggedIn && (
              <>
                <NavLink to="/features" className={getLinkClass}>
                  Features
                </NavLink>

                <NavLink to="/testimonial" className={getLinkClass}>
                  Testimonials
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6 text-sm text-gray-600">
          {!isLoggedIn && (
            <>
              <NavLink to="/solution" className={getLinkClass}>
                Solutions
              </NavLink>

              <NavLink to="/pricing" className={getLinkClass}>
                Pricing
              </NavLink>
            </>
          )}

          {!isLoggedIn && (
            <NavLink to="/login" className={getLinkClass}>
              Login
            </NavLink>
          )}

          {/* Profile Dropdown */}
          {isLoggedIn && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="font-semibold text-gray-800 hover:text-gray-900"
              >
                Profile ▾
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border py-2">
                  <NavLink
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </NavLink>

                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/login", { replace: true });
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="lg:hidden text-gray-800"
          onClick={toggleMenu}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4 animate-fadeDown">

          <NavLink
            to="/features"
            className="block font-medium text-gray-700"
            onClick={toggleMenu}
          >
            Features
          </NavLink>

          <NavLink
            to="/testimonial"
            className="block font-medium text-gray-700"
            onClick={toggleMenu}
          >
            Testimonials
          </NavLink>

          <NavLink
            to="/solution"
            className="block font-medium text-gray-700"
            onClick={toggleMenu}
          >
            Solutions
          </NavLink>

          <NavLink
            to="/pricing"
            className="block font-medium text-gray-700"
            onClick={toggleMenu}
          >
            Pricing
          </NavLink>

          <div className="pt-3 border-t border-gray-300">
            <NavLink
              to="/login"
              className="flex items-center gap-2 font-semibold text-blue-600"
              onClick={toggleMenu}
            >
              <Star size={18} />
              Login
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

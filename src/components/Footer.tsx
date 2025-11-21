
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "../assets/logo.jpeg"; // adjust path
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#0b1020] px-6 md:px-12 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo + Description */}
        <div>
          <img src={logo} alt="InnovatePitch" className="h-12 mb-4" />
          <p className="text-gray-500 text-xs leading-relaxed">
            An AI by VIP Inmeditech | Technologies Pvt. Ltd.
          </p>
        </div>

        {/* Quick Links */}
       <div>
  <h3 className="text-white font-semibold mb-4 tracking-wide text-sm uppercase">
    Quick Links
  </h3>

  <ul className="space-y-2 text-gray-400 text-sm">
    <li>
      <NavLink to="/features" className="hover:text-white transition">
        Features
      </NavLink>
    </li>

    <li>
      <NavLink to="/pricing" className="hover:text-white transition">
        Pricing
      </NavLink>
    </li>

    <li>
      <NavLink to="/privacy-policy" className="hover:text-white transition">
        Privacy Policy
      </NavLink>
    </li>
  </ul>
</div>

        {/* Address */}
        <div>
          <h3 className="text-white font-semibold mb-4 tracking-wide text-sm uppercase">Address</h3>
          <div className="text-gray-400 text-sm space-y-2 leading-relaxed">
            <p>35 B, 5, Sanjay Bldg, Andheri-Kurla Road,<br />Mittal Industrial Estate, Andheri (West)</p>
            <p>Mumbai, Maharashtra - 400059</p>
            <p><span className="font-medium text-gray-300">Phone:</span> 02228504558</p>
            <p><span className="font-medium text-gray-300">Country:</span> India (+91)</p>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4 tracking-wide text-sm uppercase">Contact</h3>
          <div className="text-gray-400 text-sm space-y-3">
            <p className="flex items-center gap-2"><Phone size={16} /> 6757812547</p>
            <p className="flex items-center gap-2"><Mail size={16} /> support@innovatepitch.com</p>
            <p className="flex items-center gap-2"><MapPin size={16} /> Mumbai, India</p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} InnovatePitch. All rights reserved.
      </div>
    </footer>
  );
}

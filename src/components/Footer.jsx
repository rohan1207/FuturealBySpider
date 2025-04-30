import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
} from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-black/90 to-black/80 backdrop-blur-md">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Logo & About Section */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/FLogo.png"
                alt="Futureal Logo"
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Transforming visions into reality with innovative solutions and
              exceptional service quality.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://www.facebook.com/profile.php?id=61551088254231&mibextid=9R9pXO"
                className="bg-white/10 hover:bg-gradient-to-r hover:from-[#2A72F8] hover:to-[#8F44EC] transition-all duration-300 p-2.5 rounded-full group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF className="w-4 h-4 text-white group-hover:text-white" />
              </a>

              <a
                href="https://www.instagram.com/futurealin?igshid=MzRlODBiNWFlZA%3D%3D"
                className="bg-white/10 hover:bg-gradient-to-r hover:from-[#2A72F8] hover:to-[#8F44EC] transition-all duration-300 p-2.5 rounded-full group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="w-4 h-4 text-white group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="text-base font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-transparent bg-clip-text bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] transition-all duration-300 text-sm flex items-center group"
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                  Meet Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="text-gray-300 hover:text-transparent bg-clip-text bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] transition-all duration-300 text-sm flex items-center group"
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                  Connect With Us
                </Link>
              </li>
              <li>
                <Link
                  to="/design-build"
                  className="text-gray-300 hover:text-transparent bg-clip-text bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] transition-all duration-300 text-sm flex items-center group"
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                  what We Do
                </Link>
              </li>
              <li>
                <Link
                  to="/whoweare"
                  className="text-gray-300 hover:text-transparent bg-clip-text bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] transition-all duration-300 text-sm flex items-center group"
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                  who We Are
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-5">
            <h3 className="text-base font-semibold mb-4 text-white">
              Contact Us
            </h3>
            <div className="space-y-2.5">
              <a
                href="https://maps.app.goo.gl/7uqDbo9tX8PDKmbZ7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-transparent bg-clip-text bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] text-sm flex items-center gap-3 group"
              >
                <HiOutlineLocationMarker className="w-5 h-5 text-gray-400 group-hover:text-[#2A72F8] transition-colors" />
                72/12, Nallurahalli Main Rd, Near Shell Petrol Pump, Whitefield,
                Bangalore - 560066
              </a>
              <a
                href="tel:+91 96060 64203"
                className="text-gray-300 hover:text-transparent bg-clip-text bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] text-sm flex items-center gap-3 group"
              >
                <HiOutlinePhone className="w-5 h-5 text-gray-400 group-hover:text-[#2A72F8] transition-colors" />
                +91 9606064203
              </a>
              <a
                href="mailto:info@futureal.com"
                className="text-gray-300 hover:text-transparent bg-clip-text bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] text-sm flex items-center gap-3 group"
              >
                <HiOutlineMail className="w-5 h-5 text-gray-400 group-hover:text-[#2A72F8] transition-colors" />
                marketing@futureal.in
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-400 order-2 md:order-1">
              © 2025 Futureal. All rights reserved.
            </p>
            <div className="flex gap-6 order-1 md:order-2">
              <Link
                to="/privacy"
                className="text-xs text-gray-400 hover:text-transparent bg-clip-text bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] transition-all duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-xs text-gray-400 hover:text-transparent bg-clip-text bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] transition-all duration-300"
              >
                Terms of Use
              </Link>
              <Link
                to="/cookies"
                className="text-xs text-gray-400 hover:text-transparent bg-clip-text bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] transition-all duration-300"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

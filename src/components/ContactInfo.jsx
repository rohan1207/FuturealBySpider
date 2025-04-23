import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function ContactInfo() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start p-4 sm:p-6 gap-6 sm:gap-8 w-full max-w-4xl mx-auto">
      {/* Address */}
      <div className="flex items-start gap-3 w-full sm:w-1/3">
        <div className="w-10 h-10 sm:w-9 sm:h-9 bg-[#FF5500] rounded-lg flex justify-center items-center shrink-0">
          <FaMapMarkerAlt className="text-white text-lg sm:text-base" />
        </div>
        <div className="text-left">
          <div className="flex items-center">
            <h3 className="font-semibold text-base sm:text-lg">Address</h3>
          </div>
          <a 
            href="https://maps.app.goo.gl/3ybXd8cSga1xAThp7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 text-sm leading-tight mt-1 hover:text-orange-500 transition-colors duration-200 block"
          >
            709, Apex Business Court, <br />
            Bibwewadi Kondhwa Rd, Pune 411037
          </a>
        </div>
      </div>

      {/* Phone */}
      <div className="flex items-start gap-3 w-full sm:w-1/3">
        <div className="w-10 h-10 sm:w-9 sm:h-9 bg-[#FF5500] rounded-lg flex justify-center items-center shrink-0">
          <FaPhoneAlt className="text-white text-lg sm:text-base" />
        </div>
        <div className="text-left">
          <div className="flex items-center">
            <h3 className="font-semibold text-base sm:text-lg">Phone</h3>
          </div>
          <p className="text-gray-600 text-sm leading-tight mt-1">
            <a 
              href="tel:+912025511024" 
              className="hover:text-orange-500 transition-colors duration-200"
            >
              +91 2069000097
            </a>
            <br />
            <a 
              href="tel:+919823149491" 
              className="hover:text-orange-500 transition-colors duration-200"
            >
              +91 9823149491
            </a>
          </p>
        </div>
      </div>

      {/* Email */}
      <div className="flex items-start gap-3 w-full sm:w-1/3">
        <div className="w-10 h-10 sm:w-9 sm:h-9 bg-[#FF5500] rounded-lg flex justify-center items-center shrink-0">
          <FaEnvelope className="text-white text-lg sm:text-base" />
        </div>
        <div className="text-left">
          <div className="flex items-center">
            <h3 className="font-semibold text-base sm:text-lg">Email</h3>
          </div>
          <p className="text-gray-600 text-sm leading-tight mt-1">
            <a 
              href="mailto:expat@kkassociate.com" 
              className="hover:text-orange-500 transition-colors duration-200"
            >
              expat@kkassociate.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

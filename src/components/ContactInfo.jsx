import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function ContactInfo() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start p-4 sm:p-6 gap-6 sm:gap-8 w-full max-w-4xl mx-auto">
      {/* Address */}
      <div className="flex items-start gap-3 w-full sm:w-1/3">
        <div className="w-10 h-10 sm:w-9 sm:h-9 bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] rounded-lg flex justify-center items-center shrink-0">
          <FaMapMarkerAlt className="text-white text-lg sm:text-base" />
        </div>
        <div className="text-left">
          <div className="flex items-center">
            <h3 className="font-semibold text-base sm:text-lg">Address</h3>
          </div>
          <a 
            href="https://maps.app.goo.gl/7uqDbo9tX8PDKmbZ7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 text-sm leading-tight mt-1 hover:text-orange-500 transition-colors duration-200 block"
          >
           72/12, Nallurahalli Main Rd, Near Shell<br></br> Petrol Pump, Whitefield, Bangalore - 560066
          </a>
        </div>
      </div>

      {/* Phone */}
      <div className="flex items-start gap-3 w-full sm:w-1/3">
        <div className="w-10 h-10 sm:w-9 sm:h-9 bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] rounded-lg flex justify-center items-center shrink-0">
          <FaPhoneAlt className="text-white text-lg sm:text-base" />
        </div>
        <div className="text-left">
          <div className="flex items-center">
            <h3 className="font-semibold text-base sm:text-lg">Phone</h3>
          </div>
          <p className="text-gray-600 text-sm leading-tight mt-1">
            <a 
              href="tel:+919606064203" 
              className="hover:text-orange-500 transition-colors duration-200"
            >
              +919606064203
            </a>
            <br />
          
          </p>
        </div>
      </div>

      {/* Email */}
      <div className="flex items-start gap-3 w-full sm:w-1/3">
        <div className="w-10 h-10 sm:w-9 sm:h-9 bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] rounded-lg flex justify-center items-center shrink-0">
          <FaEnvelope className="text-white text-lg sm:text-base" />
        </div>
        <div className="text-left">
          <div className="flex items-center">
            <h3 className="font-semibold text-base sm:text-lg">Email</h3>
          </div>
          <p className="text-gray-600 text-sm leading-tight mt-1">
            <a 
              href="mailto:connect@futureal.in" 
              className="hover:text-orange-500 transition-colors duration-200"
            >
              marketing@futureal.in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

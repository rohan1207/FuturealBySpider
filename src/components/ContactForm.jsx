import { useState } from "react";

export default function ContactForm() {
  const [isWhatsApp, setIsWhatsApp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    otherSubject: "",
    company: "",
    otherCompany: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const subjectOptions = [
    "Individual",
    "Corporate",
    "Others"
  ];

  const companyOptions = [
    "Individual",
    "Corporate",
    "Others"
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (!formData.subject) {
      newErrors.subject = "Please select a subject";
    } else if (formData.subject === "Others" && !formData.otherSubject.trim()) {
      newErrors.otherSubject = "Please specify your subject";
    }
    
    if (!formData.company) {
      newErrors.company = "Please select a company type";
    } else if (formData.company === "Others" && !formData.otherCompany.trim()) {
      newErrors.otherCompany = "Please specify your company type";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject === "Others" ? formData.otherSubject : formData.subject}
Company: ${formData.company === "Others" ? formData.otherCompany : formData.company}

Message:
${formData.message}
    `.trim();

    const mailtoLink = `mailto:marketing@futureal.in?subject=${encodeURIComponent(`New Contact Form Submission from ${formData.name}`)}&body=${encodeURIComponent(emailBody)}&cc=${encodeURIComponent(formData.email)}`;

    window.location.href = mailtoLink;
    setStatus("Opening your email client...");
  };

  const sendToWhatsapp = () => {
    if (!validateForm()) {
      return;
    }

    const message = 
`New Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject === "Others" ? formData.otherSubject : formData.subject}
Company: ${formData.company === "Others" ? formData.otherCompany : formData.company}

Message:
${formData.message}`;

    try {
      const encodedMessage = message
        .split('\n')
        .map(line => encodeURIComponent(line))
        .join('%0A');

      // For mobile devices, open WhatsApp app directly
      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = `whatsapp://send?phone=919823149491&text=${encodedMessage}`;
      } else {
        // For desktop, open WhatsApp Web
        window.open(`https://web.whatsapp.com/send?phone=919823149491&text=${encodedMessage}`, '_blank');
      }
      
    } catch (error) {
      console.error('Error creating WhatsApp link:', error);
      // Fallback to basic WhatsApp link
      window.open(`https://wa.me/919823149491`, '_blank');
    }
  };

  return (
    <div className="mt-[180px] lg:mt-[86px] px-4 sm:px-8">
      <h2 className="text-lg font-semibold mb-4">Send Us a Message</h2>

      {/* Toggle Between Email & WhatsApp */}
      <div className="flex gap-4 mb-4">
        <button
          className={`w-[158px] h-[42px] border-2 rounded-lg flex justify-center items-center text-sm md:text-base ${
            !isWhatsApp ? "bg-[#007BFF] text-white" : "bg-gray-300 text-black"
          }`}
          onClick={() => setIsWhatsApp(false)}
        >
          Send Email
        </button>

        <button
          className={`w-[158px] h-[42px] border-2 rounded-lg flex justify-center items-center text-sm md:text-base ${
            isWhatsApp ? "bg-[#25D366] text-white" : "bg-gray-300 text-black"
          }`}
          onClick={() => setIsWhatsApp(true)}
        >
          WhatsApp
        </button>
      </div>
      <div className="w-full bg-[#DCF8C6] border border-green-300 rounded-lg p-4 sm:p-5 mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-black">
          WhatsApp Direct Connect
        </h3>
        <p className="text-gray-700 text-sm sm:text-base">
          Start a conversation with us instantly on WhatsApp. Our team is ready
          to assist you.
        </p>
      </div>
      <form
        onSubmit={isWhatsApp ? (e) => e.preventDefault() : handleSubmit}
        className="space-y-4 max-w-full"
      >
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg text-sm md:text-base`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg text-sm md:text-base`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Contact Number *"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full p-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg text-sm md:text-base`}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div className="relative w-full">
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.subject ? 'border-red-500' : 'border-gray-300'
            } rounded-lg bg-white text-sm md:text-base appearance-none`}
          >
            <option value="">Select Subject *</option>
            {subjectOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
            </svg>
          </div>
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
          )}
        </div>

        {formData.subject === "Others" && (
          <div>
            <textarea
              name="otherSubject"
              placeholder="Please specify your subject *"
              value={formData.otherSubject}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.otherSubject ? 'border-red-500' : 'border-gray-300'
              } rounded-lg text-sm md:text-base h-20 resize-none`}
            ></textarea>
            {errors.otherSubject && (
              <p className="text-red-500 text-sm mt-1">{errors.otherSubject}</p>
            )}
          </div>
        )}

        <div className="relative w-full">
          <select
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.company ? 'border-red-500' : 'border-gray-300'
            } rounded-lg bg-white text-sm md:text-base appearance-none`}
          >
            <option value="">Select Company *</option>
            {companyOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
            </svg>
          </div>
          {errors.company && (
            <p className="text-red-500 text-sm mt-1">{errors.company}</p>
          )}
        </div>

        {formData.company === "Others" && (
          <div>
            <textarea
              name="otherCompany"
              placeholder="Please specify your company type *"
              value={formData.otherCompany}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.otherCompany ? 'border-red-500' : 'border-gray-300'
              } rounded-lg text-sm md:text-base h-20 resize-none`}
            ></textarea>
            {errors.otherCompany && (
              <p className="text-red-500 text-sm mt-1">{errors.otherCompany}</p>
            )}
          </div>
        )}

        <div>
          <textarea
            name="message"
            placeholder="Your Message... *"
            value={formData.message}
            onChange={handleChange}
            className={`w-full p-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg h-24 text-sm md:text-base`}
          ></textarea>
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>

        {/* Conditional Rendering for Buttons */}
        {isWhatsApp ? (
          <button
            type="button"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            onClick={sendToWhatsapp}
          >
            Send via WhatsApp
          </button>
        ) : (
          <button
            type="submit"
            className="w-full bg-[#007BFF] text-white py-2 rounded-lg hover:bg-[#007BFF] transition"
          >
            Send Email
          </button>
        )}
      </form>

      {status && <p className="mt-4 text-center">{status}</p>}
    </div>
  );
}

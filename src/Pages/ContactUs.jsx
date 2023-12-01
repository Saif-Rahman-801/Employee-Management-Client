import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., sending the data to a server)
    console.log("Form submitted:", formData);
    // You can reset the form data after submission if needed
    setFormData({
      email: "",
      message: "",
    });
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 rounded-md text-black font-medium border-2 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <p className="mb-4">
        Feel free to reach out to us with any questions, concerns, or feedback!
      </p>

      {/* Company Address */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Company Address:</h3>
        <p>123 Main Street, Cityville, State, 12345</p>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-orange-300"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Message Field */}
        <div className="mb-4">
          <label htmlFor="message" className="block mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-orange-300"
            placeholder="Enter your message"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline-orange"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;

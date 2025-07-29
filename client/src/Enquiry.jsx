import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import EnquiryList from "./EnquiryList";

function Enquiry() {
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    message: "",
  });

  const getData = (e) => {
    const oldData = { ...formData };
    const inputname = e.target.name;
    const inputValue = e.target.value;

    oldData[inputname] = inputValue;
    setFormdata(oldData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("https://vercel-backend-blush.vercel.app/api/enquiry/", formData)
      .then((res) => {
        toast.success("Enquiry safed successfully");
        console.log(res.data);
        setFormdata({
          name: "",
          email: "",
          message: "",
        });
      });
  };

  return (
    <div className="p-4 gap-4 border-2 border-gray-300 rounded-lg m-5">
      <ToastContainer />
      <h1 className="text-center font-bold text-2xl sm:text-3xl mb-4">
        User Enquiry
      </h1>

      {/* Responsive grid: stack on small screens, two columns on medium+ */}
      <div className="grid grid-cols-1 md:grid-cols-[30%_auto] gap-4">
        {/* Enquiry Form */}
        <div className="bg-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Enquiry Form</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={getData}
                id="name"
                className="border p-2 rounded"
                required
              />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={getData}
                id="email"
                className="border p-2 rounded"
                required
              />

              <label htmlFor="message">Message:</label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={getData}
                className="border p-2 rounded"
                rows="4"
                required
              ></textarea>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 mt-2 rounded transition cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Enquiry List Section */}
        <div className="overflow-x-auto">
          <EnquiryList />
        </div>
      </div>
    </div>
  );
}

export default Enquiry;

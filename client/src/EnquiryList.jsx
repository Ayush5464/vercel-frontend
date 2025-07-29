import axios from "axios";
import React, { useEffect, useState } from "react";

function EnquiryList() {
  const [enquiryList, setEnquiryList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://vercel-backend-blush.vercel.app/api/enquiry/");
      setEnquiryList(response.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://vercel-backend-blush.vercel.app/api/enquiry/${id}`);
      setEnquiryList((prevList) => prevList.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete. Please try again.");
    }
  };

  const startEdit = (item) => {
    setEditId(item._id);
    setEditData({ name: item.name, email: item.email, message: item.message });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({ name: "", email: "", message: "" });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (id) => {
    try {
      const res = await axios.put(
        `https://vercel-backend-blush.vercel.app/api/enquiry/${id}`,
        editData
      );
      // update state
      setEnquiryList((prevList) =>
        prevList.map((item) =>
          item._id === id ? { ...item, ...editData } : item
        )
      );
      cancelEdit();
    } catch (error) {
      console.error("Edit error:", error);
      alert("Update failed.");
    }
  };

  return (
    <div className="bg-gray-100 p-6 gap-2 rounded-lg">
      <h1 className="text-center text-base font-semibold mb-4">
        Enquiry Table
      </h1>

      {/* Add horizontal scroll on small screens */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200 text-center text-sm md:text-base">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-2">Sr No.</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Message</th>
              <th className="border border-gray-300 p-2">Edit</th>
              <th className="border border-gray-300 p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {enquiryList.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{index + 1}</td>

                {editId === item._id ? (
                  <>
                    <td className="border border-gray-300 p-2">
                      <input
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                        className="border p-1 w-full rounded"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        name="email"
                        value={editData.email}
                        onChange={handleEditChange}
                        className="border p-1 w-full rounded"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        name="message"
                        value={editData.message}
                        onChange={handleEditChange}
                        className="border p-1 w-full rounded"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button
                        onClick={() => handleEditSubmit(item._id)}
                        className="text-green-600 hover:underline"
                      >
                        Save
                      </button>{" "}
                      |{" "}
                      <button
                        onClick={cancelEdit}
                        className="text-gray-500 hover:underline"
                      >
                        Cancel
                      </button>
                    </td>
                    <td className="border border-gray-300 p-2 text-gray-400">
                      --
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border border-gray-300 p-2">{item.name}</td>
                    <td className="border border-gray-300 p-2">{item.email}</td>
                    <td className="border border-gray-300 p-2">
                      {item.message}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button
                        onClick={() => startEdit(item)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EnquiryList;

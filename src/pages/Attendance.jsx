import { useState } from "react";
import {
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";

import API from "../services/api";
import toast from "react-hot-toast";

function Attendance() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Get teacher name from navigation state
  const teacherName = location.state?.teacherName || "Unknown Teacher";

  const [form, setForm] = useState({
    className: "",
    section: "",
    presentStudents: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/attendance", {
        teacher_id: Number(id),
        teacher_name: teacherName,
        class_name: form.className,
        section: form.section,
        present_students: Number(form.presentStudents),
      });

      toast.success("Attendance Saved Successfully");

      navigate("/");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to save attendance"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-5">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg"
      >
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Teacher Attendance
        </h1>

        {/* Teacher Details */}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h2 className="text-xl font-bold text-blue-700">
            👨‍🏫 {teacherName}
          </h2>

          <p className="text-gray-600">
            Teacher ID : {id}
          </p>
        </div>

        {/* Class */}

        <label className="block mb-2 font-semibold">
          Class
        </label>

        <select
          name="className"
          value={form.className}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-5"
          required
        >
          <option value="">Select Class</option>
          <option value="9">Class 9</option>
          <option value="10">Class 10</option>
          <option value="11">Class 11</option>
          <option value="12">Class 12</option>
        </select>

        {/* Section */}

        <label className="block mb-2 font-semibold">
          Section
        </label>

        <select
          name="section"
          value={form.section}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-5"
          required
        >
          <option value="">Select Section</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
          <option value="C">Section C</option>
          <option value="D">Section D</option>
        </select>

        {/* Present Students */}

        <label className="block mb-2 font-semibold">
          Present Students
        </label>

        <input
          type="number"
          name="presentStudents"
          value={form.presentStudents}
          onChange={handleChange}
          placeholder="Enter number of present students"
          className="w-full border rounded-lg p-3 mb-6"
          min="0"
          required
        />

        {/* Submit */}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg transition"
        >
          Submit Attendance
        </button>
      </form>
    </div>
  );
}

export default Attendance;
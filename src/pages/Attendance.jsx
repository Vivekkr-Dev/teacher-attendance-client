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

  // Get teacher name from TeacherCard navigation state
  const teacherName = location.state?.teacherName || "";

  const [form, setForm] = useState({
    className: "",
    section: "",
    period: "",
    presentStudents: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Submit attendance
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Debug: Check current form data
    console.log("Current Form:", form);

    // Validate teacher name
    if (!teacherName) {
      toast.error("Teacher name is missing");
      return;
    }

    // Validate period
    if (!form.period) {
      toast.error("Please select a period");
      return;
    }

    try {
      const attendanceData = {
        teacher_id: Number(id),
        teacher_name: teacherName,
        class_name: form.className,
        section: form.section,
        period: Number(form.period),
        present_students: Number(form.presentStudents),
      };

      // Debug: Check data before sending to backend
      console.log("Sending Attendance:", attendanceData);

      const response = await API.post(
        "/attendance",
        attendanceData
      );

      console.log("Server Response:", response.data);

      toast.success("Attendance Saved Successfully");

      // Go back to home page
      navigate("/");
    } catch (error) {
      console.error("Attendance Error:", error);

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
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg"
      >
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Student Attendance
        </h1>

        {/* Teacher Name */}
        <div className="mb-5">
          <label className="block mb-2 font-semibold">
            Teacher Name
          </label>

          <input
            type="text"
            value={teacherName}
            readOnly
            className="w-full border p-3 rounded-lg bg-gray-100"
          />
        </div>

        {/* Class */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">
            Class
          </label>

          <select
            name="className"
            value={form.className}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          >
            <option value="">Select Class</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
            <option value="11">Class 11</option>
            <option value="12">Class 12</option>
          </select>
        </div>

        {/* Section */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">
            Section
          </label>

          <select
            name="section"
            value={form.section}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          >
            <option value="">Select Section</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
            <option value="D">Section D</option>
          </select>
        </div>

        {/* Period */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">
            Period
          </label>

          <select
            name="period"
            value={form.period}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          >
            <option value="">Select Period</option>
            <option value="1">First Period</option>
            <option value="2">Second Period</option>
            <option value="3">Third Period</option>
            <option value="4">Fourth Period</option>
            <option value="5">Fifth Period</option>
            <option value="6">Sixth Period</option>
            <option value="7">Seventh Period</option>
            <option value="8">Eighth Period</option>
          </select>
        </div>

        {/* Present Students */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">
            Present Students
          </label>

          <input
            type="number"
            name="presentStudents"
            value={form.presentStudents}
            onChange={handleChange}
            placeholder="Enter number of present students"
            min="0"
            className="w-full border p-3 rounded-lg"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition duration-300"
        >
          Submit Attendance
        </button>
      </form>
    </div>
  );
}

export default Attendance;
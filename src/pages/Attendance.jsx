import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function Attendance() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    className: "",
    section: "",
    period: "",
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
        class_name: form.className,
        section: form.section,
        period: Number(form.period),
        present_students: Number(form.presentStudents),
      });

      toast.success("Student Attendance Saved Successfully");

      navigate("/");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to save student attendance"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg"
      >
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Student Attendance System
        </h1>

        <p className="mb-5 text-lg">
          <b>Teacher ID:</b> {id}
        </p>

        {/* Class */}
        <label className="block mb-2 font-semibold">
          Class
        </label>

        <select
          name="className"
          value={form.className}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
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
          className="w-full border p-3 rounded-lg mb-4"
          required
        >
          <option value="">Select Section</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
          <option value="C">Section C</option>
          <option value="D">Section D</option>
        </select>

        {/* Period */}
        <label className="block mb-2 font-semibold">
          Period
        </label>

        <select
          name="period"
          value={form.period}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
          required
        >
          <option value="">Select Period</option>
          <option value="1">1st Period</option>
          <option value="2">2nd Period</option>
          <option value="3">3rd Period</option>
          <option value="4">4th Period</option>
          <option value="5">5th Period</option>
          <option value="6">6th Period</option>
          <option value="7">7th Period</option>
          <option value="8">8th Period</option>
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
          className="w-full border p-3 rounded-lg mb-6"
          min="0"
          required
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition duration-300"
        >
          Submit Student Attendance
        </button>
      </form>
    </div>
  );
}

export default Attendance;
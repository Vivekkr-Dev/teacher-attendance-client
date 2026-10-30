
import { useEffect, useState } from "react";
import API from "../services/api";
import TeacherCard from "../components/TeacherCard";
import toast from "react-hot-toast";
import { FaFileCsv, FaDownload } from "react-icons/fa";

function Home() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  // Fetch teachers
  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);

      const res = await API.get("/teachers");

      setTeachers(res.data.teachers || []);
    } catch (err) {
      console.error("Fetch Teachers Error:", err);
      toast.error("Unable to load teachers");
    } finally {
      setLoading(false);
    }
  };

  // Export attendance CSV

const handleExportCSV = async () => {
  try {
    setExporting(true);

    const response = await API.get("/attendance/export", {
      responseType: "blob",
    });

    const blob = new Blob([response.data], {
      type: "text/csv;charset=utf-8;",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `Student_Attendance_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);

    toast.success("CSV downloaded successfully!");

  } catch (error) {
    console.error("CSV Export Error:", error);

    let message = "Unable to export attendance.";

    if (error.response?.data instanceof Blob) {
      const errorText = await error.response.data.text();

      try {
        const errorData = JSON.parse(errorText);
        message = errorData.message || message;
      } catch {
        message = errorText || message;
      }
    } else {
      message = error.message || message;
    }

    console.error("Actual error:", message);
    toast.error(message);

  } finally {
    setExporting(false);
  }
};


  return (
    <div className="min-h-screen bg-slate-100">

      <div className="max-w-7xl mx-auto p-5 sm:p-8 md:p-10">

        {/* Page Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-blue-700 mb-8">
          Student Attendance System
        </h1>

        {/* Export Section */}
        <div className="flex justify-end mb-8">

          <button
            onClick={handleExportCSV}
            disabled={exporting}
            className="flex items-center gap-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-5 py-3 rounded-lg font-semibold shadow-md transition duration-300"
          >
            <FaFileCsv className="text-xl" />

            {exporting ? "Exporting..." : "Export Attendance CSV"}

            {!exporting && <FaDownload />}
          </button>

        </div>

        {/* Teacher Cards */}
        {loading ? (

          <div className="text-center text-blue-600 text-xl font-semibold">
            Loading teachers...
          </div>

        ) : teachers.length === 0 ? (

          <div className="text-center text-gray-500 text-lg">
            No teachers found.
          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {teachers.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
              />
            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Home;





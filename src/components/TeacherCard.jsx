import { useNavigate } from "react-router-dom";
import { FaChalkboardTeacher } from "react-icons/fa";

function TeacherCard({ teacher }) {
  const navigate = useNavigate();

  const handleAttendance = () => {
    navigate(`/attendance/${teacher.id}`, {
      state: {
        teacherName: teacher.name,
      },
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl p-6 border">
      <div className="flex flex-col items-center">
        <FaChalkboardTeacher className="text-5xl text-blue-600 mb-4" />

        <h2 className="text-2xl font-bold text-gray-800">
          {teacher.name}
        </h2>

        <button
          onClick={handleAttendance}
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Take Attendance
        </button>
      </div>
    </div>
  );
}

export default TeacherCard;
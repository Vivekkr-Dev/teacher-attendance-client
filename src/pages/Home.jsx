import { useEffect, useState } from "react";
import API from "../services/api";
import TeacherCard from "../components/TeacherCard";

function Home() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await API.get("/teachers");
      setTeachers(res.data.teachers);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto p-10">

        <h1 className="text-5xl font-bold text-center text-blue-700 mb-10">
          Student Attendance System
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {teachers.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
            />
          ))}

        </div>

      </div>
    </div>
  );
}

export default Home;
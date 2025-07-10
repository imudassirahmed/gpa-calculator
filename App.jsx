import React, { useState } from "react";

const initialCourses = [
  // Semester 1
  { semester: "1st", name: "IMC", maxMarks: 100, credit: 3 },
  { semester: "1st", name: "SALES MANAGEMENT", maxMarks: 100, credit: 3 },
  { semester: "1st", name: "INDUSTRIAL MARKETING", maxMarks: 100, credit: 3 },
  { semester: "1st", name: "CONSUMER BEHAVIOUR", maxMarks: 100, credit: 3 },
  { semester: "1st", name: "ADVERTISING", maxMarks: 100, credit: 3 },
  // Semester 2
  { semester: "2nd", name: "CATEGORY MANAGEMENT", maxMarks: 100, credit: 3 },
  { semester: "2nd", name: "BRAND MANAGEMENT", maxMarks: 100, credit: 3 },
  { semester: "2nd", name: "RESEARCH METHODOLOGY", maxMarks: 100, credit: 3 },
  { semester: "2nd", name: "NEW PRODUCT DEVELOPMENT", maxMarks: 100, credit: 3 },
  { semester: "2nd", name: "RETAIL MANAGEMENT", maxMarks: 100, credit: 3 },
  // Semester 3
  { semester: "3rd", name: "SERVICES MARKETING", maxMarks: 100, credit: 3 },
  { semester: "3rd", name: "SALESFORCE MANAGEMENT", maxMarks: 100, credit: 3 },
  { semester: "3rd", name: "CHANNEL & DISTRIBUTION MANAGEMENT", maxMarks: 100, credit: 3 },
  { semester: "3rd", name: "Thesis", maxMarks: 200, credit: 6 }
];

export default function App() {
  const [name, setName] = useState("");
  const [courses, setCourses] = useState(
    initialCourses.map((course) => ({ ...course, marks: "" }))
  );
  const [result, setResult] = useState(null);

  const getGrade = (percentage) => {
    if (percentage >= 90) return { letter: "A+", gpa: 4.0 };
    if (percentage >= 85) return { letter: "A", gpa: 4.0 };
    if (percentage >= 80) return { letter: "A-", gpa: 3.8 };
    if (percentage >= 75) return { letter: "B+", gpa: 3.4 };
    if (percentage >= 71) return { letter: "B", gpa: 3.0 };
    if (percentage >= 68) return { letter: "B-", gpa: 2.8 };
    if (percentage >= 64) return { letter: "C+", gpa: 2.4 };
    if (percentage >= 61) return { letter: "C", gpa: 2.0 };
    return { letter: "F", gpa: 0.0 };
  };

  const calculateGPA = () => {
    let totalGradePoints = 0;
    let totalCredits = 0;

    const gradedCourses = courses.map((course) => {
      const percentage = (Number(course.marks) / course.maxMarks) * 100;
      const { letter, gpa } = getGrade(percentage);
      const gradePoints = gpa * course.credit;
      totalGradePoints += gradePoints;
      totalCredits += course.credit;
      return {
        ...course,
        percentage: percentage.toFixed(2),
        letter,
        gpa,
        gradePoints
      };
    });

    setResult({
      name,
      gradedCourses,
      gpa: (totalGradePoints / totalCredits).toFixed(2)
    });
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "1rem" }}>
      <h2>📘 MBA GPA Calculator</h2>
      <input
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "8px", width: "100%", marginBottom: "1rem" }}
      />

      {courses.map((course, idx) => (
        <div key={idx} style={{ display: "flex", marginBottom: "8px" }}>
          <div style={{ flex: 2 }}>{course.semester} - {course.name}</div>
          <input
            type="number"
            placeholder="Marks"
            value={course.marks}
            onChange={(e) => {
              const updated = [...courses];
              updated[idx].marks = e.target.value;
              setCourses(updated);
            }}
            style={{ flex: 1, padding: "6px" }}
          />
          <span style={{ marginLeft: "8px" }}>/ {course.maxMarks}</span>
        </div>
      ))}

      <button onClick={calculateGPA} style={{ padding: "10px 20px", marginTop: "1rem" }}>
        Calculate GPA
      </button>

      {result && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Result for: {result.name}</h3>
          <table border="1" cellPadding="6" style={{ width: "100%", marginTop: "1rem" }}>
            <thead>
              <tr>
                <th>Semester</th>
                <th>Course</th>
                <th>Marks</th>
                <th>%</th>
                <th>Grade</th>
                <th>GPA</th>
                <th>Grade Points</th>
              </tr>
            </thead>
            <tbody>
              {result.gradedCourses.map((c, idx) => (
                <tr key={idx}>
                  <td>{c.semester}</td>
                  <td>{c.name}</td>
                  <td>{c.marks}/{c.maxMarks}</td>
                  <td>{c.percentage}%</td>
                  <td>{c.letter}</td>
                  <td>{c.gpa}</td>
                  <td>{c.gradePoints.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4 style={{ marginTop: "1rem" }}>🎯 Overall CGPA: {result.gpa}</h4>
        </div>
      )}
    </div>
  );
}

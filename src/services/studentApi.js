const API_URL = "http://localhost:5000/api/students";

export async function fetchStudents() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  const data = await response.json();

  return data;
}
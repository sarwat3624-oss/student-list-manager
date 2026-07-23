const API_URL =
  "https://jsonplaceholder.typicode.com/users";

export async function fetchStudents() {

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  const data = await response.json();

  return data;
}
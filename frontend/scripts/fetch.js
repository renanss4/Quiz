import { checkAuthenticationByToken, getToken } from "./tokenManager.js";

// URL do backend
const URL = "http://localhost:8080";

// Function to fetch the login data
export async function loginFetch(email, enrollment, password) {
  if ((!email && !enrollment) || !password) {
    throw new Error("All fields are required!");
  }

  try {
    const response = await fetch(`${URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, enrollment, password }),
    });

    const data = await response.json();

    if (response.status === 404) {
      if (data.msg === "Invalid password!") {
        throw new Error("User invalid!");
      } else {
        throw new Error("User not found!");
      }
    }

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    throw new Error("Network error: " + error.message);
  }
}

// Function to fetch the data user
export async function fetchDataUser() {
  await checkAuthenticationByToken();

  const token = getToken();
  if (!token) {
    throw new Error("No token found!");
  }

  try {
    const response = await fetch(`${URL}/user/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error fetching user data");
    }

    return data;
  } catch (error) {
    throw new Error("Network error: " + error.message);
  }
}

// Function to fetch all users
export async function fetchUsers(params = undefined) {
  await checkAuthenticationByToken();

  const token = getToken();
  if (!token) {
    throw new Error("No token found!");
  }

  let uri = `${URL}/user/search`;
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    uri = `${uri}?${queryString}`;
  }

  try {
    const response = await fetch(uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error fetching users data");
    }

    return data;
  } catch (error) {
    throw new Error("Network error: " + error.message);
  }
}

// Function to fetch all teachers
export async function fetchTeachers() {
  return fetchUsers({ role: "teacher" });
}

// Function to add a teacher to a subject
export async function addTeacherToSubject(subject_id, teacher_id) {
  await checkAuthenticationByToken();

  const token = getToken();
  if (!token) {
    throw new Error("No token found!");
  }

  try {
    const response = await fetch(`${URL}/subject/${subject_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ teacher_id }),
    });

    if (response.status === 204) {
      return;
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error adding teacher to subject");
    }

    return data;
  } catch (error) {
    throw new Error("Network error: " + error.message);
  }
}

// Function to remove a teacher from a subject
export async function removeTeacherFromSubject(subject_id) {
  await checkAuthenticationByToken();

  const token = getToken();
  if (!token) {
    throw new Error("No token found!");
  }

  try {
    const response = await fetch(`${URL}/subject/${subject_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ teacher_id: null }), // Set teacher_id to null to remove the teacher
    });

    if (response.status === 204) {
      return;
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error removing teacher from subject");
    }

    return data;
  } catch (error) {
    throw new Error("Network error: " + error.message);
  }
}

// Function to fetch all students
export async function fetchStudents() {
  return fetchUsers({ role: "student" });
}

// Function to fetch all relationships between students and subjects
export async function fetchStudentSubjects(params = undefined) {
  await checkAuthenticationByToken();

  const token = getToken();
  if (!token) {
    throw new Error("No token found!");
  }

  let uri = `${URL}/user_subject/search`;
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    uri = `${uri}?${queryString}`;
  }

  try {
    const response = await fetch(uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error fetching student subjects data");
    }

    return data;
  } catch (error) {
    throw new Error("Network error: " + error.message);
  }
}

// Function to make a relationship between a student and a subject
export async function createStudentSubject(student_id, subject_id) {
  await checkAuthenticationByToken();

  const token = getToken();
  if (!token) {
    throw new Error("No token found!");
  }

  try {
    const response = await fetch(`${URL}/user_subject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ student_id, subject_id }),
    });

    if (response.status === 204) {
      return;
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error creating student subject");
    }

    return data;
  } catch (error) {
    throw new Error("Network error: " + error.message);
  }
}

// Function to delete a relationship between a student and a subject
export async function deleteStudentSubject(id) {
  await checkAuthenticationByToken();

  const token = getToken();
  if (!token) {
    throw new Error("No token found!");
  }

  try {
    const response = await fetch(`${URL}/user_subject/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 204) {
      return;
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error deleting student subject");
    }

    return data;
  } catch (error) {
    throw new Error("Network error: " + error.message);
  }
}

// Function to create a user
export async function createUser(name, email, enrollment, password, role) {
  await checkAuthenticationByToken();

  const token = getToken();
  if (!token) {
    throw new Error("No token found!");
  }

  try {
    const response = await fetch(`${URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, email, enrollment, password, role }),
    });

    if (response.status === 204) {
      return;
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error creating user");
    }

    return data;
  } catch (error) {
    throw new Error("Network error: " + error.message);
  }
}

// Function to edit a user
export async function editUser(id, name, email, enrollment, role) {
  await checkAuthenticationByToken();

  const token = getToken();
  if (!token) {
    throw new Error("No token found!");
  }

  try {
    const response = await fetch(`${URL}/user/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, email, enrollment, role }),
    });

    if (response.status === 204) {
      return;
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error editing user");
    }

    return data;
  } catch (error) {
    throw new Error("Network error: " + error.message);
  }
}

// Function to delete a user
export async function deleteUser(id) {
  await checkAuthenticationByToken();

  const token = getToken();
  if (!token) {
    throw new Error("No token found!");
  }

  try {
    const response = await fetch(`${URL}/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 204) {
      return;
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error deleting user");
    }

    return data;
  } catch (error) {
    throw new Error("Network error: " + error.message);
  }
}

// Function to fetch all subjects
export async function fetchSubjects(params = undefined) {
  await checkAuthenticationByToken();

  const token = getToken();
  if (!token) {
    throw new Error("No token found!");
  }

  let uri = `${URL}/subject/search`;
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    uri = `${uri}?${queryString}`;
  }

  try {
    const response = await fetch(uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error fetching subjects data");
    }

    if (data.message === "No subjects found") {
      return [];
    }

    return data;
  } catch (error) {
    throw new Error("Network error: " + error.message);
  }
}

//Create a new subject
export async function createSubject(name, teacher_id) {
  await checkAuthenticationByToken();

  teacher_id = teacher_id === "null" ? null : teacher_id;

  const token = getToken();
  if (!token) {
    throw new Error("No token found!");
  }

  try {
    const response = await fetch(`${URL}/subject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, teacher_id }),
    });

    if (response.status === 204) {
      return;
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error creating subject");
    }

    return data;
  } catch (error) {
    throw new Error("Network error: " + error.message);
  }
}

// Function to edit a subject
export async function editSubject(id, name, teacher_id) {
  await checkAuthenticationByToken();

  teacher_id = teacher_id === "null" ? null : teacher_id;

  const token = getToken();
  if (!token) {
    throw new Error("No token found!");
  }

  try {
    const response = await fetch(`${URL}/subject/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, teacher_id }),
    });

    if (response.status === 204) {
      return;
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error editing subject");
    }

    return data;
  } catch (error) {
    throw new Error("Network error: " + error.message);
  }
}

// Function to delete a subject
export async function deleteSubject(id) {
  await checkAuthenticationByToken();

  const token = getToken();
  if (!token) {
    throw new Error("No token found!");
  }

  try {
    const response = await fetch(`${URL}/subject/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 204) {
      return;
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error deleting subject");
    }

    return data;
  } catch (error) {
    throw new Error("Network error: " + error.message);
  }
}

// Function to fetch all quizzes
export async function fetchQuizzes(params = undefined) {
  await checkAuthenticationByToken();

  const token = getToken();
  if (!token) {
    throw new Error("No token found!");
  }

  let uri = `${URL}/quiz/search`;
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    uri = `${uri}?${queryString}`;
  }

  try {
    const response = await fetch(uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error fetching quizzes data");
    }

    return data;
  } catch (error) {
    throw new Error("Network error: " + error.message);
  }
}

// Function to create a quiz
export async function createQuiz(
  name,
  type,
  time,
  attempts,
  date_start,
  date_end,
  orientation,
  subject_id,
  is_draft,
  questions
) {
  await checkAuthenticationByToken();

  const token = getToken();
  if (!token) {
    throw new Error("No token found!");
  }

  try {
    const response = await fetch(`${URL}/quiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        type,
        time,
        attempts,
        date_start,
        date_end,
        orientation,
        subject_id,
        is_draft,
        questions,
      }),
    });

    if (response.status === 204) {
      return;
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error creating quiz");
    }

    // console.log(data);
    return data;
  } catch (error) {
    throw new Error("Network error: " + error.message);
  }
}

export async function addQuestionToQuiz(quizId, questionsData) {
  await checkAuthenticationByToken();

  const token = getToken();
  if (!token) {
    throw new Error("No token found!");
  }

  try {
    const response = await fetch(`${URL}/quiz/question/${quizId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ questions: questionsData }),
    });

    if (response.status === 204) {
      return true;
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error updating quiz with questions");
    }

    return data;
  } catch (error) {
    throw new Error("Network error: " + error.message);
  }
}

export async function transformDraftToQuiz(quizId) {
  await checkAuthenticationByToken();

  const token = getToken();
  if (!token) {
    throw new Error("No token found!");
  }

  try {
    const response = await fetch(`${URL}/quiz/draft/${quizId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 204) {
      return true;
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error transforming draft to quiz");
    }

    return data;
  } catch (error) {
    throw new Error("Network error: " + error.message);
  }
}

export async function deleteQuiz(quizId) {
  await checkAuthenticationByToken();

  const token = getToken();
  if (!token) {
    throw new Error("No token found!");
  }

  try {
    const response = await fetch(`${URL}/quiz/${quizId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 204) {
      return true;
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error deleting quiz");
    }

    return data;
  } catch (error) {
    throw new Error("Network error: " + error.message);
  }
}

// enviar a resposta do aluno
export async function sendStudentAnswer(quizId, studentId, score, answers) {
  await checkAuthenticationByToken();

  const token = getToken();
  if (!token) {
    throw new Error("No token found!");
  }

  try {
    const response = await fetch(`${URL}/answers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        quiz_id: quizId,
        student_id: studentId,
        score,
        answers,
      }),
    });

    if (response.status === 204) {
      return true;
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error sending student answer");
    }

    return data;
  } catch (error) {
    throw new Error("Network error: " + error.message);
  }
}

// Function to fetch all student answers
export async function fetchStudentAnswers(params = undefined) {
  await checkAuthenticationByToken();

  const token = getToken();
  if (!token) {
    throw new Error("No token found!");
  }

  let uri = `${URL}/answers/search`;
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    uri = `${uri}?${queryString}`;
  }
  // console.log(uri);
  try {
    const response = await fetch(uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error fetching student answers data");
    }

    return data;
  } catch (error) {
    throw new Error("Network error: " + error.message);
  }
}

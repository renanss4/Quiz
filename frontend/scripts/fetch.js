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

// Function to fetch all subjects
export async function fetchSubjects(params = undefined){
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

    console.log(data);
    return data;
  } catch (error) {
    throw new Error("Network error: " + error.message);
  }
}
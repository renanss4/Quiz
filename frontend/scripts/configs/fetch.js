// URL do backend
const URL = "http://localhost:8080";

// Function to fetch the login data
export async function loginFetch(emailOrEnrollment, password) {
  const response = await fetch(`${URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ emailOrEnrollment, password }),
  });

  //   console.log(response);
  const data = await response.json();

  if (response.status === 404) {
    if (data.msg === "Invalid password!") {
      throw new Error("User invalid!");
    } else {
      throw new Error("User not found!");
    }
  }

  //   console.log("Login successful:", data);
  return data;
}

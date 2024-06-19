// Remove the token from the local storage
function removeToken() {
  localStorage.removeItem("token");
}

// Set the token in the local storage
function setToken(token) {
  localStorage.setItem("token", token);
}

// Get the token from the local storage
function getToken() {
  return localStorage.getItem("token");
}

// Check if the token is present in the localStorage
function checkAuthentication() {
  const token = getToken();
  if (!token) {
    // Redirect to the login page if the token does not exist
    window.location.href = "login.html";
  }
}

// Check role of the user
function checkRole(token) {
  const payload = JSON.parse(atob(token.split(".")[1]));
  // console.log(payload);
  return payload.role;
}

// Check permissions of the user
// function checkPermissions() {
//   const token = getToken();
//   const role = checkRole(token);
//   if (role !== "admin") {
//     // Redirect to the dashboard page if the role is not admin
//     window.location.href = "dashboard.html";
//   }

// }

// Export the functions
export { getToken, setToken, removeToken, checkAuthentication, checkRole };

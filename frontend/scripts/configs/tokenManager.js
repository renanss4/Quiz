// Remove the token from the local storage
function removeToken() {
  localStorage.removeItem("token");
}

// Get the token in the local storage
function getToken(token) {
  localStorage.setItem("token", token);
}

// Check if the token is present in the localStorage
function checkAuthentication() {
  const token = getToken();
  if (!token) {
    // Redirect to the login page if the token does not exist
    window.location.href = "login.html";
  }
}

export { getToken, removeToken, checkAuthentication };

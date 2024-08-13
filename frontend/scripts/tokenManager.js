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
async function checkAuthenticationByToken() {
  const token = getToken();
  if (!token) {
    // Redirect to the login page if the token does not exist
    window.location.href = "../login.html";
  } else {
    //  Decode the token and check expiration
    const decoded = decodeToken(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      removeToken();
      window.location.href = "../login.html";
    }
  }
}

// Decode the token
function decodeToken(token) {
  const payload = token.split(".")[1];
  const decoded = atob(payload);
  return JSON.parse(decoded);
}

// Export the functions
export {
  getToken,
  setToken,
  removeToken,
  checkAuthenticationByToken,
  decodeToken,
};

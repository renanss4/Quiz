export const USER_ERROR = {
  ALREADY_REGISTERED: {
    statusCode: 409,
    errorCode: 1409,
    message: "User already registered!",
  },
  DOESNT_EXIST: {
      statusCode: 404,
      errorCode: 1404,
      message: "User does not exist!"
  },
//   FORBIDDEN_EDIT: {
//       statusCode: 403,
//       errorCode: 1403,
//       message: "Action not allowed!"
//   },
  INVALID_ID: {
      statusCode: 400,
      errorCode: 1400,
      message: "Invalid ID format!"
  }, 
  MISSING_REQUIRED_FIELDS: {
      statusCode: 400,
      errorCode: 1405,
      message: "All mandatory fields must be provided: name, email, password, role"
  },
  INCORRECT_CURRENT_PASSWORD: { 
      statusCode: 403,
      errorCode: 1406,
      message: "Current password entered incorrectly!"
  },
  INVALID_LOGIN: {
      statusCode: 401,
      errorCode: 1401,
      message: "Invalid credentials!"
  }
};

export const TOKEN_ERROR = {
  NOT_PROVIDED: {
      statusCode: 401,
      errorCode: 4401,
      message: 'No tokens were sent!',
  },
  FORBIDDEN_ACCESS: {
      statusCode: 403,
      errorCode: 4403,
      message: 'Access denied!',
  }
}
export const USER_ERROR = {
  ALREADY_REGISTERED: {
    statusCode: 409,
    errorCode: 1409,
    message: "User already registered!",
  },
  DOESNT_EXIST: {
    statusCode: 404,
    errorCode: 1404,
    message: "User does not exist!",
  },
  //   FORBIDDEN_EDIT: {
  //       statusCode: 403,
  //       errorCode: 1403,
  //       message: "Action not allowed!"
  //   },
  INVALID_ID: {
    statusCode: 400,
    errorCode: 1400,
    message: "Invalid ID format!",
  },
  MISSING_REQUIRED_FIELDS: {
    statusCode: 400,
    errorCode: 1405,
    message:
      "All mandatory fields must be provided: name, email, password, role",
  },
  INCORRECT_CURRENT_PASSWORD: {
    statusCode: 403,
    errorCode: 1406,
    message: "Current password entered incorrectly!",
  },
  INVALID_LOGIN: {
    statusCode: 401,
    errorCode: 1401,
    message: "Invalid credentials!",
  },
  INVALID_ROLE: {
    statusCode: 400,
    errorCode: 1402,
    message: "Invalid role!",
  },
};

export const SUBJECT_ERROR = {
  ALREADY_EXIST: {
    statusCode: 409,
    errorCode: 2409,
    message: "A subject with this name already exists!",
  },
  DOESNT_EXIST: {
    statusCode: 404,
    errorCode: 2404,
    message: "Subject does not exist!",
  },
  NAME_CONFLICT: {
    statusCode: 400,
    errorCode: 2400,
    message: "The provided name conflicts with the one in the database!",
  },
  ID_REQUIRED: {
    statusCode: 400,
    errorCode: 2401,
    message: "Subject ID is required!",
  },
  MISSING_FIELDS: {
    statusCode: 400,
    errorCode: 2402,
    message: "Name or professor ID is required to edit the subject!",
  },
  INVALID_NAME: {
    statusCode: 422,
    errorCode: 2422,
    message: "Invalid name. The name must have at least 3 characters!",
  },
};

export const RELATION_ERROR = {
  ALREADY_EXIST: {
    statusCode: 400,
    errorCode: 3400,
    message: "Relation already exists!",
  },
  DOESNT_EXIST: {
    statusCode: 404,
    errorCode: 3404,
    message: "Relation does not exist!",
  },
  MISSING_FIELDS: {
    statusCode: 400,
    errorCode: 3402,
    message: "Student ID or Subject ID are required!",
  },
};

export const TOKEN_ERROR = {
  NOT_PROVIDED: {
    statusCode: 401,
    errorCode: 4401,
    message: "No tokens were sent!",
  },
  FORBIDDEN_ACCESS: {
    statusCode: 403,
    errorCode: 4403,
    message: "Access denied!",
  },
};

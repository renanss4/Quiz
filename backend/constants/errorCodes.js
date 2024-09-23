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

export const ANSWER_ERROR = {
  MISSING_FIELDS: {
    statusCode: 400,
    errorCode: 5401,
    message: "Missing fields: quiz_id, student_id, score, or answers!",
  },
  INVALID_QUIZ_ID: {
    statusCode: 400,
    errorCode: 5402,
    message: "Invalid quiz_id!",
  },
  INVALID_STUDENT_ID: {
    statusCode: 400,
    errorCode: 5403,
    message: "Invalid student_id!",
  },
  EMPTY_ANSWERS: {
    statusCode: 400,
    errorCode: 5404,
    message: "Answers cannot be empty!",
  },
  NOT_FOUND: {
    statusCode: 404,
    errorCode: 5405,
    message: "Answer not found!",
  },
};

export const QUIZ_ERROR = {
  MISSING_FIELDS: {
    statusCode: 400,
    errorCode: 6401,
    message:
      "Missing fields: subject_id, name, time, attempts, date_start, or date_end!",
  },
  INVALID_DATE_FORMAT: {
    statusCode: 400,
    errorCode: 6402,
    message: "Invalid date format. Use YYYY-MM-DD!",
  },
  INVALID_DATE_RANGE: {
    statusCode: 400,
    errorCode: 6403,
    message: "End date must be after start date!",
  },
  ALREADY_EXISTS: {
    statusCode: 409,
    errorCode: 6404,
    message: "Quiz already exists!",
  },
  INVALID_SUBJECT_ID: {
    statusCode: 400,
    errorCode: 6405,
    message: "Invalid subject_id!",
  },
  NOT_FOUND: {
    statusCode: 404,
    errorCode: 6406,
    message: "Quiz not found!",
  },
  TOO_MANY_QUESTIONS: {
    statusCode: 400,
    errorCode: 6407,
    message: "Too many questions. Max allowed is 10!",
  },
  MISSING_QUESTIONS: {
    statusCode: 400,
    errorCode: 6408,
    message: "Missing questions!",
  },
};

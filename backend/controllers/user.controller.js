import { usersModel } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { TOKEN_ERROR, USER_ERROR } from "../constants/errorCodes.js";
import ServerError from "../ServerError.js";
import bcrypt from "bcryptjs";

class UserController {
  async loginUser(req, res) {
    const { email, enrollment, password } = req.body; // Extract enrollment, email, and password from the request body

    // Validate inputs
    if (!email && !enrollment || !password) throw new ServerError(USER_ERROR.MISSING_REQUIRED_FIELDS);

    // Find the user by enrollment or email
    const user = await usersModel.findOne({ $or: [{ email }, { enrollment }] });

    // Check if user exists
    if (!user) {
      throw new ServerError(USER_ERROR.DOESNT_EXIST);
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ServerError(USER_ERROR.INVALID_LOGIN);
    }

    // Generate token
    const token = generateToken(user);

    return res
      .status(200)
      .json({ token }); // Returns a 200 status with a success message and the token
    
  }

  async createUser(req, res) {
    // Checks if the user logged in is an admin
    const isAdmin = req.userRole;
    if (isAdmin !== "admin") {
      throw new ServerError(TOKEN_ERROR.FORBIDDEN_ACCESS);
    }

    // Extracts the user data from the request body
    const { name, enrollment, email, password, role } = req.body;

    // Validates the inputs
    if (!name || !enrollment || !email || !password || !role) {
      throw new ServerError(USER_ERROR.MISSING_REQUIRED_FIELDS);
    }

    // Checks if the user already exists
    const userExists = await usersModel.findOne({
      $or: [{ enrollment }, { email }],
    });
    if (userExists) {
      throw new ServerError(USER_ERROR.ALREADY_REGISTERED);
    }

    // Hashes the password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Creates a new user
    const newUser = {
      name,
      enrollment,
      email,
      password: passwordHash,
      role,
    };

    // Saves the new user in the database
    await usersModel.create(newUser);

    return res.status(204).send();
  }

  async readUsers(req, res) {
    // Checks if the user logged in is an admin
    const isAdmin = req.userRole;
    if (isAdmin !== "admin") {
      throw new ServerError(TOKEN_ERROR.FORBIDDEN_ACCESS);
    }

    // Extract query params for filtering
    const { role, id, enrollment } = req.query;
    let query = {};
    
    // Add role to query if present
    if (role) {
      query.role = role;
    }

    // Add id to query if present and valid
    if (id) {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ServerError(USER_ERROR.INVALID_ID);
      }
      query._id = id;
    }

    // Add enrollment to query if present
    if (enrollment) {
      query.enrollment = enrollment;
    }

    // Finds users in the database based on the query
    const users = await usersModel.findOne(query, "-password -__v");
    if (!users) {
      throw new ServerError(USER_ERROR.DOESNT_EXIST);
    }

    // Returns a 200 status with the found users
    return res.status(200).json(users);
  }  

  async updateUser(req, res) {
    // Checks if the user logged in is an admin
    const isAdmin = req.userRole;
    if (isAdmin !== "admin") {
      throw new ServerError(TOKEN_ERROR.FORBIDDEN_ACCESS);
    }

    const id = req.params.id; // Retrieves the id parameter from the request

    // Updates the user with the provided id using the data from the request body
    await usersModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // Returns a 204 status with no content
    return res
      .status(204)
      .send();
  }

  

  async deleteUser(req, res) {
    // Checks if the user logged in is an admin
    const isAdmin = req.userRole;
    if (isAdmin !== "admin") {
      throw new ServerError(TOKEN_ERROR.FORBIDDEN_ACCESS);
    }

    const id = req.params.id; // Retrieves the id parameter from the request

    // Deletes the user with the provided id
    await usersModel.findByIdAndDelete(id);

    // Returns a 204 status with no content
    return res
      .status(204)
      .send();
  }
}

export default new UserController();
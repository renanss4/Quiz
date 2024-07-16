import { usersModel } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { USER_ERROR } from "../constants/errorCodes.js";
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
      return res
        .status(403)
        .send({ msg: "You don't have permission for this funcionality" });
    }

    const { name, enrollment, email, password, role } = req.body; // Extrai dados do usuário do corpo da requisição

    // Valida entradas
    if (!name || !enrollment || !email || !password || !role) {
      return res.status(404).json({ msg: "All fields are required!" });
    }

    // Verifica se o usuário já existe no banco de dados pelo enrollment ou email
    const userExists = await usersModel.findOne({
      $or: [{ enrollment }, { email }],
    });
    if (userExists) {
      throw new ServerError(USER_ERROR.ALREADY_REGISTERED);
    }

    // Cria um hash de senha
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Cria um novo objeto de usuário
    const newUser = {
      name,
      enrollment,
      email,
      password: passwordHash,
      role,
    };

    // Cria um novo usuário no banco de dados
    await usersModel.create(newUser);

    return res.status(204).send(); // Retorna um status 204 com uma mensagem de sucesso
  }

  async readAdmins(req, res) {
    // Checks if the user logged in is an admin
    const isAdmin = req.payload.role;
    if (isAdmin !== "admin") {
      return res
        .status(403)
        .send({ msg: "You don't have permission for this funcionality" });
    }

    // Finds all admins in the database
    const admins = await usersModel.find({ role: "admin" }, "-__v");
    if (admins.length === 0 || !admins)
      return res.status(404).send("No admins found");

    // Returns a 200 status with the found admins
    return res.status(200).json(admins);
  }

  async readStudents(req, res) {
    // Finds all students in the database
    const students = await usersModel.find({ role: "student" }, "-__v");
    if (students.length === 0 || !students)
      return res.status(404).send("No students found");

    // Returns a 200 status with the found students
    return res.status(200).json(students);
  }

  async readTeachers(req, res) {
    // Finds all teachers in the database
    const teachers = await usersModel.find({ role: "teacher" }, "-__v");
    if (teachers.length === 0 || !teachers)
      return res.status(404).send("No teacher found");

    // Returns a 200 status with the found teachers
    return res.status(200).json(teachers);
  }

  async readUserById(req, res) {
    // Checks if the user logged in is an admin
    // const isAdmin = req.payload.role;
    // if (isAdmin !== "admin") {
    //   return res
    //     .status(403)
    //     .send({ msg: "You don't have permission for this funcionality" });
    // }

    // Finds only a user in the database
    const id = req.params.id;

    // checks if id is valid
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("Invalid ID");
    }

    const user = await usersModel.findById(id, "-password -__v"); // Returns the user without the password and the version key
    if (!user) {
      return res.status(404).send("Not found or does not exist"); // Returns a 404 status if the user doesn't exist
    }

    // Returns a 200 status with the found user
    return res.status(200).json(user); // Returns a 200 status with the found user
  }

  async readUsers(req, res) {
    // Checks if the user logged in is an admin
    const isAdmin = req.payload.role;
    if (isAdmin !== "admin") {
      return res
        .status(403)
        .send({ msg: "You don't have permission for this funcionality" });
    }

    // Finds all users in the database
    const users = await usersModel.find({}, "-password -__v");
    if (users.length === 0 || !users) {
      return res.status(404).send("No users found"); // Returns a 404 status if no users are found
    }

    // Returns a 200 status with the found users
    return res.status(200).json(users); // Returns a 200 status with the found users
  }

  async updateUser(req, res) {
    // Checks if the user logged in is an admin
    const isAdmin = req.payload.role;
    if (isAdmin !== "admin") {
      return res
        .status(403)
        .send({ msg: "You don't have permission for this funcionality" });
    }

    const id = req.params.id; // Retrieves the id parameter from the request

    // Updates the user with the provided id using the data from the request body
    const updatedUser = await usersModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res
      .status(201)
      .json(updatedUser)
      .send({ msg: "Succesfully updated" }); // Returns a 200 status with the updated user
  }

  async deleteUser(req, res) {
    // Checks if the user logged in is an admin
    const isAdmin = req.payload.role;
    if (isAdmin !== "admin") {
      return res
        .status(403)
        .send({ msg: "You don't have permission for this funcionality" });
    }

    const id = req.params.id; // Retrieves the id parameter from the request

    // Deletes the user with the provided id
    const deletedUser = await usersModel.findByIdAndDelete(id);

    return res
      .status(200)
      .json(deletedUser)
      .send({ msg: "Successfully deleted" }); // Returns a 200 status with the deleted user
  }
}

export default new UserController();
import { usersModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { USER_ERROR } from "../constants/errorCodes.js";
import ServerError from "../ServerError.js";
import { generateToken } from "../utils/generateToken.js";

export class UserController {
  // FOR EVERY USER, INDEPENDENT OF THE role
  // Method to login a user
  static async loginUser(req, res) {
    try {
      const { emailOrEnrollment, password } = req.body; // Extract enrollment, email, and password from the request body

      // Validate inputs
      if (!emailOrEnrollment && !password) {
        return res.status(400).json({ msg: "Fields is required!" });
      }

      // Find the user by enrollment or email
      let user;
      if (emailOrEnrollment.includes("@")) {
        user = await usersModel.findOne({ email: emailOrEnrollment });
      } else {
        user = await usersModel.findOne({ enrollment: emailOrEnrollment });
      }

      // Check if user exists
      if (!user) {
        return res.status(404).json({ msg: "User not found!" });
      }

      // Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(404).json({ msg: "Invalid password!" });
      }

      // Generate token
      const token = generateToken(user);

      return res
        .status(200)
        .json({ msg: "User logged in successfully!", token }); // Returns a 200 status with a success message and the token
    } catch (error) {
      console.log({ Error: `${error.message}` });
      return res.status(500).json({ Error: `${error.message}` }); // Returns a 500 status with an error message if an error occurs
    }
  }

  static async createUser(req, res) {
    // Trabalha como um registro

    // Verifica se o usuário logado é um administrador
    const id = req.payload.id;
    // const user = await usersModel.findById(id);

    // Checks if the user logged in is an admin
    const isAdmin = req.payload.role;
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
      role: newRole,
    };

    // Cria um novo usuário no banco de dados
    await usersModel.create(newUser);

    return res.status(201).send({ msg: "User created successfully!" }); // Retorna um status 201 indicando a criação bem-sucedida
  }

  static async readAdmins(req, res) {
    try {
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
    } catch (error) {
      console.log({ Error: `${error.message}` });
      return res.status(500).json({ Error: `${error.message}` });
    }
  }

  static async readStudents(req, res) {
    try {
      // Finds all students in the database
      const students = await usersModel.find({ role: "student" }, "-__v");
      if (students.length === 0 || !students)
        return res.status(404).send("No students found");

      // Returns a 200 status with the found students
      return res.status(200).json(students);
    } catch (error) {
      console.log({ Error: `${error.message}` });
      return res.status(500).json({ Error: `${error.message}` });
    }
  }

  static async readTeachers(req, res) {
    try {
      // Finds all teachers in the database
      const teachers = await usersModel.find({ role: "teacher" }, "-__v");
      if (teachers.length === 0 || !teachers)
        return res.status(404).send("No teacher found");

      // Returns a 200 status with the found teachers
      return res.status(200).json(teachers);
    } catch (error) {
      console.log({ Error: `${error.message}` });
      return res.status(500).json({ Error: `${error.message}` });
    }
  }

  static async readUserById(req, res) {
    try {
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
    } catch (error) {
      console.log({ Error: `${error.message}` });
      return res.status(500).json({ Error: `${error.message}` }); // Returns a 500 status with an error message if an error occurs
    }
  }

  static async readUsers(req, res) {
    try {
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
    } catch (error) {
      console.log({ Error: `${error.message}` });
      return res.status(500).json({ Error: `${error.message}` }); // Returns a 500 status with an error message if an error occurs
    }
  }

  static async updateUser(req, res) {
    try {
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
    } catch (error) {
      console.log({ Error: `${error.message}` });
      return res.status(500).json({ Error: `${error.message}` }); // Returns a 500 status with an error message if an error occurs
    }
  }

  static async deleteUser(req, res) {
    try {
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
    } catch (error) {
      console.log({ Error: `${error.message}` });
      return res.status(500).json({ Error: `${error.message}` }); // Returns a 500 status with an error message if an error occurs
    }
  }

  // FOR STUDENTS ONLY

  // FOR TEACHERS ONLY
}

import { usersModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserController {
  // FOR EVERY USER, INDEPENDENT OF THE POSITION
  // Method to login a user
  static async loginUser(req, res) {
    try {
      const { enrollment, password } = req.body; // Extracts enrollment and password from the request body

      // validate inputs
      if (!enrollment) {
        return res.status(400).json({ Msg: "Enrollment is required!" });
      }
      if (!password) {
        return res.status(400).json({ Msg: "Password is required!" });
      }

      // Finds the user by enrollment
      const user = await usersModel.findOne({ enrollment });
      if (!user) {
        return res.status(400).json({ Msg: "User not found!" });
      }

      // check if password match
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ Msg: "Invalid password!" });
      }

      // create token
      const secret = process.env.JWT_SECRET;
      const token = jwt.sign(
        { id: user._id, position: user.position },
        secret,
        { expiresIn: "30m" }
      );

      return res
        .status(200)
        .json({ Msg: "User logged in successfully!", token }); // Returns a 200 status with a success message and the token
    } catch (error) {
      console.log({ Error: `${error.message}` });
      return res.status(500).json({ Error: `${error.message}` }); // Returns a 500 status with an error message if an error occurs
    }
  }

  // FOR ADMINS ONLY
  static async createUser(req, res) {
    // works like a register
    try {
      // Checks if the user logged in is an admin
      const id = req.payload.id;
      const user = await usersModel.findById(id);

      if (user.position !== "admin")
        return res
          .status(403)
          .send({ Msg: "You don't have permission to create a new user" });

      const { name, enrollment, email, password, position } = req.body; // Extracts user data from the request body

      // Validates inputs
      if (!name && !enrollment && !email && !password && !position) {
        return res.status(400).json({ Msg: "All fields are required!" });
      }

      // Checks if the user already exists in the database by enrollment or email
      const userExists = await usersModel.findOne({ enrollment, email });
      if (userExists) {
        return res.status(400).json({ Error: "User already exists" }); // Returns a 400 status if the user already exists
      }

      // Creates a Password Hash
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      // Creates a new user object
      const newUser = {
        name,
        enrollment,
        email,
        password: passwordHash,
        position,
      };

      // Creates a new user in the database
      await usersModel.create(newUser);
      // console.log(response);

      return res.status(201).send({ Msg: "User created successfully!" }); // Returns a 201 status indicating successful creation
    } catch (error) {
      console.log({ Error: `${error.message}` });
      return res.status(500).json({ Error: `${error.message}` }); // Returns a 500 status with an error message if an error occurs
    }
  }

  static async readAdmins(req, res) {
    try {
      // Checks if the user logged in is an admin
      const isAdmin = req.payload.position;
      if (isAdmin !== "admin") {
        return res
          .status(403)
          .send({ Msg: "You don't have permission for this funcionality" });
      }

      // Finds all admins in the database
      const admins = await usersModel.find({ position: "admin" }, "-__v");
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
      // Checks if the user logged in is an admin
      const isAdmin = req.payload.position;
      if (isAdmin !== "admin") {
        return res
          .status(403)
          .send({ Msg: "You don't have permission for this funcionality" });
      }

      // Finds all students in the database
      const students = await usersModel.find({ position: "student" }, "-__v");
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
      // Checks if the user logged in is an admin
      const isAdmin = req.payload.position;
      if (isAdmin !== "admin") {
        return res
          .status(403)
          .send({ Msg: "You don't have permission for this funcionality" });
      }

      // Finds all teachers in the database
      const teachers = await usersModel.find({ position: "teacher" }, "-__v");
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
      const isAdmin = req.payload.position;
      if (isAdmin !== "admin") {
        return res
          .status(403)
          .send({ Msg: "You don't have permission for this funcionality" });
      }

      // Finds only a user in the database
      const id = req.params.id;
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
      const isAdmin = req.payload.position;
      if (isAdmin !== "admin") {
        return res
          .status(403)
          .send({ Msg: "You don't have permission for this funcionality" });
      }

      // Finds all users in the database
      const users = await usersModel.find("-password -__v");
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
      const isAdmin = req.payload.position;
      if (isAdmin !== "admin") {
        return res
          .status(403)
          .send({ Msg: "You don't have permission for this funcionality" });
      }

      const id = req.params.id; // Retrieves the id parameter from the request

      // Updates the user with the provided id using the data from the request body
      const updatedUser = await usersModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res
        .status(200)
        .json(updatedUser)
        .send({ Msg: "Succesfully updated" }); // Returns a 200 status with the updated user
    } catch (error) {
      console.log({ Error: `${error.message}` });
      return res.status(500).json({ Error: `${error.message}` }); // Returns a 500 status with an error message if an error occurs
    }
  }

  static async deleteUser(req, res) {
    try {
      // Checks if the user logged in is an admin
      const isAdmin = req.payload.position;
      if (isAdmin !== "admin") {
        return res
          .status(403)
          .send({ Msg: "You don't have permission for this funcionality" });
      }

      const id = req.params.id; // Retrieves the id parameter from the request

      // Deletes the user with the provided id
      const deletedUser = await usersModel.findByIdAndDelete(id);

      return res
        .status(200)
        .json(deletedUser)
        .send({ Msg: "Successfully deleted" }); // Returns a 200 status with the deleted user
    } catch (error) {
      console.log({ Error: `${error.message}` });
      return res.status(500).json({ Error: `${error.message}` }); // Returns a 500 status with an error message if an error occurs
    }
  }

  // FOR STUDENTS ONLY

  // FOR TEACHERS ONLY
}

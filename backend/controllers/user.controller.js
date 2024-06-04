import { usersModel } from "../models/user.model.js";

export class UserController {
  static async createUser(req, res) {
    try {
      const { name, enrollment, email, password, position } = req.body; // Extracts user data from the request body

      const newUser = {
        // Creates a new user object
        name,
        enrollment,
        email,
        password,
        position,
      };

      // Creates a new user in the database
      const response = await usersModel.create(newUser);
      console.log(response);

      return res.status(201).send(); // Returns a 201 status indicating successful creation
    } catch (err) {
      console.log(err);
      return res.status(500).json({ Error: `${err.message}` }); // Returns a 500 status with an error message if an error occurs
    }
  }

  static async readUsers(req, res) {
    try {
      // Finds all users in the database
      const users = await usersModel.find();

      return res.status(200).json(users); // Returns a 200 status with the found users
    } catch (err) {
      console.log(err);
      return res.status(500).json({ Error: `${err.message}` }); // Returns a 500 status with an error message if an error occurs
    }
  }

  static async readUsersById(req, res) {
    try {
      // Finds only a user in the database
      const id = req.params.id;
      const user = await usersModel.findById(id);

      return res.status(200).json(user); // Returns a 200 status with the found user
    } catch (err) {
      console.log(err);
      return res.status(500).json({ Error: `${err.message}` }); // Returns a 500 status with an error message if an error occurs
    }
  }

  static async updateUser(req, res) {
    try {
      const id = req.params.id; // Retrieves the id parameter from the request

      // Updates the user with the provided id using the data from the request body
      const updatedUser = await usersModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res.status(200).json(updatedUser); // Returns a 200 status with the updated user
    } catch (err) {
      console.log(err);
      return res.status(500).json({ Error: `${err.message}` }); // Returns a 500 status with an error message if an error occurs
    }
  }

  static async deleteUser(req, res) {
    try {
      const id = req.params.id; // Retrieves the id parameter from the request

      // Deletes the user with the provided id
      const deletedUser = await usersModel.findByIdAndDelete(id);

      return res.status(200).json(deletedUser); // Returns a 200 status with the deleted user
    } catch (err) {
      console.log(err);
      return res.status(500).json({ Error: `${err.message}` }); // Returns a 500 status with an error message if an error occurs
    }
  }
}

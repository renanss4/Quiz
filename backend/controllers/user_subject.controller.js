import { usersSubjectsModel } from "../models/user_subject.model.js";
import { usersModel } from "../models/user.model.js";
import { subjectsModel } from "../models/subject.model.js";

export class UserSubjectController {
  static async createUserSubject(req, res) {
    try {
      const { user_id, subject_id } = req.body; // Extracts user_id and subject_id from the request body

      // Finds the user by id
      const user = await usersModel.findById(user_id);

      // Finds the subject by id
      const subject = await subjectsModel.findById(subject_id);

      // Checks if user and subject exist
      if (!user || !subject) {
        return res.status(404).send("Not found or does not exist"); // Returns a 404 status if either user or subject doesn't exist
      }

      // Checks if the user is a student
      if (user.position !== "aluno") {
        return res.status(404).send("This user is not a Student"); // Returns a 404 status if the user is not a student
      }

      // Checks if the user already has the subject registered
      const alreadyExists = await usersSubjectsModel.find({
        $and: [{ user_id: user_id }, { subject_id: subject_id }],
      });

      if (alreadyExists && alreadyExists.length !== 0) {
        return res
          .status(404)
          .send("Student with subject are already registered"); // Returns a 404 status if the user already has the subject registered
      }

      // Creates a new record for the student with the subject
      const studentSubject = {
        user_id: user_id,
        subject_id: subject_id,
      };

      const response = await usersSubjectsModel.create(studentSubject);

      res
        .status(201)
        .json({ response, msg: "Student with subject created successfully" }); // Returns a success message along with the created record
    } catch (err) {
      console.log(err);
      return res.status(500).json({ Error: `${err.message}` }); // Returns a 500 status with an error message if an error occurs
    }
  }

  static async readUsersSubjects(req, res) {
    try {
      // Finds all user subjects
      const usersSubjects = await usersSubjectsModel.find();

      // Returns a 201 status with the found user subjects
      res.status(201).json(usersSubjects);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ Error: `${err.message}` }); // Returns a 500 status with an error message if an error occurs
    }
  }

  static async readOnlyOneUserSubject(req, res) {
    try {
      const id = req.params.id; // Retrieves the id parameter from the request

      // Finds a userSubject with the provided id
      const userSubjectAlreadyExists = await usersSubjectsModel.find({
        $or: [{ _id: id }, { user_id: id }, { subject_id: id }],
      });

      // Checks if the userSubject exists
      if (!userSubjectAlreadyExists || userSubjectAlreadyExists.length === 0) {
        return res.status(404).json({
          msg: "This id is not associated with any user or subject", // Returns a 404 status with a message if the userSubject doesn't exist
        });
      }

      res.status(201).json({
        userSubjectAlreadyExists, // Returns the found userSubject
        msg: "Showing items with id equal to the parameter", // Returns a success message
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ Error: `${err.message}` }); // Returns a 500 status with an error message if an error occurs
    }
  }

  static async deleteUserSubject(req, res) {
    try {
      const id = req.params.id; // Retrieves the id parameter from the request

      // Finds the user subject by id
      const userSubject = await usersSubjectsModel.findById(id);

      // Checks if the user subject exists
      if (!userSubject) {
        return res.status(404).send("Not found or does not exist"); // Returns a 404 status if the user subject doesn't exist
      }

      // Deletes the user subject
      const deletedUserSubject = await usersSubjectsModel.findOneAndDelete(id);

      // Returns a 200 status with the deleted user subject and a success message
      res.status(200).json(deletedUserSubject).send("Successfully deleted");
    } catch (err) {
      console.log(err);
      return res.status(500).json({ Error: `${err.message}` }); // Returns a 500 status with an error message if an error occurs
    }
  }
}

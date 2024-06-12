import { usersSubjectsModel } from "../models/user_subject.model.js";
import { usersModel } from "../models/user.model.js";
import { subjectsModel } from "../models/subject.model.js";

export class UserSubjectController {
  static async createUserSubject(req, res) {
    try {
      // Checks if the user logged in is an admin
      const isAdmin = req.payload.position;
      if (isAdmin !== "admin") {
        return res
          .status(403)
          .send({ Msg: "You don't have permission for this funcionality" });
      }

      const { user_id, subject_id } = req.body; // Extracts user_id and subject_id from the request body

      // Finds the user and subject by id
      const user = await usersModel.findById(user_id);
      const subject = await subjectsModel.findById(subject_id);

      // Checks if user and subject exist
      if (!user || !subject) {
        return res.status(404).send({ Msg: "Not found or does not exist" }); // Returns a 404 status if either user or subject doesn't exist
      }

      // Checks if the user is a student
      if (user.position !== "aluno") {
        return res.status(404).send({ Msg: "This user is not a Student" }); // Returns a 404 status if the user is not a student
      }

      // Checks if the user already has the subject registered
      const userAlreadyExists = await usersSubjectsModel.find({
        $and: [{ user_id: user_id }, { subject_id: subject_id }],
      });

      if (userAlreadyExists && userAlreadyExists.length !== 0) {
        return res
          .status(404)
          .send({ Msg: "Student with subject are already registered" }); // Returns a 404 status if the user already has the subject registered
      }

      // Creates a new record for the student with the subject
      const studentSubject = {
        user_id: user_id,
        subject_id: subject_id,
      };

      await usersSubjectsModel.create(studentSubject);

      res.status(201).send({ Msg: "Successfully created" }); // Returns a success message along with the created record
    } catch (error) {
      console.log({ Error: `${error.message}` });
      return res.status(500).json({ Msg: `${error.message}` }); // Returns a 500 status with an error message if an error occurs
    }
  }

  static async readUsersSubjects(req, res) {
    try {
      // Checks if the user logged in is an admin
      const isAdmin = req.payload.position;
      if (isAdmin !== "admin") {
        return res
          .status(403)
          .send({ Msg: "You don't have permission for this funcionality" });
      }

      // Finds all user subjects
      const usersSubjects = await usersSubjectsModel.find("-__v");
      if (usersSubjects.length === 0 || !usersSubjects) {
        return res.status(404).send({ Msg: "No user subjects found" }); // Returns a 404 status if no user subjects are found
      }

      // Returns a 201 status with the found user subjects
      res.status(200).json(usersSubjects);
    } catch (error) {
      console.log({ Error: `${error.message}` });
      return res.status(500).json({ Msg: `${error.message}` }); // Returns a 500 status with an error message if an error occurs
    }
  }

  static async readOnlyOneUserSubject(req, res) {
    try {
      // Checks if the user logged in is an admin
      const isAdmin = req.payload.position;
      if (isAdmin !== "admin") {
        return res
          .status(403)
          .send({ Msg: "You don't have permission for this funcionality" });
      }

      const id = req.params.id; // Retrieves the id parameter from the request

      // Finds a userSubject with the provided id
      const userSubject = await usersSubjectsModel.find({
        $or: [{ _id: id }, { user_id: id }, { subject_id: id }],
      });

      // Checks if the userSubject exists
      if (!userSubject || userSubject.length === 0) {
        return res.status(404).json({
          Msg: "This id is not associated with any user or subject", // Returns a 404 status with a message if the userSubject doesn't exist
        });
      }

      res.status(200).json(userSubject); // Returns a 200 status with the found userSubject
    } catch (error) {
      console.log({ Error: `${error.message}` });
      return res.status(500).json({ Msg: `${error.message}` }); // Returns a 500 status with an error message if an error occurs
    }
  }

  static async deleteUserSubject(req, res) {
    try {
      // Checks if the user logged in is an admin
      const isAdmin = req.payload.position;
      if (isAdmin !== "admin") {
        return res
          .status(403)
          .send({ Msg: "You don't have permission for this funcionality" });
      }

      const id = req.params.id; // Retrieves the id parameter from the request

      // Deletes the user subject
      const deletedUserSubject = await usersSubjectsModel.findOneAndDelete(id);

      // Returns a 200 status with the deleted user subject and a success message
      return res
        .status(200)
        .json(deletedUserSubject)
        .send({ Msg: "Successfully deleted" });
    } catch (error) {
      console.log({ Error: `${error.message}` });
      return res.status(500).json({ Msg: `${error.message}` }); // Returns a 500 status with an error message if an error occurs
    }
  }
}

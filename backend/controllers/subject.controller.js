import { subjectsModel } from "../models/subject.model.js";

export class SubjectController {
  static async createSubject(req, res) {
    try {
      const { name, year, semester, user_id } = req.body; // Extracts subject data from the request body

      const newSubject = {
        // Creates a new subject object
        name,
        year,
        semester,
        user_id,
      };

      // Creates a new subject in the database
      const response = await subjectsModel.create(newSubject);
      console.log(response);

      return res.status(201).send(); // Returns a 201 status indicating successful creation
    } catch (err) {
      console.log(err);
      return res.status(500).json({ Error: `${err.message}` }); // Returns a 500 status with an error message if an error occurs
    }
  }

  static async readSubjects(req, res) {
    try {
      // Finds all subjects in the database
      const subjects = await subjectsModel.find();

      return res.status(200).send(subjects); // Returns a 200 status with the found subjects
    } catch (err) {
      console.log(err);
      return res.status(500).json({ Error: `${err.message}` }); // Returns a 500 status with an error message if an error occurs
    }
  }

  static async readSubjectById(req, res) {
    try {
      // Finds only a user in the database
      const id = req.params.id;
      const subject = await subjectsModel.findById(id);

      return res.status(200).json(subject); // Returns a 200 status with the found subject
    } catch (err) {
      console.log(err);
      return res.status(500).json({ Error: `${err.message}` }); // Returns a 500 status with an error message if an error occurs
    }
  }

  static async updateSubject(req, res) {
    try {
      const id = req.params.id; // Retrieves the id parameter from the request

      // Updates the subject with the provided id using the data from the request body
      const updatedSubject = await subjectsModel.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        }
      );

      return res.status(200).json(updatedSubject); // Returns a 200 status with the updated subject
    } catch (err) {
      console.log(err);
      return res.status(500).json({ Error: `${err.message}` }); // Returns a 500 status with an error message if an error occurs
    }
  }

  static async deletedSubject(req, res) {
    try {
      const id = req.params.id; // Retrieves the id parameter from the request

      // Deletes the subject with the provided id
      const deletedSubject = await subjectsModel.findByIdAndDelete(id);

      return res.status(200).json(deletedSubject); // Returns a 200 status with the deleted subject
    } catch (err) {
      console.log(err);
      return res.status(500).json({ Error: `${err.message}` }); // Returns a 500 status with an error message if an error occurs
    }
  }
}

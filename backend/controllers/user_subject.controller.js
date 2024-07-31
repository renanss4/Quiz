import { usersSubjectsModel } from "../models/user_subject.model.js";
import { usersModel } from "../models/user.model.js";
import { subjectsModel } from "../models/subject.model.js";
import {
  USER_ERROR,
  SUBJECT_ERROR,
  RELATION_ERROR,
} from "../constants/errorCodes.js";
import ServerError from "../ServerError.js";
import { validateId } from "../utils/validateId.js";

class UserSubjectController {
  async createUserSubject(req, res) {
    // Extracts student_id and subject_id from the request body
    const { student_id, subject_id } = req.body;

    // Validates if the required fields are empty
    if (!student_id || !subject_id) {
      throw new ServerError(RELATION_ERROR.MISSING_FIELDS);
    }

    // Finds the user and subject by id
    const student = await usersModel.findById(student_id);
    const subject = await subjectsModel.findById(subject_id);

    // Checks if user and subject exist
    if (!student) {
      throw new ServerError(USER_ERROR.DOESNT_EXIST);
    } else if (!subject) {
      throw new ServerError(SUBJECT_ERROR.DOESNT_EXIST);
    }

    // Checks if the student is a student
    if (student.role !== "student") {
      throw new ServerError(USER_ERROR.INVALID_ROLE);
    }

    // Checks if the user already has the subject registered
    const studentAlreadyExists = await usersSubjectsModel.findOne({
      $and: [{ student_id: student_id }, { subject_id: subject_id }],
    });
    if (studentAlreadyExists) {
      throw new ServerError(RELATION_ERROR.ALREADY_EXIST);
    }

    // Creates a new record for the student with the subject
    const studentSubject = {
      student_id: student_id,
      subject_id: subject_id,
    };

    // Creates the user_subject relationship
    await usersSubjectsModel.create(studentSubject);

    // Returns a 204 status if the user_subject relationship is created
    res.status(204).send();
  }

  async readUsersSubjects(req, res) {
    // Extracts query params for filtering
    const { id, student_id, subject_id } = req.query;
    let query = {};

    // Add id to query if present and valid
    if (id) {
      validateId(id);
      query._id = id;
    }

    // Add student_id to query if present and valid
    if (student_id) {
      validateId(student_id);
      query.student_id = student_id;
    }

    // Add subject_id to query if present and valid
    if (subject_id) {
      validateId(subject_id);
      query.subject_id = subject_id;
    }

    // Finds user_subject relationships in the database based on the query
    const usersSubjects = await usersSubjectsModel.find(query, "-__v");
    if (!usersSubjects) {
      throw new ServerError(RELATION_ERROR.DOESNT_EXIST);
    }

    console.log(query);
    // Returns a 200 status with the found user_subject relationships
    return res.status(200).json(usersSubjects);
  }

  async deleteUserSubject(req, res) {
    // Retrieves the id parameter from the request
    const id = req.params.id;

    // Deletes the user_subject relationship
    const deletedSubject = await usersSubjectsModel.findByIdAndDelete(id);

    // Checks if the user_subject relationship exists
    if (!deletedSubject) {
      throw new ServerError(RELATION_ERROR.DOESNT_EXIST);
    }

    // Returns a 204 status if the user_subject relationship is deleted
    return res.status(204).send();
  }
}

export default new UserSubjectController();

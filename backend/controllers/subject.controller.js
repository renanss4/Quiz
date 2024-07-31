import { subjectsModel } from "../models/subject.model.js";
import { SUBJECT_ERROR } from "../constants/errorCodes.js";
import ServerError from "../ServerError.js";

class SubjectController {
  async createSubject(req, res) {
    // Extracts subject data from the request body
    const { name, teacher_id } = req.body;

    // Validates if the required fields are empty
    if (!name) {
      throw new ServerError(SUBJECT_ERROR.MISSING_FIELDS);
    }

    // Checks if the subject already exists in the database by name
    const subjectExists = await subjectsModel.findOne({ name });
    if (subjectExists) {
      throw new ServerError(SUBJECT_ERROR.ALREADY_EXIST);
    }

    const newSubject = {
      name,
      teacher_id: teacher_id || null,
    };

    await subjectsModel.create(newSubject);

    // Returns a 204 status if the subject is created
    return res.status(204).send();
  }

  async readSubjects(req, res) {
    // Extract query params for filtering
    const { teacher_id, id, name } = req.query;
    let query = {};

    // Add teacher_id to query if present and valid
    if (teacher_id) {
      if (!teacher_id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ServerError(USER_ERROR.INVALID_ID);
      }
      query.teacher_id = teacher_id;
    }

    // Add id to query if present and valid
    if (id) {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ServerError(USER_ERROR.INVALID_ID);
      }
      query._id = id;
    }

    // Add name to query if present
    if (name) {
      query.name = name;
    }

    // Finds subjects in the database based on the query
    const subjects = await subjectsModel.find(query, "-__v").populate({
      path: "teacher_id",
      select: "name",
    });

    if (!subjects || subjects.length === 0) {
      throw new ServerError(SUBJECT_ERROR.DOESNT_EXIST);
    }

    // Returns a 200 status with the found subjects
    return res.status(200).send(subjects);
  }

  async updateSubject(req, res) {
    // Retrieves the id parameter from the request
    const id = req.params.id;

    // Updates the subject with the provided id using the data from the request body
    const updatedSubject = await subjectsModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // Checks if the subject was found and updated
    if (!updatedSubject) {
      throw new ServerError(SUBJECT_ERROR.DOESNT_EXIST);
    }

    // Returns a 200 status with the updated subject
    return res.status(204).send();
  }

  async deleteSubject(req, res) {
    // Retrieves the id parameter from the request
    const id = req.params.id;

    // Deletes the subject with the provided id
    const deletedSubject = await subjectsModel.findByIdAndDelete(id);

    // Checks if the subject exists
    if (!deletedSubject) {
      throw new ServerError(SUBJECT_ERROR.DOESNT_EXIST);
    }

    // Returns a 204 status with the deleted subject
    return res.status(204).send();
  }
}

export default new SubjectController();

/**
 * This function is used to validate the id..
 * It checks if the id is a valid MongoDB ObjectId.
 * If the id is not valid, it throws an error.
 */

import ServerError from "../ServerError.js";
import { USER_ERROR } from "../constants/errorCodes.js";

export function validateId(id) {
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new ServerError(USER_ERROR.INVALID_ID);
  }
}

/**
 * This function is a middleware that wraps the controller function in a try-catch block.
 * This way, we can catch any errors that occur in the controller function and pass them to the error handler middleware.
 * This helps to centralize error handling and avoid duplicating error handling code in each controller function.
 */
export function tryCatch(controller) {
  return async (req, res, next) => {
    try {
      await controller(req, res);
    } catch (error) {
      next(error);
    }
  };
}

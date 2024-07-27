/**
 * Tidies error array into a single text message.
 * @param {*} errorArray - array of errors produced by express-validator
 */

const constructValidationErrorMessage = (validationObject) => {
  // validation object has built in available objects .isEmpty and .array
  if (!validationObject.isEmpty()) {
    // construct helpful error message
    let errorMsg = "";
    validationObject.array().forEach((element) => {
      errorMsg += element.msg + " ";
    });
    errorMsg = errorMsg.slice(0, -1);
    return errorMsg;
  }
};

module.exports = { constructValidationErrorMessage };

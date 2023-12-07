const success = { success: true, code: 200, message: "success" };
const successAdd = { success: true, code: 201, message: "Created" };
const successAdds = { success: true, code: 202, message: "It was confirmed" };
const successNot = { success: true, code: 204, message: "No content" };
const notEdited = { success: false, code: 304, message: "Could not be edited" };
const errorRequest = {
  success: false,
  code: 400,
  message: "Wrong request error",
};
const errorNot = {
  success: false,
  code: 404,
  message: "not found",
};

module.exports = {
  success,
  successAdd,
  successAdds,
  successNot,
  notEdited,
  errorRequest,
  errorNot,
};

interface StatusCodes {
  success: boolean;
  code: number;
  message: string;
}

const success: StatusCodes = { success: true, code: 200, message: "success" };
const successAdd: StatusCodes = {
  success: true,
  code: 201,
  message: "Created",
};
const successAdds: StatusCodes = {
  success: true,
  code: 202,
  message: "It was confirmed",
};
const successNot: StatusCodes = {
  success: true,
  code: 204,
  message: "No content",
};
const notEdited: StatusCodes = {
  success: false,
  code: 304,
  message: "Could not be edited",
};
const errorRequest: StatusCodes = {
  success: false,
  code: 400,
  message: "Wrong request error",
};
const errorNot = {
  success: false,
  code: 404,
  message: "not found",
};

export {
  success,
  successAdd,
  successAdds,
  successNot,
  notEdited,
  errorRequest,
  errorNot,
};

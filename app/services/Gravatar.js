const gravatar = require("gravatar");
exports.gravatar = (email) => {
  const picture = gravatar.url(email, { d: "mm" });
  return { picture };
};

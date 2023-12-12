const gravatar = require("gravatar");
exports.gravatar = (email) => {
  let picture = gravatar.url(email, { d: "mm" });
  picture="https:"+picture;
  return { picture };
};

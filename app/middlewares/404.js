module.exports = (app) => {
  app.use((req, res, nex) => {
    res.status(404).send({
      code: "Not Found",
      status: 404,
      message: "requested resource could not be found!",
    });
  });
};

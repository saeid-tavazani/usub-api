module.exports = (app) => {
  app.use((error, req, res, nex) => {
    const status = error.status || 500;
    res.send({
      code: "Exception",
      status,
      message: error.message,
    });
  });
};

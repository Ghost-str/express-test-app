const validatorBuilder = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (result.success) {
    req.body = result.data;
    next();
  } else {
    res
      .status(400)
      .setHeader("content-type", "application/json")
      .send(result.error);
  }
};

export default validatorBuilder;

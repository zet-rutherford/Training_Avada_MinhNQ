const yup = require("yup");

async function todoInputMiddleware(ctx, next) {
  try {
    const postData = ctx.request.body;
    let schema = yup.object().shape({
      id: yup.string(),
      task: yup.string().required(),
      isCompleted: yup.boolean(),
    });

    await schema.validate(postData);
    next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name,
    };
  }
}

module.exports = { todoInputMiddleware };

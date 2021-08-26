const success =
  (res, sanitizer = (data) => data) =>
  ({ data }) =>
    res.status(200).send({ data: sanitizer(data), message: null });

const clientError =
  (res) =>
  ({ message, code = 400 }) => {
    console.log(`In the client error.`);
    console.log({ message, code });
    return res.status(code).send({ data: null, message: message });
  };

const serverError = (res) => () =>
  res.status(500).send({ data: null, message: 'Something went wrong.' });

module.exports = (res, sanitizer) => {
  return {
    success: success(res, sanitizer),
    clientError: clientError(res),
    serverError: serverError(res),
  };
};

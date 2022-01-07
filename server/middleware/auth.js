import jwt from "jsonwebtoken";

const secret = "jsonwebtokensecret";

const auth = async (req, res, next) => {
  try {
    // console.log("middleware below");
    // console.log(req.headers);
    // console.log(req.userId);
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    console.log("middleware belowww token");
    console.log(token);
    console.log(isCustomAuth);

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);
      console.log('beloooo decodedata');
      console.log(decodedData);
      console.log("above decodedata");
      req.userId = decodedData?.id;
      console.log(req.userId);
      console.log('reqid abovey');
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
      console.log('google below userid');
      console.log(req.userId);
    }
// console.log('before next');
    next();
// console.log('after next');

  } catch (error) {
    console.log(error);
  }
};

export default auth;

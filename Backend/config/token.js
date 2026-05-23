import jwt from "jsonwebtoken";

 export const genToken = async (userid) => {
  try {
    const token = jwt.sign(
      { userId: userid },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return token;
  } catch (error) {
    console.log("token error", error);
  }
};



export const genToken1 = async (email) => {
  try {
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return token;
  } catch (error) {
    console.log("token error", error);
  }
}


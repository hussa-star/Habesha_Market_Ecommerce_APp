import jwt from "jsonwebtoken";

// JWT GENERATION UTILITY

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });
}

export { generateToken };

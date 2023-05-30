import * as bcrypt from "bcrypt";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

const authService =  {
  async login(email: string, password: string) : Promise<string | undefined> {
    const user = await User.findOne({ email }).exec()
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = {
        sub: user.id,
        email
      }
      const token = jwt.sign(payload, JWT_SECRET)
      return token
    }
  }
}

export default authService
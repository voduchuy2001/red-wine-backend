import bcrypt from "bcryptjs";
const SALT = 10;

export default class Bcrypt {
    static async hashPassword(password) {
        return await bcrypt.hash(password, SALT);
    }

    static async comparePassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
}

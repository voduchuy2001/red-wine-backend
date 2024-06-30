import bcrypt from "bcryptjs";

export default class Bcrypt {
    static async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }

    static async comparePassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
}

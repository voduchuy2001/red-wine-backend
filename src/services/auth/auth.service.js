import { MESSAGES } from "@constants/message";
import Bcrypt from "@utils/bcrypt";
import JWT from "@utils/jwt";

export default class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async login(data) {
        const { email, password } = data;

        const findUser = await this.userRepository.findOne({ where: { email } });
        if (!findUser) throw new Error(MESSAGES.notFound);

        const matchedPassword = await Bcrypt.comparePassword(password, findUser.password);
        if (!matchedPassword) throw new Error(MESSAGES.doesNotMatch);

        findUser.update({ lastLoginAt: new Date() });
        await findUser.save();

        const loggedInUser = findUser.get({ plain: true });
        delete loggedInUser.password;

        const accessToken = JWT.generate(findUser.id, "7d");
        loggedInUser.accessToken = accessToken;

        return loggedInUser;
    }

    async register(data) {
        const { email, password } = data;

        const existedUser = await this.userRepository.findOne({ where: { email } });
        if (existedUser) throw new Error(MESSAGES.isExisted);

        const hashedPassword = await Bcrypt.hashPassword(password);
        const user = await this.userRepository.create({ email, password: hashedPassword });

        const registerdUser = user.get({ plain: true });
        delete registerdUser.password;

        return registerdUser;
    }
}

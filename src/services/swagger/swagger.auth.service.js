import Bcrypt from "@utils/bcrypt";
import fs from "fs";
import path from "path";

const swaggerAccountsPath = path.resolve(__dirname, "../../storage/swagger/account.json");
const rawData = fs.readFileSync(swaggerAccountsPath);
const swaggerAccounts = JSON.parse(rawData);

export default class SwaggerAuthService {
    async login(data) {
        const { username, password } = data;

        const promises = swaggerAccounts.map(async (account) => {
            if (account.username === username) {
                const passwordMatch = await Bcrypt.comparePassword(password, account.password);
                return { ...account, passwordMatch };
            }
            return null;
        });

        const results = await Promise.all(promises);
        const existedAccount = results.find((result) => result && result.passwordMatch);

        return !!existedAccount;
    }
}

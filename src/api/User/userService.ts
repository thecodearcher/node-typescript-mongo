import { UserDoc } from "./userInterface";
import { User } from "./userModel";

export class UserService {
    public async  getUsers() {
        return User.find();
    }

    public async  saveUser(user: UserDoc) {
        return User.create(user);
    }
}

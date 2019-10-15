import { UserDoc } from "./userInterface";
import { BaseController } from "../baseController";
import { UserService } from "./userService";

/**
 * User controller
 *
 * @export
 * @class UserController
 */
export class UserController extends BaseController {
    private _userService = new UserService();

    public getUsers = async () => {
        const user = await this._userService.getUsers();
        return this.sendResponse(user);
    }

    public addUser = async (user: UserDoc) => {
        const i = await this._userService.saveUser(user);
        return this.sendResponse(i);
    }
}

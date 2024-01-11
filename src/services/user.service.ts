import { Request, Response } from "express"
const fs = require("fs");

class UserService {
    constructor() {

    }

    getUser(req: Request, res: Response) {
        const data = fs.readFileSync("./src/user-post-api/users.json", "utf-8");
        const dataUser = JSON.parse(data);
        res.status(200).json(dataUser);


    }
    getDetailUser(req: Request, res: Response) {
        const data = fs.readFileSync("./src/user-post-api/users.json", "utf-8");
        const dataUser = JSON.parse(data);
        const idParam = req.params.id;
        console.log(idParam);

        if (idParam) {
            const user = dataUser.find((item: any) => {
                return item.id == idParam;
            });
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: "User not found" });
            }
        }
    }

    searchUser(req: Request, res: Response) {
        const name = (req.query.name as string).toLowerCase();
        const data = fs.readFileSync("./src/user-post-api/users.json", "utf-8");
        const dataUser = JSON.parse(data);
        const matchedUsers = dataUser.filter((user: any) => {
            return user.name.toLowerCase().includes(name);
        });
        res.status(200).json(matchedUsers);
    }
    createUser(req: Request, res: Response) {
        const newUser = req.body;
        const data = fs.readFileSync("./src/user-post-api/users.json", "utf-8");
        const dataUser = JSON.parse(data);
        dataUser.push(newUser);
        fs.writeFileSync("./src/user-post-api/users.json", JSON.stringify(dataUser));
        res.status(201).json(newUser);
    }
    updateUser(req: Request, res: Response) {
        const data = fs.readFileSync("./src/user-post-api/users.json", "utf-8");
        const dataUser = JSON.parse(data);
        const idParam = req.params.id;
        const updateUser = req.body;
        const userIndex = dataUser.findIndex((user: any) => user.id == idParam);
        if (userIndex !== -1) {
            dataUser[userIndex] = { ...dataUser[userIndex], ...updateUser };
            fs.writeFileSync("./src/user-post-api/users.json", JSON.stringify(dataUser));
            res.status(200).json({
                message: "User updated successfully",
            });
        } else {
            res.status(404).json({ error: "User not found" });
        }

    }
    deleteUser(req: Request, res: Response) {
        const data = fs.readFileSync("./src/user-post-api/users.json", "utf-8");
        const dataUser = JSON.parse(data);
        const idParam = +req.params.id;
        const userNew = dataUser.findIndex((user: any) => user.id === idParam);

        if (userNew !== -1) {
            dataUser.splice(userNew, 1);
            fs.writeFileSync("./src/user-post-api/users.json", JSON.stringify(dataUser));
            res.status(204).json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    }
    getUserPosts(req: Request, res: Response) {
        const userId = req.params.id;
        const data = fs.readFileSync("./src/user-post-api/posts.json", "utf-8");
        const postData = JSON.parse(data);
        const userPosts = postData.filter((post: any) => post.userId == userId);
        res.status(200).json(userPosts);
    }
    createUserPost(req: Request, res: Response) {
        const userId = req.params.id;
        const newPost = req.body;
        const data = fs.readFileSync("./src/user-post-api/posts.json", "utf-8");
        const postData = JSON.parse(data);
        newPost.userId = userId;
        postData.push(newPost);
        fs.writeFileSync("./src/user-post-api/posts.json", JSON.stringify(postData));
        res.status(201).json(newPost);
    }



}
export default UserService
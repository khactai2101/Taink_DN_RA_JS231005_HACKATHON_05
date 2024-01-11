import express from 'express'
import UserService from '../services/user.service'
import { validateUserData } from '../middlewares/users.middleware'

const userController = express.Router()
const userService = new UserService()
//•	GET →  Lấy về dữ liệu của một user
userController.get('/detail/:id', userService.getDetailUser)

//•	GET →  Lấy về dữ liệu của toàn bộ users
userController.get('/', userService.getUser)

//•	GET →  Tìm kiếm users theo tên (không phân biệt hoa thường)
userController.get('/search', userService.searchUser)

//•	POST →  Thêm mới dữ liệu về 1 users vào trong file json đã tạo
userController.post('/', validateUserData, userService.createUser)

//•	PATCH →  Chỉnh sửa address của 1 user               
userController.patch('/update/:id', userService.updateUser)

//•	DELET →  Xoá dữ liệu của  một user
userController.delete('/delete/:id', userService.deleteUser)

userController.get('/:id/posts', userService.getUserPosts);

userController.post('/:id/posts', userService.createUserPost);


export default userController
import { Express } from "express"
import userController from './users.controller'
const Router = (server: Express) => {

    server.use('/api/v1/user', userController)
}

export default Router
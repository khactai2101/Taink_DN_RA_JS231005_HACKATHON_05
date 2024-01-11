import { Request, Response, NextFunction } from "express";

export const validateUserData = (req: Request, res: Response, next: NextFunction) => {
    const { name, email, username, address, phone, website, company } = req.body;

    if (!name || name.length < 3 || name.length > 20) {
        return res.status(400).json({ error: "Tên phải có độ dài từ 3 đến 20 ký tự" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !email.match(emailRegex)) {
        return res.status(400).json({ error: "Email không hợp lệ" });
    }
    if (!name || !email || !username || !address || !phone || !website || !company) {
        return res.status(400).json({ error: "Các trường dữ liệu không được để trống" });
    }

    next();
};

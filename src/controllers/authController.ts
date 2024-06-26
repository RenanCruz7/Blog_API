import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();
const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    const encryptedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            name: name,
            email: email.toLowerCase(),
            password: encryptedPassword,
        }
    })

    const secretKey = process.env.TOKEN_KEY
    if (!secretKey) {
        throw new Error('TOKEN_KEY is not defined')
    }


    const token = jwt.sign(
        { user_id: user.id, email },
        secretKey,
        {
            expiresIn: "2h"
        }
    )
    res.status(201).json(token)
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
        where: {
            email: email.toLowerCase()
        }
    })
    if (!user) {
        return res.status(400).json({ error: "Usuário não encontrado" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({ error: "Senha invalida" })
    }
    const secretKey = process.env.TOKEN_KEY;
    if (!secretKey) {
        throw new Error('TOKEN_KEY is not defined');
    }

    const token = jwt.sign(
        { user_id: user.id, email },
        secretKey,
        {
            expiresIn: '2h',
        }
    );

    res.json({ token });

}
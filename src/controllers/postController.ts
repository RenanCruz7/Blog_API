import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

const prisma = new PrismaClient();

export const getPosts = async (req: Request, res: Response) => {
    const posts = await prisma.post.findMany();
    res.json(posts);
};

export const createPost = async (req: Request, res: Response) => {
    const {title, description} = req.body
    const userId = res.locals.userId

    const post = await prisma.post.create({
        data:{
            title: title,
            description: description,
            published: true,
            authorId: userId
        }
    })
    res.json(post);
};

export const getPost = async (req: Request, res: Response) => {
    const post = await prisma.post.findUnique({
        where: {
            id: Number(req.params.id),
        },
    });
    res.json(post);
};

export const updatePost = async (req: Request, res: Response) => {
    const updatedPost = await prisma.post.update({
        where: {
            id: Number(req.params.id),
        },
        data: req.body,
    });
    res.json(updatedPost);
};

export const deletePost = async (req: Request, res: Response) => {
    const deletedPost = await prisma.post.delete({
        where: {
            id: Number(req.params.id),
        },
    });
    res.json(deletedPost);
};
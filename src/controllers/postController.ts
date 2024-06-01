import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getPosts = async (req: Request, res: Response) => {
    const posts = await prisma.post.findMany();
    res.json(posts);
};

export const createPost = async (req: Request, res: Response) => {
    const newPost = await prisma.post.create({
        data: req.body,
    });
    res.json(newPost);
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
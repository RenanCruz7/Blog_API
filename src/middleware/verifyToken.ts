import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'

interface RequestWithUserId extends Request {
  userId?: number;
}
interface JwtPayloadWithUserId extends JwtPayload {
  user_id?: number;
}

export const verifyToken = (req: RequestWithUserId, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).send({ message: 'Nenhum token fornecido' });
  }

  // Extrai o token do cabeçalho 'Authorization'
  const token = authHeader.split(' ')[1];

  const secretKey = process.env.TOKEN_KEY;
  if (!secretKey) {
    throw new Error('TOKEN_KEY is not defined');
  }

  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayloadWithUserId;
    res.locals.userId = decoded.user_id; // Anexa o ID do usuário ao objeto de solicitação
    console.log(decoded.user_id)
    next(); // Chama o próximo middleware ou rota
  } catch (err) {
    // O token é inválido ou expirado
    console.error(err);
    return res.status(401).send({ message: 'Token inválido ou expirado' });
  }
};
import express from 'express';
import postRoutes from './routes/postRoutes'

const app = express();
const port = 3000;

app.use('/post',postRoutes)

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
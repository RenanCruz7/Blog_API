import { register } from './controllers/authController';
import express from 'express';
import bodyParser from 'body-parser';
import postRoutes from './routes/postRoutes'
import loginRoutes from './routes/loginRoutes'
import registerRoutes from './routes/registerRoutes'

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/post',postRoutes)
app.use('/login',loginRoutes)
app.use('/register',registerRoutes)

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
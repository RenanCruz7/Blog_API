import express from 'express';
import bodyParser from 'body-parser';
import postRoutes from './routes/postRoutes'
import loginRoutes from './routes/loginRoutes'

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/post',postRoutes)
app.use('/register',loginRoutes)

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
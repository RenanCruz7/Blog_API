import express from 'express';

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.send('Obter todos os posts');
  })
  .post((req, res) => {
    res.send('Criar um post');
  });

router.route('/:id')
  .get((req, res) => {
    res.send(`Obter um post com id ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Atualizar o post com id ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Deletar o post com id ${req.params.id}`);
  });

export default router;
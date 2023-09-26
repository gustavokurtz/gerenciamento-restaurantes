import express from 'express';
import restaurantRouter from './restaurantRouter.js';

const app = express();

app.use(express.json());

app.use('/restaurantes', restaurantRouter);

const port = 3000; // Escolha a porta que desejar
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

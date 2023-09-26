// restaurantRouter.js
import express from 'express';
import Connection from './db.js';

const router = express.Router();

router.get('/', (req, res) => {
  Connection.query('SELECT * FROM restaurantes', (err, rows) => {
    if (err) {
      console.error('Erro ao realizar a consulta: ' + err.message);
      res.status(500).json({ error: 'Erro ao realizar a consulta' });
    } else {
      console.log('Consulta realizada com sucesso');
      res.status(200).json(rows);
    }
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  Connection.query('SELECT * FROM restaurantes WHERE id = ?', id, (err, rows) => {
    if (err) {
      console.error('Erro ao realizar a consulta: ' + err.message);
      res.status(500).json({ error: 'Erro ao realizar a consulta' });
    } else {
      if (rows.length === 0) {
        console.log('Nenhum restaurante encontrado com o ID: ' + id);
        res.status(404).json({ error: 'Restaurante não encontrado' });
      } else {
        console.log('Consulta realizada com sucesso');
        res.status(200).json(rows);
      }
    }
  });
});

router.post('/', (req, res) => {
  const restaurante = req.body;

  // Inserir o restaurante no banco de dados
  Connection.query('INSERT INTO restaurantes SET ?', restaurante, (err, result) => {
    if (err) {
      console.error('Erro ao inserir restaurante: ' + err.message);
      res.status(500).json({ error: 'Erro ao inserir restaurante' });
    } else {
      console.log('Restaurante inserido com sucesso. ID: ' + result.insertId);
      res.status(201).json({ message: 'Restaurante inserido com sucesso' });
    }
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const restaurante = req.body;

  // Verificar se o restaurante com o ID especificado existe antes de atualizar
  Connection.query('SELECT * FROM restaurantes WHERE id = ?', id, (err, rows) => {
    if (err) {
      console.error('Erro ao realizar a consulta: ' + err.message);
      res.status(500).json({ error: 'Erro ao realizar a consulta' });
    } else {
      if (rows.length === 0) {
        console.log('Nenhum restaurante encontrado com o ID: ' + id);
        res.status(404).json({ error: 'Restaurante não encontrado' });
      } else {
        // Restaurante encontrado, realizar a atualização
        Connection.query('UPDATE restaurantes SET ? WHERE id = ?', [restaurante, id], (err, result) => {
          if (err) {
            console.error('Erro ao atualizar restaurante: ' + err.message);
            res.status(500).json({ error: 'Erro ao atualizar restaurante' });
          } else {
            console.log('Restaurante atualizado com sucesso. ID: ' + id);
            res.status(200).json({ message: 'Restaurante atualizado com sucesso' });
          }
        });
      }
    }
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  // Verificar se o restaurante com o ID especificado existe antes de excluir
  Connection.query('SELECT * FROM restaurantes WHERE id = ?', id, (err, rows) => {
    if (err) {
      console.error('Erro ao realizar a consulta: ' + err.message);
      res.status(500).json({ error: 'Erro ao realizar a consulta' });
    } else {
      if (rows.length === 0) {
        console.log('Nenhum restaurante encontrado com o ID: ' + id);
        res.status(404).json({ error: 'Restaurante não encontrado' });
      } else {
        // Restaurante encontrado, realizar a exclusão
        Connection.query('DELETE FROM restaurantes WHERE id = ?', id, (err, result) => {
          if (err) {
            console.error('Erro ao excluir restaurante: ' + err.message);
            res.status(500).json({ error: 'Erro ao excluir restaurante' });
          } else {
            console.log('Restaurante excluído com sucesso. ID: ' + id);
            res.status(200).json({ message: 'Restaurante excluído com sucesso' });
          }
        });
      }
    }
  });
});

export default router;

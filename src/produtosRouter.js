import express from 'express';
import Connection from './db.js';

const router = express.Router();

router.get('/', (req, res) => {
  Connection.query('SELECT * FROM produtos', (err, rows) => {
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

  Connection.query('SELECT * FROM produtos WHERE id = ?', id, (err, rows) => {
    if (err) {
      console.error('Erro ao realizar a consulta: ' + err.message);
      res.status(500).json({ error: 'Erro ao realizar a consulta' });
    } else {
      if (rows.length === 0) {
        console.log('Nenhum produto encontrado com o ID: ' + id);
        res.status(404).json({ error: 'produto não encontrado' });
      } else {
        console.log('Consulta realizada com sucesso');
        res.status(200).json(rows);
      }
    }
  });
});

router.post('/', (req, res) => {
  const produto = req.body;

  // Inserir o produto no banco de dados
  Connection.query('INSERT INTO produtos SET ?', produto, (err, result) => {
    if (err) {
      console.error('Erro ao inserir produto: ' + err.message);
      res.status(500).json({ error: 'Erro ao inserir produto' });
    } else {
      console.log('produto inserido com sucesso. ID: ' + result.insertId);
      res.status(201).json({ message: 'produto inserido com sucesso' });
    }
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const produto = req.body;

  // Verificar se o produto com o ID especificado existe antes de atualizar
  Connection.query('SELECT * FROM produtos WHERE id = ?', id, (err, rows) => {
    if (err) {
      console.error('Erro ao realizar a consulta: ' + err.message);
      res.status(500).json({ error: 'Erro ao realizar a consulta' });
    } else {
      if (rows.length === 0) {
        console.log('Nenhum produto encontrado com o ID: ' + id);
        res.status(404).json({ error: 'produto não encontrado' });
      } else {
        // produto encontrado, realizar a atualização
        Connection.query('UPDATE produtos SET ? WHERE id = ?', [produto, id], (err, result) => {
          if (err) {
            console.error('Erro ao atualizar produto: ' + err.message);
            res.status(500).json({ error: 'Erro ao atualizar produto' });
          } else {
            console.log('produto atualizado com sucesso. ID: ' + id);
            res.status(200).json({ message: 'produto atualizado com sucesso' });
          }
        });
      }
    }
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  // Verificar se o produto com o ID especificado existe antes de excluir
  Connection.query('SELECT * FROM produtos WHERE id = ?', id, (err, rows) => {
    if (err) {
      console.error('Erro ao realizar a consulta: ' + err.message);
      res.status(500).json({ error: 'Erro ao realizar a consulta' });
    } else {
      if (rows.length === 0) {
        console.log('Nenhum produto encontrado com o ID: ' + id);
        res.status(404).json({ error: 'produto não encontrado' });
      } else {
        // produto encontrado, realizar a exclusão
        Connection.query('DELETE FROM produtos WHERE id = ?', id, (err, result) => {
          if (err) {
            console.error('Erro ao excluir produto: ' + err.message);
            res.status(500).json({ error: 'Erro ao excluir produto' });
          } else {
            console.log('produto excluído com sucesso. ID: ' + id);
            res.status(200).json({ message: 'produto excluído com sucesso' });
          }
        });
      }
    }
  });
});

export default router;

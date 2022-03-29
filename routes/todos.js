var express = require('express');
var router = express.Router();

const { getTodo, newTodo, deleteAllTodo, deleteTodo, updateTodo } = require('../controllers/todoController');

router.get('/', getTodo);

router.post('/', newTodo);

router.delete('/:id', deleteTodo);

router.delete('/', deleteAllTodo);

router.patch('/:id', updateTodo);

module.exports = router;
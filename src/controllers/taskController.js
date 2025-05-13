const Task = require('../models/Task');

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar a tarefa', error });
    }
};

const getTasks = async (req, res) => {
    try {
        const task = await Task.findAll();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar tarefas', error });
    }
};

const getTask = async (req, res) => {
    try {
        const task = await task.findByPk(req.params.id);
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: 'Tarefa não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar tarefa', error });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await task.findByPk(req.params.id);
        if (task) {
            await task.update(req.body);
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: 'Tarefa não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar tarefa', error });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            await task.destroy();
            res.status(200).json({ message: 'Tarefa deletada' });
        } else {
            res.status(404).json({ message: 'Tarefa não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar a tarefa', error });
    }
};



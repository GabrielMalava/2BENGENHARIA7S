const List = require('../models/List');
const Task = require('../models/Task');

const createList = async (req, res) => {
    try {
        const list = await List.create(req.body);
        
        res.status(201).json(list);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar lista', error: error.message });
    }
};

const updateList = async (req, res) => {
    try {
        const list = await List.findByPk(req.params.id);
        
        if (!list) {
            return res.status(404).json({ message: 'Lista não encontrada' });
        }
        
        await list.update(req.body);
        
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar lista', error: error.message });
    }
};

const deleteList = async (req, res) => {
    try {
        const list = await List.findByPk(req.params.id);
        
        if (!list) {
            return res.status(404).json({ message: 'Lista não encontrada' });
        }
        
        await list.destroy();
        
        res.status(200).json({ message: 'Lista excluída com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir lista', error: error.message });
    }
};

const moveTask = async (req, res) => {
    try {
        const { taskId, listId, position } = req.body;
        
        const task = await Task.findOne({
            where: {
                id: taskId,
                userId: req.user.id
            }
        });
        
        if (!task) {
            return res.status(404).json({ message: 'Tarefa não encontrada' });
        }
        
        await task.update({
            listId,
            position
        });
        
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao mover tarefa', error: error.message });
    }
};

module.exports = {
    createList,
    updateList,
    deleteList,
    moveTask
};

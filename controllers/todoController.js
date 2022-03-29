const Todo = require('../models/todolist');
const { errorHandle, successHandle } = require('../base/responseHandler');

const TodoController = {
    getTodo: async (req, res) => {
        const result = await Todo.find({});
        successHandle(res, "取得所有 Todo 成功", result);
    },

    newTodo: async (req, res) => {
        try {
            const content = req.body;

            if (content.title !== undefined) {
                const result = await Todo.create(content);
                successHandle(res, "新增 Todo 成功", result);
            } else {
                errorHandle(res, 400, 40002);
            }

        } catch (error) {
            errorHandle(res, 400, 40001);
        }
    },

    deleteAllTodo: async (req, res) => {
        if (req.originalUrl == "/todos/") {
            errorHandle(res, 400, 40003);
        } else {
            const result = await Todo.deleteMany({});
            successHandle(res, "刪除全部 Todo 成功", result);
        }
    },

    deleteTodo: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await Todo.findByIdAndDelete(id);

            if (!result) errorHandle(res, 400, 40003);
            else successHandle(res, "刪除 Todo 成功", result);

        } catch (error) {
            errorHandle(res, 400, 40003);
        }
    },

    updateTodo: async (req, res) => {
        try {
            const id = req.params.id;
            const content = req.body;

            if (content.title !== undefined) {
                const result = await Todo.findByIdAndUpdate(id, content);

                if (!result) errorHandle(res, 400, 40003);
                else successHandle(res, "編輯 Todo 成功", result);

            } else {
                errorHandle(res, 400, 40002);
            }

        } catch (error) {
            errorHandle(res, 400, 40003);
        }
    }
}

module.exports = TodoController;
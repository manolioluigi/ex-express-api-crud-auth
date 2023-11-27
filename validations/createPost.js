const { body } = require('express-validator');

const createPostValidation = [
    body('title').notEmpty(),
    body('image').optional(),
    body('content').notEmpty(),
    body('published').isBoolean(),
    body('categoryId').optional().isInt(),
    body('tagId').optional().isInt(),
];

module.exports = createPostValidation;

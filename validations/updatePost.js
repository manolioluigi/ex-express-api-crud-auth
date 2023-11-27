const { body } = require('express-validator');

const updatePostValidation = [
    body('title').optional().notEmpty(),
    body('image').optional(),
    body('content').optional().notEmpty(),
    body('published').optional().isBoolean(),
    body('categoryId').optional().isInt(),
    body('tagId').optional().isInt(),
];

module.exports = updatePostValidation;

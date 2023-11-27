// postsRouter.js
const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const { validationResult } = require('express-validator');
const createPostValidation = require('../validations/createPost');
const updatePostValidation = require('../validations/updatePost');

// rotte
router.post('/posts', createPostValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    postsController.createPost(req, res, next);
});
router.get('/posts/:slug', postsController.getPostBySlug);
router.get('/posts', postsController.getAllPosts);
router.put('/posts/:slug', updatePostValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    postsController.updatePost(req, res, next);
});
router.delete('/posts/:slug', postsController.deletePost);

module.exports = router;

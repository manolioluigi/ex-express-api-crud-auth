const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const { validationResult } = require('express-validator');
const createPostValidation = require('../validations/createPost');
const updatePostValidation = require('../validations/updatePost');
const authMiddleware = require('../middlewares/authMiddleware');
const postOwnershipMiddleware = require('../middlewares/postOwnershipMiddleware');

// rotte
router.post('/posts', authMiddleware, createPostValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    postsController.createPost(req, res, next);
});
router.get('/posts/:slug', postsController.getPostBySlug);
router.get('/posts', postsController.getAllPosts);
router.put('/posts/:slug', authMiddleware, postOwnershipMiddleware, updatePostValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    postsController.updatePost(req, res, next);
});
router.delete('/posts/:slug', authMiddleware, postOwnershipMiddleware, postsController.deletePost);

module.exports = router;

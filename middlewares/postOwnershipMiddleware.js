const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function postOwnershipMiddleware(req, res, next) {
    try {
        const { slug } = req.params;
        const post = await prisma.post.findUnique({
            where: {
                slug,
            },
        });

        if (!post) {
            return res.status(404).json({ success: false, error: 'Post non trovato' });
        }

        if (post.userId !== req.userId) {
            return res.status(403).json({ success: false, error: 'Accesso non consentito' });
        }

        next();
    } catch (error) {
        console.error('Errore durante la verifica della proprietà del post:', error);
        res.status(500).json({ success: false, error: 'Errore durante la verifica della proprietà del post' });
    }
}

module.exports = postOwnershipMiddleware;

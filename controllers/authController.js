const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function register(req, res) {
    try {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        console.error('Errore durante la registrazione:', error);
        res.status(500).json({ success: false, error: 'Errore durante la registrazione' });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return res.status(401).json({ success: false, error: 'Credenziali non valide' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ success: false, error: 'Credenziali non valide' });
        }

        // token JWT
        try {
            const secretKey = process.env.JWT_SECRET;
            const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
            res.status(200).json({ success: true, token });
        } catch (error) {
            console.error('Errore durante la generazione del token JWT:', error);
        }

    } catch (error) {
        console.error('Errore durante il login:', error);
        res.status(500).json({ success: false, error: 'Errore durante il login' });
    }
}

module.exports = {
    register,
    login,
};

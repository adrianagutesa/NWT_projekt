import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secret';

const handler = async (req, res) => {
    
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
    }
    
    if (!req.body.username || !req.body.password) {
        res.status(400).json({ message: 'Bad request' });
    }
    
    const uri = req.body.username + " " + req.body.password;
    const resp = await fetch(`http://localhost:3000/api/${uri}`);
    const user = await resp.json();
    
    if (!user[0].password) {
        res.status(401).json({ message: 'Unauthorized' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
        expiresIn: '1h',
    });

    res.status(200).json({ token });
};

export default handler;
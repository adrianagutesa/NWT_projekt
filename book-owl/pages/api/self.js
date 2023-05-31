import jwt from 'jsonwebtoken';
import * as users from '../../lib/userByID';

const JWT_SECRET = 'secret';

const handler = async(req, res) => {
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method not allowed' });
    }
    try {
        if (!req.headers.authorization) {
            res.status(403).json({ message: 'You must be logged in' });
        }
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);

        const uri = decoded.id + " " + 1;
        const resp = await fetch(`http://localhost:3000/api/${uri}`);
        const currentuser = await resp.json();

        const {password, ...user} = currentuser;
            
        if (!user) {
            res.status(403).json({ message: 'Your account might be deleted' });
        }

        res.status(200).json({ user });
    } catch {
        res.status(403).json({ message: 'Invalid token' });
    }
};

export default handler;
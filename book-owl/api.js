const api = {
    login: async (username, password) => {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (res.status !== 200) {
            throw new Error('Login failed');
        }

        return res.json();
    },
    self: async (token) => {
        if (!token) {
            return null;
        }
        const res = await fetch('/api/self', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.status !== 200) {
            throw new Error('Request failed');
        }

        return res.json();
    },
};

export default api;
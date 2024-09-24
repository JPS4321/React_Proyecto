import { useState, useEffect } from 'react';
import { getUserById } from '../../../../api/services/userService.js';

const useUser = (userId) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const data = await getUserById(userId);
                setUser(data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching user data');
                setLoading(false);
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    return { user, loading, error };
};

export default useUser;

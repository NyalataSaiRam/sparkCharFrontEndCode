import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
    const [ loading, setLoading ] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (username, password) => {

        if (!username || !password) {
            toast.error("please fill in all the fields");
            return;
        }

        if (password.length < 6) {
            toast.error("Invalid username or password");
            return;
        }

        setLoading(true);
        try {



            const res = await fetch('/api/auth/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem('chat-user', JSON.stringify(data));
            setAuthUser(data);


        } catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export default useLogin;

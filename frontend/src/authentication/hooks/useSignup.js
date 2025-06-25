import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const signup = async (firstName, lastName, email, address, bod, gender, password, profilePicUrl) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, email, address, bod, gender, password, profilePicUrl }),
        });

        console.log("Signup response:", response);

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setIsLoading(false);
        } else {
            setIsLoading(false);
            navigate('/verify', { state: { email } });
        }
    };

    return { signup, isLoading, error };
};

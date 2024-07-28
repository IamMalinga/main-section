import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "../axios";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Initialized to false
    const { dispatch } = useAuthContext();

    const signup = async (firstName, lastName, email, bod, address, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post("/user/signup", {
                firstName, lastName, email, bod, address, password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                const json = response.data; // Axios automatically parses JSON

                localStorage.setItem('user', JSON.stringify(json));
                dispatch({ type: 'LOGIN', payload: json });

                setIsLoading(false);
            } else {
                setIsLoading(false);
                setError("Signup failed. Please try again.");
            }
        } catch (error) {
            setIsLoading(false);
            setError(error.message || "Signup failed. Please try again.");
        }
    };

    return { signup, isLoading, error }; // Return an object with signup, isLoading, and error
};

import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      // Login request
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        if (json.redirectTo) {
          navigate(json.redirectTo, { state: { email, expired: json.expired } });
        } else {
          setError(json.error);
        }
      } else {
        localStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: "LOGIN", payload: json });

        try {
          const activeTripResponse = await fetch("/api/trips/active", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${json.token}`,
            },
          });

          const activeTrip = await activeTripResponse.json();

          if (activeTripResponse.ok) {
            localStorage.setItem("trip", JSON.stringify(activeTrip));
          }
        } catch (activeTripError) {
          console.error("Failed to fetch active trip:", activeTripError.message);
        }

        // Navigate to home
        navigate("/");
      }
    } catch (err) {
      setError("An error occurred while logging in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { login, error, isLoading };
};

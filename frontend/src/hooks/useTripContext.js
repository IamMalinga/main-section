import { useContext } from 'react';
import { TripContext } from '../context/TripContext';

export const useTripContext = () => {
    const context = useContext(TripContext);

    if (!context) {
        throw new Error('useTripContext must be used within a TripContextProvider');
    }

    return context;
};


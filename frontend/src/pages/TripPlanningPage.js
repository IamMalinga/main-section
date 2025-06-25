import React from 'react';
import TripPlanner from '../components/tripPlan/TripPlanner';
import DestinationStep from '../components/tripPlan/DestinationStep';
import PeopleStep from '../components/tripPlan/PeopleStep';
import DaysStep from '../components/tripPlan/DaysStep';
import BudgetStep from '../components/tripPlan/BudgetStep';
import { useNavigate } from 'react-router-dom';

const stepsConfig = [
    {
        label: 'Add Destinations',
        component: (tripData, updateTripData) => <DestinationStep tripData={tripData} updateTripData={updateTripData} />
    },
    {
        label: 'Number of People & Invite Friends',
        component: (tripData, updateTripData) => <PeopleStep tripData={tripData} updateTripData={updateTripData} />
    },
    {
        label: 'Number of Days',
        component: (tripData, updateTripData) => <DaysStep tripData={tripData} updateTripData={updateTripData} />
    },
    {
        label: 'Budget',
        component: (tripData, updateTripData) => <BudgetStep tripData={tripData} updateTripData={updateTripData} />
    },
];

const TripPlanningPage = () => {
    const navigate = useNavigate();

    const handleFinish = () => {
        navigate('/dashboard');
    };

    return <TripPlanner stepsConfig={stepsConfig} onFinish={handleFinish} />;
};

export default TripPlanningPage;

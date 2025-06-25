import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./authentication/component/Login";
import SignUp from "./authentication/component/Signup";
import TripPlanningPage from "./pages/TripPlanningPage";
import VerifyEmail from "./authentication/component/VerifyEmail";
import Services from "./pages/Services";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./authentication/component/ForgotPassword";
import ResetPassword from "./authentication/component/ResetPassword";


// Layouts
import RootLayout from "./layouts/RootLayout";
import LostItemsLayout from "./services/findLostItems/LostItemsLayout";
import WeatherLayout from './services/weather/WeatherLayout';
import LodgingLayout from "./services/lodging/pages/list/List";
import HotelHome from "./services/hotels/pages/home/Home";
import Hotel from "./services/hotel/HotelDetailsPage";
import HotelBookingPage from './services/hotel/HotelBookingPage'
import HotelDetailsPage from './services/hotel-test/HotelDetailsPage'
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/settings/Profile";
import About from "./pages/About"
import Contact from './pages/Contact'
import NotFound from "./pages/NotFound";
import Navigation from "./pages/Navigation";
import OpenChatLayout from "./services/open-chat/layouts/OpenChatLayout";
import VehicleRentLayout from "./services/vehicle-rent/layouts/VehicleRentLayout";
import VehicleRentalLanding from "./services/vehicle-rent/pages/VehicleRentalLanding";
import TravelGuidePage from "./services/travelGuiders/TravelGuidePage";
import TravelGuideList from "./services/travelGuiders/TravelGuideList";
import EventReminder from './services/eventReminder-test/EventReminder';
import FeedbackForm from "./components/settings/FeedbackForm ";
import Supplier from "./pages/Supplier";
import Bucket from "./pages/Bucket";
import PostPage from "./services/open-chat/components/PostPage";
import AddPostModel from "./services/open-chat/components/AddPostModel";
import TravelGuidersSupplier from "./services/travelGuiders/TravelGuidersSupplier";
import TravelGuideBookingsList from "./services/travelGuiders/TravelGuideBookingList";
import MyTrip from "./pages/MyTrip";
import HotelList from "./services/hotel/HotelList";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/navigation" element={<Navigation />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/profile/feedback" element={<FeedbackForm />} />
        <Route path="/mytrip" element={<MyTrip />} />


        <Route path="/supplier" element={<Supplier />} />
        <Route path="/bucket" element={<Bucket />} />



        <Route path="/special-events" element={<EventReminder />} />


        <Route path="/trip-planner" element={
            <PrivateRoute>
                <TripPlanningPage />
            </PrivateRoute>
        } />

        <Route path="/hotels" element={<HotelList />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="book-hotel/:id" element={<HotelBookingPage />} />
        <Route path="/posts/:postId" element={<PostPage />} />


        <Route path="/services" element={<Services />}>
            <Route path="lost-items" element={<LostItemsLayout />} />
            <Route path="weather" element={<WeatherLayout />} />
            <Route path="open-chat" element={<OpenChatLayout />} />
            <Route path="open-chat/addpost" element={<AddPostModel />} />
            <Route path="vehicle-hire" element={<VehicleRentalLanding />} />
            <Route path='car-rental' element={<VehicleRentLayout />} />
            <Route path="lodging" element={<LodgingLayout />} />
            <Route path="lodging/:id" element={<Hotel />} />
            <Route path="travel-guiders" element={<TravelGuideList />} />
            <Route path="supplier/travel-guiders" element={<TravelGuidersSupplier />} />
            <Route path="travel-guide-bookings" element={<TravelGuideBookingsList />} />
            <Route path="travel-guiders/:id" element={<TravelGuidePage />} />
            <Route path="special-events" element={<EventReminder />} />
            <Route path="hotel-booking" element={<HotelList />} />
            <Route path="hotels/:id" element={<HotelDetailsPage />} />
            
        </Route>
        

        <Route path="/dashboard" element={
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        } />
    </Route>
));

const App = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default App;

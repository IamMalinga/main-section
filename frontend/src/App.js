import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";


//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import TripPlanner from "./pages/TripPlanner";


//Layouts
import RootLayout from "./layouts/RootLayout";
import LostItemsLayout from "./services/findLostItems/LostItemsLayout";
import WeatherServiceLayout from "./services/weatherData/WeatherServiceLayout";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={ <RootLayout />}>
    <Route index element= { <Home /> } />
    <Route path="/login" element={ <Login /> }/>
    <Route path="/trip-planner" element={ <TripPlanner /> }/>
    <Route path="/lost-items" element={ <LostItemsLayout /> } />
    <Route path="/weather" element={<WeatherServiceLayout />} >
    <Route path="/weatherDetails" element={ <WeatherDetails /> } />
    </Route>
  </Route>
))

const App = () => {
  return(
    <RouterProvider router={router} />
  )
}

export default App;
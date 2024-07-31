const WeatherDetail = require('../models/WeatherDetails');

const getWeather = async (req, res) => {
  const weatherDetails = await weatherDetails.find();
  res.json(weatherDetails);
};

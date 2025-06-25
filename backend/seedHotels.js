// seedHotels.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hotel = require('./models/services/hotel/Hotel');

dotenv.config(); // Load environment variables from .env file

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Database connected');
}).catch((error) => {
  console.log('Error connecting to database:', error);
});

const hotels = [
  {
    name: "Cinnamon Grand Colombo",
    type: "Hotel",
    city: "Colombo",
    address: "77 Galle Road, Colombo , Sri Lanka",
    distance: "500m from center",
    photos: ["/assets/hotelImage1.jpg", "/assets/hotelImage1.jpg"],
    title: "Luxury Hotel in Colombo",
    desc: "Cinnamon Grand Colombo offers a tranquil escape with luxury amenities and top-notch service.",
    rating: 4.5,
    stars: 5,
    rooms: ["Suite", "Deluxe", "Standard"],
    cheapestPrice: 180,
    featured: true,
  },
  {
    name: "Heritance Kandalama",
    type: "Hotel",
    city: "Dambulla",
    address: "Kandalama, Dambulla, Sri Lanka",
    distance: "3km from Dambulla Cave Temple",
    photos: ["/assets/hotelImage2.jpg", "/assets/hotelImage2.jpg"],
    title: "Eco-Friendly Resort in Dambulla",
    desc: "Heritance Kandalama is an eco-friendly resort overlooking the picturesque Kandalama Lake.",
    rating: 4.7,
    stars: 5,
    rooms: ["Suite", "Lake View", "Standard"],
    cheapestPrice: 150,
    featured: true,
  },
  {
    name: "Jetwing Blue",
    type: "Hotel",
    city: "Negombo",
    address: "Ethukala, Negombo, Sri Lanka",
    distance: "2km from Negombo Beach",
    photos: ["/assets/hotelImage3.jpg", "/assets/hotelImag3.jpg"],
    title: "Beachfront Hotel in Negombo",
    desc: "Jetwing Blue offers a serene beachfront experience with modern amenities and stunning views.",
    rating: 4.3,
    stars: 4,
    rooms: ["Suite", "Ocean View", "Standard"],
    cheapestPrice: 120,
    featured: false,
  },
  {
    name: "Amaya Lake",
    type: "Resort",
    city: "Sigiriya",
    address: "Amaya Lake, Sigiriya, Sri Lanka",
    distance: "10km from Sigiriya Rock",
    photos: ["/assets/hotelImage4.jpg", "/assets/hotelImage4.jpg"],
    title: "Scenic Resort in Sigiriya",
    desc: "Amaya Lake is a beautiful resort set in a lush environment, ideal for a relaxing getaway.",
    rating: 4.8,
    stars: 5,
    rooms: ["Villa", "Cottage", "Standard"],
    cheapestPrice: 140,
    featured: true,
  },
    {
    name: "Shangri-La Colombo",
    type: "Hotel",
    city: "Colombo",
    address: "Shangri-La Hotel, Colombo, Sri Lanka",
    distance: "1km from Galle Face Green",
    photos: ["/assets/hotelImage5.jpg", "/assets/hotelImage5.jpg"],
    title: "Luxury Hotel in the Heart of Colombo",
    desc: "Shangri-La Colombo offers a blend of modern luxury and world-class amenities in the city center.",
    rating: 4.9,
    stars: 5,
    rooms: ["Executive Suite", "Deluxe Room", "Standard Room"],
    cheapestPrice: 250,
    featured: true,
  },
    {
    name: "Anantara Haven Resort",
    type: "Resort",
    city: "Tangalle",
    address: "Anantara Peace Haven, Tangalle, Sri Lanka",
    distance: "2km from Tangalle Beach",
    photos: ["/assets/hotelImage6.jpg", "/assets/hotelImage6.jpg"],
    title: "Serene Beachfront Resort in Tangalle",
    desc: "Anantara Peace Haven is a luxurious retreat with stunning ocean views and exceptional service.",
    rating: 4.9,
    stars: 5,
    rooms: ["Pool Villa", "Deluxe Room", "Beachfront Suite"],
    cheapestPrice: 300,
    featured: true,
  },
    {
    name: "Wild Coast Tented Lodge",
    type: "Safari Lodge",
    city: "Yala",
    address: "Wild Coast Tented Lodge, Yala, Sri Lanka",
    distance: "5km from Yala National Park",
    photos: ["/assets/hotelImage7.jpg", "/assets/hotelImage7.jpg"],
    title: "Luxury Safari Lodge in Yala",
    desc: "Wild Coast Tented Lodge blends luxury with nature, offering an unforgettable safari experience.",
    rating: 4.8,
    stars: 5,
    rooms: ["Cocoon Suite", "Family Cocoon", "Tent"],
    cheapestPrice: 400,
    featured: true,
  },
    {
    name: "EKHO Surf",
    type: "Hotel",
    city: "Bentota",
    address: "EKHO Surf, Bentota, Sri Lanka",
    distance: "100m from Bentota Beach",
    photos: ["/assets/hotelImage8.jpg", "/assets/hotelImage8.jpg"],
    title: "Beachfront Getaway in Bentota",
    desc: "EKHO Surf is the perfect spot for a tropical beach vacation with comfortable accommodations.",
    rating: 4.2,
    stars: 4,
    rooms: ["Ocean View Room", "Deluxe Room", "Standard Room"],
    cheapestPrice: 120,
    featured: false,
  }
];

const seedDB = async () => {
  try {
    await Hotel.deleteMany(); // Deletes all existing documents in the 'hotels' collection
    await Hotel.insertMany(hotels); // Inserts the sample hotels data
    console.log('Hotels seeded successfully');
    mongoose.connection.close(); // Closes the database connection
  } catch (error) {
    console.error('Error seeding hotels:', error);
    mongoose.connection.close(); // Closes the database connection
  }
};

seedDB();
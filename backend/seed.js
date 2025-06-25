const mongoose = require("mongoose");
const Post = require("./models/services/chat/Post"); // Update the path to your Post model if needed

const { ObjectId } = mongoose.Types; // Use Mongoose's ObjectId

const seedPosts = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://group_11:12345mdb@cluster0.ihxkq.mongodb.net/travelPlanner",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    const posts = [
      {
        content: "Exploring the serene beaches of Matara. Absolutely breathtaking!",
        image: "/images/matara-beach.jpg",
        location: { name: "Matara, Sri Lanka", lat: 5.9485, lng: 80.5353 },
        userId: new ObjectId("6788a1493a8acfe87a6b9833"),
        likes: [new ObjectId("678a11242baf25c9ec97665b"), new ObjectId("678931311d7bf33acce8d68e")],
      },
      {
        content: "The colonial architecture of Galle Fort is so fascinating!",
        image: "/images/galle-fort.jpg",
        location: { name: "Galle, Sri Lanka", lat: 6.0535, lng: 80.2210 },
        userId: new ObjectId("6788a1493a8acfe87a6b9833"),
        likes: [new ObjectId("678931311d7bf33acce8d68e")],
      },
      {
        content: "Enjoying the peaceful tea plantations of Nuwara Eliya.",
        image: "/images/nuwara-eliya.jpg",
        location: { name: "Nuwara Eliya, Sri Lanka", lat: 6.9497, lng: 80.7891 },
        userId: new ObjectId("6788a1493a8acfe87a6b9833"),
        likes: [],
      },
      {
        content: "The waves in Arugam Bay are perfect for surfing!",
        image: "/images/arugam-bay.jpg",
        location: { name: "Arugam Bay, Sri Lanka", lat: 6.8428, lng: 81.8363 },
        userId: new ObjectId("6788a1493a8acfe87a6b9833"),
        likes: [new ObjectId("678931311d7bf33acce8d68e")],
      },
      {
        content: "Sigiriya Rock Fortress is a must-visit! The view is spectacular.",
        image: "/images/sigiriya.jpg",
        location: { name: "Sigiriya, Sri Lanka", lat: 7.9569, lng: 80.7603 },
        userId: new ObjectId("6788a1493a8acfe87a6b9833"),
        likes: [new ObjectId("678a11242baf25c9ec97665b"), new ObjectId("678931311d7bf33acce8d68e")],
      },
      {
        content: "Hiking up Ella Rock is challenging but totally worth it.",
        image: "/images/ella-rock.jpg",
        location: { name: "Ella, Sri Lanka", lat: 6.8667, lng: 81.0466 },
        userId: new ObjectId("6788a1493a8acfe87a6b9833"),
        likes: [new ObjectId("6788a1493a8acfe87a6b9833")],
      },
      {
        content: "The cultural vibes of Kandy are so rich and authentic.",
        image: "/images/kandy.jpg",
        location: { name: "Kandy, Sri Lanka", lat: 7.2906, lng: 80.6337 },
        userId: new ObjectId("6788a1493a8acfe87a6b9833"),
        likes: [new ObjectId("6788a1493a8acfe87a6b9833")],
      },
      {
        content: "Visiting the sacred Ruwanwelisaya in Anuradhapura.",
        image: "/images/anuradhapura.jpg",
        location: { name: "Anuradhapura, Sri Lanka", lat: 8.3114, lng: 80.4037 },
        userId: new ObjectId("6788a1493a8acfe87a6b9833"),
        likes: [new ObjectId("6788a1493a8acfe87a6b9833"), new ObjectId("678a11242baf25c9ec97665b")],
      },
      {
        content: "Admiring the beautiful biodiversity of Yala National Park.",
        image: "/images/yala.jpg",
        location: { name: "Yala, Sri Lanka", lat: 6.3764, lng: 81.5086 },
        userId: new ObjectId("6788a1493a8acfe87a6b9833"),
        likes: [new ObjectId("6788a1493a8acfe87a6b9833")],
      },
      {
        content: "The calm beaches of Trincomalee are perfect for relaxing.",
        image: "/images/trincomalee.jpg",
        location: { name: "Trincomalee, Sri Lanka", lat: 8.5705, lng: 81.2333 },
        userId: new ObjectId("6788a1493a8acfe87a6b9833"),
        likes: [],
      },
    ];

    await Post.deleteMany({});
    await Post.insertMany(posts);
    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedPosts();

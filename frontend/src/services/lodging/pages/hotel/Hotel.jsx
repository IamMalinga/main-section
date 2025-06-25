import "./hotel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { useAuthContext } from "../../../../authentication/hooks/useAuthContext";
import Reserve from "../../components/reserve/Reserve";
import { Box, Button, Typography, IconButton, Dialog } from "@mui/material";

const mockData = {
  _id: "1",
  name: "Grand Hotel",
  type: "Hotel",
  city: "Krakow",
  address: "123 Main Street",
  distance: "500",
  photos: [
    "/assets/accommodation1.jpg",
    "/assets/accommodation1.jpg",
    "/assets/accommodation1.jpg"
  ],
  title: "Luxury Stay",
  desc: "A luxurious stay in the heart of the city.",
  rating: 4.5,
  rooms: ["Room1", "Room2", "Room3"],
  cheapestPrice: 150,
  featured: true
};

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // Mock data as if it was fetched
  const { data, loading, error } = { data: mockData, loading: false, error: null };
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(new Date(), new Date());

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <Box sx={{ marginTop: 10 }}>
    <div>
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <IconButton className="close" onClick={() => setOpen(false)}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </IconButton>
              <IconButton className="arrow" onClick={() => handleMove("l")}>
                <FontAwesomeIcon icon={faCircleArrowLeft} />
              </IconButton>
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <IconButton className="arrow" onClick={() => handleMove("r")}>
                <FontAwesomeIcon icon={faCircleArrowRight} />
              </IconButton>
            </div>
          )}
          <div className="hotelWrapper">
            <Button variant="contained" className="bookNow" onClick={handleClick}>
              Reserve or Book Now!
            </Button>
            <Typography variant="h4" className="hotelTitle">
              {data.name}
            </Typography>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <Typography variant="body2" className="hotelDistance">
              Excellent location – {data.distance}m from center
            </Typography>
            <Typography variant="body2" className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </Typography>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <Typography variant="h5" className="hotelTitle">
                  {data.title}
                </Typography>
                <Typography variant="body1" className="hotelDesc">
                  {data.desc}
                </Typography>
              </div>
              <div className="hotelDetailsPrice">
                <Typography variant="h6">
                  Perfect for a {days}-night stay!
                </Typography>
                <Typography variant="body2">
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </Typography>
                <Typography variant="h4">
                  <b>${days * data.cheapestPrice * options.room}</b> ({days}{" "}
                  nights)
                </Typography>
                <Button variant="contained" onClick={handleClick}>
                  Reserve or Book Now!
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <Reserve setOpen={setOpenModal} hotelId={id} />
      </Dialog>
    </div>
    </Box>
  );
};

export default Hotel;

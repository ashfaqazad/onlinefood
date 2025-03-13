// import React from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay  } from "swiper/modules";

const images = [
    "https://images.unsplash.com/photo-1513104890138-7c749659a591", // Pizza
    "https://images.unsplash.com/photo-1551782450-a2132b4ba21d", // Burger
    "https://images.unsplash.com/photo-1576867757603-05b134ebc379", // Chicken Wings
  ];

const ImageSlider = () => {
  return (
    <Box sx={{ width: "100%", mx: "auto", mt: 0, overflow: "auto" }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}

      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              style={{
                width: "100%",
                height: "90vh",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ImageSlider;

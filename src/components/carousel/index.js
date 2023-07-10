import React from 'react';
import { connect } from 'react-redux';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import "swiper/css";
import "swiper/css/navigation";
import './styles.css';

SwiperCore.use([Navigation]);

const Carousel = () => {
  return (
    <Swiper
      navigation
      spaceBetween={50}
      slidesPerView={1}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      <SwiperSlide>Slide 5</SwiperSlide>
      <SwiperSlide>Slide 6</SwiperSlide>
      <SwiperSlide>Slide 7</SwiperSlide>
      <SwiperSlide>Slide 8</SwiperSlide>
      <SwiperSlide>Slide 9</SwiperSlide>
    </Swiper>
  );
};

const mapStateToProps = ({ bot }) => ({
  // Add required redux state here
});

const mapDispatchToProps = dispatch => ({
 // Connect required dispatch actions here
});

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
import React from 'react';
import { connect } from 'react-redux';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import { SliderStates } from './constants.js';
import { setCarouselState } from '../../redux/actions';
import store from '../../redux/store';
import "swiper/css";
import "swiper/css/navigation";
import './styles.css';

SwiperCore.use([Navigation]);

const Carousel = () => {
  const handleSlideChange = (swiper) => {
    
    //store.dispatch(setRecordButtonState(RecordButtonStates.READY_TO_RECORD));
    switch (swiper.realIndex) {
      case 0:
        store.dispatch(setCarouselState(SliderStates.BOT_1));
        break;
      case 1:
        store.dispatch(setCarouselState(SliderStates.BOT_2));
        break;
      case 2:
        store.dispatch(setCarouselState(SliderStates.BOT_3));
        break;
      case 3:
        store.dispatch(setCarouselState(SliderStates.BOT_4));
        break;
      case 4:
        store.dispatch(setCarouselState(SliderStates.BOT_5));
        break;
      case 5:
        store.dispatch(setCarouselState(SliderStates.BOT_6));
        break;
      case 6:
        store.dispatch(setCarouselState(SliderStates.BOT_7));
        break;
      case 7:
        store.dispatch(setCarouselState(SliderStates.BOT_8));
        break;
      case 8:
        store.dispatch(setCarouselState(SliderStates.BOT_9));
        break;
      default:
        store.dispatch(setCarouselState(SliderStates.BOT_1));
        break;
    }
    console.log(store.getState().bot.carouselState);
  };

  return (
    <Swiper
      navigation
      spaceBetween={50}
      slidesPerView={1}
      onSwiper={handleSlideChange}
      onSlideChange={handleSlideChange}
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
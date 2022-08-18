import React,{Fragment,useEffect} from 'react'
import { Navigation, Pagination, Scrollbar, A11y, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Img from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Carousal() {
 

     
  return (

 
   <div id="banner_Slide">
      
    <Swiper 
    modules={[Navigation, Pagination, Scrollbar, A11y]}
    spaceBetween={100}
    slidesPerView={1}
    navigation
    pagination={{ clickable: true }}
    loop={ true}
 
  >
    <SwiperSlide ><img src="/test/1.webp" /></SwiperSlide>
    <SwiperSlide><img src="/test/2.jpg" /></SwiperSlide>
    <SwiperSlide><img src="/test/3.jpg" /></SwiperSlide>

    </Swiper>
</div>
  )
}

export default Carousal
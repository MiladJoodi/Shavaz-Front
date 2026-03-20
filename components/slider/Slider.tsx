"use client"

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { shimmer, toBase64 } from "@/utils/shimmer";

const sliderItems = [
    {image: "/aH1VurMyxmAzejiRMWv8kPTY3rOG985YdFu8b2tP.webp"},
    {image: "/Q2Aap9zRdRaoM8jHRuDooBqsFdgQLFdddwlkDVIl.webp"},
    {image: "/Vd8dzPKbkMYK8e5SXGadArtCS41FCVatWGgFRMD7.webp"},
    {image: "/slider1.jpg"},
]

const Slider = () => {
    return (
        <>
      <Swiper 
      slidesPerView={1}
      loop={true}
      pagination={{ clickable: true}}
      modules={[Pagination,Autoplay]}
      className="mySwiper mt-6"
      autoplay={{ delay: 2000}}
      >
        {sliderItems.map((slide, index)=>
        <SwiperSlide key={index}>
            <Image
            src={slide.image}
            placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            width={1500}
            height={500}
            alt='slider1'
            priority
            className='object-contain'
            />
        </SwiperSlide>
        )}
        

      </Swiper>
    </>
    );
}

export default Slider;
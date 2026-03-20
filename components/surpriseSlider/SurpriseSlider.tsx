"use client"

import React from "react";
import Container from '../container/container'
import Link from 'next/link'
import Image from 'next/image'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ChevronLeft } from "lucide-react";
import persianNumber from "@/utils/persianNumber"
import { shimmer, toBase64 } from "@/utils/shimmer";


const sliderData = [
    {
        image: "/surprize/01.webp",
        price: 200000,
        oldPrice: 250000,
        percent: 20
    },
    {
        image: "/surprize/02.webp",
        price: 367880,
        oldPrice: 459850,
        percent: 20
    },
    {
        image: "/surprize/03.webp",
        price: 7200,
        oldPrice: 12000,
        percent: 40
    },
    {
        image: "/surprize/04.webp",
        price: 210000,
        oldPrice: 262500,
        percent: 20
    },
    {
        image: "/surprize/05.webp",
        price: 68900,
        oldPrice: 79200,
        percent: 13
    },
    {
        image: "/surprize/06.webp",
        price: 191800,
        oldPrice: 319700,
        percent: 13
    },
    {
        image: "/surprize/07.webp",
        price: 55200,
        oldPrice: 69000,
        percent: 40
    },
    {
        image: "/surprize/08.webp",
        price: 99000,
        oldPrice: 107100,
        percent: 20
    },
    {
        image: "/surprize/09.webp",
        price: 99000,
        oldPrice: 137000,
        percent: 8
    },
]


const SurpriseSlider = () => {
    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        pauseOnHover: true
    };
    return (
        <Container className="mt-5 overflow-hidden">
            <div className='embla-background flex gap-8 py-7 px-8 rounded-lg h-[320px]'>
                <div className='flex flex-1 flex-col justify-center items-center gap-4 '>
                    <Image
                        src="/prize.webp"
                        alt='prize'
                        width={200}
                        height={200}
                        className="w-[110px]"
                    />
                    <span className="font_lalezar text-white text-xl flex gap-2">سورپرایز روز</span>
                    <Link href="/products" className="text-white py-1 px-3 border border-white rounded-md flex items-center gap-2">
                        مشاهده همه
                        <ChevronLeft size={16} />
                    </Link>
                </div>

                <div className='w-[85%] slider-container p-4'>
                    <Slider {...settings}>
                        {sliderData.map((item, index)=> (
                            <div key={index} className="!flex flex-col items-center gap-12 bg-white rounded-lg px-2 py-6">
                            <Image
                                src={item.image}
                                placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                                alt='prize'
                                width={200}
                                height={200}
                                className="w-[110px]"
                            />
                            <div className="flex flex-col w-full gap-1">
                                <div className="flex justify-between ">
                                    <div className="flex items-center gap-1  text-[#d72685]">
                                        <span className="text-sm">تومان</span>
                                        <span className="text-lg">{persianNumber(item.price)}</span>
                                    </div>

                                    <span className="text-xs bg-[#d72685] text-white rounded-md flex items-center px-1">
                                        {persianNumber(item.percent)}%
                                    </span>
                                </div>
                                <span className="flex items-center gap-1 text-gray-400 self-start text-xs font-light line-through">
                                    <span>تومان</span>
                                    <span className="text-md">{persianNumber(item.oldPrice)}</span>
                                </span>
                            </div>
                        </div>
                        ))}

                        
                        
                    </Slider>
                </div>
            </div>
        </Container>
    );
}

export default SurpriseSlider;
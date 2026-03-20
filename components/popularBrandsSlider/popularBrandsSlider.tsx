"use client"

import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Container from "../container/container";
import Link from "next/link";
import { shimmer, toBase64 } from "@/utils/shimmer";

const popularBrands = [
    {image:"/brands/01.webp"},
    {image:"/brands/02.webp"},
    {image:"/brands/03.webp"},
    {image:"/brands/04.webp"},
    {image:"/brands/05.webp"},
    {image:"/brands/06.webp"},
    {image:"/brands/07.webp"},
]


const PopularBrandsSlider = () => {
    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
    };

    return (
        <div className="flex items-center justify-center">
            <Container>
                <div className="slider-container overflow-x-hidden ">
                    <Slider {...settings} className="!flex items-center">
                        {popularBrands.map((item, index)=>(
                            <Link href="/" className="!flex !items-center justify-center cursor-pointer mx-6" key={index}>
                            <Image
                                src={item.image}
                                placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                                alt='prize'
                                width={150}
                                height={150}
                                className="w-[100px] rounded-3xl"
                            />
                        </Link>
                        ))}
                        
                       

                    </Slider>
                </div>
            </Container>
        </div>
    );
}

export default PopularBrandsSlider;
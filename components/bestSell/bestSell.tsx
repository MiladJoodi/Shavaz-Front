"use client"

import Container from "../container/container";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import persianNumber from "@/utils/persianNumber";
import { shimmer, toBase64 } from "@/utils/shimmer";
import { products } from "@/data/products";


const BestSell = () => {
    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 5,
        autoplay: true,
        autoplaySpeed: 2000,
        swipeToSlide: true,
    };

    const bestSellProducts = products.slice(0, 6);

    return (
        <div className="mt-10">
            <Container>
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg text-[#646464] font-bold">پرفروش‌ترین‌ها</h4>
                    <Link href="/products" className="text-sm text-primary hover:underline">
                        مشاهده همه
                    </Link>
                </div>
                <div className="slider-container overflow-x-hidden">
                    <Slider {...settings}>
                        {bestSellProducts.map((item, index) => (
                            <Link href={`/products/${item.slug}`} key={item.id} className="relative overflow-hidden !flex flex-col items-center gap-12 bg-white rounded-lg px-2 py-6 border cursor-pointer hover:shadow-md transition-shadow">

                                <div className="triangle rounded-tr-lg">
                                    <span className="text-white absolute top-[-17px]">{persianNumber(`#${index + 1}`)}</span>
                                </div>

                                <Image
                                    src={item.images[0]}
                                    placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                                    alt={item.title}
                                    width={200}
                                    height={200}
                                    className="w-[110px]"
                                />
                                <p className="text-sm text-right text-[#646464] leading-6 line-clamp-2">{item.title}</p>
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
                            </Link>
                        ))}
                    </Slider>
                </div>
            </Container>
        </div>
    );
}

export default BestSell;

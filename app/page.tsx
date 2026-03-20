
import Image from "next/image";
import Header from "../components/header/header";
import Slider from "@/components/slider/Slider";
import SurpriseSlider from "@/components/surpriseSlider/SurpriseSlider";
import Category from "@/components/category/category";
import Banners from "@/components/banners/banner";
import PopularBrands from "@/components/popularBrands/popularBrands";
import Cats from "@/components/cats/cats";
import BestSell from "@/components/bestSell/bestSell";

export default function Home() {
  return (
      <main>
      <Slider />
      <SurpriseSlider />
      <Category />
      <Banners />
      <PopularBrands />
      <Cats />
      <BestSell />
      </main>
  );
}

import Container from "../container/container";
import PopularBrandsSlider from "../popularBrandsSlider/popularBrandsSlider";

const PopularBrands = () => {
    return (
        <div className="mt-10 flex items-center">
            <Container>
                <div className="flex flex-col md:flex-row items-center gap-2 overflow-hidden border rounded-xl px-5">
                    <h4 className="text-[#646464] text-2xl text-center mt-3">پرفروش‌ترین برندها</h4>
                    <PopularBrandsSlider />
                </div>
            </Container>
        </div>
    );
}

export default PopularBrands;
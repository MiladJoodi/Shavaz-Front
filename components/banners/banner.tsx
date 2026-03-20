import Image from "next/image";
import Container from "../container/container";
import { shimmer, toBase64 } from "@/utils/shimmer";

const Banners = () => {
    return (
        <div className="mt-10">
            <Container>
                <div className="flex md:flex-row flex-col justify-center gap-3 md:gap-7 py-4 md:p-4">
                    <div className="relative flex-1 w-full h-auto cursor-pointer">
                        <Image
                            src="/banner1.webp"
                            placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                            alt=""
                            width={1000}
                            height={400}
                            className="rounded-xl"
                        />
                    </div>
                    <div className="relative flex-1 w-full h-auto cursor-pointer">
                        <Image
                            src="/banner2.webp"
                            placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                            alt=""
                            width={1000}
                            height={400}
                            className="rounded-xl"
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Banners;
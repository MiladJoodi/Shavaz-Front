import Link from "next/link";
import Container from "../container/container";
import Image from "next/image";
import { shimmer, toBase64 } from "@/utils/shimmer";

const cats = [
    {image:"/cats/01.webp"},
    {image:"/cats/02.webp"},
    {image:"/cats/03.webp"},
    {image:"/cats/04.webp"},
]

const Cats = () => {
    return (
        <div className="mt-10">
            <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 justify-items-center gap-4">
                    {cats.map((item, index)=>(
                        <Link href="/" className="relative w-full h-[270px]" key={index}>
                        <Image
                            src={item.image}
                            placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                            alt='prize'
                            fill
                            className="rounded-3xl"
                        />
                    </Link>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Cats;
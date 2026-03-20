import Image from "next/image";
import Link from "next/link";
import Container from "../container/container";
import { shimmer, toBase64 } from "@/utils/shimmer";
import { categories } from "@/data/categories";

const Category = () => {
  return (
    <div className="mt-10">
      <Container>
        <div className="flex flex-col gap-10">
          <h4 className="text-center text-2xl text-[#646464]">دسته‌بندی ها</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-y-4">
            {categories.slice(0, 14).map((item) => (
              <Link
                key={item.id}
                href={`/categories/${item.slug}`}
                className="flex flex-col items-center gap-5"
              >
                <div className="relative w-[110px] h-[110px]">
                  <Image
                    src={`/category/${item.image}`}
                    placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                    alt={item.title}
                    fill
                    className="hover:scale-110 transition-all duration-300 ease-in-out delay-150 cursor-pointer rounded-full"
                  />
                </div>
                <span className="text-xs text-[#646464]">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Category;

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import Container from "@/components/container/container";
import Breadcrumb from "@/components/shared/Breadcrumb";
import SectionTitle from "@/components/shared/SectionTitle";
import { blogPosts } from "@/data/blog";
import persianNumber from "@/utils/persianNumber";
import { shimmer, toBase64 } from "@/utils/shimmer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "بلاگ",
  description: "آخرین مقالات و نکات زیبایی و مراقبت پوست و مو در بلاگ شاواز",
};

export default function BlogPage() {
  return (
    <main>
      <Container>
        <Breadcrumb items={[{ label: "بلاگ" }]} />
        <SectionTitle
          title="بلاگ شاواز"
          subtitle="آخرین مقالات و نکات زیبایی و سلامت"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group border border-gray-100 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {persianNumber(post.readTime)} دقیقه مطالعه
                  </span>
                </div>
                <h2 className="text-sm font-bold text-[#646464] leading-6 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-xs text-gray-400 leading-5 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}

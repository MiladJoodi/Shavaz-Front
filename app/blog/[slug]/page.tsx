import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import Container from "@/components/container/container";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { getBlogBySlug, getRelatedPosts, blogPosts } from "@/data/blog";
import persianNumber from "@/utils/persianNumber";
import { shimmer, toBase64 } from "@/utils/shimmer";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogBySlug(params.slug);
  if (!post) return { title: "مقاله یافت نشد" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post);

  return (
    <main>
      <Container>
        <Breadcrumb
          items={[
            { label: "بلاگ", href: "/blog" },
            { label: post.title },
          ]}
        />

        <article className="max-w-3xl mx-auto mb-12">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#646464] leading-10 mb-4">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
              <span className="flex items-center gap-1">
                <User size={14} />
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {persianNumber(post.readTime)} دقیقه مطالعه
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
            <Image
              src={post.image}
              placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-sm max-w-none text-[#646464] leading-8">
            {post.content.split("\n").map((paragraph, index) => {
              const trimmed = paragraph.trim();
              if (!trimmed) return null;
              if (trimmed.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-xl font-bold text-[#646464] mt-8 mb-4">
                    {trimmed.replace("## ", "")}
                  </h2>
                );
              }
              if (trimmed.startsWith("### ")) {
                return (
                  <h3 key={index} className="text-lg font-bold text-[#646464] mt-6 mb-3">
                    {trimmed.replace("### ", "")}
                  </h3>
                );
              }
              if (trimmed.startsWith("- ")) {
                return (
                  <li key={index} className="text-sm text-gray-600 mr-4 mb-1">
                    {trimmed.replace("- ", "")}
                  </li>
                );
              }
              return (
                <p key={index} className="text-sm text-gray-600 mb-3 leading-7">
                  {trimmed}
                </p>
              );
            })}
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="max-w-3xl mx-auto mb-12">
            <h3 className="text-xl font-bold text-[#646464] mb-6">مقالات مرتبط</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="text-xs font-medium text-[#646464] line-clamp-2 group-hover:text-primary transition-colors leading-5">
                      {related.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back to Blog */}
        <div className="max-w-3xl mx-auto mb-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ArrowRight size={16} />
            بازگشت به بلاگ
          </Link>
        </div>
      </Container>
    </main>
  );
}

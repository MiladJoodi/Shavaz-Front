import { categories } from "@/data/categories";
import CategoryContent from "./CategoryContent";

export function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <main>
      <CategoryContent slug={slug} />
    </main>
  );
}

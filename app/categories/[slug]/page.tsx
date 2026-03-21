import { categories } from "@/data/categories";
import CategoryContent from "./CategoryContent";

export function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  return (
    <main>
      <CategoryContent slug={params.slug} />
    </main>
  );
}

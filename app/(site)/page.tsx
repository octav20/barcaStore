// import ProductCard from "@/components/product-card";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

export default async function Home() {
  const products = await getProducts();
  console.log(products);

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Productos destacados" items={products} />
        </div>
      </div>
    </Container>
  );
}

const getProducts = async () => {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  const res = await fetch(`http://localhost:3000/api/products`);
  return res.json();
};
export default getProducts;

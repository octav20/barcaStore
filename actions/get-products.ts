const getProducts = async () => {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  return res.json();
};
export default getProducts;

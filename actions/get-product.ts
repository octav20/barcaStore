const getProduct = async (id: string) => {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
  return res.json();
};
export default getProduct;

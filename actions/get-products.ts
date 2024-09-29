const getProducts = async () => {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    console.log(process.env.NEXT_PUBLIC_API_URL);
    return res.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};
export default getProducts;

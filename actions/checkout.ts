const checkout = async (userId: string, total: number) => {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, total }),
  });
  return res.json();
};
export default checkout;

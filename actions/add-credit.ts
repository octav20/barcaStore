const addCredit = async (userId: string, mount: number) => {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  const res = await fetch(`http://localhost:3000/api/add-credit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, mount }),
  });
  return res.json();
};
export default addCredit;

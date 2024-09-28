// import ProductCard from "@/components/product-card";
import getUserCredit from "@/actions/get-user-credit";
import RecargaSaldo from "@/components/credit-form";
import Container from "@/components/ui/container";
interface CreditPageProps {
  params: {
    userId: string;
  };
}
const CreditPage: React.FC<CreditPageProps> = async ({ params }) => {
  console.log("este es el userid: " + params.userId);
  const saldo = await getUserCredit(params.userId);
  console.log(saldo);
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl">Tu saldo es de: {saldo}</h1>
        </div>
        <RecargaSaldo userId={params.userId} />
      </div>
    </Container>
  );
};
export default CreditPage;

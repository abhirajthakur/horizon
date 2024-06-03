import { getAccounts } from "@/actions/bank";
import { auth } from "@/auth";
import HeaderBox from "@/components/HeaderBox";
import PaymentTransferForm from "@/components/PaymentTransferForm";

const Transfer = async () => {
  const session = await auth();
  const accounts = await getAccounts({ userId: session?.user?.id! });

  if (!accounts) {
    return;
  }

  const accountsData = accounts?.data;

  return (
    <section className="payment-transfer">
      <HeaderBox
        title="Payment Transfer"
        subtext="Please provide any specific details or notes related to the payment transfer."
      />

      <section className="size-full pt-5">
        <PaymentTransferForm accounts={accountsData} />
      </section>
    </section>
  );
};

export default Transfer;

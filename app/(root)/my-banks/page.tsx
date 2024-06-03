import { getAccounts } from "@/actions/bank";
import { getUser } from "@/actions/user";
import { auth } from "@/auth";
import BankCard from "@/components/BankCard";
import HeaderBox from "@/components/HeaderBox";

const MyBanks = async () => {
  const session = await auth();
  const user = await getUser(session?.user?.id);
  const accounts = await getAccounts({ userId: session?.user?.id! });

  if (!accounts) {
    return;
  }

  return (
    <section className="flex">
      <div className="my-banks">
        <HeaderBox
          title="My Bank Accounts"
          subtext="Effortlessly manage your banking activities."
        />

        <div className="space-y-4">
          <h2 className="header-2">Your Cards</h2>
          <div className="flex flex-wrap gap-6">
            {accounts &&
              accounts.data.map((account: Account) => (
                <BankCard
                  key={account.id}
                  account={account}
                  userName={user?.firstName!}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyBanks;

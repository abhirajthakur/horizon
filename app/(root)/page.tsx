import { getAccount, getAccounts } from "@/actions/bank";
import { getUser } from "@/actions/user";
import { auth } from "@/auth";
import BalanceBox from "@/components/BalanceBox";
import HeaderBox from "@/components/HeaderBox";
import RecentTransactions from "@/components/RecentTransactions";
import RightSidebar from "@/components/RightSidebar";

export default async function Home({
  searchParams: { id, page },
}: SearchParamProps) {
  const currentPage = Number(page as string) || 1;
  const session = await auth();
  const user = await getUser(session?.user?.id);
  const accounts = await getAccounts({ userId: session?.user?.id! });

  if (!accounts) {
    return;
  }

  const accountsData = accounts?.data;
  const bankId = (id as string) ?? accountsData[0]?.bankId;
  const account = await getAccount({ bankId });

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={user?.firstName ?? "Anonymous"}
            subtext="Access and manage your account and transactions efficiently"
          />

          <BalanceBox
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>
        <RecentTransactions
          accounts={accountsData}
          transactions={account?.transactions}
          bankId={bankId}
          page={currentPage}
        />
      </div>

      <RightSidebar
        user={user!}
        transactions={account?.transactions}
        banks={accountsData?.slice(0, 2)}
      />
    </section>
  );
}

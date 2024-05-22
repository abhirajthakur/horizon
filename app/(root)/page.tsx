import { getUser } from "@/actions/user";
import { auth } from "@/auth";
import BalanceBox from "@/components/BalanceBox";
import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";

export default async function Home() {
  const session = await auth();
  const user = await getUser(session?.user?.id);

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
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1225.5}
          />
        </header>
        RECENT TRANSACTIONS
      </div>

      <RightSidebar
        user={user}
        transactions={[]}
        banks={[{ currentBalance: 125.7 }, { currentBalance: 140.8 }]}
      />
    </section>
  );
}

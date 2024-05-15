import BalanceBox from "@/components/BalanceBox";
import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";

export default function Home() {
  const loggedIn = {
    firstName: "Abhiraj",
    lastName: "Thakur",
    email: "abhirajthakur124@gmail.com",
  };

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName ?? "Anonymous"}
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
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 125.7 }, { currentBalance: 140.8 }]}
      />
    </section>
  );
}

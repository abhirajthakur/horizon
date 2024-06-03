import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { transactionCategoryStyles } from "@/constants";
import {
  cn,
  formatAmount,
  formatDateTime,
  getTransactionStatus,
  removeSpecialCharacters,
} from "@/lib/utils";

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const { borderColor, backgroundColor, textColor, chipBackgroundColor } =
    transactionCategoryStyles[
      category as keyof typeof transactionCategoryStyles
    ] || transactionCategoryStyles.default;

  return (
    <div className={cn("category-badge", borderColor, chipBackgroundColor)}>
      <div className={cn("size-2 rounded-full", backgroundColor)} />
      <p className={cn("text-[12px] font-medium", textColor)}>{category}</p>
    </div>
  );
};

const TransactionsTable = ({ transactions }: TransactionTableProps) => {
  return (
    <Table className="w-40 md:w-full">
      <TableHeader className="bg-[#F9FAFB]">
        <TableRow>
          <TableHead className="px-2">Transaction</TableHead>
          <TableHead className="px-2">Amount</TableHead>
          <TableHead className="px-2">Status</TableHead>
          <TableHead className="px-2">Date</TableHead>
          <TableHead className="px-2 max-md:hidden">Channel</TableHead>
          <TableHead className="px-2 max-md:hidden">Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((tx: Transaction) => {
          const status = getTransactionStatus(new Date(tx.date));
          const amount = formatAmount(tx.amount);
          const isDebit = tx.type === "debit";
          const isCredit = tx.type === "credit";

          return (
            <TableRow
              key={tx.id}
              className={`${isDebit || amount[0] === "-" ? "bg-[#FFFBFA]" : "bg-[#F6FEF9]"} !over:bg-none !border-b-DEFAULT`}
            >
              <TableCell className="max-w-20 xl:max-w-48 pl-2 pr-6">
                <div className="flex items-center gap-2">
                  <h1 className="text-12 font-semibold truncate text-[#344054]">
                    {removeSpecialCharacters(tx.name)}
                  </h1>
                </div>
              </TableCell>

              <TableCell
                className={`${isDebit || amount[0] === "-" ? "text-[#F04438]" : "text-[#039855]"} pl-2 pr-10 font-semibold`}
              >
                {isDebit ? `-${amount}` : isCredit ? amount : amount}
              </TableCell>

              <TableCell className="pl-2 pr-6">
                <CategoryBadge category={status} />
              </TableCell>

              <TableCell className="min-w-28 pl-2 pr-6">
                {formatDateTime(new Date(tx.date)).dateTime}
              </TableCell>
              <TableCell className="pl-2 pr-6 min-w-20 capitalize">
                {tx.paymentChannel}
              </TableCell>
              <TableCell className="pl-2 pr-6 max-md:hidden">
                <CategoryBadge category={tx.category} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;

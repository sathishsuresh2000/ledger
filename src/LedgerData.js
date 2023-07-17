const ledgerData = require("./data/complicated_ledger.json");

export function getLedgerData() {
  const alreadyExist = {};
  return ledgerData
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .filter((a) => {
      if (alreadyExist[a.activity_id]) {
        return false;
      } else {
        alreadyExist[a.activity_id] = true;
        return true;
      }
    });
}

export function getBalance() {
  const data = getLedgerData();
  return getCurrency(data?.length > 0 ? data[data.length - 1].balance : 0);
}

export function getColumns() {
  return [
    {
      Header: "Date",
      accessor: "date",
      Cell: ({ cell: { value } }) => {
        return new Date(value).toLocaleDateString("en", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });
      },
    },
    {
      Header: "Transaction",
      accessor: "type",
      disableSortBy: true,
    },
    {
      Header: "Description",
      accessor: "destination.description",
      disableSortBy: true,
    },
    {
      Header: "Amount",
      accessor: "amount",
      Cell: ({ cell: { value } }) => {
        return getCurrency(value);
      },
      disableSortBy: true,
    },
    {
      Header: "Balance",
      accessor: "balance",
      Cell: ({ cell: { value } }) => {
        return getCurrency(value);
      },
      disableSortBy: true,
    },
  ];
}

export function getCurrency(amount) {
  return `${(isNegative(amount) && "-") || ""}$${
    isNegative(amount) ? -amount : amount
  }`;
}

const isNegative = (amount) => {
  return amount < 0;
};

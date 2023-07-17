import { useState } from "react";

import { useTable, useSortBy } from "react-table";
import { getColumns, getLedgerData } from "./LedgerData";
const Table = () => {
  const [data] = useState(getLedgerData());
  const [columns] = useState(getColumns());

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        data,
        columns,
        initialState: {
          sortBy: [
            {
              id: "date",
              desc: false,
            },
          ],
        },
      },
      useSortBy
    );

  return (
    <div className="tableContainer">
      <div className="text-xl m-4">Transactions</div>
      <div>
        <table
          {...getTableProps()}
          className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    class="px-6 py-3"
                  >
                    {column.render("Header")}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <span>▼</span>
                      ) : (
                        <span>▲</span>
                      )
                    ) : (
                      ""
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="bg-white text-gray-700 border-b !border-gray-300 dark:border-gray-700"
                >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} class="px-6 py-4">
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

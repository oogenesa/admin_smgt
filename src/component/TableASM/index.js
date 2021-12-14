import React, { useMemo } from "react";
import { useTable } from "react-table";
import "./style.css";

const TableASM = (props) => {
  const column = [
    {
      Header: "Id",
      accessor: "_id",
    },
    {
      Header: "Full Name",
      accessor: "full_name",
    },
    {
      Header: "Nick Name",
      accessor: "nick_name",
    },
    {
      Header: "Birth Date",
      accessor: "birth_date",
    },
    {
      Header: "Class",
      accessor: "class_sm",
    },
    {
      Header: "Image",
      accessor: "image",
    },
    {
      Header: "More",
      accessor: "more",
      Cell: ({ cell }) => (
        <button value={"tes"} onClick={() => handleClick()}>
          {"tes"}
        </button>
      ),
    },
  ];

  const handleClick = () => {
    console.log("ss");
  };
  const data = useMemo(() => props.asm, []);
  const columns = useMemo(() => column, []);
  const tableInstance = useTable({
    columns,
    data: props.asm,
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
              <th></th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableASM;

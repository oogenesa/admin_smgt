import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import "./style.css";

const TableASM = (props) => {
  const column = [
    {
      Header: "Full Name",
      accessor: (row) => upper(row.full_name),
    },
    {
      Header: "Nick Name",
      accessor: (row) => upper(row.nick_name),
    },
    {
      Header: "Birth Date",
      accessor: (row) => formatDate(row.birth_date),
    },
    {
      Header: "Class",
      accessor: "class_sm",
    },

    {
      Header: "Action",
      maxwidth: 100,
      width: 100,
      id: "edit",
      accessor: "_id",
      Cell: ({ value }) => (
        <div
          style={{ display: "flex", flex: 2, justifyContent: "space-evenly" }}
        >
          <a
            className="btn btn-info"
            onClick={() => handleClickDetail({ value })}
          >
            <i className="fas fa-eye"></i>
          </a>
          <a
            className="btn btn-danger"
            onClick={() => handleClickEdit({ value })}
          >
            <i className="fas fa-pen"></i>
          </a>
          {/* <button onClick={() => handleClickDetail({ value })}>Detail</button> */}
        </div>
      ),
    },
  ];

  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const formatDate = (val) => {
    var d = new Date(val);
    var day = String(d.getDate());
    var month = String(d.getMonth());
    var year = d.getFullYear();
    return [day, monthNames[month], year].join(" ");
  };
  const upper = (str) => {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  };
  const handleClickEdit = (e) => {
    props.handleClickEdit(e);
  };
  const handleClickDetail = (e) => {
    props.handleClickDetail(e);
  };
  const data = useMemo(() => props.asm, []);
  const columns = useMemo(() => column, []);
  const tableInstance = useTable(
    {
      columns,
      data: props.asm,
    },
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(
                    column.getSortByToggleProps({
                      style: { minWidth: column.minWidth, width: column.width },
                    })
                  )}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
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
        </tbody>
      </table>
    </div>
  );
};

export default TableASM;

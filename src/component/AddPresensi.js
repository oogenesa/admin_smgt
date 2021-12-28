import React, { useState, useEffect, useMemo } from "react";
import { useTable, usePagination } from "react-table";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

const AddPresensi = (props) => {
  const SwitchCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
  }) => {
    // We need to keep and update the state of the cell normally

    const [value, setValue] = useState(initialValue);

    const onChange = (e) => {
      // setValue(e.target.checked);
      setValue(e);
      updateMyData(index, id, e);
      if (e) {
        updateMyData(index, "desc", "");
      } else {
        updateMyData(index, "desc", "Tanpa Keterangan");
      }
    };

    // We'll only update the external data when the input is blurred
    const onBlur = (e) => {
      console.log(index, id, e);
    };

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);
    // useEffect(() => {

    // }, [value]);

    // return <input value={value} onChange={onChange} onBlur={onBlur} />;
    return (
      <div className="form-group">
        <BootstrapSwitchButton
          checked={value}
          onstyle="success"
          offstyle="danger"
          onChange={onChange}
          onBlur={onBlur}
          onlabel="Hadir"
          offlabel="Tidak Hadir"
          width={150}
        />
      </div>
    );
  };

  const DropdownCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
  }) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue);
    const [disable, setDisabled] = useState(data[index].status);

    const onChange = (e) => {
      setValue(e.target.value);
    };

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
      updateMyData(index, id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
      setValue(initialValue);
      if (data[index].status) {
        setValue("");
      } else {
        setValue(initialValue);
      }
    }, [initialValue]);

    return (
      <div>
        <select
          className="form-control"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disable}
        >
          <option hidden={!disable} value=""></option>
          <option value="Tanpa Keterangan">Tanpa Keterangan</option>
          <option value="Sakit">Sakit</option>
          <option value="Ijin">Ijin</option>
        </select>
      </div>
    );
  };
  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Class",
      accessor: "class",
    },
    {
      Header: "Kehadiran",
      accessor: "status",
      Cell: SwitchCell,
    },
    {
      Header: "Desc",
      accessor: "desc",
      Cell: DropdownCell,
    },
  ];

  const [data, setData] = useState([
    {
      id: 1,
      name: "tes",
      class: "balita",
      status: true,
      desc: "",
    },
    {
      id: 2,
      name: "tes2",
      class: "balita",
      status: true,
      desc: "",
    },
    {
      id: 3,
      name: "tes3",
      class: "balita",
      status: true,
      desc: "",
    },
  ]);
  const [originalData] = useState(data);
  const [skipPageReset, setSkipPageReset] = useState(false);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data

  // useEffect(() => {
  //   // setSkipPageReset(false)
  //   // console.log(data);
  // }, [data]);

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    // setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...
  const resetData = () => setData(originalData);
  const Table = ({ columns, data, updateMyData, skipPageReset }) => {
    // For this example, we're using pagination to illustrate how to stop
    // the current page from resetting when our data changes
    // Otherwise, nothing is different here.

    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
      useTable(
        {
          columns,
          data,

          // use the skipPageReset option to disable page resetting temporarily
          autoResetPage: !skipPageReset,
          // updateMyData isn't part of the API, but
          // anything we put into these options will
          // automatically be available on the instance.
          // That way we can call this function from our
          // cell renderer!
          updateMyData,
        },
        usePagination
      );
    return (
      <>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
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
      </>
    );
  };

  return (
    <div>
      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
      <button onClick={() => console.log(data)}>tes</button>
    </div>
  );
};

export default AddPresensi;

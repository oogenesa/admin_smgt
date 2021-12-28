import React, { useState, useEffect, useMemo } from "react";
import { useTable, usePagination } from "react-table";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { get_asm_byClass, post_absensi_asm } from "../helpers/apiFunction";
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
        updateMyData(index, "description", "");
      } else {
        updateMyData(index, "description", "Tanpa Keterangan");
      }
    };

    // We'll only update the external data when the input is blurred
    const onBlur = (e) => {};

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
      accessor: "full_name",
    },
    {
      Header: "Class",
      accessor: "class_sm",
    },
    {
      Header: "Kehadiran",
      accessor: "status",
      Cell: SwitchCell,
    },
    {
      Header: "Keterangan",
      accessor: "description",
      Cell: DropdownCell,
    },
  ];

  const [data, setData] = useState([
    {
      id: 1,
      name: "tes",
      class: "balita",
      status: true,
      description: "",
    },
    {
      id: 2,
      name: "tes2",
      class: "balita",
      status: true,
      description: "",
    },
    {
      id: 3,
      name: "tes3",
      class: "balita",
      status: true,
      description: "",
    },
  ]);
  const [originalData] = useState(data);
  const [skipPageReset, setSkipPageReset] = useState(false);
  const [class_sm, setClassSM] = useState("Balita");
  const [event, setEvent] = useState("Ibadah Minggu");
  const [dateevent, setDateEvent] = useState(new Date());
  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data

  useEffect(() => {
    const send = { id: class_sm };

    get_asm_byClass(send).then((res) => {
      res.forEach(function (prop) {
        prop.id_asm = prop._id;
        prop.presence_date = dateevent;
        prop.status = true;
        prop.description = "";
        prop.event = event;
        delete prop._id;
      });
      setData(res);
    });
  }, [class_sm]);

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
  const sendAbsensi = () => {
    data.forEach(function (prop) {
      delete prop.full_name;
      delete prop.nick_name;
      delete prop.image;

      post_absensi_asm(prop).then((res) => {
        console.log(res);
      });
      // console.log(prop);
    });
  };
  return (
    <div>
      <div
        className="row col-md-3"
        style={{ marginBottom: 10, display: "flex", flexDirection: "row" }}
      >
        <select
          className="form-control"
          value={class_sm}
          onChange={(e) => setClassSM(e.target.value)}
        >
          <option value="Balita">Balita</option>
          <option value="Kecil">Kecil</option>
          <option value="Besar">Besar</option>
          <option value="Remaja">Remaja</option>
        </select>
      </div>
      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
      <button onClick={() => sendAbsensi()}>tes</button>
    </div>
  );
};

export default AddPresensi;

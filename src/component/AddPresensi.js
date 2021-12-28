import React, { useState, useEffect, useMemo } from "react";
import { useTable, usePagination } from "react-table";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { DateTimePicker } from "react-rainbow-components";
import {
  get_asm_byClass,
  post_absensi_asm,
  get_gsm_service,
} from "../helpers/apiFunction";
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
      accessor: (row) => upper(row.full_name),
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

  const [data, setData] = useState([]);
  const [originalData] = useState(data);
  const [skipPageReset, setSkipPageReset] = useState(false);
  const [class_sm, setClassSM] = useState("Balita");
  const [event, setEvent] = useState("Ibadah Minggu");
  const [dateevent, setDateEvent] = useState(new Date());

  const [sermon, setSermon] = useState();
  const [worship_leader, setWorship_leader] = useState();
  const [assistant, setAssistant] = useState();
  const [guitar, setGuitar] = useState();
  const [keyboard, setKeyboard] = useState();
  const [cajon, setCajon] = useState();

  //to get
  const [sermon_gsm, setSermon_gsm] = useState({});
  const [worship_leader_gsm, setWorship_leader_gsm] = useState({});
  const [assistant_gsm, setAssistant_gsm] = useState({});
  const [guitar_gsm, setGuitar_gsm] = useState({});
  const [keyboard_gsm, setKeyboard_gsm] = useState({});
  const [cajon_gsm, setCajon_gsm] = useState({});
  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data

  useEffect(() => {
    const send = { id: class_sm };
    //getasm
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

  useEffect(() => {
    get_gsm_service("sermon").then((res) => setSermon_gsm(res));
    get_gsm_service("worship_leader").then((res) => setWorship_leader_gsm(res));
    get_gsm_service("assistant").then((res) => setAssistant_gsm(res));
    get_gsm_service("guitar").then((res) => setGuitar_gsm(res));
    get_gsm_service("keyboard").then((res) => setKeyboard_gsm(res));
    get_gsm_service("cajon").then((res) => setCajon_gsm(res));
  }, []);
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
  const upper = (str) => {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  };
  const gsmSermon = () => {
    if (sermon_gsm.length === undefined) {
      return;
    } else {
      // get_gsm_service("sermon").then((res) => {
      //   console.log(res);
      // });
      var loops = [];
      sermon_gsm.forEach(function (prop) {
        loops.push(
          <option key={prop._id} value={prop._id}>
            Kak {upper(prop.nick_name)}
          </option>
        );
      });
      console.log(loops);
      return (
        <select
          className="form-control"
          value={sermon}
          onChange={(e) => setSermon(e.target.value)}
        >
          {loops}
        </select>
      );
    }
  };
  const gsmWorshipLeader = () => {
    if (worship_leader_gsm.length === undefined) {
      return;
    } else {
      // get_gsm_service("sermon").then((res) => {
      //   console.log(res);
      // });
      var loops = [];
      worship_leader_gsm.forEach(function (prop) {
        loops.push(
          <option key={prop._id} value={prop._id}>
            Kak {upper(prop.nick_name)}
          </option>
        );
      });
      console.log(loops);
      return (
        <select
          className="form-control"
          value={worship_leader}
          onChange={(e) => setWorship_leader(e.target.value)}
        >
          {loops}
        </select>
      );
    }
  };
  const gsmGuitar = () => {
    if (guitar_gsm.length === undefined) {
      return;
    } else {
      // get_gsm_service("sermon").then((res) => {
      //   console.log(res);
      // });
      var loops = [];
      guitar_gsm.forEach(function (prop) {
        loops.push(
          <option key={prop._id} value={prop._id}>
            Kak {upper(prop.nick_name)}
          </option>
        );
      });
      console.log(loops);
      return (
        <select
          className="form-control"
          value={guitar}
          onChange={(e) => setGuitar(e.target.value)}
        >
          {loops}
        </select>
      );
    }
  };
  return (
    <div>
      <div className="row">
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
        <div className="col-md-3">
          <div className="form-group">
            <div>
              <div className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto">
                <DateTimePicker
                  value={dateevent}
                  minDate={new Date(1990, 0, 4)}
                  maxDate={new Date()}
                  label="Tanggal Lahir"
                  onChange={(value) => setDateEvent({ birth_date: value })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div
          className="row col-md-3"
          style={{ marginBottom: 10, display: "flex", flexDirection: "row" }}
        >
          <label>Pelayan Firman</label>

          {gsmSermon()}
        </div>
        <div
          className="row col-md-3"
          style={{ marginBottom: 10, display: "flex", flexDirection: "row" }}
        >
          <label>Liturgis</label>

          {gsmWorshipLeader()}
        </div>
        <div
          className="row col-md-3"
          style={{ marginBottom: 10, display: "flex", flexDirection: "row" }}
        >
          <label>Gitaris</label>

          {gsmGuitar()}
        </div>
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

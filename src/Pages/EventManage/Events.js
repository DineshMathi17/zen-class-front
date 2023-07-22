import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Profile from "../../Components/Profile/Profile"
import Sidebar from "../../Components/Sidebar/Sidebar";
import { API } from "../../global";


function Event() {
  const [batch, setBatch] = useState([""]);
  const [stuTable, setStuTable] = useState(null);
  const [spin, setSpin] = useState(false);
  const [bName,setBName]=useState("")
  useEffect(() => {
    selectBatches();
  }, []);
  let selectBatches = async () => {
    try {
      let data = await axios.get(`${API}/users/giveBatches`, {
        headers: {
          auth: window.localStorage.getItem("app-token"),
        },
      });
      setBatch(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  let selectValue = async (e) => {
    try {
      setSpin(true);
      let obj = {
        batchName: e.target.value,
      };
      
      let batchStudents = await axios.post(`${API}/users/studentBatches`, obj, {
        headers: {
          auth: window.localStorage.getItem("app-token"),
        },
      });
        setBName(obj.batchName)
      setStuTable(batchStudents.data.details);
      setSpin(false);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Sidebar/>
      <div className="row">
        <div className="col-12 col-md-12 w-100  secTwo">
          <h3>Events</h3>
          <Profile/>
        </div>
      </div>

      <div className="container mt-3">
        <div className="row">
          <div className="col-lg-6">
            <form>
              <select
                onChange={selectValue}
                className="form-select"
                aria-label="Default select example"
              >
                <option defaultValue>Select batch</option>
                {batch.map((val, idx) => {
                  return (
                    <option key={idx} value={val.batchName}>
                      {val.batchName}
                    </option>
                  );
                })}
              </select>
            </form>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-8 ">
            {spin ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary " role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : stuTable ? (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Batch Name</th>
                    <th scope="col">Events</th>
                  </tr>
                </thead>
                <tbody>
                  {stuTable.map((val, idx) => {
                    return (

                      <tr key={idx}>
                        <th scope="row">{idx + 1}</th>
                        <td>{val.username}</td>
                        <td>{val.email}</td>
                        <td>{bName}</td>
                        <td>
                          <Link
                            to={`/home/capstone/${val._id}`}
                            type="button"
                            className="btn btn-success mx-2 btn-sm"
                          >
                            Capstone
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Event;
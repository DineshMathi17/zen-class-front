import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import { API } from "../../global";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Profile from "../../Components/Profile/Profile";
import { toast } from "react-toastify";

function Batches() {
  const [batch, setBatch] = useState([""]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    selectBatches();
  }, [refresh]);

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
      toast.error("Error")
    }
  };
  let formik = useFormik({
    initialValues: {
      batchName: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        let disMsg = await axios.post(`${API}/users/batchCreate`, values, {
          headers: {
            auth: window.localStorage.getItem("app-token"),
          },
        });
        setRefresh(refresh + 1);
        resetForm({ values: "" });
        toast.success("batch create successful")
      } catch (error) {
        console.log(error);
      }
    },
  });

  let formikStu = useFormik({
    initialValues: {
      batchName: "",
      email: "",
      username: "",
      password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        let studentEntry = await axios.post(`${API}/studentSignup`, values, {
          headers: {
            auth: window.localStorage.getItem("app-token"),
          },
        });
        toast.success("Student data create successful")
        resetForm({ values: "" });
      } catch (error) {
        console.log(error);
      }
    },
  });


  return (
    <div className="contianer mx-5">
       <Sidebar/>
      <div className="row">
        <div className="col-12 col-md-12 w-100  secTwo">
          <h3>Batches</h3>
          <Profile/>
        </div>
      </div>

      <div className="row mt-3 ">
        <div className="col-md-4 ms-5 ">
          <h5>Add students to the batch</h5>
          <form onSubmit={formikStu.handleSubmit}>
            <select
              className="form-select mb-3"
              value={formikStu.values.batchName}
              onChange={formikStu.handleChange}
              name="batchName"
              aria-label="Default select example"
            >
              <option value>Select Batch</option>
              {batch.map((val, idx) => {
                return (
                  <option key={idx} value={val.batchName}>
                    {val.batchName}
                  </option>
                );
              })}
            </select>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Enter name
              </label>
              <input
                type="text"
                name="username"
                value={formikStu.values.username}
                onChange={formikStu.handleChange}
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter your fullname "
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail2" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formikStu.values.email}
                onChange={formikStu.handleChange}
                className="form-control"
                id="exampleInputEmail2"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                name="password"
                value={formikStu.values.password}
                onChange={formikStu.handleChange}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <button type="submit" className="btn btn-primary mb-3 mt-4">
              Add
            </button>
          </form>
        </div>

        <div className="col-md-6 mx-5">
          <div className="row mt-5 ">
            <div className="col-md-12 card text-bg-dark">
              <div className="card-body">
                <h5 className="mb-4">Create a new batch</h5>
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput3"
                      className="form-label"
                    >
                      Enter batch name
                    </label>
                    <input
                      type="text"
                      name="batchName"
                      value={formik.values.batchName}
                      onChange={formik.handleChange}
                      className="form-control"
                      id="exampleFormControlInput3"
                      placeholder="create a batch"
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary mb-3 mt-4">
                    Create
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Batches;
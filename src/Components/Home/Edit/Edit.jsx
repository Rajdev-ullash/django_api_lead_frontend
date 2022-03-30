import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./Edit.css";
const Edit = () => {
  const { id } = useParams();
  console.log(id);
  let history = useNavigate();
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("");

  useEffect(() => {
    fetch(`https://leadapiapp.herokuapp.com/lead/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  const onUpdate = async (e) => {
    e.preventDefault();
    if (name == "") {
      setName(data.name);
    }
    if (email == "") {
      setEmail(data.email);
    }
    if (phone == "") {
      setPhone(data.phone);
    }
    if (designation == "") {
      setDesignation(data.designation);
    }

    try {
      await fetch(`https://leadapiapp.herokuapp.com/lead/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, designation }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.message) {
            toast.success("Lead Updated Successfully", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              history("/");
            }, 6000);
          }
          if (data.error) {
            toast.warn("Please select all this field", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          console.log(data);
        })

        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="body">
      <div class="form">
        <div class="title">Welcome</div>
        <div class="subtitle">Let's create your account!</div>
        <div class="input-container ic1">
          <input
            id="name"
            class="input"
            type="text"
            defaultValue={data?.name}
            onChange={(e) => setName(e.target.value)}
          />
          <div class="cut"></div>
          <label for="name" class="placeholder">
            Name
          </label>
        </div>
        <div class="input-container ic2">
          <input
            id="email"
            class="input"
            type="email"
            defaultValue={data?.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div class="cut cut-short"></div>
          <label for="email" class="placeholder">
            Email
          </label>
        </div>
        <div class="input-container ic1">
          <input
            id="phone"
            class="input"
            type="text"
            defaultValue={data?.phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div class="cut"></div>
          <label for="phone" class="placeholder">
            Phone
          </label>
        </div>
        <div class="input-container ic1">
          <input
            id="designation"
            class="input"
            type="text"
            defaultValue={data?.designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
          <div class="cut"></div>
          <label for="designation" class="placeholder">
            Designation
          </label>
        </div>
        <button type="text" class="submit" onClick={(e) => onUpdate(e)}>
          submit
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Edit;

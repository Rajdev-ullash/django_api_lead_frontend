import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";
import axios from "axios";
const ModalForm = () => {
  let history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("");
  const [picture, setPicture] = useState("");
  console.log(picture);

  // const handleImage = (event) => {
  //   const data = event.name;
  //   setPicture(data);
  // };

  const { modals } = useContext(UserContext);
  const [showModal, setShowModal] = modals;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !designation || !picture) {
      toast.warning("All field are required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    try {
      if (name && email && phone && designation && picture) {
        var data = new FormData();
        data.append("name", name);
        data.append("email", email);
        data.append("phone", phone);
        data.append("designation", designation);
        data.append("picture", picture);
        await axios({
          method: "post",
          url: "https://leadapiapp.herokuapp.com/lead/list",
          data: data,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((res) => {
            if (res.data) {
              toast.success("Lead Created Successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setTimeout(() => {
                window.location.reload(false);
              }, 6000);
            }
          })

          .catch(function (error) {
            console.log(error);
            console.log(error.response);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      class="modal fade text-black"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-black" id="staticBackdropLabel">
              Create Lead
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Phone</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Designation</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => setDesignation(e.target.value)}
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Picture</label>
                <input
                  type="file"
                  class="form-control"
                  onChange={(e) => setPicture(e.target.files[0])}
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              onClick={(e) => onSubmit(e)}
            >
              Create
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ModalForm;

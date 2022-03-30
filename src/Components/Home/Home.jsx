/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext, useEffect, useState } from "react";
import ModalForm from "./ModalForm/ModalForm";
import { RiPencilLine, RiEditBoxLine, RiDeleteBin7Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./home.css";

import { UserContext } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ReactPaginate from "react-paginate";
const Home = () => {
  const { modals } = useContext(UserContext);
  const [showModal, setShowModal] = modals;
  console.log(showModal);
  let history = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://leadapiapp.herokuapp.com/lead/list`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          // setPage(data);
          // setData(data.results);
          setData(data);
        }
      });
  }, []);

  const onDelete = (id) => {
    console.log(id);
    fetch(`https://leadapiapp.herokuapp.com/lead/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      // .then((res) => res.json())
      .then((data) => {
        console.log(data.status);
        if (data.status == 204) {
          toast.success("Lead Deleted Successfully", {
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
        } else {
          toast.error("Something went wrong", {
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
      });
  };

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 6;
  const pageVisited = pageNumber * usersPerPage;
  const displayUsers = data
    .slice(pageVisited, pageVisited + usersPerPage)
    .map((data) => {
      return (
        <tr>
          <th scope="row" className="text-center" key={data.id}>
            {data.id}
          </th>
          <td className="text-center">{data.name}</td>
          <td className="text-center">{data.email}</td>
          <td className="text-center">{data.phone}</td>
          <td className="text-center">{data.designation}</td>
          <td className="text-center">
            <img
              src={data.picture}
              alt="image"
              style={{ width: "30px", height: "30px" }}
            />
          </td>
          <td>
            <ul className="d-flex justify-content-center me-4 text-center">
              <li className="me-3">
                <Link to={`edit/${data.id}`}>
                  {" "}
                  <RiEditBoxLine />
                </Link>
              </li>

              <li onClick={() => onDelete(data.id)}>
                <RiDeleteBin7Line />
              </li>
            </ul>
          </td>
        </tr>
      );
    });

  const pageCount = Math.ceil(data.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div className="container mt-5">
      <div>
        <button
          type="button"
          class="btn btn-primary "
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          onClick={() => setShowModal(true)}
        >
          <span className="me-2">
            <RiPencilLine size="25" />
          </span>
          Create Lead
        </button>
        <ModalForm />
      </div>
      <div>
        <table class="table table-dark table-striped mt-5">
          <thead className=" text-center">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Designation</th>
              <th scope="col">Picture</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{displayUsers}</tbody>
        </table>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          activeClassName={"paginationActive"}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;

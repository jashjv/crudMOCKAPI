import "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Update from "./update";

export default function App() {
  const [employeeData, setEmployeeData] = useState([]);
  const [name, setname] = useState("");
  const [page, setPage] = useState(1);
  const [id, setID] = useState();
  const [createdAt, setcreatedAt] = useState("");

  const navigate = useNavigate();

  const employeeDataUrl = `https://63fef55a571200b7b7d2b402.mockapi.io/users?_page=${page}&_limit=10`;

  const getEmployee = () => {
    axios
      .get(employeeDataUrl)
      .then((res) => {
        setEmployeeData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err, "somethimg wrong bro");
      });
  };

  useEffect(() => {
    getEmployee();
  }, [page]);


  const createUser = () => {
    axios
      .post(employeeDataUrl, {
        name: name,
        createdAt: createdAt
      })
      .then((res) => {
        console.log(res);
        getEmployee();
        employeeData(res.data);
      })
      .catch((err) => {
        console.log(err, "wrong done the post");
      });
  };

  const handleSubmit = (e) => {
    createUser();
    e.preventDefault();
  };

  const updateUser = (id) => {
    console.log(id);
    axios
      .put(`https://63fef55a571200b7b7d2b402.mockapi.io/users/${id}`, {
        name: name,
        createdAt: createdAt
      })
      .then((res) => {
        console.log(res);
        getEmployee();
      })
      .catch((err) => {
        console.log(err, "error in updating");
      });
  };

  const deleteUser = (id) => {
    console.log(id);
    axios
      .delete(`https://63fef55a571200b7b7d2b402.mockapi.io/users/${id}`)
      .then(() => {
        getEmployee();
      })
      .catch((err) => {
        console.log(err, "user not deleted");
      });
  };

  const handlePageClick = (data) => {
    console.log(data.selected + 1);
    setPage(data.selected + 1);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/update" element={<Update />} />
      </Routes>
      {employeeData.map((elm) => (
        <div
          style={{ border: "1px solid green", margin: "2rem", padding: "2rem" }}
        >
          <span key={elm.id}>{elm.id}</span>
          <h3>{elm.name}</h3>
          <h3>{elm.createdAt}</h3>
          <img src={elm.avatar} />
          <div>
            <br />
            <button type="submit" onClick={() => deleteUser(elm.id)}>
              delete a user
            </button>
            <button type="submit" onClick={() => updateUser(elm.id)}>
              update a user
            </button>
          </div>
        </div>
      ))}
      <form>
        <input
          placeholder="name"
          type="text"
          onChange={(e) => setname(e.target.value)}
        />
        <div>
          <input
            placeholder="created"
            type="text"
            onChange={(e) => setcreatedAt(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          create a user
        </button>

        <form>
          <input
            placeholder="name"
            type="text"
            onChange={(e) => setname(e.target.value)}
          />
          <div>
            <input
              placeholder="created"
              type="text"
              onChange={(e) => setcreatedAt(e.target.value)}
            />
          </div>
          <button type="submit" onClick={() => updateUser(id)}>
            edit a user
          </button>
        </form>
      </form>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={25}
        pageCount={10}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

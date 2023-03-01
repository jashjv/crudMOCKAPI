import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';


// type employee = [
//     name?: string;
//     website:string
//     id?: number;
// ]

export default function DeleteForm() {
    const [employeeData, setEmployeeData] = useState([]);
    // const [name, setname] = useState("");
    // const [company, setCompany] = useState("");
    const [id, setID] = useState();

    useEffect(() => {
        getEmployee();
    }, []);

    const employeeDataUrl = `https://jsonplaceholder.typicode.com/posts`;

    const deleteEmployeeUrl = `https://jsonplaceholder.typicode.com/posts/${id}`

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

    // const createUser = () => {
    //   axios
    //     .post(employeeDataUrl, {
    //       name: name,
    //       company: company
    //     })
    //     .then((res) => {
    //       console.log(res);
    //       employeeData(res.data);
    //     })
    //     .catch((err) => {
    //       console.log(err, "wrong done");
    //     });
    // };

    const handleSubmit = (e: { preventDefault: () => void; }, data: any) => {
        e.preventDefault();
        // setID(e.data)
        // createUser();
    };

    const deleteUser = () => {
        axios.delete(deleteEmployeeUrl).then((res: any) => console.log(res))
            .catch((err:any) => {
                console.log(err, 'user not deleted')
            });
    };

    return (
        <div className="App">
            hey
            {employeeData.map((elm: { id: React.Key | null | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; body: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
                <div style={{ border: '1px solid green', margin: "2rem", padding: "2rem" }}>
                    <span>{elm.id}</span>
                    <h3 key={elm.id}>{elm.title}</h3>
                    <h5>{elm.body}</h5>
                    <button type="submit" onClick={deleteUser}>
                        delete this
                    </button>
                </div>
            ))}
            {/* <form>
          <input
            placeholder="name"
            type="text"
            onChange={(e) => setname(e.target.value)}
          />
          <div>
            <input
              placeholder="company"
              type="text"
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          
        </form>
        show created user
        <div>
          {name}
          {company}
        </div> */}
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                // onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                // pageCount={pageCount}
                previousLabel="< previous"
                pageCount={0}        // renderOnZeroPageCount={null}
      />
        </div>
    );
}
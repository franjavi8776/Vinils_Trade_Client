import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { getReviews } from "../../redux/actions";
import { Link } from "react-router-dom";

const Reviews = () => {
  const reviews = useSelector((state) => state.reviews);
  const dispatch = useDispatch();

  const [filterEmail, setFilterEmail] = useState("");

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);

  const columns = [
    {
      name: "Email",
      selector: (row) => row.email || "No especificado",
      sortable: true,
    },
    {
      name: "Comentario",
      selector: (row) => row.comment || "No especificado",
      sortable: true,
    },
    {
      name: "Calificacion",
      selector: (row) => row.rating || "No especificado",
      sortable: true,
    },
  ];

  const filterByEmail = (userEmail, searchTerm) => {
    const regex = new RegExp(`\\b${searchTerm}\\b`, "i");
    return regex.test(userEmail);
  };

  const filteredUsers = reviews.filter((user) =>
    filterByEmail(user.email, filterEmail.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full h-full md:flex-row">
      <div className="md:w-full px-2">
        <div className="flex h-[8vh]  items-center pl-5">
          <div>
            <div className="w-[150px] h-[50px] clip-path-custom bg-slate-900 flex items-center justify-end ">
              <Link to="/dashboard">
                <h1 className="text-white pr-2">Volver al Inicio</h1>
              </Link>
            </div>
          </div>
          <h1 className="ml-[35%] text-2xl font-bold">Lista de reviews</h1>
        </div>

        {/* <input
          type="text"
          placeholder="Buscar por nombre"
          //value={filterText}
          //onChange={(e) => setFilterText(e.target.value)}
          className="w-full border text-red-700 border-black p-2 rounded mb-4"
        /> */}
        {/* <input
          type="text"
          placeholder="Buscar por Pais"
          value={filterCountry}
          onChange={(e) => setFilterCountry(e.target.value)}
          className="w-full border text-red-700 border-black p-2 rounded mb-4"

        />
        <input

        /> */}
        <input
          type="text"
          placeholder="Buscar por Email"
          value={filterEmail}
          onChange={(e) => setFilterEmail(e.target.value)}
          className="w-full border text-red-700 border-black p-2 rounded mb-4"
        />
        <DataTable columns={columns} data={filteredUsers} pagination />
      </div>
    </div>
  );
};

export default Reviews;

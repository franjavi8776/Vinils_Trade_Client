import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
// import { updateVinyl, disableVinyl, deleteVinyl } from "./"; 
import { AiOutlineDelete } from "react-icons/ai";
import {getUsersAndSuccess, deleteUser, disableUser } from "../../redux/actions";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";


const UserList = () => {
  const Users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  console.log(Users)
  const [filterText, setFilterText] = useState("");
  // const [filterCountry,setFilterCountry]=useState("");
  const [filterEmail, setFilterEmail] = useState("");

  useEffect(() => {
    // Cargar la lista de usuarios cuando el componente se monte
    dispatch(getUsersAndSuccess());
  }, [dispatch]);

  // tabla
  const columns = [
    {
      name: "id",
      selector: (row) => row.id || "No especificado",
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.name || "No especificado",
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email || "No especificado",
      sortable: true,
    },
    {
      name: "phoneNumber",
      selector: (row) => row.phoneNumber || "No especificado",
      sortable: true,
    },
    {
      name: "Ciudad",
      selector: (row) => row.city || "No especificado",
      sortable: true,
    },
    {
      name: "pais",
      selector: (row) => row.country || "No especificado",
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleDelete(row)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
           <AiOutlineDelete/>
          </button>
          <button
            onClick={() => handleDisable(row)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Desactivar
          </button>
          <button
            onClick={() => handleDisable(row)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = (row) => {
    dispatch(deleteUser(row.id)); 
  };

  const handleDisable = (row) => {
    // Lógica para deshabilitar el vinilo
    dispatch(disableUser(row.id));
  };


  // const filteredUsers = Users.filter((user) =>
  //   user.name.toLowerCase().includes(filterText.toLowerCase())
  // );
  // const filteredCountry=Users.filter((user)=>
  //   user.country.toLowerCase().includes(filterCountry.toLowerCase())
  // );
  // const filteredEmail=Users.filter((user)=>
  //   user.email.toLowerCase().includes(filterEmail.toLowerCase())
  // );
  const filterByEmail = (userEmail, searchTerm) => {
    const regex = new RegExp(`\\b${searchTerm}\\b`, "i");
    return regex.test(userEmail);
  };

  const filteredUsers = Users.filter(
    (user) =>
      user.name.toLowerCase().includes(filterText.toLowerCase()) &&
      // user.country.toLowerCase().includes(filterCountry.toLowerCase()) &&
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
          <h1 className="ml-[35%] text-2xl font-bold">Lista de usuarios</h1>
        </div>

        <input
          type="text"
          placeholder="Buscar por nombre"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full border text-red-700 border-black p-2 rounded mb-4"
        />
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

export default UserList;

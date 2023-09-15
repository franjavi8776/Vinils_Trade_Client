import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getUsersAndSuccess } from "../../redux/actions";

const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
  
    useEffect(() => {
      // Cargar la lista de usuarios cuando el componente se monte
      dispatch(getUsersAndSuccess());
    }, [dispatch]);
  
    // const handleDisableUser = (userId) => {
    //   // Lógica para deshabilitar un usuario
    //   dispatch(disableUser(userId));
    // };
  
    return (
      <div>
        <h2>Lista de Usuarios</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Número</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>
                  <button > 
                  {/* onClick={() => handleDisableUser(user.id)} */}
                    Deshabilitar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default UserList;
import React from 'react';
import { doc, deleteDoc } from "firebase/firestore";
import { getDb } from '../../config/firestore';
import Swal from 'sweetalert2';

const Table = ({ employees, handleEdit, handleDelete }) => {
  const handleDeleteEmployee = async (id) => {
    try {
      const db = await getDb();
      await deleteDoc(doc(db, "employees", id));
      handleDelete(id);
    } catch (error) {
      console.error("Error deleting document: ", error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to delete employee.',
        showConfirmButton: true
      });
    }
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: null,
  });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Date</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees ? (
            employees.map((employee, i) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{formatter.format(employee.salary)}</td>
                <td>{employee.date} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(employee.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDeleteEmployee(employee.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
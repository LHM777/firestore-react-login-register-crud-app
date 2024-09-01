import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { getDb } from '../../config/firestore'
import { useRef } from 'react';
import { getEmployees } from '../../services/firebase'; // Adjust the path as needed

const Dashboard = ({ setIsAuthenticated }) => {
  const [employees, setEmployees] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fetchRef = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = await getDb();
        const employeesCol = collection(db, 'employees');
        const snapshot = await getDocs(employeesCol);
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEmployees(list);
      } catch (error) {
        console.error("Error fetching employees:", error);
        // Optionally, show an error message to the user
      }
    };
    fetchData();
  }, []);

  const handleEdit = id => {
    const [employee] = employees.filter(employee => employee.id === id);

    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      if (result.value) {
        try {
          const db = await getDb();
          await deleteDoc(doc(db, "employees", id));

          const [employee] = employees.filter(employee => employee.id === id);
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
            showConfirmButton: false,
            timer: 1500,
          });

          const employeesCopy = employees.filter(employee => employee.id !== id);
          setEmployees(employeesCopy);
        } catch (error) {
          console.error("Error deleting document: ", error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to delete employee.',
            showConfirmButton: true,
          });
        }
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            employees={employees}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          employees={employees}
          setEmployees={setEmployees}
          setIsAdding={setIsAdding}
          getEmployees={getEmployees}
        />
      )}
      {isEditing && (
        <Edit
          employees={employees}
          selectedEmployee={selectedEmployee}
          setEmployees={setEmployees}
          setIsEditing={setIsEditing}
          getEmployees={getEmployees}
        />
      )}
    </div>
  );
};

export default Dashboard;

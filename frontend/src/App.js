import React, { useEffect, useState } from "react";
import UpdateForm from "./components/edit";
import AddUser from "./components/Add";
import { Link } from "react-router-dom";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE3MTE5NTE0MTAsImV4cCI6MTcxMTk1NTAxMH0.jYWawa64TtbaaV-b0kAQgFg9rQYiQ9OaoTaEYsFr9Ro"

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/all`,
    header:{
      authorization:token,
      Accept: 'application/json',
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        console.log(data)
        
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  function addData(user) {
    setUsers([...users, user]);
  }

  const handleUpdate = (userId, updatedData) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, ...updatedData } : user
    );
    setUsers(updatedUsers);

    alert("Updated User Data:", updatedData);
  };

  const handleDelete = (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);

      alert("Deleted");
    }
  };

  return (
    <div className="container">
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
        <Link >
          <div className="text-center">
            <AddUser addData={addData} />
          </div>
          </Link>
          <h1 className="text-center">Users List</h1>
          <table className="table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Hobbies</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    <img
                      src={user.profilePic}
                      alt="User Avatar"
                      width="100"
                      height="70"
                    />
                  </td>
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td>{user.email}</td>
                  <td>{user.hobbies}</td>
                  <td>{user.gender}</td>
                  <td>
                    <a href="#update">
                    <button
                      type="button"
                      className="btn btn-primary m-2"
                      onClick={() => setSelectedUser(user)}
                    >
                      Update
                    </button>
                    </a>
                    <button
                      type="button"
                      className="btn btn-danger m-2"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedUser && (
            <div className="mt-4" id="update">
              <h2 className="text-center">Update User</h2>
              <UpdateForm user={selectedUser} onUpdate={handleUpdate} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
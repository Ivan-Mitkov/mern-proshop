import React, {  useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/message";
import Loader from "../components/loader";
import { getAllUsers } from "../actions/userActions";

const UserListScree = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.userList);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  const deleteHandler = (userId) => {};
  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>
                      <a
                        href={`mailto:${user.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {user.email}
                      </a>
                    </td>
                    <td>
                      {user.isAdmin ? (
                        <i
                          className="fas fa-check"
                          style={{ color: "green" }}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`user/${user._id}/edit`}>
                        <Button variant="light" size="sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScree;

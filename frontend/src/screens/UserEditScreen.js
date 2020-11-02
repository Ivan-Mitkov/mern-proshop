import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/formcontainer";
import Message from "../components/message";
import Loader from "../components/loader";
import { getUserDetails } from "../actions/userActions";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetail);
  //getting from redux state
  const { loading, error, user } = userDetails;
  //if already logged in redirect
  useEffect(() => {
    //if there is no user or user id doesn't match te id in url
    //get the user
    if (!user || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      //there is an user
      setEmail(user.email);
      setName(user.name);
      setIsAdmin(user.isAdmin);
    }
  }, [user, userId, dispatch]);

  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loading ? (
          <Loader></Loader>
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;

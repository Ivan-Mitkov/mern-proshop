import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/formcontainer";
import Message from "../components/message";
import Loader from "../components/loader";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_ADMIN_RESET } from "../constants/userConsts";
const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetail);
  const { loading, error, user } = userDetails;
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = userUpdate;
  //if already logged in redirect
  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: USER_UPDATE_ADMIN_RESET });
      history.push("/admin/userlist");
    } else {
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
    }
  }, [user, userId, dispatch, updateSuccess, history]);

  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = (e, user) => {
    e.preventDefault();
    dispatch(updateUser({ _id: user._id, name, isAdmin, email }));
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {updateLoading && <Loader />}
        {updateError && <Message variant="danger">{error}</Message>}
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

            <Button
              type="submit"
              variant="primary"
              onClick={(e) => handleSubmit(e, user)}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;

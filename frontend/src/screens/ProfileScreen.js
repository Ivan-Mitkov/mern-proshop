import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/message";
import Loader from "../components/loader";
import { getUserDetails, updateUserDetails } from "../actions/userActions";
import { getMyOrders } from "../actions/orderActions";
import { USER_UPDATE_RESET } from "../constants/userConsts";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetail = useSelector((state) => state.userDetail);
  const { loading, error, user } = userDetail;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdateDetail = useSelector((state) => state.userUpdateDetail);
  const { success } = userUpdateDetail;
  const myOrders = useSelector((state) => state.orderListMy);
  const { orders, loading: loadingOrders, error: errorOrders } = myOrders;

  useEffect(() => {
    //check if user is logged in
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        // if no user or user already updated get user and empty state in userUpdateDetail
        dispatch({ type: USER_UPDATE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(getMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserDetails({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">Profile updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader></Loader>
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table
            variant="dark"
            striped
            bordered
            hover
            responsive
            size="sm"
            style={{ textAlign: "center" }}
          >
            <thead>
              <tr>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, i) => {
                const date = new Date(item.createdAt);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();

                return (
                  <tr key={item._id}>
                    <td>{`${day}/${month}/${year}`}</td>
                    <td>${item.totalPrice}</td>
                    <td>
                      {item.isPaid ? (
                        item.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{
                            color: "red",
                            width: "100%",
                          }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {item.isDelivered ? (
                        item.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{
                            color: "red",
                          }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/orders/${item._id}`}>
                        <Button variant="outline-light" size="sm">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;

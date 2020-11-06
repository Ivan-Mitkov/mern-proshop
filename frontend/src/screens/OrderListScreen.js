import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/message";
import Loader from "../components/loader";
import { getAllOrders } from "../actions/orderActions";

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { orders, loading, error } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    //if not admin don't get user
    //clear created product from state

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    } else {
      dispatch(getAllOrders());
    }
    // eslint-disable-next-line
  }, [dispatch, userInfo, history]);

  //if admin logout or notadmin try
  if ((userInfo && !userInfo.isAdmin) || !userInfo)
    return <h1>Not Authorized</h1>;
  else {
    return (
      <>
        <Row className="align-items-center">
          <Col>
            <h1>Orders</h1>
          </Col>
        </Row>

        {loading ? (
          <Loader></Loader>
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Table striped bordered hover responsive size="sm" variant="dark">
            <thead>
              <tr>
                <th>USER</th>
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
                    <td>{item.user && item.user.name}</td>
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
      </>
    );
  }
};

export default ProductListScreen;

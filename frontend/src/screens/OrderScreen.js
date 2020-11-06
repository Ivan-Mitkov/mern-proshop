import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/message";
import Loader from "../components/loader";
import { getOrderDetails } from "../actions/orderActions";
import { confirmPayment } from "../actions/cartActions";
import { payOrder, deliverOrder } from "../actions/orderActions";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../constants/orderConsts";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { success } = useSelector((state) => state.orderPay);
  const { order, loading, error } = orderDetails;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  //Calculate Prices
  if (order) {
    order.itemsPrice = Number(
      order.orderItems.reduce((a, b) => a + b.price * b.qty, 0).toFixed(2)
    );
  }
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (!order || success || order._id !== orderId || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [order, orderId, dispatch, success, successDeliver]);

  const handleConfirm = () => {
    dispatch(confirmPayment());
    dispatch(payOrder(orderId));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };
  return loading ? (
    <Loader></Loader>
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Orders</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {order.user.email}
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}
              </p>
              <p>
                <strong>City: </strong>
                {order.shippingAddress.city}
              </p>
              <p>
                <strong>Country: </strong>
                {order.shippingAddress.country}
              </p>
              <p>
                <strong>Postal Code: </strong>
                {order.shippingAddress.postalCode}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on: {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on: {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length > 0 ? (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => {
                    return (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={3}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            ></Image>
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = $
                            {Number((item.qty * item.price).toFixed(2))}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              ) : (
                <Message>Your order is empty</Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {!order.isPaid && (
                  <Button variant="primary" onClick={handleConfirm}>
                    Confirm Payment
                  </Button>
                )}
              </ListGroup.Item>
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    {!order.isDelivered && (
                      <Button variant="primary" onClick={deliverHandler}>
                        Mark as Delivered
                      </Button>
                    )}
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import Rating from "../components/rating";
import {
  getProductDetail,
  createProductReview,
} from "../actions/productActions";
import Spinner from "../components/loader";
import Message from "../components/message";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConsts";

const ProductScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const productDetail = useSelector(
    (state) => state.productDetail,
    shallowEqual
  );
  const { product, loading, error } = productDetail;
  const productReviewCreate = useSelector(
    (state) => state.productReviewCreate,
    shallowEqual
  );
  const {
    success: reviewCreateSuccess,
    error: reviewCreateError,
  } = productReviewCreate;
  //user must be logged in to review
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (reviewCreateSuccess) {
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      setRating(0);
      setComment("");
    }
    dispatch(getProductDetail(match.params.id));
  }, [dispatch, match, reviewCreateSuccess]);
  const handleChange = (e) => {
    setQty(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const handleReview = (e) => {
    e.preventDefault();
    dispatch(createProductReview(match.params.id, { rating, comment }));
  };

  const handleRating = (e) => {
    setRating(e.target.value);
  };

  const handleComment = (e) => {
    setComment(e.target.value);
  };
  const inStock = product.countInStock > 0 ? "In Stock" : "Out Of Stock";
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go back
      </Link>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid></Image>
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h5>{product.name}</h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={` ${product.numReviews} reviews`}
                    color="#FA8320"
                  ></Rating>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div>$ {product.price}</div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div>{product.description}</div>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>$ {product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>{inStock}</Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity:</Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={handleChange}
                        >
                          {[...Array(product.countInStock).keys()].map((q) => (
                            <option key={q + 1} value={q + 1}>
                              {q + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="btn-block "
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={handleSubmit}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => {
                  return (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  );
                })}
                <ListGroup.Item variant="flush">
                  <h2>Write Review</h2>
                  {reviewCreateError && (
                    <Message variant="danger">{reviewCreateError}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={handleReview}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={handleRating}
                        >
                          <option value="">Select...</option>
                          <option value={1}>1 - Poor</option>
                          <option value={2}>2 - Fair</option>
                          <option value={3}>3 - Good</option>
                          <option value={4}>4 - Very Good</option>
                          <option value={5}>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          value={comment}
                          raw={3}
                          onChange={handleComment}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please{" "}
                      <Link to="/login">
                        <strong>login </strong>
                      </Link>
                      to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;

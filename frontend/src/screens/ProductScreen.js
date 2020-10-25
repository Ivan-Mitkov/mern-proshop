import React, {  useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import Rating from "../components/rating";
import { getProductDetail } from "../actions/productActions";
import Spinner from "../components/loader";
import Message from "../components/message";

const ProductScreen = ({ match }) => {
  const dispatch = useDispatch();

  const productDetail = useSelector(
    (state) => state.productDetail,
    shallowEqual
  );
  const { product, loading, error } = productDetail;
  useEffect(() => {
    const getProduct = async () => {
      try {
        dispatch(getProductDetail(match.params.id));
        console.log("Use effect product");
      } catch (error) {
        console.error(error.message);
      }
    };
    getProduct();
  }, [dispatch,match]);

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
                <ListGroup.Item>
                  <Button
                    className="btn-block "
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;

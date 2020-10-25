import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Product from "../components/product";
import { listProducts } from "../actions/productActions";
import Spinner from "../components/loader";
import Message from "../components/message";
const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
    console.log("Use effect", products);
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products &&
            products.map((product, i) => {
              return (
                <Col key={product._id}>
                  <Col sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                </Col>
              );
            })}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;

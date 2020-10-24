import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Product from "../components/product";
const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    getProducts();
  }, []);
  return (
    <>
      <h1>Latest Products</h1>
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
    </>
  );
};

export default HomeScreen;

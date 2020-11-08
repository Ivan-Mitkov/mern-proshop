import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "../loader";
import Message from "../message";
import { listTopProducts } from "../../actions/productActions";
import "./styles.css";

const ProductCaroussel = () => {
  const dispatch = useDispatch();
  const productTop = useSelector((state) => state.productTop);
  const { products, loading, error } = productTop;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader></Loader>
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products &&
        products.map((p) => {
          return (
            <Carousel.Item key={p._id}>
              <Link to={`/product/${p._id}`}>
                <Image src={p.image} alt={p.name} fluid></Image>
                <Carousel.Caption className="carousel-caption">
                  <h2>
                    {p.name} ({p.price})
                  </h2>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          );
        })}
    </Carousel>
  );
};

export default ProductCaroussel;

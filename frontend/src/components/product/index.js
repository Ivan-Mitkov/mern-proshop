import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
const Product = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <Card className="my-3 p-3 rounded" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title as="h5">
            <strong>{product.name}</strong>
          </Card.Title>
          <Card.Text as="div">
            <div className="my-3">
              {" "}
              {product.rating} from {product.numReviews} reviews
            </div>
          </Card.Text>
          <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default Product;

import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Product from "../components/product";
import { listProducts } from "../actions/productActions";
import Spinner from "../components/loader";
import Message from "../components/message";
import Paginate from "../components/paginate";
import ProductCaroussel from "../components/productCaroussel";
import Meta from "../components/meta";

const HomeScreen = ({ match }) => {
  const dispatch = useDispatch();
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const productList = useSelector((state) => state.productList, shallowEqual);
  //get page and pages for pagination
  const { products, loading, error, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
    // console.log("Use effect Home");
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword && <ProductCaroussel />}
      {keyword ? <h1>Search Results</h1> : <h1>Latest Products</h1>}
      {!loading && products.length === 0 && (
        <Message>Can not find products</Message>
      )}
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
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
          <Paginate
            page={page}
            pages={pages}
            keyword={keyword ? keyword : ""}
          ></Paginate>
        </>
      )}
    </>
  );
};

export default HomeScreen;

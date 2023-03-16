import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactPaginate from "react-paginate";

const Navbars = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const url = `https://jsonplaceholder.typicode.com/photos?_page=1`;
    const fetchData = async () => {
      const response = await axios.get(url);
      setData(response.data);

      const total = response.headers.get("x-total-count");
      setCount(Math.ceil(total / 10));
    };
    fetchData();
  }, [count]);

  const fetchDataSec = async (value) => {
    const url = `https://jsonplaceholder.typicode.com/photos?_page=${value}`;
    const response = await axios.get(url);
    return response.data;
  };

  const handlePageClick = async (e) => {
    const value = e.selected + 1;
    const data = await fetchDataSec(value);
    setData(data);
    window.scrollTo(0, 0);
  };

  return (
    <Container>
      <h3 className="m-4">React Pagination With Api</h3>
      <Row>
        {data &&
          data.map((i) => (
            <Col key={i.id} className="m-4">
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={i.thumbnailUrl} />
                <Card.Body>
                  <Card.Title>{i.id}</Card.Title>
                  <Card.Text>{i.title}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
      <Row>
        <Col>
          <ReactPaginate
            breakLabel="..."
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            nextLabel=">>"
            onPageChange={handlePageClick}
            pageRangeDisplayed={4}
            pageCount={count}
            previousLabel="<<"
            marginPagesDisplayed={1}
            containerClassName={"pagination justify-content-center"}
            pagination={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Navbars;

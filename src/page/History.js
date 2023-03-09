import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import { getHistory } from "../helper/api";

function History() {

  const [vid, setVid] = useState([]);
  const [loader, setLoader] = useState(true);

  const fetchHistory = async () => {
    const his = await getHistory()
    setVid(his)
    setLoader(false)
  }
  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line
  }, [])
  return (
    <Container fluid className="viewContainer p-0">
      <div className="mt-4 p-4">
        <h2 className="">
          History
          <hr />
        </h2>
        <Loader loading={loader} />
        <div className="mt-3 ">
          <Row>
            {vid && vid.map((i, index) => {
              return (
                <Col lg={3} className="mb-4" key={"index"}>
                  <div className="card">
                    <div className="card-header">{i.bucketType}</div>
                    <div className="card-body">
                      <h6 className="card-title">{i.title}</h6>
                    </div>

                    <div className="card-body">
                      <h5>{(i.track / 60).toFixed(2)} Minute played!</h5>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </Container>
  );
}

export default History;

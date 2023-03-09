import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import {
  deleteVideo,
  getBucket,
  getVid,
  updateVideoById,
  deleteBucketComplete
} from "../helper/api";
import { Link } from "react-router-dom";
function View() {



  const [vid, setVid] = useState([]);
  const [loader, setLoader] = useState(true);

  const [bucketType, setBucketType] = useState([]);

  // move
  const moveVid = async (id, item, type) => {
    const edit = {
      title: item.title,
      link: item.link,
      bucketType: type
    }
    const data = await updateVideoById(id, edit);
    window.location.reload();
  }


  // delete bucket
  const deleteBucket = async (id, type) => {
    const check = window.confirm('Are you sure you want to delete this bucket')
    if (check) {
      const data = await deleteBucketComplete(id, type)
      window.location.reload();
    } else {
      return
    }

  }


  // delete
  const deleteVid = async (id) => {
    const data = await deleteVideo(id);
    window.location.reload();

  };

  //fetch video
  const fetchVideo = async () => {
    const video = await getVid();
    setVid(video);
    setLoader(false);
  };
  const fetchBucket = async () => {
    const bucketType = await getBucket();
    setBucketType(bucketType);
  };
  useEffect(() => {
    fetchVideo();
    fetchBucket();
    // eslint-disable-next-line
  }, []);

  return (
    <Container fluid className="viewContainer p-0">
      {
        vid.length > 0 ? bucketType &&
          bucketType.map((b, index) => {
            return (
              <div className="mt-4 p-4">
                <h2 className="">
                  {b.bucketType} <button className="btn btn-danger" onClick={() => deleteBucket(b.id, b.bucketType)}>Delete Bucket</button>
                  <hr />
                </h2>
                <Loader loading={loader} />
                <div className="mt-3 ">
                  <Row>
                    {vid.map((i, index) => {
                      return i.bucketType === b.bucketType ? (
                        <Col lg={3} className="mb-4">
                          <div className="card">
                            <div className="card-header">{i.bucketType}</div>
                            <div className="card-body">
                              <h6 className="card-title">{i.title}</h6>
                            </div>

                            <div className="card-body actionBtn d-flex justify-content-between">
                              <Link to={`/edit/${i.id}`}>
                                <button type="button" className="btn btn-warning">
                                  Edit
                                </button>
                              </Link>
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => deleteVid(i.id)}
                              >
                                Delete
                              </button>
                              <div class="btn-group">
                                <button
                                  type="button"
                                  class="btn btn-info dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  Move
                                </button>
                                <ul class="dropdown-menu">


                                  {
                                    bucketType.map((item, index) => {
                                      return <li className="dropdown-item" value={item.bucketType} key={index} onClick={() => moveVid(i.id, i, item.bucketType)}>{item.bucketType}</li>

                                    })
                                  }

                                </ul>
                              </div>
                            </div>
                          </div>
                        </Col>
                      ) : (
                        ""
                      );
                    })}
                  </Row>
                </div>
              </div>
            );
          }) : <div className="m-5">

          <h3>No Data!</h3>
          <button className="mt-3 btn btn-primary" data-bs-toggle="modal" data-bs-target="#addPlayer">Add New</button>
        </div>
      }
    </Container>
  );
}

export default View;

import React, { useEffect, useState, } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import image from "../assets/m1.jpg"
import { getVid, postHistoryData, setTrackTime } from '../helper/api';
import Loader from '../components/Loader';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function Home() {
    const [link, setLink] = useState("")
    const [vid, setVid] = useState([]);
    const [loader, setLoader] = useState(true);
    const [show, setShow] = useState(false);
    const [track, setTrack] = useState(0);
    const [vidId, setVidId] = useState("");
    const [fileType, setFileType] = useState("");

    // refs
    const handleClose = async () => {
        // track watch time
        setShow(false)
        const data = await setTrackTime(vidId, track);

    }
    const openVid = async (link, id) => {
        setShow(true)
        setVidId(id)
        setFileType(link.split('.').pop().toUpperCase());

        const data = await postHistoryData(id)
        setLink(link)
    }

    const fetchBucket = async () => {
        const vid = await getVid()
        setVid(vid)
        setLoader(false)
    }

    useEffect(() => {
        fetchBucket();
        // eslint-disable-next-line
    }, [])


    useEffect(() => {

        const interval = setInterval(() => {
            const video = document.querySelector("#video")
            if (video && video.currentTime <= video.duration) {
                setTrack(video.currentTime)
            }
        }, 1000);
        return () => clearInterval(interval)

        // eslint-disable-next-line
    }, [track])

    return (
        <>
            <Container fluid className="p-0">

                <div>
                    <Modal
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        show={show} onHide={() => handleClose()} animation={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                You are playing vid!
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            {
                                fileType === 'MP4' ? <video width={"100%"} id="video" src={link} controls autoPlay mute />
                                    : <audio width={"100%"} id="video" controls src={link} controlsautoPlay mute />

                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => handleClose()}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src={image} class="d-block w-100" alt="..." />
                            </div>
                            <div class="carousel-item">
                                <img src={image} class="d-block w-100" alt="..." />
                            </div>
                            <div class="carousel-item">
                                <img src={image} class="d-block w-100" alt="..." />
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                    <div className="p3">
                        <Loader loader={loader} />
                    </div>

                    {
                        vid.length > 0 ? <div className="mt-4 p-4">
                            <h2>Your Videos!</h2>
                            <div className="mt-3 ">
                                <Row>
                                    {
                                        vid && vid.map((i, index) => {
                                            return (
                                                <Col lg={3} className="mb-4" key={index} onClick={() => openVid(i.link, i.id)}>
                                                    <div class="card" type="button">
                                                        <div class="card-header">
                                                            {i.bucketType}
                                                        </div>

                                                        <div class="card-body">
                                                            <h6 class="card-title">{i.title}</h6>
                                                        </div>
                                                    </div>

                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                            </div>
                        </div> : <h2 className='m-5'>No Data!</h2>
                    }
                </div>

            </Container>

        </>
    )
}

export default Home
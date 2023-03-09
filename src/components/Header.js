import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AiOutlinePlus } from "react-icons/ai"
import { v4 as uuidv4 } from 'uuid';
import { addBucket, addVideo, getBucket } from '../helper/api';
function Header() {
    const [bucket, setBucket] = useState({
        id: uuidv4(),
        bucketType: ""
    })
    const [vid, setVid] = useState({
        title: "",
        link: "",
        bucketType: "",
        id: uuidv4(),
        date: new Date().toLocaleDateString(),
    })
    const [bucketType, setBucketType] = useState([])


    const addBucketBtn = async () => {
        if (bucket.bucketType !== '') {
            const data = await addBucket(bucket)
            alert("bucket add successfully!")
            console.log(data);
            fetchBucket()

        } else {
            alert("Please enter a bucket")
        }
    }

    const bucketHandleChange = (e) => {
        setBucket({ ...bucket, bucketType: e.target.value })
    }


    // add video/mp3
    const handleAddVid = (e) => {
        const value = e.target.value
        const name = e.target.name
        setVid({ ...vid, [name]: value })
    }
    const selectChange = (e) => {
        setVid({ ...vid, bucketType: e.target.value })
    }
    const addVidBtn = async () => {
        if (vid.title && vid.link && vid.bucketType) {
            const data = await addVideo(vid)
            alert("vid add successfully!")
            window.location.reload()
        } else {
            alert("please fill all field!")
        }
    }

    const fetchBucket = async () => {
        const bucketType = await getBucket()
        setBucketType(bucketType)
    }

    useEffect(() => {
        fetchBucket();
        // eslint-disable-next-line
    }, [])

    return (
        <>

            <nav class="navbar navbar-expand-lg navbar-white bg-light fixed-top">
                <div class="container-fluid">
                    <div class="navbar-brand fw-bold" >
                        <Link to='/'>VideoPlayer</Link>
                    </div>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav d-flex align-items-center me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <NavLink to="/" class="nav-link active" aria-current="page" >
                                    Home
                                </NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink to="/view" class="nav-link active" aria-current="page" >
                                    View
                                </NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink to="/history" class="nav-link active" aria-current="page" >
                                    History
                                </NavLink>
                            </li>
                            <li class="mx-4">
                                <button class="btn btn-primary btn-" data-bs-toggle="modal" data-bs-target="#addPlayer">
                                    Create
                                </button>
                            </li>

                        </ul>

                        <div class="" title='add new bucket'>
                            <button class="btn btn-outline-success" type="submit" data-bs-toggle="modal" data-bs-target="#exampleModal"><AiOutlinePlus /></button>
                        </div>

                    </div>
                </div>
            </nav>
            {/*model for create */}
            <div class="modal fade" id="addPlayer" tabindex="-1" aria-labelledby="modelPlayer" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modelPlayer">
                                add video/audio!
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Title</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="name example"
                                    name="title"
                                    value={vid.title}
                                    onChange={handleAddVid}
                                />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">mp3/mp4 link</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="mp3/mp4 link"
                                    name='link'
                                    value={vid.link}
                                    onChange={handleAddVid}
                                />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">select Bucket</label>
                                <select class="form-select" aria-label="Default select example"
                                    onChange={selectChange}
                                >
                                    <option disabled selected>select bucket</option>
                                    {
                                        bucketType.map((item, index) => {
                                            return <option value={item.bucketType} key={index}>{item.bucketType}</option>

                                        })
                                    }
                                </select>

                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" onClick={() => addVidBtn()}>Add new</button>
                        </div>
                    </div>
                </div>
            </div>
            {/*model for create end */}


            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Add New Bucket!
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Add new Bucket</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="video/sport"
                                    value={bucket.bucketType} onChange={bucketHandleChange} />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" onClick={() => addBucketBtn()}>Add new</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Header
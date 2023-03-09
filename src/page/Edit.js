import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import { getBucket, getVideoById, updateVideoById } from "../helper/api";

function Edit() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [bucketType, setBucketType] = useState([])

    const [edit, setEdit] = useState({
        title: "",
        link: "",
        bucketType: "",
    })

    // add video/mp3
    const handleAddEdit = (e) => {
        const value = e.target.value
        const name = e.target.name
        setEdit({ ...edit, [name]: value })
    }
    const selectChangeEdit = (e) => {
        setEdit({ ...edit, bucketType: e.target.value })
    }

    const saveEditBtn = async () => {
        if (edit.title && edit.link) {
            const data = await updateVideoById(id, edit);
            alert("vid update successfully!")
            navigate("/view")
        } else {
            alert("please add link title!")
        }
    }


    const fetchVideo = async () => {
        const data = await getVideoById(id)
        setEdit({
            ...edit, ...data
        })
    }
    const fetchBucket = async () => {
        const bucketType = await getBucket()
        setBucketType(bucketType)
    }
    useEffect(() => {
        fetchVideo();
        fetchBucket()
        // eslint-disable-next-line
    }, [])


    return (
        <Container fluid className="p-0">
            <div className="box">

                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Title</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="name example"
                        name="title"
                        value={edit.title}
                        onChange={handleAddEdit}
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Link-mp3/mp4</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="link"
                        name='link'
                        value={edit.link}
                        onChange={handleAddEdit}
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">select Bucket</label>
                    <select class="form-select" aria-label="Default select example"
                        onChange={selectChangeEdit}
                    >
                        <option disabled selected>{edit.bucketType}</option>
                        {
                            bucketType.map((item, index) => {
                                return <option value={item.bucketType} key={index}>{item.bucketType}</option>

                            })
                        }


                    </select>

                </div>
                <div className='mt-4'>
                    <Button variant="primary" onClick={() => saveEditBtn()}>
                        Save Edit
                    </Button>
                </div>
            </div>
        </Container>
    )
}

export default Edit
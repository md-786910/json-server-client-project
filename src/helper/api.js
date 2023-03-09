import { baseUrl } from "./baseUrl";

// for bucket
export const addBucket = async (bucket) => {
    try {
        const { id, bucketType } = bucket
        const res = await fetch(`${baseUrl}/addBucket`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id, bucketType: bucketType })
        });
        const data = await res.json();
        return data;
    } catch (error) {
        return
    }
}
export const getBucket = async () => {
    try {
        const res = await fetch(`${baseUrl}/addBucket`);
        const data = await res.json();
        return data;
    } catch (error) {
        return
    }
}

// for video
export const addVideo = async (vid) => {
    try {

        const { id, title, link, bucketType } = vid
        const res = await fetch(`${baseUrl}/addVideo`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id, bucketType: bucketType, title: title, link: link })
        });
        const data = await res.json();
        return data;
    } catch (error) {
        return
    }
}
export const getVid = async () => {
    try {
        const res = await fetch(`${baseUrl}/addVideo`);
        const data = await res.json();
        return data;
    } catch (error) {
        return
    }
}
export const getHistory = async () => {
    try {
        const res = await fetch(`${baseUrl}/history`);
        const data = await res.json();
        return data;
    } catch (error) {
        return
    }
}
export const getHistoryById = async (id) => {
    try {
        const res = await fetch(`${baseUrl}/history/${id}`);
        const data = await res.json();
        return data;
    } catch (error) {
        return
    }
}

export const getVideoById = async (id) => {
    try {
        const res = await fetch(`${baseUrl}/addVideo/${id}`);
        const data = await res.json();
        return data;
    } catch (error) {
        return
    }
}
// delete
export const deleteVideo = async (id) => {
    try {
        const res = await fetch(`${baseUrl}/addVideo/${id}`, {
            method: "delete",
        });
        const data = await res.json();
        return data;
    } catch (error) {
        return
    }
}
export const deleteBucketComplete = async (id, type) => {
    try {
        console.log(id);
        console.log(type);
        const getTypeVid = await getVid()

        const deleteData = await getTypeVid.map(async (vid, index) => {
            return vid.bucketType === type ? await deleteVideo(vid.id) : null
        })
        const res = await fetch(`${baseUrl}/addBucket/${id}`, {
            method: "delete",
        });
        const data = await res.json();
        return data;
    } catch (error) {
        return
    }
}
// patch

export const updateVideoById = async (id, edit) => {
    try {
        const { title, link, bucketType } = edit

        const res = await fetch(`${baseUrl}/addVideo/${id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ bucketType: bucketType, title: title, link: link })
        });
        const data = await res.json();
        return data;
    } catch (error) {
        return
    }
}

// save to history
export const postHistoryData = async (id) => {
    try {
        const playVid = await getVideoById(id);

        const res = await fetch(`${baseUrl}/history`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(playVid)
        });
        const data = await res.json();
        return data;
    } catch (error) {
        return
    }
}
// save to track history
export const setTrackTime = async (id, track) => {
    try {
        const playVid = await getHistoryById(id);
        const res = await fetch(`${baseUrl}/history/${id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...playVid, track: track.toString() })
        });
        const data = await res.json();
        return data;
    } catch (error) {
        return
    }
}

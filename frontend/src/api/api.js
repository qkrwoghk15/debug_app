import axios from 'axios';
const API = axios.create();

export const ApiList = () => API.get("http://127.0.0.1:8000/api/");
export const ApiCreate = ((videoFile) => API.post("http://127.0.0.1:8000/api/create/", {
    original_video: "http://127.0.0.1:8000/upload/video"+videoFile,
    tracklet: "http://127.0.0.1:8000/upload/text/tracklet.txt",
    vehicle: "http://127.0.0.1:8000/upload/text/vehicle.txt",
}));

//https://velog.io/@ash3767/django-react-upload-image
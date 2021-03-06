import axios from 'axios';
const API = axios.create();

export const CarList = (videoName, index) => API.get(`http://127.0.0.1:8000/api/${videoName}/type=${index}`);
export const GetImage = (videoName, images) => API.get(`http://127.0.0.1:8000/api/${videoName}/frame=${images[0].frame}`);
export const APiGet = () => API.get("http://127.0.0.1:8000/api/");
export const ApiCreate = ((videoFile) => API.post("http://127.0.0.1:8000/api/create/", {
    original_video: videoFile,
}));

//https://velog.io/@ash3767/django-react-upload-image
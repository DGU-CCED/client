import axios from "axios";

const api = axios.create({
    baseURL: "ec2-52-79-235-201.ap-northeast-2.compute.amazonaws.com:3000",
});

export default api;
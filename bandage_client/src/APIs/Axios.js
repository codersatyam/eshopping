import axios from "axios";

const Axios = axios.create({ baseURL: "http://localhost:5002" });

export default Axios;

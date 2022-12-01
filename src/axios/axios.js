import axios from 'axios';

const clientHttp = axios.create({
  baseURL: "https://bp-todolist.herokuapp.com",
  // Si la petición toma más tiempo que `timeout`, esta será abortada.
  timeout: 30000,
});


export default clientHttp;
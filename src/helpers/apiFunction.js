import axios from "axios";

const API_URL = "http://localhost:5000/";

export const login = (send) => {
  let url = API_URL + "login";
  return axios
    .post(url, send, {
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
export const signup = (send) => {
  let url = API_URL + "signup";
  return axios
    .post(url, send, {
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
export const get_all_asm = (send) => {
  let url = API_URL + "asm";
  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const get_asm_byId = (send) => {
  let url = API_URL + "asm/" + send.id;
  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const post_asm = (send) => {
  let url = API_URL + "asm";
  return axios
    .post(url, send)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const edit_asm = (id, send) => {
  let url = API_URL + "asm_edit/" + id;
  return axios
    .post(url, send)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

import axios from "axios";

const API_URL = "http://localhost:5000/";

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

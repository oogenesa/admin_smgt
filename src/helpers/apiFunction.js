import axios from "axios";

import Cookies from "universal-cookie";
const API_URL = "http://localhost:5001/";

const cookies = new Cookies();
const logedin = cookies.get("jwt");

export const login = (send) => {
  let url = API_URL + "login";
  return axios
    .post(url, send, {
      withCredentials: true,
      headers: { crossDomain: true, "Content-Type": "application/json" },
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response.data;
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
export const get_all_asm = () => {
  let url = API_URL + "asm";
  return axios
    .get(url, {
      withCredentials: true,
    })
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

export const get_asm_byClass = (send) => {
  let url = API_URL + "asm_class/" + send.id;
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

export const get_menu = () => {
  let url = API_URL + "menu";
  return axios
    .get(url, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
export const get_gsm_byId = (send) => {
  let url = API_URL + "gsm/" + send.id;
  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
export const post_gsm = (send) => {
  let url = API_URL + "gsm";
  return axios
    .post(url, send)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const edit_gsm = (id, send) => {
  let url = API_URL + "gsm_edit/" + id;
  return axios
    .post(url, send)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
export const get_all_gsm = () => {
  let url = API_URL + "gsm";
  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const post_absensi_asm = (send) => {
  let url = API_URL + "asm_presence";

  return axios
    .post(url, send)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const get_gsm_service = (send) => {
  let url = API_URL + "gsm_service/" + send;
  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

import axios from "axios";

// TODO: TOKENS 
const setHeader = () => (token = null) => {
  if (token) { 
    axios.defaults.headers.common.authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.authorization;
  }
};

export default setHeader;
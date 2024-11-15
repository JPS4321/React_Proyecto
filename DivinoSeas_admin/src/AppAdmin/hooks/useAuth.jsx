import axios from 'axios';

const fetchProtectedData = async () => {
  const token = localStorage.getItem("token"); // O sessionStorage.getItem("token")

  const response = await axios.get("/api/protected-route", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};

export default fetchProtectedData;

import axios from "axios";

import { getItem } from "../tools/AsyncStorage";

export const getDashboard = async (id) => {
  const token = await getItem("token");
  const response = await axios
    .get(
      `${process.env.EXPO_PUBLIC_API_URL}/api/homemat/dashboard?company_code=${process.env.EXPO_PUBLIC_COMPANY_CODE}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.message);
    });
  return response;
};

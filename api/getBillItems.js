import axios from "axios";

import { getItem } from "../tools/AsyncStorage";

export const getBillItems = async (id) => {
  const token = await getItem("token");
  const response = await axios
    .post(
      `${process.env.EXPO_PUBLIC_API_URL}/api/homemat/bill/items?company_code=${process.env.EXPO_PUBLIC_COMPANY_CODE}`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err.message);
    });
  return response;
};

import { router } from "expo-router";
import { useEffect } from "react";
import { getItem } from "../tools/AsyncStorage";

export default function index() {
  const getToken = async () => {
    const token = await getItem("token");
    router.replace(!!token ? "/home" : "/login");
  };
  useEffect(() => {
    getToken();
  }, []);

  return null;
}

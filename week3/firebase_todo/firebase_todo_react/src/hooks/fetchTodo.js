import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getAll = async () => {
      try {
        const res = await axios.get(url);
        if (res.data && res.data.todos.length > 0) {
          setData(res.data.todos);
          setIsLoading(false);
          setIsError(false);
          setRefresh(false);
          // console.log(res);
        }
      } catch (error) {
        setIsError(true);
        console.log(error);
      }
    };
    getAll();
  }, [url, refresh]);

  const refreshData = () => {
    setRefresh((prev) => !prev);
  };
  return { data, isLoading, isError, setData, refreshData };
};

export default useFetch;

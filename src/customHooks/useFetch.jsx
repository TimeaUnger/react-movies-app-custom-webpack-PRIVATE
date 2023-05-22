import { useState, useEffect } from 'react';

const useFetch = (url, shouldUpdate) => {
  const [data, setData] = useState();

  useEffect(() => {
    const dataFetch = () => {
      fetch(url)
        .then((response) => response.json())
        .then((res) => {
          setData(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    dataFetch();
  }, [url, shouldUpdate]);

  return [data];
};

export default useFetch;

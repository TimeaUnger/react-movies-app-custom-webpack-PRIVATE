import * as React from 'react';

type Props = {
  url: string;
  shouldUpdate: boolean;
}

const useFetch = (props: Props) => {

  const {url, shouldUpdate} = props;
  const [data, setData] = React.useState({});

  React.useEffect(() => {
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

  console.log(data)
  return [data];
};

export default useFetch;

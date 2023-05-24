import * as React from 'react';

interface OwnProps {
  url: string;
  shouldUpdate: boolean;
  single: boolean;
};

export interface MovieDetails {
  id: number;
  title: string,
  poster_path: string,
  vote_average: string,
  genres: Array<any>,
  release_date: string,
  runtime: string,
  overview: string
}

type JSONResponse = {
  data?: MovieDetails[],
  errors?: Array<{ message: string }>
}

const useFetch = ({ url, shouldUpdate, single }: OwnProps) => {

  const [data, setData] = React.useState<MovieDetails[]>();
  const dataFetch = async (): Promise<MovieDetails[]> => {

    const response = await fetch(url);
    const { data, errors }: JSONResponse = await response.json();

    if (response.ok) {
      const testArray = [];
      if (!Array.isArray(data)) {
        testArray.push(data);
        return testArray;
      }
      return data;
    } else {

      const error = new Error(errors?.map(error => error.message).join('\n') ?? "Unknown error");
      return Promise.reject(error)
    }

  };

  React.useEffect(() => {
    dataFetch().then((response) => setData(response));

  }, [url, shouldUpdate]);
  return [data];
};

export default useFetch;
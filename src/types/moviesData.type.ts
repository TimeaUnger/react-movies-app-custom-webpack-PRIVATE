export default interface MoviesData {
  data: any;
  map(arg0: (movie: any) => React.JSX.Element): React.ReactNode;
  totalAmount: number;
  limit: number;
}

export default interface MovieData {
  id: number;
  title: string,
  poster_path: string,
  vote_average: number,
  genres: Array<any>,
  release_date: string,
  runtime: number,
  overview: string
}
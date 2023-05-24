import http from "../http-common";
import MoviesData from "../types/moviesData.type"
import MovieData from "../types/moviesData.type"

class MoviesDataService {
  getAll(searchParams: string) {
    return http.get<Array<MoviesData>>(`/movies/${searchParams}`);
  }

  get(id: string) {
    return http.get<MoviesData>(`/movies/${id}`);
  }

  create(data: MovieData) {
    return http.post<MovieData>("/movies", data);
  }

  update(data: MovieData) {
    return http.put<any>(`/movies/`, data);``
  }

  delete(id: any) {
    return http.delete<any>(`/movies/${id}`);
  }

  // deleteAll() {
  //   return http.delete<any>(`/`);
  // }

  // findByTitle(title: string) {
  //   return http.get<Array<MoviesData>>(`/?title=${title}`);
  // }
}

export default new MoviesDataService();
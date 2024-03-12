export default class MoviesService {
  apiKey =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZDdjMGRlMTMxMWVjYWJiMDg1NmFjOWMwY2Q5NjBjMCIsInN1YiI6IjY1ZjAwYzNiZmNlYzJlMDE3YTgyOTMyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A-dHZGHj-KKQOd_7Tei21ZECCgQXuRHvtqFbg16z61Y';

  urlMovie =
    'https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1';

  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    },
  };

  async getMoviesData() {
    const res = await fetch(this.urlMovie, this.options);
    const body = await res.json();
    return body.results;
  }
}

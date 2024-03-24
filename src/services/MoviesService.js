export default class MoviesService {
  apiBase = 'https://api.themoviedb.org/3';

  apiToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZDdjMGRlMTMxMWVjYWJiMDg1NmFjOWMwY2Q5NjBjMCIsInN1YiI6IjY1ZjAwYzNiZmNlYzJlMDE3YTgyOTMyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A-dHZGHj-KKQOd_7Tei21ZECCgQXuRHvtqFbg16z61Y';

  apiKey = '4d7c0de1311ecabb0856ac9c0cd960c0';

  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${this.apiToken}`,
    },
  };

  constructor() {
    this.createGuestSession()
      .then(res => this.saveGuestSessionId(res.guest_session_id))
      .catch(error => error);

    this.getGenresData()
      .then(res => this.saveAllGenres(res.genres))
      .catch(error => error);
  }

  saveGuestSessionId = res => {
    this.guestSessionId = res;
  };

  saveAllGenres = res => {
    this.allGenres = res;
  };

  getGenresData = async () => {
    const res = await fetch(
      `${this.apiBase}/genre/movie/list?language=en`,
      this.options
    );
    const body = await res.json();
    return body;
  };

  getMoviesData = async (movieName, page) => {
    const res = await fetch(
      `${this.apiBase}/search/movie?query=${movieName}&include_adult=false&language=en-US&page=${page}`,
      this.options
    );
    const body = await res.json();
    return body;
  };

  getRatedMoviesData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    };

    const res = await fetch(
      `${this.apiBase}/guest_session/${this.guestSessionId}/rated/movies?api_key=${this.apiKey}&language=en-US&page=1&sort_by=created_at.asc`,
      options
    );
    const body = await res.json();
    return body;
  };

  createGuestSession = async () => {
    const res = await fetch(
      `${this.apiBase}/authentication/guest_session/new`,
      this.options
    );
    const body = await res.json();
    return body;
  };

  addMovieRating = async (movieId, value) => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ value }),
    };

    const res = await fetch(
      `${this.apiBase}/movie/${movieId}/rating?api_key=${this.apiKey}&guest_session_id=${this.guestSessionId}`,
      options
    );
    const body = await res.json();
    return body;
  };
}

import './App.css';

import { Component } from 'react';

import { Offline } from 'react-detect-offline';
import { Tabs } from 'antd';

import MoviesService from '../../services/MoviesService';
import OfflineWarning from '../OfflineWarning/OfflineWarning';
import MoviesServiceContext from '../../services/MoviesServiceContext';
import SearchTab from '../SearchTab/SearchTab';
import RatedTab from '../RatedTab/RatedTab';

export default class App extends Component {
  moviesService = new MoviesService();

  constructor() {
    super();

    this.state = {
      moviesStarRating: new Map(),
    };
  }

  saveStarRating = (starRating, movieId) => {
    const { moviesStarRating } = this.state;
    moviesStarRating.set(starRating, movieId);
  };

  hasStarRating = movieId => {
    const { moviesStarRating } = this.state;

    return moviesStarRating.has(movieId);
  };

  getStarRating = movieId => {
    const { moviesStarRating } = this.state;

    return moviesStarRating.get(movieId);
  };

  render() {
    const searchTab = (
      <SearchTab
        saveStarRating={this.saveStarRating}
        hasStarRating={this.hasStarRating}
        getStarRating={this.getStarRating}
      />
    );
    const ratedTab = (
      <RatedTab
        saveStarRating={this.saveStarRating}
        hasStarRating={this.hasStarRating}
        getStarRating={this.getStarRating}
      />
    );

    const tabs = [
      {
        key: '1',
        label: 'Search',
        children: searchTab,
      },

      {
        key: '2',
        label: 'Rated',
        children: ratedTab,
      },
    ];

    return (
      <>
        <Offline>
          <OfflineWarning />
        </Offline>

        <MoviesServiceContext.Provider value={this.moviesService}>
          <div className="container">
            <Tabs
              style={{ width: '100%' }}
              size="large"
              defaultActiveKey="1"
              items={tabs}
              centered
              destroyInactiveTabPane
            />
          </div>
        </MoviesServiceContext.Provider>
      </>
    );
  }
}

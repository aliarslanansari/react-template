import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import routeConstants from '@utils/routeConstants';
import ItunesContainer from '@containers/ItunesContainer/Loadable';
import ItunesGrid from './containers/ItunesGrid/Loadable';
import SongDetailsContainer from './containers/SongDetailsContainer/Loadable';
export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  itunes: {
    component: ItunesContainer,
    ...routeConstants.itunes
  },
  itunesGrid: {
    component: ItunesGrid,
    ...routeConstants.itunesGrid
  },
  songDetails: {
    component: SongDetailsContainer,
    ...routeConstants.songDetails
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};

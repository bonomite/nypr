import React from 'react';
import {MuiThemeProvider, CssBaseline} from '@material-ui/core';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import theme from './theme';
import GlobalStyles from './GlobalStyles';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import HomeComponent from './components/home/Home';
import MovieComponent from './components/movie/Movie';

import ScrollToTop from './helpers/ScrollToTop';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={ theme }>
        <CssBaseline />
        <GlobalStyles />
        <QueryClientProvider client={queryClient}>
          <ScrollToTop />
          <Switch>
            <Route path="/movie">
              <MovieComponent />
            </Route>
            <Route >
              <HomeComponent />
            </Route>
          </Switch>

        </QueryClientProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;

import React, {Fragment, Suspense, lazy} from 'react';
import {MuiThemeProvider, CssBaseline} from '@material-ui/core';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import theme from './theme';
import GlobalStyles from './GlobalStyles';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

const HomeComponent = lazy(() => import('./components/home/Home'));
const MovieComponent = lazy(() => import('./components/movie/Movie'));
const queryClient = new QueryClient();


function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={ theme }>
        <CssBaseline />
        <GlobalStyles />
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={ <Fragment /> }>
            <Switch>
              <Route path="/movie">
                <MovieComponent />
              </Route>
              <Route >
                <HomeComponent />
              </Route>
            </Switch>
          </Suspense>
        </QueryClientProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
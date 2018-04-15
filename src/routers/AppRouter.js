import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import HomePage from '../components/HomePage';
import WritePage from '../components/WritePage';
import HistoryPage from '../components/HistoryPage';
import HistorySpecificPage from '../components/HistorySpecificPage';
import PrivateRoute from './PrivateRoute';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route path="/" component={HomePage} exact={true} />
                <PrivateRoute path="/history" component={HistoryPage} exact={true} />
                <PrivateRoute path="/history/:id" component={HistorySpecificPage} />
                <Route path="/write" component={WritePage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;
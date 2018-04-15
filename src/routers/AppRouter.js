import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import HomePage from '../components/HomePage';
import WritePage from '../components/WritePage';
import HistoryPage from '../components/HistoryPage';
import HistorySpecificPage from '../components/HistorySpecificPage';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route path="/" component={HomePage} exact={true} />
                <Route path="/history" component={HistoryPage} exact={true} />
                <Route path="/history/:id" component={HistorySpecificPage} />
                <Route path="/write" component={WritePage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;
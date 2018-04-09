import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from '../components/HomePage';
import WritePage from '../components/WritePage';
import HistoryPage from '../components/HistoryPage';
import HistorySpecificPage from '../components/HistorySpecificPage';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={HomePage} exact={true} />
                <Route path="/history" component={HistoryPage} exact={true} />
                <Route path="/history/:id" component={HistorySpecificPage} />
                <Route path="/write" component={WritePage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
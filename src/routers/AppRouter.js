import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from '../components/HomePage';
import WritePage from '../components/WritePage';
import HistoryPage from '../components/HistoryPage';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={HomePage} exact={true} />
                <Route path="/history" component={HistoryPage} />
                <Route path="/write" component={WritePage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
import React from 'react';
import { connect } from 'react-redux';
import WritingsList from './WritingsList';

const HistoryPage = (props) => (
    <div>
        this is the history page
        <WritingsList />
    </div>
);

export default HistoryPage;

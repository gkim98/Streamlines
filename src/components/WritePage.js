import React from 'react';
import $ from 'jquery';

$(document).keydown(function(e) { 
    if (e.keyCode == 8 || e.keyCode == 37 || e.keyCode == 39) e.preventDefault(); 
});

$(document).click(function() { 
    $(".container__text-field").focus();
});



export default class WritePage extends React.Component {
    componentDidMount() {
        $(".container__text-field").focus();
    }

    render() {
        return (
            <div className="container">
                <input type="text" className="container__text-field"/>
                <div className="container__filter"/> 
            </div>
        );
    }
};
    
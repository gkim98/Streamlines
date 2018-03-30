import React, { Component } from 'react';

export default class WritePage extends Component {
    constructor(props) {
        super(props);
        
        

        this.focus = this.focus.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
    }

    componentDidMount() {
        this.focus();
    }

    focus() {
        this.mainInput.focus();
    }

    handleKeyPress(event) {
        //console.log(event.keyCode);

        if(event.keyCode===8 || event.keyCode===37 || event.keyCode===38 || event.keyCode===39 || event.keyCode===40) {
            event.preventDefault();
        }

        if(event.metaKey && event.keyCode===65) {
            event.preventDefault();
        }
    }

    handleMouseDown(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div className="container" onClick={this.focus} >
                <input 
                    ref={(input) => { this.mainInput = input; }}
                    type="text" 
                    className="container__text-field"
                    onKeyDown={this.handleKeyPress} 
                    onMouseDown={this.handleMouseDown} />
                <div className="container__filter" /> 
            </div>
        );
    }
};
    
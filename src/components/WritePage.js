import React, { Component } from 'react';

export default class WritePage extends Component {
    constructor(props) {
        super(props);
        
        this.state={myText:"", sentenceNumber: 1, paragraphNumer: 1, lastChar: '', fadeUp: ""};

        this.focus = this.focus.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.checkCount = this.checkCount.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
    }

    componentDidMount() {
        this.focus();
    }

    focus() {
        this.mainInput.focus();
    }

    handleKeyPress(event) {
        // Disables backspace and arrow keys
        if(event.keyCode===8 || event.keyCode===37 || event.keyCode===38 || event.keyCode===39 || event.keyCode===40) {
            event.preventDefault();
            return;
        }

        // Disables CTRL + A
        if(event.metaKey && event.keyCode===65) {
            event.preventDefault();
            return;
        }

        


    }

    checkCount(event) {
        // Enter is pressed: add 1 to paragraphNumber
        if(event.keyCode===13) {
            this.copy.value = event.target.value;
            this.setState({paragraphNumer: this.state.paragraphNumer + 1, sentenceNumber: 1, fadeUp: "container__fade-up"});
            this.mainInput.value = "";
        }
        // Last two characters are ". ": add 1 to sentenceNumber
        if(event.target.value.substring(event.target.value.length - 2, event.target.value.length)===". ") {
            this.setState({sentenceNumber: this.state.sentenceNumber + 1});
        }

        
        
    }

    handleMouseDown(event) {
        event.preventDefault();
    }

    handleWheel(event) {
        event.preventDefault();
    }

    handleOnChange(event) {
        this.setState({myText: event.target.value});
    }

    handleAnimationEnd(event) {
        this.setState({fadeUp: ""});
        this.copy.value = "";
    }


    render() {
        return (
            <div className="container" onClick={this.focus} >
                <input 
                    className="container__text-field"
                    ref={(input) => { this.mainInput = input; }}
                    type="text" 
                    onKeyDown={this.handleKeyPress} 
                    onKeyUp={this.checkCount}
                    onMouseDown={this.handleMouseDown} 
                    onChange={ this.handleOnChange }
                    onWheel={this.handleWheel} />

                <input 
                    ref={(input) => { this.copy = input; }}
                    className={"container__text-field container__copy " + this.state.fadeUp } 
                    onAnimationEnd={this.handleAnimationEnd}
                /> 
          

                <div className="container__filter" /> 

                

                <p className="container__count"> 
                    Sentence {this.state.sentenceNumber}: Paragraph {this.state.paragraphNumer}
                </p>

            </div>
        );
    }
};
    
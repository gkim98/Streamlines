import React, { Component } from 'react';

export default class WritePage extends Component {
    constructor(props) {
        super(props);
        
        this.state={myText:"\t", sentenceNumber: 1, paragraphNumer: 1, lastChar: '', fadeUp: "", wordCount: 0, characterCount: 0, checkedFlag: false};
    }

    componentDidMount() {
        this.focus();
    }

    focus() {
        this.mainInput.focus();
    }

    handleKeyPress(event) {
        //console.log(event.keyCode);

        // Disables backspace, arrow keys, home/end keys
        if(event.keyCode===8 || (35<=event.keyCode && event.keyCode<=40)) {
            event.preventDefault();
            return;
        }

        // Disables CTRL + A
        if(event.metaKey && event.keyCode===65) {
            event.preventDefault();
            return;
        }

        this.setState({
            sentenceNumber: (this.state.myText.match(/\w[.?!](\s|$)/g) || []).length + 1, 
        });
    }

    checkCount(event) {
        //console.log(this.state.myText);

        // Enter is pressed: add 1 to paragraphNumber
        if(event.keyCode===13) {
            this.copy.value = event.target.value;
            this.setState({paragraphNumer: this.state.paragraphNumer + 1, sentenceNumber: 1, fadeUp: "write-page__container__fade-up", myText: this.state.myText + '\n\t'});
            this.mainInput.value = "";
        }
    }


    handleAnimationEnd(event) {
        this.setState({fadeUp: ""});
        this.copy.value = "";
    }


    render() {
        return (
            <div className="write-page__container" onClick={this.focus.bind(this)} >
                <input 
                    className="write-page__container__text-field"
                    ref={(input) => { this.mainInput = input; }}
                    type="text" 
                    onKeyDown={this.handleKeyPress.bind(this)} 
                    onKeyUp={this.checkCount.bind(this)}
                    onMouseDown={(event) => {event.preventDefault();}} 
                    onChange={ (event) => {
                            this.setState({
                                myText: this.state.myText + event.target.value[event.target.value.length-1], 
                                characterCount: this.state.characterCount + 1, 
                                wordCount: this.state.myText.trim().split(/\s+/).length
                            });
                        } 
                    }
                    onWheel={(event) => {event.preventDefault();} } />

                <input 
                    ref={(input) => { this.copy = input; }}
                    className={"write-page__container__text-field write-page__container__copy " + this.state.fadeUp } 
                    onAnimationEnd={this.handleAnimationEnd.bind(this)}
                /> 
          

                <div className="write-page__container__filter" /> 

                <p className="write-page__container__count write-page__container__count-1"> 
                    Sentence {this.state.sentenceNumber}: Paragraph {this.state.paragraphNumer} &nbsp;&nbsp;|&nbsp;&nbsp; Words: {this.state.wordCount}: Characters {this.state.characterCount}
                </p>

                <p className="write-page__container__count write-page__container__count-2"> 
                   
                </p>

            </div>
        );
    }
};
    
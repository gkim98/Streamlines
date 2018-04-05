import React, { Component } from 'react';
import TextFlow from './text_flow';

function countWords(s){
    s = s.replace(/(^\s*)|(\s*$)/gi,"");//exclude  start and end white-space
    s = s.replace(/[ ]{2,}/gi," ");//2 or more space to 1
    s = s.replace(/\n /,"\n"); // exclude newline with a start spacing
    return s.split(' ').length; 
}


export default class WritePage extends Component {
    constructor(props) {
        super(props);
        
        this.state={myField:"\t", myText: "", sentenceNumber: 1, paragraphNumer: 1, wordCount: 0, characterCount: 0};
    }

    updateText(myField) {
        this.setState({
            myField,
            wordCount: countWords(myField + " " + this.state.myText),
            characterCount: myField.length + this.state.myText.length,
            sentenceNumber: (myField.match(/\w[.?!](\s|$)/g) || []).length + 1,
        });
    }

    newParagraph() {
        this.setState({
            myText: this.state.myText + "\t" + this.state.myField + "\n",
            wordCount: countWords(this.state.myField + " " + this.state.myText),
            paragraphNumer: this.state.paragraphNumer + 1,
            sentenceNumber: 1
        });
    }

    componentWillUnmount() {
        this.setState({
            myText: this.state.myText + this.state.myField
        });
    }

    onClick = () => {
        this.child.focus() 
        console.log(this.state.myText);
    }

    render() {
        return (
            <div className="write-page__container" onClick={this.onClick}>
                <div className="write-page__container__filter">
                    <TextFlow 
                        onTextChange={ this.updateText.bind(this)}
                        onEnter={this.newParagraph.bind(this)}
                        onRef={ref => (this.child = ref)} />
                </div> 

                <p className="write-page__container__count write-page__container__count-1"> 
                    Sentence {this.state.sentenceNumber}: Paragraph {this.state.paragraphNumer} &nbsp;&nbsp;|&nbsp;&nbsp; Words: {this.state.wordCount}: Characters {this.state.characterCount}
                </p>

                <p className="write-page__container__count write-page__container__count-2"> 
                   
                </p>

            </div> 
        );
    }
};
    
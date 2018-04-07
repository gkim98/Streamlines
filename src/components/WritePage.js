import React, { Component } from 'react';
import TextFlow from './TextFlow';

function countWords(str) {
    return str.trim().split(/\s+/).length;
  }


export default class WritePage extends Component {
    constructor(props) {
        super(props);
        
        this.state={myField:"", 
                    myText: "", 
                    sentenceNumber: 1, 
                    paragraphNumber: 1, 
                    wordCount: 0, 
                    characterCount: 0,
                    count1ToggleClass: "",
                    count2ToggleClass: "text-flow__count__hidden",
                };
    }

    updateText(myField) {
        this.setState({
            myField,
            wordCount: countWords(myField  + this.state.myText),
            characterCount: myField.length + this.state.myText.length - 2*(this.state.paragraphNumber - 1),
            sentenceNumber: (myField.match(/\w[.?!](\s|$)/g) || []).length + 1,
        });
    }

    newParagraph() {
        this.setState({
            myText: this.state.myText + "\t" + this.state.myField + "\n",
            paragraphNumber: this.state.paragraphNumber + 1,
            sentenceNumber: 1,
            wordCount: countWords(this.state.myField + " " + this.state.myText)
        });
    }

    componentWillUnmount() {
        this.setState({
            myText: this.state.myText + this.state.myField
        });
    }

    refocus = () => {
        this.child.focus() 
    }

    onToggleCount(event) {
        //console.log(event.target.id);

        if(event.target.id === "count1") {
            this.setState({
                count1ToggleClass: "text-flow__count__fadeOut",
                count2ToggleClass: "text-flow__count__fadeIn"
            });
        } else if(event.target.id === "count2") {
            this.setState({
                count1ToggleClass: "text-flow__count__fadeIn",
                count2ToggleClass: "text-flow__count__fadeOut"
            });
        }
    }

    render() {
        return (
            <div className="main-container" onClick={this.refocus}>
                
                <TextFlow 
                    onTextChange={this.updateText.bind(this)}
                    onEnter={this.newParagraph.bind(this)}
                    onRef={ref => (this.child = ref)} />
                <div className="filter"></div> 

                <p id="count1" className={"text-flow__count " + this.state.count1ToggleClass} onClick={this.onToggleCount.bind(this)} > 
                    Sentence {this.state.sentenceNumber}: Paragraph {this.state.paragraphNumber}&#8594;
                </p>

                <p id="count2" className={"text-flow__count " + this.state.count2ToggleClass} onClick={this.onToggleCount.bind(this)} > 
                    Words: {this.state.wordCount}: Characters {this.state.characterCount}&#8594;
                </p>

            </div> 
        );
    }
};
    
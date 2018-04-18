import React, { Component } from 'react';
import TextFlow from './TextFlow';
import { startAddWriting} from '../actions/writings';
import { connect } from 'react-redux';

function countWords(str) {
    return str.trim().split(/\s+/).length;
  }

  


class WritePage extends Component {
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
                    blankEnterCount: 0,
                    showTip: "",
        };
        this.addWriting = this.addWriting.bind(this);
    }

    addWriting() {
        const text = this.state.myText;

        const writing = {
            text
        }

        this.props.dispatch(startAddWriting(writing))
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
        if(this.state.myField==="") {
            this.setState({blankEnterCount: this.state.blankEnterCount + 1}, function() {
                if(this.state.blankEnterCount >= 2) {
                    this.addWriting();

                    this.setState({blankEnterCount: 0});
                }
            }.bind(this));

            
                

            return;
        }

        this.setState({
            myText: this.state.myText + "\t" + this.state.myField + "\n",
            paragraphNumber: this.state.paragraphNumber + 1,
            sentenceNumber: 1,
            wordCount: countWords(this.state.myField + " " + this.state.myText)
        });
    }

    componentWillMount() {
        document.body.classList.toggle('overflow-hidden', true);
    }

    componentWillUnmount() {
        this.setState({
            myText: this.state.myText + this.state.myField
        });
        document.body.classList.toggle('overflow-hidden', false);
    }

    refocus = () => {
        this.child.focus() 
    }

    handleClick(event) {

        if(event.target.className!=="title-bar__title-field")
            this.refocus();
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

    setTitle(event) {
        if(event.keyCode===13) {
            this.refocus();
        }
    }

    hideTip() {
        if(this.state.showTip==="") {
            setTimeout(function() {
                this.setState({
                    showTip: "fadeOut",
                });
            }.bind(this),2000);
                
        }
            
        
        
    }

    render() {
        return (
            <div className="main-container overflow" onClick={this.handleClick.bind(this)}>
                
                <TextFlow 
                    onTextChange={this.updateText.bind(this)}
                    onEnter={this.newParagraph.bind(this)}
                    onRef={ref => (this.child = ref)} 
                    onBegin={this.hideTip.bind(this)} />
                <div className="filter"></div> 

                <div className="title-bar-flex">
                    <input className="title-bar__title-field" placeholder="Set a Title" onKeyUp={this.setTitle.bind(this)} />
                    <button className="title-bar__export-button"> Export </button>
                </div>

                    <p className={"tip " + this.state.showTip}> Ready to Export? Just hit Enter three times! </p>
        

                <p id="count1" className={"text-flow__count " + this.state.count1ToggleClass} onClick={this.onToggleCount.bind(this)} > 
                    Sentence {this.state.sentenceNumber}: Paragraph {this.state.paragraphNumber}&nbsp; &#8594;
                </p>

                <p id="count2" className={"text-flow__count " + this.state.count2ToggleClass} onClick={this.onToggleCount.bind(this)} > 
                    Words: {this.state.wordCount}: Characters {this.state.characterCount}&nbsp; &#8594;
                </p>

            </div> 
        );
    }
};

// sets props to the redux writing data
const mapStateToProps = (state) => {
    return {
        
    };
};

const WritePageState = connect(mapStateToProps)(WritePage);

// attaches actions to component
const mapDispatchToProps = (dispatch) => ({
    startAddWriting: () => dispatch(startAddWriting()),
});

export default connect(undefined, mapDispatchToProps)(WritePageState);
    
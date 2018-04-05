import React from 'react';

export default class TextFlow extends React.Component {
    constructor(props) {
        super(props);
        
        this.state={sentenceNumber: 1, paragraphNumer: 1, fadeUp: "", wordCount: 0, characterCount: 0, checkedFlag: false};
    }

    componentDidMount() {
        this.focus();
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }


    focus() {
        this.mainInput.focus();
    }

    handleKeyPress(event) {
        //console.log(event.keyCode);

        // Enter is pressed: add 1 to paragraphNumber
        if(event.keyCode===13) {
            this.copy.value = event.target.value;
            this.setState({paragraphNumer: this.state.paragraphNumer + 1, sentenceNumber: 1, fadeUp: "write-page__container__fade-up"});
            this.props.onEnter();
            this.mainInput.value = "";
        }

        
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
    }

    checkCount(event) {
        //console.log(this.state.myText);

        // this.setState({
        //     myText: event.target.value 
        //     //wordCount: this.state.myText.trim().split(/\s+/).length
        // });

    
        this.props.onTextChange( event.target.value );
   

        // this.setState({
        //     sentenceNumber: (this.state.myText.match(/\w[.?!](\s|$)/g) || []).length + 1, 
        // });
        
        
    }


    handleAnimationEnd(event) {
        this.setState({fadeUp: ""});
        this.copy.value = "";
    }


    render() {
        return (
            <div>
                <input 
                className="write-page__container__text-field"
                ref={(input) => { this.mainInput = input; }}
                type="text" 
                onKeyDown={this.handleKeyPress.bind(this)} 
                onKeyUp={this.checkCount.bind(this)}
                onMouseDown={(event) => {event.preventDefault();}} 
                onWheel={(event) => {event.preventDefault();} } />
            
                <input 
                ref={(input) => { this.copy = input; }}
                className={"write-page__container__text-field write-page__container__copy " + this.state.fadeUp } 
                onAnimationEnd={this.handleAnimationEnd.bind(this)}
                /> 
            </div>
        );
    };

}



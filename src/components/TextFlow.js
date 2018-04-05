import React from 'react';

export default class TextFlow extends React.Component {
    constructor(props) {
        super(props);
        
        this.state={fadeUp: ""};
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
            this.setState({fadeUp: "text-flow__fade-up"});
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
        this.props.onTextChange( event.target.value );     
    }


    handleAnimationEnd(event) {
        this.setState({fadeUp: ""});
        this.copy.value = "";
    }



    // animate is used in the home page. Iterates through string and appends to textField
    animate(message, clear) {
        //console.log(message);
        message.split('').map(this.appendMessage.bind(this));

        if(clear===true) {
            setTimeout(function() {
                this.copy.value = message;
                this.setState({fadeUp: "text-flow__fade-up"});
                this.mainInput.value = "";
            }.bind(this), 75*message.length + 1000);
        }
    }

    appendMessage(char, index) {
        setTimeout(function() {
            this.mainInput.value += char;
            this.focus();
        }.bind(this), 75*index);
    }



    render() {
        return (
            <div>
                <input 
                    className="text-flow__text-field"
                    ref={(input) => { this.mainInput = input; }}
                    type="text" 
                    onKeyDown={this.handleKeyPress.bind(this)} 
                    onKeyUp={this.checkCount.bind(this)}
                    onMouseDown={(event) => {event.preventDefault();}} 
                    onWheel={(event) => {event.preventDefault();} } 
                />
            
                <input 
                    ref={(input) => { this.copy = input; }}
                    className={"text-flow__text-field text-flow__copy " + this.state.fadeUp } 
                    onAnimationEnd={this.handleAnimationEnd.bind(this)}
                /> 
            </div>
        );
    };

}



import React from 'react';


export default class TextFlow extends React.Component {
    constructor(props) {
        super(props);
        
        this.state={
            fadeUpClass: "",
            userInput: true,
            allowedBackspaces: 0,
            value: " ",
            copyValue: " ",
            isAnimating: false,
            inputProps: {value: null},
        };
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

        

        if(this.props.onBegin)
            this.props.onBegin();

        if(event.keyCode===32) {
            this.setState({allowedBackspaces: 0});
            return;
        } 
        
        if(event.keyCode!==8)
            this.setState({allowedBackspaces: this.state.allowedBackspaces + 1});
       

        if(this.state.userInput===false && event.metaKey===false) {
            event.preventDefault();
            return;
        }

        // Disables backspace, arrow keys, home/end keys
        if((35<=event.keyCode && event.keyCode<=40)) {
            event.preventDefault();
            return;
        }

        // Disables CTRL + A
        if(event.metaKey && event.keyCode===65) {
            event.preventDefault();
            return;
        }

        // console.log(this.state.allowedBackspaces);

        if(event.keyCode===8 && this.state.allowedBackspaces===0) {
            event.preventDefault();
        } else if(event.keyCode===8){
            this.setState({allowedBackspaces: this.state.allowedBackspaces - 1});
        }
            

        // Enter is pressed: add 1 to paragraphNumber
        if(event.keyCode===13) {
            this.setState({
                copyValue: event.target.value,
            });
           
            this.setState({fadeUpClass: "text-flow__fade-up"});
            if(this.props.onEnter)
                this.props.onEnter();

            this.mainInput.value = "";
        }
    }

    checkCount(event) {
        if(this.props.onTextChange)
            this.props.onTextChange( event.target.value );     
    }


    handleAnimationEnd(event) {
        this.setState({
            fadeUpClass: "",
            copyValue: " "
        });
    }

    // animate is used in the home page. Iterates through string and appends to textField
    animate(message, clear) {
        //console.log(message);

        this.setState({
            inputProps: null
        })

        message.split('').map(this.appendMessage.bind(this));

        if(clear===true) {
            setTimeout(function() {
                this.setState({
                    copyValue: message,
                    fadeUpClass: "text-flow__fade-up",
                    value: " "
                });
            }.bind(this), 50*message.length + 1000);
        }
    }

    appendMessage(char, index) {
        setTimeout(function() {
            this.setState({
                value: this.state.value += char
            });
        }.bind(this), 50*index);
    }

    userInput(userInput) {
        this.setState({userInput});
    }

    newLine() {

            this.setState({
                copyValue: this.mainInput.value,
                fadeUpClass: "text-flow__fade-up",
                value: " "
            });
      
    }


    render() {
        return (
            <div>
                <input 
                    spellCheck="false"
                    className="text-flow__text-field"
                    ref={(input) => { this.mainInput = input; }}
                    type="text" 
                    onKeyDown={this.handleKeyPress.bind(this)} 
                    onKeyUp={this.checkCount.bind(this)}
                    onMouseDown={(event) => {event.preventDefault();}} 
                    onWheel={(event) => {event.preventDefault();} } 
                    value={this.state.value}
                    {...this.state.inputProps}
                />
            
                <input 
                    ref={(input) => { this.copy = input; }}
                    className={"text-flow__text-field text-flow__copy " + this.state.fadeUpClass } 
                    onAnimationEnd={this.handleAnimationEnd.bind(this)}
                    value={this.state.copyValue}
                    // {...this.state.inputProps}
                /> 
            </div>
        );
    };

}



import React from 'react';
import TextFlow from './TextFlow';

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            button1fadeIn: "", 
            button2fadeIn:"",
            titleFadeIn: "",
        };
    }


    refocus = () => {
        this.child.focus() 
    }

    componentDidMount() {
        var msg1 = "Welcome to Streamlines";
        var msg2 = "Press Enter to start";


        this.child.userInput(false);

        setTimeout(function() {
            this.child.animate(msg1, true);
        }.bind(this), 500);

        setTimeout(function() {
            this.child.animate(msg2, false);
        }.bind(this), 50*msg1.length + 2000);
        
        setTimeout(function() {
            this.setState({
                button1fadeIn: "button-1-fadeIn", 
                button2fadeIn: "button-2-fadeIn",
                titleFadeIn: "title-fadeIn"
            });

            this.child.userInput(true);
        }.bind(this), 50*msg1.length + 2200 + 50*msg2.length);
        
    }

    newSession() {
        this.setState({
            button1fadeIn: "", 
            button2fadeIn: "",
            titleFadeIn: ""
        });

        setTimeout(function() {
            // TODO: Implement history
            //this.props.history.push('/write')
        }.bind(this), 500);

        
    }
    

    render () {
        return (
            <div className="main-container" onClick={this.refocus}>
                <TextFlow onRef={
                    ref => (this.child = ref)}
                    onEnter={this.newSession.bind(this)}
                />
                <div className="filter" /> 


                <div className="flex-container">
                    <div className={"title " + this.state.titleFadeIn}> Streamlines </div>
                    <div className={"title-sub " + this.state.titleFadeIn}> No mistakes in creativity </div>
                    <div className="button-container">
                        <button className={"button button-1 " + this.state.button1fadeIn}> Log In </button>
                        <button className={"button button-2 " + this.state.button2fadeIn}> Sign Up </button>
                    </div>
                </div>
            </div> 
        );
    }
        


    
}


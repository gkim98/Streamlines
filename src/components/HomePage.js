import React from 'react';
import TextFlow from './TextFlow';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
import { withRouter } from "react-router-dom";

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            button1fadeIn: "hidden", 
            button2fadeIn:"hidden",
            titleFadeIn: "hidden",
            infoFadeIn: "hidden"
        };
    }


    refocus = () => {
        this.child.focus() 
    }

    componentDidMount() {
        var msg1 = "Welcome to Streamlines";
        var msg2 = "Press Enter to begin";


        this.child.userInput(false);

        setTimeout(function() {
            this.child.animate(msg1, true);
        }.bind(this), 500);

        setTimeout(function() {
            this.child.animate(msg2, false);
        }.bind(this), 50*msg1.length + 2000);
        
        setTimeout(function() {
            this.setState({
                button1fadeIn: "button button-1", 
                button2fadeIn: "button button-2",
                titleFadeIn: "title-fadeIn",
                infoFadeIn: "button button-info",
            });

            this.child.userInput(true);
        }.bind(this), 50*msg1.length + 1800 + 50*msg2.length);
        
    }

    newSession() {
        this.setState({
            button1fadeIn: "hidden", 
            button2fadeIn: "hidden",
            titleFadeIn: "hidden",
            infoFadeIn: "hidden"
        });

        setTimeout(function() {
            // TODO: Implement history
            this.props.history.push('/write')
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
                        <button className={this.state.infoFadeIn}> History </button>
                        <button onClick={this.props.startLogin} className={this.state.button1fadeIn}> Log In </button>
                        <button className={this.state.button2fadeIn}> Sign Up </button>
                    </div>
                </div>

                
            </div> 
        );
    }
}

// connect auth action to the component
const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(withRouter(HomePage));
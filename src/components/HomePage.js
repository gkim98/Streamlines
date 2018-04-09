import React from 'react';
import TextFlow from './TextFlow';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
import { withRouter } from "react-router-dom";
import Waypoint from 'react-waypoint';

var done = false;

function scrollTo(element, to, duration) {
    if (duration < 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}

var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  

   

  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  


}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            button1fadeIn: "hidden", 
            button2fadeIn:"hidden",
            titleFadeIn: "hidden",
            historyFadeIn: "hidden",
            learnFadeIn: "hidden",
            arrowFadeIn: "hidden"
        };
    }

    handleScroll() {
        var winHeight = window.innerHeight;
     
        // Annoying to compute doc height due to browser inconsistency
        var body = document.body;
        var html = document.documentElement;
        var docHeight = Math.max( body.scrollHeight, body.offsetHeight, 
                        html.clientHeight, html.scrollHeight, html.offsetHeight );
     
        var value = document.documentElement.scrollTop;
        
        if(value > 200) {
            this.setState({
                titleFadeIn: "title-fadeIn"
            });
        }

        console.log(value);
     }


    refocus = () => {
        this.child.focus() 
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));

        
        disableScroll();

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
                titleFadeIn: "",
                historyFadeIn: "button button-info",
                learnFadeIn: "learn",
                arrowFadeIn: "stretch"
            });
            
            enableScroll();

            this.child.userInput(true);
        }.bind(this), 50*msg1.length + 1800 + 50*msg2.length);
        
    }

    newSession() {
        this.setState({
            button1fadeIn: "hidden", 
            button2fadeIn: "hidden",
            titleFadeIn: "hidden",
            historyFadeIn: "hidden"
        });

        setTimeout(function() {
            // TODO: Implement history
            this.props.history.push('/write')
        }.bind(this), 500);

        
    }

 
    

    render () {
        return (
            <div>
                <div className="main-container" onClick={this.refocus}>
                    <div className="flex-container">
                        <div className={"title " + this.state.titleFadeIn}> Streamlines </div>
                        <div className={"title-sub " + this.state.titleFadeIn}> No mistakes in creativity </div>
                        <div className="button-container">
                            <button className={this.state.historyFadeIn}> History </button>
                            <button onClick={this.props.startLogin} className={this.state.button1fadeIn}> Log In </button>
                            <button className={this.state.button2fadeIn}> Sign Up </button>
                        </div>
                    </div>

                    

                    <TextFlow onRef={
                        ref => (this.child = ref)}
                        onEnter={this.newSession.bind(this)}
                    />
                    <div className="filter" /> 

                    <div className={this.state.learnFadeIn}>
                        Scroll to learn more
                    </div>
                    <div className={this.state.arrowFadeIn}>
                        <i className="arrow down"></i>
                    </div>

                    
                    
                </div> 
                <div className="info-container">
                    <div className="info-title">
                        <h1> Streamlines is a text editor that lets your creativity roam free. </h1>
                    </div>
                    <div className="info-block-flex">
                        <div className="info-block">
                            <span class="pe-7s-like2"></span>
                            <h2> No Mistakes</h2>
                            <p> Backspaces are disabled, except for typos, so just keep typing everything on your mind. We believe that limiting backspaces in first drafts or journals will let the writer keep their focus on their stream of thoughts rather than structure or syntax.</p>
                        </div>
                        <div className="info-block">
                            <span class="pe-7s-next"></span>
                            <h2> No Looking Back</h2>
                            <p> As you type, the text fades behind you. This means you won't have any distractions as you write. Concentrating only on the current context will let you record all of your thoughts.</p>
                        </div>
                        <div className="info-block">
                            <span class="pe-7s-download"></span>
                            <h2> Export to Google Drive</h2>
                            <p> When you're done, export your document to Google Drive, or just copy and paste it all to your favorite text editor. If you are logged in, Streamlines will save your files for you as well, for viewing or exporting later.</p>
                        </div>
                    </div>
                    <h3> Ready to get started? Press Enter to create your first Streamline! </h3>
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
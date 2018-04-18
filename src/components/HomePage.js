import React from 'react';
import TextFlow from './TextFlow';
import { connect } from 'react-redux';
import { startLogin, startLogout } from '../actions/auth';
import { withRouter } from "react-router-dom";

// Used in disabling scrolling
function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;  
}

// Disables scrolling from keyboard
// Disables following keyCodes:
var keys = {37: 1, 38: 1, 39: 1, 40: 1};
function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// Disables scrolling, used in welcome animation
function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

// Reenables scrolling, used after welcome animation
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

        // fadeIn variables are classNames used to animate in components
        this.state = {
            titleFadeIn: "hidden",
            learnFadeIn: "hidden",
            arrowFadeIn: "hidden",
            fadeIn: "hidden",
            tagLineFadeIn: "hidden",
            infoBlockFadeIn: "hidden",
            readyFadeIn: "hidden"
        };
    }

    // Various scroll measurements, binded by scroll listener in componentWillMount
    handleScroll() {
        var winHeight = window.innerHeight;
        var body = document.body;
        var html = document.documentElement;
        var docHeight = Math.max( body.scrollHeight, body.offsetHeight, 
                        html.clientHeight, html.scrollHeight, html.offsetHeight );
     
        var scrollY = document.scrollingElement.scrollTop || document.documentElement.scrollTop;
        var percent = scrollY / docHeight * 100;

        // // Debug for scroll below
        // console.log("Window height: " + winHeight);
        // console.log("Doc height: " + docHeight);
        // console.log("Scroll: " + scrollY);
        // console.log("%: " + scrollY / docHeight * 100);

        // Respond to scroll percentage, fadeIn components
        if(percent >=15) {
            this.setState({
                tagLineFadeIn: "fadeInBottom"
            });
        }

        if(percent >= 25) {
            this.setState({
                infoBlockFadeIn: "fadeInBottom"
            });
        }

        if(percent>=40) {
            setTimeout(function() {
                this.setState({
                    readyFadeIn: "fadeInBottom"
                });
            }.bind(this), 1000);
        }
     }

    // Calls TextFlow function to refocus cursor on text field
    refocus = () => {
        this.child.focus() 
    }

    // Disable Scrolling until reenabled after animation in componentDidMount
    componentWillMount() {

        disableScroll();
    }

    // Animate welcome message, fade in title, buttons, info
    // If already logged in, then just show second message
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));

        var msg1 = "Welcome to Streamlines";
        var msg2 = "Press Enter to begin";

        if(!this.props.auth.uid) {
            // Disable input into field, child function in TextFlow
            this.child.userInput(false);

            // Wait 500ms for page to fully load before starting msg1
            setTimeout(function() {
                this.child.animate(msg1, true);
            }.bind(this), 500);

            // Wait 2s after msg1 to display msg2
            setTimeout(function() {
                this.child.animate(msg2, false);
            }.bind(this), 50*msg1.length + 2000);
            
            // Fade in login and info 
            setTimeout(function() {
                this.setState({
                    learnFadeIn: "learn",
                    arrowFadeIn: "stretch",
                    fadeIn: "fadeIn-delay0",
                    titleFadeIn: "fadeIn-delay0"
                });
                
                enableScroll();

                this.child.userInput(true);
            }.bind(this), 50*msg1.length + 1800 + 50*msg2.length);
        } else {
            // Show msg2
            enableScroll();

            setTimeout(function() {
                this.child.animate(msg2, false);
            }.bind(this), 500);

            // Show buttons and info
            setTimeout(function() {
                this.setState({
                    learnFadeIn: "learn",
                    arrowFadeIn: "stretch",
                    fadeIn: "fadeIn-delay0",
                    titleFadeIn: "fadeIn-delay0"
                });
                
                

                this.child.userInput(true);
            }.bind(this), 50*msg2.length - 1000);
        }
    }

    // New streamline is created when enter is pressed. Transition components out and push to write page
    newSession() {
        this.setState({
            titleFadeIn: "hidden",
            fadeIn: "fadeOutTop",
            learnFadeIn: "hidden",
            arrowFadeIn: "hidden"
        });

        this.child.newLine();

        setTimeout(function() {
            this.props.history.push('/write')
        }.bind(this), 500);
    } 

    render () {
        return (
            <div>
                <div className="main-container" onClick={this.refocus}>
                    <div className="menu-bar">
                        <div className={"menu-bar__title " + this.state.titleFadeIn}> Streamlines </div>
                        <div className={"menu-bar__title-sub " + this.state.titleFadeIn}> No mistakes in creativity </div>
                        <div className="button-container">
                            {this.props.auth.uid ? (
                                <div>
                                    <button 
                                        className={"button button-info " + this.state.fadeIn}
                                        onClick={() => {
                                            this.props.history.push('/history');
                                        }}> 
                                        History 
                                    </button>

                                    <button 
                                        className={"button button-2 " + this.state.fadeIn} 
                                        onClick={this.props.startLogout}> 
                                        Log Out 
                                    </button> 
                                </div>
                            ) :
                                <button 
                                    className={"button button-2 " + this.state.fadeIn} 
                                    onClick={this.props.startLogin} > 
                                    Log In 
                                </button>
                            }
                        </div>
                    </div>

                    
                    <TextFlow 
                        onRef={ref => (this.child = ref)}
                        onEnter={this.newSession.bind(this)}
                    />

                    <div className="filter" /> 

                    <div className={this.state.learnFadeIn}>
                        or, scroll down to learn more
                    </div>

                    <div className={this.state.arrowFadeIn}>
                        <i className="arrow down"></i>
                    </div>

                </div> 


                <div className="info-container">
                    <div className={"info-title " + this.state.tagLineFadeIn}>
                        <h1> Streamlines is a text editor that lets your creativity roam free. </h1>
                    </div>
                    <div className="info-block-flex">
                        <div className={"info-block info-block-1 " + this.state.infoBlockFadeIn}>
                            <span className="pe-7s-like2"></span>
                            <h2> No Mistakes</h2>
                            <p> Backspaces are disabled, except for typos, so just keep typing everything on your mind. We believe that limiting backspaces in first drafts or journals will let the writer keep their focus on their stream of thoughts rather than structure or syntax.</p>
                        </div>
                        <div className={"info-block info-block-2 " + this.state.infoBlockFadeIn}>
                            <span className="pe-7s-next"></span>
                            <h2> No Looking Back</h2>
                            <p> As you type, the text fades behind you. This means you won't have any distractions as you write. Concentrating only on the current context will let you record all of your thoughts.</p>
                        </div>
                        <div className={"info-block info-block-3 " + this.state.infoBlockFadeIn}>
                            <span className="pe-7s-download"></span>
                            <h2> Export to Google Drive</h2>
                            <p> When you're done, export your document to Google Drive, or just copy and paste it all to your favorite text editor. If you log in, Streamlines will save your files for you to view or export later.</p>
                        </div>
                    </div>
                    <h3 className={this.state.readyFadeIn}> Ready to get started? Press Enter to create your first Streamline! </h3>
                </div>
            </div>
        );
    }
}

// connects redux store to the component (user id)
const mapStateToProps = (state) => ({
    auth: state.auth
});

const HomePageState = connect(mapStateToProps)(HomePage);

// connect auth action to the component
const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin()),
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(withRouter(HomePageState));
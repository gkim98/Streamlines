import React from 'react';
import TextFlow from './TextFlow';
import { connect } from 'react-redux';
import { startLogin, startLogout } from '../actions/auth';
import { withRouter } from "react-router-dom";

var scrollY = 0;

// Used to reposition window scroll
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

        this.state = {
            titleFadeIn: "hidden",
            learnFadeIn: "hidden",
            arrowFadeIn: "hidden",
            fadeIn1: "hidden",
            fadeIn2: "hidden",
            fadeIn3: "hidden",
            tagLine: "hidden",
            infoBlock: "hidden",
            ready: "hidden"
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
        if(percent >=15) {
            this.setState({
                tagLine: "fadeInBottom"
            });
        }

        if(percent >= 25) {
            this.setState({
                infoBlock: "fadeInBottom"
            });
        }

        if(percent>=40) {
            setTimeout(function() {
                this.setState({
                    ready: "fadeInBottom"
                });
            }.bind(this), 1000);
        }

        console.log("Window height: " + winHeight);
        console.log("Doc height: " + docHeight);
        console.log("Scroll: " + scrollY);
        console.log("%: " + scrollY / docHeight * 100);

     }


    refocus = () => {
        this.child.focus() 
    }

    componentWillMount() {
        disableScroll();
    }

    // Animate welcome message, fade in title, buttons, info
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));

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
                learnFadeIn: "learn",
                arrowFadeIn: "stretch",
                fadeIn1: "fadeIn-delay0",
                fadeIn2: "fadeIn-delay1",
                fadeIn3: "fadeIn-delay2",
                titleFadeIn: "fadeIn-delay0"
            });
            
            enableScroll();

            this.child.userInput(true);
        }.bind(this), 50*msg1.length + 1800 + 50*msg2.length);
        
    }

    // New streamline is created (when enter is pressed)
    newSession() {
        if(scrollY !==0) 
            scrollTo(document.documentElement, 0, 50);
  

        this.setState({
            titleFadeIn: "hidden",
            fadeIn1: "fadeOutTop",
            fadeIn2: "fadeOutTop",
            fadeIn3: "fadeOutTop",
            learnFadeIn: "hidden",
            arrowFadeIn: "hidden"
        });

        setTimeout(function() {
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
                            {
                                this.props.auth.uid ? 
                                (
                                    <div>
                                        <button className={"button button-info " + this.state.fadeIn3}
                                            onClick={() => {
                                                this.props.history.push('/history');
                                            }}
                                        > History </button>
                                        <button className={"button button-1 " + this.state.fadeIn2} onClick={this.props.startLogout} > Log Out </button> 
                                    </div>
                                ) :
                                <button className={"button button-1 " + this.state.fadeIn2} onClick={this.props.startLogin} > Log In </button>
                            }
                            <button className={"button button-2 " + this.state.fadeIn1}> Sign Up </button>
                        </div>
                    </div>

                    

                    <TextFlow onRef={
                        ref => (this.child = ref)}
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
                    <div className={"info-title " + this.state.tagLine}>
                        <h1> Streamlines is a text editor that lets your creativity roam free. </h1>
                    </div>
                    <div className="info-block-flex">
                        <div className={"info-block info-block-1 " + this.state.infoBlock}>
                            <span className="pe-7s-like2"></span>
                            <h2> No Mistakes</h2>
                            <p> Backspaces are disabled, except for typos, so just keep typing everything on your mind. We believe that limiting backspaces in first drafts or journals will let the writer keep their focus on their stream of thoughts rather than structure or syntax.</p>
                        </div>
                        <div className={"info-block info-block-2 " + this.state.infoBlock}>
                            <span className="pe-7s-next"></span>
                            <h2> No Looking Back</h2>
                            <p> As you type, the text fades behind you. This means you won't have any distractions as you write. Concentrating only on the current context will let you record all of your thoughts.</p>
                        </div>
                        <div className={"info-block info-block-3 " + this.state.infoBlock}>
                            <span className="pe-7s-download"></span>
                            <h2> Export to Google Drive</h2>
                            <p> When you're done, export your document to Google Drive, or just copy and paste it all to your favorite text editor. If you log in, Streamlines will save your files for you to view or export later.</p>
                        </div>
                    </div>
                    <h3 className={this.state.ready}> Ready to get started? Press Enter to create your first Streamline! </h3>
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
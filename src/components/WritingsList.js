import React from 'react';
import { connect } from 'react-redux';
import { startAddWriting, startGetWritings} from '../actions/writings';
import WritingPiece from './WritingPiece';
import { startLogout } from '../actions/auth';
import { withRouter } from "react-router-dom";

function CopyToClipboard(containerid) {
    var range = document.createRange();
    range.selectNode(document.getElementById(containerid));
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
}

class WritingsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            highlighted: 0,
            oldHighlighted: 0,
        };
        this.addWriting = this.addWriting.bind(this);

        

    
    }

    handleScroll(event, delta) {
        var winHeight = window.innerHeight;
        var winWidth = window.innerWidth;
        var body = document.body;
        var html = document.documentElement;
        var docHeight = Math.max( body.scrollHeight, body.offsetHeight, 
                        html.clientHeight, html.scrollHeight, html.offsetHeight );
     

        var scrollY = document.scrollingElement.scrollLeft || document.documentElement.scrollLeft;
        var percent = scrollY / winWidth;

        var selected = Math.floor( (percent + .15) / .30);
        
        

        if(selected != this.state.oldHighlighted) {
            var tempOld = this.state.highlighted

            this.setState({
                oldHighlighted: tempOld,
                highlighted: selected,
                
            });

            this.props.onSelect();
        }

    
       

    }

    handleWheel(event) {
        //document.scrollingElement.scrollLeft -= event.wheelDelta / 2;

        //console.log(document.querySelectorAll( ":hover" )[10].scrollHeight);

        console.log("YES");
        
        var scrollAble = false;

        var preElement = document.querySelectorAll( ":hover" )[10];

        if(preElement) 
            scrollAble = preElement.scrollHeight > preElement.clientHeight;

        if( Math.abs(event.wheelDeltaY) > Math.abs(event.wheelDeltaX) && !scrollAble) {
            document.scrollingElement.scrollLeft -= event.wheelDelta / 4;
            event.preventDefault();
        } else if(preElement){
            //console.log(preElement.scrollHeight-preElement.clientHeight + " " + preElement.scrollTop);
            if(preElement.scrollHeight-preElement.clientHeight === preElement.scrollTop) {
                document.scrollingElement.scrollLeft -= event.wheelDelta / 4;

            }

            if(preElement.scrollTop === 0) {
                document.scrollingElement.scrollLeft -= event.wheelDelta / 4;
           
            }
           
        }
        //}
            
    }

    componentDidMount() {
        
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('mousewheel', this.handleWheel.bind(this));
        this.props.onRef(this);

        this.props.dispatch(startGetWritings());

    

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
        window.removeEventListener('mousewheel', this.handleWheel.bind(this));
        
        this.props.onRef(undefined);
    }

    addWriting() {
        const text = document.getElementById('writing').value;

        const writing = {
            text
        }

        this.props.dispatch(startAddWriting(writing))
    }

    copyText() {
        //console.log(document.getElementById("text" + this.state.highlighted));
        //console.log(this.state.highlighted);
        CopyToClipboard("text" + this.state.highlighted);
    }

    render() {
        var isEmpty = this.props.writings.length === 0;
        

        return (
            <div className="history-container">
                {!isEmpty ? (
                    <div className="history-piece-container">
                        <div className="writing-piece-container writing-piece-container-hidden" />
                            
                        {this.props.writings.map((writing, index) => {
                            return (
                                <WritingPiece 
                                    key={index} 
                                    text={writing.text} 
                                    highlighted={this.state.highlighted}
                                    id={index}
                                />
                            )
                        })}

                        <div className="writing-piece-container writing-piece-container-hidden" />
                                    
                    </div>
                ) :

                    <div> 
                        <h1 className="writing-piece-empty"> No Streamlines yet </h1>
                        <button 
                            className="button writing-piece-button"
                            onClick={() => {this.props.history.push("/write")} }> 
                            Get started! 
                        </button>
                    </div>
                
                }
                    
       

                

              

                
            </div>
        )
    }
}

// sets props to the redux writing data
const mapStateToProps = (state) => {
    return {
        writings: state.writings
    };
};

const WritingsListState = connect(mapStateToProps)(WritingsList);

// attaches actions to component
const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),

});

export default connect(undefined, mapDispatchToProps)(withRouter(WritingsListState));
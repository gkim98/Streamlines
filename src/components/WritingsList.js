import React from 'react';
import { connect } from 'react-redux';
import { startAddWriting, startGetWritings} from '../actions/writings';
import WritingPiece from './WritingPiece';
import { startLogout } from '../actions/auth';

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


        console.log(event.wheelDeltaY + " " + event.wheelDeltaX);
        if( Math.abs(event.wheelDeltaY) > Math.abs(event.wheelDeltaX)) {
            console.log("v");
            document.scrollingElement.scrollLeft -= event.wheelDelta / 2;
            event.preventDefault();
        }
            
    }

    componentDidMount() {
        this.props.dispatch(startGetWritings());
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('mousewheel', this.handleWheel.bind(this));
        this.props.onRef(this);
    }

    componentWillUnmount() {
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
        console.log(this.state.highlighted);
        CopyToClipboard("text" + this.state.highlighted);
    }

    render() {
        return (
            <div className="history-container">
                {/* <input type='text' id='writing'></input>
                <button onClick={this.addWriting}>Add Writing</button> */}
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
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(WritingsListState);
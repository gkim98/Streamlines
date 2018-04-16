import React from 'react';
import { connect } from 'react-redux';
import { startAddWriting, startGetWritings} from '../actions/writings';
import WritingPiece from './WritingPiece';

//test
import { startLogout } from '../actions/auth';



class WritingsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            highlighted: 0,
        };
        this.addWriting = this.addWriting.bind(this);
    }

    handleScroll() {
        var winHeight = window.innerHeight;
        var winWidth = window.innerWidth;
        var body = document.body;
        var html = document.documentElement;
        var docHeight = Math.max( body.scrollHeight, body.offsetHeight, 
                        html.clientHeight, html.scrollHeight, html.offsetHeight );
     

        var scrollY = document.scrollingElement.scrollLeft || document.documentElement.scrollLeft;
        var percent = scrollY / winWidth;

        var selected = Math.floor( (percent + .15) / .30);
        
        this.setState({
            highlighted: selected,
        });


    }

    componentDidMount() {
        this.props.dispatch(startGetWritings());
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    addWriting() {
        const text = document.getElementById('writing').value;

        const writing = {
            text
        }

        this.props.dispatch(startAddWriting(writing))
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
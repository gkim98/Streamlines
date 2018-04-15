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

        };
        this.addWriting = this.addWriting.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(startGetWritings())
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
            <div>
                <input type='text' id='writing'></input>
                <button onClick={this.addWriting}>Add Writing</button>
                {this.props.writings.map((writing) => {
                    return (
                        <WritingPiece 
                            key={writing.id} 
                            text={writing.text} 
                        />
                    )
                })}
                <button onClick={this.props.startLogout}>Logout</button>
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
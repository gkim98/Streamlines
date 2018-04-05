import React from 'react';
import { connect } from 'react-redux';
import { startAddWriting, startGetWritings} from '../actions/writings';

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
        this.props.dispatch(startAddWriting(
            document.getElementById('text').value
        ))
    }

    render() {
        return (
            <div>
                <input type='text' id='text'></input>
                <button onClick={this.addWriting}>Add Writing</button>
                {this.props.writings.map((writing) => {
                    return <p>{writing.text}</p>
                })}
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

export default connect(mapStateToProps)(WritingsList);
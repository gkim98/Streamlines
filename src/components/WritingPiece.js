import React from 'react';

function countWords(str) {
    return str.trim().split(/\s+/).length;
}

class WritingPiece extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            highlighted: 0,
        };

        this.getHighlighted = this.getHighlighted.bind(this);
    }

    getHighlighted() {
        if(this.props.id===this.props.highlighted)
            return "highlighted";

        return "";
    }

    render() {
        return (
            <div className="writing-piece-container">
                <div className={"padding " + this.getHighlighted()} id={this.props.id}>
                    <div className="writing-piece">
                        <div className="writing-piece-flex">
                            <p className="writing-piece-text"> 
                                {this.props.text} 
                            </p>
                        </div>
                    </div>

                    <p className="writing-piece-stat">  Words: {countWords(this.props.text)} | Characters: {this.props.text.length} </p>
                </div>
             </div>
        );
    }
}

export default WritingPiece;

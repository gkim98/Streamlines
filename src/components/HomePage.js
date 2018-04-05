import React from 'react';
import TextFlow from './TextFlow';

export default class HomePage extends React.Component {

    updateText(myField) {

    }

    newParagraph() {

    }

    refocus = () => {
        this.child.focus() 
    }

    componentDidMount() {
        var msg1 = "Welcome to Streamlines";
        var msg2 = "Let's get started";

        setTimeout(function() {
            this.child.animate(msg1, true);
        }.bind(this), 500);

        setTimeout(function() {
            this.child.animate(msg2, false);
        }.bind(this), 75*msg1.length + 2000);

        
    }

    

    render () {
        return (
            <div className="main-container" onClick={this.refocus}>
                <div className="text-flow__filter">
                    <TextFlow 
                        onTextChange={this.updateText.bind(this)}
                        onEnter={this.newParagraph.bind(this)}
                        onRef={ref => (this.child = ref)} 
                    />
                        
                </div> 

     

            </div> 
        );
    }
        


    
}


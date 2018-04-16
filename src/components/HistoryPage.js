import React from 'react';
import WritingsList from './WritingsList';
import { withRouter } from "react-router-dom";

class HistoryPage extends React.Component {
    render() {
        return (
            <div>
                this is the history page
                <div className="flex-container">
                    <div className={"title "}> Streamlines </div>
                    <div className={"title-sub "}> No mistakes in creativity </div>
                    <div className="button-container">
                                    
        
                        <div>
                            <button className={"button button-info "}
                                onClick={() => {
                                    this.props.history.push('/');}}> 
            
                                Back 
                            </button>
                            {/* <button className={"button button-2 "} onClick={this.props.startLogout} > Log Out </button>  */}
                        </div>
                                    
                                        {/* <button className={"button button-2 "} onClick={this.props.startLogin} > Log In </button> */}
                                    
                                    {/* <button className={"button button-2 " + this.state.fadeIn1}> Sign Up </button> */}
                    </div>
                </div>

                <WritingsList />

                 <p className="pointer"> ^ </p>
            </div>
        );
    }

    


    
}

export default withRouter(HistoryPage);

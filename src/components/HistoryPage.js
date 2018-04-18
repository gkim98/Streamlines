import React from 'react';
import WritingsList from './WritingsList';
import { withRouter } from "react-router-dom";

class HistoryPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            copied: false,
            exportEnabled: "",
        };
    }

    componentDidMount() {
        document.body.classList.toggle('overflow-hidden', true);
    }

    componentWillUnmount() {
        document.body.classList.toggle('overflow-hidden', false);
    }

    copy() {
        this.child.copyText();
        this.setState({
            copied: true,
        });
    }

    getCopyClass() {
        if(this.state.copied) 
            return "button-copy-green";

        return "";
    }

    selectedUpdate() {
        this.setState({
            copied: false,
        });
    }

    hideButtons() {
        //console.log("test");
        this.setState({
            exportEnabled: "hidden",
        });
    }

    render() {
        return (
            <div>
                this is the history page
                <div className="menu-bar">
                    <div className={"menu-bar__title "}> Streamlines </div>
                    <div className={"menu-bar__title-sub "}> No mistakes in creativity </div>
                    <div className="button-container">
                        <div>
                            <button className={"button button-info "}
                                onClick={() => {
                                    this.props.history.push('/');}}> 
            
                                Back 
                            </button>
                            
                        </div>
                                    
                                      
                    </div>
                </div>

                <WritingsList 
                    onRef={ref => (this.child = ref)} 
                    onSelect={this.selectedUpdate.bind(this)}
                    onEmpty={this.hideButtons.bind(this)} />
                

                <div className={"button-flex " + this.state.exportEnabled}>
                    <button className="button button-export"> Export to Google Drive </button>
                    <button className={"button button-copy " + this.getCopyClass()} onClick={this.copy.bind(this)}> 
                        {!this.state.copied ? (
                            <div>
                                <span className="pe-7s-copy-file"></span>
                                &nbsp;Copy
                            </div>
                        ) : 
                            <div>
                                <span className="pe-7s-check"></span>
                                &nbsp;Copy
                            </div>
                        }
                    </button>
                </div>
              
            </div>
        );
    }

    


    
}



export default withRouter(HistoryPage);

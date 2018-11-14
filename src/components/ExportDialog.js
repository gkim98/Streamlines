import React from 'react';

class ExportDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="export-dialog__main">
                <div className="export-dialog__title">Export Options</div>

                <div className="export-dialog__grid"> 
                    <div className="export-dialog__cell1">Copy</div>
                    <div className="export-dialog__cell2">Download as Word</div>

                    <div className="export-dialog__cell3">Save to History</div>
                    
                </div>
            </div>
        )
    }
}

export default ExportDialog;
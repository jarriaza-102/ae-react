import React, { Component } from 'react';
import { BOLD, UNDERLINE, ITALIC, SYNONYMS } from '../constants/constants';
import './ControlPanel.css';

class ControlPanel extends Component {
    render() {
        const { onTextModified } = this.props;
        return (
            <div id="control-panel">
                <div id="format-actions">
                    <button onClick={() => onTextModified(BOLD)} className="format-action" type="button"><b>B</b></button>
                    <button onClick={() => onTextModified(ITALIC)} className="format-action" type="button"><i>I</i></button>
                    <button onClick={() => onTextModified(UNDERLINE)} className="format-action" type="button"><u>U</u></button>
                    <button onClick={() => onTextModified(SYNONYMS)} className="format-action" type="button">Synonyms</button>
                </div>
            </div>
        );
    }
}

export default ControlPanel;

import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import FeedbackBox from "../feedback-box/FeedbackBox";
import './FileZone.css';

class FileZone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
        this.onTextChange = this.onTextChange.bind(this);
    }

    onTextChange(e) {
        this.setState({
            text: e.target.value,
        });
    }

    render() {
        const { text } = this.state;
        const { savedText, onTextSaved, error, synonyms, isLoaded, isLoading, onWordSelected } = this.props;
        return (
            <div id="file-zone">
                <div id="file">
                    <div>
                        <p>Input your text:</p>
                        <div>
                            <textarea rows="7" columns="100" style={{resize: 'none'}} onChange={this.onTextChange}></textarea>
                        </div>
                        <button type="button" onClick={() => onTextSaved(text)}>Save</button>
                    </div>
                    <br />
                    {!isEmpty(savedText) && (
                        <React.Fragment>
                            <p>Select text to edit:</p>
                            <div>
                                {savedText.map(txt => <span key={txt.id} id={txt.id} style={txt.style}>{`${txt.text} `}</span>)}
                            </div>
                        </React.Fragment>
                    )}
                    <FeedbackBox
                        error={error}
                        synonyms={synonyms}
                        isLoaded={isLoaded}
                        isLoading={isLoading}
                        onWordSelected={onWordSelected}
                    />
                </div>
            </div>
        );
    }
}

export default FileZone;

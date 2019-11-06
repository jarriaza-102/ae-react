import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';

class FeedbackBox extends Component {
    render() {
        const { synonyms, error, isLoaded, isLoading, onWordSelected } = this.props;
        if (isLoading) {
            return <div><p>Loading synonyms...</p></div>
        }
        if (!isEmpty(error)) {
            return <div><p style={{textColor: 'red'}}>{error}</p></div>
        }
        if (isLoaded) {
            if (!isEmpty(synonyms)) {
                return (
                    <React.Fragment>
                        <p>Synonyms:</p>
                        <div style={{paddingLeft: '25px'}}>
                            {synonyms.map((synonym, i) => {
                                return(
                                    <React.Fragment key={i}>
                                        <p>
                                            <span>{synonym.word}</span>
                                            <button
                                                onClick={() => onWordSelected(synonym.word)}
                                                type="button"
                                                style={{marginLeft: '15px'}}>
                                                    Use word
                                            </button>
                                        </p>
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </React.Fragment>
                );
            } else {
                return <div><p>There are no synonyms to display</p></div>
            }
        }
        return <React.Fragment></React.Fragment>;
    }
}

export default FeedbackBox;

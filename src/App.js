import React, {Component} from 'react';
import isEmpty from 'lodash/isEmpty';
import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";
import { BOLD, UNDERLINE, ITALIC, SYNONYMS } from './constants/constants';
import synonymsService from './services/synonymsService';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            savedText: '',
            synonyms: [],
            error: '',
            isLoaded: false,
            isLoading: false,
            selectedId: null,
        };
        this.onTextSaved = this.onTextSaved.bind(this);
        this.onTextModified = this.onTextModified.bind(this);
        this.onWordSelected = this.onWordSelected.bind(this);
    }

    getSelection() {
        return window.getSelection();
    }

    applyTextModification(style, property, valueToApply) {
        if (isEmpty(style[property])) {
            style[property] = valueToApply;
        } else {
            delete style[property];
        }
    }

    onWordSelected(synonym) {
        const { selectedId, savedText } = this.state;
        if (!isEmpty(selectedId)) {
            const wordToChange = savedText.find(txt => txt.id === selectedId);
            if (!isEmpty(wordToChange)) {
                wordToChange.text = synonym;
                this.setState({});
            }
        }
    }

    async onTextModified(type) {
        const { savedText } = this.state;
        const selection = this.getSelection();
        const id = selection.baseNode.parentElement.id;
        const selectedText = selection.toString();
        if (isEmpty(selectedText) || isEmpty(id)) {
            alert('Please select a text, or use another browser if your selection is not read');
            return;
        }
        if (selectedText.trim().split(' ').length > 1) {
            alert(`Multiple word selection is not allowed: ${selectedText}`);
            return;
        }
        if (type === SYNONYMS) {
            try {
                this.setState({
                    synonyms: [],
                    isLoaded: false,
                    isLoading: true,
                    selectedId: null,
                });
                const response = await synonymsService.getSynonym(selectedText);
                this.setState({
                    synonyms: response,
                    isLoaded: true,
                    isLoading: false,
                    selectedId: id,
                });
            } catch (e) {
                this.setState({
                    error: 'There was an issue trying to get synonyms, please try again later',
                    synonyms: [],
                    isLoaded: true,
                    isLoading: false,
                    selectedId: null,
                });
            }
            return;
        }

        let newSavedText = savedText.map(txt => {
            const style = {
                ...txt.style,
            };
            if (txt.id === id) {
                switch(type) {
                    case BOLD: {
                        this.applyTextModification(style, 'fontWeight', 'bold');
                        break;
                    }
                    case UNDERLINE: {
                        this.applyTextModification(style, 'textDecoration', 'underline');
                        break;
                    }
                    case ITALIC: {
                        this.applyTextModification(style, 'fontStyle', 'italic');
                        break;
                    }
                    default:
                        break;
                }
            }
            return {
                ...txt,
                style,
            };
        });
        this.setState({
            savedText: newSavedText,
        });
    }

    onTextSaved(text) {
        this.setState({
            savedText: text.split(' ').map((txt, i) => {
                return {
                    id: `${i}`,
                    text: txt,
                    style: {}
                };
            })
        });
    }

    render() {
        const { savedText, error, synonyms, isLoaded, isLoading } = this.state;
        return (
            <div className="App">
                <header>
                    <span>Simple Text Editor</span>
                </header>
                <main>
                    <ControlPanel onTextModified={this.onTextModified}/>
                    <FileZone
                        error={error}
                        synonyms={synonyms}
                        isLoaded={isLoaded}
                        isLoading={isLoading}
                        savedText={savedText}
                        onWordSelected={this.onWordSelected}
                        onTextSaved={this.onTextSaved}
                    />
                </main>
            </div>
        );
    }
}

export default App;

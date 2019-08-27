import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    root: {
        height: 250,
        flexGrow: 1,
    },
    container: {
        position: 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: 1,
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    divider: {
        height: 2,
    },
});

class PcAutocomplete extends Component{
    constructor(){
        super();
        this.state = { suggestions: [], value: '' };
    }

    getInputProps = () => {
        return {
                id: 'pc-autocomplete',
                label: this.props.label,
                placeholder: this.props.placeholder,
                value: this.state.value,
                onChange: this.onChange,
                onBlur: this.onBlur,
                InputLabelProps: { shrink: true },
            }
    }
    getSuggestionValue = suggestion => suggestion[this.props.selector1];

    getAutosuggestProps = () => {
        return {
            renderInputComponent: this.renderInputComponent,
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            getSuggestionValue: this.getSuggestionValue,
            renderSuggestion: this.renderSuggestion,
            highlightFirstSuggestion: true,
            onSuggestionSelected: this.onSuggestionSelected
        }
    };

    onChange = (event, { newValue }) => { this.setState({ value: newValue }); };

    onBlur = (event, { highlightedSuggestion }) =>{
        if(highlightedSuggestion){
            this.setState({ value: highlightedSuggestion[this.props.selector1] });
            this.props.updateSelected(this.props.id, highlightedSuggestion[this.props.selector2]);
        }
    }

    onSuggestionSelected = (event, { suggestion })=>{
        this.setState({ value: suggestion[this.props.selector1] });
        this.props.updateSelected(this.props.id, suggestion[this.props.selector2]);
    }

    renderSuggestion = (suggestion, { query, isHighlighted })=> {
        const nameMatches = match(suggestion[this.props.selector1], query);
        const nameParts = parse(suggestion[this.props.selector1], nameMatches);
        const codeMatches = match(suggestion[this.props.selector2], query);
        const codeParts = parse(suggestion[this.props.selector2], codeMatches);

        return (
            <MenuItem selected={isHighlighted} component="div">
                <div style={{ flexGrow: '1' }}>
                    {codeParts.map(part => (
                        <span key={part.text} style={{ color: part.highlight ? 'red' : 'inherit' }}>
                            {part.text}
                        </span>
                    ))}
                </div>
                <div>
                    {nameParts.map(part => (
                        <span key={part.text} style={{ color: part.highlight ? 'red' : 'inherit' }}>
                            {part.text}
                        </span>
                    ))}
                </div>
            </MenuItem>
        );
    }

    handleSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.props.getSuggestions(value)
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    }

    renderInputComponent = (inputProps=this.getInputProps()) => {
        const { classes, inputRef = () => { }, ref, ...other } = inputProps;

        return (
            <TextField
                fullWidth
                InputProps={{
                    inputRef: node => {
                        ref(node);
                        inputRef(node);
                    }
                }}
                {...other}
            />
        );
    }

    render(){
        const { classes } = this.props;
        return (
            <Autosuggest
                {...this.getAutosuggestProps()}
                inputProps={this.getInputProps()}
                theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                }}
                renderSuggestionsContainer={options => (
                    <Paper {...options.containerProps} square>
                        {options.children}
                    </Paper>
                )}
            />
        )
    }
}

PcAutocomplete.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PcAutocomplete);
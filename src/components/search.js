import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import { getSuggestions, getOtaSuggestions } from '../helpers/pc-helper';
import PcAutocomplete from './pc-autocomplete';
import PcMultiselect from './pc-multiselect';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { updateRowData, updateColData } from '../actions';
import { connect } from 'react-redux';

const styles = () => ({
    searchContainer:{
        overflow: 'visible'
    },
    title:{
        margin: '0px',
        color: '#ea2330'
    },
    marL9:{
        marginLeft: '9px'
    },
    logoContainer:{
        textAlign: 'center',
        padding: '15px 0',
        position: 'relative'
    },
    ytLogo: {
        position: 'absolute',
        left: '5px',
        marginBottom: '0px'
    }
});

class Search extends Component{
    constructor(){
        super();
        this.state= { 
            originVal: '',
            destinationVal: '',
            dateVal: '',
            flightNum: '',
            airName: '',
            suggestions: [],
            selectVals: {},
        }
    }

    getSearchResult = () => {
        let requestObj = {};
        const { originVal, destinationVal, dateVal, selectVals, flightNum, airName } = this.state;
        const selectedOtaList = this.getSelectedOtaList(selectVals);
        requestObj['origin'] = originVal;
        requestObj['destination'] = destinationVal;
        requestObj['departDate'] = dateVal;
        requestObj['ota'] = selectedOtaList;
        if (flightNum) requestObj['flightNumber'] = flightNum;
        if (airName) requestObj['airlineName'] = airName;
        this.renderTable(requestObj, selectedOtaList);
    }

    renderTable(requestObj,otaList){
        this.props.updateColData(otaList);
        this.props.updateRowData(requestObj);
    }

    setSelectedValue = (key,value) =>{
        this.setState({[key]: value});
    }

    addSelectedValue = (key,value) =>{
        let temp = this.state.selectVals.key ? this.state.selectVals.key : [];
        temp.push(value);
        this.setState({selectVals:{[key]:temp.slice()}});
    }

    getSelectedOtaList = (val) =>{
        let temp = [];
        if (val && val.otaSelectVal && val.otaSelectVal.length){
            if(val.otaSelectVal[0] && val.otaSelectVal[0].length)
                for (let sel of val.otaSelectVal[0]){
                    temp.push(sel.value);
                }
        }
        return temp.slice();
    }

    setCurrentDate = ()=>{
        let curDate = new Date().toISOString().slice(0, 10);
        this.setState({ dateVal: curDate });
    }

    render(props){
        const { classes } = this.props;
        var disableButton = true;
        const { originVal, destinationVal, dateVal} = this.state;
        if (originVal && destinationVal && dateVal){
            disableButton = false;
        }
        return (
            <Card className={classes.searchContainer}>
                <CardContent className={classes.logoContainer}>
                    <svg className={classes.ytLogo} width="100px" height="50px" viewBox="0 0 442 190"><g fill="#EA2330"><path d="M200.68 103.77V84h-.06V71.36c0-22.21-21.45-40.21-45.4-40.21l-4-.06c-31.64 0-56.42 8.56-74.52 50.34-1.48 3.41-2.88 6.8-4.24 10.17l-.2.48c-3.07 7.59-5.25 13.75-8.48 21.84-6.36-12.57-11.55-23.18-15.94-32.13-15-30.62-21-42.9-32.58-49.47-2.348-1.35-5.14-1.704-7.75-.98-2.61.723-4.823 2.463-6.14 4.83-2.59 4.78-1.61 10.1 3.91 14.35 5.52 4.25 11.88 15.84 23.91 40.39 5.89 12 13.22 27 22.87 45.72.27.53.58 1.1.93 1.69C43.56 157.14 34.14 168 21 168.73c-8.65.5-10.77 6.26-9.69 12S16 190 21 190c26 0 42.25-23.92 57.82-58l.19-.44c2.37-5.54 4.64-11.3 7-17.27 3.1-8 6.31-16.32 9.87-24.54 13.83-31.92 29.49-37.82 55.36-37.82h4c11.09 0 24.63 7.64 24.63 19.45v6.54c-7.787-1.75-15.74-2.655-23.72-2.7h-.91c-27.82 0-45.49 18.05-45.49 40.26 0 22.21 17.67 40.21 45.49 40.21s45.49-18 45.49-40.21v-11.67l-.05-.04zm-20.86 10.39v1.27c0 11.83-9.6 19.49-24.63 19.49s-24.73-7.64-24.73-19.47c0-11.83 9.71-19.51 24.73-19.51h.91c6.76 0 15.65 1.34 23.72 2.92v15.3zM441.75 103.76V84h-.06V71.36c0-22.21-21.45-40.14-45.4-40.14 0 0-7.46-.07-9-.07-32.79 0-57.62 13.72-71.23 35.71-12.413-22.065-35.763-35.717-61.08-35.71h-10.37V8.21C244.61 3.68 240 0 234.23 0c-5.77 0-10.38 3.68-10.38 8.21v22.91h-12.54c-4.54 0-8.21 4.65-8.21 10.38s3.67 10.38 8.21 10.38h12.54v68.52c0 12.14 4.23 21.8 12.22 27.94 6.24 4.8 14.25 7.19 24.2 7.19 4.77-.04 9.53-.502 14.22-1.38h.13c4.47-.78 7.29-6 6.31-11.68-.98-5.68-5.4-9.55-9.87-8.77h-.17c-13.73 2.47-19.7.06-22.16-1.83-2.72-2.09-4.11-6-4.11-11.47V51.89h10.32c27.24.033 49.312 22.11 49.34 49.35v46.22c0 4.53 4.65 8.21 10.38 8.21S325 152 325 147.46v-36.89c0-34.58 22.61-58.68 62.21-58.68 1.83 0 7.6.08 7.6.08C409.76 52 421 59.53 421 71.34v6.57c-7.822-1.763-15.812-2.675-23.83-2.72h-.92c-27.82 0-45.49 18.05-45.49 40.26 0 22.21 17.67 40.21 45.49 40.21s45.49-18 45.49-40.21v-1l.01-10.69zM421 114.31v1.12c0 11.83-9.72 19.49-24.75 19.49s-24.73-7.64-24.73-19.47c0-11.83 9.71-19.51 24.73-19.51h.92c6.8 0 15.74 1.36 23.83 2.94v15.43z"></path></g></svg>
                    <h1 className={classes.title}>OTA Comparison</h1>
                </CardContent>
                <CardActions>
                    <PcAutocomplete id="originVal" label="Origin City" placeholder="Enter origin city" updateSelected={this.setSelectedValue} getSuggestions={getSuggestions} selector1="name" selector2="code"></PcAutocomplete>
                    <PcAutocomplete id="destinationVal" label="Destination City" placeholder="Enter destination city" updateSelected={this.setSelectedValue} getSuggestions={getSuggestions} selector1="name" selector2="code"></PcAutocomplete>
                    <TextField id="departDate" className={classes.marL9} label="Depart Date" type="date" autoComplete="current-password" InputLabelProps={{ shrink: true }} value={this.state.dateVal} onChange={(date)=>this.setState({dateVal:date.target.value})} onFocus={this.setCurrentDate}/>
                    <TextField id="flightNumber" className={classes.marL9} label="Flight Number" placeholder="Enter flight number" InputLabelProps={{ shrink: true }} value={this.state.flightNum} onChange={(flight) => this.setState({ flightNum: flight.target.value })}/>
                    <TextField id="airlineName" className={classes.marL9} label="Airline Name" placeholder="Enter airline name" InputLabelProps={{ shrink: true }} value={this.state.airName} onChange={(air) => this.setState({ airName: air.target.value })}/>
                    <PcMultiselect id="otaSelectVal" label="OTA" placeholder="Select OTA to compare" updateSelected={this.addSelectedValue} getSuggestions={getOtaSuggestions} suggestionsValue="name"></PcMultiselect>
                    <Button variant="contained" className={classes.marL9} color="primary" onClick={this.getSearchResult} disabled={disableButton}> Search </Button>
                </CardActions>
            </Card>
        )
    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(null,{updateRowData,updateColData})(withStyles(styles)(Search));
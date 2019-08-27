import React from 'react';
import Container from '@material-ui/core/Container';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import { makeStyles } from '@material-ui/core/styles';
import '../styles/tableStyles.css';
import { connect } from 'react-redux';

const useStyles = makeStyles(() => ({
    tableContainer: {
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '10px'
    },
    message: {
        fontSize: '25px',
        textAlign: 'center',
        marginTop: '20px'
    }
}));

function PcDetails(props) {
    const classes = useStyles();
    if (props.rowData && props.rowData.length && props.colData && props.colData.length){
        return (
            <Container className={classes.tableContainer}>
                <ReactTable 
                    data={props.rowData} 
                    columns={props.colData}
                    getTdProps = {
                        (state, rowInfo, column) => {
                            if (column && column.parentColumn && column.parentColumn.Header === 'Yatra'){
                                return { style: { background: '#ea7070'} }
                            } else if (column && column.parentColumn && column.parentColumn.Header === 'MMT') {
                                return { style: {background: '#e8e819' } }
                            } else if (column && column.parentColumn && column.parentColumn.Header === 'GoIbibo') {
                                return { style: {background: '#7171e2' } }
                            }else{
                                return {}
                            }
                        }
                    }
                    getTbodyProps = {
                        (state, rowInfo, column) => {
                            return { 
                                style: {
                                    fontSize: '14px',
                                    textAlign: 'center',
                                    color: '#333'
                                } 
                            }
                        }
                    }
                    getTheadProps = {
                        () => { return { style: { fontWeight: 'bold' }}}
                    }
                    getTheadGroupProps = {
                        () => { return { style: { fontSize: '18px' } } }
                    }
                />
            </Container>
        )
    }
    return <div className={ classes.message }>Enter details and click on search button above to start comparison</div>
}

const mapStateToProps = state => {
    return {
        rowData: state.rowData,
        colData: state.colData
    }
};

export default connect(mapStateToProps)(PcDetails);
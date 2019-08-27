import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Container from '@material-ui/core/Container';
import Search from './components/search';
import PcDetails from './components/pcdetails';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers'; 
import thunk from 'redux-thunk';

class App extends Component{
    render(){
        return (
            <Container>
                <Search></Search>
                <PcDetails></PcDetails>
            </Container>
        );
    }
}

ReactDOM.render(
    <Provider store={ createStore(reducer, applyMiddleware(thunk)) } >
        <App/>
    </Provider>,
    document.querySelector('#root')
);
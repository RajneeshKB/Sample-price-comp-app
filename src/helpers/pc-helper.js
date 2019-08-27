import React from "react";
import '../styles/tableStyles.css';
// import pcApis from '../apis/pc-apis';

export function initDataMaker(){
    let tempData = [{ "fare": {  "MMT": { "baseFare": "6493.0", "totalFare": "7650.0", "taxes": "1157.0", "ota": "MMT" }, "Yatra": { "baseFare": "22260.0", "totalFare": "25805.0", "taxes": "3545.0", "ota": "Yatra" } }, "duration": "05hrs 55mins", "tripType": "O", "flightNumber": "G8-713/413", "departTime": "20:05" }, { "fare": { "GoIbibo": { "baseFare": "0", "totalFare": "0", "taxes": "0", "ota": "" }, "MMT": { "baseFare": "5004.0", "totalFare": "5731.0", "taxes": "727.0", "ota": "MMT" }, "Yatra": { "baseFare": "5004.0", "totalFare": "5681.0", "taxes": "677.0", "ota": "Yatra" } }, "duration": "02hrs 10mins", "tripType": "O", "flightNumber": "I5-332", "departTime": "15:40" }];
    tempData = tempData.map((flData)=>{
        return {...flData,defaultVal:'Not available'};
    });
    return [...tempData];
}

const cities = [
    { name: 'New Delhi', code: 'DEL' },
    { name: 'Mumbai', code: 'BOM' },
    { name: 'Bangalore', code: 'BLR' },
    { name: 'Pune', code: 'PNQ' },
    { name: 'Kolkata', code: 'CCU' }
];

// const cities = { "id": "7afda2fa-c75a-4218-95e2-7641952d0638", "key": "", "airports": [{ "priority": 695908, "city": "New Delhi", "country": "India", "hotel": { "city": "New Delhi" }, "alias": "Dilli;Deli;Delli;Dali;DEL;Delhi;delhi", "type": "airportCity", "flight": [{ "ac": "DEL", "an": "Indira Gandhi International", "ct": "New Delhi", "cc": "IN", "cn": "India", "priority": 695908 }] }, { "priority": 527831, "city": "Mumbai", "country": "India", "hotel": { "city": "Mumbai" }, "alias": "Bumbay;Bumbai;BOM;Mumbi;Bombay", "type": "airportCity", "flight": [{ "ac": "BOM", "an": "Chhatrapati Shivaji International", "ct": "Mumbai", "cc": "IN", "cn": "India", "priority": 527831 }] }, { "priority": 321000, "city": "Bangalore", "country": "India", "hotel": { "city": "Bangalore" }, "alias": "Bangalaru; Bangaluru ;BLR;Banglore;Bengaluru", "type": "airportCity", "flight": [{ "ac": "BLR", "an": "Kempegowda International", "ct": "Bangalore", "cc": "IN", "cn": "India", "priority": 321000 }] }, { "priority": 199837, "city": "Chennai", "country": "India", "hotel": { "city": "Chennai" }, "alias": "Madras;Chinai;MAA;Madas;Mad;Maa", "type": "airportCity", "flight": [{ "ac": "MAA", "an": "Chennai International", "ct": "Chennai", "cc": "IN", "cn": "India", "priority": 199837 }] }, { "priority": 198048, "city": "Hyderabad", "country": "India", "hotel": { "city": "Hyderabad" }, "alias": "Hiderabad;HYD;Hydrabad", "type": "airportCity", "flight": [{ "ac": "HYD", "an": "Shamshabad Rajiv Gandhi", "ct": "Hyderabad", "cc": "IN", "cn": "India", "priority": 198048 }] }, { "priority": 189088, "city": "Goa", "country": "India", "hotel": { "city": "Goa" }, "type": "airportCity", "flight": [{ "ac": "GOI", "an": "Dabolim", "ct": "Goa", "cc": "IN", "cn": "India", "priority": 189088 }] }, { "priority": 188056, "city": "Kolkata", "country": "India", "hotel": { "city": "Kolkata" }, "alias": "Calcutta;Howrah;CCU;Hawrva;Kolkatta ", "type": "airportCity", "flight": [{ "ac": "CCU", "an": "Netaji Subhas Chandra Bose", "ct": "Kolkata", "cc": "IN", "cn": "India", "priority": 188056 }] }, { "priority": 108643, "city": "Pune", "country": "India", "hotel": { "city": "Pune" }, "alias": "Pona;Poona;Puna;Pune;PNQ", "type": "airportCity", "flight": [{ "ac": "PNQ", "an": "Lohegaon", "ct": "Pune", "cc": "IN", "cn": "India", "priority": 108643 }] }, { "priority": 108543, "city": "Jaipur", "country": "India", "hotel": { "city": "Jaipur" }, "type": "airportCity", "flight": [{ "ac": "JAI", "an": "Sanganeer", "ct": "Jaipur", "cc": "IN", "cn": "India", "priority": 108543 }] }, { "priority": 108443, "city": "Lucknow", "country": "India", "hotel": { "city": "Lucknow" }, "type": "airportCity", "flight": [{ "ac": "LKO", "an": "Amausi", "ct": "Lucknow", "cc": "IN", "cn": "India", "priority": 108443 }] }], "nearbyAirports": [] }

const ota = [{ name: 'Yatra' }, { name: 'MMT' }, { name: 'GoIbibo' } ];

export const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : cities.filter(city =>{ 
        return city.name.toLowerCase().includes(inputValue) || city.code.toLowerCase().includes(inputValue)
    });

    // let response = pcApis.get('/autoSuggest', { params: {key: inputValue} });
    // console.log('autocomplete response', response);

    // /** Using Autosuggest API */
    // if (cities && cities.airports && cities.airports.length){
    //     return cities.airports.map(d => {
    //         return { name: d.flight[0].ct, code: d.flight[0].ac }
    //     });
    // }else{
    //     return [];
    // }
};

export const getOtaSuggestions = () =>{
    return ota.map(suggestion => ({
        value: suggestion.name,
        label: suggestion.name
    }));
}

export const getSuggestionValue = suggestion => suggestion.name;

export const formatColData = (colData) =>{
    let cols = [
        {
            Header: 'Flight Number',
            accessor: 'flightNumber',
            sortable: false
        }, {
            Header: 'Depart Time',
            accessor: 'departTime',
            sortable: false
        }, {
            Header: 'Duration',
            accessor: 'duration',
            sortable: false
        }
    ];
    
    for (let ota of colData) {
        let tempObj = {
            Header: ota,
            columns: [
                {
                    Header: "Base Fare",
                    id: ota.toLowerCase() + 'BaseFare',
                    accessor: d => d.fare[ota] ? d.fare[ota].baseFare : d.defaultVal,
                    sortable: false,
                    Cell: row =>{
                        if (row.value === 'Not available'){
                            return <div style={{ color: 'red', background:'darkgrey'}}>{row.value}</div>
                        }else{
                            return <span>{row.value}</span>
                        }
                    }
                },
                {
                    Header: "Taxes",
                    id: ota.toLowerCase() + "Taxes",
                    accessor: d => d.fare[ota] ? d.fare[ota].taxes : d.defaultVal,
                    sortable: false,
                    Cell: row => {
                        if (row.value === 'Not available') {
                            return <div style={{ color: 'red', background: 'darkgrey' }}>{row.value}</div>
                        } else {
                            return <span>{row.value}</span>
                        }
                    }
                },
                {
                    Header: "Total Fare",
                    id: ota.toLowerCase() + 'TotalFare',
                    accessor: d => d.fare[ota] ? d.fare[ota].totalFare : d.defaultVal,
                    Cell: row => {
                        if (row.value === 'Not available') {
                            return <div style={{ color: 'red', background: 'darkgrey' }}>{row.value}</div>
                        } else {
                            return <span>{row.value}</span>
                        }
                    }
                }
            ]
        }
        cols.push(Object.assign({}, tempObj));
    }
    return [...cols];
}

export const getDefaultColData = ()=>{
    return ['Yatra', 'MMT', 'GoIbibo'];
}
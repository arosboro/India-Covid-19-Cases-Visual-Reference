'use strict';
const _ = require('lodash');
const async = require('async');
const geojsonStream = require('geojson-stream');
const fs = require('fs');
const out = fs.createWriteStream('./OUT/covid-19-india-districts.geojson');
console.log('Libraries loaded.');

//Converter Class
const Converter = require("csvtojson").Converter;
const covid_numbers_converter = new Converter({workerNum: 4});
console.log('Converters initialized.');

const covid_data_name = '2019-03-27-DistrictWiseList324.csv';
const india_districts = 'india_district.json';

const state_normalize = function(input1, input2) {
    const mapping = {
        'Delhi': 'NCT of Delhi',
        'J&K': 'Jammu & Kashmir',
        'Ladakh': 'Jammu & Kashmir',
        'Telangana': 'Andhra Pradesh',
        'BIHAR': 'Bihar',
    };
    if (Object.keys(mapping).indexOf(input1) !== -1) {
        if (district_normalize(input2) === 'Uttara Kannada') {
            return 'Karnataka';
        }
        if (district_normalize(input2) === 'Rangareddy') {
            return 'Andhra Pradesh';
        }
        return mapping[input1];
    }
    else {
        return input1;
    }
};

const district_normalize = function(input) {
    const mapping = {
        'Vizag': 'Visakhapatnam',
        'MUNGER': 'Munger',
        'PATNA': 'Patna',
        'East Delhi': 'East',
        'North Delhi': 'North',
        'South Delhi': 'South',
        'West Delhi': 'West',
        'Bangalor Urban': 'Bangalore',
        'Bengaluru Urban': 'Bangalore',
        'Nellore': 'Sri Potti Sriramulu Nellore',
        'Ahmedabad': 'Ahmadabad',
        'Vishakhapatnam': 'Visakhapatnam',
        'Kalaburgi': 'Gulbarga',
        'Kutch': 'Kachchh',
        'Gurugram': 'Gurgaon',
        'Chikkaballapura': 'Chikmagalur',
        'Uttar Kannada': 'Uttara Kannada',
        'Kasargod': 'Kasaragod',
        'Mallapuram': 'Malappuram',
        'Thiruvanthpuram': 'Thiruvananthapuram',
        'Leh': 'Leh (ladakh)',
        'Ahmednagar': 'Ahmadnagar',
        'Mumbai Suburb': 'Mumbai Suburban',
        'Dakshin Kannada': 'Dakshina Kannada',
        'Raigad': 'Raigarh',
        'Khurda': 'Khordha',
        'SBS Nagar': 'Shahid Bhagat Singh Nagar',
        'SAS Nagar': 'Sahibzada Ajit Singh Nagar',
        'Jhunjhunu': 'Jhunjhunun',
        'Coimbatoor': 'Coimbatore',
        'Kanchipurum': 'Kancheepuram',
        'Tiruneveli': 'Tirunelveli',
        'Tirupur': 'Tiruppur',
        'Ranga Reddy': 'Rangareddy',
        'GB Nagar': 'GAUTAM BUDDHA NAGAR',
        'Kanpur': 'KANPUR NAGAR',
        'Moradabd': 'MORADABAD',
        'Philibhit': 'PILIBHIT',
        'North 24 Pargana': 'North 24 Parganas',
        'Warangal (U)': 'Warangal',
        'Medchal': 'Rangareddy',
        'Bhadradri Kothagudam': 'Uttara Kannada',
        'Chitoor': 'Chittoor',
        'Vijayawada,Krishna': 'Krishna',
        'Bandipora': 'Bandipore',
        'BBMP': 'Uttara Kannada',
        'Bengaluru': 'Bangalore Rural',
        'Aizwal (W)': 'Aizawl',
        'Nawanshahr': 'Shahid Bhagat Singh Nagar',
        'Madchal': 'Rangareddy',
        'Mahboobnagar': 'Mahbubnagar',
        'Pauri Garhwal': 'Garhwal',
        'South 24 Pargana': 'South 24 Parganas',
    };
    if (Object.keys(mapping).indexOf(input) !== -1) {
        return mapping[input];
    }
    else {
        return input;
    }
};

const covid_numbers_scrub = function(callback) {
    //end_parsed will be emitted once parsing finished
    covid_numbers_converter.then(function(jsonArray) {
        let results = [];
        try {
            _.forEach(jsonArray, function(row) {
                // India Districts.
                results.push({
                    'state': state_normalize(row['State'], row['District']),
                    'district': district_normalize(row['District']),
                    'cases': parseInt(row['Cases']),
                });
            });
        }
        catch (err) {
            console.log('Error Processing Data Records...');
            callback(err, results);
        }
        console.log('Done Processing Data Records...');
        callback(null, results);
    });
    fs.createReadStream("./IN/" + covid_data_name).pipe(covid_numbers_converter);
};

let matched = [];
let total_cases = 0;

const final_callback = function(err, results) {  // The final callback after parallel task.
    if (err) {
        throw(err);
    }

    if (results.data.length) {
        let stream = fs
            .createReadStream('./IN/' + india_districts)
            .pipe(geojsonStream.parse((district, index) => {
                let hit = _.filter(results.data, (row) => { return row.state === district.properties['st_nm'] &&
                    row.district.toUpperCase() === district.properties['district'].toUpperCase() });
                if (hit.length) {
                    let row = hit[0];
                    if (hit.length > 1) {
                        row = {state: hit[0].state, district: hit[0].district, cases: 0};
                        _.forEach(hit, (r) => { row.cases += r.cases});
                        matched = matched.concat(hit);
                    }
                    matched.push(row);
                    total_cases += row.cases;
                    if (typeof district.properties['cases'] === 'undefined') {
                        district.properties['cases'] = 0;
                    }
                    district.properties['cases'] += row.cases;
                    return district;
                }
                else {
                    // let hit1 = _.filter(results.data, (row) => { return row.state === district.properties['st_nm'] });
                    // let hit2 = _.filter(results.data, (row) => { return row.district.toUpperCase() === district.properties['district'].toUpperCase() });
                    return null;
                }
            }))
            .pipe(geojsonStream.stringify())
            .pipe(out);

            stream.on('finish', () => {
                console.log(total_cases);
                console.log(_.difference(results.data, matched));
            });
    }
};

// Start the parallel tasks. Each function pipes the file to the converter which executes a callback on file end.
console.log("Starting Parallel Tasks.");
async.parallel({
    data: covid_numbers_scrub,
}, final_callback);


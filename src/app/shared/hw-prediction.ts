// // Omar Hoosain
// // hw-prediction.ts
// /**
//  * Use Machine Learning Linear Regression
//  * and data from previous findings of time spent on hw
//  * to make an accurate algorithm that can predict how much time
//  * a certain subject will take
//  */


// const ml = require('ml-regression');
// const csv = require('csvtojson');
// const SLR = ml.SLR; // Simple Linear Regression

// const readline = require('readline');


// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// // Need to receive array from Firebase

// /**const csvFilePath = 'advertising.csv'; // Data
// let csvData = [], // parsed Data
//     X = [], // Input
//     y = [], // Output
// */

//     let regressionModel;

// function addData() {
//     X.push(f( /* Collect from Array from Firebase */ ));
//     y.push(f( /* Collect from Array from Firebase */ ));
// }

// function performRegression() {
//     regressionModel = new SLR(X, y) // Train the model on training data
//     console.log(regressionModel.toString(3));
//     predictOutput();
// }

// function predictOutput() {
//     rl.question('Enter input X for time prediction (Press CTRL+C to exit) : ', (answer) => {
//         console.log(`At X = ${answer}, y = ${regressionModel.predict(parseFloat(answer))}`);
//         predictOutput();
//     });
// }
 
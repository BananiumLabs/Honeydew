// Omar Hoosain
// hw-prediction.ts
/**
 * Use Machine Learning Linear Regression
 * and data from previous findings of time spent on hw
 * to make an accurate algorithm that can predict how much time
 * a certain subject will take
 */

import * as ml from 'ml-regression';
import * as readline from 'readline';

// declare ml = require('ml-regression');
// declare csv = require('csvtojson');

 export class HWPrediction {
    
   
    SLR = ml.SLR; // Simple Linear Regression
    
    // const readline = require('readline');
    
    
    
    // Need to receive array from Firebase
    
    X = [5, 4, 8, 2];
    y = [30, 30, 55, 40];
    
    
    regressionModel;
    
    addData() {
        // X.push(f( /* Collect from Array from Firebase */ ));
        // y.push(f( /* Collect from Array from Firebase */ ));
    }
    
    performRegression() {
        this.regressionModel = new this.SLR(this.X, this.y); // Train the model on training data
        this.predictOutput();
    }
    
    predictOutput() {
        ml.question('Enter input X for time prediction (Press CTRL+C to exit) : ', (answer) => {
            console.log(`At X = ${answer}, y = ${this.regressionModel.predict(parseFloat(answer))}`);
            // this.predictOutput();
        });
    }
    
 }
 
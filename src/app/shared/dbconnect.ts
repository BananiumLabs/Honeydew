import * as firebase from 'firebase';
import {UserInfo} from "./user-info";
import { AuthService } from "./auth.service";
import {AppComponent} from "../app.component";

export class dbconnect {

  constructor(){
    var app = firebase.initializeApp({
    apiKey: "AIzaSyAjeIfPsuQGJ_ojy_a_DNlq4YJPZcdAg-A",
    authDomain: "honeydew-hw-helper.firebaseapp.com",
    databaseURL: "https://honeydew-hw-helper.firebaseio.com",
    projectId: "honeydew-hw-helper",
    storageBucket: "honeydew-hw-helper.appspot.com",
    messagingSenderId: "87786419738"
    });
	}


	//Write to Database
  saveUID(uid: string, controlVar: any){
    //Set daily limit here!
    var dailyLimit = 150;
    //Get date in format (yyyy/mm/dd)
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    var newdate = year + "/" + month + "/" + day;

    var existdate : string;
    var controlMultiplier = controlVar;
    var db = firebase.database().ref('users').child(uid);
    var usersRef = firebase.database().ref('users');
		var d = new Date();
		var ptTime : number;
		var suspicious : boolean;
		var theme : string;
    var currentLimit : string;
		var gridInvalid : boolean;
		var adClicks : number;

    if(uid == undefined || uid == null)
      return;
		  //Get initial database values
			this.getUID(uid, function(returnValue) {
	 			suspicious = returnValue.isSuspicious;
				ptTime = returnValue.pointTime;
				theme = returnValue.theme;
        existdate = returnValue.Date;
        currentLimit = returnValue.Limit;
        gridInvalid = returnValue.gridOptions.swap !== undefined;
				var curPoint = returnValue.points;
				adClicks = returnValue.adClicks;
				const MAX_AD_CLICKS = 3;

        if(existdate != newdate) {

          db.update( {
            "Date": newdate,
						"Limit": "0",
						"adClicks": 0
          });
				}

				if(adClicks > MAX_AD_CLICKS) {
						 db.update( {
							 "isSuspicious": true,
							 "reason": "Max ad clicks exceeded"
              });
				}

        if(existdate != undefined && existdate != null) {
          if(existdate == newdate) {
            if(Number(currentLimit) > dailyLimit) {
              //console.log("Daily limit EXCEEDED!");
              db.update( {
                "Limit": dailyLimit,
                "points": curPoint - controlMultiplier
              });
            }

          }
        }

	 		});

			 //Increment points
        db.child('points').transaction(function(points) {

              if (points) {
                  points = points + controlMultiplier;
              }
              else {
                  points = points + controlMultiplier;
              }
              return (points);
          });

            db.child('Limit').transaction(function(Limit) {
              var limT = Number(Limit) + 1;
                      Limit = String(limT);

                  return (Limit);
              });

          db.once('value', function(snapshot) {

						//First time setup
              if (!snapshot.hasChild("pointTime"))
                db.update({
    						  "pointTime": -1
                });

              if (!snapshot.hasChild("adClicks"))
                db.update({
    						  "adClicks": 0
								});

							if (!snapshot.hasChild("theme"))
								db.update({
									"theme": 'vanilla'
								});

              if (!snapshot.hasChild("pointsThisPeriod"))
                db.update( {
    						  "pointsThisPeriod": -1
								});

							if (!snapshot.hasChild("color"))
                db.update( {
    						  "color": 'green'
								});

							if (!snapshot.hasChild("modifier"))
							db.update( {
								"modifier": 'none'
							});

							if(theme === 'color' || theme === 'invert')
							db.update( {
								"theme": 'vanilla'
              });

              if(!snapshot.hasChild("engine"))
							db.update( {
								"engine": 'Google'
              });

              if(!snapshot.hasChild("gridOptions"))
                db.update( {
                  "gridOptions": {
                    gridType: 'fit',
                    compactType: 'none',
                    margin: 10,
                    outerMargin: true,
                    minCols: 1,
                    maxCols: 100,
                    minRows: 1,
                    maxRows: 100,
                    maxItemCols: 50,
                    minItemCols: 1,
                    maxItemRows: 50,
                    minItemRows: 1,
                    defaultItemCols: 1,
                    defaultItemRows: 1,
                    fixedColWidth: 250,
                    fixedRowHeight: 250,
                    displayGrid: 'none',
                  }
                });


              if (!snapshot.hasChild("grid"))
                db.update({
                  "grid": [{ cols: 2, rows: 2, y: 0, x: 0, id: 0 }]
                });

						//Anti-spam: Checks points per minute
							db.child('pointsThisPeriod').transaction(function(points) {
								////console.log(d.getUTCMinutes() + ' vs ' + ptTime);
								if (ptTime === d.getUTCMinutes()) {
									points = points + 0.5;

									db.update( {
										"pointTime": d.getUTCMinutes()
									});

								} else if(ptTime !== d.getUTCMinutes()) {
									points = 0;
									////console.log("pointTime set to " + d.getUTCMinutes());
									db.update( {
										"pointTime": d.getUTCMinutes()
									});

								}

								//User gets flagged as suspicious
								if(points && points >= 5) {
									db.update( {
										"isSuspicious": true,
										"reason": "Suspected Macro Usage"
									});
								}
								return (points);
							});
          });
	}

	//Read from database
  getUID(uid: string, callback) {
      if(uid != undefined) {
      var db = firebase.database().ref('users').child(uid);
      db.on('value', function(points) {
          if(points.val() != undefined && points.val() != null )
            callback(points.val());
      });
    }
  }

  getLimit(uid: string, callback) {
      if(uid != undefined) {
      var db = firebase.database().ref('users').child(uid);
      db.on('value', function(points) {
          if(points.val() != undefined && points.val() != null )
            callback(points.val());
      });
    }
  }

  //Add custom field( ex. dynamic name, ip list )
  saveCustom(uid: string, name: string, data: any) {
      var db = firebase.database().ref('users').child(uid);
      db.update({
        [name]: data
      });
  }

  //read custom value from database
  getCustom(uid: string, name: string, callback) {
      if(uid != undefined) {
      var db = firebase.database().ref('users').child(uid).child(name);
      db.on('value', function(rtrn) {
          //if(rtrn.val() != undefined && rtrn.val() != null )
            callback(rtrn.val());
      });
    }
  }

  checkExist(uid: string, value: string, callback) {
    var db = firebase.database().ref('users').child(uid);
    db.once('value', function(snapshot) {
      if (snapshot.hasChild(value))
        callback(true);

      else
        callback(false);
    });
  }

	//Returns if the redeemStatus variable is equal to 1
  getRedeemStatus(uid: string): boolean {

	  var rtrn = false;
	  firebase.database().ref('users').child(uid).on('value', function(points) {
		  rtrn = (points.val().redeemStatus === undefined) ? false : points.val().redeemStatus === 1;
	  });

	  return rtrn;
  }

	//Remove points when user redeems
  deductPoints(uid: string, amount: number, type: string){
    var db = firebase.database().ref('users').child(uid);
		var currPoints : number;
		var beforeDate : string;
		var d = new Date();
		var valid = true;
    //console.log(uid);
		db.on('value', function(points) {
			 currPoints = points.val().points;
			 beforeDate = (points.val().time === undefined) ? "---" : points.val().time;

			 valid = points.val().points - amount >= 0;
		});

		//If a user tries to redeem with insufficient points
		if(valid) {
        db.update({
			  "points": currPoints-amount,
			  "redemption": amount,
			  "previous-time": beforeDate,
			  "time": d.getUTCFullYear().toString().concat("/" , d.getUTCMonth().toString() , "/" , d.getUTCDate().toString() , " " , d.getUTCHours().toString() , ":" , d.getUTCMinutes().toString()),
			  "redeemStatus": 1,
			  "type": type

		  });
	  } else {
		  db.update({
			  "isSuspicious": true,
			  "reason": "negative points"
		  });
	  }
  }
}

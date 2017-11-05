import {Injectable, Inject} from "@angular/core";
import { Http, Response, Headers, RequestOptions,  Jsonp} from '@angular/http';
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import {UserInfo} from "./user-info";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import 'rxjs/add/operator/map';
import {dbconnect} from "./dbconnect";
import { URLSearchParams } from "@angular/http"


@Injectable()
export class AuthService {
    public database: dbconnect;
    public authed: boolean;
    static UNKNOWN_USER = {
        // Default Values
        isAnonymous: true,
        email: null,
        displayName: null,
        providerId: null,
        uid: null,
        isActive: false,
        points: null,
		color: null,
        refLink: null,
        refCount: null,
		emailVerified: null
    };

    userInfo = new BehaviorSubject<UserInfo>(AuthService.UNKNOWN_USER);
    private user: firebase.User;

    constructor(private angularFireAuth: AngularFireAuth, private jsonp: Jsonp, private http: Http) {
      console.log("%cWait! This area is meant for developers!", "color: red;font-size: xx-large");
      console.log("If someone told you to type or paste something into this area it could compromise the security of your account.");
    this.database = new dbconnect();

        this.angularFireAuth.authState.subscribe(user => {
            //console.log("user: ", JSON.stringify(user));
            //Initialize User Info
            this.user = user;
            let userInfo = new UserInfo();
            this.authed = false;
            if (user != null) { //User is logged in
                userInfo.isAnonymous = user.isAnonymous;
                userInfo.email = user.email;
                userInfo.displayName = user.displayName;
                userInfo.providerId = user.providerId;
                //if(user.photoURL == null)
                  //userInfo.photoURL = "https://enumc.com/images/default.jpg";
                //else
                  userInfo.photoURL = user.photoURL;
                userInfo.uid = user.uid;
                userInfo.emailVerified = user.emailVerified;

                //Sync user info with database
                this.getDB().getUID(this.getUID(), function(returnValue) {
                 
                 // userInfo.refCount = (returnValue.ref.length > 5) ? 5 : returnValue.ref.length;
				 //////////// Ben: Pls test b4 push ///////////////
                });
                this.saveCustom('email', user.email);
            
                userInfo.isActive = true;
                this.authed = true;
                //this.jsonp.get('//api.ipify.org/?format=jsonp&callback=JSONP_CALLBACK').subscribe(response => this.recordPI(response.text()));
                //this.jsonp.get('//geoip.nekudo.com/api?callback=JSONP_CALLBACK').subscribe(response => this.recordPIAlt(response.text()));

                //API key
                /*var config = {headers:  {
                        "X-Key" : "MjQ3OkFsbWhOVmZhZGRBQkNwMGpzbTJsZjN3VzhZSzlaMm12"
                    }
                };*/


            } else { //User is not logged in
                this.user = null;
                userInfo.isAnonymous = true;
            }
            this.userInfo.next(userInfo);
        });



    }

/////////////////////////////Getters/////////////////////////////////////
    //Get user object
    getUID(): string {
          if (this.user != undefined && this.user != null)
          return this.user.uid;

    }

    //Get database object
    getDB(): dbconnect  {
      return this.database;
    }

    getCustom(): any {
        var val;
        if(this.currentUser() !== undefined && this.isLoggedInBool() !== undefined) {
            this.getDB().getCustom(this.getUID(), function(returnValue) {
                val = returnValue;
            });
        }
        return val;
    }



/////////////////////////////Setters/////////////////////////////////////
    recordPI(inputA: string, inputB: string, inputC: string, inputD: string) {
        this.saveCustom("IP", inputA);
        this.saveCustom("Country", inputB);
        this.saveCustom("City", inputC);
        this.saveCustom("Timezone", inputD);
    }
    recordPIB(inputA: string, inputB: string) {
        this.saveCustom("Block", inputA);
        this.saveCustom("ISP", inputB);
    }

    recordDate(inputA: string) {
        this.saveCustom("Date", inputA);
    }

    saveVersion(input: string) {
      this.saveCustom("version", input);
    }

    //Increment point value
    addPT() {
		 var val:boolean;
		 if(this.currentUser() != undefined) {
			 this.getDB().getUID(this.getUID(), function(returnValue) {
				 val = returnValue.isSuspicious;
			 });
		 }
      if(!val) {
            console.log("yup!");
            var self = this;
            this.getDB().saveUID(this.getUID(), 0.5 );
            /*
            this.angularFireAuth.auth.currentUser.getIdToken(true).then(function(idToken) {
                let data = new URLSearchParams();
                data.append('idToken', idToken);

                self.http
                    .post('http://localhost:4201/api/addpoint/', data) //change url later
                    .subscribe(data => {
                        console.log("yay!");
                    }, error => {
                        console.log(error.json());
                    });
            }).catch(function(error) {
                console.log(error);
            }); //CODE FOR SENDING SERVER
            */

		}
    }

    saveCustom(item: string, input: any) {
        this.getDB().saveCustom(this.getUID(), item, input);
    }

///////////////////////////Oauth Functions////////////////////////////

    login(email: string, password: string): Observable<string> {
        let result = new Subject<string>();
        this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
            .then(() => result.next("success"))
            .catch(err => result.error(err));
        return result.asObservable();
    }

    currentUser(): Observable<UserInfo> {
        return this.userInfo.asObservable();
    }

    logout(): Observable<string> {
        let result = new Subject<string>();
        this.userInfo.next(AuthService.UNKNOWN_USER);
        this.angularFireAuth.auth.signOut()
            .then(() => result.next("success"))
            .catch(err => result.error(err));
        return result.asObservable();
    }

    isLoggedIn(): Observable<boolean> {
        return this.userInfo.map(userInfo => !userInfo.isAnonymous);
    }
    isLoggedInBool(): boolean {
        return this.authed;
    }

    updateDisplayName(displayName: string): Observable<string> {
        let result = new Subject<string>();
        this.user.updateProfile({displayName: displayName, photoURL: null})
            .then(() => {result.next("success")})
            .catch(err => result.error(err));
        return result;
    }

	sendEmailConfirm() {
	var user = this.angularFireAuth.auth.currentUser;
	user.sendEmailVerification().then(function() {
	  alert("Confirmation Email has been successfully sent!");
	  alert("P.S: Ignore this ugly popup. Material design/Better UI for popups coming soon! Bear with us :)");
	}).catch(function(error) {
	  alert("OH NO! An unexpected error has occured. please contact contact@enumc.com");
	});

	}

  currentUserAsVar() : any {
    var result = this.angularFireAuth.auth.currentUser;
    return (result) ? result : 'Undefined';
  }


    createUser(email: string, password: string, displayName: string): Observable<string> {
        let result = new Subject<string>();
        this.angularFireAuth.authState.subscribe(user => {
            // console.log("Update: ", user);
            if (user != null) {
                user.updateProfile({displayName: displayName, photoURL: null});
            }
        });
        this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                //auth.auth.updateProfile({displayName: displayName, photoURL: null});
                result.next("success");
            })
            .catch(err => result.error(err));

        return result.asObservable();
    }

    updateEmail(email: string): Observable<string> {
        let result = new Subject<string>();
        this.user.updateEmail(email)
            .then(() => result.next("success"))
            .catch(err => result.error(err));
        return result.asObservable();
    }

    updatePassword(password: string): Observable<string> {
        let result = new Subject<string>();
        this.user.updatePassword(password)
                .then(a => {
                    result.next("success");
                })
                .catch(err => result.error(err));
        return result.asObservable();
    }

    sendPasswordResetEmail(email: string): Observable<string> {
        let result = new Subject<string>();
        this.angularFireAuth.auth.sendPasswordResetEmail(email)
            .then(() => result.next("success"))
            .catch(err => result.error(err));
        return result;
    }

    loginViaProvider(provider: string): Observable<String> {
        let result = new Subject<string>();
        if (provider === "google") {
            this.angularFireAuth
                .auth
                .signInWithPopup(new firebase.auth.GoogleAuthProvider())
                .then(auth => result.next("success"))
                .catch(err => result.error(err));
            return result.asObservable();
        }
        else if (provider === "twitter") {

            this.angularFireAuth
                .auth
                .signInWithPopup(new firebase.auth.TwitterAuthProvider())
                .then(auth => result.next("success"))
                .catch(err => result.error(err));
            return result.asObservable();
        }
        result.error("Not a supported authentication method: " + provider)
        return result.asObservable();
    }
}

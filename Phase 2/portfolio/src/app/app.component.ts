import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  signInError:string;
  constructor() {
    this.signInError="Invalid Login";
   }

  loginRef = new FormGroup({
    user:new FormControl("",[Validators.required]),
    pass:new FormControl("",[Validators.required])
  })

  registerRef = new FormGroup({
    firstName: new FormControl("",[Validators.required]),
    lastName: new FormControl("",[Validators.required]),
    userName: new FormControl("",[Validators.required]),
    password: new FormControl("",[Validators.required])
  })

  register:Array<any>=[];
  contactInfo:Array<any>=[];
  loginFlag:boolean=true;
  registerFlag:boolean=false;
  portfolioFlag:boolean=false;
  tableflag:boolean=false;
  errorFlag:boolean=false;
  displayName:string="";
  
  displayLogin(){
    this.loginFlag=true;
    this.registerFlag=false;
  }

  displayRegistration(){
    this.registerFlag=true;
    this.loginFlag=false;
  }

  displayPortfolio(){
  }

  checkUser() {
    let login = this.loginRef.value;

    for(let i=0; i<this.register.length;i++){

      console.log("User: " +this.register[i].ruser)
      console.log("Pass: " +this.register[i].rpass)
      if (login.user == this.register[i].ruser && login.pass == this.register[i].rpass){
        this.loginFlag=false;
        this.portfolioFlag=true;
        this.displayName=this.register[i].ruser;
       }       
    }
    if(this.portfolioFlag==false){
      this.errorFlag=true;
    }
    this.loginRef.reset();
  }

  addRegistrationInfo(){
    let registerUser = this.registerRef.value;

    let first = registerUser.firstName;
    let last = registerUser.lastName;
    let user = registerUser.userName;
    let pass = registerUser.password;

    let registerInfo = {rfirst: first, rlast: last, ruser: user, rpass:pass};
    this.register.push(registerInfo);

    console.log(this.register[0].rfirst)
    console.log(this.register[0].rlast)
    console.log(this.register[0].ruser)
    console.log(this.register[0].rpass)
  }

  saveContact(contactName:any, phone:any){
    let name = contactName.value;
    let number = phone.value

    let contactData= {cname:name, cnumber:number};
    this.contactInfo.push(contactData);
    localStorage.setItem("info", JSON.stringify(this.contactInfo));

    console.log(this.contactInfo[0].cname)
    console.log(this.contactInfo[0].cnumber)
  }

  displayTable(){
    //set the flag variable to TRUE to display the table after button event
    this.tableflag=true;
    let information = localStorage.getItem("info");
    let infoJson = JSON.parse(information!);
  }
}

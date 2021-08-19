import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import examquestions from 'src/assets/examquestions.json';
import examresults from 'src/assets/examresults.json';

@Component({
  selector: 'app-exam-material',
  templateUrl: './exam-material.component.html',
  styleUrls: ['./exam-material.component.css']
})
export class ExamMaterialComponent implements OnInit {
  myForm:FormGroup;
  constructor(public form:FormBuilder) {
    this.myForm=form.group({});
   }

   //convert json file materials to array

   examArr: any[]=examquestions;
   resultsArr: any[]=examresults;
   examResults=0;
   testRadio: string[]=[];
   userAnsFlag: boolean=false;
   correctAnsFlag: boolean=false;
   incorrectAnsFlag: boolean=false;
   resultFlag: boolean=false;
   showResults: string[]=[];
   percentage: number=0;
   resultStr: string="";
  

  ngOnInit(): void {
    this.examArr.forEach(q=> {
      this.myForm?.addControl(q.question,this.form.control(""));
                              //user:new FormControl();
                              //q.question
    })
  }

  submit(){
    console.log(this.myForm);
  }

  trackByIdx(index: number, obj:any): any{
    return index;
  }

  countAnswers(){
    //check radio button
    for(let i=0;i<this.testRadio.length;i++){
      if(this.testRadio[i]==this.resultsArr[i].correctAns){
          this.examResults++;   
          this.userAnsFlag=true;
          //this.incorrectAnsFlag=false;
          this.correctAnsFlag=true;
      } else{
          // this.userAnsFlag=false;
          // //this.incorrectAnsFlag=true;
          // this.correctAnsFlag=true;
          
        }
      console.log("Answer entered: "+this.testRadio[i]+ " Correct: "+this.resultsArr[i].correctAns);
    }

    //calculate exam results
    this.percentage = (this.examResults*100)/15;
      if(this.percentage>65){
        this.resultStr="Congratulations, you passed!"
      } else if (this.percentage<65){
        this.resultStr="You did not pass, take it again."
      }
    this.resultFlag=true;
    console.log("Result: "+this.examResults);

   }

   displayOutput(){

   }
}

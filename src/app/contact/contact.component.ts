import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactType, Feedback } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedback: Feedback;
  feedbackForm: FormGroup;
  contactType = ContactType;

  constructor(private fb: FormBuilder) {
    this.CreateForm();
   }

  ngOnInit(): void {
  }

  CreateForm(){
    this.feedbackForm = this.fb.group({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }

  onSubmit(): void{
    console.log(this.feedbackForm.value);
    this.feedbackForm.reset();
  }
}

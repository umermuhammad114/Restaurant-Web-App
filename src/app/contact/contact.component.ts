import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { expand, flyInOut } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';
import { ContactType, Feedback } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class ContactComponent implements OnInit {

  feedback: Feedback;
  feedbackForm: FormGroup;
  feedbackResponse: Feedback | any;
  errMess: string;
  contactType = ContactType;
  showForm: boolean = true;
  showSpinner: boolean;
  showResponse: boolean;

  @ViewChild('fform') feedbackFormDirective: any;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

  constructor(private fb: FormBuilder,
    private feedbackService: FeedbackService) {
    this.CreateForm();
   }

  ngOnInit(): void {
  }

  CreateForm(){
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        let fieldd = field as keyof typeof this.formErrors;
        this.formErrors[fieldd] = '';
        const control = form.get(fieldd);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[fieldd];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[fieldd] += messages[key as keyof typeof messages] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit(): void{
    this.showSpinner = true;
    this.showForm = false;
    this.feedback = this.feedbackForm.value;
    
    setTimeout(() => { 
      this.showSpinner = false;
      this.showResponse = true;
    }, 2000);

    this.feedbackService.submitFeedback(this.feedback).subscribe({
      next: (feedback) => this.feedbackResponse = <any>feedback, 
      error: (errmess) => this.errMess = <any>errmess
    });

    setTimeout(() => {
     this.showResponse = false;
     this.showForm = true;
    }, 5000);
   
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }
}

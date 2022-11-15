import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { DishService } from '../../services/dish.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
 
  dish: Dish;
  commentForm: FormGroup;
  comment: Comment;
  @ViewChild('comform') commentFormDirective: any;

  formErrors = {
    'author': '',
    'comment': '',
  };

  validationMessages = {
      'author': {
        'required': "Name is required.",
        'minlength': "Name must be at least 2 characters long."
      },
      'comment': {
        'required': "Comment is required."
      }
  };

  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') public baseURL) {
      
    this.CreateForm();
    
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params["id"];
    this.dishService.getDish(id)
    .subscribe((dish) => this.dish = dish);
  }

  goBack(): void {
    this.location.back();
  }

  CreateForm(): void {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: 5,
      comment: ['', [Validators.required]]
    });

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onSubmit(): void {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.dish.comments.push(this.comment);
    this.commentFormDirective.resetForm({
      author: '',
      rating: 5,
      comment: ''
    });

  }

  onValueChanged(data?: any){
    if (!this.commentForm) { return; }
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        let fieldd = field as keyof typeof this.formErrors;
        // clear previous error message (if any)
        this.formErrors[fieldd] = '';
        const control = this.commentForm.get(fieldd);
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

}

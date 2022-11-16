import { Component, Inject, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMess: string;

  constructor(private dishService: DishService,
    @Inject('BaseURL') public baseURL) { }

  ngOnInit(): void {
    this.dishService.getDishes().subscribe(
      {
        next: (dishes) => this.dishes = dishes,
        error: errmess => this.errMess = <any>errmess
      });
  }
}

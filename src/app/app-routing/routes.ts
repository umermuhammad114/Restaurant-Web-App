import { Routes } from "@angular/router";
import { AboutComponent } from "../about/about.component";
import { ContactComponent } from "../contact/contact.component";
import { HomeComponent } from "../home/home.component";
import { MenuComponent } from "../menu/menu.component";

export const ROUTES: Routes = [
 {'path': 'home', component: HomeComponent},
 {'path': 'menu', component: MenuComponent},
 {'path': 'about', component: AboutComponent},
 {'path': 'contactus', component: ContactComponent},
 {'path': '', redirectTo: '/home', pathMatch: 'full'}
]
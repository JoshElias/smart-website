import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, NoContentComponent, PricingComponent,
  FAQComponent, ContactComponent, FeaturesComponent } from './components';


export const ROUTES: Routes = [
  { path: '',               component: HomeComponent, pathMatch: "full" },
  { path: "home",           component: HomeComponent },
  { path: "features",       component: FeaturesComponent },
  { path: "pricing",        component: PricingComponent },
  { path: "faq",            component: FAQComponent },
  { path: "contact",        component: ContactComponent },
  { path: '**',             component: NoContentComponent },
];
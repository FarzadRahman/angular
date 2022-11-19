import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { AuthStateService } from '../../services/auth-state.service';
import {  CartService } from '../../services/cart.service';
import {Subject} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isSignedIn!: boolean;
  cartCount:any;
  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
    private cartService: CartService
  ) {
    this.cartCount = this.cartService.cartCount$.subscribe(
      count => {
        // this runs everytime the count changes
        this.cartCount = count;
      }
    )

    this.cartService.setCartCount(this.cartService.items.length); // init to 0?

  }

  ngOnInit() {
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });
  }

   // Signout
   signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login']);
  }


}

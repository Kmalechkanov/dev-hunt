import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    add(id: number): void {
        let cart = this.get();
        cart.push(id);

        localStorage.setItem('Cart', JSON.stringify(cart));
    }

    clear(): void {
        localStorage.setItem('Cart', JSON.stringify([]));
    }

    remove(id: number): void {
        let cart = this.get();
        const index = cart.indexOf(id);
        if (index > -1) {
            cart.splice(index, 1);
        }

        localStorage.setItem('Cart', JSON.stringify(cart));
    }

    isCartified(id: number): boolean {
        let cart = this.get();

        return cart.includes(id);
    }

    get(): number[] {
        let cartString = localStorage.getItem('Cart');
        let cart = [];
        if (cartString) {
            cart = JSON.parse(cartString);
        }
        return cart;
    }
}
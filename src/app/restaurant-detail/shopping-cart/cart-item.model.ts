import { MenuItem } from "../menu-item/menu-item.model";

export class CartItem {
  constructor(public menuItem: MenuItem,
              public quantity: number = 1) {}

  // método para totalizar os itens escolhidos
  value(): number {
    return this.menuItem.price * this.quantity
  }
}

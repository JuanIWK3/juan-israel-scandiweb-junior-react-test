export interface CartItem {
  product: IProduct;
  quantity: number;
}

export interface Data {
  categories: CategoryElement[];
}

export interface CategoryElement {
  name: string;
  products: IProduct[];
}

export interface IProduct {
  name: string;
  inStock: boolean;
  gallery: string[];
  description: string;
  category: CategoryEnum;
  attributes: Attribute[];
  prices: Price[];
  brand: string;
  id: string;
}

export interface Attribute {
  id: string;
  name: string;
  type: Type;
  items: Item[];
}

export interface Item {
  displayValue: string;
  value: string;
  id: string;
}

export enum Type {
  Swatch = "swatch",
  Text = "text",
}

export enum CategoryEnum {
  Clothes = "clothes",
  Tech = "tech",
}

export interface Price {
  currency: Currency;
  amount: number;
}

export interface Currency {
  symbol: Symbol;
  label: Label;
}

export enum Label {
  Aud = "AUD",
  Gbp = "GBP",
  Jpy = "JPY",
  Rub = "RUB",
  Usd = "USD",
}

export enum Symbol {
  A = "A$",
  Empty = "$",
  Fluffy = "₽",
  Purple = "¥",
  Symbol = "£",
}

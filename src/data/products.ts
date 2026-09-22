export type Product = {
  id: number
  name: string
  description: string
  price: number
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones.',
    price: 799,
  },
  {
    id: 2,
    name: 'Mechanical Keyboard',
    description: 'A mechanical keyboard for everyday use.',
    price: 999,
  },
  {
    id: 3,
    name: 'Gaming Mouse',
    description: 'A precise mouse for work and gaming.',
    price: 599,
  },
]
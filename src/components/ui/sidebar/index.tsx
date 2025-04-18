
export * from './context'
export * from './sidebar'
export * from './menu'
export * from './components'

// Adding types for the Dashboard and PaymentDrawer
export interface OrderData {
  id: string
  clientName: string
  product: string
  region: string
  status: 'preparing' | 'pending' | 'delivered' | 'transit'
  date: string
  address: string
}

export const statusLabels = {
  preparing: 'Preparando',
  pending: 'Pendente',
  delivered: 'Entregue',
  transit: 'Em Transporte'
}

// Sample initial orders
export const initialOrders: OrderData[] = [
  {
    id: '1',
    clientName: 'João Silva',
    product: 'Colchão Queen 7cm',
    region: 'Zona Sul',
    status: 'delivered',
    date: '2025-04-18',
    address: 'Rua das Flores, 123'
  },
  // Add more sample orders as needed
]

interface ICustomer {
  id: number
  name: string
  tp_count: number
  order_in_packs: boolean
  // eslint-disable-next-line no-use-before-define
  last_order?: ICustomerOrder
}

interface IProduct {
  id: number
  name: string
  vendor_code: string | null
  amount_in_pack: number | null
}

interface ICustomerProduct {
  id: number
  name: string
  vendor_code: string | null
  product: IProduct | null
  option: string

}
interface ICustomerProductUpdate {
  id: number
  product_id: number | null
}

interface ICustomerOrder {
  id: number
  customer: ICustomer
  customer_name: string
  file: string
  products: ICustomerProduct[] | []
  created: string
  modified: string
}

interface ITradePoint {
  id: number
  name: string
  sapcode: string
}

interface IProductInOrder {
  id: number
  product_name: string
  vendor_code: string
  base_vendor_code: string
  base_product_name: string
  amount: number
  amount_in_pack: number
}

interface IOrder {
  id: number
  customer_order: number
  trade_point: number
  trade_point_name: string
  trade_point_sapcode: string
  products_list: IProductInOrder[] | []
}

export type {
  ICustomer,
  IProduct,
  ICustomerOrder,
  ITradePoint,
  IOrder,
  ICustomerProduct,
  ICustomerProductUpdate
}

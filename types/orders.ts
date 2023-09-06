interface ICustomer {
  id: number
  name: string
  tp_count: number
  order_in_packs: boolean
  // eslint-disable-next-line no-use-before-define
  last_order?: ICustomerOrder
}

interface IProductCreate {
  name: string
  vendor_code: string | null
  volume: number | null
  amount_in_pack: number | null
}
interface IProduct extends IProductCreate {
  id: number
}

interface ICustomerProduct {
  id: number
  name: string
  vendor_code: string | null
  customer: number
  base_product: IProduct | null
  option: string

}
interface ICustomerProductUpdate {
  name: string
  vendor_code: string | null
  customer: number
  base_product_id: number | null
}

interface ICustomerOrder {
  id: number
  customer: ICustomer
  customer_name: string
  order_in_packs: boolean
  file: string
  products: ICustomerProduct[] | []
  created: string
  modified: string
}

interface ITradePointUpdate {
  name: string
  sapcode: string
  customer: number
}
interface ITradePoint extends ITradePointUpdate {
  id: number
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
  ITradePointUpdate,
  IOrder,
  ICustomerProduct,
  ICustomerProductUpdate,
  IProductCreate
}

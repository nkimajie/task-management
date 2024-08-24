export enum orderStatus {
  Placed = 'Placed',
  Processing = 'Processing',
  Packed = 'Packed',
  Shipping = 'Shipping',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
  Confirmed = 'Confirmed',
}

export enum orderFrontStatus {
  Confirmed = 'Confirmed',
  Processing = 'Processing',
  Shipping = 'Shipping',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
}

export enum paymentStatus {
  Paid = 'Paid',
  Unpaid = 'Unpaid',
}

export enum orderCancelStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Denied = 'Denied',
}

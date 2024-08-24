export interface CreateShipmentDto {
  addressFrom: Address;
  addressTo: Address;
  parcels: Parcel[];
  async: boolean;
}

export interface Address {
  name: string;
  street1: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Parcel {
  length: string;
  width: string;
  height: string;
  distanceUnit: any | string;
  weight: string;
  massUnit: any | string;
}

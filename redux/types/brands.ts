import { BrandModel } from '../../models'

export interface brandsState {
  brandLists: brandLists
  brandById: brandById
}
export interface brandLists {
  loading: boolean;
  brands: BrandModel[];
  error?: string;
}
export interface brandById {
  loading: boolean;
  brand: BrandModel;
  error?: string;
}

export interface getBrandsRequest {
  type: string;
}

export interface getBrandsSuccess {
  type: string;
  brands: BrandModel[];
}

export interface getBrandsFailure {
  type: string;
  error?: string;
}

export interface getBrandByIdRequest {
  type: string;
}

export interface getBrandByIdSuccess {
  type: string;
  brand: BrandModel;
}

export interface getBrandByIdFailure {
  type: string;
  error?: string;
}
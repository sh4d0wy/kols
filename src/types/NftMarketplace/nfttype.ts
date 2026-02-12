export interface NFTMetadata {
    id:string;
    name: string;
    description: string;
    image: string;
}

export interface NFTListing {
    id:string;
    seller: string;
    price: number;
    active: boolean;
}

export interface NFTBundle {
    id:string;
    seller: string;
    price: number;
    active: boolean;
}
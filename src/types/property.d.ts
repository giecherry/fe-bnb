interface Property {
    id: string;
    name: string;
    description: string;
    location: string;
    price_per_night: number;
    availability: boolean;
    images?: string[]; 
}
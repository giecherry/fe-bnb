interface Property {
    id: string;
    name: string;
    description: string;
    location: string;
    price_per_night: number;
    user_id: string;
    availability: boolean;
    images?: string[]; 
    created_at: string;
}
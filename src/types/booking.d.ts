interface Booking {
    id: string;
    check_in_date: string;
    check_out_date: string;
    total_price: number;
    created_at: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
        created_at: string;
    };
    property: {
        id: string;
        name: string;
        description: string;
        price_per_night: number;
        user_id: string;
        created_at: string;
        images?: string[];
    };
}
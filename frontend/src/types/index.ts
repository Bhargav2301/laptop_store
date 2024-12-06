export interface Laptop {
    laptop_id: number;
    model_name: string;
    brand_name: string;
    price: number;
    ram_gb: number;
    processor_specs: string;
    gpu_name: string;
    specs_summary?: string;
    review_count?: number;
    avg_rating?: number;
}

export interface LaptopDetail extends Laptop {
    ram_type: string;
    processor_brand: string;
    gpu_brand: string;
    storage_ssd: number;
    storage_hdd: number;
    display_type: string;
    screen_size: number;
    os_name: string;
    battery_life_hours?: number;
    adapter_watt?: number;
}

export interface SearchFilters {
    search_term: string;
    min_price?: number;
    max_price?: number;
    brand_name?: string;
    ram_size?: number;
}

export interface Review {
    review_id: number;
    laptop_id: number;
    review_text: string;
    rating?: number;
} 
export interface PropertyDto {
    title?: string;
    images?: string[];
    location?: any;
    location_ar?: string;
    location_en?: string;
    status?: string;
    price?: number;
    discount?: number;
    total_area?: number;
    property_type?: string;
    total_visits?: number;
    slug?: string;
    encId?: string;
    total_bedrooms?: number;
    total_bathrooms?: number;
}


export interface PropertyDetailsDto {
    id?: number;
    title?: string;
    images?: string[];
    location?: any;
    location_ar?: string;
    location_en?: string;
    status?: string;
    price?: number;
    discount?: number;
    total_area?: number;
    property_type?: string;
    total_visits?: number;
    slug?: string;
    encId?: string;
    total_bedrooms?: number;
    total_bathrooms?: number;
    short_description?: any;
    long_description?: any;
    amenities?: any;
    owner?: any;
    created_at?: any;
    updated_at?: any;
    archived_at?: any;
    is_archived?: any;
    tags?: any;
    video?: any;
    latitude?: any;
    longitude?: any;
    spaces?: any;
    surfaces?: any;
    construction?: any;
    total_likes?: any;
}
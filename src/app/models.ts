export interface Pokemon {
    id?: string;
    name: string;
    image: string;
    base_experience: string;
    weight: any;
    height: any;
    rating: any;
    abilities: {
        ability: {
            name: string
        }
    }[];
    types: {
        type: {
            name: string
        }
    }[];
    moves: {
        move: {
            name: string
        }
    }[];
}

export interface PokemonApiResponse {
    count: number;
    next: string;
    previous: string;
    results: { name: string, url: string, base_experience: string }[];
}

export interface PokemonApiResult {
    name: string;
    url: string;
    base_experience: string;
}

export interface User{
    uid?: string;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
}

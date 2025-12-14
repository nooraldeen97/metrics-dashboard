import axios from 'axios';


interface ApiErrorResponse {
    message: string;
    error?: string;
}


export async function apiCall( endpoint: string, method: string, body?: unknown, token?: string) {
    try {
    const response = await axios({
        method: method,
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        },
        data: body ? JSON.stringify(body) : undefined
    });
    console.log('API Call Response:', response.data);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        // console.log('API Call Error:', error?.response?.data || error.message);
        return { message: error.response?.data?.message ,error: error.message } as ApiErrorResponse;
        
    }
}
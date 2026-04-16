/**
 * API utility to handle requests with token
 */
export const request = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Đã có lỗi xảy ra');
    }

    return response.json();
};

export const api = {
    get: (url: string) => request(url, { method: 'GET' }),
    post: (url: string, body: any) => request(url, { method: 'POST', body: JSON.stringify(body) }),
    patch: (url: string, body: any) => request(url, { method: 'PATCH', body: JSON.stringify(body) }),
    delete: (url: string) => request(url, { method: 'DELETE' }),
};

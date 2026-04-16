import { useState, useEffect, useCallback } from 'react';
import { api } from '../utils/api';

const DEFAULT_FACE_VALUE = 100000;

/**
 * Hook to manage shareholder profile and stock price
 */
export const useShareholder = () => {
    const [profile, setProfile] = useState<any>(null);
    const [stockPrice, setStockPrice] = useState<number>(DEFAULT_FACE_VALUE);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [profileData, configData] = await Promise.all([
                api.get('/api/users/me'),
                api.get('/api/config/stockPrice').catch(() => ({ value: DEFAULT_FACE_VALUE }))
            ]);

            setProfile(profileData);
            if (configData && configData.value) {
                setStockPrice(configData.value);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const updateProfile = async (data: { phone: string; hometown: string; residence: string; avatar?: string }) => {
        try {
            const updatedUser = await api.patch('/api/users/me', data);
            setProfile(updatedUser);
            return updatedUser;
        } catch (err: any) {
            throw new Error(err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        profile,
        stockPrice,
        loading,
        error,
        refresh: fetchData,
        updateProfile
    };
};

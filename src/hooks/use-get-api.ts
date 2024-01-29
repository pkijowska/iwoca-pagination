import { useState, useEffect, useCallback } from "react";

type LoanHistory = {
    loan_started: string;
    loan_ended: string;
    principle: number;
    interest_rate: number;
    interest: number;
  };
  
  type Application = {
    id: number;
    first_name: string;
    last_name: string;
    loan_amount: number;
    loan_type: string;
    email: string;
    company: string;
    date_created: string;
    expiry_date: string;
    avatar: string;
    loan_history: LoanHistory[];
  };  

const useGetApi = (baseUrl: string, limit: number) => {
    const [data, setData] = useState<Application[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${baseUrl}?_page=1&_limit=${limit}`);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            setData(json);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [baseUrl, limit]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const loadMore = async (currentPage: number, setPage) => {
        setLoadingMore(true);
        try {
            const nextPage = currentPage + 1;
            const response = await fetch(`${baseUrl}?_page=${nextPage}&_limit=${limit}`);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            setData((prevData) => [...prevData, ...json]);
            setPage(nextPage);
        } catch (error) {
            setError(error);
        } finally {
            setLoadingMore(false);
        }
    };

    return { data, loading, error, loadMore, loadingMore };
};

export default useGetApi;

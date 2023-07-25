import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosFetch = (dataurl: string) => {
    // State variables for storing the fetched data, fetch error, and loading status
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Flag to track if the component is mounted
        let isMounted = true;
        // Create a cancel token to cancel the axios request if needed
        const source = axios.CancelToken.source();

        // Function to fetch data from the specified URL
        const fetchData = async (url: string) => {
            // Set the loading state to true
            setIsLoading(true);
            try {
                // Send a GET request to the specified URL
                const response = await axios.get(url, {
                    cancelToken: source.token
                });
                if (isMounted) {
                    // If the component is still mounted, update the data state with the fetched data
                    setData(response.data);
                    // Reset the fetch error
                    setFetchError(null);
                }
            } catch (err) {
                if (isMounted) {
                    // If the component is still mounted, reset the data state and set the fetch error
                    setData([]);
                    setFetchError(err as Error | null);
                }
            } finally {
                if (isMounted) {
                    // If the component is still mounted, set the loading state to false
                    setIsLoading(false);
                }
            }
        };

        // Call the fetchData function with the specified data URL
        fetchData(dataurl);

        // Cleanup function to cancel the axios request and update the mounted flag
        const cleanup = () => {
            isMounted = false;
            source.cancel();
        };
        return cleanup;
    }, [dataurl]);

    // Return the data, fetch error, and loading status
    return { data, fetchError, isLoading };
}

export default useAxiosFetch;

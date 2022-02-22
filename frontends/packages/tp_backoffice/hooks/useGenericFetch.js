import { useCallback, useEffect } from 'react';
import { genericFetch } from '../services';

// READ: https://dmitripavlutin.com/dont-overuse-react-usecallback/
// READ: https://www.freecodecamp.org/news/how-to-use-axios-with-react/
export const useGenericFetch = ({apiUrl, method, bearerToken, bodyJson}) => {
    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);


    useEffect(() => {
        const genericFetch = async () => {
            setLoading(true);
            const response = await genericFetch(apiUrl, method, bearerToken, bodyJson);
            if (!response.ok) {
                setError(response);
            }
            else {
                setData(response);
            }
            setLoading(false);
          };
          genericFetch();
    }, [apiUrl, method, bearerToken, bodyJson]);

    return { data, error, loading };
};

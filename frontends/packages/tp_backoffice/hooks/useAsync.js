import { useCallback, useEffect, useRef, useState } from "react";

/**
 * https://tech.groww.in/useasync-a-cleaner-way-to-fetch-data-from-apis-12515d27c3aa
 * https://codesandbox.io/s/data-fetching-with-async-35h6x4?from-embed=&file=/src/App.js:77-111
 * @param {*} asyncFunction - the fetch function to run
 * @param {*} args - the asyncFunction arguments
 * @param {*} deps - if filled in, use immediate as false, since the execute will run when deps changes
 * @param {*} immediate - true to run immediately (without deps), false otherwise
 * @returns execute func (use it if immediate is false), response object, error object, loading state
 */
export const useAsync = (asyncFunction, args=[], deps = [], immediate = true) => {
    const isFirstUpdate = useRef(true);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const execute = useCallback(
        () => {
            setLoading(true);
            setResponse(null);
            setError(null);
            return asyncFunction(...args)
                .then((response) => {
                    console.log("useasync", response);
                    setResponse(response);
                })
                .catch((error) => {
                    setError(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [asyncFunction, ...args]
    );

    /**
     * Now when the component renders for the first time, in the first useEffect none of the conditions are satisfied 
     * thus avoiding execute to be called on the mount. In the first render, 
     * we are also updating the value of the useRef hook to false at the end which will make sure that in the next render
     *  the execute function will be called since now the value of useRef is false thus satisfying the if(!isFirstUpdate.current) condition.
     */
    useEffect(() => {
        if (immediate) {
          execute();
        } else {
          if (!isFirstUpdate.current) {
            execute();
          }
        }
      }, [...deps]);

    useEffect(() => {
        isFirstUpdate.current = false;
      }, []);
      
    return { execute, response, error, loading };
};
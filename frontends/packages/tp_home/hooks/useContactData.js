import { useEffect, useState } from "react";

export default function useContactData(url) {
    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        (
            async function(){
                try{
                    setLoading(true)
                    
                    const response = await fetch(process.env.NEXT_PUBLIC_HOME_BASE_URL + "/api/contactData", {
                        method: 'GET',
                    })
                    const responseData = await response.json();
                    if (responseData && responseData.data) {
                        setData(responseData.data.attributes);
                    }
                    else {
                        setData({})
                    }
                }catch(err){
                    setError(err)
                }finally{
                    setLoading(false)
                }
            }
        )()
     },[url]);

     return { data, error, loading };
}
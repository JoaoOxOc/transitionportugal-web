import { useEffect, useState } from "react";

export default function usePartnerData(url) {
    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        (
            async function(){
                try{
                    setLoading(true)
                    
                    //const response = await axios.get(url)
                    //setData(response.data)
                    const response = [
                              {
                                id: '2',
                                name: 'Transition Network',
                                picture: '/tn-logo.svg',
                                link: 'https://transitionnetwork.org',
                                description: 'Movimento raíz do Transição Portugal',
                                lat: 39.75814185749746,
                                long: -8.812977251759657,
                              },
                              {
                                id: '3',
                                name: 'Transition Network',
                                picture: '/tn-logo.svg',
                                link: 'https://transitionnetwork.org',
                                description: 'Movimento raíz do Transição Portugal',
                                lat: 38.65360930777786,
                                long: -8.216968999476505,
                              },
                          ];
                    setData(response)
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
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
                                id: '1',
                                name: 'Transition Network',
                                picture: '/tn-logo.svg',
                                link: 'https://transitionnetwork.org',
                                description: 'Movimento raíz do Transição Portugal',
                              },
                              {
                                id: '2',
                                name: 'Transition Network',
                                picture: '/tn-logo.svg',
                                link: 'https://transitionnetwork.org',
                                description: 'Movimento raíz do Transição Portugal',
                              },
                              {
                                id: '3',
                                name: 'Transition Network',
                                picture: '/tn-logo.svg',
                                link: 'https://transitionnetwork.org',
                                description: 'Movimento raíz do Transição Portugal',
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
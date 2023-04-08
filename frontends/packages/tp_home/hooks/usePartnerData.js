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
                                name: 'Projecto Origens',
                                picture: 'https://www.projeto-origens.com/images/imagem%20capa_origens_2x.jpg',
                                link: 'https://www.projeto-origens.com',
                                description: 'Projecto regenerativo em Viseu',
                                lat: 39.75814185749746,
                                long: -8.812977251759657,
                              }
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
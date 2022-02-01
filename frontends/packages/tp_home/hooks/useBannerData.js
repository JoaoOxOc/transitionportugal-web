import { useEffect, useState } from "react";

export default function useBannerData(url) {
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
                          label: 'Transição Portugal',
                          paragraphs: [
                              'Um movimento pela transformação interior e do que nos rodeia',
                              'new to'
                          ]
                        },
                        {
                          label: 'Bird',
                          imgPath:
                            'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
                        },
                        {
                          label: 'Bali, Indonesia',
                          imgPath:
                            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
                        },
                        {
                          label: 'Goč, Serbia',
                          imgPath:
                            'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
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
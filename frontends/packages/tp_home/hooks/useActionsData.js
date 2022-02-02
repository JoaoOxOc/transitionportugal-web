import { useEffect, useState } from "react";

export default function useAboutData(url) {
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
                    const response = {
                            title: 'Torna-te membro do Transição Portugal',
                            description: 'Enquanto membro, fortaleces não só o teu movimento com o nosso apoio, como todos os outros movimentos que já pertencem ao nosso círculo.',
                          members: [
                              {
                                title: 'Inner Transition',
                                picture: '/about/inner-transition.png',
                                paragraph: 'A mudança que desejamos ver no mundo começa em nós mesmos'
                              },
                              {
                                title: 'Inner Circle',
                                picture: '/about/inner-circle.png',
                                paragraph: 'Aproximar as pessoas para as suas diferenças, estender a mão ao centro, escutar mais do que falar, observar mais do que criticar'
                              },
                              {
                                title: 'Transition Towns',
                                picture: '/about/transition-towns.png',
                                paragraph: 'Apoiar movimentos locais para a transição das suas comunidades'
                              },
                              {
                                title: 'REconomy',
                                picture: '/about/circular-economy-icon-green.png',
                                paragraph: 'Ajudar as comunidades locais a se transformarem para a autonomia interna'
                              }
                          ]
                    };
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
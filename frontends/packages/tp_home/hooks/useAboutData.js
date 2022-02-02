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
                            title: 'Transição Portugal',
                            description: 'Aproximar as diferenças para uma transição social, económica, interior e exterior que beneficie tudo e todos',
                          bigBannerMessage: "If we wait for the governments, it'll be too little, too late; if we act as individuals, it'll be too little; but if we act as communities, it might just be enough, just in time.",
                          bigBannerAuthor: 'Rob Hopkins',
                          bigBannerAuthorInfo: 'Fundador Movimento Transição',
                          bigBannerAuthorImage: 'https://www.transitionus.org/wp-content/uploads/2020/09/home-rob-150x150.png',
                          topics: [
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
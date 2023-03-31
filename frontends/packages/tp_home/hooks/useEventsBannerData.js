import { useEffect, useState } from "react";

export default function useEventsBannerData(url) {
    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        (
            async function(){
                try{
                    setLoading(true)
                    const response = await fetch("/api/eventsData", {
                        method: 'GET',
                    })
                    const responseData = await response.json();
                    let arrayOfEvents = [];
                    responseData.data.forEach(element => {
                      console.log('evento: ', element);
                      arrayOfEvents.push({
                                id: element.id,
                                title: element.attributes.EventTitle,
                                picture: element.attributes.EventImageUrl ? element.attributes.EventImageUrl : '/about/about-mainimage.jpg',
                                orgName: 'Transição Portugal',
                                date: element.attributes.EventStartDate,
                                endDate: element.attributes.EventEndDate,
                                tag: element.attributes.tag,
                                slug: element.attributes.Slug,
                                place: element.attributes.EventPlace,
                      });
                    });
                    //const response = await axios.get(url)
                    //setData(response.data)
                    // const response = [
                    //           {
                    //             id: '1',
                    //             title: 'Inner Transition',
                    //             picture: '/about/about-mainimage.jpg',
                    //             orgName: 'Transition Network',
                    //             date: '2022-09-16',
                    //             tag: 'Inner',
                    //             place: 'Lisboa'
                    //           },
                    //           {
                    //             id: '2',
                    //             title: 'Palestra Decrescer',
                    //             picture: '/about/about-mainimage.jpg',
                    //             orgName: 'Decrescimento',
                    //             date: '2022-12-16',
                    //             tag: 'Circular',
                    //             place: 'Lisboa'
                    //           },
                    //           {
                    //             id: '3',
                    //             title: 'Workshop Municípios em Transição',
                    //             picture: '/about/about-mainimage.jpg',
                    //             orgName: 'Transição Portugal',
                    //             date: '2022-11-28',
                    //             tag: 'Circular',
                    //             place: 'Lisboa'
                    //           },
                    //           {
                    //             id: '4',
                    //             title: 'Evento Musical',
                    //             picture: '/about/about-mainimage.jpg',
                    //             orgName: 'Transição Portugal',
                    //             date: '2022-10-28',
                    //             tag: 'Circular',
                    //             place: 'Lisboa'
                    //           },
                    //       ];
                    setData(arrayOfEvents)
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
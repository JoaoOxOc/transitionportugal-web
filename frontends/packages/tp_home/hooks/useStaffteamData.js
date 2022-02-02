import { useEffect, useState } from "react";

export default function useStaffteamData(url) {
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
                                name: 'John Carter',
                                picture: 'https://www.transitionus.org/wp-content/uploads/2020/09/home-rob-150x150.png',
                                job: 'Director Executivo',
                                description: 'Don Hall has had the good fortune to participate in the international Transition Towns Movement in a variety of capacities over the past 12 years. Initially serving for two years as the Education and Outreach Coordinator for Transition Colorado, he went on to found and direct Transition Sarasota (Florida) from 2010 to 2016. A certified Transition Trainer and experienced facilitator, Don was named Co-Director of Transition US in 2017 and became its Interim Executive Director in 2020. Don holds a Master’s degree in Environmental Leadership from Naropa University, a certification in Permaculture Design from the Central Rocky Mountain Permaculture Institute, and currently lives in a multigenerational housing cooperative in Boulder, Colorado. In 2019, he edited and published 10 Stories of Transition in the US: Inspiring Examples of Community Resilience-Building.',
                              },
                              {
                                id: '2',
                                name: 'Don Hall',
                                picture: 'https://www.transitionus.org/wp-content/uploads/2020/09/home-rob-150x150.png',
                                job: 'Director Executivo',
                                description: 'Don Hall has had the good fortune to participate in the international Transition Towns Movement in a variety of capacities over the past 12 years. Initially serving for two years as the Education and Outreach Coordinator for Transition Colorado, he went on to found and direct Transition Sarasota (Florida) from 2010 to 2016. A certified Transition Trainer and experienced facilitator, Don was named Co-Director of Transition US in 2017 and became its Interim Executive Director in 2020. Don holds a Master’s degree in Environmental Leadership from Naropa University, a certification in Permaculture Design from the Central Rocky Mountain Permaculture Institute, and currently lives in a multigenerational housing cooperative in Boulder, Colorado. In 2019, he edited and published 10 Stories of Transition in the US: Inspiring Examples of Community Resilience-Building.',
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
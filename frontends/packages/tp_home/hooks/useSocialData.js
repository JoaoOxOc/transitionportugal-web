import { useEffect, useState, useCallback } from "react";

export default function useSocialData(url) {
    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        (
            async function(){
                try{
                    setLoading(true)
                    const response = await fetch('http://localhost:3000' + "/api/socialData", {
                        method: 'GET',
                    })
                    const responseData = await response.json();
                    let arrayOfSocials = [];
                    responseData.data.forEach(element => {
                        arrayOfSocials.push(element.attributes);
                    });
                    
                    // const response = [
                    //     {name: 'facebook', code: 'facebook', url: 'https://facebook.com'},
                    //     {name: 'Twitter', code: 'twitter', url: 'https://twitter.com'},
                    //     {name: 'Instagram', code: 'instagram', url: 'https://instagram.com'},
                    //     {name: 'Slack', code: 'slack', url: 'https://slack.com'}
                    // ]
                    setData(arrayOfSocials)
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
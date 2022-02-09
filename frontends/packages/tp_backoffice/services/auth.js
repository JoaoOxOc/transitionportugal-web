import { genericFetch } from './genericFetch';

export const login = (username, password) => {
    const resultData = null;
    try{
        const response = genericFetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/user/login", "POST",{
            username: username,
            password: password
        });
        console.log(response)
    }catch(err){
        resultData = err;
    }finally{
        return resultData;
    }
}
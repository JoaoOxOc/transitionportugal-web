export default async function requestRecoverHandler(req, res) {
    try {
        const apiUrl = process.env.AUTH_API_URL+"/user/recover";
        // const {username} = req.query;
        const response = await fetch(apiUrl, {
          method: 'POST',
          body: JSON.stringify(req.body),
          headers: { 
            "Content-Type": "application/json",
            "credentials": 'include',
            "ClientId": process.env.AUTH_API_CLIENT_ID,
            "ClientAuthorization": process.env.AUTH_API_CLIENT_SECRET
          }
        })
        if (!response.ok) {
          const resultErrorBody = await response.text();
          res.status(response.status).json({ error: resultErrorBody + response.status, statusText: response.statusText });
        }
        
        const resetResult = await response.json();
        res.status(200).json(resetResult);
    }
    catch(error) {
        console.log(error)
        res.status(500).json({ error: error + JSON.stringify(req.body) });
    }
}
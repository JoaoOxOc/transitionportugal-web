export default async function searchForDataHandler(req, res) {
  const {searchUri} = req.query;
  let requestBody = req.body;
    try {
        if (searchUri == "/user/search-user") {
            requestBody = {
                username: req.body.u,
                password: "t"
            }
        }
        const apiUrl = process.env.AUTH_API_URL+searchUri;
        const response = await fetch(apiUrl, {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: { 
            "Content-Type": "application/json",
            "credentials": 'include',
            "ClientId": process.env.AUTH_API_CLIENT_ID,
            "ClientAuthorization": process.env.AUTH_API_CLIENT_SECRET,
          }
        })
        if (!response.ok) {
          const resultErrorBody = await response.text();
          res.status(response.status).json({ error: resultErrorBody + response.status, statusText: response.statusText });
        }
        else {
          const resetResult = await response.json();
          res.status(200).json(resetResult);
        }
    }
    catch(error) {
        console.log(error)
        res.status(500).json({ error: error + JSON.stringify(requestBody) });
    }
}
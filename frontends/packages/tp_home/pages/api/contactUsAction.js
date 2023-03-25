export default async function contactUsAction(req, res) {
    try {
        console.log('req.body contactUsAction',req.body);
        const apiUrl = process.env.HOME_API_BASE_URL+"/emailservice/send";
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify({
                fromName: req.body.messageData.fromName,
                from: req.body.messageData.fromEmail,
                subject: req.body.messageData.messageSubject,
                body: req.body.messageData.messageBody
            }),
            headers: { 
            "Content-Type": "application/json",
            "credentials": 'include',
            "ClientId": process.env.HOME_API_CLIENT_ID,
            "ClientAuthorization": process.env.HOME_API_CLIENT_SECRET
            }
        })
        if (!response.ok) {
            const resultErrorBody = await response.text();
            res.status(response.status).json({ error: resultErrorBody + response.status, statusText: response.statusText });
        }
        else {
            const contactDataResult = await response.json();
            res.status(200).json(contactDataResult);
        }
        }
        catch(error) {
            console.log(error)
            res.status(500).json({ error: error + JSON.stringify(req.body) });
        }
  }
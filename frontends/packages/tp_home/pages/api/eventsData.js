// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function eventsData(req, res) {
    try {
      console.log('cms url',process.env.SSR_CMS_BASE_URL);
      const apiUrl = process.env.SSR_CMS_BASE_URL+'/api/event-pages?locale=pt-PT&populate=deep';
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Authorization:
            'Bearer ' + process.env.CMS_API_TOKEN,
        }
      })
      if (!response.ok) {
        const resultErrorBody = await response.text();
        res.status(response.status).json({ error: resultErrorBody + response.status, statusText: response.statusText });
      }
      else {
        const eventsDataResult = await response.json();
        res.status(200).json(eventsDataResult);
      }
    }
    catch(error) {
        console.log(error)
        res.status(500).json({ error: error + JSON.stringify(req.body) });
    }
  }
  
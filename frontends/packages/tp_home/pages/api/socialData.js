// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function socialData(req, res) {
  try {
    console.log('cms url',process.env.SSR_CMS_BASE_URL);
    const apiUrl = process.env.SSR_CMS_BASE_URL+'/api/socials?locale=pt-PT';
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
      const socialDataResult = await response.json();
      console.log('cms ',socialDataResult)
      res.status(200).json(socialDataResult);
    }
}
catch(error) {
    console.log(error)
    res.status(500).json({ error: error + JSON.stringify(req.body) });
}
}

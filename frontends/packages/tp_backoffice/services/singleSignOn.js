
export const strapiAuth = async(strapiBaseUrl, strapiUser, strapiUserPassword) => {
    const response = await fetch(
        `${strapiBaseUrl}/auth/local`,
        {
          method: 'POST',
          body: JSON.stringify({
            identifier: strapiUser,
            password: strapiUserPassword,
          }),
          headers: { 
            'User-Agent': '*',
            "Content-Type": "application/json"
          }
        }
    );
    const data = await response.json();
    return data;
}
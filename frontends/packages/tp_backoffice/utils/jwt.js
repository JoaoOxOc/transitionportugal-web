/* eslint-disable no-bitwise */
export const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
export const JWT_EXPIRES_IN = 3600 * 24 * 2;

export const sign = (payload, privateKey, header) => {
  const now = new Date();
  header.expiresIn = new Date(now.getTime() + header.expiresIn);
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  const signature = btoa(
    Array.from(encodedPayload)
      .map((item, key) =>
        String.fromCharCode(
          item.charCodeAt(0) ^ privateKey[key % privateKey.length].charCodeAt(0)
        )
      )
      .join('')
  );

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

export const decode = (token) => {
  const [encodedHeader, encodedPayload, signature] = token.split('.');
  const header = JSON.parse(atob(encodedHeader));
  const payload = JSON.parse(atob(encodedPayload));

  if (payload.exp * 1000 < Date.now()) {
    throw new Error('Expired token');
  }

  // const verifiedSignature = btoa(
  //   Array.from(encodedPayload)
  //     .map((item, key) =>
  //       String.fromCharCode(
  //         item.charCodeAt(0) ^ JWT_SECRET[key % JWT_SECRET.length].charCodeAt(0)
  //       )
  //     )
  //     .join('')
  // );
  // if (verifiedSignature !== signature) {
  //   throw new Error('Invalid signature');
  // }

  return payload;
};

export const verifyTokenScopes = (token, scopes) => {
  if (token) {
    const [encodedHeader, encodedPayload, signature] = token.split('.');
    const header = JSON.parse(atob(encodedHeader));
    const payload = JSON.parse(atob(encodedPayload));
    try {
      if (scopes != null && payload.scope.some( tokenScope => scopes.includes(tokenScope) )) {
        return true;
      }
      else {
        return false;
      }
    }
    catch(ex){
      throw ex;
    }
  }
  else {
    return false;
  }
}

export const getTokenScopes = (token) => {
  if (token) {
    const [encodedHeader, encodedPayload, signature] = token.split('.');
    const header = JSON.parse(atob(encodedHeader));
    const payload = JSON.parse(atob(encodedPayload));
    try {
      if (payload.scope) {
        return payload.scope;
      }
      else {
        return [];
      }
    }
    catch(ex){
      throw ex;
    }
  }
  else {
    return [];
  }
}

export const getTokenRole = (token) => {
  if (token) {
    const [encodedHeader, encodedPayload, signature] = token.split('.');
    const header = JSON.parse(atob(encodedHeader));
    const payload = JSON.parse(atob(encodedPayload));
    try {
      if (payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]) {
        return payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      }
      else {
        return "";
      }
    }
    catch(ex){
      throw ex;
    }
  }
  else {
    return "[]";
  }
}

export const getUserIdAndAssociation = (token) => {
  if (token) {
    const [encodedHeader, encodedPayload, signature] = token.split('.');
    const header = JSON.parse(atob(encodedHeader));
    const payload = JSON.parse(atob(encodedPayload));
    const userData = {};
    
    if (payload.userId) {
      userData.userId = payload.userId;
    }
    if (payload.associationId) {
      userData.associationId = payload.associationId;
    }
    return userData;
  }
  else {
    return {};
  }
}

export const verify = (token, privateKey) => {
  const [encodedHeader, encodedPayload, signature] = token.split('.');
  const header = JSON.parse(atob(encodedHeader));
  const payload = JSON.parse(atob(encodedPayload));
  const now = new Date();

  if (now < header.expiresIn) {
    throw new Error('The token is expired!');
  }

  const verifiedSignature = btoa(
    Array.from(encodedPayload)
      .map((item, key) =>
        String.fromCharCode(
          item.charCodeAt(0) ^ privateKey[key % privateKey.length].charCodeAt(0)
        )
      )
      .join('')
  );

  if (verifiedSignature !== signature) {
    throw new Error('The signature is invalid!');
  }

  return payload;
};

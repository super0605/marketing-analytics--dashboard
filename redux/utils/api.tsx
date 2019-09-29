import axios from 'axios';

// export const apiURL = process.env['10THMAN_PUBLIC_AUTH_API_URL'];
const apiURL = 'https://api10.azurewebsites.net';

function headersWithAuth(auth = true) {
  if (!auth) return {};
  const accessToken = localStorage.getItem('msal.idtoken');
  if (accessToken) {
    return { Authorization: `Bearer ${accessToken}` };
  }
  return {};
}

export const getMyAccountAPI = () => axios.get(`${apiURL}/Users/me`,
  {
    headers: {
      ...headersWithAuth(true),
    },
  })
  .then(res => res.data)
  .catch((error) => {
    throw error;
  });

export const getUsersAPI = () => axios.get(`${apiURL}/Users`,
  {
    headers: {
      ...headersWithAuth(true),
    },
  })
  .then(res => res.data)
  .catch((error) => {
    throw error;
  });

export const inviteUserAPI = (userToInvite) => axios.post(`${apiURL}/Users`, { ...userToInvite },
  {
    headers: {
      ...headersWithAuth(true),
    },
  })
  .then(res => res.data)
  .catch((error) => {
    throw error;
  });

// Brands

export const getBrandsAPI = () => axios.get(`${apiURL}/Brands`,
  {
    headers: {
      ...headersWithAuth(true),
    },
  })
  .then(res => res.data)
  .catch((error) => {
    throw error;
  });

export const getBrandByIdAPI = (brandId) => axios.get(`${apiURL}/Brands/${brandId}`,
  {
    headers: {
      ...headersWithAuth(true),
    },
  })
  .then(res => res.data)
  .catch((error) => {
    throw error;
  });

export const getLookupAPI = ({ brand, queryString }) => axios.get(`${apiURL}/${brand}/Lookup${queryString}`,
  {
    headers: {
      ...headersWithAuth(true),
    },
  })
  .then(res => res.data)
  .catch((error) => {
    throw error;
  });

export const getWebsiteSummaryAPI = ({ brand, query }) => axios.get(`${apiURL}/${brand}/Website/behaviour/summary${query}`,
  {
    headers: {
      ...headersWithAuth(true),
    },
  })
  .then(res => res.data)
  .catch((error) => {
    throw error;
  });

export const getWebsiteBehaviourChannelsAPI = ({ brand, metric, query }) => axios.get(`${apiURL}/${brand}/Website/behaviour/channels/${metric}${query}`,
  {
    headers: {
      ...headersWithAuth(true),
    },
  })
  .then(res => res.data)
  .catch((error) => {
    throw error;
  });

export const getWebsiteBehaviourTimelineAPI = ({ brand, metric, query }) => axios.get(`${apiURL}/${brand}/Website/behaviour/timeline/${metric}${query}`,
  {
    headers: {
      ...headersWithAuth(true),
    },
  })
  .then(res => res.data)
  .catch((error) => {
    throw error;
  });

export const getWebsiteTransactionsSummaryAPI = ({ brand, query }) => axios.get(`${apiURL}/${brand}/Website/transactions/summary${query}`,
  {
    headers: {
      ...headersWithAuth(true),
    },
  })
  .then(res => res.data)
  .catch((error) => {
    throw error;
  });

export const getWebsiteTransactionsTimelineAPI = ({ brand, metric, query }) => axios.get(`${apiURL}/${brand}/Website/transactions/timeline/${metric}${query}`,
  {
    headers: {
      ...headersWithAuth(true),
    },
  })
  .then(res => res.data)
  .catch((error) => {
    throw error;
  });

export const getWebsiteTransactionsChannelAPI = ({ brand, metric, query }) => axios.get(`${apiURL}/${brand}/Website/transactions/channels/${metric}${query}`,
  {
    headers: {
      ...headersWithAuth(true),
    },
  })
  .then(res => res.data)
  .catch((error) => {
    throw error;
  });

export const getWebsiteTransactionsProductsAPI = ({ brand, metric, query }) => axios.get(`${apiURL}/${brand}/Website/transactions/products/${metric}${query}`,
  {
    headers: {
      ...headersWithAuth(true),
    },
  })
  .then(res => res.data)
  .catch((error) => {
    throw error;
  });

export const getWebsiteGeographicAPI = ({ brand, metric, query }) => axios.get(`${apiURL}/${brand}/Website/geographic/${metric}${query}`,
  {
    headers: {
      ...headersWithAuth(true),
    },
  })
  .then(res => res.data)
  .catch((error) => {
    throw error;
  });
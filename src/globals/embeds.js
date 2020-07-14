import providers from 'oembed-providers';

export async function getEmbed (url) {
  // Proxy that we use that enables cross-origin requests
  // https://cors-anywhere.herokuapp.com/
  const cors_api_host = 'https://cors-anywhere.herokuapp.com/';
  const hostname = (new URL(url)).hostname;

  // Find the provider
  const provider = providers.find(({ provider_url }) => {
    return provider_url.includes(hostname) || hostname.includes(provider_url);
  });

  if(provider && provider.endpoints) {
    // Use the first endpoint
    const provider_url = provider.endpoints[0].url;

    // Fetch embed to provider through the proxy
    const response = await fetch(`${cors_api_host}${provider_url}?url=${url}`);
    return response.json();
  }
}

// @flow

import url from 'url';
import Request from 'tessellate-request';

export async function fetchContent(sources: Object): Promise<Object> {
  if (sources.properties && sources.properties.src) {
    const uri = url.parse(sources.properties.src);
    const baseUrl = url.format({
      protocol: uri.protocol,
      hostname: uri.hostname,
      port: uri.port,
      pathname: sources.properties.path,
      query: sources.properties.query
    });

    const content = await createRequest(sources.properties).get(baseUrl);
    return JSON.parse(content);
  }

  return await Promise.resolve({});
}

function createRequest(properties: Object): Request {
  const authId = properties.auth ? properties.auth.id : undefined;
  return new Request(authId);
}

function client(endpoint, { body, ...customConfig } = {}) {
  const headers = { "Content-Type": "application/json" };

  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  return window
    .fetch(`${process.env.PREACT_APP_API_URL}/${endpoint}`, config)
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        return data;
      }
      return Promise.reject(data);
    });
}

export { client };

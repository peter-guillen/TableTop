export const apiFetch = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Token expired or invalid, redirect to login
      window.location.href = "/login";
      throw new Error("Unauthorized: Please log in.");
    } else if (response.status === 403) {
      // Insufficient permissions, redirect to Forbidden page
      window.location.href = "/forbidden";
      throw new Error("Forbidden: Access denied.");
    }
    throw new Error("API request failed.");
  }

  return response.json();
};

// const baseQueryWithAuth = async (args, api, extraOptions) => {
//   const result = await fetchBaseQuery({
//     baseUrl: `${API_URL}/api`,
//     credentials: "include",
//   })(args, api, extraOptions);

//   if (result.error?.status === 401) {
//     window.location.href = "/login";
//   } else if (result.error?.status === 403) {
//     window.location.href = "/forbidden";
//   }

//   return result;
// };

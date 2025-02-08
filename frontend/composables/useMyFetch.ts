export const useMyFetch: typeof useFetch = (request, opts?) => {
  const config = useRuntimeConfig()
  const store = useAuthStore();

  return useFetch(request, { 
    baseURL: config.public.baseUrl,
    onRequest({request, options}) {
      if (useAuthStore().token) {
        const token = `${store.tokenType} ${store.token}`;

        options.headers.set('Authorization', token);
      }
    },
    onResponseError({request, response, options}) {
      if (response.status === 401) {
        useAuthStore().logout(true);
        navigateTo('/login');
      }
    },
    ...opts,
  })
}

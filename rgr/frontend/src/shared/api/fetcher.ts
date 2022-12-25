export const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch('http://localhost:8000' + input, init).then((res) => {
    console.log(res)

    const contentTypeHeader = res.headers.get('Content-Type')

    const isJsonResponse = contentTypeHeader && contentTypeHeader.toLowerCase().includes('application/json')

    if (isJsonResponse) {
      return res.json()
    }
  })

//* This how you use the writeHead method
import http from 'http';

const PORT = 8080;

const server = http.createServer((req, res) => {
  res.writeHead(200, 'It works', {'Content-Type': 'text/plain'});
  res.end('Hi');
});

server.listen(PORT, () => {
  console.log(`PORT is listening to port ${PORT}`);
});

/* 
? ✅ Success
- 200 OK → Request succeeded.
- 201 Created → Resource successfully created.
- 204 No Content → Success, but no response body.
? 🔀 Redirection
- 301 Moved Permanently → Resource has a new permanent URL.
- 302 Found → Temporary redirect.
- 304 Not Modified → Cached version is still valid.
? ⚠️ Client Errors
- 400 Bad Request → Invalid request syntax.
- 401 Unauthorized → Authentication required.
- 403 Forbidden → Server understood but refuses action.
- 404 Not Found → Resource not found.
- 405 Method Not Allowed → HTTP method not supported.
- 429 Too Many Requests → Rate limit exceeded.
? 🚨 Server Errors
- 500 Internal Server Error → Generic server failure.
- 502 Bad Gateway → Invalid response from upstream server.
- 503 Service Unavailable → Server temporarily overloaded or down.
- 504 Gateway Timeout → Upstream server didn’t respond in time.

? 📌 Tip to remember:
- 2xx = Success
- 3xx = Redirection
- 4xx = Client error (your fault)
- 5xx = Server error (their fault)

? 🔒 Security & Access
- Content-Security-Policy → Controls allowed sources for scripts, styles, etc.
- X-Content-Type-Options: nosniff → Prevents MIME type sniffing.
- X-Frame-Options: DENY → Stops clickjacking by disallowing iframes.
- Strict-Transport-Security → Forces HTTPS.
? 🌐 CORS (Cross-Origin Resource Sharing)
- Access-Control-Allow-Origin: * → Allows requests from any origin.
- Access-Control-Allow-Methods: GET, POST, PUT, DELETE → Specifies allowed HTTP methods.
- Access-Control-Allow-Headers: Content-Type, Authorization → Defines allowed custom headers.
? 📦 Content & Response
- Content-Type: text/html; charset=UTF-8 → Defines response type (HTML, JSON, etc.).
- Content-Length → Size of response body in bytes.
- Content-Encoding: gzip → Compression format.
? 🕒 Caching
- Cache-Control: no-cache, no-store, must-revalidate → Prevents caching.
- ETag → Unique identifier for resource version.
- Last-Modified → Timestamp of last resource update.
? 🔑 Authentication
- WWW-Authenticate → Used with 401 Unauthorized responses to define auth method.

🛠 Example
* res.writeHead(200, {
*   'Content-Type': 'application/json',
*   'Access-Control-Allow-Origin': '*',
*   'Cache-Control': 'no-cache',
*   'X-Content-Type-Options': 'nosniff'
* });



? 👉 A good rule of thumb:
- Always set Content-Type.
- Add security headers (X-Content-Type-Options, X-Frame-Options) for safety.
- Use CORS headers if your API is accessed from browsers.
*/
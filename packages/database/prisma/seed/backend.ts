import type { SubjectData } from "./types";

export const backendSubject: SubjectData = {
  "slug": "backend",
  "title": "Backend Development",
  "description": "Master server-side development - from networking fundamentals to APIs, databases, authentication, security, caching, message queues, deployment, and system design",
  "icon": "Server",
  "color": "text-green-500",
  "order": 4,
  "topics": [
    {
      "slug": "how-the-internet-works",
      "title": "How the Internet Works",
      "description": "Understand the core mechanisms that power the web - from URL entry to packet delivery",
      "order": 1,
      "subtopics": [
        {
          "slug": "what-happens-when-you-type-a-url",
          "title": "What happens when you type a URL",
          "order": 1,
          "content": {
            "overview": "When you type a URL into a browser and press Enter, a complex sequence of events unfolds across multiple layers of the networking stack. From DNS resolution to TCP handshakes, HTTP requests, server processing, and response rendering - each step is precisely orchestrated.",
            "problemStatement": "Users expect web pages to load in under two seconds. Behind that simple action lies a distributed system spanning DNS servers, CDNs, load balancers, web servers, application servers, databases, and caching layers. Understanding this flow is essential for debugging performance issues and building robust backends.",
            "intuitionFirst": "Typing a URL is like calling a friend overseas. First you look up their number in a phone book (DNS), then you dial and establish a connection (TCP handshake), you ask for what you want (HTTP request), they respond (HTTP response), and finally you hang up (connection close). Every step has latency and failure modes.",
            "realLifeAnalogy": "Imagine ordering a pizza. You look up the pizzeria number in your phone contacts (DNS lookup). You dial and they pick up (TCP handshake). You say I want a large pepperoni (HTTP request). They confirm and give you a price (HTTP response). They make the pizza (server processing). They deliver it (response travels back). You eat it (browser renders). If any step fails - wrong number, busy line, no delivery driver - you don't get your pizza.",
            "howItWorks": "The browser first checks its cache (DNS, page, service worker) for the IP address. If not found, it queries the DNS resolver, which traverses root servers, TLD servers, and authoritative nameservers to get the IP. A TCP three-way handshake (SYN, SYN-ACK, ACK) establishes a connection. For HTTPS, a TLS handshake negotiates encryption. The browser sends an HTTP request (method, path, headers, optional body). The server processes the request - load balancers distribute traffic, web servers route to application logic, which queries databases and external services. The response travels back with status codes and headers. The browser parses HTML, builds the DOM and CSSOM, executes scripts, and renders the page.",
            "beginnerExample": "// Simulated URL-to-page flow in Node.js\nconst https = require(\"https\");\n\nconst options = {\n  hostname: \"example.com\",\n  port: 443,\n  path: \"/\",\n  method: \"GET\",\n};\n\nconst req = https.request(options, (res) => {\n  console.log(`Status: ${res.statusCode}`);\n  console.log(`Headers:`, res.headers);\n  let data = \"\";\n  res.on(\"data\", (chunk) => (data += chunk));\n  res.on(\"end\", () => console.log(\"Body received:\", data.slice(0, 100) + \"...\"));\n});\nreq.on(\"error\", (e) => console.error(`Request failed: ${e.message}`));\nreq.end();",
            "commonMistakes": "Not understanding that each DNS lookup, TCP handshake, and TLS negotiation adds RTT latency. Assuming HTTPS is slow everywhere (TLS 1.3 reduces to 1 RTT). Ignoring DNS TTL and caching implications. Not accounting for browser connection limits (6 per domain in HTTP/1.1). Forgetting that the browser pre-parses HTML and initiates subresource fetches before full DOM construction.",
            "bestPractices": "Use HTTP/2 or HTTP/3 to reduce handshake overhead. Enable DNS prefetching via <link rel=dns-prefetch>. Use CDN for static assets. Implement connection pooling on the server. Keep TTFB under 200ms. Use service workers for offline caching. Optimize the critical rendering path.",
            "interviewPerspective": "FAANG interviewers love this question because it tests your understanding of the full stack. A strong answer covers: DNS resolution (recursive vs iterative, caching), TCP handshake (why three-way?), TLS (certificates, cipher suites), HTTP request/response structure, load balancers (reverse proxy, round-robin), and how the browser renders. Stand out by mentioning HTTP/3 (QUIC), DNSSEC, HSTS, OCSP stapling, and the difference between HTTP/1.1 keep-alive vs HTTP/2 multiplexing. Structure your answer chronologically: everything before the request reaches the server, server processing, and the response journey back.",
            "performanceNotes": "DNS lookup typically takes 20-120ms. TCP handshake adds one RTT (e.g., 50ms for a US-EU connection). TLS 1.3 adds ~1 RTT vs 2 for TLS 1.2. The server processing time (TTFB) should be < 200ms. Use HTTP/2 multiplexing to avoid head-of-line blocking. Consider edge computing to move processing closer to users.",
            "securityNotes": "Use HTTPS everywhere (HSTS header). Validate DNS responses (DNSSEC). Be aware of DNS spoofing and cache poisoning. TLS certificates must be valid and not expired. Implement certificate pinning for high-security apps. Avoid mixed content (HTTPS page loading HTTP resources).",
            "visualExplanation": "Client Browser\n    |\n    | 1. URL: https://example.com\n    |\n    v\n  [Cache Lookup] --- hit? ---> Use cached IP\n    | miss\n    v\n  [DNS Resolver]\n    | Ask root -> .com TLD -> example.com nameserver\n    | Returns IP: 93.184.216.34\n    v\n  [TCP Three-Way Handshake]\n    | SYN ------>\n    | <---- SYN-ACK\n    | ACK ------>\n    v\n  [TLS Handshake] (if HTTPS)\n    | ClientHello ----->\n    | <---- ServerHello, Certificate\n    | Key Exchange ----->\n    v\n  [HTTP Request]\n    | GET / HTTP/1.1\n    | Host: example.com\n    v\n  [Server Processing]\n    | Load Balancer -> Web Server -> App Server -> DB\n    v\n  [HTTP Response]\n    | <---- 200 OK + HTML\n    v\n  [Browser Rendering]\n    | Parse HTML -> Build DOM -> Render"
          },
          "quiz": [
            {
              "id": "be-url-1",
              "question": "What is the correct order of events when loading a webpage?",
              "options": [
                "DNS lookup -> TCP handshake -> TLS handshake -> HTTP request -> Server processing -> HTTP response -> Browser rendering",
                "TCP handshake -> DNS lookup -> HTTP request -> Server processing -> HTTP response",
                "HTTP request -> DNS lookup -> TCP handshake -> Server processing -> Response rendering",
                "DNS lookup -> HTTP request -> TCP handshake -> Server processing -> Browser rendering"
              ],
              "correctIndex": 0,
              "explanation": "DNS resolves the domain to an IP first. Then TCP establishes a connection via three-way handshake. For HTTPS, TLS handshake follows. The HTTP request is sent, processed by the server, and the response is rendered by the browser.",
              "difficulty": "easy"
            },
            {
              "id": "be-url-2",
              "question": "How many round trips does TLS 1.3 require for a full handshake?",
              "options": [
                "1 RTT",
                "0 RTT (with resumption)",
                "2 RTT",
                "3 RTT"
              ],
              "correctIndex": 0,
              "explanation": "TLS 1.3 requires only 1 round trip for a full handshake (down from 2 in TLS 1.2). With session resumption (0-RTT), data can be sent immediately on the first flight.",
              "difficulty": "medium"
            },
            {
              "id": "be-url-3",
              "question": "What happens if the DNS resolver returns multiple IP addresses for a domain?",
              "options": [
                "The browser typically connects to the first one and falls back if it fails",
                "The browser connects to all of them simultaneously",
                "The browser randomly picks one and ignores the rest",
                "The browser asks the user which IP to use"
              ],
              "correctIndex": 0,
              "explanation": "DNS can return multiple A/AAAA records for round-robin load balancing. The browser typically tries the first IP, and if the connection fails, it tries subsequent ones (connection retry).",
              "difficulty": "hard"
            },
            {
              "id": "be-url-4",
              "question": "What is the purpose of the TCP three-way handshake?",
              "options": [
                "To establish a reliable connection by synchronizing sequence numbers and ensuring both sides are ready",
                "To encrypt the data being transmitted",
                "To authenticate the client to the server",
                "To negotiate HTTP version to use"
              ],
              "correctIndex": 0,
              "explanation": "The three-way handshake (SYN, SYN-ACK, ACK) establishes a reliable connection by synchronizing initial sequence numbers and ensuring both client and server are ready to send and receive data.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "Describe in detail everything that happens when you type 'https://google.com' in a browser and press Enter.",
              "answer": "1. URL Parsing: Browser parses the URL (scheme: https, host: google.com, path: /). It checks HSTS preload list. 2. DNS Resolution: Browser checks its own cache, then OS cache, then router cache. If miss, it queries the configured DNS resolver (usually ISP or 8.8.8.8). The resolver performs recursive resolution: asks root servers for .com TLD servers, asks .com TLD servers for google.com nameservers, asks google.com nameservers for the A/AAAA record. Returns IP(s). 3. TCP Connection: Browser picks an IP, sends SYN. Server responds with SYN-ACK. Client sends ACK. Connection established. 4. TLS 1.3 Handshake: ClientHello, ServerHello with certificate, key exchange. 5. HTTP Request: Browser sends GET / HTTP/2. 6. Server Processing: Google's load balancer terminates TLS, routes to frontend server. 7. Response: HTTP/2 200 OK with HTML body. 8. Browser Rendering: Parse HTML, build DOM, fetch subresources, execute scripts, paint page.",
              "difficulty": "expert",
              "company": "Google"
            },
            {
              "question": "Explain the difference between HTTP/1.1 keep-alive, HTTP/2 multiplexing, and HTTP/3 (QUIC).",
              "answer": "HTTP/1.1 Keep-Alive: Reuses a single TCP connection for multiple requests, avoiding repeated handshakes. But enforces request-response ordering (head-of-line blocking). Browsers open up to 6 parallel connections per domain. HTTP/2 Multiplexing: Binary framing layer allows multiple concurrent streams over single TCP connection. Each stream is independent. However, TCP-level head-of-line blocking remains (a lost packet blocks all streams). HTTP/3 (QUIC): Replaces TCP with QUIC over UDP. Provides 0-RTT connection establishment, built-in encryption, stream multiplexing without head-of-line blocking, connection migration. Production adoption by Google, Meta, Cloudflare.",
              "difficulty": "expert",
              "company": "Meta"
            },
            {
              "question": "What is the browser's connection limit per domain and how does it affect performance?",
              "answer": "In HTTP/1.1, browsers typically limit concurrent connections to 6 per domain. This causes queuing when many resources need to load from the same domain. HTTP/2 solves this with multiplexing - a single connection handles all concurrent streams. HTTP/3 continues this over QUIC. Modern best practice: use HTTP/2 or HTTP/3 with a single connection per domain, avoid domain sharding.",
              "difficulty": "hard",
              "company": "Amazon"
            }
          ],
          "codingChallenges": [
            {
              "title": "Build a Simple HTTP Client",
              "description": "Create a function that takes a URL and returns the response status and body by performing DNS lookup, connecting via TCP, and sending a raw HTTP GET request.",
              "difficulty": "hard",
              "starterCode": "const dns = require('dns').promises;\nconst net = require('net');\n\nasync function httpGet(url) {\n  // Parse the URL\n  // Look up DNS\n  // Create TCP connection\n  // Send HTTP request\n  // Parse and return response\n}",
              "solutionHint": "Use URL constructor to parse, dns.promises.lookup for resolution, net.createConnection for TCP socket. Send 'GET /path HTTP/1.1\\r\\nHost: hostname\\r\\n\\r\\n'. Collect chunks until connection ends."
            }
          ]
        },
        {
          "slug": "client-server-architecture",
          "title": "Client-Server Architecture",
          "order": 2,
          "content": {
            "overview": "Client-server architecture is a distributed application structure that partitions tasks or workloads between providers of a resource or service (servers) and requesters (clients). It is the fundamental model underlying all web applications.",
            "problemStatement": "Early computing used mainframe-terminal models. As networks grew, a more flexible model was needed where different machines could specialize in serving resources while others consume them, enabling scalable, maintainable distributed systems.",
            "intuitionFirst": "Think of a restaurant. The customer (client) places an order. The waiter (API gateway) takes it to the kitchen (server). The kitchen prepares the meal (processes request) and the waiter brings it back (response). Multiple customers can be served simultaneously.",
            "realLifeAnalogy": "A library: you (client) walk in, search the catalog (query), request a book (request), and the librarian fetches it from the stacks (server processing). You don't need to know where the book is stored or how the catalog system works.",
            "howItWorks": "The client sends a request over a network to the server. The server receives, processes (possibly querying databases or calling other services), and sends back a response. Clients initiate communication and servers passively wait. This model enables centralized control of data and logic on the server.",
            "beginnerExample": "// Simple Express server\nconst express = require('express');\nconst app = express();\napp.get('/api/data', (req, res) => {\n  res.json({ message: 'Hello from server!' });\n});\napp.listen(3000);\n\n// Client fetch\nfetch('http://localhost:3000/api/data')\n  .then(res => res.json())\n  .then(data => console.log(data.message));",
            "commonMistakes": "Putting too much logic in the client (security-sensitive operations), failing to handle server downtime gracefully, not implementing proper error handling, and ignoring the stateless nature of HTTP when designing server logic.",
            "bestPractices": "Keep business logic on the server for security. Implement proper error handling and timeouts. Use stateless server design for horizontal scaling. Implement health checks and circuit breakers. Version your APIs.",
            "interviewPerspective": "At FAANG, deeply understand client-server trade-offs. Know the difference between thick clients (heavy logic, like Figma) and thin clients (mostly UI, like web apps). Discuss how the model enables horizontal scaling, challenges of state management, and modern variations like edge computing.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities.",
            "comparisonTable": "| Feature | Client | Server |\n|---------|--------|--------|\n| Initiates communication | Yes | No (listens) |\n| Stores persistent data | No (usually) | Yes |\n| Handles business logic | Minimal | Core logic |\n| Scalability | Per-user device | Horizontal scaling |\n| Security exposure | User device | Must be hardened |\n| State | Session cookies/tokens | Database/sessions |"
          },
          "quiz": [
            {
              "id": "be-cs-1",
              "question": "In a client-server architecture, who initiates the communication?",
              "options": [
                "The client",
                "The server",
                "Both simultaneously",
                "Neither"
              ],
              "correctIndex": 0,
              "explanation": "The client always initiates communication by sending a request to the server. The server passively listens for incoming requests.",
              "difficulty": "easy"
            },
            {
              "id": "be-cs-2",
              "question": "What is a key advantage of client-server architecture over peer-to-peer?",
              "options": [
                "Centralized data management and security control",
                "Faster file sharing between peers",
                "No single point of failure",
                "No network required"
              ],
              "correctIndex": 0,
              "explanation": "Client-server architecture centralizes data and security on the server, making it easier to manage, back up, and secure.",
              "difficulty": "medium"
            },
            {
              "id": "be-cs-3",
              "question": "What happens when hundreds of clients simultaneously request data from a single server?",
              "options": [
                "The server can become overloaded; load balancers and horizontal scaling address this",
                "The server automatically duplicates itself",
                "Clients take turns automatically",
                "The network rejects excess connections"
              ],
              "correctIndex": 0,
              "explanation": "A single server has limited resources. Load balancers distribute traffic across multiple server instances (horizontal scaling) to handle high concurrency.",
              "difficulty": "hard"
            }
          ],
          "faangQuestions": [
            {
              "question": "Compare client-server architecture with peer-to-peer and microservices architectures.",
              "answer": "Client-Server: Centralized server(s) serving many clients. Pros: centralized data control, easier security. Cons: server bottleneck, single point of failure. Peer-to-Peer: Each node acts as both client and server. Pros: no central bottleneck, resilient. Cons: difficult to secure, complex discovery. Microservices: Server-side decomposition into many independent services. Pros: independent scaling, technology diversity, fault isolation. Cons: distributed complexity, network overhead.",
              "difficulty": "hard",
              "company": "Amazon"
            },
            {
              "question": "How does the stateless nature of HTTP affect client-server architecture? How do you maintain session state?",
              "answer": "HTTP is stateless by design for scalability. Strategies to maintain state: (1) Cookies: session ID cookie, server looks up session data. (2) JWT Tokens: signed token containing user data, verified on each request. (3) Server-side sessions: session data in Redis keyed by session ID. (4) Client-side storage: localStorage. Stateless servers (JWT) scale better horizontally because any server can handle any request without shared session storage.",
              "difficulty": "hard",
              "company": "Google"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "request-response-cycle",
          "title": "Request-Response Cycle",
          "order": 3,
          "content": {
            "overview": "The request-response cycle is the fundamental communication pattern in web applications. The client sends a request, the server processes it, and sends back a response. This cycle forms the basis of HTTP communication.",
            "problemStatement": "Distributed systems need a standardized way for components to communicate. Without a consistent request-response pattern, every application would need custom communication protocols, making interoperability impossible.",
            "intuitionFirst": "Think of the request-response cycle like ordering at a drive-through. You drive up to the speaker (send request with your order). The restaurant processes it (kitchen makes food). You receive your order at the window (response).",
            "realLifeAnalogy": "A letter-writing exchange: you write a letter (request) with a specific format: address (URL), greeting (headers), body (message). The recipient reads it, processes the information, and writes back (response).",
            "howItWorks": "The client prepares a request message containing a method, URL, headers, and optionally a body. This is sent over TCP to the server. The server parses the request, routes it to the appropriate handler, executes business logic, optionally queries databases, and constructs a response message with a status code, headers, and body.",
            "beginnerExample": "const http = require('http');\nconst server = http.createServer((req, res) => {\n  console.log(`Method: ${req.method}, URL: ${req.url}`);\n  let body = '';\n  req.on('data', chunk => body += chunk);\n  req.on('end', () => {\n    res.writeHead(200, { 'Content-Type': 'application/json' });\n    res.end(JSON.stringify({ message: 'Response received', echo: body }));\n  });\n});\nserver.listen(3000);",
            "commonMistakes": "Sending sensitive data in URL query parameters. Not handling all response status codes. Assuming the response arrives in a single chunk. Not setting proper content-type headers. Blocking the event loop during request processing.",
            "bestPractices": "Always validate and sanitize input on the server. Set appropriate content-type and cache-control headers. Handle errors gracefully with proper status codes. Use streaming for large payloads. Implement request timeouts.",
            "interviewPerspective": "FAANG engineers think about the request-response lifecycle in terms of latency budgets. Break it down: network latency (DNS + TCP + TLS), server queueing (load balancer), request parsing, business logic execution, database queries, response serialization, and network return. Know typical latencies and optimization strategies.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-rr-1",
              "question": "What are the three main parts of an HTTP request?",
              "options": [
                "Request line, headers, body",
                "Method, URL, protocol",
                "Status line, headers, body",
                "URL, cookies, body"
              ],
              "correctIndex": 0,
              "explanation": "An HTTP request consists of a request line (method, URL, protocol version), headers (metadata), and an optional body.",
              "difficulty": "easy"
            },
            {
              "id": "be-rr-2",
              "question": "What is the first line of an HTTP response called?",
              "options": [
                "Status line (protocol, status code, status text)",
                "Response header",
                "Request line",
                "Body preamble"
              ],
              "correctIndex": 0,
              "explanation": "The first line of an HTTP response is the status line, containing the protocol version, status code, and reason phrase.",
              "difficulty": "medium"
            },
            {
              "id": "be-rr-3",
              "question": "In the request-response cycle, where does the majority of latency typically come from?",
              "options": [
                "It varies: network latency, server processing, or database queries can each dominate",
                "Always network latency",
                "Always database queries",
                "Always server CPU processing"
              ],
              "correctIndex": 0,
              "explanation": "The bottleneck varies by application. Profiling is essential to identify the actual bottleneck.",
              "difficulty": "hard"
            }
          ],
          "faangQuestions": [
            {
              "question": "How would you optimize the request-response cycle for a high-traffic API serving millions of requests per second?",
              "answer": "Network layer: CDN for static/edge-cacheable responses, HTTP/2 or HTTP/3 multiplexing, connection pooling. Load balancing: Layer 4 for throughput or Layer 7 for smart routing. Application layer: Asynchronous processing with message queues, caching at every level (Redis, CDN), database optimization, read replicas. Response optimization: Compression (gzip, brotli), Protocol Buffers for internal services, partial responses (GraphQL, sparse fieldsets).",
              "difficulty": "expert",
              "company": "Google"
            },
            {
              "question": "What is the difference between blocking and non-blocking request processing? How does Node.js handle concurrent requests with a single thread?",
              "answer": "Blocking: Each request consumes a thread. Threads exhaust under load. Non-blocking: Single thread processes many requests using an event loop. I/O operations are asynchronous. While waiting for I/O, the event loop handles other requests. Node.js uses libuv's event loop with phases: timers, pending callbacks, poll, check, close. I/O callbacks are processed when I/O completes. This enables handling thousands of concurrent connections with a single thread.",
              "difficulty": "expert",
              "company": "Netflix"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "dns",
          "title": "DNS",
          "order": 4,
          "content": {
            "overview": "The Domain Name System (DNS) translates human-readable domain names into machine-readable IP addresses. It is the phonebook of the internet, operating as a hierarchical distributed database.",
            "problemStatement": "Humans remember names, but computers communicate using IP addresses. As the internet grew from a few hosts to billions, a centralized hosts file became impossible to maintain. A distributed, scalable, and fault-tolerant naming system was needed.",
            "intuitionFirst": "DNS is like the contact list in your phone. You want to call John, so you look up John's number in your contacts and dial. DNS looks up a domain name and returns the IP address so your computer can connect.",
            "realLifeAnalogy": "When you mail a letter, you write the recipient's name and address. The postal service looks up the zip code (like DNS lookup), routes it to the correct post office, and delivers it. The zip code system is hierarchical: country -> state -> city -> street.",
            "howItWorks": "DNS resolution involves hierarchical queries. The client asks a recursive resolver (ISP or public like 8.8.8.8). The resolver starts at the root servers (13 root server clusters worldwide). Root servers direct to TLD servers (.com, .org, etc.). TLD servers direct to authoritative nameservers for the domain. The authoritative server returns the actual IP address. Results are cached at every level based on TTL values.",
            "beginnerExample": "const dns = require('dns').promises;\n\nasync function dnsDemo() {\n  const ip = await dns.lookup('google.com');\n  console.log('IP:', ip.address);\n  const records = await dns.resolve4('google.com');\n  console.log('All A records:', records);\n  const mxRecords = await dns.resolveMx('google.com');\n  console.log('MX records:', mxRecords);\n}\ndnsDemo();",
            "commonMistakes": "Ignoring DNS propagation delays when migrating servers. Setting TTL too high (slows migration) or too low (increases lookup traffic). Not having redundant nameservers. Hardcoding IPs instead of hostnames in configuration.",
            "bestPractices": "Use at least two nameservers in different physical locations. Set TTL appropriately (5-10 minutes for production). Use DNS monitoring and alerting. Implement DNSSEC to prevent cache poisoning. Use anycast DNS for high availability.",
            "interviewPerspective": "DNS questions at FAANG explore distributed systems concepts. Be ready to discuss: DNS hierarchy and why it's hierarchical, caching at each level, TTL strategies, anycast routing, DNS-based load balancing, DNS as a DDoS vector (amplification attacks), and modern alternatives (DNS-over-HTTPS, DNS-over-TLS).",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities.",
            "visualExplanation": "How DNS Resolution Works:\n\nClient: \"What is the IP for api.example.com?\"\n   |\n   v\n[Recursive Resolver]\n   |---> Ask Root Server: \"Who manages .com?\"\n   |<--- Answer: \"Ask TLD server\"\n   |---> Ask TLD Server: \"Who manages example.com?\"\n   |<--- Answer: \"Ask ns1.example.com\"\n   |---> Ask Authoritative Nameserver: \"What is api.example.com?\"\n   |<--- Answer: \"api.example.com A record = 93.184.216.34\"\n   v\nClient: \"Connecting to 93.184.216.34:443...\""
          },
          "quiz": [
            {
              "id": "be-dns-1",
              "question": "What does a DNS A record map a domain to?",
              "options": [
                "An IPv4 address",
                "An IPv6 address",
                "A mail server",
                "Another domain name"
              ],
              "correctIndex": 0,
              "explanation": "An A (Address) record maps a domain name to an IPv4 address. AAAA records map to IPv6. CNAME maps to another domain. MX maps to mail servers.",
              "difficulty": "easy"
            },
            {
              "id": "be-dns-2",
              "question": "What is the purpose of DNS caching?",
              "options": [
                "To reduce latency and decrease load on DNS infrastructure by storing previously resolved queries",
                "To store website content for faster loading",
                "To authenticate DNS queries",
                "To encrypt DNS traffic"
              ],
              "correctIndex": 0,
              "explanation": "DNS caching stores resolved DNS records locally for the TTL duration, dramatically reducing lookup times and reducing load on DNS infrastructure.",
              "difficulty": "medium"
            },
            {
              "id": "be-dns-3",
              "question": "How does DNS-based round-robin load balancing work?",
              "options": [
                "The authoritative nameserver returns multiple A records in different orders to different clients",
                "The DNS server dynamically measures server load and adjusts responses",
                "The client randomly picks an IP from a single A record",
                "The TLD server distributes requests across nameservers"
              ],
              "correctIndex": 0,
              "explanation": "DNS round-robin returns multiple A records, rotating the order. Clients typically use the first IP, distributing traffic.",
              "difficulty": "hard"
            },
            {
              "id": "be-dns-4",
              "question": "What is DNSSEC and what problem does it solve?",
              "options": [
                "DNSSEC cryptographically signs DNS records to prevent cache poisoning and spoofing attacks",
                "DNSSEC encrypts all DNS traffic for privacy",
                "DNSSEC speeds up DNS resolution",
                "DNSSEC replaces the root DNS servers"
              ],
              "correctIndex": 0,
              "explanation": "DNSSEC adds cryptographic signatures to DNS records, allowing resolvers to verify responses haven't been tampered with.",
              "difficulty": "hard"
            }
          ],
          "faangQuestions": [
            {
              "question": "How does DNS work at scale for a service like google.com?",
              "answer": "Google uses anycast IP addresses announced from multiple global locations. BGP routes clients to the nearest one. Carefully tuned TTLs (5 minutes for A records). Google Public DNS (8.8.8.8) uses extensive caching with prefetching. DNS-based load balancing returns different A records based on client location and server load. Multiple nameservers in diverse locations, automatic failover, rate limiting. GeoDNS returns different IPs based on resolver location. Health checks dynamically adjust DNS records.",
              "difficulty": "expert",
              "company": "Google"
            },
            {
              "question": "Explain DNS amplification attacks and mitigations.",
              "answer": "DDoS attack exploiting open DNS resolvers. Attacker sends small query (ANY record, ~60 bytes) with spoofed source IP (victim's IP). DNS resolver sends large response (~4000 bytes) to victim. Amplification factor up to 60x. Mitigations: (1) BCP 38 ingress filtering, (2) Disable open recursion, (3) Rate limiting per source IP, (4) Response rate limiting, (5) Anycast to distribute load, (6) DNS-over-HTTPS/TLS.",
              "difficulty": "expert",
              "company": "Cloudflare"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "http-vs-https",
          "title": "HTTP vs HTTPS",
          "order": 5,
          "content": {
            "overview": "HTTP (HyperText Transfer Protocol) is the foundation of data communication on the web. HTTPS (HTTP Secure) adds a layer of encryption using TLS, ensuring confidentiality, integrity, and authentication of data transmitted between client and server.",
            "problemStatement": "HTTP sends data in plaintext, meaning anyone intercepting network traffic can read everything - passwords, credit cards, personal messages. Without encryption, the web would be unsafe for commerce, banking, email, and any sensitive communication.",
            "intuitionFirst": "HTTP is like sending a postcard - anyone handling it can read what's written. HTTPS is like sending a sealed, tamper-evident envelope - only the intended recipient can open and read it.",
            "realLifeAnalogy": "Imagine sending a secret recipe. HTTP is like shouting it across a crowded room - everyone hears it. HTTPS is like writing it in code, putting it in a locked box, and sending it via a trusted courier who verifies your friend's identity before handing over the key.",
            "howItWorks": "HTTPS uses TLS to encrypt HTTP traffic. The handshake establishes a shared secret key using asymmetric encryption (ECDHE), then switches to symmetric encryption (AES-GCM, ChaCha20) for bulk data. TLS provides: encryption, authentication (server identity verified via certificates from Certificate Authorities), and integrity (tampering detected via MAC).",
            "beginnerExample": "const https = require('https');\nconst fs = require('fs');\nconst express = require('express');\nconst app = express();\napp.get('/', (req, res) => res.send('HTTPS working!'));\nconst options = {\n  key: fs.readFileSync('private-key.pem'),\n  cert: fs.readFileSync('certificate.pem'),\n};\nhttps.createServer(options, app).listen(443);",
            "commonMistakes": "Using self-signed certificates in production. Not setting up automatic certificate renewal. Serving mixed content (HTTPS page loading HTTP resources). Using outdated TLS versions (1.0, 1.1). Not implementing HSTS.",
            "bestPractices": "Use HTTPS everywhere. Use Let's Encrypt for free automated certificates. Enable HSTS header. Use TLS 1.2 or 1.3 only. Configure secure cipher suites. Enable OCSP stapling. Use HTTP/2 (requires HTTPS). Redirect all HTTP to HTTPS.",
            "interviewPerspective": "FAANG interviewers assess depth of understanding through follow-up questions about trade-offs, edge cases, and system design implications.",
            "performanceNotes": "HTTPS adds computational overhead for encryption/decryption. With hardware acceleration (AES-NI) and TLS 1.3 (1-RTT handshake), overhead is minimal (<2% CPU). HTTP/2 over HTTPS improves performance via multiplexing. TLS session resumption reduces handshake overhead.",
            "securityNotes": "HTTPS protects against: eavesdropping, man-in-the-middle attacks, tampering, impersonation. It does NOT protect against: application-level vulnerabilities (XSS, SQL injection), compromised endpoints, malware on client device."
          },
          "quiz": [
            {
              "id": "be-httphttps-1",
              "question": "What layer of security does HTTPS add on top of HTTP?",
              "options": [
                "TLS/SSL encryption layer between HTTP and TCP",
                "Application-layer encryption in the HTTP headers",
                "IP-level encryption using IPSec",
                "Transport-layer encryption replacing TCP"
              ],
              "correctIndex": 0,
              "explanation": "HTTPS wraps HTTP within TLS, which operates between the application layer (HTTP) and transport layer (TCP).",
              "difficulty": "easy"
            },
            {
              "id": "be-httphttps-2",
              "question": "What is a Certificate Authority (CA) and what role does it play?",
              "options": [
                "A trusted third party that issues digital certificates verifying a server's identity",
                "An organization that manages IP address allocation",
                "A government agency that monitors encrypted traffic",
                "A company that provides DNS resolution"
              ],
              "correctIndex": 0,
              "explanation": "A CA is a trusted entity that issues digital certificates. The browser verifies the signature using the CA's public key, confirming the server's identity.",
              "difficulty": "medium"
            },
            {
              "id": "be-httphttps-3",
              "question": "What is mixed content and why is it dangerous?",
              "options": [
                "An HTTPS page that loads HTTP resources; the HTTP resources can be intercepted and modified",
                "A page containing both text and images",
                "A page with multiple CSS frameworks",
                "An API that returns both JSON and XML"
              ],
              "correctIndex": 0,
              "explanation": "Mixed content occurs when an HTTPS page loads resources over HTTP, which are vulnerable to man-in-the-middle attacks.",
              "difficulty": "hard"
            }
          ],
          "faangQuestions": [
            {
              "question": "Explain the TLS 1.3 handshake in detail. How does it improve over TLS 1.2?",
              "answer": "TLS 1.3 reduces handshake latency from 2 RTT to 1 RTT (or 0 RTT with resumption). TLS 1.2: ClientHello -> ServerHello + Certificate (1 RTT), ClientKeyExchange -> Finished (2 RTT). TLS 1.3: ClientHello includes key share, ServerHello includes key share + certificate + Finished (1 RTT). Improvements: (1) Only forward-secret ECDHE key exchange. (2) Only AEAD ciphers (AES-GCM, ChaCha20-Poly1305). (3) Encrypted handshake. (4) 0-RTT resumption with PSK. Tradeoff: 0-RTT vulnerable to replay attacks.",
              "difficulty": "expert",
              "company": "Cloudflare"
            },
            {
              "question": "How does HSTS work and why is it important?",
              "answer": "HSTS (Strict-Transport-Security header) tells browsers to only connect over HTTPS. Browser: (1) Auto-converts HTTP links to HTTPS, (2) Refuses connection on certificate errors, (3) Caches policy for max-age. Prevents SSL stripping attacks. Must set includeSubDomains. Can preload into browser lists (hstspreload.org).",
              "difficulty": "hard",
              "company": "Google"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "tcp-ip-basics",
          "title": "TCP/IP Basics",
          "order": 6,
          "content": {
            "overview": "TCP/IP is the fundamental protocol suite that powers the internet. TCP (Transmission Control Protocol) provides reliable, ordered, error-checked delivery of data. IP (Internet Protocol) handles addressing and routing packets across networks.",
            "problemStatement": "Data sent over a network can be lost, corrupted, duplicated, or arrive out of order. A reliable transport protocol is needed that handles error detection, automatic retransmission, flow control, and congestion avoidance.",
            "intuitionFirst": "TCP is like certified mail. The sender gets delivery confirmation, the letter is tracked, and if lost, it's resent. IP is like the postal addressing system - it ensures the letter gets to the right address but doesn't guarantee delivery.",
            "realLifeAnalogy": "Shipping a fragile vase: you pack it (segmentation), label it with addresses (IP headers), ship via tracked courier (TCP sequence numbers). Courier confirms each leg (ACKs). If lost, they resend (retransmission). Courier slows down during bad weather (congestion control).",
            "howItWorks": "TCP breaks data into segments, assigns sequence numbers, ensures reliable delivery through acknowledgments and retransmissions. Flow control uses sliding window mechanism. Congestion control uses algorithms like slow start, congestion avoidance, fast retransmit. IP handles packet routing across networks using IP addresses and routing tables.",
            "beginnerExample": "const net = require('net');\nconst server = net.createServer((socket) => {\n  socket.on('data', (data) => {\n    console.log('Received:', data.toString());\n    socket.write('ACK: ' + data.toString());\n  });\n});\nserver.listen(8080);\n\nconst client = net.createConnection({ port: 8080 }, () => {\n  client.write('Hello TCP!');\n});\nclient.on('data', (data) => {\n  console.log('Response:', data.toString());\n  client.end();\n});",
            "commonMistakes": "Assuming TCP implies zero latency. Not understanding TCP vs UDP tradeoffs. Ignoring TCP connection overhead for short-lived connections. Not tuning TCP parameters. Forgetting about TIME_WAIT states accumulating on servers.",
            "bestPractices": "Use connection pooling to avoid repeated TCP handshakes. Tune TCP keepalive for detecting dead connections. Consider TCP_NODELAY for latency-sensitive apps. Monitor TCP retransmission rates. Understand TCP window scaling for high-bandwidth connections.",
            "interviewPerspective": "TCP/IP knowledge is essential at FAANG. Be ready to discuss: TCP flow control vs congestion control, TCP Cubic vs BBR, how TCP handles packet loss (duplicate ACKs trigger fast retransmit), TCP vs UDP use cases, how QUIC bridges the gap, how HTTP/3 bypasses TCP head-of-line blocking. Know the TCP state machine (LISTEN, SYN-SENT, ESTABLISHED, FIN-WAIT, TIME-WAIT, CLOSED).",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities.",
            "visualExplanation": "TCP Segment Structure:\n+----------------+----------------+\n| Source Port(16)| Dest Port(16)  |\n+----------------+----------------+\n| Sequence Number (32)           |\n+--------------------------------+\n| Acknowledgment Number (32)     |\n+----------+-----+---------------+\n| Data Off |Flag | Window (16)   |\n+----------+-----+---------------+\n| Checksum (16)   | Urgent Ptr  |\n+----------------+----------------+\n\nTCP Three-Way Handshake:\nCLIENT                    SERVER\n  |------ SYN (seq=100) --->|\n  |<--- SYN-ACK (seq=300,   |\n  |     ack=101) -----------|\n  |------ ACK (seq=101,     |\n  |     ack=301) ---------->|"
          },
          "quiz": [
            {
              "id": "be-tcpip-1",
              "question": "What is the purpose of TCP sequence numbers?",
              "options": [
                "To ensure data can be reassembled in order and detect missing packets",
                "To encrypt data in transit",
                "To determine the fastest network route",
                "To authenticate the sender"
              ],
              "correctIndex": 0,
              "explanation": "Sequence numbers allow the receiver to reorder out-of-order segments and detect missing segments.",
              "difficulty": "medium"
            },
            {
              "id": "be-tcpip-2",
              "question": "What mechanism prevents the sender from overwhelming the receiver?",
              "options": [
                "Flow control via the window size field in TCP headers",
                "Congestion control via slow start",
                "Rate limiting at application layer",
                "Packet prioritization using QoS"
              ],
              "correctIndex": 0,
              "explanation": "Flow control uses the Window field, which advertises how much data the receiver's buffer can accept.",
              "difficulty": "medium"
            },
            {
              "id": "be-tcpip-3",
              "question": "What TCP mechanism probes for available bandwidth?",
              "options": [
                "Slow start - doubles window size each RTT until loss or threshold",
                "Fast retransmit - resends on duplicate ACKs",
                "Selective acknowledgment",
                "TCP keepalive"
              ],
              "correctIndex": 0,
              "explanation": "Slow start begins with small congestion window and doubles each RTT until packet loss or threshold is reached.",
              "difficulty": "hard"
            },
            {
              "id": "be-tcpip-4",
              "question": "Which is NOT a feature of TCP?",
              "options": [
                "Low-latency unordered delivery (no retransmission)",
                "Reliable data transfer with acknowledgments",
                "In-order delivery with sequence numbers",
                "Congestion avoidance"
              ],
              "correctIndex": 0,
              "explanation": "Low-latency unordered delivery without retransmission is UDP, not TCP.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "Explain TCP congestion control algorithms. Compare TCP Reno, TCP Cubic, and TCP BBR.",
              "answer": "TCP Reno: AIMD (Additive Increase Multiplicative Decrease). On packet loss, halves congestion window. Includes slow start, congestion avoidance, fast retransmit, fast recovery. TCP Cubic (Linux default): Cubic function for window growth, independent of RTT. After loss, reduces cwnd by 20% and grows quickly back to previous max. Better for long-fat networks. TCP BBR (Google): Model-based, not loss-based. Estimates bottleneck bandwidth and round-trip propagation time. Aims to operate just before bufferbloat. Used by Google's internal networks and YouTube.",
              "difficulty": "expert",
              "company": "Google"
            },
            {
              "question": "What is TCP head-of-line blocking and how do HTTP/2 and HTTP/3 address it?",
              "answer": "TCP HOL blocking: In HTTP/2, multiple streams share one TCP connection. If a TCP segment is lost, all streams must wait for retransmission. HTTP/2 addresses application-layer HOL but TCP-layer HOL remains. HTTP/3 over QUIC: Each stream is independent at transport layer. A lost packet only affects its stream. QUIC also provides faster handshake, connection migration, built-in encryption.",
              "difficulty": "expert",
              "company": "Meta"
            }
          ],
          "codingChallenges": [
            {
              "title": "Implement TCP-like Reliable Delivery Over UDP",
              "description": "Create a Node.js app that implements reliable delivery over UDP using sequence numbers, acknowledgments, retransmission with timeout, and a sliding window protocol.",
              "difficulty": "hard",
              "starterCode": "const dgram = require('dgram');\nclass ReliableTransport {\n  constructor(maxWindow = 4, timeoutMs = 1000) {\n    this.maxWindow = maxWindow;\n    this.timeoutMs = timeoutMs;\n    this.seqNum = 0;\n    this.sendBuffer = new Map();\n    this.socket = dgram.createSocket('udp4');\n  }\n  send(data, port, address) { /* TODO */ }\n}",
              "solutionHint": "Assign sequence numbers, store unacknowledged packets in a Map, set individual timers, resend on timeout, slide window forward on ACK. Serialize with JSON: {seq, ack, data, type}. Handle out-of-order packets."
            }
          ]
        }
      ]
    },
    {
      "slug": "http-protocol",
      "title": "HTTP Protocol",
      "description": "Deep dive into the HTTP protocol - methods, status codes, headers, and request anatomy",
      "order": 2,
      "subtopics": [
        {
          "slug": "http-methods",
          "title": "HTTP Methods (GET, POST, PUT, PATCH, DELETE)",
          "order": 1,
          "content": {
            "overview": "HTTP methods (also called HTTP verbs) indicate the desired action to be performed on a resource. The most common methods are GET (retrieve), POST (create), PUT (replace), PATCH (partial modify), and DELETE (remove), each with specific semantics, safety, and idempotency properties.",
            "problemStatement": "Without standardized methods, every API would define its own conventions for CRUD operations. HTTP methods provide a universal vocabulary for clients to express their intent, enabling intermediaries to understand and optimize request handling.",
            "intuitionFirst": "HTTP methods are like verbs in a language. GET is like asking for information. POST is like creating something new. PUT is like completely replacing something. PATCH is like making a small edit. DELETE is like removing something.",
            "realLifeAnalogy": "At a library: GET is browsing the catalog. POST is adding a new book. PUT is replacing a damaged book with a new copy. PATCH is correcting just the publication year. DELETE is removing a book from circulation.",
            "howItWorks": "GET retrieves a resource representation (safe, idempotent). POST submits data to create a resource (neither safe nor idempotent). PUT replaces a resource entirely (idempotent). PATCH applies partial modifications (not necessarily idempotent). DELETE removes a resource (idempotent).",
            "beginnerExample": "const express = require('express');\nconst app = express();\napp.use(express.json());\nlet users = [{ id: 1, name: 'Alice' }];\napp.get('/api/users', (req, res) => res.json(users));\napp.post('/api/users', (req, res) => {\n  const user = { id: users.length + 1, ...req.body };\n  users.push(user);\n  res.status(201).json(user);\n});\napp.put('/api/users/:id', (req, res) => {\n  const index = users.findIndex(u => u.id === +req.params.id);\n  users[index] = { id: +req.params.id, ...req.body };\n  res.json(users[index]);\n});\napp.patch('/api/users/:id', (req, res) => {\n  const user = users.find(u => u.id === +req.params.id);\n  Object.assign(user, req.body);\n  res.json(user);\n});\napp.delete('/api/users/:id', (req, res) => {\n  users = users.filter(u => u.id !== +req.params.id);\n  res.status(204).send();\n});\napp.listen(3000);",
            "commonMistakes": "Using GET to modify data. Using POST for everything (RPC style). Not returning proper status codes. Treating PUT and PATCH interchangeably. Sending request body in GET requests.",
            "bestPractices": "Follow RESTful conventions. Make PUT and DELETE idempotent. Return proper status codes. Use 201 with Location header for creates. Use 204 for deletes. Validate request body before processing.",
            "interviewPerspective": "FAANG interviews frequently test HTTP method knowledge. Key points: Safety vs Idempotency. Understand why POST is not idempotent. Discuss idempotency keys (Stripe API canonical example). Know that PATCH can be idempotent if it describes a state change. Understand how Kubernetes API uses PATCH with strategic merge patch vs JSON patch.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities.",
            "comparisonTable": "| Method | Safe | Idempotent | Cacheable | Request Body | Response Body |\n|--------|------|------------|-----------|--------------|---------------|\n| GET    | Yes  | Yes        | Yes       | Not standard | Resource      |\n| POST   | No   | No         | Yes*      | Resource data| New resource  |\n| PUT    | No   | Yes        | No        | Full resource| Updated res   |\n| PATCH  | No   | No*        | No        | Partial data | Updated res   |\n| DELETE | No   | Yes        | No        | Optional     | Status/empty  |"
          },
          "quiz": [
            {
              "id": "be-httpmethods-1",
              "question": "What does it mean for an HTTP method to be idempotent?",
              "options": [
                "Multiple identical requests have the same effect as a single request",
                "The request produces no server-side side effects",
                "The response can be cached",
                "The request requires authentication"
              ],
              "correctIndex": 0,
              "explanation": "Idempotency means making the same request multiple times has the same effect as once. GET, PUT, DELETE, HEAD, OPTIONS are idempotent.",
              "difficulty": "easy"
            },
            {
              "id": "be-httpmethods-2",
              "question": "What is the difference between PUT and PATCH?",
              "options": [
                "PUT replaces the entire resource; PATCH applies partial modifications",
                "PUT is for creating; PATCH is for updating",
                "PUT is idempotent; PATCH is always idempotent",
                "PUT requires authentication; PATCH does not"
              ],
              "correctIndex": 0,
              "explanation": "PUT replaces the entire resource. PATCH applies only the changes specified, leaving other fields unchanged.",
              "difficulty": "medium"
            },
            {
              "id": "be-httpmethods-3",
              "question": "Which HTTP method should be used to retrieve a resource without side effects?",
              "options": [
                "GET",
                "POST",
                "PUT",
                "DELETE"
              ],
              "correctIndex": 0,
              "explanation": "GET is the safe, idempotent method for retrieving resources without server-side side effects.",
              "difficulty": "easy"
            },
            {
              "id": "be-httpmethods-4",
              "question": "If a client sends the same DELETE request twice, what should happen?",
              "options": [
                "First returns 200/204, second returns 200/204 (or 404) - state is same after both",
                "Second throws error because resource no longer exists",
                "Second recreates the resource",
                "Server returns 409 Conflict"
              ],
              "correctIndex": 0,
              "explanation": "DELETE is idempotent. After the first DELETE, the resource is gone. The second DELETE should return 204 or 404, but server state is identical.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Explain HTTP method idempotency and safety in detail. Why is this critical for distributed systems?",
              "answer": "Safety: Safe methods (GET, HEAD, OPTIONS) do not modify resources. Important for prefetching, crawlers. Idempotency: Multiple identical requests produce same state as one. Critical for: (1) Retry logic - network failures are inevitable, idempotent methods can be retried safely. (2) At-least-once delivery in message queues. (3) Idempotency keys for POST (Stripe API example - sending same idempotency key creates only one charge). (4) Database operations - INSERT ... ON CONFLICT DO NOTHING for idempotent creates.",
              "difficulty": "expert",
              "company": "Stripe"
            },
            {
              "question": "How would you design a REST API for a payment system considering idempotency?",
              "answer": "Client generates unique idempotency key (UUID) per payment attempt, sends in Idempotency-Key header. Server checks if key was processed - if yes, returns cached response. If no, processes payment and caches response keyed by idempotency key (TTL: 24h). Database: store idempotency key as unique index in payment_attempts table. GET payment status is naturally idempotent. For refunds, POST with idempotency key prevents duplicate refunds. This prevents double charges from network timeouts or client retries.",
              "difficulty": "expert",
              "company": "Stripe"
            }
          ],
          "codingChallenges": [
            {
              "title": "Build a REST API with All HTTP Methods",
              "description": "Create an Express.js REST API for a task list with all five HTTP methods, proper status codes, input validation, error handling, and idempotency-key middleware for POST requests.",
              "difficulty": "medium",
              "starterCode": "const express = require('express');\nconst app = express();\napp.use(express.json());\nlet tasks = [];\nlet idCounter = 1;\nconst idempotencyStore = new Map();\n\nfunction idempotency(req, res, next) {\n  if (req.method !== 'POST') return next();\n  const key = req.headers['idempotency-key'];\n  if (!key) return res.status(400).json({ error: 'Idempotency-Key required' });\n  // TODO: check store\n  next();\n}",
              "solutionHint": "Implement GET /tasks, GET /tasks/:id, POST /tasks (with idempotency), PUT /tasks/:id, PATCH /tasks/:id, DELETE /tasks/:id. Return 201 with Location, 204 for DELETE, 200 for others."
            }
          ]
        },
        {
          "slug": "status-codes",
          "title": "Status Codes (200, 201, 204, 400, 401, 403, 404, 500)",
          "order": 2,
          "content": {
            "overview": "HTTP status codes are three-digit numbers indicating the result of a request. They are grouped into five classes: 1xx (informational), 2xx (success), 3xx (redirection), 4xx (client error), and 5xx (server error).",
            "problemStatement": "Without standardized status codes, clients would parse response bodies to determine request outcome. Status codes provide immediate, machine-readable feedback, enabling automated error handling, retries, and caching decisions.",
            "intuitionFirst": "Status codes are like traffic lights. 2xx is green (everything's fine), 3xx is yellow (redirecting), 4xx is red with driver at fault, 5xx is red with road at fault (server issue).",
            "realLifeAnalogy": "At a restaurant: 200 OK is waiter bringing your order. 201 Created is chef preparing your custom dish. 204 No Content is nodding when you ask to split the bill. 400 Bad Request is ordering items not on the menu. 401 is showing ID first. 403 is not allowed in VIP. 404 is dish not available. 500 is fire in the kitchen.",
            "howItWorks": "The server sets the status code in the status line (e.g., HTTP/1.1 200 OK). Clients check the code before processing the body. Intermediaries use codes for caching. Error handling middleware checks codes to trigger retries or fallbacks.",
            "beginnerExample": "app.get('/api/data', (req, res) => res.json({ items: [] }));\napp.post('/api/users', (req, res) => {\n  res.status(201).location('/api/users/1').json(newUser);\n});\napp.delete('/api/users/:id', (req, res) => res.status(204).send());\napp.post('/api/validate', (req, res) => {\n  if (!req.body.name) return res.status(400).json({ error: 'Name required' });\n});\napp.get('/api/admin', (req, res) => {\n  if (!req.headers.authorization) return res.status(401).json({ error: 'Auth required' });\n});\napp.get('/api/admin/super', (req, res) => {\n  return res.status(403).json({ error: 'Insufficient permissions' });\n});\napp.use((err, req, res, next) => {\n  console.error(err);\n  res.status(500).json({ error: 'Internal error' });\n});",
            "commonMistakes": "Returning 200 for all successes (should use 201 for creates, 204 for deletes). Returning 500 for client errors. Not including error messages for 4xx. Returning 200 for redirect scenarios. Using 403 when should be 401.",
            "bestPractices": "Use the most specific appropriate status code. Include descriptive error messages for 4xx/5xx. Never include body with 204 or 304. Use 202 for async operations. Use 409 for resource conflicts. Use 429 for rate limiting. Log 5xx with full stack traces.",
            "interviewPerspective": "FAANG interviews may ask you to design an API and specify status codes. Distinguish between 401 (no auth) and 403 (auth but not authorized). 422 Unprocessable Entity for semantic validation errors. 409 for optimistic locking conflicts. Know the difference between 301 (permanent, changes to GET) and 308 (permanent, preserves method). 429 with Retry-After header for rate limiting.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-status-1",
              "question": "What status code should a successful POST that creates a resource return?",
              "options": [
                "201 Created",
                "200 OK",
                "204 No Content",
                "202 Accepted"
              ],
              "correctIndex": 0,
              "explanation": "201 Created is correct for successful resource creation. Include Location header pointing to the new resource URL.",
              "difficulty": "easy"
            },
            {
              "id": "be-status-2",
              "question": "What is the difference between 401 and 403?",
              "options": [
                "401: no authentication. 403: authenticated but lacks permission.",
                "401: permission denied. 403: not logged in.",
                "401: server error. 403: client error.",
                "401: temporary. 403: permanent."
              ],
              "correctIndex": 0,
              "explanation": "401 indicates not authenticated. 403 indicates authenticated but not authorized. 403 should never be returned for unauthenticated requests.",
              "difficulty": "medium"
            },
            {
              "id": "be-status-3",
              "question": "What status code should a DELETE endpoint return on success without body?",
              "options": [
                "204 No Content",
                "200 OK",
                "202 Accepted",
                "404 Not Found"
              ],
              "correctIndex": 0,
              "explanation": "204 No Content is standard for successful DELETE. The resource is gone, so no content to return.",
              "difficulty": "medium"
            },
            {
              "id": "be-status-4",
              "question": "Which status code range indicates client errors?",
              "options": [
                "4xx",
                "2xx",
                "3xx",
                "5xx"
              ],
              "correctIndex": 0,
              "explanation": "4xx status codes (400-499) indicate client errors - malformed, unauthorized, not found, etc.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design API status codes for a file upload service.",
              "answer": "Upload success (new): 201 Created. Overwrite: 200 OK. Partial upload (resumable): 308 Resume Incomplete with Range header. Invalid file type: 400 Bad Request. File too large: 413 Payload Too Large. Storage full: 507 Insufficient Storage. Concurrent edit conflict: 409 Conflict with ETag/If-Match. Auth required: 401. Quota exceeded: 403. Malformed multipart: 400. Server error: 500. Async virus scanning: 202 Accepted. Ranged download: 206 Partial Content.",
              "difficulty": "hard",
              "company": "Dropbox"
            },
            {
              "question": "When to use 202 Accepted vs 200 OK vs 201 Created?",
              "answer": "200 OK: Synchronous success with body. Example: GET /users returns list. 201 Created: Resource created synchronously. Include Location header. Example: POST /users creates user. 202 Accepted: Request accepted but not complete (async). Client polls status endpoint or uses webhooks. Example: POST /reports/generate returns tracking ID. AWS APIs use 202 for EC2 instance operations.",
              "difficulty": "hard",
              "company": "AWS"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "http-headers",
          "title": "Headers (Authorization, Content-Type, Cookies)",
          "order": 3,
          "content": {
            "overview": "HTTP headers allow client and server to pass additional information with requests and responses. They control caching, authentication, content negotiation, connection management, CORS, security, and session state.",
            "problemStatement": "The basic HTTP request (method + URL + body) lacks metadata for modern web apps. Headers provide authentication tokens, content format negotiation, caching directives, cross-origin policies, and session management without modifying the body.",
            "intuitionFirst": "Headers are like the envelope of a letter - containing routing info, handling instructions (Fragile, Certified), and classification. The actual letter (body) is what you want to communicate.",
            "realLifeAnalogy": "Shipping a package: address label is URL, shipping method is Cache-Control, signature confirmation is Authorization, declared contents form is Content-Type, customs form is Cookie headers.",
            "howItWorks": "Headers are key-value pairs after the request/status line and before the body. They control: caching (Cache-Control, ETag), authentication (Authorization), content negotiation (Accept, Content-Type), CORS (Access-Control-*), security (Strict-Transport-Security, CSP), cookies (Set-Cookie, Cookie).",
            "beginnerExample": "// Reading and setting headers\napp.get('/api/headers', (req, res) => {\n  const auth = req.headers.authorization;\n  const ct = req.headers['content-type'];\n  res.set({\n    'X-Request-Id': req.headers['x-request-id'],\n    'Cache-Control': 'private, max-age=3600',\n    'Content-Type': 'application/json',\n  });\n  res.json({ auth, ct });\n});\n\n// Bearer token parsing\napp.get('/api/protected', (req, res) => {\n  const auth = req.headers.authorization;\n  if (!auth?.startsWith('Bearer ')) return res.status(401).json({ error: 'No token' });\n  const token = auth.split(' ')[1];\n  // verify...\n});\n\n// Setting cookies\napp.get('/api/login', (req, res) => {\n  res.cookie('sessionId', 'abc123', {\n    httpOnly: true, secure: true, sameSite: 'strict', maxAge: 86400000\n  });\n  res.json({ message: 'Cookie set' });\n});",
            "commonMistakes": "Setting CORS headers too permissively (Access-Control-Allow-Origin: * with credentials). Exposing internal server info in headers (X-Powered-By). Sending sensitive data in custom headers without TLS. Not setting Secure flag on cookies in production.",
            "bestPractices": "Use standard headers over custom ones. Validate Content-Type before parsing body. Set proper Cache-Control directives. Use HSTS, CSP, X-Frame-Options security headers. Mark session cookies HttpOnly and Secure. Use SameSite=Strict. Set CORS headers restrictively. Add X-Request-Id for distributed tracing.",
            "interviewPerspective": "FAANG engineers must understand headers deeply. Know Authorization vs WWW-Authenticate. Content-Type vs Accept. Set-Cookie attributes (Domain, Path, Secure, HttpOnly, SameSite). CORS preflight (OPTIONS with Access-Control-Request-Headers). Cache-Control directives (public, private, no-cache, no-store). ETag (strong vs weak), Last-Modified, Vary.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-headers-1",
              "question": "What is the purpose of the Content-Type header?",
              "options": [
                "It tells the server the format of the request body",
                "It tells the server what format the response should be in",
                "It authenticates the client",
                "It specifies the desired language"
              ],
              "correctIndex": 0,
              "explanation": "Content-Type indicates the media type of the request body. The server uses this to correctly parse the body.",
              "difficulty": "easy"
            },
            {
              "id": "be-headers-2",
              "question": "What does the HttpOnly flag on a cookie do?",
              "options": [
                "Prevents client-side JavaScript from accessing the cookie",
                "Ensures the cookie is only sent over HTTPS",
                "Prevents cross-site request sending",
                "Limits the cookie to a specific path"
              ],
              "correctIndex": 0,
              "explanation": "HttpOnly prevents JavaScript's document.cookie from accessing the cookie, mitigating XSS-based session theft.",
              "difficulty": "medium"
            },
            {
              "id": "be-headers-3",
              "question": "What is the purpose of the Vary header?",
              "options": [
                "Tells caches the response may differ based on request headers",
                "Specifies alternative URLs for the resource",
                "Varies content based on user preferences",
                "Indicates response varies by time"
              ],
              "correctIndex": 0,
              "explanation": "Vary instructs caches to store multiple response versions keyed by request header values. Example: Vary: Accept-Encoding.",
              "difficulty": "hard"
            }
          ],
          "faangQuestions": [
            {
              "question": "How do CORS headers work? Explain preflight requests.",
              "answer": "CORS relaxes same-origin policy. Simple requests (GET/POST/HEAD with simple content types) are sent directly; browser checks Access-Control-Allow-Origin. Preflight: For non-simple requests (PUT, PATCH, DELETE, custom headers, application/json), browser sends OPTIONS with Access-Control-Request-Method and Access-Control-Request-Headers. Server responds with Access-Control-Allow-Origin, Allow-Methods, Allow-Headers, Max-Age. Never use Access-Control-Allow-Origin: * with credentials. At FAANG scale, CORS is handled at API gateway or CDN layer.",
              "difficulty": "hard",
              "company": "Mozilla"
            },
            {
              "question": "Explain session cookies vs JWT tokens. How do Set-Cookie and Authorization headers relate?",
              "answer": "Session cookies: Server creates session, sends session ID via Set-Cookie. Client sends Cookie header. Server looks up session from store (Redis). JWT: Client receives signed token, sends via Authorization: Bearer. Server verifies signature without session lookup. Session cookies: easier to revoke, requires session store. JWT: stateless, scales horizontally, harder to revoke. Best practice: short-lived access tokens (15 min) in Authorization header + long-lived refresh token in HttpOnly Secure SameSite cookie.",
              "difficulty": "hard",
              "company": "Google"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "stateless-protocol",
          "title": "Stateless Protocol",
          "order": 4,
          "content": {
            "overview": "HTTP is a stateless protocol - each request is independent and the server does not retain information between requests. This design simplifies servers and enables horizontal scaling, but requires mechanisms (cookies, tokens, sessions) for stateful applications.",
            "problemStatement": "Stateful servers track client state between requests, making horizontal scaling difficult (requests from the same client must go to the same server). Stateless protocols allow any server to handle any request.",
            "intuitionFirst": "A stateless transaction is like buying coffee from a different barista each time - you must tell them your order from scratch. A stateful interaction is like a regular barista who knows your order - convenient but only that barista works.",
            "realLifeAnalogy": "Stateless: each visit to a different doctor. You explain symptoms each time. Stateful: your family doctor who knows your history. Stateless lets you see any available doctor but requires carrying your medical records (tokens) each visit.",
            "howItWorks": "HTTP servers do not associate requests from the same client. To create stateful experiences, the client sends state with each request via cookies (session ID), authorization headers (JWT tokens), or URL parameters. The server validates this state on each request.",
            "beginnerExample": "// Stateless: JWT approach\nconst jwt = require('jsonwebtoken');\napp.post('/api/login', (req, res) => {\n  const token = jwt.sign({ id: 1, role: 'user' }, 'secret', { expiresIn: '1h' });\n  res.json({ token });\n});\napp.get('/api/profile', (req, res) => {\n  const token = req.headers.authorization?.split(' ')[1];\n  const decoded = jwt.verify(token, 'secret');\n  res.json({ user: decoded }); // no server-side lookup!\n});\n\n// Stateful: sessions\nconst session = require('express-session');\napp.use(session({ secret: 'key', resave: false, saveUninitialized: true }));\napp.get('/api/visit', (req, res) => {\n  req.session.visits = (req.session.visits || 0) + 1;\n  res.json({ visits: req.session.visits });\n});",
            "commonMistakes": "Assuming server-side state between requests. Building server logic that depends on request sequence. Relying on client IP for state identification. Scaling servers without shared session store when using sessions.",
            "bestPractices": "Design APIs to be stateless - include all context in each request. Use JWT for stateless authentication. If using sessions, use shared store (Redis). Never use in-memory sessions in production. Use idempotency keys for writes.",
            "interviewPerspective": "Statelessness is a core REST constraint. Stateless servers scale horizontally (any server handles any request). State goes to client (tokens) or shared stores (Redis). Understand the tradeoff: stateless increases request size but eliminates server affinity. GraphQL is typically stateless. Stripe's API is fully stateless with idempotency keys.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-stateless-1",
              "question": "What does HTTP statelessness mean?",
              "options": [
                "Each request is independent; server does not retain information between requests",
                "Server shuts down after each request",
                "HTTP requests cannot contain state",
                "Clients cannot store local data"
              ],
              "correctIndex": 0,
              "explanation": "HTTP statelessness means each request-response pair is independent. Any state must be provided by the client with each request.",
              "difficulty": "easy"
            },
            {
              "id": "be-stateless-2",
              "question": "What is the main scalability advantage of stateless servers?",
              "options": [
                "Any server can handle any request, enabling easy horizontal scaling",
                "Stateless servers use less memory",
                "No load balancers needed",
                "Authentication is not required"
              ],
              "correctIndex": 0,
              "explanation": "Stateless servers scale horizontally because any instance can handle any request without sticky sessions.",
              "difficulty": "medium"
            },
            {
              "id": "be-stateless-3",
              "question": "Which mechanism enables stateless API authentication?",
              "options": [
                "JWT containing user claims verified by signature",
                "Server-side sessions in memory",
                "IP-based authentication",
                "HTTP Basic Authentication"
              ],
              "correctIndex": 0,
              "explanation": "JWT enables stateless authentication because the token contains all user info and can be verified by signature without server-side state.",
              "difficulty": "hard"
            },
            {
              "id": "be-stateless-4",
              "question": "How do you maintain session state across multiple server instances?",
              "options": [
                "Use a shared session store like Redis accessible by all instances",
                "Each instance maintains its own store",
                "Store session in database and look up each request",
                "Use URL parameters"
              ],
              "correctIndex": 0,
              "explanation": "For session-based state across scaled servers, use a shared external store (Redis) to ensure any instance can access any session.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "How does a stateless API handle authentication, rate limiting, and shopping carts?",
              "answer": "Authentication: JWT tokens in Authorization header. Short-lived access tokens + refresh tokens. Rate limiting: API keys/tokens as identifiers in distributed rate limiter (Redis sorted sets, sliding window). Shopping carts: Option 1: Client-side cart (localStorage, sent on checkout). Option 2: Server-side cart identified by token claims, stored in DB. Option 3: Token-based cart (small carts encoded in JWT). All state is either in the request or in an external store keyed by request data.",
              "difficulty": "hard",
              "company": "Amazon"
            },
            {
              "question": "Compare session-based vs token-based authentication for security, scalability, and UX.",
              "answer": "Security: Sessions easily revoked (delete from store). JWTs cannot be revoked until expiry (unless using blacklist). Sessions less prone to XSS with HttpOnly cookies. JWTs in localStorage vulnerable to XSS. Sessions vulnerable to CSRF (mitigated by SameSite). Scalability: Sessions require shared store or sticky sessions. JWTs fully stateless. UX: Sessions provide instant revocation. JWT requires short lifetimes or blacklists. Hybrid approach: short-lived access tokens (15 min) + long-lived refresh token in HttpOnly Secure SameSite cookie.",
              "difficulty": "expert",
              "company": "Uber"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "request-body-query-params-path-params",
          "title": "Request Body, Query Parameters, Path Parameters",
          "order": 5,
          "content": {
            "overview": "HTTP requests carry data through three mechanisms: path parameters (embedded in URL), query parameters (after ? in URL), and request body (in message payload). Each has distinct use cases, limitations, and best practices.",
            "problemStatement": "APIs need to receive data - resource identifiers, filter criteria, large payloads. Using a single mechanism for all data types causes problems: overly long URLs, broken URL structure, bodies sent where inappropriate.",
            "intuitionFirst": "Path parameters are like table numbers (identifies which table - /tables/5). Query parameters are like special requests (GET /menu?dietary=vegan). Request body is like the full order form (POST /orders with items).",
            "realLifeAnalogy": "At DMV: Path parameter = license number (/license/AB123). Query parameters = filters (/offices?city=Springfield&openToday=true). Request body = complete application form (POST /applications with personal details).",
            "howItWorks": "Path parameters are variable URL segments identifying specific resources (e.g., /users/:id). Query parameters appear after ? as key=value (page=1&limit=10), used for filtering, sorting, pagination. Request body is sent in the message payload with Content-Type and Content-Length headers.",
            "beginnerExample": "// Path params - resource identification\napp.get('/users/:userId', (req, res) => {\n  const id = req.params.userId;\n  res.json({ userId: id });\n});\napp.get('/users/:userId/orders/:orderId', (req, res) => {\n  res.json(req.params);\n});\n\n// Query params - filtering, pagination\napp.get('/users', (req, res) => {\n  const { role, page = 1, limit = 10 } = req.query;\n  res.json({ filters: { role }, page, limit });\n});\n\n// Request body - create/update\napp.post('/users', (req, res) => {\n  const { name, email } = req.body;\n  if (!name) return res.status(400).json({ error: 'Name required' });\n  res.status(201).json({ id: Date.now(), name, email });\n});\n\n// Combining all three\napp.put('/users/:userId', (req, res) => {\n  const userId = req.params.userId;\n  const notify = req.query.notify === 'true';\n  const updates = req.body;\n  res.json({ userId, notify, updates });\n});",
            "commonMistakes": "Sending passwords in query parameters (logged in server logs, cached). Using request body for GET requests (not universally supported). Putting sensitive data in URL path parameters. Not URL-encoding query parameter values.",
            "bestPractices": "Path params for resource identification. Query params for filtering, sorting, pagination. Request body for data payloads. Never put sensitive data in URL. Validate and sanitize all input. Set size limits on bodies. Use consistent naming conventions.",
            "interviewPerspective": "FAANG APIs are meticulously designed. Path parameters identify specific resources (nouns). Query parameters describe the request (filter, sort). Body contains resource representation. Google APIs use pattern: /v1/{resource}/{id}/{subresource}. Standard query params: pageSize, pageToken, filter, orderBy. GraphQL solves over-fetching/under-fetching issues.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-request-1",
              "question": "What is the primary use case for URL path parameters?",
              "options": [
                "Identifying a specific resource (e.g., /users/42)",
                "Filtering and sorting results",
                "Sending large data payloads",
                "Pagination metadata"
              ],
              "correctIndex": 0,
              "explanation": "Path parameters identify a specific resource or sub-resource as part of the URL path structure.",
              "difficulty": "easy"
            },
            {
              "id": "be-request-2",
              "question": "Why should sensitive data never be sent as query parameters?",
              "options": [
                "Query parameters are logged, cached by proxies, visible in browser history",
                "Query parameters have length limits",
                "Query parameters are encrypted but easier to intercept",
                "Query parameters cannot contain special characters"
              ],
              "correctIndex": 0,
              "explanation": "Query parameters appear in the URL, which is logged, cached, and stored in browser history. Sensitive data belongs in request bodies over HTTPS.",
              "difficulty": "medium"
            },
            {
              "id": "be-request-3",
              "question": "What is the recommended maximum URL length for broad compatibility?",
              "options": [
                "Around 2000 characters",
                "No limit",
                "255 characters",
                "65536 characters"
              ],
              "correctIndex": 0,
              "explanation": "Internet Explorer limits URLs to 2083 characters. For compatibility, keep URLs under 2000 characters. Large data goes in the body.",
              "difficulty": "medium"
            },
            {
              "id": "be-request-4",
              "question": "Which HTTP methods typically have a request body?",
              "options": [
                "POST, PUT, PATCH",
                "GET and DELETE",
                "All HTTP methods",
                "Only POST"
              ],
              "correctIndex": 0,
              "explanation": "POST, PUT, and PATCH typically include a request body with data to create or update resources.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design API endpoints for a blogging platform with path params, query params, and bodies.",
              "answer": "Base: /api/v1. GET /posts?page=1&limit=20&sort=-publishedAt&authorId=5&tags=js&search=keyword (query for filter/pagination/search). POST /posts with body {title, content, tags}. GET /posts/:postId. PUT /posts/:postId (full). PATCH /posts/:postId (partial). DELETE /posts/:postId. GET /posts/:postId/comments?page=1 (sub-resource). POST /posts/:postId/comments with {body}. GET /users/:userId. GET /search?q=query&type=posts. POST /uploads multipart/form-data. Path params for identity. Query for filter/sort. Body for data payloads.",
              "difficulty": "hard",
              "company": "Medium"
            },
            {
              "question": "Compare REST and GraphQL for data requests. Path params, query params, and bodies difference.",
              "answer": "REST: Resources via path params. Filtering via query params. Mutations via POST/PUT/PATCH with body. Multiple round trips for related data. Over/under-fetching common. GraphQL: Single endpoint POST /graphql. No path params. Query body specifies exact fields. Body contains {query: \"{ user(id: 1) { name, posts { title } } }\"}. No over/under-fetching. Single round trip. Tradeoffs: REST easier to cache (URL-based). GraphQL queries can be expensive. Hybrid: REST for simple CRUD, GraphQL for complex data requirements.",
              "difficulty": "hard",
              "company": "GitHub"
            }
          ],
          "codingChallenges": []
        }
      ]
    },
    {
      "slug": "nodejs",
      "title": "Node.js",
      "description": "Master Node.js internals - event loop, streams, buffers, async patterns, and non-blocking I/O",
      "order": 3,
      "subtopics": [
        {
          "slug": "event-loop",
          "title": "Event Loop",
          "order": 1,
          "content": {
            "overview": "The event loop is the core of Node.js's asynchronous, non-blocking architecture. It enables Node.js to perform non-blocking I/O operations despite JavaScript being single-threaded, by offloading operations to the system kernel and processing callbacks when operations complete.",
            "problemStatement": "Traditional web servers create a thread per connection, consuming significant memory (2MB+ per thread). For thousands of concurrent connections this becomes impractical. Node.js solves this with a single-threaded event loop that handles all connections asynchronously.",
            "intuitionFirst": "Imagine you're a chef in a busy kitchen. Instead of cooking one meal start-to-finish while others wait (blocking), you start multiple dishes: put rice on the stove (async I/O), chop vegetables while rice cooks (do other work), when rice timer rings (callback), you return to finish it.",
            "realLifeAnalogy": "The event loop is like a busy restaurant waiter. One waiter takes orders at multiple tables. They don't stand at one table waiting for food to cook (blocking). They take an order, send it to the kitchen (async I/O), serve other tables while waiting, and when food is ready (callback), they pick it up and deliver it.",
            "howItWorks": "The event loop runs in phases: 1. Timers: executes setTimeout/setInterval callbacks whose threshold elapsed. 2. Pending callbacks: I/O callbacks deferred to next iteration. 3. Idle/Prepare: internal. 4. Poll: retrieves new I/O events, executes I/O callbacks. 5. Check: executes setImmediate callbacks. 6. Close callbacks: close event callbacks. process.nextTick interrupts the current phase and runs after current operation but before the next phase.",
            "beginnerExample": "console.log('1. Start');\nsetTimeout(() => console.log('2. setTimeout'), 0);\nsetImmediate(() => console.log('3. setImmediate'));\nprocess.nextTick(() => console.log('4. nextTick'));\nPromise.resolve().then(() => console.log('5. Promise'));\nconsole.log('6. End');\n// Output: 1, 6, 4, 5, 2 or 3 (timer depends), ...",
            "commonMistakes": "Blocking event loop with sync CPU operations. Not understanding setTimeout(fn,0) does not run immediately (min 1ms delay). Assuming setImmediate always runs before setTimeout. Creating recursive nextTick chains causing I/O starvation.",
            "bestPractices": "Avoid synchronous blocking operations. Use worker_threads for CPU-intensive tasks. Use setImmediate for breaking up long tasks. Prefer setImmediate over setTimeout(fn,0) for next-turn execution. Use streams for large data. Monitor event loop lag in production.",
            "interviewPerspective": "The event loop is the most important Node.js interview topic at FAANG. You must understand: (1) Six phases and what each does. (2) process.nextTick vs setImmediate vs setTimeout execution order. (3) Poll phase behavior when queue empty. (4) Microtasks (Promise.then, async/await) processed between phases. (5) Timer resolution (1ms minimum, batching). (6) How to identify and fix event loop blocking. (7) libuv's role and cross-platform implementation.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities.",
            "visualExplanation": "Node.js Event Loop Phases:\n\n   â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”\nâ”Œâ”€>â”‚           timers          â”‚\nâ”‚  â”‚  (setTimeout, setInterval) â”‚\nâ”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜\nâ”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”\nâ”‚  â”‚     pending callbacks     â”‚\nâ”‚  â”‚  (I/O callbacks deferred) â”‚\nâ”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜\nâ”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”\nâ”‚  â”‚       idle, prepare       â”‚\nâ”‚  â”‚    (internal use only)    â”‚\nâ”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜\nâ”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”\nâ”‚  â”‚           poll            â”‚\nâ”‚  â”‚  (new I/O events, timers) â”‚\nâ”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜\nâ”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”\nâ”‚  â”‚           check           â”‚\nâ”‚  â”‚    (setImmediate)         â”‚\nâ”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜\nâ”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”\nâ””â”€â”€â”¤      close callbacks      â”‚\n   â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜"
          },
          "quiz": [
            {
              "id": "be-eventloop-1",
              "question": "How many phases does the Node.js event loop have?",
              "options": [
                "6 (timers, pending, idle/prepare, poll, check, close)",
                "4 (timers, I/O, idle, check)",
                "7 (timers, I/O, nextTick, microtasks, poll, check, close)",
                "5 (timers, poll, check, close, exit)"
              ],
              "correctIndex": 0,
              "explanation": "The event loop has 6 phases. process.nextTick and Promise microtasks are processed between each phase.",
              "difficulty": "medium"
            },
            {
              "id": "be-eventloop-2",
              "question": "What runs first: process.nextTick or Promise microtasks?",
              "options": [
                "process.nextTick runs before Promise microtasks",
                "Promise microtasks run before process.nextTick",
                "Same queue, order of registration",
                "setImmediate runs before both"
              ],
              "correctIndex": 0,
              "explanation": "process.nextTick has higher priority than Promise microtasks. The nextTick queue is drained before the microtask queue after each phase.",
              "difficulty": "hard"
            },
            {
              "id": "be-eventloop-3",
              "question": "What happens in the poll phase?",
              "options": [
                "Executes I/O callbacks and handles new incoming connections",
                "Runs setTimeout callbacks",
                "Runs setImmediate callbacks",
                "Closes socket connections"
              ],
              "correctIndex": 0,
              "explanation": "The poll phase executes I/O callbacks and handles new connections. If queue empty, it checks for timers and either waits or proceeds.",
              "difficulty": "medium"
            },
            {
              "id": "be-eventloop-4",
              "question": "Why should CPU-intensive operations be avoided in the main thread?",
              "options": [
                "They block the event loop, preventing other callbacks from executing",
                "They consume too much memory",
                "They cause syntax errors",
                "V8 engine doesn't support them"
              ],
              "correctIndex": 0,
              "explanation": "CPU-intensive operations block the single thread, preventing the event loop from processing callbacks - no new connections, no I/O, no timers.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "Explain the Node.js event loop in detail. How does libuv implement it across operating systems?",
              "answer": "libuv implements the event loop cross-platform. Linux: epoll, macOS: kQueue, Windows: IOCP. Six phases: (1) Timers - min-heap data structure. (2) Pending callbacks. (3) Idle/Prepare - internal libuv ops. (4) Poll - critical phase, calls epoll_wait to wait for I/O. Timeout = earliest timer minus now or 0 if setImmediate pending. (5) Check - setImmediate callbacks. (6) Close - close callbacks. After each phase: process.nextTick and Promise microtask queues drained. Thread pool (default 4) for operations OS doesn't support async (DNS, fs, crypto). async_hooks tracks async resources across the event loop.",
              "difficulty": "expert",
              "company": "Node.js Foundation"
            },
            {
              "question": "How would you diagnose and fix event loop blocking in production Node.js? What tools?",
              "answer": "Detection: (1) Monitor event loop lag (>40ms indicates problem). (2) --prof flag + --prof-process. (3) Clinic.js Doctor/Bubbleprof. (4) Chrome DevTools profiler via --inspect. (5) Log CPU-blocking stack traces. Common culprits: JSON.parse/stringify on large payloads, crypto operations synchronously, complex regex backtracking, large array iterations, template rendering. Fixes: (1) Break work into chunks with setImmediate(). (2) Use worker_threads. (3) Use streams instead of buffering. (4) Use async crypto (libuv thread pool). (5) Paginate DB queries. (6) Message queues for heavy processing.",
              "difficulty": "expert",
              "company": "Netflix"
            }
          ],
          "codingChallenges": [
            {
              "title": "Simulate the Event Loop with Phase Queues",
              "description": "Create a simplified event loop in JavaScript with timer queue, I/O queue, check queue, and microtask queue. Show how blocking CPU work affects callback scheduling.",
              "difficulty": "hard",
              "starterCode": "class EventLoopSimulator {\n  constructor() {\n    this.timerQueue = [];\n    this.ioQueue = [];\n    this.checkQueue = [];\n    this.nextTickQueue = [];\n    this.microtaskQueue = [];\n    this.running = false;\n    this.now = Date.now();\n  }\n  setTimeout(fn, ms) { this.timerQueue.push({ fn, fireAt: this.now + ms }); }\n  setImmediate(fn) { this.checkQueue.push(fn); }\n  nextTick(fn) { this.nextTickQueue.push(fn); }\n  run() { /* TODO: implement phases */ }\n}",
              "solutionHint": "Implement a while loop iterating through phases. Sort timers by fireAt, execute expired. Process nextTick queue fully, then microtask queue, then I/O, then check. Handle poll wait timeout calculation."
            }
          ]
        },
        {
          "slug": "streams",
          "title": "Streams",
          "order": 2,
          "content": {
            "overview": "Streams are Node.js's mechanism for handling data flow piece by piece, rather than buffering entire payloads into memory. They enable efficient processing of large data by processing data in chunks as it arrives.",
            "problemStatement": "Reading a 1GB file into memory consumes ~1GB RAM. Processing a video stream requires handling data as it arrives. Without streams, applications would crash under memory pressure or have poor latency.",
            "intuitionFirst": "Think of drinking water through a straw vs chugging an entire bottle. Streams are like sipping through a straw - you consume data gradually as it arrives. Buffering is like removing the straw and pouring the entire bottle down your throat at once.",
            "realLifeAnalogy": "Streams are like a conveyor belt at a factory. Items (data chunks) arrive one at a time. Each worker processes an item and passes it to the next. No one stores all items in a giant pile - they work on one piece at a time.",
            "howItWorks": "Readable streams emit 'data' events with chunks. Flowing vs paused modes. Writable streams accept via .write(), emit 'drain' when buffer empties. Transform streams implement _transform (process chunk) and _flush (final). .pipe() connects streams with automatic backpressure. pipeline() provides cleanup. Streams implement EventEmitter.",
            "beginnerExample": "const fs = require('fs');\nconst zlib = require('zlib');\nconst { Transform, pipeline } = require('stream');\n\n// Read stream\nconst readStream = fs.createReadStream('file.log', { highWaterMark: 65536 });\nreadStream.on('data', chunk => console.log('Chunk:', chunk.length));\n\n// Transform stream\nconst upperCase = new Transform({\n  transform(chunk, enc, cb) {\n    this.push(chunk.toString().toUpperCase());\n    cb();\n  }\n});\n\n// Pipeline - compress\npipeline(\n  fs.createReadStream('input.txt'),\n  zlib.createGzip(),\n  fs.createWriteStream('input.txt.gz'),\n  (err) => console.log(err || 'Done')\n);\n\n// HTTP streaming\nconst http = require('http');\nhttp.createServer((req, res) => {\n  req.pipe(upperCase).pipe(res);\n}).listen(3000);",
            "commonMistakes": "Not handling backpressure (memory growth). Not handling 'error' events (process crashes). Using .pipe() without error handling (use pipeline()). Not destroying streams (file descriptor leaks). Confusing 'finish' vs 'end' vs 'close' events.",
            "bestPractices": "Always use pipeline() instead of .pipe(). Handle backpressure or use .pipe() which does it automatically. Configure highWaterMark appropriately. Always handle 'error' events. Use Transform for data processing. Use finished() utility for completion detection.",
            "interviewPerspective": "Streams are a common FAANG Node.js topic. Key points: (1) Four types: Readable, Writable, Transform, Duplex. (2) Flowing vs paused modes. (3) Backpressure mechanism - .pipe() calls .pause() on source when dest buffer exceeds highWaterMark. Dest emits 'drain'. (4) internal buffering: readableFlowing, writableLength. (5) Why pipeline() > .pipe(). (6) Real use: processing large CSV row-by-row, video transcoding, log tailing.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities.",
            "visualExplanation": "Readable -> [Chunk1] -> [Chunk2] -> ... -> [End]\nWritable <- [Chunk1] <- [Chunk2] <- ...\nTransform: [Input] -> [_transform] -> [Output]\n\nBackpressure:\nSrc -> [full buffer] <- wait! <- Dest (slow)\nWhen dest buffer fills, backpressure pauses source."
          },
          "quiz": [
            {
              "id": "be-streams-1",
              "question": "What are the four stream types in Node.js?",
              "options": [
                "Readable, Writable, Transform, Duplex",
                "Input, Output, Pipe, Buffer",
                "Read, Write, Process, End",
                "Stream, Pipe, Buffer, File"
              ],
              "correctIndex": 0,
              "explanation": "The four types are: Readable (data source), Writable (data destination), Transform (modifies data), Duplex (both readable and writable).",
              "difficulty": "easy"
            },
            {
              "id": "be-streams-2",
              "question": "What is backpressure in streams?",
              "options": [
                "Slow consumer signals the producer to pause to prevent memory overflow",
                "Pressure applied to compress data",
                "Resistance in pipes",
                "A performance test"
              ],
              "correctIndex": 0,
              "explanation": "Backpressure occurs when a readable produces data faster than a writable can consume. The writable signals pause via internal buffer limits.",
              "difficulty": "medium"
            },
            {
              "id": "be-streams-3",
              "question": "Why use pipeline() instead of .pipe()?",
              "options": [
                "pipeline() properly handles errors and cleans up all streams in the chain",
                ".pipe() is deprecated",
                "pipeline() is faster",
                ".pipe() doesn't support transform streams"
              ],
              "correctIndex": 0,
              "explanation": "pipeline() provides automatic cleanup when any stream errors. .pipe() requires manual error handling and causes leaks.",
              "difficulty": "medium"
            },
            {
              "id": "be-streams-4",
              "question": "What does highWaterMark control on a stream?",
              "options": [
                "The internal buffer size before backpressure is applied",
                "The maximum file size",
                "The number of concurrent streams",
                "The memory limit for the process"
              ],
              "correctIndex": 0,
              "explanation": "highWaterMark determines the size of the internal buffer. When exceeded, backpressure is applied (writable returns false, readable is paused).",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "How do Node.js streams handle backpressure? Explain the drain event mechanism.",
              "answer": "When writable.write() returns false (internal buffer exceeds highWaterMark), the source should stop writing. When the buffer drains below highWaterMark, the writable emits 'drain'. The source resumes writing. In .pipe(), this is automatic: src.pipe(dest) listens for 'drain' on dest and calls src.resume(). If src is a readable in flowing mode, this mechanism prevents memory overflow. The internal buffer size is configurable via highWaterMark. For Transform streams, readableFlowing and writableLength properties track buffered data.",
              "difficulty": "hard",
              "company": "Netflix"
            },
            {
              "question": "Compare streaming vs buffered file processing for a 10GB CSV file.",
              "answer": "Buffered: fs.readFile loads entire 10GB into RAM - crashes with insufficient memory. Requires enormous memory allocation, GC pressure, blocks event loop during parsing. Streaming: fs.createReadStream reads configurable chunks (e.g., 64KB). Each chunk processed incrementally. Memory: ~64KB vs 10GB. Latency: first row available immediately vs waiting for full download. Backpressure: if downstream processing is slow, source pauses. Real-world use: CSV parsing (csv-parse stream transform), log aggregation, video transcoding, proxy servers. FAANG systems like Kafka and Flink are fundamentally stream processors.",
              "difficulty": "hard",
              "company": "Netflix"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "buffer",
          "title": "Buffer",
          "order": 3,
          "content": {
            "overview": "Buffer is a Node.js global object for handling binary data directly. It represents fixed-length sequences of bytes, used when dealing with streams, file I/O, network protocols, cryptography, and any data that isn't text.",
            "problemStatement": "JavaScript originally had no mechanism for handling binary data efficiently. The Buffer class was introduced to fill this gap, allowing Node.js to work with raw memory allocation, binary protocols, and performant data transformation.",
            "intuitionFirst": "Think of a Buffer as a pre-allocated tray of containers, each holding one byte (0-255). Unlike JavaScript arrays that can grow dynamically, Buffers have a fixed size and store raw bytes, making them very fast for binary operations.",
            "realLifeAnalogy": "A Buffer is like a pre-paid shipping box of fixed size. You know exactly how much space you have, you fill it with items (bytes), and when it's full, you send it (flush). You cannot add more items without getting another box.",
            "howItWorks": "Buffer.alloc(size) allocates a fixed-size memory block (zero-filled for security). Buffer.from(data) creates from arrays, strings, or other buffers. Buffers support reading/writing various numeric types at specific offsets: writeUInt32BE, readInt16LE, etc. toString(encoding) converts to string. slice() creates a view into the same memory. Buffers power all I/O in Node.js.",
            "beginnerExample": "const buf1 = Buffer.alloc(10); // 10 bytes, zero-filled\nconst buf2 = Buffer.from('Hello'); // <Buffer 48 65 6c 6c 6f>\nconst buf3 = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f]);\n\nconsole.log(buf2.toString()); // 'Hello'\nconsole.log(buf2[0]); // 72 (0x48)\n\n// Writing different types\nconst buf = Buffer.alloc(8);\nbuf.writeUInt32BE(0x12345678, 0); // Big-endian 32-bit integer\nbuf.writeUInt16LE(0xABCD, 4); // Little-endian 16-bit\nconsole.log(buf);\n\n// Slicing (no copy)\nconst slice = buf2.slice(0, 2); // <Buffer 48 65>\n\n// Encoding conversions\nconst utf8Buf = Buffer.from('Hello ä¸–ç•Œ', 'utf8');\nconsole.log(utf8Buf.toString('base64'));\nconsole.log(utf8Buf.toString('hex'));\n\n// Concatenation\nconst combined = Buffer.concat([buf2, Buffer.from(' World')]);\nconsole.log(combined.toString()); // 'Hello World'",
            "commonMistakes": "Assuming Buffer.toString() defaults to UTF-8 (it does, but binary data may become garbled). Not considering encoding when reading files (fs.readFile defaults to buffer if no encoding). Creating large buffers with unsafe methods (Buffer.allocUnsafe can leak sensitive data, needs zero-filling). Exceeding buffer size silently wraps values (writeUInt8(256) stores 0).",
            "bestPractices": "Use Buffer.alloc() over Buffer.allocUnsafe() for security unless performance-critical and immediately overwritten. Always specify encoding explicitly. Use Buffer.concat() for joining, not manual loops. Use poolSize to tune internal buffer pool. Prefer TypedArray (Uint8Array) for modern code when possible. Use slice() for views, not copy().",
            "interviewPerspective": "Buffer knowledge is essential for Node.js systems programming. Key topics: (1) Buffer vs TypedArray (Buffer extends Uint8Array). (2) Memory allocation: Buffer.alloc (safe, slower) vs Buffer.allocUnsafe (fast, may contain sensitive data). (3) Buffer pool for small allocations. (4) Encoding support: utf8, base64, hex, latin1, ascii. (5) Binary data handling when parsing network protocols. (6) Buffer.from vs Buffer.alloc. (7) Backward compatibility with the old new Buffer() constructor (deprecated).",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-buffer-1",
              "question": "What is a Node.js Buffer?",
              "options": [
                "A fixed-length sequence of bytes for handling binary data",
                "A temporary storage for HTTP requests",
                "A JavaScript array with special methods",
                "A queue for asynchronous operations"
              ],
              "correctIndex": 0,
              "explanation": "A Buffer is a fixed-length sequence of bytes in memory, used for working with binary data from streams, files, and network.",
              "difficulty": "easy"
            },
            {
              "id": "be-buffer-2",
              "question": "What is the difference between Buffer.alloc() and Buffer.allocUnsafe()?",
              "options": [
                "alloc() zero-fills memory (safe), allocUnsafe() may contain old data (faster but unsafe)",
                "alloc() is faster, allocUnsafe() is safer",
                "alloc() creates from string, allocUnsafe() from array",
                "There is no difference"
              ],
              "correctIndex": 0,
              "explanation": "Buffer.alloc() zero-fills memory, protecting against leaking sensitive data. Buffer.allocUnsafe() is faster but may contain old process memory.",
              "difficulty": "medium"
            },
            {
              "id": "be-buffer-3",
              "question": "What happens when you write a value larger than a byte's capacity in Buffer.writeUInt8(256)?",
              "options": [
                "The value wraps around: 256 becomes 0",
                "An error is thrown",
                "The buffer grows automatically",
                "The value is truncated to 255"
              ],
              "correctIndex": 0,
              "explanation": "Values that exceed the byte range (0-255) are silently masked: (value & 0xFF). 256 becomes 0, 257 becomes 1, etc.",
              "difficulty": "hard"
            }
          ],
          "faangQuestions": [
            {
              "question": "Explain how Node.js Buffer memory allocation works internally. What is the Buffer pool?",
              "answer": "Node.js uses a buffer pool (8192 bytes by default, configurable via buffer.constants.MAX_LENGTH). Small Buffer allocations (< poolSize / 2) come from the shared pool using slab allocation. Each slab is a pre-allocated Buffer. When a slab is full, a new one is created. Large allocations (> poolSize / 2) go directly to separate memory via alloc.allocUnsafe uses mmap (Unix) or VirtualAlloc (Windows). The pool improves performance for small allocations by reducing system calls. Buffer extends Uint8Array, inheriting from TypedArray prototype. Internal memory management uses v8's ArrayBuffer allocator.",
              "difficulty": "hard",
              "company": "Node.js Foundation"
            },
            {
              "question": "Compare Buffer, TypedArray (Uint8Array), and DataView for binary data processing in Node.js.",
              "answer": "Buffer: Node.js-specific, extends Uint8Array, adds encoding methods (toString, write, JSON), pool allocation, legacy API. Good for network/socket/stream I/O. TypedArray (Uint8Array): ES6 standard, works across browsers and Node. Supports typed views (Int32Array, Float64Array) over the same ArrayBuffer. DataView: Fine-grained control over endianness, reads/writes at specific byte offsets. Use cases: Buffer for Node.js I/O; Uint8Array for cross-platform code; DataView for parsing binary file formats (PNG, WAV, ZIP) that mix endianness. Performance: Buffer and TypedArray have similar performance; DataView is slightly slower due to bounds checking.",
              "difficulty": "hard",
              "company": "Google"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "single-thread-non-blocking-io",
          "title": "Single Thread, Non-Blocking I/O",
          "order": 4,
          "content": {
            "overview": "Node.js operates on a single thread using an event-driven, non-blocking I/O model. This allows handling thousands of concurrent connections with minimal overhead, but requires understanding the implications for CPU-bound operations.",
            "problemStatement": "Thread-per-connection models consume significant memory and context-switch overhead. A single-threaded event loop eliminates these costs but introduces the challenge of blocking - one long operation can halt all processing.",
            "intuitionFirst": "Single-threaded non-blocking is like a juggler keeping multiple balls in the air. Instead of handling one ball completely before moving to the next (blocking), they toss each ball briefly and move to the next, keeping everything moving continuously.",
            "realLifeAnalogy": "A single cashier at a grocery store who starts bagging one customer's items (I/O), then while waiting for the customer to pay (I/O wait), helps the next customer start scanning (do other work). This is more efficient than one cashier per customer (thread-per-connection).",
            "howItWorks": "JavaScript runs on a single thread with a call stack and an event loop. Synchronous code executes on the call stack. Asynchronous operations (I/O, timers, network) are handed to libuv, which uses OS async interfaces (epoll, kqueue, IOCP) or a thread pool. When async operations complete, callbacks are queued in the event loop, executing when the call stack is empty.",
            "beginnerExample": "const fs = require('fs');\n\n// Blocking (BAD)\nconst data = fs.readFileSync('large.txt');\nconsole.log('Blocking: done');\n\n// Non-blocking (GOOD)\nfs.readFile('large.txt', (err, data) => {\n  console.log('Non-blocking: done');\n});\n\nconsole.log('This runs before the file is read!');\n\n// Simulating block the event loop\nfunction blockEventLoop(ms) {\n  const start = Date.now();\n  while (Date.now() - start < ms) {\n    // Busy wait - blocks everything!\n  }\n}\n\n// This blocks all other operations\nblockEventLoop(3000); // No timers, I/O, or callbacks run for 3 seconds",
            "commonMistakes": "Using sync versions of fs methods in server request handlers (blocks all clients). Performing CPU-heavy operations (image processing, PDF generation, JSON parse of large payloads) in the main thread. Not understanding that async doesn't mean parallel - I/O is concurrent, CPU is not.",
            "bestPractices": "Always use async I/O methods (fs.promises, stream.pipeline). Offload CPU-intensive work to worker_threads or child_process. Use clustering for multi-core CPU utilization. Use async/await for readable code. Implement request timeouts to prevent hanging connections. Monitor event loop lag.",
            "interviewPerspective": "Single-thread non-blocking I/O is the defining characteristic of Node.js. Key interview topics: (1) JavaScript is single-threaded, but Node.js is not - libuv's thread pool makes I/O concurrent. (2) The event loop enables concurrency without parallelism. (3) CPU-bound tasks block the event loop - use worker_threads (Node.js 10+). (4) Cluster module for multi-core servers. (5) process.on('warning') for event loop lag detection. (6) Understand that async/await doesn't move execution to another thread - it's just syntactic sugar over promises. (7) Real concurrency vs parallelism - Node.js excels at I/O concurrency, not CPU parallelism.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-singlethread-1",
              "question": "Node.js is single-threaded. How does it handle concurrent requests?",
              "options": [
                "The event loop processes asynchronous I/O concurrently by utilizing the OS kernel's async interfaces and libuv's thread pool",
                "It creates a new thread per request",
                "It uses Web Workers",
                "It processes requests one at a time"
              ],
              "correctIndex": 0,
              "explanation": "Node.js uses an event loop with libuv to handle async I/O. The OS handles I/O concurrently, and callbacks are processed when I/O completes.",
              "difficulty": "easy"
            },
            {
              "id": "be-singlethread-2",
              "question": "What happens if a CPU-intensive synchronous operation runs in Node.js?",
              "options": [
                "The event loop is blocked until the operation completes, preventing all other callbacks from executing",
                "It runs on a separate thread automatically",
                "It throws a timeout error",
                "Node.js spawns a worker process"
              ],
              "correctIndex": 0,
              "explanation": "CPU-intensive sync operations block the single thread, preventing the event loop from processing any callbacks until the operation finishes.",
              "difficulty": "medium"
            },
            {
              "id": "be-singlethread-3",
              "question": "What should you do for CPU-intensive operations in Node.js?",
              "options": [
                "Offload to worker_threads or child_process",
                "They're fine, Node.js handles it",
                "Use promise-based APIs",
                "Increase the thread pool size"
              ],
              "correctIndex": 0,
              "explanation": "CPU-intensive operations should be offloaded to worker_threads (for parallel processing) or child_process to avoid blocking the event loop.",
              "difficulty": "hard"
            },
            {
              "id": "be-singlethread-4",
              "question": "Does async/await in Node.js create a new thread?",
              "options": [
                "No, async/await is syntactic sugar over promises and runs on the main thread",
                "Yes, each async function runs on a separate thread",
                "Only if using Promise.all",
                "Only if the function does I/O"
              ],
              "correctIndex": 0,
              "explanation": "async/await does not create threads. It's syntactic sugar for promise chains, all running on the main event loop thread.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Compare Node.js single-threaded event loop with multi-threaded server models (Apache, Java). When would you choose each?",
              "answer": "Node.js: single-threaded + event loop. Best for: I/O-heavy apps (APIs, real-time services, proxies, chat apps). Handles 10K+ concurrent connections with low memory. Poor for: CPU-heavy workloads. Apache/Java: thread-per-connection or thread pool. Each thread has stack (1-2MB), limiting concurrency to thousands. Thread overhead increases memory and context switching. Better for: CPU-heavy apps, long-running computations, applications needing thread-level parallelism. Modern Java (NIO, virtual threads in Project Loom) bridges the gap. FAANG pattern: Node.js for API gateways and BFFs; Java/C++ for backend services needing heavy computation. Twitter moved from Ruby (single-threaded) to JVM for scalability. PayPal reported 2x throughput with Node.js vs Java for their API.",
              "difficulty": "expert",
              "company": "Netflix"
            },
            {
              "question": "How does libuv implement non-blocking I/O across different operating systems?",
              "answer": "libuv provides a cross-platform abstraction for async I/O. Linux: uses epoll (edge-triggered) for file descriptors, inotify for file changes. macOS/BSD: kqueue. Windows: IOCP (I/O Completion Ports) for sockets and files. SunOS: event ports. For operations without native async support (some file operations, DNS, userland modules), libuv uses a thread pool (default 4 threads, configurable via UV_THREADPOOL_SIZE). The event loop's poll phase calls the platform-specific I/O watcher (epoll_wait, kevent, GetQueuedCompletionStatus) with a timeout computed from the nearest timer. This architecture allows Node.js to handle 1000s of concurrent connections without thread-per-connection overhead.",
              "difficulty": "expert",
              "company": "Node.js Foundation"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "callbacks-promises-async-await",
          "title": "Callbacks, Promises, Async/Await",
          "order": 5,
          "content": {
            "overview": "Node.js evolved through three async patterns: callbacks (error-first), Promises (chainable, composable), and async/await (synchronous-looking code). Each pattern builds on the previous, adding readability and error handling improvements.",
            "problemStatement": "JavaScript is single-threaded, so blocking operations would freeze the application. Asynchronous patterns allow waiting for I/O, timers, and other operations without blocking. Early callbacks led to deeply nested code (callback hell), making error handling and composition difficult.",
            "intuitionFirst": "Think of ordering coffee. Callbacks are like giving the barista your name and waiting for them to call it. Promises are like taking a buzzer that will vibrate when ready - you hold onto it. Async/await is like having an assistant who waits for the coffee and brings it to you while you do other work.",
            "realLifeAnalogy": "Callbacks: You ask a friend to pick up dry cleaning and give them your phone number. They call when done. You must handle the call when it comes. Promises: You give them a prepaid phone that will ring once. You can pass the phone to someone else. Async/await: You ask your assistant to handle the dry cleaning. You say 'await assistant.getDryCleaner()' and the assistant handles the waiting.",
            "howItWorks": "Callbacks follow the error-first convention: function(err, result). If err is truthy, error occurred. Promises represent eventual completion with .then(success, error) chaining. async/await is syntactic sugar over Promises - async functions return a Promise; await pauses execution until the Promise settles.",
            "beginnerExample": "const fs = require('fs').promises;\n\n// Callback style\nfs.readFile('file.txt', 'utf8', (err, data) => {\n  if (err) {\n    console.error('Error:', err);\n    return;\n  }\n  console.log('Callback:', data);\n});\n\n// Promise style\nfs.readFile('file.txt', 'utf8')\n  .then(data => {\n    console.log('Promise:', data);\n    return fs.writeFile('copy.txt', data);\n  })\n  .then(() => console.log('Copied!'))\n  .catch(err => console.error('Error:', err));\n\n// Async/await style\nasync function processFile() {\n  try {\n    const data = await fs.readFile('file.txt', 'utf8');\n    await fs.writeFile('copy.txt', data);\n    console.log('Async/await: Done');\n  } catch (err) {\n    console.error('Error:', err);\n  }\n}\nprocessFile();\n\n// Promise utilities\nconst results = await Promise.all([\n  fs.readFile('a.txt', 'utf8'),\n  fs.readFile('b.txt', 'utf8'),\n]);\nconsole.log('All files:', results);\n\nconst first = await Promise.race([\n  fs.readFile('fast.txt', 'utf8'),\n  fs.readFile('slow.txt', 'utf8'),\n]);\nconsole.log('First to complete:', first);",
            "commonMistakes": "Not handling errors in callbacks (ignoring err argument). Creating callback hell (deep nesting). Forgetting to return from promise chains. Not using .catch() for Promise rejections (unhandled rejection crashes Node). Mixing callbacks and promises without promisifying. Using async/await without try/catch for error handling.",
            "bestPractices": "Prefer async/await for readability and error handling. Use util.promisify to convert callback APIs to promises. Always handle Promise rejections (use .catch() or try/catch). Use Promise.all for parallel independent operations. Avoid combining callbacks and promises in the same code path. Use the error-first callback pattern for library APIs.",
            "interviewPerspective": "FAANG interviews test understanding of asynchronous JavaScript deeply. Key questions: (1) Explain the difference between microtasks and macrotasks. (2) How does the event loop process async/await vs Promises vs callbacks? (3) What happens when a Promise rejects without a catch handler? (4) How does Promise.all vs Promise.allSettled vs Promise.race differ? (5) Error handling patterns in async/await. (6) How to convert callback-based code to async/await. (7) Promise constructor antipattern (wrapping an existing promise).",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-async-1",
              "question": "What is the error-first callback convention in Node.js?",
              "options": [
                "The first argument to the callback is an error object (null if success), the rest are results",
                "Errors are thrown as exceptions",
                "The callback returns error as its result",
                "Errors are passed as the second argument"
              ],
              "correctIndex": 0,
              "explanation": "Node.js uses error-first callbacks: function(err, result). If err is truthy, an error occurred. If null, the operation succeeded and results follow.",
              "difficulty": "easy"
            },
            {
              "id": "be-async-2",
              "question": "What happens when a Promise rejection is not handled?",
              "options": [
                "Unhandled rejections cause warnings and terminate the process in future Node.js versions",
                "The rejection is silently ignored",
                "The promise is automatically retried",
                "An error event is emitted on the process object"
              ],
              "correctIndex": 0,
              "explanation": "Unhandled Promise rejections generate warnings. Since Node.js 15, unhandled rejections terminate the process with a non-zero exit code.",
              "difficulty": "medium"
            },
            {
              "id": "be-async-3",
              "question": "What is the difference between Promise.all and Promise.allSettled?",
              "options": [
                "Promise.all rejects immediately if any promise rejects; Promise.allSettled waits for all to settle regardless of outcome",
                "Promise.all runs sequentially; Promise.allSettled runs in parallel",
                "Promise.allSettled rejects on first error",
                "They are identical"
              ],
              "correctIndex": 0,
              "explanation": "Promise.all short-circuits on rejection. Promise.allSettled waits for all promises to settle (resolve or reject) and returns results with status: 'fulfilled' or 'rejected'.",
              "difficulty": "hard"
            }
          ],
          "faangQuestions": [
            {
              "question": "Explain how the event loop processes microtasks (Promise.then, async/await) vs macrotasks (setTimeout, setImmediate, I/O).",
              "answer": "The event loop processes one macrotask from the current phase, then drains the microtask queue completely before moving to the next phase. Process: 1. Execute one macrotask from the current phase (e.g., a setTimeout callback). 2. Check for nextTick queue - drain entirely. 3. Check for Promise microtask queue - drain entirely. 4. Move to the next event loop phase. This means microtasks scheduled during macrotask execution run before the next macrotask. Example: setTimeout(() => { Promise.resolve().then(() => console.log('micro')); console.log('macro'); }, 0); Output: 'macro', 'micro'. This explains why async/await callbacks run before setTimeout callbacks queued in the same tick.",
              "difficulty": "expert",
              "company": "Google"
            },
            {
              "question": "Convert a callback-based function to async/await. Discuss error handling in both approaches.",
              "answer": "Callback version: fs.readFile('file.txt', 'utf8', (err, data) => { if (err) { console.error(err); return; } fs.writeFile('copy.txt', data, 'utf8', (err2) => { if (err2) console.error(err2); else console.log('Done'); }); });\n\nAsync/await version:\nasync function copyFile() {\n  try {\n    const data = await fs.promises.readFile('file.txt', 'utf8');\n    await fs.promises.writeFile('copy.txt', data, 'utf8');\n    console.log('Done');\n  } catch (err) {\n    console.error(err);\n  }\n}\n\nAsync/await advantages: (1) Linear flow - no nesting. (2) Single try/catch handles all errors. (3) Variables available throughout scope. (4) Easier debugging (stack traces follow the async flow). (5) Easier composition with Promise.all for parallel operations.",
              "difficulty": "hard",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        }
      ]
    },
    {
      "slug": "expressjs",
      "title": "Express.js",
      "description": "Build web applications and APIs with Express.js - routing, middleware, and error handling",
      "order": 4,
      "subtopics": [
        {
          "slug": "routing",
          "title": "Routing",
          "order": 1,
          "content": {
            "overview": "Express.js routing defines how an application responds to client requests at specific endpoints (URIs) and HTTP methods. Routes are defined using app.METHOD(PATH, HANDLER) where METHOD is HTTP method, PATH is a URL pattern, and HANDLER is a callback function.",
            "problemStatement": "Without a routing framework, developers would manually parse URLs and method strings to dispatch requests. Express provides a clean, declarative API for defining routes with support for parameters, validation, modular routers, and chaining.",
            "intuitionFirst": "Think of routing as a receptionist in a large office building. When someone comes in (request arrives), the receptionist checks what they want (HTTP method and path) and directs them to the correct department (route handler). Route parameters are like saying 'Go to room 301' where 301 is a variable.",
            "realLifeAnalogy": "A mail sorting facility: incoming mail (requests) arrives with an address (URL) and class (method). The sorting machine (router) reads the zip code (path prefix) and routes it to the appropriate bin (handler). Some addresses have variable parts like '123 Main St' where 123 is dynamic.",
            "howItWorks": "Express maintains a routing table internally. When a request arrives, Express iterates through registered routes in registration order (first-match-wins). It parses the URL, extracts path and query parameters, and matches against route patterns. Route parameters are extracted and populated in req.params. Query string is parsed into req.query.",
            "beginnerExample": "const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => res.send('Hello World!'));\n\napp.get('/users/:userId', (req, res) => {\n  res.json({ userId: req.params.userId });\n});\n\napp.get('/users/:userId/posts/:postId', (req, res) => {\n  res.json(req.params);\n});\n\napp.get('/search', (req, res) => {\n  const { q, page = 1 } = req.query;\n  res.json({ query: q, page });\n});\n\napp.route('/products/:id')\n  .get((req, res) => res.json({ action: 'get', id: req.params.id }))\n  .put((req, res) => res.json({ action: 'update', id: req.params.id }))\n  .delete((req, res) => res.json({ action: 'delete', id: req.params.id }));\n\nconst adminRouter = express.Router();\nadminRouter.get('/dashboard', (req, res) => res.json({ admin: true }));\napp.use('/admin', adminRouter);\n\napp.listen(3000);",
            "commonMistakes": "Defining routes in wrong order (catch-all routes like /:id before specific routes like /profile). Not handling trailing slashes consistently. Forgetting to export/use Router for modular apps. Using res.send() instead of res.json() for API responses. Mixing up req.params and req.query.",
            "bestPractices": "Group related routes using express.Router(). Use route chaining for the same path with different methods. Place parameterized routes after static ones. Use descriptive param names. Separate route definitions from business logic using controllers.",
            "interviewPerspective": "Express routing knowledge is expected at FAANG for Node.js roles. Key topics: (1) First-match-wins route ordering. (2) Route parameters vs query parameters. (3) Router-level middleware for auth/validation. (4) Modular routing with express.Router(). (5) Error handling in routes - wrapping async handlers. (6) Express 4 has no built-in async error handling - you must wrap handlers or use express-async-errors.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-routing-1",
              "question": "How does Express match incoming requests to route handlers?",
              "options": [
                "It iterates through registered routes in order and uses the first match",
                "It finds the best match by analyzing all routes",
                "Routes are matched by shortest URL first",
                "It uses a hash table for O(1) lookup"
              ],
              "correctIndex": 0,
              "explanation": "Express matches routes in registration order, first-match-wins.",
              "difficulty": "medium"
            },
            {
              "id": "be-routing-2",
              "question": "What is the purpose of express.Router()?",
              "options": [
                "To create modular, mountable route handlers that can be used with app.use()",
                "To configure HTTP methods",
                "To create a new Express application",
                "To parse request bodies"
              ],
              "correctIndex": 0,
              "explanation": "express.Router() creates a modular router that can be mounted at a specific path using app.use().",
              "difficulty": "easy"
            },
            {
              "id": "be-routing-3",
              "question": "Given app.get('/users/:userId/posts/:postId'), how do you access the second parameter?",
              "options": [
                "req.params.postId",
                "req.params[1]",
                "req.params.post_id",
                "req.query.postId"
              ],
              "correctIndex": 0,
              "explanation": "Route parameters with :name are accessible via req.params.name.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Compare Express.js routing with Fastify and Koa. When would you choose each?",
              "answer": "Express: Mature ecosystem, simple API, first-match-wins routing. Best for rapid prototyping, small to medium projects. Fastify: Performance-focused, schema-based validation, async by default, up to 2x faster. Best for high-throughput APIs, microservices. Koa: Modern, async/await natively, light core with middleware onion model, no built-in routing. Best for custom architectures. At FAANG, internal frameworks often replace Express entirely for performance and consistency.",
              "difficulty": "hard",
              "company": "Uber"
            },
            {
              "question": "How does Express route matching handle conflicts between static and dynamic routes? What's the performance implication?",
              "answer": "Express stores routes in an array. Static routes must be defined before dynamic ones or the dynamic route matches first. O(n) matching. With hundreds of routes, matching slows linearly. Mitigation: (1) Organize routes hierarchically with routers. (2) For very large APIs, use a trie-based router (find-my-way, used by Fastify) for O(1) routing.",
              "difficulty": "hard",
              "company": "Amazon"
            }
          ],
          "codingChallenges": [
            {
              "title": "Build a Modular Express API with Routing",
              "description": "Create an Express.js API with modular routers for users, products, and orders. Include route parameters, query string handling, and route chaining with proper route organization.",
              "difficulty": "medium",
              "starterCode": "const express = require('express');\nconst app = express();\napp.use(express.json());\n// TODO: Create userRouter, productRouter, orderRouter\n// Mount them at /api/users, /api/products, /api/orders\napp.listen(3000);",
              "solutionHint": "Create separate router files. Use const router = express.Router(); Define all methods. Export and mount with app.use('/prefix', router). Use router.route('/:id').get().put().delete()."
            }
          ]
        },
        {
          "slug": "middleware",
          "title": "Middleware",
          "order": 2,
          "content": {
            "overview": "Middleware functions have access to req, res, and next in the request-response cycle. They can execute code, modify req/res, end the cycle, or call the next middleware. They handle cross-cutting concerns like logging, authentication, parsing, and compression.",
            "problemStatement": "Web applications need cross-cutting concerns: logging, authentication, parsing, compression, CORS. Without middleware, each route duplicates code. Middleware enables layered processing where each layer handles a specific concern.",
            "intuitionFirst": "Middleware is like an assembly line. Each station performs a task: one checks ID (auth), one inspects quality (validation), one packages (response formatting). The request passes through stations in order before reaching the final handler.",
            "realLifeAnalogy": "Airport security checkpoint: ID check (auth), luggage scan (body parsing), boarding pass check (authorization), random screening (logging). Each step is independent, and any step can stop the process. After all checks, you proceed to the gate (route handler).",
            "howItWorks": "Middleware executes in registration order. Each calls next() to pass control. If middleware sends a response, the chain stops. Application-level (app.use) vs router-level (router.use). Error-handling middleware has four params (err, req, res, next) and catches errors from preceding middleware.",
            "beginnerExample": "const express = require('express');\nconst app = express();\n\n// Logging middleware\napp.use((req, res, next) => {\n  console.log(`${Date.now()} ${req.method} ${req.url}`);\n  next();\n});\n\n// Timing middleware\napp.use((req, res, next) => {\n  req.startTime = Date.now();\n  res.on('finish', () => console.log(`Duration: ${Date.now() - req.startTime}ms`));\n  next();\n});\n\n// Auth middleware\napp.use('/api/admin', (req, res, next) => {\n  const token = req.headers.authorization;\n  if (!token) return res.status(401).json({ error: 'No token' });\n  req.user = { id: 1, role: 'admin' };\n  next();\n});\n\napp.get('/api/admin/dashboard', (req, res) => {\n  res.json({ user: req.user });\n});\n\n// Error handler\napp.use((err, req, res, next) => {\n  console.error(err);\n  res.status(500).json({ error: 'Internal error' });\n});\n\n// Built-in middleware\napp.use(express.json());\napp.use(express.urlencoded({ extended: true }));\napp.use(express.static('public'));\n\napp.listen(3000);",
            "commonMistakes": "Forgetting to call next() (request hangs). Sending response twice. Not placing error-handling middleware at the end. Using app.use for route-specific middleware. Modifying req/res inconsistently across middleware.",
            "bestPractices": "Place middleware in logical order: logging, security, parsing, CORS, auth, routes, error handling. Call next() exactly once. Use path-specific app.use('/path', middleware). Always have a final error handler. Keep middleware pure.",
            "interviewPerspective": "Middleware architecture is a key Express interview topic. Understand: (1) Signature (req, res, next) and error (err, req, res, next). (2) Order of execution. (3) next('route') skips to next handler. (4) next(err) jumps to error middleware. (5) How express.json() works internally using streams. (6) Async middleware error handling - wrap with try/catch or use express-async-errors.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-middleware-1",
              "question": "What are the three arguments to a middleware function?",
              "options": [
                "req, res, next",
                "req, res, err",
                "req, res, callback",
                "err, req, res"
              ],
              "correctIndex": 0,
              "explanation": "Standard middleware receives request, response, and next. Error-handling middleware has four params (err, req, res, next).",
              "difficulty": "easy"
            },
            {
              "id": "be-middleware-2",
              "question": "What happens if you don't call next() in middleware?",
              "options": [
                "The request hangs until timeout, no further processing occurs",
                "Express auto-calls next()",
                "The middleware is skipped",
                "An error is thrown"
              ],
              "correctIndex": 0,
              "explanation": "If next() is not called, the request-response cycle stalls with no response sent.",
              "difficulty": "medium"
            },
            {
              "id": "be-middleware-3",
              "question": "How does Express identify error-handling middleware?",
              "options": [
                "By the 4-parameter signature (err, req, res, next)",
                "By using app.error()",
                "By the @error decorator",
                "By checking the middleware name"
              ],
              "correctIndex": 0,
              "explanation": "Express identifies error middleware by its function parameter count (4 parameters).",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Explain the Express middleware execution model. How does Koa's middleware model differ?",
              "answer": "Express uses linear daisy-chain: middleware executes top-to-bottom in registration order. Each calls next() to pass control. Koa uses a true onion model - middleware runs on the way in (before await next()) and on the way out (after await next()). Koa model: req -> m1 (before) -> m2 (before) -> route -> m2 (after) -> m1 (after) -> response. Koa's model is more powerful for logging timings, response transformation, and error handling.",
              "difficulty": "hard",
              "company": "Google"
            },
            {
              "question": "How do you handle async/await errors in Express middleware?",
              "answer": "Express 4 does not catch Promise rejections from async middleware. Solutions: (1) Wrap each async handler: async (req, res, next) => { try { ... } catch(e) { next(e); } }. (2) Utility wrapper: const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next). (3) Use express-async-errors package. In Express 5, async error handling is built-in.",
              "difficulty": "hard",
              "company": "Netflix"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "error-handling",
          "title": "Error Handling",
          "order": 3,
          "content": {
            "overview": "Express error handling involves catching errors from synchronous and asynchronous code, categorizing them, and sending appropriate responses. A robust strategy uses custom error classes, centralized error middleware, and consistent response formats.",
            "problemStatement": "Unhandled errors crash Node.js processes, corrupt data, and expose internal details. Without structured error handling, debugging is difficult, error responses are inconsistent, and operational issues go undetected.",
            "intuitionFirst": "Error handling is like a safety net in a circus. If any performer falls (error), the net catches them safely instead of crashing. The net signals the emergency team (logging) and guides the performer out safely (graceful degradation).",
            "realLifeAnalogy": "Building fire safety: smoke detectors (try/catch) detect problems early. Fire alarms (error events) alert everyone. Sprinklers (error middleware) contain the damage. Fire exits (graceful degradation) provide safe egress. Fire department (logging/monitoring) arrives to help.",
            "howItWorks": "Synchronous errors caught automatically by Express. Async errors must be forwarded via next(err). Custom error classes extend Error with statusCode and code. Error-handling middleware at the end catches all. uncaughtException and unhandledRejection process events catch what Express misses.",
            "beginnerExample": "class AppError extends Error {\n  constructor(message, statusCode, code) {\n    super(message);\n    this.statusCode = statusCode;\n    this.code = code;\n    this.isOperational = true;\n  }\n}\n\napp.use((req, res, next) => {\n  next(new AppError('Not found', 404, 'NOT_FOUND'));\n});\n\napp.use((err, req, res, next) => {\n  console.error(`${err.code}: ${err.message}`, { path: req.path });\n  const statusCode = err.statusCode || 500;\n  res.status(statusCode).json({\n    error: {\n      code: err.code || 'INTERNAL_ERROR',\n      message: err.isOperational ? err.message : 'Something went wrong',\n    },\n  });\n});\n\nconst asyncHandler = (fn) => (req, res, next) =>\n  Promise.resolve(fn(req, res, next)).catch(next);\n\napp.get('/api/users/:id', asyncHandler(async (req, res) => {\n  const user = await db.findUser(req.params.id);\n  if (!user) throw new AppError('User not found', 404, 'USER_NOT_FOUND');\n  res.json(user);\n}));\n\nprocess.on('uncaughtException', (err) => {\n  console.error('UNCAUGHT:', err);\n  server.close(() => process.exit(1));\n});\n\nprocess.on('unhandledRejection', (reason) => {\n  console.error('UNHANDLED:', reason);\n  throw reason;\n});",
            "commonMistakes": "Not using centralized error handler. Exposing stack traces in production. Not distinguishing operational vs programmer errors. Forgetting to handle async errors. Not having process-level handlers.",
            "bestPractices": "Create custom AppError with statusCode and code. Use centralized error middleware. Wrap all async handlers. Log errors with correlation IDs. Differentiate operational vs programmer errors. Have process-level handlers. Use different error formats for dev vs prod.",
            "interviewPerspective": "FAANG interviews test error handling patterns. Key topics: (1) Operational vs Programmer errors - Graceful (HTTP 400) vs Crash. (2) Centralized error middleware vs scattered try/catch. (3) Async handler wrapper pattern. (4) Error serialization in production. (5) Graceful shutdown on unrecoverable errors. (6) Request correlation IDs for microservice tracing.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-error-1",
              "question": "What is the difference between operational and programmer errors?",
              "options": [
                "Operational: expected runtime errors. Programmer: bugs (undefined variable, null reference).",
                "Operational: bugs. Programmer: runtime errors.",
                "Operational: server errors. Programmer: client errors.",
                "No difference"
              ],
              "correctIndex": 0,
              "explanation": "Operational errors are expected runtime issues. Programmer errors are bugs that should not happen.",
              "difficulty": "medium"
            },
            {
              "id": "be-error-2",
              "question": "How does Express handle synchronous errors from route handlers?",
              "options": [
                "Express automatically catches synchronous throws and forwards them to error middleware",
                "Synchronous errors are ignored",
                "You must wrap in try/catch",
                "Express 4 crashes on synchronous errors"
              ],
              "correctIndex": 0,
              "explanation": "Express automatically catches synchronous throws in handlers and passes them to error middleware.",
              "difficulty": "easy"
            },
            {
              "id": "be-error-3",
              "question": "What is the purpose of process.on('uncaughtException')?",
              "options": [
                "To catch errors that escaped all other error handling before process termination",
                "To handle successful responses",
                "To log HTTP requests",
                "To restart the server"
              ],
              "correctIndex": 0,
              "explanation": "uncaughtException catches errors that escape all other handling. The process should be restarted afterward.",
              "difficulty": "hard"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design an error handling strategy for a production Express API serving millions of requests.",
              "answer": "1. Custom AppError class with statusCode, code, isOperational, metadata. 2. Async handler wrapper catches all async errors. 3. Centralized error middleware: operational errors return safe messages; programmer errors log full details, return generic 500. 4. Error monitoring (Sentry/Datadog) captures errors with request context. 5. Correlation IDs (X-Request-Id) link errors to requests. 6. Health checks expose error rates. 7. process.on('uncaughtException') gracefully shuts down. 8. Error response follows RFC 7807 standard. 9. Rate limiting errors (429) with Retry-After header. 10. Validation errors (422) include field-level details.",
              "difficulty": "expert",
              "company": "Netflix"
            },
            {
              "question": "How do you prevent stack traces from leaking in production while making them available for debugging?",
              "answer": "1. Set NODE_ENV=production. 2. Error handler checks environment: strip stack from response body in production. 3. Always log full stack to logging system with correlation ID. 4. Use structured logging (JSON) with error_code, message, stack, request_id. 5. Forward errors to Sentry which stores full stack with source maps. 6. Never send internal details to client - map to safe messages.",
              "difficulty": "hard",
              "company": "Google"
            }
          ],
          "codingChallenges": []
        }
      ]
    },
    {
      "slug": "apis",
      "title": "APIs",
      "description": "Design and build REST, GraphQL, and gRPC APIs with best practices",
      "order": 5,
      "subtopics": [
        {
          "slug": "rest-api",
          "title": "REST API",
          "order": 1,
          "content": {
            "overview": "REST (Representational State Transfer) is an architectural style for designing networked applications. It uses HTTP methods to perform CRUD operations on resources identified by URLs. REST APIs are stateless, cacheable, and follow a uniform interface.",
            "problemStatement": "Before REST, APIs used complex protocols (SOAP, XML-RPC) that were tightly coupled and hard to scale. REST introduced a simple, resource-oriented approach leveraging HTTP's existing capabilities.",
            "intuitionFirst": "Think of REST as a library system. Books (resources) have unique identifiers (URLs). You browse shelves (GET /books), add a book (POST /books), replace (PUT /books/5), update a page (PATCH), or remove (DELETE).",
            "realLifeAnalogy": "A restaurant menu: items organized by category (resources). View menu (GET /menu), order (POST /orders), check status (GET /orders/123), cancel (DELETE). Each action uses the appropriate verb. Waiter doesn't remember you between visits (stateless).",
            "howItWorks": "REST exposes resources (nouns) via URLs. HTTP methods map to CRUD: GET (read), POST (create), PUT (replace), PATCH (partial update), DELETE (remove). Constraints: statelessness, cacheability, uniform interface, layered system. API versioning manages changes.",
            "beginnerExample": "const express = require('express');\nconst app = express();\napp.use(express.json());\nlet tasks = [{ id: 1, title: 'Learn REST', completed: false }];\n\napp.get('/api/v1/tasks', (req, res) => res.json({ data: tasks, count: tasks.length }));\n\napp.get('/api/v1/tasks/:id', (req, res) => {\n  const task = tasks.find(t => t.id === +req.params.id);\n  if (!task) return res.status(404).json({ error: 'Not found' });\n  res.json({ data: task });\n});\n\napp.post('/api/v1/tasks', (req, res) => {\n  const { title } = req.body;\n  if (!title) return res.status(400).json({ error: 'Title required' });\n  const task = { id: tasks.length + 1, title, completed: false };\n  tasks.push(task);\n  res.status(201).location(`/api/v1/tasks/${task.id}`).json({ data: task });\n});\n\napp.put('/api/v1/tasks/:id', (req, res) => {\n  const idx = tasks.findIndex(t => t.id === +req.params.id);\n  if (idx === -1) return res.status(404).json({ error: 'Not found' });\n  tasks[idx] = { id: +req.params.id, ...req.body };\n  res.json({ data: tasks[idx] });\n});\n\napp.patch('/api/v1/tasks/:id', (req, res) => {\n  const task = tasks.find(t => t.id === +req.params.id);\n  if (!task) return res.status(404).json({ error: 'Not found' });\n  Object.assign(task, req.body);\n  res.json({ data: task });\n});\n\napp.delete('/api/v1/tasks/:id', (req, res) => {\n  tasks = tasks.filter(t => t.id !== +req.params.id);\n  res.status(204).send();\n});\n\napp.listen(3000);",
            "commonMistakes": "Using verbs in URLs (/getUsers). Not using proper status codes. Ignoring idempotency. Not versioning APIs. Inconsistent naming. Not paginating lists. Returning too much or too little data.",
            "bestPractices": "Use nouns for resources, HTTP methods for actions. Version your API (/v1/). Paginate lists. Use proper status codes. Use HATEOAS links. Include error details. Follow JSON:API or similar standard.",
            "interviewPerspective": "REST API design is a core FAANG topic. Key points: (1) Six REST constraints. (2) Resource naming conventions. (3) HATEOAS. (4) Idempotency and safety. (5) Cursor vs offset pagination. (6) API versioning strategies. Google uses URL-based; Stripe uses header-based.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-rest-1",
              "question": "What is a key constraint of REST APIs?",
              "options": [
                "Statelessness - each request contains all needed information",
                "Stateful sessions",
                "XML-only responses",
                "All POST requests"
              ],
              "correctIndex": 0,
              "explanation": "REST requires statelessness. Each request must contain all necessary information.",
              "difficulty": "easy"
            },
            {
              "id": "be-rest-2",
              "question": "What is HATEOAS in REST?",
              "options": [
                "Responses include links to related resources for API discovery",
                "An authentication method",
                "A caching strategy",
                "A database index"
              ],
              "correctIndex": 0,
              "explanation": "HATEOAS means API responses include hypermedia links for navigation and discovery.",
              "difficulty": "medium"
            },
            {
              "id": "be-rest-3",
              "question": "Which URL follows REST best practices?",
              "options": [
                "GET /api/v1/users (list) and GET /api/v1/users/42 (single)",
                "GET /api/getUser/42",
                "POST /api/getUser",
                "/api/v1/getUsers"
              ],
              "correctIndex": 0,
              "explanation": "REST uses nouns for resources and HTTP methods for actions.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design a REST API for Twitter's tweet timeline. Discuss pagination, filtering, and performance.",
              "answer": "Endpoints: GET /v1/tweets?cursor={id}&limit=50 (timeline), POST /v1/tweets, GET /v1/tweets/:id, DELETE /v1/tweets/:id, POST /v1/tweets/:id/like. Cursor-based pagination using tweet ID. Returns { data: [...], meta: { next_cursor, has_more } }. Performance: fanout-on-write to Redis timelines, CDN for media, database indexing on (user_id, created_at), read replicas.",
              "difficulty": "expert",
              "company": "Twitter"
            },
            {
              "question": "Compare REST and RPC-style APIs. When would you choose RPC over REST?",
              "answer": "REST: Resource-oriented, HTTP methods as verbs, stateless, cacheable. Best for CRUD, public APIs. RPC: Action-oriented, function calls (POST /getUser), flexible for complex operations. Best for internal services, complex operations. gRPC is modern RPC with protobuf, streaming. Google uses gRPC for internal APIs, REST for public APIs.",
              "difficulty": "hard",
              "company": "Google"
            }
          ],
          "codingChallenges": [
            {
              "title": "Build a RESTful API for a Bookstore",
              "description": "Create a RESTful API for books with proper naming, methods, status codes, pagination, filtering, sorting, and HATEOAS links.",
              "difficulty": "hard",
              "starterCode": "app.get('/api/v1/books?page=1&limit=20&sort=-price&genre=fiction') // list\napp.get('/api/v1/books/:isbn') // get\napp.post('/api/v1/books') // create\napp.put('/api/v1/books/:isbn') // replace\napp.patch('/api/v1/books/:isbn') // partial\napp.delete('/api/v1/books/:isbn') // delete",
              "solutionHint": "Use ISBN as identifier. Include pagination metadata. Sort with +/- prefix. Add HATEOAS links. Return 201 with Location. Validate ISBN format."
            }
          ]
        },
        {
          "slug": "graphql",
          "title": "GraphQL",
          "order": 2,
          "content": {
            "overview": "GraphQL is a query language for APIs developed by Meta. Clients request exactly the data they need, nothing more. Unlike REST, GraphQL has a single endpoint and lets clients specify data requirements in queries.",
            "problemStatement": "REST APIs suffer from over-fetching (getting more data than needed) and under-fetching (multiple requests needed). These inefficiencies compound on mobile networks where bandwidth and latency matter.",
            "intuitionFirst": "GraphQL is like a buffet where you pick exactly what you want on your plate. REST is like a fixed meal where you get everything or need multiple trips to different stations.",
            "realLifeAnalogy": "Ordering at a restaurant: REST is a prix fixe menu - you get the whole meal even if you only want the main. GraphQL is a custom plate - you say 'steak from dish A, sauce from dish B, dessert from dish C' - delivered in one trip.",
            "howItWorks": "GraphQL exposes a single POST /graphql endpoint. Clients send query/mutation strings. Server parses, validates against schema, and executes resolvers. Response mirrors query structure. Key concepts: Schema (type definitions), Queries (read), Mutations (write), Subscriptions (real-time), Resolvers (data fetching).",
            "beginnerExample": "const { ApolloServer, gql } = require('apollo-server');\n\nconst typeDefs = gql`\n  type User { id: ID! name: String! posts: [Post!]! }\n  type Post { id: ID! title: String! author: User! }\n  type Query { user(id: ID!): User users: [User!]! }\n  type Mutation { createUser(name: String!): User! }\n`;\n\nconst resolvers = {\n  Query: { user: (_, { id }) => db.users.find(u => u.id === id) },\n  Mutation: { createUser: (_, { name }) => {\n    const user = { id: String(Date.now()), name, posts: [] };\n    db.users.push(user); return user;\n  }},\n  User: { posts: (parent) => db.posts.filter(p => p.authorId === parent.id) },\n};\n\nconst server = new ApolloServer({ typeDefs, resolvers });\nserver.listen(4000);\n\n// Client query:\n// { user(id: \"1\") { name posts { title } } }",
            "commonMistakes": "Creating overly deep nested queries (N+1 problem). Not using DataLoader. Exposing sensitive fields. Not setting query complexity limits. Using GraphQL for simple CRUD that REST handles better.",
            "bestPractices": "Use DataLoader to batch database queries (solves N+1). Implement query complexity analysis. Use persisted queries in production. Set up proper authentication. Use Apollo Studio for development. Implement rate limiting based on query complexity.",
            "interviewPerspective": "GraphQL is frequently discussed at FAANG. Key topics: (1) N+1 problem and DataLoader solution. (2) GraphQL vs REST tradeoffs. (3) Schema design: interfaces, unions, input types. (4) Subscriptions for real-time. (5) Query cost analysis. (6) Apollo Federation for microservices. (7) How Meta uses GraphQL across their products.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-graphql-1",
              "question": "What problem does DataLoader solve in GraphQL?",
              "options": [
                "The N+1 problem where resolvers make individual DB calls for each list item",
                "Authentication",
                "Schema validation",
                "Response caching"
              ],
              "correctIndex": 0,
              "explanation": "DataLoader batches individual resolver calls into a single batched DB query.",
              "difficulty": "medium"
            },
            {
              "id": "be-graphql-2",
              "question": "How does a GraphQL client specify what data it needs?",
              "options": [
                "By sending a query string describing exact fields and relationships needed",
                "URL query parameters",
                "HTTP headers",
                "The server decides"
              ],
              "correctIndex": 0,
              "explanation": "The client sends a GraphQL query specifying exactly which fields and nested relations it needs.",
              "difficulty": "easy"
            },
            {
              "id": "be-graphql-3",
              "question": "What is the purpose of GraphQL mutations?",
              "options": [
                "To modify data (create, update, delete)",
                "To read data",
                "To define the schema",
                "To authenticate users"
              ],
              "correctIndex": 0,
              "explanation": "Mutations are for data modifications (writes), analogous to POST/PUT/PATCH/DELETE in REST.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Explain the N+1 problem in GraphQL and how DataLoader solves it.",
              "answer": "N+1 problem: Query { posts { title, author { name } } } makes 1 query for posts + N queries for each post's author. DataLoader groups individual field resolver calls within one event-loop tick into a single batched query. Author resolver calls dataloader.load(post.authorId). DataLoader coalesces all loads and queries: SELECT * FROM users WHERE id IN (...). Results cached per request. Reduces N+1 to 2 queries.",
              "difficulty": "hard",
              "company": "Meta"
            },
            {
              "question": "Compare GraphQL and REST for a social media app.",
              "answer": "GraphQL Pros: Single request for complex data, no over-fetching, strong typing, self-documenting. Cons: Complex caching, query cost analysis needed, server complexity. REST Pros: Simple caching, easy monitoring, wide tooling. Cons: Over/under-fetching, multiple round trips. At Meta, GraphQL is primary. GitHub uses both. Ideal: REST for simple CRUD, GraphQL for complex data composition.",
              "difficulty": "expert",
              "company": "Meta"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "grpc",
          "title": "gRPC",
          "order": 3,
          "content": {
            "overview": "gRPC is a high-performance RPC framework developed by Google. It uses Protocol Buffers for serialization and HTTP/2 for transport, supporting bi-directional streaming and multiplexing. Ideal for microservices communication.",
            "problemStatement": "REST/JSON has significant overhead: verbose text serialization, HTTP/1.1 lacks efficient multiplexing, no native streaming. gRPC addresses these with binary Protobuf, HTTP/2 multiplexing, and auto-generated code from .proto files.",
            "intuitionFirst": "gRPC is like a dedicated fiber optic line between services: data packed efficiently (Protobuf), multiple conversations on the same line (HTTP/2 multiplexing). REST/JSON is like mailing letters - bulky text, individual envelopes.",
            "realLifeAnalogy": "A dedicated courier service between companies. Standardized package format (Proto definition), binary encoding, multiple packages traveling together (multiplexing), real-time streaming. Both companies get automated tools for shipping/receiving code (code generation).",
            "howItWorks": "Services defined in .proto files using Protobuf IDL. protoc generates client/server code. gRPC uses HTTP/2: multiplexing (multiple calls on one connection), streaming (client, server, bidirectional), efficient binary framing. Protobuf serializes to compact binary.",
            "beginnerExample": "syntax = 'proto3';\nservice UserService {\n  rpc GetUser (GetUserRequest) returns (User);\n  rpc ListUsers (ListUsersRequest) returns (stream User);\n  rpc UpdateUser (stream UpdateUserRequest) returns (User);\n  rpc Chat (stream ChatMessage) returns (stream ChatMessage);\n}\nmessage GetUserRequest { string user_id = 1; }\nmessage User { string id = 1; string name = 2; string email = 3; }",
            "commonMistakes": "Using gRPC for browser-to-server without gRPC-Web. Not handling connection errors. Overly large .proto files. Ignoring deadline/timeout. Not using streaming for large datasets.",
            "bestPractices": "Use gRPC for internal service communication. Use gRPC-Web or REST proxy for external. Define clear deadlines. Use streaming for large collections. Implement health checking. Use interceptors for logging, auth, metrics. Version proto packages.",
            "interviewPerspective": "gRPC knowledge is valuable for FAANG system design. Key topics: (1) Protobuf encoding efficiency. (2) HTTP/2 benefits: multiplexing, server push, flow control. (3) Four streaming types. (4) gRPC vs REST for microservices. (5) gRPC load balancing: client-side vs proxy. (6) Deadline propagation. (7) How Google uses gRPC internally for nearly all services.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-grpc-1",
              "question": "What serialization format does gRPC use?",
              "options": [
                "Protocol Buffers (Protobuf)",
                "JSON",
                "XML",
                "MessagePack"
              ],
              "correctIndex": 0,
              "explanation": "gRPC uses Protobuf for its interface definition language and binary serialization.",
              "difficulty": "easy"
            },
            {
              "id": "be-grpc-2",
              "question": "What transport protocol does gRPC require?",
              "options": [
                "HTTP/2",
                "HTTP/1.1",
                "Raw TCP",
                "WebSocket"
              ],
              "correctIndex": 0,
              "explanation": "gRPC requires HTTP/2 for multiplexing, streaming, and efficient binary framing.",
              "difficulty": "medium"
            },
            {
              "id": "be-grpc-3",
              "question": "Which gRPC streaming type is best for real-time chat?",
              "options": [
                "Bidirectional streaming",
                "Server streaming",
                "Client streaming",
                "Unary"
              ],
              "correctIndex": 0,
              "explanation": "Bidirectional streaming allows both client and server to send messages simultaneously, ideal for chat.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Compare gRPC and REST for microservices communication.",
              "answer": "gRPC Pros: 10x faster serialization (binary), HTTP/2 multiplexing, strong typing, native streaming, built-in auth/health checking. Cons: Browser support requires proxy, harder to debug (binary), smaller ecosystem. REST Pros: Universal browser support, simple debugging (curl), easy caching. Cons: Verbose JSON, HTTP/1.1 overhead, no native streaming. At FAANG: gRPC dominates internal communication (Google, Netflix, Uber). REST for external/public APIs.",
              "difficulty": "hard",
              "company": "Google"
            },
            {
              "question": "Explain gRPC load balancing: client-side vs proxy.",
              "answer": "Client-side LB: gRPC client receives server addresses from service discovery, selects backend per RPC. Benefits: no proxy hop, lower latency. Drawbacks: client needs discovery integration. Proxy LB: Envoy/NGINX terminates gRPC, distributes across backends. Benefits: client simplicity, centralized control. Drawbacks: extra hop, proxy bottleneck. Google uses client-side LB with BNS internally. Kubernetes + Istio uses Envoy sidecar proxy.",
              "difficulty": "hard",
              "company": "Google"
            }
          ],
          "codingChallenges": []
        }
      ]
    },
    {
      "slug": "authentication",
      "title": "Authentication",
      "description": "Implement secure authentication with JWT, OAuth, sessions, and refresh tokens",
      "order": 6,
      "subtopics": [
        {
          "slug": "jwt",
          "title": "JWT (Access Token, Refresh Token, JWT Structure, Flow)",
          "order": 1,
          "content": {
            "overview": "JSON Web Tokens (JWT) are an open standard (RFC 7519) for securely transmitting information as a JSON object. They are digitally signed, enabling stateless authentication. A JWT contains header, payload, and signature parts.",
            "problemStatement": "Server-side sessions require storage and create scalability challenges. JWT enables stateless authentication where user identity is encoded in the token itself, verified by cryptographic signature on each request.",
            "intuitionFirst": "A JWT is like a stamped passport. It contains your identity, has an official seal (signature) verifiable by any border agent (server), and has an expiration date. Unlike a train ticket (session ID) checked against a passenger list (session store).",
            "realLifeAnalogy": "A VIP wristband at a festival: your info encoded (user ID, role), secured with a unique pattern (signature), changes color daily (expiration), verified at entry points. No central office check needed. If lost (token theft), usable until expires.",
            "howItWorks": "Login: server validates credentials, creates JWT with claims (sub, iat, exp), signs with secret, returns. Client stores and sends in Authorization: Bearer header. Server verifies signature + expiration. Access tokens short-lived (15 min). Refresh tokens long-lived (7-30 days), HttpOnly cookie.",
            "beginnerExample": "const jwt = require('jsonwebtoken');\nconst ACCESS_SECRET = 'access-secret';\nconst REFRESH_SECRET = 'refresh-secret';\n\napp.post('/api/auth/login', async (req, res) => {\n  const { email, password } = req.body;\n  const user = await verifyCredentials(email, password);\n  if (!user) return res.status(401).json({ error: 'Invalid credentials' });\n\n  const accessToken = jwt.sign({ sub: user.id, role: user.role }, ACCESS_SECRET, { expiresIn: '15m' });\n  const refreshToken = jwt.sign({ sub: user.id, type: 'refresh' }, REFRESH_SECRET, { expiresIn: '7d' });\n\n  await storeRefreshToken(user.id, refreshToken);\n\n  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 7*86400000, path: '/api/auth' });\n  res.json({ accessToken, user: { id: user.id, email: user.email } });\n});\n\napp.post('/api/auth/refresh', async (req, res) => {\n  const token = req.cookies.refreshToken;\n  if (!token) return res.status(401).json({ error: 'No token' });\n  try {\n    const payload = jwt.verify(token, REFRESH_SECRET);\n    const stored = await findRefreshToken(payload.sub, token);\n    if (!stored) return res.status(401).json({ error: 'Revoked' });\n    const accessToken = jwt.sign({ sub: payload.sub }, ACCESS_SECRET, { expiresIn: '15m' });\n    res.json({ accessToken });\n  } catch (err) {\n    res.status(401).json({ error: 'Invalid token' });\n  }\n});\n\nfunction authenticate(req, res, next) {\n  const auth = req.headers.authorization;\n  if (!auth?.startsWith('Bearer ')) return res.status(401).json({ error: 'Token required' });\n  try {\n    req.user = jwt.verify(auth.split(' ')[1], ACCESS_SECRET);\n    next();\n  } catch (err) {\n    if (err.name === 'TokenExpiredError') return res.status(401).json({ error: 'Expired', code: 'TOKEN_EXPIRED' });\n    return res.status(401).json({ error: 'Invalid' });\n  }\n}\n\napp.get('/api/profile', authenticate, (req, res) => {\n  res.json({ userId: req.user.sub });\n});\n\napp.post('/api/auth/logout', async (req, res) => {\n  await revokeRefreshToken(req.cookies.refreshToken);\n  res.clearCookie('refreshToken');\n  res.json({ message: 'Logged out' });\n});",
            "commonMistakes": "Storing JWT in localStorage (XSS vulnerable). Not setting short expiration. Not implementing refresh token rotation. Storing sensitive data in payload (base64, not encrypted). Not validating signature on each request.",
            "bestPractices": "Short-lived access tokens (15 min). Store refresh tokens in HttpOnly Secure SameSite cookies. Implement refresh token rotation. Use asymmetric signing (RS256) for multi-service verification. Include minimal claims. Validate on every request. Implement token blacklist for revocation.",
            "interviewPerspective": "JWT is critical FAANG topic. Deep understanding: (1) JWT structure: header (alg, typ), payload (claims), signature. (2) Signing: HS256 (symmetric), RS256/ES256 (asymmetric). (3) Payload is NOT encrypted, only signed. Use JWE for encryption. (4) Refresh token rotation and theft detection. (5) Stateless vs stateful tradeoffs. (6) alg:none vulnerability - always enforce algorithm.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-jwt-1",
              "question": "What are the three parts of a JWT?",
              "options": [
                "Header, Payload, Signature",
                "Header, Body, Footer",
                "Token, Secret, Hash",
                "Algorithm, Data, Key"
              ],
              "correctIndex": 0,
              "explanation": "JWT has three base64url-encoded parts: header, payload, signature, separated by dots.",
              "difficulty": "easy"
            },
            {
              "id": "be-jwt-2",
              "question": "Is the JWT payload encrypted?",
              "options": [
                "No, it is only base64url-encoded. Anyone can read the contents.",
                "Yes, JWTs are always encrypted",
                "Only the signature is encrypted",
                "Depends on algorithm"
              ],
              "correctIndex": 0,
              "explanation": "JWT payload is base64url-encoded, not encrypted. Sensitive data should not be stored in payload.",
              "difficulty": "medium"
            },
            {
              "id": "be-jwt-3",
              "question": "What is HS256 vs RS256?",
              "options": [
                "HS256: symmetric (same secret). RS256: asymmetric (private key signs, public key verifies)",
                "HS256: faster. RS256: more secure.",
                "HS256: HMAC. RS256: RSA.",
                "All of the above"
              ],
              "correctIndex": 0,
              "explanation": "HS256 uses shared secret. RS256 uses key pair - service signs with private key, others verify with public key.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design a JWT authentication system for microservices architecture. How do you handle token verification across services?",
              "answer": "Architecture: (1) Auth service issues JWTs signed with RS256 (private key). (2) All services have public key to verify independently (no DB lookup per request). (3) JWT contains sub, role, scopes, jti, iat, exp. (4) Short-lived access tokens (15 min). (5) Refresh tokens opaque, stored hashed in DB, rotated on each use. (6) Token blacklist keyed by jti in Redis with TTL. Services cache blacklist. (7) API gateway validates JWT and injects user context header to downstream services.",
              "difficulty": "expert",
              "company": "Auth0"
            },
            {
              "question": "Explain the 'alg:none' JWT vulnerability and how to prevent it.",
              "answer": "When JWT header specifies alg: none, no signature algorithm. Vulnerable libraries accept forged tokens without signature. Attacker intercepts valid JWT, modifies payload (e.g., becomes admin), changes alg to none, removes signature. Prevention: (1) Use libraries that reject 'none' algorithm. (2) Always specify expected algorithm: jwt.verify(token, secret, { algorithms: ['HS256'] }).",
              "difficulty": "hard",
              "company": "Google"
            }
          ],
          "codingChallenges": [
            {
              "title": "Implement JWT Authentication with Access and Refresh Tokens",
              "description": "Create auth system with login, protected routes, token refresh, logout. Short-lived access tokens (5 min) and refresh tokens with rotation. Implement token blacklist.",
              "difficulty": "hard",
              "starterCode": "const jwt = require('jsonwebtoken');\nconst ACCESS_SECRET = 'access';\nconst REFRESH_SECRET = 'refresh';\nconst refreshTokens = new Map();\nconst blacklist = new Set();\n\n// POST /api/auth/login\n// POST /api/auth/refresh (rotate)\n// POST /api/auth/logout\n// GET /api/protected (auth middleware)",
              "solutionHint": "Use jwt.sign with {expiresIn}. Verify with jwt.verify. Rotation: on refresh, delete old token hash, issue new. Blacklist: store jti with TTL."
            }
          ]
        },
        {
          "slug": "oauth",
          "title": "OAuth",
          "order": 2,
          "content": {
            "overview": "OAuth 2.0 is an authorization framework enabling third-party apps to obtain limited access to user resources without exposing credentials. It uses tokens instead of passwords, allowing granular permissions and revocation.",
            "problemStatement": "Before OAuth, sharing access to data meant giving apps your password. Full access, couldn't revoke partially, password changes affected all apps. OAuth provides delegated, scoped, revocable access.",
            "intuitionFirst": "OAuth is like a valet key for your car. It lets someone drive but limits speed, trunk access, and radio. You can take it back anytime. Similarly, OAuth tokens grant limited, revocable access to specific data.",
            "realLifeAnalogy": "Hotel key card: you check in (login), get key for your room and floor but not manager's office (scoped). Works for limited time (expiration). Lost? Front desk deactivates it (revocation).",
            "howItWorks": "OAuth roles: Resource Owner (user), Client (app), Authorization Server, Resource Server (API). Grant types: Authorization Code (most secure), PKCE for mobile/SPA, Client Credentials (server-to-server). Flow: user authorizes app -> app gets code -> exchanges for token -> uses token for API.",
            "beginnerExample": "// OAuth Authorization Code flow\napp.get('/oauth/authorize', (req, res) => {\n  const { client_id, redirect_uri, scope, state, code_challenge } = req.query;\n  // Show consent screen, then:\n  const authCode = crypto.randomUUID();\n  authCodes.set(authCode, { client_id, code_challenge, user_id: req.session.userId, expiresAt: Date.now() + 60000 });\n  res.redirect(`${redirect_uri}?code=${authCode}&state=${state}`);\n});\n\napp.post('/oauth/token', (req, res) => {\n  const { grant_type, code, code_verifier } = req.body;\n  if (grant_type === 'authorization_code') {\n    const stored = authCodes.get(code);\n    if (!stored || stored.expiresAt < Date.now()) return res.status(400).json({ error: 'Invalid code' });\n    // PKCE verify\n    const expected = crypto.createHash('sha256').update(code_verifier).digest('base64url');\n    if (expected !== stored.code_challenge) return res.status(400).json({ error: 'Verifier mismatch' });\n    authCodes.delete(code); // one-time use\n    res.json({ access_token: generateToken(stored), token_type: 'Bearer', expires_in: 3600 });\n  }\n});",
            "commonMistakes": "Using implicit grant in SPAs. Not implementing PKCE. Storing client secret client-side. Not validating redirect URIs strictly. Reusing authorization codes. Not using state parameter.",
            "bestPractices": "Use Authorization Code + PKCE for all clients. Validate redirect URIs exactly. Short-lived codes (1-2 min). Always use state param. Rotate refresh tokens. Implement fine-grained scopes.",
            "interviewPerspective": "OAuth extensively tested in FAANG. Key: (1) All four roles. (2) Authorization Code flow vs others. (3) Why PKCE is necessary. (4) OAuth vs SAML vs OIDC (OIDC adds identity layer). (5) Google's OAuth implementation. (6) Token exchange patterns. (7) CSRF prevention via state parameter.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-oauth-1",
              "question": "What are the four OAuth 2.0 roles?",
              "options": [
                "Resource Owner, Client, Authorization Server, Resource Server",
                "User, App, Server, Database",
                "Provider, Consumer, Broker, Auditor",
                "Owner, Developer, API, Admin"
              ],
              "correctIndex": 0,
              "explanation": "The four roles are Resource Owner (user), Client (app), Authorization Server, and Resource Server (API).",
              "difficulty": "easy"
            },
            {
              "id": "be-oauth-2",
              "question": "What problem does PKCE solve?",
              "options": [
                "Prevents authorization code interception attacks on mobile/SPA clients",
                "Encrypts JWT tokens",
                "Replaces client secrets",
                "Speeds up OAuth"
              ],
              "correctIndex": 0,
              "explanation": "PKCE uses a cryptographically random verifier to prevent authorization code interception.",
              "difficulty": "medium"
            },
            {
              "id": "be-oauth-3",
              "question": "What is the difference between OAuth and OpenID Connect?",
              "options": [
                "OAuth for authorization (access). OIDC adds authentication (identity) via ID token.",
                "OIDC is a different protocol",
                "OAuth is for auth, OIDC for authorization",
                "No difference"
              ],
              "correctIndex": 0,
              "explanation": "OAuth 2.0 provides authorization. OIDC extends OAuth with an ID token (JWT containing user identity).",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design OAuth 2.0 flow for a mobile banking app with security considerations.",
              "answer": "1. System browser (not WebView) for auth. 2. User authenticates with MFA. 3. User consents to scopes (account_balance, transaction_history). 4. PKCE with S256 challenge method. 5. Authorization code exchange for tokens. 6. Short-lived access token (15 min) + refresh token with rotation. 7. Refresh token stored in OS keychain/keystore. 8. Certificate pinning for HTTPS. 9. App attestation (SafetyNet/DeviceCheck). 10. Biometric auth before token usage. 11. FAPI (Financial-grade API) compliance.",
              "difficulty": "expert",
              "company": "Stripe"
            },
            {
              "question": "How does Google's OAuth 2.0 implementation work?",
              "answer": "Developer registers app in Cloud Console, gets client_id and secret. App redirects to https://accounts.google.com/o/oauth2/v2/auth with client_id, redirect_uri, scope, state. User logs in, consents. Google redirects with authorization code. App exchanges at https://oauth2.googleapis.com/token. Google returns access_token, refresh_token, id_token (JWT for OIDC). Access token used in Authorization: Bearer header. Scopes define permissions like gmail.readonly. Tokens expire 3600s. User can revoke in Google Account settings.",
              "difficulty": "hard",
              "company": "Google"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "refresh-tokens",
          "title": "Refresh Tokens",
          "order": 3,
          "content": {
            "overview": "Refresh tokens are long-lived credentials used to obtain new access tokens without re-authentication. They are issued alongside access tokens and stored securely. Rotation and theft detection are critical security practices.",
            "problemStatement": "Access tokens are short-lived (15 min) to limit damage if stolen. Users shouldn't re-login every 15 minutes. Refresh tokens provide ongoing access securely with rotation and theft detection.",
            "intuitionFirst": "Access token = daily bus pass. Refresh token = monthly membership card. When daily pass expires, show membership card for new pass. If membership card lost, report it, old one replaced (rotation).",
            "realLifeAnalogy": "Hotel stay: check in (login), get room key card (access token) for one day. Your ID at front desk (refresh token) gets a new key each day without re-checking in. Lost ID? Front desk deactivates and issues new one.",
            "howItWorks": "On login, server issues access token (15 min) and refresh token (7 days). Refresh token stored as HttpOnly Secure SameSite cookie and hashed in DB. On refresh, validates refresh token, rotates (invalidates old, issues new), returns new access token. Theft detection: if rotated token is replayed, revoke all tokens.",
            "beginnerExample": "async function storeRefreshToken(userId, token) {\n  const hash = crypto.createHash('sha256').update(token).digest('hex');\n  await db.query('INSERT INTO refresh_tokens (user_id, token_hash, expires_at, family) VALUES ($1,$2,$3,$4)',\n    [userId, hash, new Date(Date.now() + 7*86400000), crypto.randomUUID()]);\n}\n\napp.post('/api/auth/refresh', async (req, res) => {\n  const token = req.cookies.refreshToken;\n  const hash = crypto.createHash('sha256').update(token).digest('hex');\n  const stored = await db.query('SELECT * FROM refresh_tokens WHERE token_hash = $1 AND expires_at > NOW()', [hash]);\n  if (!stored.rows.length) throw new AppError('Invalid', 401);\n\n  const { user_id, family } = stored.rows[0];\n  await db.query('DELETE FROM refresh_tokens WHERE id = $1', [stored.rows[0].id]); // Rotate\n\n  const newRefreshToken = crypto.randomUUID();\n  await storeRefreshToken(user_id, newRefreshToken);\n\n  const accessToken = jwt.sign({ sub: user_id }, ACCESS_SECRET, { expiresIn: '15m' });\n  res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 7*86400000 });\n  res.json({ accessToken });\n});",
            "commonMistakes": "Not rotating tokens (stolen token works forever). Not hashing in database. Storing in localStorage (XSS). Not setting cookie security flags. Not implementing theft detection.",
            "bestPractices": "Rotate on each use. Hash before storing. Use HttpOnly Secure SameSite cookie. Theft detection: if rotated token replayed, invalidate entire family. Token families grouped by issue event. Absolute + sliding expiration.",
            "interviewPerspective": "Refresh token security at FAANG level: (1) Rotation: each refresh invalidates old, issues new. (2) Theft detection: replayed rotated token = theft. (3) Token families for granular revocation. (4) Hashing in DB (sha256). (5) Absolute vs sliding expiration. (6) Concurrent sessions: multiple valid refresh tokens per user (one per device).",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-refresh-1",
              "question": "What is refresh token rotation?",
              "options": [
                "Each refresh invalidates the old token and issues a new one",
                "Token characters rotate periodically",
                "User rotates devices",
                "Token rolls over at midnight"
              ],
              "correctIndex": 0,
              "explanation": "Refresh token rotation means each refresh invalidates the old token and issues a new one.",
              "difficulty": "medium"
            },
            {
              "id": "be-refresh-2",
              "question": "Why hash refresh tokens in database?",
              "options": [
                "Defense-in-depth: DB breach doesn't expose usable tokens",
                "Save storage",
                "Improve performance",
                "Required by OAuth"
              ],
              "correctIndex": 0,
              "explanation": "Hashing ensures a database breach doesn't expose valid refresh tokens.",
              "difficulty": "hard"
            },
            {
              "id": "be-refresh-3",
              "question": "What if a rotated refresh token is replayed?",
              "options": [
                "Assume theft, revoke all tokens in the family",
                "Ignore it",
                "Reissue same token",
                "Block account permanently"
              ],
              "correctIndex": 0,
              "explanation": "If a rotated token is replayed, invalidate all tokens in that family due to probable theft.",
              "difficulty": "hard"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design refresh token system with theft detection for large-scale app. Balance security and UX.",
              "answer": "1. Token families per login. 2. On refresh, store old token hash with 5-min TTL. 3. If old token reused, increment theft counter. 4. Counter > 1: revoke family, force re-auth, notify user. 5. UX balance: device fingerprinting reduces false positives. Graduated response: first = alert, second = forced re-auth, third = account lock. Whitelist trusted devices. Step-up auth for sensitive ops.",
              "difficulty": "expert",
              "company": "Google"
            },
            {
              "question": "Compare cookie-based refresh tokens vs client memory storage for security.",
              "answer": "Cookie (HttpOnly Secure SameSite): Protected from XSS, auto-sent with credentials. Vulnerable to CSRF (mitigated by SameSite). Client memory/secure storage: Vulnerable to XSS if localStorage. Not auto-sent (no CSRF). Mobile apps use OS keychain/keystore. Best: Web uses HttpOnly Secure SameSite cookies. Mobile uses OS secure storage. Never localStorage.",
              "difficulty": "hard",
              "company": "Auth0"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "sessions",
          "title": "Sessions (cookies, express-session)",
          "order": 4,
          "content": {
            "overview": "Server-side sessions store user state on the server, identified by a session ID in a cookie. The session ID is sent with each request, and the server looks up session data from a store (Redis, database). express-session is the most popular middleware.",
            "problemStatement": "HTTP is stateless, but applications need to remember users. Sessions provide stateful layer by storing data server-side, indexed by session ID that client sends via cookie.",
            "intuitionFirst": "A session is like a locker at a gym. You get a key (session ID cookie) at check-in. Throughout your visit, you access your locker (session data) with the key. When you leave, key expires and locker is cleared.",
            "realLifeAnalogy": "Coat check at a restaurant: you hand over coat (login), get ticket (session cookie). Present ticket to get coat back (make request). Attendant finds coat (session data) using ticket number. Lost ticket? Re-authenticate.",
            "howItWorks": "On login, session middleware creates new session with unique ID, stores data in configured store (default MemoryStore), sends Set-Cookie with session ID. Browser sends cookie with subsequent requests. Middleware looks up session by ID and attaches to req.session.",
            "beginnerExample": "const session = require('express-session');\nconst RedisStore = require('connect-redis')(session);\n\napp.use(session({\n  store: new RedisStore({ client: redisClient }),\n  secret: 'your-secret-32-chars-min',\n  resave: false,\n  saveUninitialized: false,\n  cookie: { secure: true, httpOnly: true, sameSite: 'strict', maxAge: 24*60*60*1000 },\n  name: 'app.sid',\n  rolling: true,\n}));\n\napp.post('/api/login', async (req, res) => {\n  const user = await authenticate(req.body);\n  if (!user) return res.status(401).json({ error: 'Invalid' });\n  req.session.userId = user.id;\n  req.session.role = user.role;\n  res.json({ message: 'Logged in' });\n});\n\napp.get('/api/profile', (req, res) => {\n  if (!req.session.userId) return res.status(401).json({ error: 'Not authenticated' });\n  res.json({ userId: req.session.userId, role: req.session.role });\n});\n\napp.post('/api/logout', (req, res) => {\n  req.session.destroy(() => {\n    res.clearCookie('app.sid');\n    res.json({ message: 'Logged out' });\n  });\n});\n\n// Shopping cart in session\napp.post('/api/cart/add', (req, res) => {\n  if (!req.session.cart) req.session.cart = [];\n  req.session.cart.push(req.body.item);\n  res.json({ cart: req.session.cart });\n});",
            "commonMistakes": "Using MemoryStore in production (leaks, not shared). Not setting Secure/HttpOnly. Weak secrets. Not regenerating after login (fixation). Not destroying on logout. Using saveUninitialized: true.",
            "bestPractices": "Use Redis or DB store in production. Set secure, httpOnly, sameSite flags. Regenerate session after login (req.session.regenerate()). Destroy on logout. resave: false, saveUninitialized: false. Minimal session data.",
            "interviewPerspective": "Session management at FAANG: (1) Store comparison: MemoryStore (dev), Redis (best), DB (persistence), cookie-based (4KB max). (2) Session fixation: regenerate on privilege escalation. (3) Hijacking via XSS (HttpOnly prevents), network (HTTPS prevents). (4) Sticky sessions vs shared store. (5) Sessions vs JWT tradeoffs.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-sessions-1",
              "question": "What is the default session store for express-session?",
              "options": [
                "MemoryStore (not suitable for production)",
                "RedisStore",
                "DatabaseStore",
                "FileStore"
              ],
              "correctIndex": 0,
              "explanation": "Default is MemoryStore, which stores in process memory and doesn't scale across instances.",
              "difficulty": "easy"
            },
            {
              "id": "be-sessions-2",
              "question": "What is session fixation and how to prevent it?",
              "options": [
                "Attacker sets user's session ID before login. Prevent by regenerating after login.",
                "Session never expires. Prevent with maxAge.",
                "Leaks data. Prevent with HTTPS.",
                "Stolen via XSS. Prevent with HttpOnly."
              ],
              "correctIndex": 0,
              "explanation": "Session fixation: attacker gives user a known session ID, then uses it after user logs in. Prevention: regenerate session ID after login.",
              "difficulty": "medium"
            },
            {
              "id": "be-sessions-3",
              "question": "Why use a shared external session store in production?",
              "options": [
                "Multiple server instances need to access same session data for horizontal scaling",
                "External stores are faster",
                "Data is auto-encrypted",
                "Required by Express"
              ],
              "correctIndex": 0,
              "explanation": "A shared store (Redis) allows any server instance to access any session for horizontal scaling.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Compare sessions vs JWT for large e-commerce platform. Include scalability, security, UX.",
              "answer": "Sessions: Server controls lifecycle - instant revocation. More data server-side. HttpOnly cookies secure against XSS. Requires shared store (Redis) - adds cost/latency. JWT: Stateless - no server storage. Easy scaling. Works with mobile/APIs. Revocation requires blacklist. Vulnerable to XSS if localStorage. Recommendation: Sessions for web (HttpOnly cookies + Redis). JWTs for mobile API clients. Or hybrid: HttpOnly session cookie + JWT in Authorization header.",
              "difficulty": "hard",
              "company": "Amazon"
            },
            {
              "question": "How would you implement sessions for millions of concurrent users across data centers?",
              "answer": "Redis Cluster as distributed session store. Cross-region replication (Redis CRDTs). Consistent hashing for key distribution. Minimal session data (user ID, role, creation time). Absolute timeout (24h) + sliding expiration. Graceful degradation: read-only mode if Redis down. Session cleanup via TTL. Monitoring: hit rate, p99 latency, active session count.",
              "difficulty": "expert",
              "company": "Meta"
            }
          ],
          "codingChallenges": []
        }
      ]
    },
    {
      "slug": "security",
      "title": "Security",
      "description": "Protect your backend against XSS, CSRF, SQL injection, and other common vulnerabilities",
      "order": 7,
      "subtopics": [
        {
          "slug": "xss",
          "title": "XSS",
          "order": 1,
          "content": {
            "overview": "Cross-Site Scripting (XSS) injects malicious scripts into web pages viewed by other users. Untrusted data included in web content without proper validation or escaping enables session theft, credential harvesting, and defacement.",
            "problemStatement": "Applications display user-generated content (comments, bios, search queries). Without sanitization, attackers inject <script> tags that execute in other users' browsers, bypassing the same-origin policy.",
            "intuitionFirst": "XSS is like a message on a bulletin board that triggers an action when read, instead of just displaying text. Imagine a comment saying 'Hello! <script>stealYourCookies()</script>' that runs as if from the trusted site.",
            "realLifeAnalogy": "A note on a library book saying 'Free coffee - call this number.' When you call, you're charged. The library (trusted) displayed it without review. The note appeared to be from the library.",
            "howItWorks": "Three types: (1) Stored: malicious script stored on server (comment). (2) Reflected: reflected from server (search results). (3) DOM-based: client-side JS writes attacker-controlled data to DOM unsafely (innerHTML).",
            "beginnerExample": "// VULNERABLE\napp.get('/search', (req, res) => {\n  const query = req.query.q;\n  res.send(`<html>Results for: ${query}</html>`); // XSS!\n});\n\n// SAFE: template engine auto-escapes\napp.set('view engine', 'ejs');\napp.get('/search', (req, res) => {\n  res.render('search', { query: req.query.q }); // EJS escapes <%= %>\n});\n\n// SAFE: DOMPurify for rich text\nconst createDOMPurify = require('dompurify');\nconst { JSDOM } = require('jsdom');\nconst DOMPurify = createDOMPurify(new JSDOM('').window);\napp.post('/api/comment', (req, res) => {\n  const clean = DOMPurify.sanitize(req.body.comment);\n  storeComment(clean);\n});\n\n// SAFE: Content Security Policy\napp.use((req, res, next) => {\n  res.setHeader('Content-Security-Policy', \"default-src 'self'; script-src 'self'\");\n  next();\n});",
            "commonMistakes": "Rendering user input without escaping. Using innerHTML instead of textContent. No CSP. Ignoring XSS in URL params, headers, file uploads (SVG). Only client-side validation.",
            "bestPractices": "Context-sensitive escaping. Template engines with auto-escaping. CSP headers. DOMPurify for rich HTML. HttpOnly cookies. Validate and sanitize all input server-side.",
            "interviewPerspective": "XSS is fundamental at FAANG. Key: (1) Stored vs Reflected vs DOM-based. (2) Context-sensitive escaping (HTML body, attribute, URL, JS, CSS). (3) CSP as defense-in-depth. (4) React's auto-escaping (dangerouslySetInnerHTML bypasses). (5) XSS via SVG, CSS expressions, mXSS.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-xss-1",
              "question": "What are the three XSS types?",
              "options": [
                "Stored, Reflected, DOM-based",
                "GET, POST, Cookie",
                "Client, Server, Network",
                "Active, Passive, Hybrid"
              ],
              "correctIndex": 0,
              "explanation": "Stored (persistent), Reflected (non-persistent), DOM-based (client-side).",
              "difficulty": "easy"
            },
            {
              "id": "be-xss-2",
              "question": "Which header provides defense-in-depth against XSS?",
              "options": [
                "Content-Security-Policy",
                "X-Frame-Options",
                "Strict-Transport-Security",
                "X-Content-Type-Options"
              ],
              "correctIndex": 0,
              "explanation": "CSP is powerful defense-in-depth that restricts which scripts can execute.",
              "difficulty": "medium"
            },
            {
              "id": "be-xss-3",
              "question": "What is innerHTML vs textContent for XSS prevention?",
              "options": [
                "textContent treats as text (safe). innerHTML parses HTML (dangerous).",
                "innerHTML is safe",
                "Both equal",
                "textContent is faster"
              ],
              "correctIndex": 0,
              "explanation": "textContent sets text only. innerHTML parses string as HTML, executing embedded scripts.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "How does Content Security Policy work? Implement it for a React SPA using CDN resources.",
              "answer": "CSP via Content-Security-Policy header. Directives: default-src, script-src, style-src, img-src, connect-src. For React SPA with inline scripts: use nonce (matching header nonce) or hash (sha256). Better: move inline scripts to separate files. For CDN: include CDN domain in script-src. CSP Level 3 with strict-dynamic for modern approach.",
              "difficulty": "hard",
              "company": "Google"
            },
            {
              "question": "How does React/JSX protect against XSS? What are the bypass scenarios?",
              "answer": "React auto-escapes JSX expressions {}. Bypasses: (1) dangerouslySetInnerHTML. (2) href with javascript: protocol. (3) User data in event handlers. (4) SSR with dangerouslySetInnerHTML. (5) Third-party scripts. Prevention: avoid dangerouslySetInnerHTML, validate URLs, use DOMPurify, implement CSP.",
              "difficulty": "medium",
              "company": "Meta"
            }
          ],
          "codingChallenges": [
            {
              "title": "Build XSS Prevention Middleware",
              "description": "Create Express middleware removing XSS vectors from all request inputs: HTML entity encoding, script tag removal, event handler stripping.",
              "difficulty": "medium",
              "starterCode": "function xssSanitizer(req, res, next) {\n  function sanitize(obj) {\n    if (typeof obj === 'string') {\n      // Remove <script> tags\n      // Remove event handlers (onclick, onload)\n      // HTML entity encode\n      return obj;\n    }\n    if (Array.isArray(obj)) return obj.map(sanitize);\n    if (obj && typeof obj === 'object') {\n      for (const key of Object.keys(obj)) obj[key] = sanitize(obj[key]);\n    }\n    return obj;\n  }\n  req.query = sanitize(req.query);\n  req.body = sanitize(req.body);\n  req.params = sanitize(req.params);\n  next();\n}",
              "solutionHint": "Use regex to remove <script.*?>.*?</script> and <.*?on\\w+=.*?>. Encod: < > & \". Consider 'xss' npm package for production."
            }
          ]
        },
        {
          "slug": "csrf",
          "title": "CSRF",
          "order": 2,
          "content": {
            "overview": "Cross-Site Request Forgery (CSRF) tricks a victim into performing actions on an application where they're authenticated. The attacker forges requests (form, image, AJAX) that execute actions using the victim's session cookies.",
            "problemStatement": "Browsers automatically send cookies with requests to the origin domain. If a logged-in user visits an attacker's page that submits a form to the bank's transfer endpoint, the browser includes session cookies, processing the forged request.",
            "intuitionFirst": "CSRF is like a pickpocket using your hand to sign a check. You're at a market (attacker's page). Someone takes your hand (your session), guides it to sign a check. Your hand, but not your intent.",
            "realLifeAnalogy": "A valet parking scam: you give your car keys (session) to a valet. The valet copies the key and steals your car later (forged request). You willingly gave the keys, but not for that purpose.",
            "howItWorks": "1. User logs into bank.com (gets session cookie). 2. User visits attacker.com. 3. attacker.com has <img src='https://bank.com/transfer?amount=1000&to=attacker'>. 4. Browser sends request with session cookie. 5. Bank processes transfer as authenticated.",
            "beginnerExample": "// CSRF Token pattern\napp.get('/api/csrf-token', (req, res) => {\n  if (!req.session.csrfToken) {\n    req.session.csrfToken = crypto.randomBytes(32).toString('hex');\n  }\n  res.json({ csrfToken: req.session.csrfToken });\n});\n\nfunction csrfProtection(req, res, next) {\n  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();\n  const token = req.headers['x-csrf-token'];\n  if (!token || token !== req.session.csrfToken) {\n    return res.status(403).json({ error: 'CSRF failed' });\n  }\n  next();\n}\napp.use(csrfProtection);\n\n// SameSite cookie (modern approach)\napp.use(session({\n  cookie: { sameSite: 'strict', secure: true }\n}));\n\n// Origin validation\napp.use((req, res, next) => {\n  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();\n  const origin = req.headers.origin;\n  const allowed = ['https://myapp.com'];\n  if (origin && !allowed.includes(origin)) return res.status(403).json({ error: 'Invalid origin' });\n  next();\n});",
            "commonMistakes": "Only protecting POST not PUT/PATCH/DELETE. Using double-submit cookie incorrectly. Assuming JSON content-type protects. Not setting SameSite.",
            "bestPractices": "SameSite=Strict or Lax cookies (best modern defense). CSRF token pattern for critical ops. Validate Origin/Referer. Custom headers (X-Requested-By). Never rely on JSON content-type alone.",
            "interviewPerspective": "CSRF less emphasized due to SameSite, but still tested. Key: (1) SameSite: Strict (no cross-site cookies), Lax (GET navigations), None (no protection). (2) CSRF token pattern. (3) Why JSON content-type not sufficient (Flash/plugins historically could forge). (4) CSRF vs XSS: XSS bypasses all CSRF protection. (5) OAuth state parameter prevents CSRF on OAuth.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-csrf-1",
              "question": "What is a CSRF attack?",
              "options": [
                "Tricks authenticated user into performing unintended actions via forged requests",
                "Injects malicious scripts",
                "Steals session cookies",
                "Brute-forces passwords"
              ],
              "correctIndex": 0,
              "explanation": "CSRF tricks the victim's browser into sending forged authenticated requests.",
              "difficulty": "easy"
            },
            {
              "id": "be-csrf-2",
              "question": "Which SameSite value provides strongest CSRF protection?",
              "options": [
                "SameSite=Strict",
                "SameSite=Lax",
                "SameSite=None",
                "SameSite=Secure"
              ],
              "correctIndex": 0,
              "explanation": "Strict prevents cookies on all cross-site requests. Lax allows top-level GET navigations.",
              "difficulty": "hard"
            },
            {
              "id": "be-csrf-3",
              "question": "Why does JSON content-type not fully protect against CSRF?",
              "options": [
                "Legacy Flash could force text/plain encoding, CORS misconfig could allow cross-origin JSON",
                "JSON is always safe",
                "Depends on browser",
                "CSRF only works with XML"
              ],
              "correctIndex": 0,
              "explanation": "Historically, Flash could craft requests with application/json. CORS misconfig can also allow it.",
              "difficulty": "hard"
            }
          ],
          "faangQuestions": [
            {
              "question": "How do SameSite cookies work? Strict vs Lax vs None tradeoffs?",
              "answer": "Strict: never sent cross-site. Strongest CSRF. Breaks: clicking link from email (logged out). Lax: sent for top-level GET navigations. Protects POST/PUT/DELETE. Default in Chrome 80+. None+Secure: sent on all cross-site requests. No CSRF protection. Used for third-party integrations. Tradeoff: Strict most secure but breaks UX for inbound links. Lax recommended default.",
              "difficulty": "hard",
              "company": "Google"
            },
            {
              "question": "Design comprehensive CSRF protection for Express API with cookie and token auth.",
              "answer": "For cookie auth: SameSite=Lax on session cookies. CSRF token pattern: token in session, served via GET /csrf-token, required on state-changing requests as X-CSRF-Token. Validate Origin header. For Bearer token auth: No CSRF risk (tokens sent explicitly in headers). CORS restrictively configured. GraphQL: CSRF crucial since POST. Use SameSite=Lax or require specific Content-Type + custom headers.",
              "difficulty": "expert",
              "company": "Netflix"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "sql-injection",
          "title": "SQL Injection",
          "order": 3,
          "content": {
            "overview": "SQL Injection injects malicious SQL into application queries. Unsanitized input can read, modify, or delete database data, and sometimes execute administrative operations on the database server.",
            "problemStatement": "Applications often construct SQL queries by concatenating user input. Attackers provide crafted input that breaks out of the intended SQL context and executes arbitrary commands.",
            "intuitionFirst": "SQL Injection is like a bank teller letting you fill part of a withdrawal form. You write 'Withdraw $1000 OR give me all vault money'. Because the teller combines your text with the template, the OR changes the entire meaning.",
            "realLifeAnalogy": "A smart home assistant: 'Turn on lights' works. But 'Turn on lights AND unlock doors AND disarm alarm' executes all commands because input isn't validated.",
            "howItWorks": "Input like ' OR 1=1 -- in login can bypass auth. Query: SELECT * FROM users WHERE username = ' + input + ' AND password = ' + pw + ' becomes: WHERE username = '' OR 1=1 --' AND password = '...'. OR 1=1 returns all users, -- comments out password check.",
            "beginnerExample": "// VULNERABLE\nconst query = `SELECT * FROM users WHERE id = ${req.query.id}`;\n// Input '1; DROP TABLE users;--' deletes table!\n\n// SAFE: Parameterized query (PostgreSQL)\nawait db.query('SELECT * FROM users WHERE id = $1', [req.query.id]);\n\n// SAFE: Prisma ORM\nawait prisma.user.findUnique({ where: { id: Number(req.query.id) } });\n\n// SAFE: Knex\nawait knex('users').where('id', req.query.id);\n\n// DANGEROUS: ORM raw unsafe\nawait prisma.$queryRawUnsafe(`SELECT * FROM users WHERE id = ${id}`); // BAD!\n// SAFE:\nawait prisma.$queryRaw`SELECT * FROM users WHERE id = ${parseInt(id)}`;",
            "commonMistakes": "String concatenation in SQL. ORM raw methods with interpolation. Not validating types. Dynamic table/column names without allowlist. Assuming stored procedures are safe.",
            "bestPractices": "Parameterized queries always. Use ORMs (Prisma, Sequelize). For dynamic identifiers: validate against allowlist. Input validation as first defense. Least-privilege DB users. Database firewalls.",
            "interviewPerspective": "SQL Injection is fundamental. Key: (1) Parameterized queries separate SQL from data. (2) Prepared statements vs escaping. (3) Second-order SQLi: stored malicious data later used unsafely. (4) Blind SQLi: extract data via true/false conditions. (5) NoSQL injection: MongoDB $where. (6) Defense: WAF + parameterized queries + validation + least privilege.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-sqli-1",
              "question": "What is the primary defense against SQL injection?",
              "options": [
                "Parameterized queries (prepared statements)",
                "Input validation with regex",
                "Stored procedures",
                "Escaping quotes"
              ],
              "correctIndex": 0,
              "explanation": "Parameterized queries separate SQL code from data, preventing input from being interpreted as SQL.",
              "difficulty": "easy"
            },
            {
              "id": "be-sqli-2",
              "question": "Can stored procedures be vulnerable to SQL injection?",
              "options": [
                "Yes, if they build SQL dynamically with concatenated input",
                "No, always safe",
                "Only in PL/SQL",
                "Only in MySQL"
              ],
              "correctIndex": 0,
              "explanation": "Stored procedures using EXECUTE with concatenated input are equally vulnerable.",
              "difficulty": "hard"
            },
            {
              "id": "be-sqli-3",
              "question": "What is second-order SQL injection?",
              "options": [
                "Malicious input stored safely then retrieved and used unsafely in another query",
                "Second injection after first fails",
                "Injection via headers",
                "Delayed blind injection"
              ],
              "correctIndex": 0,
              "explanation": "Second-order: attacker stores malicious data safely (parameterized insert), later another feature concatenates it into a SQL string.",
              "difficulty": "hard"
            }
          ],
          "faangQuestions": [
            {
              "question": "How do parameterized queries prevent SQL injection? What happens at database level?",
              "answer": "Parameterized queries separate SQL structure from data. SQL template sent to DB first. DB parses, compiles, optimizes the structure. Data values sent separately, bound to placeholders. DB treats data purely as values, never SQL syntax. Internally: Parse (build parse tree) -> Bind (fill placeholders, escape per column type) -> Execute. SQL injection impossible because query structure is fixed before user data is seen.",
              "difficulty": "medium",
              "company": "Google"
            },
            {
              "question": "How do you protect against SQL injection with dynamic table/column names?",
              "answer": "Parameterized queries only protect values, not identifiers. For dynamic identifiers: (1) Validate against strict allowlist: const allowed = ['name', 'email']; if (!allowed.includes(input)) throw Error(). (2) Map user names to actual names: const map = { name: 'full_name' }. (3) Never use user input directly as identifier.",
              "difficulty": "hard",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "rate-limiting",
          "title": "Rate Limiting",
          "order": 4,
          "content": {
            "overview": "Rate limiting controls traffic rate from a client to a server. It prevents abuse, brute-force attacks, and resource exhaustion by limiting requests within a time window. Applied per IP, user, API key, or globally.",
            "problemStatement": "Without rate limiting, bad actors brute-force passwords, DDoS servers, scrape data, or exhaust quotas. Even buggy clients with retry storms can overwhelm servers.",
            "intuitionFirst": "Rate limiting is like a bouncer who only lets in a certain number of people per minute. Someone rushing (excessive requests) is blocked. Legitimate guests enter smoothly. VIPs (higher tiers) get different limits.",
            "realLifeAnalogy": "Amusement park ride: 30 people per hour capacity. The park uses queues (rate limiting) to manage flow: Fast Pass (higher tier) gets 5-min waits, regular gets 30-min waits. Everyone gets fair access.",
            "howItWorks": "Algorithms: (1) Fixed Window: counts in fixed window. Simple but boundary bursts. (2) Sliding Window Log: timestamp tracking. Accurate but memory heavy. (3) Sliding Window Counter: weighted count from previous window. Good balance. (4) Token Bucket: stead rate, allows bursts. (5) Leaky Bucket: constant rate, queues excess.",
            "beginnerExample": "const rateLimit = require('express-rate-limit');\n\n// Global limiter\nconst limiter = rateLimit({\n  windowMs: 15 * 60 * 1000,\n  max: 100,\n  message: { error: 'Too many requests', retryAfter: '15 min' }\n});\napp.use('/api/', limiter);\n\n// Auth limiter\nconst authLimiter = rateLimit({\n  windowMs: 60 * 1000,\n  max: 5,\n  message: { error: 'Too many login attempts' }\n});\napp.use('/api/auth/login', authLimiter);\n\n// Per-user with Redis\nasync function perUserRateLimit(req, res, next) {\n  const key = `ratelimit:${req.user?.id || req.ip}`;\n  const limit = 100;\n  const current = await redis.incr(key);\n  if (current === 1) await redis.expire(key, 60);\n  if (current > limit) {\n    const ttl = await redis.ttl(key);\n    res.set('Retry-After', ttl.toString());\n    return res.status(429).json({ error: 'Rate limit exceeded', retryAfter: ttl });\n  }\n  res.set('X-RateLimit-Remaining', (limit - current).toString());\n  next();\n}\n\n// Token bucket\nclass TokenBucket {\n  constructor(capacity, refillRate, refillMs) {\n    this.capacity = capacity;\n    this.tokens = capacity;\n    this.refillRate = refillRate;\n    this.refillMs = refillMs;\n    this.lastRefill = Date.now();\n  }\n  tryConsume(count = 1) {\n    this._refill();\n    if (this.tokens >= count) { this.tokens -= count; return true; }\n    return false;\n  }\n  _refill() {\n    const elapsed = Date.now() - this.lastRefill;\n    const refill = Math.floor(elapsed / this.refillMs) * this.refillRate;\n    if (refill > 0) { this.tokens = Math.min(this.capacity, this.tokens + refill); this.lastRefill = Date.now(); }\n  }\n}",
            "commonMistakes": "IP-only limiting (NAT, botnets). Not differentiating expensive endpoints. Fixed window boundary bursts. Not returning Retry-After. Too aggressive (blocking legitimate users).",
            "bestPractices": "Sliding window or token bucket. Rate limit by user if authenticated, IP fallback. Return 429 with Retry-After. Different limits per endpoint. Rate limit headers. Distributed (Redis). Graduated limiting.",
            "interviewPerspective": "Rate limiting is common system design topic. Key: (1) Algorithms comparison. (2) Distributed with Redis (INCR, TTL, sorted sets). (3) Layers: API gateway, app middleware, CDN. (4) Response headers. (5) Real-world: Twitter 15-min window, GitHub complexity-based. (6) Google: per-project quotas via Cloud Quotas API.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-ratelimit-1",
              "question": "What status code for rate limiting?",
              "options": [
                "429 Too Many Requests",
                "503 Service Unavailable",
                "403 Forbidden",
                "400 Bad Request"
              ],
              "correctIndex": 0,
              "explanation": "429 Too Many Requests with Retry-After header is the standard rate limiting response.",
              "difficulty": "easy"
            },
            {
              "id": "be-ratelimit-2",
              "question": "What is fixed window's main disadvantage?",
              "options": [
                "Boundary bursts of 2x limit (requests at window edges)",
                "More complex to implement",
                "Doesn't work with Redis",
                "More memory"
              ],
              "correctIndex": 0,
              "explanation": "Fixed window allows 100 requests at 00:59 and 100 at 01:01 = 200 in 2 seconds within limit.",
              "difficulty": "hard"
            },
            {
              "id": "be-ratelimit-3",
              "question": "How does token bucket differ from fixed window?",
              "options": [
                "Allows bursts up to bucket capacity while enforces steady long-term rate",
                "Token bucket is slower",
                "Counts without time windows",
                "Only works with TCP"
              ],
              "correctIndex": 0,
              "explanation": "Token bucket allows short bursts up to capacity while enforcing steady refill rate.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design distributed rate limiter for API with millions of users.",
              "answer": "Redis Cluster for distributed counting. Sliding Window Counter: fixed window counter + weighted previous window. Lua scripts for atomic ops. Multi-tier: global (1000 req/s), per-user (100 req/s), per-endpoint (10 req/s). API gateway (Envoy/Kong) for global limits. App layer for per-user limits. Graceful degradation: local in-memory fallback if Redis down. Async logging of rate limit events.",
              "difficulty": "expert",
              "company": "Cloudflare"
            },
            {
              "question": "How to handle rate limiting for multi-tenant SaaS with different tiers?",
              "answer": "Tier-based quotas (free: 1000/h, pro: 10000/h, enterprise: unlimited). Rate limiter reads tier from JWT/API key. Redis: ratelimit:{tier}:{key}:{endpoint}. Hard limit (429) vs soft limit (warn headers). Burst allowance: token bucket with 2x capacity. Global per-IP limit regardless of tier. Warn at 80%, notify at 100%. Enterprise can exceed and be billed.",
              "difficulty": "hard",
              "company": "Stripe"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "helmet",
          "title": "Helmet",
          "order": 5,
          "content": {
            "overview": "Helmet is Express.js middleware that sets HTTP security headers against common web vulnerabilities. It helps prevent XSS, clickjacking, MIME sniffing, and other attacks via headers like CSP, X-Frame-Options, HSTS.",
            "problemStatement": "Web frameworks don't set security headers by default. Missing headers leave apps vulnerable. Helmet automatically sets 15+ security headers with sensible defaults.",
            "intuitionFirst": "Helmet is like a security guard pre-trained with best-practice policies. You can customize rules, but defaults protect against the most common threats.",
            "realLifeAnalogy": "An apartment with basic locks. Helmet upgrades to full system: deadbolt (HSTS), chain lock (X-Frame-Options), peephole (CSP), door alarm (XSS Protection), camera (X-Content-Type-Options). One installation.",
            "howItWorks": "Helmet wraps 15 middleware functions. Calling app.use(helmet()) applies: contentSecurityPolicy, crossOriginEmbedderPolicy, crossOriginOpenerPolicy, crossOriginResourcePolicy, dnsPrefetchControl, frameguard (X-Frame-Options), hidePoweredBy, hsts (HSTS), ieNoOpen, noSniff, originAgentCluster, permittedCrossDomainPolicies, referrerPolicy, xssFilter.",
            "beginnerExample": "const helmet = require('helmet');\n\n// All defaults\napp.use(helmet());\n\n// Custom\napp.use(helmet({\n  contentSecurityPolicy: {\n    directives: {\n      defaultSrc: [\"'self'\"],\n      scriptSrc: [\"'self'\", 'https://cdn.example.com'],\n      styleSrc: [\"'self'\", \"'unsafe-inline'\"],\n      imgSrc: [\"'self'\", 'data:'],\n      connectSrc: [\"'self'\", 'https://api.example.com'],\n    },\n  },\n  frameguard: { action: 'deny' },\n  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },\n  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },\n}));",
            "commonMistakes": "Disabling features without understanding them. Using too permissive CSP. Not configuring HSTS maxAge enough. Forgetting preload directive. Not customizing for app needs.",
            "bestPractices": "Use Helmet defaults as starting point. Customize CSP for your application needs. Enable HSTS preload for max security. Set appropriate frameguard. Test thoroughly before deployment.",
            "interviewPerspective": "Helmet is expected knowledge for Node.js security. Discuss each header's purpose: (1) CSP prevents XSS. (2) HSTS enforces HTTPS. (3) X-Frame-Options prevents clickjacking. (4) X-Content-Type-Options prevents MIME sniffing. (5) X-XSS-Protection enables browser XSS filter. (6) Referrer-Policy controls referrer header. (7) Hide-Powered-By removes Express fingerprint.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-helmet-1",
              "question": "What does app.use(helmet()) do?",
              "options": [
                "Sets multiple HTTP security headers with sensible defaults",
                "Encrypts all API responses",
                "Prevents all security attacks",
                "Replaces HTTPS"
              ],
              "correctIndex": 0,
              "explanation": "Helmet sets 15+ HTTP security headers including CSP, HSTS, X-Frame-Options, X-Content-Type-Options.",
              "difficulty": "easy"
            },
            {
              "id": "be-helmet-2",
              "question": "Which Helmet feature prevents clickjacking?",
              "options": [
                "frameguard (sets X-Frame-Options)",
                "hsts",
                "csp",
                "noSniff"
              ],
              "correctIndex": 0,
              "explanation": "Frameguard sets X-Frame-Options header to prevent your page from being embedded in iframes on other sites.",
              "difficulty": "medium"
            },
            {
              "id": "be-helmet-3",
              "question": "What is the purpose of X-Content-Type-Options: nosniff?",
              "options": [
                "Prevents MIME type sniffing, forcing browser to use declared Content-Type",
                "Enables gzip compression",
                "Sets cookie options",
                "Configures CORS"
              ],
              "correctIndex": 0,
              "explanation": "It prevents browsers from MIME-type sniffing, reducing risk of malicious file execution.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Describe each security header Helmet sets and what attack it prevents. How would you configure them for a production API?",
              "answer": "1. Content-Security-Policy (XSS): restricts script sources. 2. Strict-Transport-Security (SSL stripping): enforces HTTPS. 3. X-Frame-Options (clickjacking): prevents iframe embedding. 4. X-Content-Type-Options (MIME sniffing): forces declared type. 5. X-XSS-Protection (XSS): enables browser filter. 6. Referrer-Policy (leakage): controls referrer info. 7. Cache-Control (caching): prevents sensitive data caching. 8. X-Powered-By (fingerprinting): removes Express header. Configuration: CSP with strict directives, HSTS with preload, frameguard deny, referrer-policy strict-origin-when-cross-origin.",
              "difficulty": "hard",
              "company": "Google"
            },
            {
              "question": "How does Helmet's HSTS header work with browser preload lists?",
              "answer": "HSTS tells browsers to only connect via HTTPS. maxAge: how long to enforce. includeSubDomains: applies to subdomains. preload: signals browsers to include in preload list (hardcoded in browsers). Submit domain to hstspreload.org. Once preloaded, first visit is HTTPS-only. Cannot be undone easily.",
              "difficulty": "hard",
              "company": "Cloudflare"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "cors",
          "title": "CORS",
          "order": 6,
          "content": {
            "overview": "CORS (Cross-Origin Resource Sharing) is a security mechanism that allows servers to specify which origins can access their resources. It relaxes the same-origin policy while maintaining security through HTTP headers.",
            "problemStatement": "The same-origin policy prevents web pages from making requests to different domains. This breaks legitimate cross-origin requests (API from different domain, CDN resources). CORS provides a controlled way to relax this policy.",
            "intuitionFirst": "CORS is like a VIP list at an exclusive club. The same-origin policy is the bouncer blocking everyone. CORS is the manager giving a list of who is allowed in. Only those on the list get through.",
            "realLifeAnalogy": "A company with a guest list system. To enter a restricted building, you must be on the guest list (Access-Control-Allow-Origin). Some guests can bring plus-ones (credentials). The receptionist asks what you need (preflight). Your badge type determines access levels (methods, headers).",
            "howItWorks": "Browser sends Origin header. Server responds with Access-Control-Allow-Origin. If match, browser processes response. For non-simple requests (PUT, DELETE, custom headers, application/json), browser sends OPTIONS preflight with Access-Control-Request-Method and Access-Control-Request-Headers. Server responds with allowed origins, methods, headers.",
            "beginnerExample": "const cors = require('cors');\n\n// Allow all (development only)\napp.use(cors());\n\n// Specific origin\napp.use(cors({\n  origin: 'https://myapp.com',\n  methods: ['GET', 'POST', 'PUT', 'DELETE'],\n  allowedHeaders: ['Content-Type', 'Authorization'],\n  credentials: true, // Allow cookies/auth headers\n  maxAge: 86400, // Cache preflight for 24h\n}));\n\n// Dynamic origin\nconst allowedOrigins = ['https://app.com', 'https://admin.app.com'];\napp.use(cors({\n  origin: (origin, callback) => {\n    if (!origin || allowedOrigins.includes(origin)) {\n      callback(null, true);\n    } else {\n      callback(new Error('Not allowed by CORS'));\n    }\n  },\n  credentials: true,\n}));\n\n// Manual CORS headers\napp.use((req, res, next) => {\n  res.header('Access-Control-Allow-Origin', 'https://myapp.com');\n  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');\n  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');\n  if (req.method === 'OPTIONS') return res.sendStatus(200); // Preflight\n  next();\n});",
            "commonMistakes": "Using Access-Control-Allow-Origin: * with credentials (browser blocks). Not handling preflight OPTIONS requests. Allowing too many origins. Not caching preflight responses (maxAge). Ignoring CORS errors thinking server misconfigured (usually browser side).",
            "bestPractices": "Specify exact origins (not *). Use credentials: true only with specific origins. Configure allowed methods and headers explicitly. Cache preflight with maxAge. Handle OPTIONS requests. Use environment-specific CORS config (staging differs from production).",
            "interviewPerspective": "CORS is fundamental for FAANG API design. Deep understanding: (1) Simple vs preflight requests - what triggers preflight. (2) CORS headers: Access-Control-Allow-Origin, Allow-Methods, Allow-Headers, Allow-Credentials, Expose-Headers, Max-Age. (3) Why * doesn't work with credentials. (4) CORS at API gateway layer. (5) How CDNs handle CORS. (6) CORS vs JSONP (legacy). (7) How browsers enforce CORS - the server still receives the request. (8) CORS for WebSockets - not enforced by browsers.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-cors-1",
              "question": "What triggers a CORS preflight request?",
              "options": [
                "Non-simple requests (PUT, DELETE, custom headers, application/json)",
                "All cross-origin requests",
                "Only POST requests",
                "Only GET requests"
              ],
              "correctIndex": 0,
              "explanation": "Preflight is triggered by non-simple requests: PUT, DELETE, PATCH, custom headers, or non-standard content types.",
              "difficulty": "medium"
            },
            {
              "id": "be-cors-2",
              "question": "Why can't you use Access-Control-Allow-Origin: * with credentials?",
              "options": [
                "Browser blocks wildcard origins with credentials for security (would allow any site to send cookies)",
                "It's technically impossible",
                "HTTP doesn't support it",
                "The server must configure it"
              ],
              "correctIndex": 0,
              "explanation": "For security, browsers block Access-Control-Allow-Origin: * when credentials: true is set. The origin must be explicitly specified.",
              "difficulty": "hard"
            },
            {
              "id": "be-cors-3",
              "question": "What HTTP method does the browser use for CORS preflight?",
              "options": [
                "OPTIONS",
                "HEAD",
                "GET",
                "PREFLIGHT"
              ],
              "correctIndex": 0,
              "explanation": "The browser sends an OPTIONS request for CORS preflight, asking the server what methods and headers are allowed.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "How does CORS work at the browser level? Explain same-origin policy and how CORS relaxes it.",
              "answer": "Same-origin policy: browser blocks responses from cross-origin requests (different protocol, domain, or port) initiated by JavaScript (fetch, XHR). Browser still sends the request - the server receives and processes it. But browser hides the response from JavaScript unless CORS headers permit. CORS works: (1) Browser adds Origin header. (2) If response has Access-Control-Allow-Origin matching the origin, browser exposes response. (3) For non-simple, browser sends preflight OPTIONS, then actual request only if preflight succeeds. This is critical: CORS is browser-enforced - server still gets all requests.",
              "difficulty": "hard",
              "company": "Mozilla"
            },
            {
              "question": "Design CORS configuration for a multi-service microservices architecture with different origins.",
              "answer": "API gateway handles CORS centrally. Gateway configures: allowedOrigins = ['https://app.com', 'https://admin.com', 'https://partner.com']. Different allowed methods per endpoint: public (GET), admin (GET,POST,PUT,DELETE). Credentials for app.com and admin.com (cookies). No credentials for partner.com (API key instead). Preflight caching: maxAge 86400. Downstream services don't set CORS headers (gateway strips and adds). Microservices behind gateway use internal network, no CORS needed. When adding new client (mobile app): mobile SDK doesn't enforce CORS - only browsers do.",
              "difficulty": "hard",
              "company": "Netflix"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "bcrypt",
          "title": "Bcrypt",
          "order": 7,
          "content": {
            "overview": "Bcrypt is a password hashing function designed for secure password storage. It incorporates a salt to protect against rainbow table attacks and an adaptive cost factor that makes it resistant to brute-force attacks as hardware improves.",
            "problemStatement": "Storing passwords in plaintext or with weak hashing (MD5, SHA-1, SHA-256) is dangerous. Attackers who breach the database immediately get all passwords. Even hashed passwords are vulnerable to rainbow tables and fast brute-force with GPUs.",
            "intuitionFirst": "Bcrypt is like a slow, deliberate paper shredder. Unlike a fast hash (MD5) that's like quickly crumpling paper, bcrypt takes time and effort. Using the same password creates different results each time (salt). As computers get faster, you can make the shredder slower (cost factor).",
            "realLifeAnalogy": "A bank vault with a timed lock: even if robbers get the vault open (DB breach), each safety deposit box (password) requires a separate slow process to open. Making it slow means even with many boxes, each takes significant time to crack.",
            "howItWorks": "Bcrypt generates a random salt (16 bytes), combines with password, and applies Blowfish cipher with configurable cost factor (rounds = 2^cost). Output includes algorithm, cost, salt, and hash. Verification: extracts salt from stored hash, re-computes hash with provided password, compares.",
            "beginnerExample": "const bcrypt = require('bcrypt');\nconst SALT_ROUNDS = 12; // ~250ms on modern hardware\n\n// Hashing a password\nasync function hashPassword(plainPassword) {\n  const salt = await bcrypt.genSalt(SALT_ROUNDS);\n  const hash = await bcrypt.hash(plainPassword, salt);\n  return hash;\n  // Hash format: $2b$12$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\n  // $2b = algorithm, 12 = cost, then base64 salt(22) + hash(31)\n}\n\n// Verifying\nasync function verifyPassword(plainPassword, storedHash) {\n  return await bcrypt.compare(plainPassword, storedHash);\n}\n\n// Registration\napp.post('/api/register', async (req, res) => {\n  const { email, password } = req.body;\n  const hash = await hashPassword(password);\n  await db.query('INSERT INTO users (email, password_hash) VALUES ($1, $2)', [email, hash]);\n  res.status(201).json({ message: 'User created' });\n});\n\n// Login\napp.post('/api/login', async (req, res) => {\n  const { email, password } = req.body;\n  const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);\n  if (!user.rows.length) return res.status(401).json({ error: 'Invalid credentials' });\n\n  const valid = await verifyPassword(password, user.rows[0].password_hash);\n  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });\n\n  // Login successful - issue tokens\n});\n\n// Security note: bcrypt.compare automatically extracts salt from hash\n// Also timing-safe - prevents timing attacks\n\n// Cost factor benchmark\nasync function benchmarkCost(targetMs = 250) {\n  for (let cost = 4; cost <= 16; cost++) {\n    const start = Date.now();\n    await bcrypt.hash('test', cost);\n    const elapsed = Date.now() - start;\n    console.log(`Cost ${cost}: ${elapsed}ms`);\n    if (elapsed > targetMs) return cost;\n  }\n  return 12;\n}",
            "commonMistakes": "Using too low cost factor (< 10). Using fast hashes (MD5, SHA-256) for passwords. Not hashing at all. Truncating bcrypt hashes (they are 60 chars). Using bcrypt for anything other than passwords (it's not a general-purpose hash).",
            "bestPractices": "Cost factor 10-14 (tune to ~250ms on your hardware). Always use bcrypt.genSalt + bcrypt.hash (or bcrypt.hashSync for CLI tools). Never store plaintext or reversibly encrypted passwords. Use bcrypt.compare for verification (automatic salt extraction). Implement rate limiting on login. Use pepper (secret key combined with password before hashing) for defense-in-depth.",
            "interviewPerspective": "Password hashing is essential FAANG knowledge. Key topics: (1) Why bcrypt over SHA/MD5: includes salt, adaptive cost, timing-safe comparison. (2) How bcrypt works internally: Blowfish cipher, Eksblowfish algorithm, salt generation. (3) Cost factor tuning: target ~250ms (security vs UX). (4) Rainbow table resistance via salt. (5) GPU/ASIC resistance: bcrypt is memory-hard and computationally expensive. (6) Alternatives: scrypt (memory-hard), Argon2 (modern, recommended). (7) Pepper: application-level secret combined with password before bcrypt, stored separately from database.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-bcrypt-1",
              "question": "Why is bcrypt preferred over SHA-256 for passwords?",
              "options": [
                "Bcrypt includes salt, is adaptively slow, and uses timing-safe comparison",
                "SHA-256 is broken",
                "Bcrypt produces shorter hashes",
                "SHA-256 cannot hash passwords"
              ],
              "correctIndex": 0,
              "explanation": "Bcrypt includes salt (rainbow table resistance), adaptive cost (slow, resists brute-force), and timing-safe comparison.",
              "difficulty": "medium"
            },
            {
              "id": "be-bcrypt-2",
              "question": "What does the cost factor in bcrypt control?",
              "options": [
                "Number of rounds (2^cost), making hashing exponentially slower as cost increases",
                "The length of the hash output",
                "The type of salt used",
                "The encryption algorithm"
              ],
              "correctIndex": 0,
              "explanation": "Cost factor determines rounds = 2^cost. Each increment doubles the work, making brute-force exponentially harder.",
              "difficulty": "medium"
            },
            {
              "id": "be-bcrypt-3",
              "question": "How does bcrypt.compare extract the salt from a stored hash?",
              "options": [
                "The salt is embedded in the bcrypt hash string itself (algorithm$cost$salt+hash)",
                "Salt is stored separately in the database",
                "Salt is derived from the user's email",
                "Bcrypt doesn't use salt"
              ],
              "correctIndex": 0,
              "explanation": "Bcrypt hash format includes algorithm, cost, salt (22 chars), and hash (31 chars). compare() parses the salt from the stored hash.",
              "difficulty": "hard"
            },
            {
              "id": "be-bcrypt-4",
              "question": "What is a pepper in password hashing?",
              "options": [
                "A secret key combined with the password before hashing, stored separately from the database",
                "A spice used in random salt generation",
                "An additional hash iteration",
                "A type of bcrypt cost factor"
              ],
              "correctIndex": 0,
              "explanation": "A pepper is a secret value mixed with the password before hashing, stored separately (env variable, HSM). Provides defense-in-depth if database is breached but pepper isn't.",
              "difficulty": "hard"
            }
          ],
          "faangQuestions": [
            {
              "question": "Compare bcrypt, scrypt, and Argon2 for password hashing. Which would you choose and why?",
              "answer": "Bcrypt: Most widely used, well-tested, uses Blowfish cipher. Cost factor up to ~250ms. Good GPU resistance but less memory-hard. Scrypt: Memory-hard (uses significant memory), better GPU/ASIC resistance than bcrypt. Used by Litecoin, some cryptos. Argon2: Modern, most memory-hard, winner of Password Hashing Competition. Three variants: Argon2d (GPU-resistant), Argon2i (side-channel resistant), Argon2id (hybrid). Recommended by OWASP. At FAANG: Google uses scrypt internally. For new systems: Argon2id with appropriate memory (64MB) and parallelism (4). For legacy: bcrypt with cost 12+. Migration: rehash on next login with new algorithm, store algorithm version in hash prefix.",
              "difficulty": "expert",
              "company": "Google"
            },
            {
              "question": "How does bcrypt prevent rainbow table and brute-force attacks? Explain the mathematics.",
              "answer": "Rainbow table prevention: bcrypt generates a cryptographically random 128-bit salt, combined with password before hashing. This means each possible password has 2^128 possible hashes. Pre-computing rainbow tables for bcrypt is infeasible. Brute-force prevention: cost factor (2^rounds). At cost 12 = 4096 rounds, each attempt takes ~250ms. To test 10^6 passwords (8-char lowercase): 250ms * 10^6 = ~69 hours vs SHA-256 at ~1 microsecond = 1 second. Time-hard: adjusting cost compensates for faster hardware over time. Memory-hard: bcrypt has internal memory requirements (~4KB), limiting GPU parallelism. Compare to scrypt/Argon2 which use more memory (64MB+), further limiting ASICs.",
              "difficulty": "hard",
              "company": "Google"
            }
          ],
          "codingChallenges": []
        }
      ]
    },
    {
      "slug": "sql-databases",
      "title": "SQL Databases",
      "description": "Master relational databases - PostgreSQL, query optimization, migrations, transactions, and ACID properties",
      "order": 8,
      "subtopics": [
        {
          "slug": "postgresql",
          "title": "PostgreSQL",
          "order": 1,
          "content": {
            "overview": "PostgreSQL is a powerful, open-source object-relational database known for standards compliance, extensibility, and reliability. It supports ACID transactions, advanced indexing (B-tree, Hash, GiST, GIN), full-text search, JSON/JSONB, and stored procedures.",
            "problemStatement": "Applications need persistent, structured storage with strong consistency guarantees. PostgreSQL provides a battle-tested relational database with advanced features like MVCC (Multi-Version Concurrency Control), point-in-time recovery, and support for complex queries and data types.",
            "intuitionFirst": "Think of PostgreSQL as a highly organized digital filing cabinet. Each drawer (table) holds related files (rows) with consistent fields (columns). The cabinet has a sophisticated lookup system (indexes), ensures no conflicts (transactions), and keeps backups automatically (WAL).",
            "realLifeAnalogy": "A library catalog system: books (rows) categorized by sections (tables). The catalog (index) lets you find books by author, title, or subject quickly. The librarian ensures two people don't check out the same book simultaneously (row-level locking). If a transaction fails mid-way, everything resets (atomicity).",
            "howItWorks": "PostgreSQL uses a process-per-connection model. Each connection forks a backend process. MVCC provides snapshot isolation: each transaction sees a consistent snapshot of data as of its start time. WAL (Write-Ahead Logging) ensures durability - changes are written to WAL before data files. Vacuum cleans up dead tuples from MVCC. Query planning uses cost-based optimization with statistics.",
            "beginnerExample": "-- Connect and create database\n-- psql -U postgres -d myapp\n\n-- Create table with constraints\nCREATE TABLE users (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  email VARCHAR(255) UNIQUE NOT NULL,\n  username VARCHAR(50) NOT NULL,\n  password_hash VARCHAR(255) NOT NULL,\n  role VARCHAR(20) DEFAULT 'user',\n  is_active BOOLEAN DEFAULT true,\n  created_at TIMESTAMPTZ DEFAULT NOW(),\n  updated_at TIMESTAMPTZ DEFAULT NOW()\n);\n\n-- Create index for performance\nCREATE INDEX idx_users_email ON users(email);\nCREATE INDEX idx_users_created_at ON users(created_at DESC);\n\n-- Insert data\nINSERT INTO users (email, username, password_hash, role)\nVALUES ('alice@example.com', 'alice', '$2b$12$hash...', 'admin');\n\n-- Query with joins and aggregation\nSELECT\n  u.username,\n  COUNT(p.id) as post_count,\n  AVG(p.rating) as avg_rating\nFROM users u\nLEFT JOIN posts p ON p.user_id = u.id\nWHERE u.is_active = true\nGROUP BY u.id, u.username\nHAVING COUNT(p.id) > 5\nORDER BY avg_rating DESC\nLIMIT 10;\n\n// Node.js with pg library\nconst { Pool } = require('pg');\nconst pool = new Pool({\n  host: process.env.DB_HOST,\n  port: 5432,\n  database: 'myapp',\n  user: process.env.DB_USER,\n  password: process.env.DB_PASSWORD,\n  max: 20,\n  idleTimeoutMillis: 30000,\n  connectionTimeoutMillis: 2000,\n});\n\nasync function getActiveUsers() {\n  const client = await pool.connect();\n  try {\n    const result = await client.query(\n      'SELECT id, email, username FROM users WHERE is_active = $1 ORDER BY created_at DESC LIMIT $2',\n      [true, 50]\n    );\n    return result.rows;\n  } finally {\n    client.release();\n  }\n}\n\nasync function createUser(email, username, passwordHash) {\n  const client = await pool.connect();\n  try {\n    await client.query('BEGIN');\n    const { rows } = await client.query(\n      'INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3) RETURNING id, email, username, created_at',\n      [email, username, passwordHash]\n    );\n    await client.query(\n      'INSERT INTO user_profiles (user_id) VALUES ($1)',\n      [rows[0].id]\n    );\n    await client.query('COMMIT');\n    return rows[0];\n  } catch (err) {\n    await client.query('ROLLBACK');\n    throw err;\n  } finally {\n    client.release();\n  }\n}\n\n-- Full-text search\nCREATE INDEX idx_posts_fts ON posts USING GIN(to_tsvector('english', title || ' ' || content));\n\nSELECT id, title, ts_rank(to_tsvector('english', title || ' ' || content), plainto_tsquery('english', $1)) AS rank\nFROM posts\nWHERE to_tsvector('english', title || ' ' || content) @@ plainto_tsquery('english', $1)\nORDER BY rank DESC\nLIMIT 20;",
            "commonMistakes": "Not using connection pooling (creating new connections per request). Forgetting to handle connection release. Using N+1 queries instead of JOINs. Not indexing foreign keys used in JOIN conditions. Ignoring connection timeouts. Using SELECT * in production. Not using parameterized queries (SQL injection risk).",
            "bestPractices": "Use connection pooling (pg Pool). Always parameterize queries. Use migration tools (node-pg-migrate, knex). Set statement timeout. Use RETURNING clause instead of separate SELECT after INSERT/UPDATE. Use EXPLAIN ANALYZE to optimize slow queries. Partition large tables. Use connection pool with max=20-50 per instance.",
            "interviewPerspective": "PostgreSQL is preferred at FAANG for transactional workloads. Key topics: (1) MVCC implementation and vacuum. (2) WAL and crash recovery. (3) Isolation levels (Read Committed, Serializable). (4) Index types and when to use each. (5) Query planner and EXPLAIN. (6) Partitioning strategies. (7) Replication (streaming, logical). (8) Connection pooling and pgbouncer.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-pg-1",
              "question": "What is MVCC in PostgreSQL?",
              "options": [
                "Multi-Version Concurrency Control - each transaction sees a snapshot of data",
                "Multi-Version Consistency Control",
                "Most Valuable Column Cache",
                "Master Version Cache Control"
              ],
              "correctIndex": 0,
              "explanation": "MVCC allows concurrent transactions by giving each transaction a database snapshot.",
              "difficulty": "medium"
            },
            {
              "id": "be-pg-2",
              "question": "What is the purpose of WAL in PostgreSQL?",
              "options": [
                "Write-Ahead Logging ensures durability - changes logged before data files updated",
                "Web Application Layer",
                "Wide Area Link",
                "Write Access List"
              ],
              "correctIndex": 0,
              "explanation": "WAL ensures ACID durability. Changes are written to WAL before being applied to data files.",
              "difficulty": "hard"
            },
            {
              "id": "be-pg-3",
              "question": "Which PostgreSQL indexing method is best for full-text search?",
              "options": [
                "GIN (Generalized Inverted Index)",
                "B-tree",
                "Hash",
                "GiST"
              ],
              "correctIndex": 0,
              "explanation": "GIN indexes are optimized for full-text search, array contains, and JSON queries.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "How does PostgreSQL handle concurrent transactions? Explain MVCC and isolation levels.",
              "answer": "PostgreSQL uses MVCC: each transaction operates on a snapshot of data. When a row is updated, a new tuple version is created; old version remains for other transactions. Isolation levels: (1) Read Uncommitted - behaves like Read Committed (no dirty reads in PG). (2) Read Committed - default, sees committed changes from other transactions. (3) Repeatable Read - single snapshot for entire transaction, eliminates non-repeatable reads. (4) Serializable - highest, uses SSI (Serializable Snapshot Isolation) to detect serialization anomalies. MVCC overhead: dead tuples require VACUUM. Tuning: autovacuum settings, fillfactor, transaction ID wraparound monitoring.",
              "difficulty": "expert",
              "company": "Amazon RDS"
            },
            {
              "question": "Design a PostgreSQL schema for a Twitter-like social network. Discuss indexing strategy and query patterns.",
              "answer": "Schema: users(id PK, username unique, email, password_hash, display_name, bio, avatar_url, created_at, updated_at). tweets(id PK, user_id FK indexed, content text, created_at timestamp). follows(follower_id FK, followee_id FK, composite PK, created_at). likes(user_id FK, tweet_id FK, composite PK). Indexes: tweets(user_id, created_at DESC) for timeline queries. follows(follower_id) for 'who I follow'. follows(followee_id) for followers count. Partition tweets by month (range partitioning on created_at). Timeline query: SELECT t.* FROM tweets t JOIN follows f ON t.user_id = f.followee_id WHERE f.follower_id = $1 ORDER BY t.created_at DESC LIMIT 50. Optimize with timeline materialization (fanout-on-write) for high-profile users.",
              "difficulty": "expert",
              "company": "Twitter"
            }
          ],
          "codingChallenges": [
            {
              "title": "Implement PostgreSQL Connection Pool",
              "description": "Create a robust PostgreSQL connection pool wrapper with health checks, retry logic, and connection metrics tracking. Include idle timeout, max pool size, and graceful shutdown.",
              "difficulty": "hard",
              "starterCode": "class DatabasePool {\n  constructor(config) {\n  }\n  async query(text, params) {}\n  async getClient() {}\n  async release(client) {}\n  getMetrics() {}\n  async close() {}\n}",
              "solutionHint": "Use pg.Pool under the hood. Wrap query with timer. Track total/active/idle/waiting counts. Implement health check interval that runs SELECT 1."
            }
          ]
        },
        {
          "slug": "query-optimization",
          "title": "Query Optimization",
          "order": 2,
          "content": {
            "overview": "Query optimization improves database performance by reducing execution time and resource utilization. Techniques include index tuning, query rewriting, schema denormalization, and understanding the query planner.",
            "problemStatement": "As data grows, slow queries become the primary bottleneck. Poorly optimized queries cause timeouts, lock contention, and high CPU/memory usage. Optimizing queries can yield 10-1000x performance improvement without hardware changes.",
            "intuitionFirst": "Finding a book in a library without a catalog: you'd search every shelf (full table scan). With a catalog (index), you go directly to the right shelf. Now imagine looking up all books by 'Orwell' published after 1945 - a properly ordered index can jump right to the match.",
            "realLifeAnalogy": "A warehouse with millions of packages. Without organization: scanning every box (sequential scan). With an index sorted by destination: go directly to the right area. With a composite index (destination + priority): skip scanning within destination.",
            "howItWorks": "PostgreSQL query planner evaluates thousands of execution plans using statistics (row count, distribution, correlation). It considers: sequential vs index scans, join methods (nested loop, hash join, merge join), sort strategies. EXPLAIN ANALYZE shows actual vs estimated costs.",
            "beginnerExample": "-- Slow query: sequential scan\nEXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 42 AND status = 'pending';\n-- Seq Scan on orders (cost=0.00..3450.00 rows=10 width=120)\n\n-- Create composite index\nCREATE INDEX idx_orders_customer_status ON orders(customer_id, status);\n\n-- Fast query: index scan\nEXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 42 AND status = 'pending';\n-- Index Scan using idx_orders_customer_status (cost=0.29..8.31 rows=150 width=120)\n\n-- Avoid function on indexed column\nSELECT * FROM orders WHERE DATE(created_at) = '2024-01-01';\n-- Better: range query\nSELECT * FROM orders WHERE created_at >= '2024-01-01' AND created_at < '2024-01-02';\n\n-- Use EXISTS instead of IN for subqueries\nSELECT * FROM customers c WHERE EXISTS (\n  SELECT 1 FROM orders o WHERE o.customer_id = c.id\n);\n\n-- Keyset pagination vs offset\nSELECT * FROM orders WHERE id > 100000 ORDER BY id LIMIT 20;\n\n// Node.js: track slow queries\nconst { Client } = require('pg');\nconst client = new Client();\n\n// Set statement timeout\nawait client.query('SET statement_timeout = 5000');\n\n// Track query performance\nconst originalQuery = client.query.bind(client);\nclient.query = async (text, params) => {\n  const start = Date.now();\n  try {\n    const result = await originalQuery(text, params);\n    const duration = Date.now() - start;\n    if (duration > 100) {\n      console.warn('Slow query:', { text, duration, rows: result.rowCount });\n    }\n    return result;\n  } catch (err) {\n    const duration = Date.now() - start;\n    console.error('Query error:', { text, duration, error: err.message });\n    throw err;\n  }\n};",
            "commonMistakes": "Creating indexes without analyzing query patterns. Over-indexing (slows writes). Using SELECT * in production. Not using EXPLAIN ANALYZE. Ignoring composite index column order. Using functions on indexed columns in WHERE.",
            "bestPractices": "Always EXPLAIN ANALYZE slow queries. Match index column order to WHERE conditions + ORDER BY. Use covering indexes for index-only scans. Prefer range queries over function-based filters. Set statement_timeout.",
            "interviewPerspective": "Query optimization is critical at FAANG scale. Key topics: (1) Index types (B-tree for range, Hash for equality, GiST for geometry, GIN for arrays/JSON). (2) Composite index column order - most selective first. (3) Index-only scans. (4) Join strategies: nested loop, hash join, merge join.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-qopt-1",
              "question": "What does EXPLAIN ANALYZE show that EXPLAIN alone does not?",
              "options": [
                "Actual execution time and row counts",
                "The query plan",
                "Index recommendations",
                "Lock wait times"
              ],
              "correctIndex": 0,
              "explanation": "EXPLAIN shows estimated plan; ANALYZE executes and shows actual timing and row counts.",
              "difficulty": "medium"
            },
            {
              "id": "be-qopt-2",
              "question": "Why is SELECT * considered bad practice in production?",
              "options": [
                "It often retrieves unnecessary columns, increasing I/O and memory",
                "It's slower than selecting by column name",
                "It causes syntax errors",
                "It disables indexing"
              ],
              "correctIndex": 0,
              "explanation": "SELECT * retrieves all columns, wasting I/O, memory, and network bandwidth.",
              "difficulty": "easy"
            },
            {
              "id": "be-qopt-3",
              "question": "Which join method does PostgreSQL use when joining a large table with a small one?",
              "options": [
                "Hash Join - hash the small table, probe the large",
                "Nested Loop",
                "Merge Join",
                "Sequential Join"
              ],
              "correctIndex": 0,
              "explanation": "Hash join hashes the smaller table, then probes the larger table's rows against the hash table.",
              "difficulty": "hard"
            }
          ],
          "faangQuestions": [
            {
              "question": "A query that was fast yesterday is slow today. How do you diagnose and fix it?",
              "answer": "1. Check if table statistics are stale (run ANALYZE). 2. Check for plan changes (EXPLAIN ANALYZE vs yesterday's). 3. Check pg_stat_user_tables for dead tuples needing VACUUM. 4. Check for index bloat. 5. Check if row count grew significantly. 6. Look at pg_stat_activity for blocking transactions. 7. Check system resources (CPU, IOPS, memory). Common fixes: VACUUM ANALYZE, update statistics, increase work_mem, add index, rewrite query with better selectivity.",
              "difficulty": "expert",
              "company": "Uber"
            },
            {
              "question": "Design a pagination strategy for a high-traffic API serving millions of records.",
              "answer": "Two main approaches: (1) Offset/limit - simple but slow for deep pages. (2) Keyset (cursor-based) pagination - WHERE id > $1 ORDER BY id LIMIT $2, O(1) per page. For sorted by non-unique fields: composite cursor (score, id). GraphQL Relay-style: base64-encoded cursors. Always use LIMIT. Postgres: keyset on (column, id) with WHERE (column > $1) OR (column = $1 AND id > $2). Index on (column, id).",
              "difficulty": "hard",
              "company": "Meta"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "migrations",
          "title": "Migrations",
          "order": 3,
          "content": {
            "overview": "Database migrations are version-controlled, incremental changes to database schema. Tools like knex, node-pg-migrate, and Prisma Migrate allow teams to evolve schemas safely, roll back changes, and keep environments in sync.",
            "problemStatement": "Without migrations, schema changes are manual, error-prone, and unrepeatable. Teams lose track of what's deployed, can't roll back safely, and struggle to synchronize changes across environments.",
            "intuitionFirst": "Migrations are like Git for your database schema. Each migration is a commit that can be applied (up) or reverted (down). The migration table tracks which 'commits' have been applied.",
            "realLifeAnalogy": "A building renovation with blueprints: each change is a documented step. If something goes wrong, you can undo the last step. The blueprints specify exactly what to do in order.",
            "howItWorks": "Each migration file has up() and down() functions. A migrations table tracks applied migrations. Tools compare migration files against the table to determine which need applying.",
            "beginnerExample": "// Migration: 001_create_users.js (using node-pg-migrate)\nexports.up = (pgm) => {\n  pgm.createTable('users', {\n    id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') },\n    email: { type: 'varchar(255)', notNull: true, unique: true },\n    username: { type: 'varchar(50)', notNull: true },\n    password_hash: { type: 'varchar(255)', notNull: true },\n    role: { type: 'varchar(20)', notNull: true, default: 'user' },\n    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },\n  });\n  pgm.createIndex('users', 'email');\n};\n\nexports.down = (pgm) => { pgm.dropTable('users'); };\n\n// Migration: 002_add_posts.js\nexports.up = (pgm) => {\n  pgm.createTable('posts', {\n    id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') },\n    user_id: { type: 'uuid', notNull: true, references: 'users(id)', onDelete: 'CASCADE' },\n    title: { type: 'varchar(200)', notNull: true },\n    content: { type: 'text', notNull: true },\n    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },\n  });\n  pgm.createIndex('posts', 'user_id');\n  pgm.createIndex('posts', 'created_at');\n};\nexports.down = (pgm) => { pgm.dropTable('posts'); };",
            "commonMistakes": "Writing irreversible migrations (no down function). Making long-running migrations that lock tables. Not testing migrations against a copy of production data.",
            "bestPractices": "Always provide down(). Keep migrations short and focused. Use transactions. Test on staging with production-like data. Use timestamp-based naming. Never modify an already-applied migration.",
            "interviewPerspective": "Migrations show production maturity at FAANG. Key: (1) Zero-downtime migrations - adding columns is safe, but renaming/removing requires multi-phase approach. (2) Online schema change tools (gh-ost, pg_repack). (3) Managing migration conflicts in CI.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-mig-1",
              "question": "Why should irreversible migrations (no down function) be avoided?",
              "options": [
                "Down functions enable safe rollback in emergencies",
                "Database tools require them",
                "Only PostgreSQL needs down functions",
                "They're optional"
              ],
              "correctIndex": 0,
              "explanation": "Down functions allow rollback in emergencies.",
              "difficulty": "medium"
            },
            {
              "id": "be-mig-2",
              "question": "What is the recommended approach for renaming a column in production?",
              "options": [
                "Multi-phase: add new column, dual-write, backfill, swap reads, drop old",
                "Just rename it directly",
                "Drop and recreate the table",
                "Use ALTER COLUMN RENAME"
              ],
              "correctIndex": 0,
              "explanation": "Zero-downtime column rename requires multi-phase approach.",
              "difficulty": "hard"
            },
            {
              "id": "be-mig-3",
              "question": "How does the migration tool track which migrations have been applied?",
              "options": [
                "A migrations table stores applied migration names and timestamps",
                "File system timestamps",
                "Git commit history",
                "Environment variables"
              ],
              "correctIndex": 0,
              "explanation": "A migrations table tracks applied migrations by name.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design a zero-downtime migration strategy for renaming a heavily-used column in a 10TB table.",
              "answer": "Phase 1: Add new column (ALTER TABLE ADD COLUMN is metadata-only, instant). Phase 2: Dual-write - writes go to both columns. Phase 3: Backfill - batch update rows. Phase 4: Verify consistency. Phase 5: Cut over reads. Phase 6: Stop writing old column. Phase 7: Drop old column (metadata-only). Use pg_repack or logical replication for zero-downtime.",
              "difficulty": "expert",
              "company": "Stripe"
            },
            {
              "question": "How do you handle migration conflicts in a CI/CD pipeline with 50+ microservices sharing a database?",
              "answer": "Each service has its own schema namespace. CI runs migrations on isolated test DB. Migration CI checks for conflicts. Ordered migration queue. Lock table prevents concurrent runs. Each migration is idempotent (IF NOT EXISTS). Breaking changes require deprecation period.",
              "difficulty": "expert",
              "company": "Uber"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "transactions-acid",
          "title": "Transactions & ACID",
          "order": 4,
          "content": {
            "overview": "ACID (Atomicity, Consistency, Isolation, Durability) properties guarantee reliable database transactions. Transactions group multiple operations into a single unit that succeeds or fails atomically.",
            "problemStatement": "Concurrent database operations can cause race conditions: lost updates, dirty reads, non-repeatable reads, phantom reads. Without transactions, a fund transfer could deduct from one account without crediting another.",
            "intuitionFirst": "A bank transfer is the classic transaction: deduct $100 from Alice, add $100 to Bob. If the power fails after deducting but before crediting, the money disappears. ACID ensures both happen or neither does.",
            "realLifeAnalogy": "Buying a flight online: the system must atomically charge your card, reserve your seat, send confirmation. If step 2 fails because seat was taken, step 1 must roll back.",
            "howItWorks": "PostgreSQL implements ACID via: Atomicity - WAL ensures all changes or none committed. Consistency - constraints enforce rules. Isolation - MVCC provides snapshot isolation. Durability - committed transactions survive crashes via WAL replay.",
            "beginnerExample": "-- Bank transfer using explicit transaction\nBEGIN;\n\nUPDATE accounts SET balance = balance - 100 WHERE id = 1 AND balance >= 100;\nIF NOT FOUND THEN\n  ROLLBACK;\nEND IF;\n\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\n\nINSERT INTO transfers (from_account_id, to_account_id, amount, status)\nVALUES (1, 2, 100, 'completed');\n\nCOMMIT;\n\n// Node.js with transactions\nconst { Pool } = require('pg');\nconst pool = new Pool();\n\nasync function transferFunds(fromId, toId, amount) {\n  const client = await pool.connect();\n  try {\n    await client.query('BEGIN');\n    const { rows } = await client.query(\n      'SELECT balance FROM accounts WHERE id = $1 FOR UPDATE',\n      [fromId]\n    );\n    if (rows.length === 0 || rows[0].balance < amount) {\n      await client.query('ROLLBACK');\n      throw new Error('Insufficient funds');\n    }\n    await client.query(\n      'UPDATE accounts SET balance = balance - $1 WHERE id = $2',\n      [amount, fromId]\n    );\n    await client.query(\n      'UPDATE accounts SET balance = balance + $1 WHERE id = $2',\n      [amount, toId]\n    );\n    await client.query('COMMIT');\n  } catch (err) {\n    await client.query('ROLLBACK');\n    throw err;\n  } finally {\n    client.release();\n  }\n}",
            "commonMistakes": "Not using BEGIN/COMMIT for multi-statement operations. Forgetting to handle ROLLBACK on error. Not using SELECT FOR UPDATE for critical sections. Long-running transactions holding locks.",
            "bestPractices": "Keep transactions short. Use SELECT FOR UPDATE for pessimistic locking. Use Serializable isolation for financial operations. Implement retry logic for serialization failures.",
            "interviewPerspective": "ACID is a FAANG interview staple. Deep dives: (1) Dirty reads, non-repeatable reads, phantom reads. (2) PostgreSQL's implementation. (3) Serializable Snapshot Isolation (SSI). (4) Lost update problem. (5) Two-phase commit. (6) Saga pattern for microservices.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-acid-1",
              "question": "What does the I in ACID stand for?",
              "options": [
                "Isolation - transactions execute as if they were the only one running",
                "Integrity",
                "Indexing",
                "Input"
              ],
              "correctIndex": 0,
              "explanation": "Isolation ensures concurrent transactions produce the same result as if executed sequentially.",
              "difficulty": "easy"
            },
            {
              "id": "be-acid-2",
              "question": "What is a phantom read?",
              "options": [
                "A phantom read occurs when a query returns different rows at different points in the same transaction",
                "Reading a deleted row",
                "A NULL value",
                "Reading data never written"
              ],
              "correctIndex": 0,
              "explanation": "Phantom reads happen when another transaction inserts/deletes rows matching the current query.",
              "difficulty": "hard"
            },
            {
              "id": "be-acid-3",
              "question": "What is the difference between READ COMMITTED and SERIALIZABLE isolation?",
              "options": [
                "READ COMMITTED sees committed changes mid-transaction; SERIALIZABLE uses a single snapshot and detects conflicts",
                "SERIALIZABLE is faster",
                "READ COMMITTED prevents all anomalies",
                "They're identical in PostgreSQL"
              ],
              "correctIndex": 0,
              "explanation": "READ COMMITTED shows latest committed data per statement. SERIALIZABLE uses one snapshot and aborts on conflicts.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design a booking system that prevents double-booking. Compare pessimistic vs optimistic approaches.",
              "answer": "Pessimistic (SELECT FOR UPDATE): lock the row, check availability, book, commit. Pros: guaranteed prevention. Cons: lock contention. Optimistic (version column): UPDATE ... WHERE version = $1 AND status = 'available'; check affected rows. Pros: no locks. Cons: retry overhead. At FAANG scale: optimistic with retry, exponential backoff.",
              "difficulty": "expert",
              "company": "Uber"
            },
            {
              "question": "How do you implement distributed transactions across microservices? Explain the Saga pattern.",
              "answer": "Saga pattern - sequence of local transactions with compensating transactions for rollback. Choreography: each service publishes events. Orchestrator: central coordinator tells each service what to do. Example: Order Service -> Payment -> Inventory -> Shipping. Compensation: if payment fails, cancel-order. Challenges: idempotency, compensating transactions.",
              "difficulty": "expert",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        }
      ]
    },
    {
      "slug": "nosql-databases",
      "title": "NoSQL Databases",
      "description": "Work with MongoDB, Redis, and Elasticsearch - document stores, key-value caches, and search engines",
      "order": 9,
      "subtopics": [
        {
          "slug": "mongodb",
          "title": "MongoDB",
          "order": 1,
          "content": {
            "overview": "MongoDB is a document-oriented NoSQL database that stores JSON-like documents with dynamic schemas. It supports replication via replica sets, sharding for horizontal scaling, and rich query capabilities including aggregations, geospatial queries, and text search.",
            "problemStatement": "Relational databases require rigid schemas and struggle with hierarchical data, frequent schema changes, and horizontal scaling. MongoDB's document model handles nested data naturally, scales horizontally via sharding, and allows schema evolution without migrations.",
            "intuitionFirst": "MongoDB is like a filing cabinet where each folder (collection) contains documents with different fields. A user document might have { name, email, addresses[] } - the addresses live right inside the user, no JOINs needed. Each document is self-contained.",
            "realLifeAnalogy": "A contact management app: each contact has name, phone, email, plus optional fields like birthday, notes, social profiles. In MongoDB, you store all of this in one document. In SQL, you'd need contacts, phones, emails tables with JOINs.",
            "howItWorks": "MongoDB stores documents in BSON (Binary JSON) format. WiredTiger storage engine provides document-level concurrency, compression, and journaling. Replica sets provide high availability with automatic failover. Sharding distributes data across shards using a shard key.",
            "beginnerExample": "// Connect to MongoDB with Mongoose\nconst mongoose = require('mongoose');\nmongoose.connect('mongodb://localhost:27017/myapp', {\n  useNewUrlParser: true,\n  useUnifiedTopology: true,\n});\n\n// Define schema\nconst userSchema = new mongoose.Schema({\n  email: { type: String, required: true, unique: true },\n  name: { type: String, required: true },\n  role: { type: String, enum: ['user', 'admin'], default: 'user' },\n  addresses: [{\n    label: String,\n    street: String,\n    city: String,\n  }],\n  createdAt: { type: Date, default: Date.now },\n});\n\n// Indexes\nuserSchema.index({ email: 1 });\nuserSchema.index({ createdAt: -1 });\n\nconst User = mongoose.model('User', userSchema);\n\n// CRUD operations\nasync function findUsersByCity(city) {\n  return await User.find({\n    'addresses.city': city,\n  })\n  .select('name email')\n  .sort({ createdAt: -1 })\n  .limit(20)\n  .lean();\n}\n\n// Aggregation pipeline\nasync function getUserStats() {\n  return await User.aggregate([\n    { match: { role: 'user' } },\n    { group: {\n      _id: null,\n      total: { sum: 1 },\n      avgAddresses: { avg: { size: '' } },\n    }},\n  ]);\n}",
            "commonMistakes": "Not using indexes. Embedding arrays that grow unboundedly. Not using connection pooling. Using find() without limit(). Ignoring write concern settings.",
            "bestPractices": "Always create indexes for query patterns. Prefer embedding for bounded data; references for unbounded. Use lean() for read-only queries. Set write concern to majority for durability.",
            "interviewPerspective": "MongoDB is used at FAANG for specific use cases. Key: (1) Document model vs relational tradeoffs. (2) When to embed vs reference. (3) Sharding strategies. (4) Replica set elections. (5) Aggregation pipeline optimization.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-mongo-1",
              "question": "When should you embed a document vs reference it in MongoDB?",
              "options": [
                "Embed when data is bounded and accessed together; reference when data grows unbounded",
                "Always embed",
                "Always reference",
                "Embed only for arrays"
              ],
              "correctIndex": 0,
              "explanation": "Embed when data size is bounded and always read together. Reference when unbounded or shared.",
              "difficulty": "medium"
            },
            {
              "id": "be-mongo-2",
              "question": "What does lean() do in Mongoose?",
              "options": [
                "Returns plain JavaScript objects instead of Mongoose documents, improving performance",
                "Deletes documents",
                "Reduces query results",
                "Applies schema validation"
              ],
              "correctIndex": 0,
              "explanation": "lean() returns plain JS objects, skipping Mongoose document hydration.",
              "difficulty": "easy"
            },
            {
              "id": "be-mongo-3",
              "question": "How does MongoDB handle horizontal scaling?",
              "options": [
                "Sharding distributes data across servers using a shard key",
                "Master-slave replication",
                "Auto-scaling containers",
                "Load balancers"
              ],
              "correctIndex": 0,
              "explanation": "Sharding partitions data across shards using a shard key.",
              "difficulty": "hard"
            }
          ],
          "faangQuestions": [
            {
              "question": "Compare MongoDB vs PostgreSQL for a real-time analytics dashboard with high write throughput.",
              "answer": "MongoDB: schema flexibility, native aggregations, easy horizontal scaling, document-level atomicity. Weak: no JOINs, replication lag. PostgreSQL: strong consistency, complex queries, JOINs, mature tooling. Weak: vertical scaling limited. Recommendation: MongoDB for time-series metrics, PostgreSQL for transactional data.",
              "difficulty": "expert",
              "company": "Uber"
            },
            {
              "question": "Design a MongoDB schema for a real-time chat application with millions of conversations.",
              "answer": "Collections: conversations { _id, participants, lastMessage, createdAt }. Messages { _id, conversationId (indexed), senderId, text, createdAt (indexed) }. Index on messages(conversationId, createdAt). Shard messages by conversationId (hashed). TTL index for archiving.",
              "difficulty": "hard",
              "company": "WhatsApp"
            }
          ],
          "codingChallenges": [
            {
              "title": "Build a MongoDB Aggregation Pipeline",
              "description": "Write an aggregation pipeline that computes user engagement metrics: total posts, average likes per post, last active date, and engagement score grouped by user tier.",
              "difficulty": "medium",
              "starterCode": "db.users.aggregate([\n  { lookup: { from: 'posts', localField: '_id', foreignField: 'userId', as: 'posts' } },\n])",
              "solutionHint": "Use lookup to join posts, group to aggregate, addFields with switch for tier assignment."
            }
          ]
        },
        {
          "slug": "redis",
          "title": "Redis",
          "order": 2,
          "content": {
            "overview": "Redis is an in-memory data structure store used as database, cache, message broker, and queue. It supports strings, hashes, lists, sets, sorted sets, streams. Redis is single-threaded for command execution, using async I/O and event loop for concurrency.",
            "problemStatement": "Traditional databases cannot serve sub-millisecond reads at high throughput. Redis keeps data in memory, achieving microsecond latency. Ideal for caching, session stores, rate limiters, leaderboards.",
            "intuitionFirst": "Redis is like a whiteboard in your workspace: instant to read and write, but everything is lost if erased. You use it for frequently accessed data with optional persistence.",
            "realLifeAnalogy": "A chef's prep station: frequently used ingredients are on the counter (Redis). Everything else is in the walk-in fridge. The chef refreshes the counter from the fridge periodically.",
            "howItWorks": "Redis stores keys in memory using optimized data structures. Commands are atomic - single-threaded execution ensures no race conditions. Persistence: RDB (snapshots) or AOF (append-only log). Cluster mode distributes keys across nodes using hash slots.",
            "beginnerExample": "const Redis = require('ioredis');\nconst redis = new Redis({\n  host: process.env.REDIS_HOST || 'localhost',\n  retryStrategy: (times) => Math.min(times * 50, 2000),\n});\n\n// String: caching\nasync function getUser(id) {\n  const key = 'user:' + id;\n  const cached = await redis.get(key);\n  if (cached) return JSON.parse(cached);\n  const user = await db.findUser(id);\n  await redis.set(key, JSON.stringify(user), 'EX', 3600);\n  return user;\n}\n\n// Hash: storing objects\nawait redis.hmset('session:abc123', { userId: 42, role: 'user' });\n\n// List: message queue\nawait redis.lpush('queue:emails', JSON.stringify({ to: 'user@example.com' }));\n\n// Sorted Set: leaderboard\nawait redis.zadd('leaderboard:daily', user.score, 'user:' + user.id);\n\n// Rate limiting\nasync function checkRateLimit(userId, maxRequests, windowSec) {\n  const key = 'ratelimit:' + userId + ':' + Math.floor(Date.now() / 1000 / windowSec);\n  const current = await redis.incr(key);\n  if (current === 1) await redis.expire(key, windowSec + 1);\n  return current <= maxRequests;\n}\n\n// Distributed lock\nasync function acquireLock(resourceId, ttl) {\n  const result = await redis.set('lock:' + resourceId, 'locked', 'PX', ttl, 'NX');\n  return result === 'OK';\n}\n\n// Pipeline and transactions\nasync function batchOperation() {\n  const pipeline = redis.pipeline();\n  pipeline.incr('counter:visits');\n  pipeline.hincrby('stats:2024-01-01', 'pageviews', 1);\n  return await pipeline.exec();\n}",
            "commonMistakes": "Storing large data in Redis. No expiration on cache keys. Ignoring connection management. Using KEYS command in production. Not handling key eviction.",
            "bestPractices": "Always set TTL for cache keys. Use connection pooling with ioredis. Use SCAN instead of KEYS. Monitor maxmemory and eviction. Use appropriate data types.",
            "interviewPerspective": "Redis is critical for FAANG infrastructure. Key: (1) Single-threaded event loop. (2) Data structures and use cases. (3) Caching strategies. (4) Cache invalidation. (5) Distributed locks. (6) Rate limiting algorithms.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-redis-1",
              "question": "Why is Redis single-threaded for command execution?",
              "options": [
                "Single-threaded ensures atomicity without locks and avoids context switching",
                "It runs on a single CPU core",
                "Multi-threading was never implemented",
                "For lower memory usage"
              ],
              "correctIndex": 0,
              "explanation": "Single-threaded model ensures atomic operations and avoids locking overhead.",
              "difficulty": "medium"
            },
            {
              "id": "be-redis-2",
              "question": "Which Redis data structure is best for a leaderboard?",
              "options": [
                "Sorted Set (ZSET) - maintains order by score",
                "List",
                "Set",
                "Hash"
              ],
              "correctIndex": 0,
              "explanation": "Sorted sets maintain elements ordered by score and support rank queries.",
              "difficulty": "easy"
            },
            {
              "id": "be-redis-3",
              "question": "What happens when Redis reaches maxmemory?",
              "options": [
                "Redis evicts keys based on configured eviction policy",
                "Redis crashes",
                "New writes rejected",
                "Redis swaps to disk"
              ],
              "correctIndex": 0,
              "explanation": "When maxmemory is reached, Redis evicts keys based on policy like allkeys-lru.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design a distributed rate limiter using Redis. Compare sliding window vs token bucket.",
              "answer": "Sliding Window: sorted set key, ZREMRANGEBYSCORE removes old, ZCARD counts. Atomic Lua. Pros: precise. Cons: memory per request. Token Bucket: key has tokens + last refill. Each request consumes 1. Pros: constant memory. Cons: less precise. At scale: Redis Cluster with hash tags. Lua for atomicity.",
              "difficulty": "expert",
              "company": "GitHub"
            },
            {
              "question": "How would you implement caching for a news feed with 10M DAU? Discuss cache invalidation.",
              "answer": "Feed cache per user: sorted set of post IDs, TTL 5 min. Post cache: hash, TTL 1 hour. Write: fanout post ID to followers' feeds (async). Invalidation: TTL-based + active on write. For influencers: merge cached feed + recent tweets on read.",
              "difficulty": "expert",
              "company": "Twitter"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "elasticsearch",
          "title": "Elasticsearch",
          "order": 3,
          "content": {
            "overview": "Elasticsearch is a distributed, RESTful search and analytics engine built on Apache Lucene. It provides near real-time full-text search, structured queries, aggregations, and scalability via sharding.",
            "problemStatement": "Traditional databases struggle with full-text search: fuzzy matching, relevance scoring, typo tolerance, and faceted search. Elasticsearch builds an inverted index for sub-second search across billions of documents.",
            "intuitionFirst": "Elasticsearch is like Google for your application data. It builds a word index of everything you store. When searching 'fast blue car', it finds documents with those words, ranks by relevance, and returns results instantly.",
            "realLifeAnalogy": "A book's index at the back: it maps every word to page numbers. To find 'elephant', check the index and go directly to the right pages. Elasticsearch does this at scale.",
            "howItWorks": "Documents are JSON objects indexed into an inverted index. Text is analyzed (tokenized, lowercased, stemmed). Relevance scoring uses BM25. Sharding distributes the index across nodes for horizontal scaling.",
            "beginnerExample": "const { Client } = require('@elastic/elasticsearch');\nconst client = new Client({\n  node: process.env.ES_URL || 'http://localhost:9200',\n});\n\n// Index a document\nasync function indexProduct(product) {\n  await client.index({\n    index: 'products',\n    id: product.id.toString(),\n    body: {\n      name: product.name,\n      description: product.description,\n      category: product.category,\n      price: product.price,\n      inStock: product.inStock,\n    },\n  });\n}\n\n// Full-text search\nasync function searchProducts(query, filters) {\n  const must = [];\n  if (query) {\n    must.push({\n      multi_match: {\n        query,\n        fields: ['name^3', 'description', 'category^2'],\n        fuzziness: 'AUTO',\n      },\n    });\n  }\n  if (filters.category) must.push({ term: { category: filters.category } });\n  const { body } = await client.search({\n    index: 'products',\n    body: {\n      query: { bool: { must } },\n      from: 0,\n      size: 20,\n      aggs: {\n        categories: { terms: { field: 'category', size: 20 } },\n        avg_price: { avg: { field: 'price' } },\n      },\n    },\n  });\n  return { total: body.hits.total.value, hits: body.hits.hits };\n}",
            "commonMistakes": "Not defining proper mappings. Deep pagination (use search_after). Oversharding. Ignoring replica shards. Not tuning refresh_interval.",
            "bestPractices": "Define explicit mappings before indexing. Use index aliases for reindexing. Size shards to 20-50GB each. Use search_after for deep pagination.",
            "interviewPerspective": "Elasticsearch is used at FAANG for logging and search. Key: (1) Inverted index. (2) BM25 relevance. (3) Sharding and routing. (4) Query DSL. (5) Aggregations.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-es-1",
              "question": "What is an inverted index in Elasticsearch?",
              "options": [
                "A mapping from terms to documents containing those terms",
                "A reversed primary key index",
                "An index that stores documents backwards",
                "A temporary index"
              ],
              "correctIndex": 0,
              "explanation": "Inverted index maps each unique term to the list of documents containing it.",
              "difficulty": "medium"
            },
            {
              "id": "be-es-2",
              "question": "What is the default relevance scoring algorithm?",
              "options": [
                "BM25 based on term frequency and inverse document frequency",
                "TF-IDF",
                "Cosine similarity",
                "PageRank"
              ],
              "correctIndex": 0,
              "explanation": "Elasticsearch 5+ uses BM25, improving upon TF-IDF.",
              "difficulty": "hard"
            },
            {
              "id": "be-es-3",
              "question": "How to handle deep pagination in Elasticsearch?",
              "options": [
                "Use search_after with a sort value to paginate beyond 10K results",
                "Increase max_result_window",
                "Use from + size with large values",
                "Scroll API"
              ],
              "correctIndex": 0,
              "explanation": "search_after is recommended for deep pagination beyond 10K.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design a search system for an e-commerce platform with 10M products. Include typo tolerance and faceted search.",
              "answer": "Multi_match on name^3, description, brand^2 with fuzziness AUTO. Function score query boosts by popularity. Aggregations on category, price, brand. Typo tolerance: fuzziness AUTO, 2 edits for long terms. Autocomplete: edge_ngram or completion suggester.",
              "difficulty": "expert",
              "company": "Amazon"
            },
            {
              "question": "Design the logging infrastructure for 10K microservices using ELK.",
              "answer": "Filebeat -> Kafka -> Logstash -> Elasticsearch. Hot-warm-cold architecture. ILM policy: hot (7d), warm (15d, shrink), cold (freeze), delete (30d). Shards: 20-30GB each. Monitoring: Watcher alerts on error spikes.",
              "difficulty": "expert",
              "company": "Netflix"
            }
          ],
          "codingChallenges": []
        }
      ]
    },
    {
      "slug": "caching",
      "title": "Caching",
      "description": "Master caching strategies - CDN, application caching, distributed caching, and cache invalidation patterns",
      "order": 10,
      "subtopics": [
        {
          "slug": "cdn-caching",
          "title": "CDN Caching",
          "order": 1,
          "content": {
            "overview": "Content Delivery Networks (CDNs) cache static and dynamic content at edge locations worldwide, reducing latency and origin server load. CDNs serve content from the closest edge server to the user.",
            "problemStatement": "Users across the globe experience high latency fetching content from a single origin server. CDNs solve this by caching content at hundreds of edge locations worldwide.",
            "intuitionFirst": "A CDN is like a global chain of local libraries. Instead of everyone requesting books from one central library, each city has a local library with popular books.",
            "realLifeAnalogy": "Coffee chain with centralized roasting and local cafes. Each cafe keeps popular drinks ready. If someone orders something unusual, the cafe calls the roastery for fresh beans.",
            "howItWorks": "CDN routes to nearest edge. If content is cached and fresh, served immediately. If not, edge requests from origin, caches it. Cache-Control headers control caching behavior.",
            "beginnerExample": "// Server-side cache headers for CDN\nconst express = require('express');\nconst app = express();\n\n// Static assets: cache for 1 year\napp.use('/static', express.static('public', {\n  maxAge: '1y',\n  immutable: true,\n  setHeaders: (res) => {\n    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');\n  },\n}));\n\n// API response: CDN cache for 5 minutes, stale while revalidate\napp.get('/api/users/:id', async (req, res) => {\n  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600');\n  res.setHeader('Vary', 'Accept-Encoding, Accept-Language');\n  const user = await findUser(req.params.id);\n  res.json(user);\n});\n\n// Cache tagging for granular purging\napp.get('/api/posts', async (req, res) => {\n  res.setHeader('Surrogate-Key', 'posts list');\n  res.setHeader('Surrogate-Control', 'max-age=60');\n  res.json(await getPosts());\n});",
            "commonMistakes": "Caching authenticated content without proper Vary headers. Too-long TTLs causing stale content. Too-short TTLs defeating CDN purpose. Not purging cache on content updates.",
            "bestPractices": "Set explicit Cache-Control on every response. Use s-maxage for CDN, max-age for browser. Implement stale-while-revalidate. Use cache tags for granular purging.",
            "interviewPerspective": "CDN caching is critical at FAANG. Key: (1) Cache-Control directives. (2) CDN architecture. (3) Cache invalidation. (4) Private vs public caching. (5) Stale-while-revalidate.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-cdn-1",
              "question": "What is the difference between max-age and s-maxage?",
              "options": [
                "s-maxage applies to CDN/proxy caches; max-age applies to browser caches",
                "max-age is for CDNs",
                "s-maxage is for browsers",
                "They are identical"
              ],
              "correctIndex": 0,
              "explanation": "s-maxage controls shared caches (CDN), max-age controls browser caches.",
              "difficulty": "medium"
            },
            {
              "id": "be-cdn-2",
              "question": "What does stale-while-revalidate do?",
              "options": [
                "Serves stale cached content while fetching fresh content in background",
                "Rejects stale content",
                "Forces CDN to revalidate every request",
                "Extends cache TTL"
              ],
              "correctIndex": 0,
              "explanation": "stale-while-revalidate serves stale while async fetching fresh.",
              "difficulty": "hard"
            },
            {
              "id": "be-cdn-3",
              "question": "What is a cache stampede and how do you prevent it?",
              "options": [
                "Multiple requests for expired cache key cause simultaneous origin requests. Prevent with request coalescing.",
                "CDN overload",
                "DDOS attack",
                "Cache overflow"
              ],
              "correctIndex": 0,
              "explanation": "Cache stampede: many requests miss simultaneously. Solution: request coalescing, stale-while-revalidate.",
              "difficulty": "hard"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design a caching strategy for a news API with <1 second propagation delay and 50K requests/second.",
              "answer": "CDN with 1-second TTL. Stale-while-revalidate for 5s. Cache tags per article. Tiered caching: edge -> regional -> origin shield. Push-based invalidation on publish. Pre-warm on high-profile events.",
              "difficulty": "expert",
              "company": "Cloudflare"
            },
            {
              "question": "How would you implement private content delivery through a CDN?",
              "answer": "Signed URLs with HMAC and expiration. CDN validates signature before serving. Token authentication via Lambda@Edge. Cache by user group, not individual. Private content: no-store.",
              "difficulty": "hard",
              "company": "Netflix"
            }
          ],
          "codingChallenges": [
            {
              "title": "Implement a Cache Stampede Prevention Layer",
              "description": "Create a wrapper around an async data fetcher that prevents cache stampedes when cache expires. Multiple concurrent calls for same key should trigger only one fetch.",
              "difficulty": "hard",
              "starterCode": "class StampedePrevention {\n  constructor(fetchFn, options = {}) {\n    this.pending = new Map();\n  }\n  async get(key) {}\n}",
              "solutionHint": "Use a Map of key->Promise. On get(key): if pending has key, return that Promise. Otherwise create new Promise, store it, await, then delete. Handle rejection by deleting from pending."
            }
          ]
        },
        {
          "slug": "application-caching",
          "title": "Application Caching",
          "order": 2,
          "content": {
            "overview": "Application caching stores frequently accessed data in-memory to reduce latency and database load. Common patterns include cache-aside, read-through, write-through, and write-behind.",
            "problemStatement": "Database queries take 1-50ms even with indexes. Caching reduces response times to <1ms and database load by 90%+ for cacheable data.",
            "intuitionFirst": "Application caching is like having a whiteboard with frequently called phone numbers. Instead of looking up the company directory every time, you check your whiteboard first.",
            "realLifeAnalogy": "A chef's recipe book: frequently used recipes are memorized (cache). Less common recipes are in the book (database). New popular recipes get memorized.",
            "howItWorks": "Cache-aside: check cache first, on miss fetch from DB, store in cache, return. Write-through: write to DB, sync update cache. Write-behind: write to cache, async persist to DB.",
            "beginnerExample": "// Cache-aside pattern with Redis\nclass UserService {\n  constructor(redis, db) {\n    this.redis = redis;\n    this.db = db;\n  }\n\n  async getUser(id) {\n    const cacheKey = 'user:' + id;\n    const cached = await this.redis.get(cacheKey);\n    if (cached) return JSON.parse(cached);\n    const user = await this.db.users.findByPk(id);\n    if (!user) return null;\n    await this.redis.set(cacheKey, JSON.stringify(user), 'EX', 3600);\n    return user;\n  }\n\n  async updateUser(id, data) {\n    const user = await this.db.users.update(data, { where: { id }, returning: true });\n    await this.redis.del('user:' + id);\n    return user;\n  }\n}\n\n// Multi-level cache: L1 (in-memory) + L2 (Redis)\nclass MultiLevelCache {\n  constructor(l1Cache, l2Cache, loader) {\n    this.l1 = l1Cache;\n    this.l2 = l2Cache;\n    this.loader = loader;\n  }\n\n  async get(key) {\n    const l1 = this.l1.get(key);\n    if (l1) return l1.value;\n    const l2 = await this.l2.get(key);\n    if (l2) {\n      this.l1.set(key, { value: JSON.parse(l2), expiry: Date.now() + 60000 });\n      return JSON.parse(l2);\n    }\n    const data = await this.loader(key);\n    if (data) {\n      await this.l2.set(key, JSON.stringify(data), 'EX', 3600);\n      this.l1.set(key, { value: data, expiry: Date.now() + 60000 });\n    }\n    return data;\n  }\n\n  invalidate(key) {\n    this.l1.delete(key);\n    this.l2.del(key);\n  }\n}",
            "commonMistakes": "Caching too much data. No TTL on cache keys. Caching user-specific data without isolation. Not invalidating cache on writes. Cache miss stampede on startup.",
            "bestPractices": "Set appropriate TTL. Use cache-aside for read-heavy workloads. Implement cache invalidation on writes. Use multi-level caching (L1 local + L2 Redis). Monitor hit ratio.",
            "interviewPerspective": "Application caching is core FAANG system design. Key: (1) Cache-aside vs read-through vs write-through. (2) Local vs distributed cache. (3) Cache invalidation strategies. (4) Multi-level caching. (5) Cache stampede prevention.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-appcache-1",
              "question": "What is the cache-aside pattern?",
              "options": [
                "Application checks cache first, on miss fetches from DB and updates cache",
                "Cache automatically loads from DB",
                "Database writes directly to cache",
                "Cache mirrors database"
              ],
              "correctIndex": 0,
              "explanation": "Cache-aside: app reads from cache, on miss reads from DB and populates cache.",
              "difficulty": "easy"
            },
            {
              "id": "be-appcache-2",
              "question": "What is the main disadvantage of write-behind caching?",
              "options": [
                "Potential data loss if cache fails before DB write completes",
                "Slower reads",
                "Higher memory usage",
                "Complex implementation"
              ],
              "correctIndex": 0,
              "explanation": "Write-behind writes to cache first, DB asynchronously. Data loss if cache fails.",
              "difficulty": "hard"
            },
            {
              "id": "be-appcache-3",
              "question": "Why use multi-level caching (L1 + L2)?",
              "options": [
                "L1 (local) is microsecond-fast; L2 (Redis) is shared across instances",
                "L1 is for large data",
                "L2 is faster",
                "L1 is more reliable"
              ],
              "correctIndex": 0,
              "explanation": "L1 provides zero-latency. L2 provides consistency across app instances.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design a caching layer for Twitter's tweet timeline serving 1B requests/day.",
              "answer": "L1: in-memory per instance, top 200 tweets, TTL 60s. L2: Redis Cluster, TTL 5 min. Write: fanout to followers' L2 caches. Stampede prevention: lock around DB generation. For influencers: merge cached + recent tweets on read.",
              "difficulty": "expert",
              "company": "Twitter"
            },
            {
              "question": "How do you handle cache inconsistency in a distributed system?",
              "answer": "Sources: write to DB succeeds but cache invalidation fails. Solutions: (1) TTL as consistency guarantee. (2) Write-through cache. (3) CDC (Debezium) captures DB changes to update cache. (4) Version-based: store version in cache. Accept eventual consistency with bounded staleness.",
              "difficulty": "expert",
              "company": "Uber"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "distributed-caching",
          "title": "Distributed Caching",
          "order": 3,
          "content": {
            "overview": "Distributed caching shares cached data across multiple application instances. Redis Cluster, Memcached provide distributed cache with consistency, replication, and partitioning.",
            "problemStatement": "In-memory caching on each app instance creates data duplication and inconsistency. User data cached on instance A is unavailable on B. Distributed caches provide a shared, consistent cache pool.",
            "intuitionFirst": "Instead of each waiter having their own notepad with customer preferences, waiters check a shared iPad at the host stand. Any waiter can access any customer's preferences.",
            "realLifeAnalogy": "A shared office whiteboard: instead of each team member keeping their own list, everyone reads and writes to the same board. If one person updates, everyone sees it.",
            "howItWorks": "Distributed caches partition data across nodes (sharding). Redis Cluster uses hash slots (16384 total). Consistent hashing minimizes reshuffling when nodes join/leave.",
            "beginnerExample": "// Redis Cluster setup with ioredis\nconst Redis = require('ioredis');\nconst cluster = new Redis.Cluster([\n  { host: 'redis-node-1', port: 6379 },\n  { host: 'redis-node-2', port: 6379 },\n  { host: 'redis-node-3', port: 6379 },\n], {\n  scaleReads: 'slave',\n  redisOptions: { enableAutoPipelining: true },\n});\n\n// Distributed rate limiter\nclass DistributedRateLimiter {\n  async check(userId) {\n    const key = 'ratelimit:' + userId + ':' + Math.floor(Date.now() / 1000 / this.windowSec);\n    const current = await this.redis.incr(key);\n    if (current === 1) await this.redis.expire(key, this.windowSec);\n    return current <= this.maxRequests;\n  }\n}\n\n// Consistent hashing (simplified)\nclass ConsistentHashRing {\n  addNode(nodeId) {\n    for (let i = 0; i < this.replicas; i++) {\n      const hash = this.hash(nodeId + ':' + i);\n      this.ring.set(hash, nodeId);\n    }\n  }\n  getNode(key) {\n    const hash = this.hash(key);\n    // Find nearest node clockwise\n    return this.ring.get(this.findNearest(hash));\n  }\n}",
            "commonMistakes": "Using Redis on same instances as application (resource contention). Not handling network partitions. Inconsistent hash ring causing hot spots.",
            "bestPractices": "Run Redis on dedicated nodes. Use Redis Cluster for HA. Monitor node health. Choose appropriate eviction policy. Use pipelines for batch operations.",
            "interviewPerspective": "Distributed caching is critical at FAANG scale. Key: (1) Consistent hashing. (2) Redis Cluster hash slots. (3) Cache replication and failover. (4) Hot key problem. (5) Redlock algorithm.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-distcache-1",
              "question": "How does consistent hashing help in distributed caching?",
              "options": [
                "Minimizes key redistribution when nodes join/leave; only K/n keys move",
                "Eliminates replication",
                "Provides load balancing",
                "Improves memory"
              ],
              "correctIndex": 0,
              "explanation": "Consistent hashing ensures only a fraction of keys remap when cluster changes.",
              "difficulty": "hard"
            },
            {
              "id": "be-distcache-2",
              "question": "What is the hot key problem in distributed caching?",
              "options": [
                "A single key receives disproportionate traffic, overloading the node that owns it",
                "Keys never accessed",
                "Keys with long names",
                "Expired keys"
              ],
              "correctIndex": 0,
              "explanation": "Hot keys overwhelm a single shard. Solutions: local cache, key replication, read replicas.",
              "difficulty": "medium"
            },
            {
              "id": "be-distcache-3",
              "question": "Why does Redis Cluster not support multi-key operations across hash slots?",
              "options": [
                "Cross-slot operations need distributed transactions, compromising linear scalability",
                "Hash slots on different servers",
                "Network latency",
                "Redis doesn't support multi-key ops"
              ],
              "correctIndex": 0,
              "explanation": "Multi-key across slots would need distributed transactions, breaking scalability.",
              "difficulty": "hard"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design a distributed cache for session data serving 500M users.",
              "answer": "Redis Cluster with 20 shards (primary + replica). Hot keys: local L1 cache (30s TTL) + key replication to 3 shards. Consistency: eventual consistency acceptable. Capacity: 200 bytes * 500M = 100GB + overhead. P99 latency < 5ms.",
              "difficulty": "expert",
              "company": "Meta"
            },
            {
              "question": "Compare Redis Cluster vs Memcached for high-throughput caching.",
              "answer": "Redis Cluster: data structures, persistence, replication, Lua scripting, 500K ops/sec. Memcached: multi-threaded, 1M+ ops/sec, no persistence. Recommendation: Redis for structured data, Memcached for raw HTML fragments.",
              "difficulty": "hard",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        }
      ]
    },
    {
      "slug": "message-queues",
      "title": "Message Queues",
      "description": "Build asynchronous systems with RabbitMQ, Apache Kafka, and Bull/BullMQ for message queuing and event streaming",
      "order": 11,
      "subtopics": [
        {
          "slug": "rabbitmq",
          "title": "RabbitMQ",
          "order": 1,
          "content": {
            "overview": "RabbitMQ is a message broker implementing AMQP 0-9-1 protocol. It supports multiple messaging patterns: point-to-point, publish/subscribe, request/reply, and routing with exchanges.",
            "problemStatement": "Synchronous request-response coupling causes cascading failures and scalability limits. RabbitMQ decouples producers from consumers with reliable message delivery.",
            "intuitionFirst": "RabbitMQ is like a postal service: you drop a letter at the post office (exchange), which routes it to the correct mailbox (queue). The recipient checks their mailbox when ready.",
            "realLifeAnalogy": "A restaurant kitchen: the waiter places order tickets on a spindle (exchange). Different stations (queues): grill, salad, dessert. Each station picks up relevant tickets.",
            "howItWorks": "Producers publish to exchanges. Exchanges route based on routing keys and bindings. Consumers subscribe to queues and acknowledge messages. Dead letter queues handle failures.",
            "beginnerExample": "// Producer with amqplib\nconst amqp = require('amqplib');\n\nasync function publishTask(task) {\n  const connection = await amqp.connect(process.env.RABBITMQ_URL);\n  const channel = await connection.createChannel();\n  const exchange = 'tasks';\n  await channel.assertExchange(exchange, 'direct', { durable: true });\n  await channel.assertQueue('email_queue', { durable: true });\n  await channel.bindQueue('email_queue', exchange, 'email');\n  channel.publish(exchange, task.type, Buffer.from(JSON.stringify(task)), {\n    persistent: true,\n    contentType: 'application/json',\n  });\n  await channel.close();\n  await connection.close();\n}\n\n// Consumer with fair dispatch\nasync function startEmailConsumer() {\n  const connection = await amqp.connect(process.env.RABBITMQ_URL);\n  const channel = await connection.createChannel();\n  await channel.prefetch(1);\n  channel.consume('email_queue', async (msg) => {\n    if (msg === null) return;\n    try {\n      const task = JSON.parse(msg.content.toString());\n      await sendEmail(task.to, task.subject);\n      channel.ack(msg);\n    } catch (err) {\n      channel.nack(msg, false, true);\n    }\n  }, { noAck: false });\n}",
            "commonMistakes": "Not handling connection failures. Forgetting to ack messages. Using noAck=true in production. Not setting prefetch. Not using persistent messages.",
            "bestPractices": "Always use persistent messages. Set prefetch=1 for fair dispatch. Handle reconnection. Use dead letter queues. Monitor queue depth and consumer lag.",
            "interviewPerspective": "RabbitMQ is used at FAANG for task queues. Key: (1) Exchanges (direct, topic, fanout). (2) Message acknowledgments. (3) Dead letter queues. (4) Clustering and mirroring.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-rmq-1",
              "question": "What is the difference between direct, fanout, and topic exchanges?",
              "options": [
                "Direct: exact routing key. Fanout: broadcast. Topic: pattern matching with wildcards.",
                "All identical",
                "Fanout is fastest",
                "Topic is only for logs"
              ],
              "correctIndex": 0,
              "explanation": "Direct: exact match. Fanout: broadcast. Topic: pattern matching.",
              "difficulty": "medium"
            },
            {
              "id": "be-rmq-2",
              "question": "What happens if a consumer crashes without acknowledging a message?",
              "options": [
                "Message is requeued and delivered to another consumer",
                "Message is lost",
                "Queue is deleted",
                "Broker restarts"
              ],
              "correctIndex": 0,
              "explanation": "Unacknowledged messages are requeued when consumer connection drops.",
              "difficulty": "hard"
            },
            {
              "id": "be-rmq-3",
              "question": "What is the purpose of prefetch in RabbitMQ?",
              "options": [
                "Limits unacknowledged messages per consumer for fair dispatch",
                "Pre-fetches messages faster",
                "Caches on consumer",
                "Increases throughput"
              ],
              "correctIndex": 0,
              "explanation": "Prefetch=1 ensures one message at a time per consumer.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design a reliable task queue for processing image uploads at Instagram scale.",
              "answer": "Producer -> exchange 'image_ops' -> queues per operation type. Workers with prefetch=1. Retry: exponential backoff, max 3 retries. Dedup: message IDs in Redis. DLQ for failures. Monitoring: queue depth, consumer lag.",
              "difficulty": "expert",
              "company": "Instagram"
            },
            {
              "question": "How would you migrate from RabbitMQ to Kafka for real-time analytics?",
              "answer": "Dual-write during transition. Build Kafka consumers for new events. Use Kafka Connect for history. Differences: Kafka pull-based, partitioned log, offset tracking, higher throughput. RabbitMQ push-based, AMQP, complex routing.",
              "difficulty": "expert",
              "company": "Uber"
            }
          ],
          "codingChallenges": [
            {
              "title": "Implement a Retry Queue with Exponential Backoff",
              "description": "Create a message processing wrapper that retries failed messages with exponential backoff (1s, 2s, 4s, 8s, max 3 retries). After max, send to DLQ.",
              "difficulty": "hard",
              "starterCode": "class ReliableConsumer {\n  constructor(channel, queueName, handler) {}\n  async processMessage(msg) {}\n}",
              "solutionHint": "Track retry count in message headers. Use delayed message plugin. On nack: check retry count, publish with delay or DLQ."
            }
          ]
        },
        {
          "slug": "kafka",
          "title": "Apache Kafka",
          "order": 2,
          "content": {
            "overview": "Apache Kafka is a distributed event streaming platform for high-throughput, durable, fault-tolerant data pipelines. It uses a publish-subscribe model with partitioned, ordered, and replayable logs.",
            "problemStatement": "Traditional message brokers can't handle millions of events/sec. Kafka captures, stores durably, lets replay, and processes by multiple consumers with different needs.",
            "intuitionFirst": "Kafka is like a newspaper's printing press: events are published to topics. The press stores all newspapers in order (commit log). Subscribers read from any date.",
            "realLifeAnalogy": "A bank's transaction ledger: every transaction is appended in order. Different departments read the same ledger: fraud, accounting, customer service. The ledger is never deleted.",
            "howItWorks": "Producers write events to topics. Topics are partitioned for parallelism. Brokers store and replicate partitions. Consumer groups each read from a subset of partitions.",
            "beginnerExample": "const { Kafka } = require('kafkajs');\n\nconst kafka = new Kafka({\n  clientId: 'my-app',\n  brokers: ['kafka1:9092', 'kafka2:9092'],\n});\n\n// Producer\nconst producer = kafka.producer();\nasync function produceEvents() {\n  await producer.connect();\n  await producer.send({\n    topic: 'user-events',\n    messages: [{\n      key: 'user-42',\n      value: JSON.stringify({ type: 'LOGIN', userId: 42 }),\n    }],\n  });\n}\n\n// Consumer\nconst consumer = kafka.consumer({ groupId: 'email-service' });\nasync function startConsumer() {\n  await consumer.connect();\n  await consumer.subscribe({ topic: 'user-events' });\n  await consumer.run({\n    eachMessage: async ({ topic, partition, message }) => {\n      const event = JSON.parse(message.value.toString());\n      await processEvent(event);\n    },\n  });\n}",
            "commonMistakes": "Too many partitions. Not setting appropriate replication factor. Ignoring consumer group rebalancing. Large message sizes. Not monitoring consumer lag.",
            "bestPractices": "Choose partition count based on throughput. RF=3 in production. Monitor consumer lag. Use message keys for ordering. Use compression (snappy, lz4). Use idempotent producers.",
            "interviewPerspective": "Kafka is critical at FAANG. Key: (1) Partitioned log architecture. (2) Consumer groups and rebalancing. (3) Replication and ISR. (4) Exactly-once semantics. (5) Kafka vs Pulsar.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-kafka-1",
              "question": "What is a Kafka partition?",
              "options": [
                "An ordered, immutable sequence of messages. Partitions enable parallelism.",
                "A group of topics",
                "A single broker",
                "A consumer group"
              ],
              "correctIndex": 0,
              "explanation": "Partitions are the unit of parallelism - ordered, immutable logs.",
              "difficulty": "medium"
            },
            {
              "id": "be-kafka-2",
              "question": "How does Kafka achieve fault tolerance?",
              "options": [
                "Replication - each partition has N replicas; ISR replica takes over if leader fails",
                "All data on all brokers",
                "Kafka has no fault tolerance",
                "Database replication"
              ],
              "correctIndex": 0,
              "explanation": "Kafka replicates partitions across N brokers. ISR replicas take over on failure.",
              "difficulty": "hard"
            },
            {
              "id": "be-kafka-3",
              "question": "What happens during consumer group rebalancing?",
              "options": [
                "Partitions reassigned among consumers. All stop processing until complete.",
                "Topic deleted",
                "Consumers restarted",
                "New brokers added"
              ],
              "correctIndex": 0,
              "explanation": "Rebalancing redistributes partitions when consumers join/leave.",
              "difficulty": "hard"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design a real-time fraud detection system using Kafka at Uber scale.",
              "answer": "Source topics: trip-events, payment-events. Kafka Streams joins streams, computes features (ride frequency, geo-velocity). ML model consumes feature topic. Alert topic for suspicious events. Partition by user_id. Exactly-once semantics.",
              "difficulty": "expert",
              "company": "Uber"
            },
            {
              "question": "Compare Kafka and Pulsar for multi-region event streaming.",
              "answer": "Kafka: mature ecosystem, higher throughput, synchronous replication. Challenges: mirroring across regions, rebalancing. Pulsar: built-in multi-region replication, compute-storage separation, native tiered storage. Recommendation: Kafka for single-region, Pulsar for multi-region.",
              "difficulty": "expert",
              "company": "Twitter"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "bull-queue",
          "title": "Bull/BullMQ",
          "order": 3,
          "content": {
            "overview": "BullMQ is a premium Redis-based queue system for Node.js. It provides job scheduling, retries, rate limiting, concurrency control, and job lifecycle management on top of Redis.",
            "problemStatement": "Background job processing needs: persistence, scheduling, retry logic, rate limiting, concurrency control, and observability. BullMQ provides these using Redis data structures.",
            "intuitionFirst": "BullMQ is like a production line: items (jobs) on the belt (queue), workers pick at their own pace, defective items go to repair (retry), dashboard shows job states.",
            "realLifeAnalogy": "Airport baggage handling: bags (jobs) checked in, sorted to flights, loaded onto planes. Lost bags retried. Dashboard shows bags in each status.",
            "howItWorks": "BullMQ uses Redis lists, sets, and sorted sets to track job states: wait, active, completed, failed, delayed. Workers pull from wait, process, move to completed or failed.",
            "beginnerExample": "const { Queue, Worker, QueueScheduler } = require('bullmq');\n\nconst connection = {\n  host: process.env.REDIS_HOST || 'localhost',\n  port: 6379,\n};\n\nconst emailQueue = new Queue('email', { connection });\n\nasync function addJobs() {\n  await emailQueue.add('send-welcome', {\n    to: 'user@example.com',\n    subject: 'Welcome!',\n  });\n\n  // Delayed job (1 hour later)\n  await emailQueue.add('send-followup', {\n    to: 'user@example.com',\n  }, {\n    delay: 3600000,\n    attempts: 3,\n    backoff: { type: 'exponential', delay: 60000 },\n  });\n}\n\n// Worker processes jobs\nconst worker = new Worker('email', async (job) => {\n  console.log('Processing job:', job.id);\n  await job.updateProgress(50);\n  await sendEmail(job.data.to, job.data.subject);\n  return { sent: true };\n}, {\n  connection,\n  concurrency: 10,\n  limiter: { max: 100, duration: 1000 },\n});\n\nworker.on('completed', (job) => {\n  console.log('Job completed:', job.id);\n});\n\nworker.on('failed', (job, err) => {\n  console.error('Job failed:', job.id, err.message);\n});",
            "commonMistakes": "Not setting maxStalledCount. Not handling job failures. Ignoring Redis connection failures. Not setting removeOnComplete/Fail.",
            "bestPractices": "Set concurrency based on job type. Use rate limiting for external APIs. Implement idempotent jobs (use jobId). Set reasonable lockDuration.",
            "interviewPerspective": "BullMQ represents queue-as-a-library pattern. Key: (1) Redis-based architecture. (2) Job lifecycle states. (3) Concurrency and rate limiting. (4) Job scheduling.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-bull-1",
              "question": "What Redis data structures does BullMQ use?",
              "options": [
                "Lists, Sets, Sorted Sets, Pub/Sub",
                "Only strings",
                "Hashes",
                "Streams only"
              ],
              "correctIndex": 0,
              "explanation": "BullMQ uses lists (wait), sets (active), sorted sets (delayed/completed/failed).",
              "difficulty": "hard"
            },
            {
              "id": "be-bull-2",
              "question": "How does job deduplication work in BullMQ?",
              "options": [
                "Set jobId - if same ID exists, new job is not added",
                "Automatic content-based",
                "Manual checking",
                "Not supported"
              ],
              "correctIndex": 0,
              "explanation": "Setting jobId prevents duplicate jobs with the same ID.",
              "difficulty": "medium"
            },
            {
              "id": "be-bull-3",
              "question": "What happens when a worker crashes while processing a job?",
              "options": [
                "Job becomes stalled and retried up to maxStalledCount",
                "Job is lost",
                "Job auto-completed",
                "Queue pauses"
              ],
              "correctIndex": 0,
              "explanation": "Stalled jobs are retried up to maxStalledCount.",
              "difficulty": "hard"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design a job queue system for processing YouTube video uploads.",
              "answer": "Separate queues per job type: transcode, thumbnail, moderation, caption. Concurrency: 2 for CPU-bound, 10 for fast jobs. Job chaining: upload -> moderation -> transcode -> thumbnail. Failure: 3 retries then notification. Progress tracking per stage.",
              "difficulty": "expert",
              "company": "YouTube"
            },
            {
              "question": "Compare BullMQ with AWS SQS for background job processing.",
              "answer": "BullMQ: rich features (priority, delays, repeats, progress), local-first, real-time events, lower latency. SQS: fully managed, infinite scaling, pay-per-use, built-in DLQ. Recommendation: BullMQ for full-control, SQS for cloud-native.",
              "difficulty": "medium",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        }
      ]
    },
    {
      "slug": "deployment",
      "title": "Deployment",
      "description": "Deploy and manage backend applications with Docker, CI/CD pipelines, and cloud services",
      "order": 12,
      "subtopics": [
        {
          "slug": "docker",
          "title": "Docker",
          "order": 1,
          "content": {
            "overview": "Docker packages applications into portable containers with their dependencies, ensuring consistency across development, staging, and production environments.",
            "problemStatement": "Applications behave differently across environments due to OS differences, dependency versions, and configuration. Docker bundles everything into a standardized container.",
            "intuitionFirst": "Docker containers are like shipping containers: they standardize how applications are packaged, transported, and deployed on any server with Docker Engine.",
            "realLifeAnalogy": "A food truck: the kitchen (container) has everything - stove, ingredients, utensils. It can operate in any location with power. Compare to building a new kitchen at each location.",
            "howItWorks": "Docker uses OS-level virtualization (namespaces, cgroups). Images are layered filesystems from Dockerfiles. Containers add a writable layer on top of read-only image layers.",
            "beginnerExample": "# Multi-stage Dockerfile for Node.js app\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY tsconfig.json ./\nCOPY src/ ./src/\nRUN npm run build\n\nFROM node:20-alpine AS production\nRUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001\nWORKDIR /app\nCOPY --from=builder /app/node_modules ./node_modules\nCOPY --from=builder /app/dist ./dist\nHEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD node -e \"require('http').get('http://localhost:3000/health')\"\nUSER nodejs\nEXPOSE 3000\nENV NODE_ENV=production\nCMD ['node', 'dist/index.js']\n\n# docker-compose.yml\nversion: '3.8'\nservices:\n  app:\n    build: .\n    ports: ['3000:3000']\n    environment:\n      NODE_ENV: production\n      DB_HOST: postgres\n    depends_on:\n      postgres:\n        condition: service_healthy\n    restart: unless-stopped\n    deploy:\n      resources:\n        limits:\n          cpus: '1'\n          memory: 512M\n  postgres:\n    image: postgres:16-alpine\n    volumes: ['postgres_data:/var/lib/postgresql/data']\n    healthcheck:\n      test: ['CMD-SHELL', 'pg_isready']\n\nvolumes:\n  postgres_data:",
            "commonMistakes": "Running containers as root. Not using .dockerignore. Hardcoding environment variables. Not setting resource limits. Not using health checks.",
            "bestPractices": "Use multi-stage builds. Run as non-root user. Pin base image versions. Use .dockerignore. Set resource limits. Implement health checks.",
            "interviewPerspective": "Docker is essential at FAANG. Key: (1) Container vs VM. (2) Dockerfile best practices. (3) Docker networking. (4) Volumes vs bind mounts. (5) Container orchestration.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-docker-1",
              "question": "What is the difference between a Docker image and a container?",
              "options": [
                "Image is a read-only template; container is a running instance",
                "Same thing",
                "Container is a template",
                "Image is running"
              ],
              "correctIndex": 0,
              "explanation": "Images are immutable templates. Containers are running instances.",
              "difficulty": "easy"
            },
            {
              "id": "be-docker-2",
              "question": "Why use multi-stage Docker builds?",
              "options": [
                "Smaller final images by separating build tools from runtime deps",
                "Faster builds only",
                "Better security only",
                "Easier debugging"
              ],
              "correctIndex": 0,
              "explanation": "Multi-stage builds discard build tools, resulting in smaller images.",
              "difficulty": "medium"
            },
            {
              "id": "be-docker-3",
              "question": "How does Docker ensure container isolation?",
              "options": [
                "Namespaces (process, network, mount) and cgroups (resource limits)",
                "Virtual machines",
                "Firewalls",
                "User permissions only"
              ],
              "correctIndex": 0,
              "explanation": "Docker uses namespaces for isolation and cgroups for limits.",
              "difficulty": "hard"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design a Docker-based deployment strategy for microservices with zero-downtime deployments.",
              "answer": "Multi-stage Dockerfile with health check. CI builds image, tags with SHA. CD: rolling update with maxSurge=25%, maxUnavailable=0. Blue-green: parallel environments. Canary: 5% traffic to new version. Rollback via previous 'stable' image. Database: backward-compatible migrations.",
              "difficulty": "expert",
              "company": "Netflix"
            },
            {
              "question": "How do you handle secrets in Docker containers?",
              "answer": "Bad: env vars in Dockerfile. Good: Docker secrets (Swarm), HashiCorp Vault sidecar, AWS Secrets Manager with SDK. Best practice: secrets manager + IAM roles. For dev: .env files never committed.",
              "difficulty": "hard",
              "company": "GitLab"
            }
          ],
          "codingChallenges": [
            {
              "title": "Create a Dockerfile Optimization Script",
              "description": "Analyze a Node.js Dockerfile and optimize using multi-stage builds, layer caching, non-root user, health checks, and minimal base image.",
              "difficulty": "hard",
              "starterCode": "# Given:\nFROM node:18\nWORKDIR /app\nCOPY . .\nRUN npm install\nRUN npm run build\nEXPOSE 3000\nCMD ['npm', 'start']\n\n# Create optimized version",
              "solutionHint": "Use alpine base, multi-stage, npm ci before src copy, non-root user, healthcheck."
            }
          ]
        },
        {
          "slug": "cicd",
          "title": "CI/CD",
          "order": 2,
          "content": {
            "overview": "Continuous Integration and Continuous Deployment automate building, testing, and deploying code changes. CI ensures every commit is integrated and tested. CD automates deployment to environments.",
            "problemStatement": "Manual deployment is slow, error-prone, and inconsistent. CI/CD makes deployments fast, repeatable, and safe with automated pipelines, testing, and rollback.",
            "intuitionFirst": "CI/CD is like an automated car assembly line: each part (code change) moves through quality checks (tests), paint (build), inspection (security), and final assembly (deployment).",
            "realLifeAnalogy": "A publishing house: author writes chapter (commit), editor reviews, typesetter formats, proofreader checks, senior editor approves, then published. Automated CI/CD makes it instant.",
            "howItWorks": "Pipeline: source -> build -> test -> security scan -> deploy staging -> integration tests -> deploy production. Defined as code (YAML). Triggers: push, PR, schedule.",
            "beginnerExample": "# GitHub Actions CI/CD pipeline\nname: CI/CD Pipeline\non:\n  push:\n    branches: [main]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    services:\n      postgres:\n        image: postgres:16-alpine\n        env:\n          POSTGRES_DB: test\n        ports: ['5432:5432']\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: '20'\n          cache: 'npm'\n      - run: npm ci\n      - run: npm run lint\n      - run: npm run typecheck\n      - run: npm run test:unit\n\n  build:\n    needs: test\n    steps:\n      - run: docker build -t myapp:sha .\n      - run: docker push myapp:sha\n\n  deploy-production:\n    needs: build\n    if: github.ref == 'refs/heads/main'\n    steps:\n      - run: kubectl set image deployment/app app=myapp:sha\n      - run: kubectl rollout status deployment/app",
            "commonMistakes": "Running all tests in one stage. Hardcoding secrets in YAML. Not caching dependencies. Deploying without smoke tests. No rollback plan.",
            "bestPractices": "Parallelize test stages. Use dependency caching. Implement deployment gates. Test migrations in CI. Use environment-specific configs.",
            "interviewPerspective": "CI/CD maturity is key at FAANG. Key: (1) Pipeline stages and parallelization. (2) Trunk-based development. (3) Deployment strategies: rolling, blue-green, canary. (4) GitOps. (5) DORA metrics.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-cicd-1",
              "question": "What is the difference between CI and CD?",
              "options": [
                "CI: automatically builds and tests every commit. CD: automatically deploys after CI passes.",
                "CI is for code, CD is for data",
                "Same thing",
                "CI for frontend, CD for backend"
              ],
              "correctIndex": 0,
              "explanation": "CI automates build/test. CD automates deployment after CI.",
              "difficulty": "easy"
            },
            {
              "id": "be-cicd-2",
              "question": "What is a canary deployment?",
              "options": [
                "Gradually rolling out to a small subset before full deployment",
                "Deploy to all at once",
                "Blue-green",
                "Manual deployment"
              ],
              "correctIndex": 0,
              "explanation": "Canary sends small % of traffic to new version, monitoring before full rollout.",
              "difficulty": "medium"
            },
            {
              "id": "be-cicd-3",
              "question": "What is GitOps?",
              "options": [
                "Git is single source of truth for infrastructure and app config, reconciled automatically",
                "Git backup",
                "Git code review",
                "Git hooks"
              ],
              "correctIndex": 0,
              "explanation": "GitOps uses Git as source of truth; reconciler syncs actual state to match.",
              "difficulty": "hard"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design a CI/CD pipeline for a monorepo with 50 services ensuring fast feedback.",
              "answer": "Dependency graph to detect affected services. Build only affected + dependents. Tools: Nx, Turborepo, Bazel. Parallelize independent tests. Shared cache for node_modules and Docker layers. Staged pipeline: lint -> typecheck -> unit (parallel) -> integration -> build -> deploy.",
              "difficulty": "expert",
              "company": "Google"
            },
            {
              "question": "How do you handle database migrations in CI/CD without downtime?",
              "answer": "Backward-compatible migrations (expand-contract). CI runs migrations against test DB. Migrations run before app deploy. Add columns first, dual-write, backfill, swap reads, remove old. Automated rollback on failure.",
              "difficulty": "expert",
              "company": "Stripe"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "cloud-services",
          "title": "Cloud Services",
          "order": 3,
          "content": {
            "overview": "Cloud platforms (AWS, GCP, Azure) provide managed infrastructure: compute (EC2, Lambda), storage (S3, RDS), and networking (VPC, CloudFront). Understanding service selection is critical.",
            "problemStatement": "Managing physical servers requires capital investment and operational overhead. Cloud services provide on-demand resources, auto-scaling, and managed databases without upfront costs.",
            "intuitionFirst": "Cloud services are like a power grid vs a generator. Instead of maintaining your own generator (on-premise), plug into the grid (cloud) and pay for what you use.",
            "realLifeAnalogy": "A restaurant supply company: rent kitchen space (EC2), storage fridges (S3), delivery fleet (Lambda) - all without building your own restaurant from scratch.",
            "howItWorks": "Providers offer IaaS (VMs, networking), PaaS (managed DBs), and SaaS. Compute: EC2, Lambda, ECS. Storage: S3, EBS, RDS. Networking: VPC, CloudFront. Pay-per-use pricing.",
            "beginnerExample": "// AWS S3 upload with SDK v3\nconst { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');\n\nconst s3 = new S3Client({\n  region: process.env.AWS_REGION || 'us-east-1',\n  credentials: {\n    accessKeyId: process.env.AWS_ACCESS_KEY_ID,\n    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,\n  },\n});\n\nasync function uploadFile(bucket, key, body, contentType) {\n  const command = new PutObjectCommand({\n    Bucket: bucket,\n    Key: key,\n    Body: body,\n    ContentType: contentType,\n    ServerSideEncryption: 'AES256',\n  });\n  return await s3.send(command);\n}\n\n// AWS Lambda handler\nexports.handler = async (event) => {\n  const { httpMethod, path, body } = event;\n  try {\n    if (httpMethod === 'GET' && path === '/users') {\n      const users = await db.getUsers();\n      return { statusCode: 200, body: JSON.stringify(users) };\n    }\n    return { statusCode: 404, body: 'Not found' };\n  } catch (err) {\n    return { statusCode: 500, body: 'Internal error' };\n  }\n};",
            "commonMistakes": "Over-provisioning resources. Not using Auto Scaling. Ignoring multi-AZ deployment. Public S3 buckets. Not tagging resources.",
            "bestPractices": "Use Infrastructure as Code. Implement least-privilege IAM roles. Enable encryption. Use Auto Scaling. Design for multi-AZ. Set up billing alerts.",
            "interviewPerspective": "Cloud services knowledge expected at FAANG. Key: (1) Compute: EC2 vs Lambda vs ECS. (2) Storage: S3 vs EBS vs RDS. (3) VPC design. (4) Serverless architectures. (5) Well-Architected Framework.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-cloud-1",
              "question": "When should you use AWS Lambda instead of EC2?",
              "options": [
                "Lambda: event-driven, short-lived, variable load. EC2: long-running, predictable, full control.",
                "Lambda always better",
                "EC2 always better",
                "Same purpose"
              ],
              "correctIndex": 0,
              "explanation": "Lambda for event-driven short tasks. EC2 for long-running or custom config.",
              "difficulty": "medium"
            },
            {
              "id": "be-cloud-2",
              "question": "What is the difference between S3 Standard and Standard-IA?",
              "options": [
                "Standard-IA costs less per GB but has retrieval fee, for infrequent access",
                "Standard-IA is faster",
                "Standard-IA is slower",
                "Costs more"
              ],
              "correctIndex": 0,
              "explanation": "Standard-IA has lower storage cost but retrieval fee.",
              "difficulty": "easy"
            },
            {
              "id": "be-cloud-3",
              "question": "What is a VPC in AWS?",
              "options": [
                "Virtual Private Cloud - logically isolated network for AWS resources",
                "Virtual Private Computer",
                "EC2 instance type",
                "Database service"
              ],
              "correctIndex": 0,
              "explanation": "VPC provides isolated virtual network with subnets and security groups.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design a cost-optimized AWS architecture for a video streaming platform with 1M DAU.",
              "answer": "EC2 Spot for transcoding (80% savings). Lambda for thumbnails. S3 Standard for hot videos, Glacier for archive. CloudFront CDN. RDS Multi-AZ with read replicas. Reserved Instances for baseline. Auto Scaling for demand.",
              "difficulty": "expert",
              "company": "Netflix"
            },
            {
              "question": "Compare AWS ECS vs EKS vs Lambda for microservices.",
              "answer": "ECS: AWS-native, simpler, Fargate serverless option. EKS: Kubernetes, portable, rich ecosystem. Lambda: function-based, event-driven, auto-scaling. Decision: control (EKS), simplicity (ECS), minimal ops (Lambda).",
              "difficulty": "hard",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        }
      ]
    },
    {
      "slug": "system-design-concepts",
      "title": "System Design Concepts",
      "description": "Master load balancing, database scaling, microservices, and distributed systems architecture patterns",
      "order": 13,
      "subtopics": [
        {
          "slug": "load-balancing",
          "title": "Load Balancing",
          "order": 1,
          "content": {
            "overview": "Load balancers distribute incoming traffic across multiple servers to ensure availability, reliability, and scalability. They perform health checks, SSL termination, and traffic routing using algorithms like round-robin, least connections, and consistent hashing.",
            "problemStatement": "A single server has limited capacity and is a single point of failure. As traffic grows, one server cannot handle all requests. Load balancers distribute load, handle failures, and enable horizontal scaling.",
            "intuitionFirst": "A load balancer is like a receptionist at a call center: incoming calls (requests) arrive, and the receptionist directs each caller to the next available agent (server). If an agent is busy or away (unhealthy), calls go to others.",
            "realLifeAnalogy": "Multiple checkout lanes at a supermarket: a greeter (load balancer) directs customers to open lanes (servers). If a lane is closed (server down), customers are redirected to other lanes. During rush hour, more lanes open (auto-scaling).",
            "howItWorks": "Load balancers sit between clients and servers. They terminate TCP connections (client connects to LB, LB connects to server). LB performs health checks (HTTP, TCP) to detect unhealthy servers and remove them from rotation. Algorithms: round-robin (simple), least connections (balance load), IP hash (session persistence), and weighted variants. Layer 4 (TCP/UDP) vs Layer 7 (HTTP/HTTPS) load balancing.",
            "beginnerExample": "// Layer 7 load balancing with NGINX\n// upstream backend {\n//   least_conn;\n//   server app1:3000 weight=3 max_fails=3 fail_timeout=30s;\n//   server app2:3000 weight=2;\n//   server app3:3000 backup;\n//   keepalive 32;\n// }\n// server {\n//   listen 443 ssl http2;\n//   location / {\n//     proxy_pass http://backend;\n//     proxy_http_version 1.1;\n//   }\n// }\n\n// Application-level load balancing\nconst http = require('http');\n\nclass LoadBalancer {\n  constructor(servers) {\n    this.servers = servers;\n    this.current = 0;\n  }\n  getNextServer() {\n    const server = this.servers[this.current];\n    this.current = (this.current + 1) % this.servers.length;\n    return server;\n  }\n  getLeastBusy() {\n    return this.servers.reduce((best, s) =>\n      (s.activeConnections || 0) < (best.activeConnections || 0) ? s : best\n    );\n  }\n  getServerByIP(ip) {\n    const hash = ip.split('.').reduce((acc, octet) => acc + parseInt(octet), 0);\n    return this.servers[hash % this.servers.length];\n  }\n}\n\nclass HealthChecker {\n  constructor(servers, options = {}) {\n    this.servers = servers;\n    this.interval = options.interval || 5000;\n    this.timeout = options.timeout || 2000;\n    this.unhealthyThreshold = options.unhealthyThreshold || 3;\n  }\n  start() {\n    this.timer = setInterval(() => this.checkAll(), this.interval);\n  }\n  async checkAll() {\n    for (const server of this.servers) {\n      try {\n        const controller = new AbortController();\n        const timeout = setTimeout(() => controller.abort(), this.timeout);\n        const response = await fetch('http://' + server.host + ':' + server.port + '/health', {\n          signal: controller.signal,\n        });\n        clearTimeout(timeout);\n        server.healthy = response.ok;\n        server.consecutiveFailures = response.ok ? 0 : (server.consecutiveFailures || 0) + 1;\n        server.consecutiveSuccess = response.ok ? (server.consecutiveSuccess || 0) + 1 : 0;\n      } catch (err) {\n        server.consecutiveFailures = (server.consecutiveFailures || 0) + 1;\n        server.consecutiveSuccess = 0;\n        if (server.consecutiveFailures >= this.unhealthyThreshold) {\n          server.healthy = false;\n        }\n      }\n    }\n  }\n  stop() {\n    clearInterval(this.timer);\n  }\n}",
            "commonMistakes": "Not configuring health checks (LB sends traffic to dead servers). Single-AZ deployment (load balancer becomes SPOF). Not setting connection draining. Sticky sessions without understanding cache implications.",
            "bestPractices": "Always use health checks. Deploy load balancers across multiple AZs. Enable connection draining. Use least connections for variable request durations. Implement circuit breakers. Use Layer 7 for HTTP APIs.",
            "interviewPerspective": "Load balancing is fundamental to FAANG system design. Key topics: (1) Layer 4 vs Layer 7. (2) Algorithms: round-robin, least connections, IP hash, consistent hashing. (3) Health checks. (4) Session persistence tradeoffs. (5) Global load balancing (GeoDNS, latency-based). (6) Circuit breaker pattern.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-lb-1",
              "question": "What is the difference between Layer 4 and Layer 7 load balancing?",
              "options": [
                "Layer 4 routes based on TCP/UDP info (IP, port). Layer 7 routes based on HTTP content (URL, headers, cookies).",
                "Layer 4 is faster",
                "Layer 7 is less secure",
                "They are identical"
              ],
              "correctIndex": 0,
              "explanation": "Layer 4 routes on IP/port/TCP. Layer 7 inspects HTTP content for smarter routing.",
              "difficulty": "medium"
            },
            {
              "id": "be-lb-2",
              "question": "What is connection draining in a load balancer?",
              "options": [
                "Allows in-flight requests to complete before removing a server from rotation",
                "Removes connections immediately",
                "Increases connection timeout",
                "Reduces server load"
              ],
              "correctIndex": 0,
              "explanation": "Connection draining lets existing requests complete before server removal.",
              "difficulty": "hard"
            },
            {
              "id": "be-lb-3",
              "question": "When would you use consistent hashing in load balancing?",
              "options": [
                "For caching layers where minimal key redistribution on server changes is critical",
                "For all HTTP APIs",
                "For static content only",
                "For database queries"
              ],
              "correctIndex": 0,
              "explanation": "Consistent hashing minimizes cache key redistribution when servers change.",
              "difficulty": "hard"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design a global load balancing strategy for a latency-sensitive application serving users worldwide.",
              "answer": "Global LB architecture: (1) DNS-based: Route53 latency-based routing to nearest regional cluster. (2) Anycast: Cloudflare/Fastly Anycast IP from all edge locations. (3) Regional: each region has ALB across AZs. (4) Cross-region failover: health-checked DNS failover. (5) Traffic routing: weighted (canary), latency-based, geo-proximity. (6) Session affinity: consistent hashing on user ID. Google uses global Anycast + regional GCLB. Netflix uses DNS-based routing to regional AWS stacks.",
              "difficulty": "expert",
              "company": "Cloudflare"
            },
            {
              "question": "How does a load balancer handle WebSocket connections?",
              "answer": "WebSocket challenges: (1) Long-lived connections - LB must support idle timeouts > 1 hour. (2) Sticky sessions required. (3) No standard health check for WebSocket. Solutions: (1) Layer 4 LB with TCP proxy. (2) ALB with WebSocket support. (3) Sticky sessions via cookie or source IP hash. (4) Connection draining with high timeout. (5) Separate HTTP health check endpoint.",
              "difficulty": "hard",
              "company": "Discord"
            }
          ],
          "codingChallenges": [
            {
              "title": "Implement a Simple Load Balancer",
              "description": "Create a basic HTTP load balancer in Node.js with round-robin distribution, health checks, connection draining, and circuit breaker pattern.",
              "difficulty": "expert",
              "starterCode": "class SimpleLoadBalancer {\n  constructor(servers, options = {}) {\n  }\n  async handleRequest(req, res) {}\n  healthCheck() {}\n  getHealthyServer() {}\n}",
              "solutionHint": "Create HTTP server proxying to backends. Track health via periodic checks. Circuit breaker: after N failures, skip for cooldown."
            }
          ]
        },
        {
          "slug": "database-scaling",
          "title": "Database Scaling",
          "order": 2,
          "content": {
            "overview": "Database scaling strategies handle growing data and query loads through vertical scaling (bigger servers), horizontal scaling (sharding), read replicas, connection pooling, and caching. Each approach has tradeoffs in complexity, consistency, and cost.",
            "problemStatement": "A single database server has limits on storage, CPU, memory, and network. As data grows (millions of rows) and queries increase (thousands/sec), the database becomes a bottleneck. Scaling strategies distribute load while maintaining data integrity and query performance.",
            "intuitionFirst": "Database scaling is like a library that has outgrown its single building. Options: build a bigger building (vertical scaling), add separate reading rooms for popular sections (read replicas), or split books into multiple libraries by subject (sharding).",
            "realLifeAnalogy": "A restaurant chain's order system: initially one book (single DB). As cities grow: each city gets its own book (sharding by city). Popular recipes printed on cards (caching). Waiters read but not write (read replicas). Headquarters has master book (primary).",
            "howItWorks": "Vertical scaling: larger instances (more CPU, RAM, SSD). Replication: primary handles writes, replicas serve reads (eventual consistency). Sharding: partition data by shard key (range, hash, directory-based). Connection pooling: reuse connections. Caching: Redis/Memcached for hot data.",
            "beginnerExample": "// Read replica setup in Node.js\nconst { Pool } = require('pg');\n\nconst pools = {\n  primary: new Pool({\n    host: 'primary.example.com',\n    database: 'myapp',\n    max: 10,\n  }),\n  replicas: [\n    new Pool({ host: 'replica-1.example.com', database: 'myapp', max: 20 }),\n    new Pool({ host: 'replica-2.example.com', database: 'myapp', max: 20 }),\n    new Pool({ host: 'replica-3.example.com', database: 'myapp', max: 20 }),\n  ],\n};\n\nlet replicaIndex = 0;\nfunction getReadPool() {\n  const pool = pools.replicas[replicaIndex];\n  replicaIndex = (replicaIndex + 1) % pools.replicas.length;\n  return pool;\n}\n\nconst db = {\n  async query(sql, params, isRead = true) {\n    const pool = isRead ? getReadPool() : pools.primary;\n    return pool.query(sql, params);\n  },\n  async write(sql, params) {\n    return pools.primary.query(sql, params);\n  },\n};\n\n// Sharding example: user data sharded by user_id\nclass ShardedDatabase {\n  constructor(shards) {\n    this.shards = shards; // [{host, pool}, ...]\n    this.shardCount = shards.length;\n  }\n\n  getShard(userId) {\n    const shardId = userId % this.shardCount;\n    return this.shards[shardId];\n  }\n\n  async getUser(userId) {\n    const shard = this.getShard(userId);\n    const { rows } = await shard.pool.query('SELECT * FROM users WHERE id = ', [userId]);\n    return rows[0];\n  }\n\n  async createUser(user) {\n    const shard = this.getShard(user.id);\n    const { rows } = await shard.pool.query(\n      'INSERT INTO users (id, name, email) VALUES (, , ) RETURNING *',\n      [user.id, user.name, user.email]\n    );\n    return rows[0];\n  }\n\n  // Cross-shard queries require scatter-gather\n  async getAllUsers() {\n    const results = await Promise.all(\n      this.shards.map(s => s.pool.query('SELECT * FROM users'))\n    );\n    return results.flatMap(r => r.rows);\n  }\n}\n\n// Connection pooling configuration\nconst poolConfig = {\n  max: 20,\n  min: 4,\n  idleTimeoutMillis: 30000,\n  connectionTimeoutMillis: 2000,\n  statement_timeout: 5000,\n  query_timeout: 10000,\n};\n\n// CQRS (Command Query Responsibility Segregation)\n// Separate read model from write model\n// Write: normalized tables for consistency\n// Read: denormalized tables optimized for query patterns\n// Sync: async updates via message queue",
            "commonMistakes": "Applying read replicas without handling replication lag. Poor shard key selection (hot shards). Not planning for resharding. Ignoring connection pool exhaustion. Using cross-shard JOINs. Not monitoring replica lag.",
            "bestPractices": "Monitor replication lag (target < 1 second). Choose shard key with high cardinality and even distribution. Plan for resharding up front. Use separate connection pools for reads and writes. Implement graceful degradation when replicas lag. Use CQRS for complex read patterns.",
            "interviewPerspective": "Database scaling is critical for FAANG system design interviews. Key topics: (1) Vertical vs horizontal scaling. (2) Read replicas and replication lag. (3) Sharding strategies (hash, range, directory). (4) Shard key selection. (5) Resharding and rebalancing. (6) Connection pooling sizing. (7) CQRS and event sourcing. (8) Distributed transactions and the CAP theorem.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-dbscale-1",
              "question": "What is a common problem with read replicas?",
              "options": [
                "Replication lag - replicas may serve stale data",
                "Replicas are read-only",
                "Replicas are slower",
                "Replicas cost more"
              ],
              "correctIndex": 0,
              "explanation": "Replication lag means replicas may not have the latest writes, causing stale reads.",
              "difficulty": "medium"
            },
            {
              "id": "be-dbscale-2",
              "question": "What makes a good shard key?",
              "options": [
                "High cardinality, even distribution, and aligned with query patterns",
                "Any column works",
                "Primary key is always best",
                "The first column in the table"
              ],
              "correctIndex": 0,
              "explanation": "A good shard key has many unique values, distributes evenly, and matches common query filters.",
              "difficulty": "hard"
            },
            {
              "id": "be-dbscale-3",
              "question": "What is CQRS?",
              "options": [
                "Command Query Responsibility Segregation - separate read and write models for different optimization",
                "A database type",
                "A caching strategy",
                "A sharding algorithm"
              ],
              "correctIndex": 0,
              "explanation": "CQRS separates commands (writes) from queries (reads), allowing different models and stores for each.",
              "difficulty": "hard"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design a sharding strategy for a social network's user database with 1B users. Handle resharding and hot shards.",
              "answer": "Shard key: hash of user_id modulo 4096 logical shards. 10 database nodes each hosting ~410 shards. Even distribution via hash. Hot shard (celebrity): cache user data aggressively (Redis, CDN). Read replicas for hot shards. For cross-shard queries (friends list): maintain a separate graph service (Neo4j or custom) that maps user -> [friend_user_ids]. Resharding: (1) Double writes during migration. (2) Move shards one at a time. (3) Use proxy layer (Twemproxy, Vitess) to abstract shard topology. (4) Automated rebalancing when adding nodes: move 4096/n shards per new node. Monitoring: per-shard QPS, latency, storage. Alert on imbalance > 20%.",
              "difficulty": "expert",
              "company": "Meta"
            },
            {
              "question": "How do you handle replication lag in a read replica setup for a real-time application?",
              "answer": "Approaches: (1) Read-after-write consistency: after write, read from primary for that user for N seconds (cookie with write timestamp). (2) Track replication lag per replica: SELECT now() - pg_last_xact_replay_timestamp() as lag. Route to replica only if lag < threshold. (3) Sticky reads: same session reads from primary for consistency. (4) If strong consistency needed: always read from primary. (5) Graceful degradation: if replicas lagging, serve slightly stale data with warning. (6) Async replication with semi-sync (at least one replica has the write). Monitoring: p99 replica lag, lag by replica, spike alerts.",
              "difficulty": "hard",
              "company": "Twitter"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "microservices",
          "title": "Microservices",
          "order": 3,
          "content": {
            "overview": "Microservices architecture structures an application as a collection of loosely coupled, independently deployable services. Each service owns its data, communicates via APIs or message queues, and can be developed, deployed, and scaled independently.",
            "problemStatement": "Monolithic applications become difficult to maintain as they grow: long build times, tightly coupled code, scaling inefficiencies (can't scale parts independently), deployment requires full app redeployment, and team coordination bottlenecks.",
            "intuitionFirst": "Microservices are like a food court: each restaurant (service) is independent, has its own kitchen (database), menu (API), and staff (team). If the pizza place is busy, only pizza scales. If sushi closes for renovation, other restaurants keep running.",
            "realLifeAnalogy": "An airport: each airline (service) operates independently with its own check-in counters (API), baggage handling (data), and staff. They share common infrastructure (terminal, runways = API gateway, message bus). A delay at one airline doesn't shut down the airport.",
            "howItWorks": "Services communicate via HTTP/REST, gRPC, or message queues (Kafka, RabbitMQ). Each service has its own database (database-per-service pattern). API Gateway routes external requests, handles auth, rate limiting, and aggregation. Service mesh (Istio, Linkerd) handles inter-service communication, observability, and security. Containers and orchestration (Kubernetes) manage deployment and scaling.",
            "beginnerExample": "// Service template with Express\nconst express = require('express');\nconst { createProxyMiddleware } = require('http-proxy-middleware');\n\n// API Gateway\nconst gateway = express();\n\n// Service registry (simplified - use Consul/Eureka in production)\nconst services = {\n  'user-service': 'http://user-service:3001',\n  'order-service': 'http://order-service:3002',\n  'payment-service': 'http://payment-service:3003',\n  'notification-service': 'http://notification-service:3004',\n};\n\n// Route to services\nObject.entries(services).forEach(([name, target]) => {\n  gateway.use('/api/' + name, createProxyMiddleware({\n    target,\n    changeOrigin: true,\n    pathRewrite: { '^/api/' + name: '' },\n    onError: (err, req, res) => {\n      console.error('Proxy error:', name, err.message);\n      res.status(503).json({ error: name + ' unavailable' });\n    },\n  }));\n});\n\n// Circuit breaker pattern\nclass CircuitBreaker {\n  constructor(fn, options = {}) {\n    this.fn = fn;\n    this.failureThreshold = options.failureThreshold || 5;\n    this.successThreshold = options.successThreshold || 2;\n    this.timeout = options.timeout || 30000;\n    this.state = 'CLOSED';\n    this.failures = 0;\n    this.successes = 0;\n    this.nextAttempt = Date.now();\n  }\n\n  async call(...args) {\n    if (this.state === 'OPEN') {\n      if (Date.now() < this.nextAttempt) {\n        throw new Error('Circuit breaker is OPEN');\n      }\n      this.state = 'HALF_OPEN';\n    }\n    try {\n      const result = await this.fn(...args);\n      this.onSuccess();\n      return result;\n    } catch (err) {\n      this.onFailure();\n      throw err;\n    }\n  }\n\n  onSuccess() {\n    this.failures = 0;\n    if (this.state === 'HALF_OPEN') {\n      this.successes++;\n      if (this.successes >= this.successThreshold) {\n        this.state = 'CLOSED';\n        this.successes = 0;\n      }\n    }\n  }\n\n  onFailure() {\n    this.failures++;\n    if (this.failures >= this.failureThreshold) {\n      this.state = 'OPEN';\n      this.nextAttempt = Date.now() + this.timeout;\n    }\n  }\n}\n\n// Distributed tracing with correlation IDs\nconst correlator = require('correlation-id');\n\napp.use((req, res, next) => {\n  const correlationId = req.headers['x-correlation-id'] || generateUUID();\n  correlator.withId(correlationId, next);\n});\n\n// Service discovery pattern\n// Using DNS-based discovery (Kubernetes)\n// user-service -> user-service.namespace.svc.cluster.local\n\n// Health check endpoint (all services)\napp.get('/health', (req, res) => {\n  res.json({\n    status: 'UP',\n    service: 'user-service',\n    version: process.env.APP_VERSION,\n    uptime: process.uptime(),\n    database: db.isConnected() ? 'UP' : 'DOWN',\n    redis: cache.isConnected() ? 'UP' : 'DOWN',\n  });\n});\n\n// Startup probe\napp.get('/ready', (req, res) => {\n  if (db.isConnected && cache.isConnected) {\n    return res.status(200).send('Ready');\n  }\n  res.status(503).send('Not ready');\n});",
            "commonMistakes": "Distributed monolith (services tightly coupled via shared DB or sync calls). Premature decomposition (too small services). Ignoring inter-service communication complexity. Not handling partial failures. Inconsistent data across services (no saga pattern). Not implementing observability (logging, metrics, tracing from day one).",
            "bestPractices": "Start with monolith, extract services when needed. Each service owns its data (database-per-service). Use async communication where possible. Implement saga pattern for distributed transactions. Use API gateway for cross-cutting concerns. Implement observability (distributed tracing, structured logging, metrics). Design for failure (circuit breakers, retries, timeouts). Use containers and orchestration for deployment.",
            "interviewPerspective": "Microservices are a core FAANG system design topic. Key: (1) Monolith-first approach. (2) Service boundaries (bounded contexts from Domain-Driven Design). (3) Communication patterns: sync (gRPC) vs async (Kafka). (4) Saga pattern for distributed transactions. (5) API Gateway pattern. (6) Service mesh. (7) Observability: tracing (Jaeger), metrics (Prometheus), logging (ELK). (8) Deployment: CI/CD, blue-green, canary. (9) Anti-patterns: distributed monolith, shared database, chatty services.",
            "performanceNotes": "Consider performance implications and optimization strategies for production deployments.",
            "securityNotes": "Security considerations and best practices to protect against common vulnerabilities."
          },
          "quiz": [
            {
              "id": "be-micro-1",
              "question": "What is a common anti-pattern in microservices?",
              "options": [
                "Shared database between services (creates tight coupling)",
                "Using message queues",
                "API Gateway",
                "Containerization"
              ],
              "correctIndex": 0,
              "explanation": "Shared database creates coupling between services, defeating the purpose of microservices.",
              "difficulty": "medium"
            },
            {
              "id": "be-micro-2",
              "question": "Why is distributed tracing important in microservices?",
              "options": [
                "It correlates requests across multiple services to debug performance issues and failures",
                "It makes code run faster",
                "It replaces logging",
                "It's required by Kubernetes"
              ],
              "correctIndex": 0,
              "explanation": "Distributed tracing follows a request through multiple services, showing timing and errors at each step.",
              "difficulty": "hard"
            },
            {
              "id": "be-micro-3",
              "question": "What is the Saga pattern?",
              "options": [
                "A sequence of local transactions with compensating actions for rollback, ensuring data consistency across services",
                "A deployment strategy",
                "A monitoring tool",
                "A database type"
              ],
              "correctIndex": 0,
              "explanation": "Saga breaks a distributed transaction into local transactions with compensating actions for rollback on failure.",
              "difficulty": "hard"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design a strategy for decomposing a monolithic e-commerce platform into microservices. What services would you extract first and why?",
              "answer": "Phase 1: Low-risk extraction. Extract 'User Service' (auth, profiles) - independent, clear boundary. Extract 'Product Catalog' - read-heavy, can be cached. Phase 2: Core business. Extract 'Order Service' - owns order lifecycle. Extract 'Payment Service' - security-critical, PCI scope reduction. Phase 3: Supporting. Extract 'Notification Service' - async, multiple channels. Extract 'Inventory Service' - real-time stock management. Key decisions: (1) Database-per-service - extract DB first or use strangler fig pattern. (2) Sync vs async communication. (3) Shared data: user data in order service as snapshot/event. (4) Migration: strangler fig - new features as services, old features moved incrementally. (5) Keep cross-cutting: API gateway for auth, rate limiting. Avoid premature domain decomposition - extract when clear bounded context exists.",
              "difficulty": "expert",
              "company": "Amazon"
            },
            {
              "question": "How do you handle distributed transactions in a microservices architecture? Compare 2PC, Saga, and eventual consistency.",
              "answer": "2PC (Two-Phase Commit): Prepare phase (all services agree) + Commit phase (all commit). Pros: strong consistency. Cons: blocking, coordinator SPOF, not suitable for long-running, not supported by all databases/message brokers. Saga pattern: sequence of local transactions with compensating actions. Choreography (events) vs Orchestration (coordinator). Pros: non-blocking, suitable for long-running. Cons: eventual consistency, complex compensation logic, need idempotency. Eventual consistency: async events + reconciliation. Pros: highest availability, scalable. Cons: stale reads, conflict resolution. Recommendation: Saga for business transactions (order -> payment -> shipping). Eventual consistency for non-critical (user profile update). Avoid 2PC in microservices.",
              "difficulty": "expert",
              "company": "Uber"
            }
          ],
          "codingChallenges": []
        }
      ]
    }
  ]
};

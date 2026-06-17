import type { SubjectData } from "./types";

export const hldSubject: SubjectData = {
  "slug": "hld",
  "title": "High Level Design",
  "description": "Master high-level architecture design - from monoliths to microservices, API gateways, scaling strategies, and designing systems like YouTube, Netflix, and Instagram",
  "icon": "Building2",
  "color": "text-indigo-500",
  "order": 10,
  "topics": [
    {
      "slug": "architecture",
      "title": "Architecture",
      "description": "Explore architecture styles - monolith, microservices, serverless, event-driven, and microkernel patterns",
      "order": 1,
      "subtopics": [
        {
          "slug": "monolith-microservices-serverless",
          "title": "Monolith, Microservices & Serverless",
          "order": 1,
          "content": {
            "overview": "Architecture styles define how software components are organized, deployed, and scaled. Monolithic architecture packages everything into a single deployable unit. Microservices decompose functionality into independently deployable services. Serverless abstracts infrastructure entirely, letting developers focus on code. Each represents a different point on the complexity-vs-flexibility spectrum.",
            "problemStatement": "Startups need to move fast with simple architecture. Enterprises need to scale massively with reliable systems. Choosing the wrong architecture leads to: monolithic death star (can't scale) or microservices distributed monolith (too complex for the problem).",
            "intuitionFirst": "Monolith is a food truck - everything in one box, simple to run, but you can't scale the burger station independently. Microservices are a food court - each vendor specializes, scales independently, but you need a mall (infrastructure) for them. Serverless is a catering service - you just order food, someone else handles the kitchen.",
            "realLifeAnalogy": "A restaurant: Monolith = a small diner where one cook does everything. Microservices = a chain where prep kitchen (ingredients), line cooks (entrees), pastry chef (desserts), and dishwasher each specialize. Serverless = ordering Uber Eats - you just get food, someone else manages the entire kitchen.",
            "howItWorks": "Monolith: Single codebase, single database, single deployment. Shared memory for communication. Simpler debugging, testing, and deployment. Microservices: Each service has its own codebase, database (database-per-service), deployment pipeline. Communicate via HTTP/REST, gRPC, or message queues. API Gateway handles cross-cutting concerns. Serverless: Functions as a Service (AWS Lambda) triggered by events. Auto-scales from 0 to thousands. Pay-per-execution. Stateless by design, external storage (S3, DynamoDB, Redis).",
            "beginnerExample": "// Monolith: everything in one app\napp.get('/api/users', userController.list);\napp.get('/api/products', productController.list);\napp.post('/api/orders', orderController.create);\napp.listen(3000);\n\n// Microservices: separate services\n// user-service\napp.get('/api/users', userController.list);\napp.listen(3001);\n\n// product-service\napp.get('/api/products', productController.list);\napp.listen(3002);\n\n// order-service (calls user + product services)\napp.post('/api/orders', async (req, res) => {\n  const user = await fetch('http://user-service:3001/api/users/' + req.body.userId);\n  const product = await fetch('http://product-service:3002/api/products/' + req.body.productId);\n  // process order\n});\napp.listen(3003);\n\n// Serverless (AWS Lambda + API Gateway)\nexports.handler = async (event) => {\n  const userId = event.pathParameters.userId;\n  const user = await dynamoDb.get({ TableName: 'Users', Key: { id: userId } });\n  return { statusCode: 200, body: JSON.stringify(user.Item) };\n};",
            "commonMistakes": "Starting with microservices for a simple CRUD app (over-engineering). Monolith without modular boundaries (spaghetti). Serverless functions that are too large or have cold start issues. Not understanding the 'distributed monolith' anti-pattern (microservices that can't work independently).",
            "bestPractices": "Start with monolith, extract services as needed. Modular monolith first. For microservices: bounded contexts (DDD), database per service, circuit breakers, health checks, centralized logging. For serverless: keep functions focused (<100ms execution), use provisioned concurrency for cold start, handle timeouts gracefully.",
            "interviewPerspective": "Architecture choice is a fundamental interview topic. The best answers start with trade-offs, not preferences. 'A monolith would be simpler for this case because...' vs 'Microservices would allow independent scaling of the video processing pipeline...' Discuss: (1) When monolith wins: early stage, small team, simple domain. (2) When microservices win: multiple teams, different scaling needs, polyglot requirements. (3) Conway's Law: architecture mirrors organization structure. (4) Serverless benefits: zero idle cost, auto-scaling. (5) Serverless drawbacks: cold starts, vendor lock-in, statelessness constraints. Stand out by discussing the Modular Monolith pattern as a middle ground.",
            "performanceNotes": "Monolith: lowest latency (in-process calls), simplest scaling (just replicate). Microservices: network hop adds ~1-5ms per call, needs more resources. Serverless: cold start 200ms-1s (AWS Lambda), warm ~1-5ms per invocation, 15 min max execution. Cost: monolith cheaper at low scale, microservices cost more infra, serverless pay-per-use (cheaper at low throughput, expensive at high sustained load).",
            "securityNotes": "Monolith: simpler security (one attack surface). Microservices: each service needs auth, mTLS between services, API Gateway as security perimeter. Serverless: Lambda execution role (IAM), function permissions, avoid storing secrets in code (use Secrets Manager).",
            "comparisonTable": "| Feature | Monolith | Microservices | Serverless |\n|---------|----------|---------------|------------|\n| Deployment | Single unit | Per service | Per function |\n| Scaling | Whole app | Per service | Per function |\n| Latency | Lowest | Network overhead | Cold start + network |\n| Complexity | Low | High (distributed) | Medium (vendor) |\n| Team autonomy | Low | High | High |\n| Testing | Simple (integration) | Complex (contract tests) | Complex (end-to-end) |\n| Cost at low scale | Cheapest | Expensive | Cheap (pay-per-use) |\n| Cost at high scale | Cheaper | Expensive (more infra) | Very expensive |\n| Use case | Small apps, MVPs | Large distributed systems | Event-driven, variable load |"
          },
          "quiz": [
            {
              "id": "hld-arch-1",
              "question": "What is the 'distributed monolith' anti-pattern?",
              "options": [
                "Microservices that are tightly coupled and cannot be deployed independently",
                "A monolith spread across multiple servers",
                "A monolith with too many dependencies",
                "A serverless function that is too large"
              ],
              "correctIndex": 0,
              "explanation": "A distributed monolith occurs when microservices are tightly coupled (shared database, synchronous calls in chain, shared code). They must be deployed together, losing all benefits of microservices while retaining all complexity.",
              "difficulty": "hard"
            },
            {
              "id": "hld-arch-2",
              "question": "When should you start with a monolith instead of microservices?",
              "options": [
                "Early stage startup, small team, uncertain domain",
                "When you expect billions of users",
                "When you need polyglot programming languages",
                "When you need independent scaling"
              ],
              "correctIndex": 0,
              "explanation": "Start with monolith when the domain is uncertain, team is small, and speed of iteration is critical. Extract microservices when the monolith grows too large or distinct scaling needs emerge.",
              "difficulty": "easy"
            },
            {
              "id": "hld-arch-3",
              "question": "What is the main drawback of serverless architecture?",
              "options": [
                "Cold start latency and vendor lock-in",
                "Cannot handle any scale",
                "Requires dedicated servers",
                "No support for HTTP APIs"
              ],
              "correctIndex": 0,
              "explanation": "Serverless cold starts can add 200ms-1s latency. Vendor lock-in makes migration difficult. Long-running functions (>15 min) are not supported. High sustained load can be more expensive than provisioned servers.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Compare monolith, microservices, and serverless for an e-commerce platform. What would you recommend for each stage of growth?",
              "answer": "Stage 1 (MVP): Monolith with modular design (packages/modules). Fastest to build, easiest to iterate. Single PostgreSQL database. Stage 2 (Growing, 10-100K users): Extract payment service (PCI compliance needs isolation). Add Redis cache. Keep rest as monolith. Stage 3 (Scaling, 100K-1M users): Extract inventory service (different scaling pattern), notification service (async processing). Add message queue. Stage 4 (Enterprise, 1M+): Full microservices with domain boundaries. Serverless for event-driven features (email notifications, image processing). Each stage extracts only when the pain is real - not preemptively.",
              "difficulty": "expert",
              "company": "Amazon"
            },
            {
              "question": "How does Conway's Law affect microservices design?",
              "answer": "Conway's Law: 'Organizations design systems that mirror their communication structure.' In microservices: (1) Service boundaries should align with team boundaries. (2) Two teams working on the same service causes coordination overhead. (3) Each service should be owned by a single team (bounded context). (4) Communication patterns between services should reflect team communication (teams that need frequent sync -> synchronous APIs, loose coupling -> async events). (5) Inverse Conway Maneuver: restructure teams first to get the desired architecture. Amazon's 'two-pizza teams' and Spotify's squads/tribes are real-world applications.",
              "difficulty": "hard",
              "company": "Microsoft"
            }
          ],
          "codingChallenges": [
            {
              "title": "Monolith to Microservices Migration Plan",
              "description": "Given a monolithic e-commerce app, design a phased migration plan including strangler fig pattern, database decomposition, and service extraction order.",
              "difficulty": "hard",
              "starterCode": "interface MigrationPhase {\n  name: string;\n  servicesToExtract: string[];\n  patterns: string[]; // 'strangler-fig', 'database-per-service', 'eventual-consistency'\n  risks: string[];\n}\n\nclass MigrationPlanner {\n  plan(monolithComponents: string[]): MigrationPhase[] {\n    // Your implementation\n  }\n}",
              "solutionHint": "Use Strangler Fig pattern: route specific endpoints to new services incrementally. Extract lowest-risk services first (auth, then notifications, then catalog). Database-per-service with event-driven synchronization. Feature flags to toggle between old and new."
            }
          ]
        },
        {
          "slug": "architecture-styles",
          "title": "Architecture Styles",
          "order": 2,
          "content": {
            "overview": "Architecture styles define the overall structure and communication patterns of a system. Key styles: Layered (N-tier), Event-Driven, Microkernel (Plugin), Space-Based (Grid), and Peer-to-Peer. Each style optimizes for different qualities: maintainability, scalability, responsiveness, or resilience.",
            "problemStatement": "Different applications have different needs: real-time gaming requires low latency, data analytics needs high throughput, enterprise apps need maintainability. Without a coherent architecture style, systems become hard to reason about, maintain, and scale.",
            "intuitionFirst": "Architecture styles are like city layouts: Layered is a planned city with zones (residential, commercial, industrial). Event-driven is a city where events (concerts, festivals) trigger responsive actions. Microkernel is a city center with surrounding suburbs - core is stable, suburbs can change independently.",
            "realLifeAnalogy": "Layered Architecture: A corporate hierarchy (CEO -> VPs -> Directors -> Managers -> ICs). Each layer communicates only with adjacent layers. Event-Driven: A smart home (motion detected -> lights on, door opens -> alarm off). Microkernel: WordPress (core + plugins for specific features).",
            "howItWorks": "Layered: Presentation -> Business Logic -> Data Access -> Database. Each layer depends only on the layer below. Event-Driven: Event producers emit events to message broker. Event consumers react asynchronously. Components are decoupled. Microkernel: Core system provides minimal functionality. Plugins extend features via well-defined interfaces. Space-Based: Processing units (nodes) share data via distributed cache. No central database bottleneck. Peer-to-Peer: Each node acts as both client and server. Decentralized discovery and data sharing.",
            "beginnerExample": "// Layered architecture (Express MVC)\n// Routes (Presentation) -> Controllers (Business) -> Services (Logic) -> Repository (Data) -> DB\n\n// Event-driven architecture\nclass OrderService {\n  async createOrder(order) {\n    const saved = await db.save(order);\n    await eventBus.publish('order.created', { orderId: saved.id });\n  }\n}\n\nclass EmailService {\n  constructor() {\n    eventBus.subscribe('order.created', async (event) => {\n      await sendConfirmationEmail(event.orderId);\n    });\n  }\n}\n\nclass InventoryService {\n  constructor() {\n    eventBus.subscribe('order.created', async (event) => {\n      await updateInventory(event.orderId);\n    });\n  }\n}",
            "commonMistakes": "Layered: leaky abstractions (presentation layer accessing DB directly). Event-driven: event storms (cascading events), not handling event ordering. Microkernel: plugin interface too rigid or too flexible. Space-Based: complexity of data replication and consistency.",
            "bestPractices": "Choose architecture style based on primary quality attribute (scalability, maintainability, performance). Layer isolation: strict dependency rules. Event-driven: idempotent event handlers, dead letter queues, schema registry. Microkernel: stable core, versioned plugin API. Document architecture decisions and trade-offs.",
            "interviewPerspective": "Architecture styles show breadth of knowledge. Discuss trade-offs: (1) Layered: most common, everyone understands, but can become monolithic. (2) Event-Driven: great for decoupling and scalability, complex debugging. (3) Microkernel: ideal for extensible products (Eclipse, VS Code). (4) Space-Based: for extreme scalability (trading systems). The best engineers match the style to the problem: 'For a real-time dashboard, I'd use event-driven with CQRS. For an enterprise CRM, layered is more appropriate.'",
            "performanceNotes": "Layered: negligible overhead if proper boundaries. Event-Driven: introduces async latency (queue processing), but enables better throughput via buffering. Microkernel: plugin overhead minimal. Space-Based: near-linear scaling, in-memory speed. P2P: no central bottleneck, but discovery overhead.",
            "securityNotes": "Layered: security can be enforced at each layer. Event-Driven: events may contain sensitive data, encrypt at rest/transit. Microkernel: plugin sandboxing. Space-Based: distributed cache encryption. P2P: no central authority for security, harder to enforce policies."
          },
          "quiz": [
            {
              "id": "hld-style-1",
              "question": "Which architecture style is best for a system that needs to be highly extensible by third-party developers?",
              "options": [
                "Microkernel (Plugin) Architecture",
                "Layered Architecture",
                "Event-Driven Architecture",
                "Space-Based Architecture"
              ],
              "correctIndex": 0,
              "explanation": "Microkernel architecture (Eclipse, VS Code, WordPress) provides a minimal core with well-defined extension points. Third-party developers create plugins that plug into these points without modifying the core.",
              "difficulty": "easy"
            },
            {
              "id": "hld-style-2",
              "question": "What is an event storm in event-driven architecture?",
              "options": [
                "Cascading chain of events where one event triggers others in a feedback loop, potentially overwhelming the system",
                "A surge of events at peak traffic",
                "Events that arrive out of order",
                "Events that cannot be processed"
              ],
              "correctIndex": 0,
              "explanation": "Event storm occurs when an event handler produces an event that triggers another handler that produces another event, cascading uncontrollably. Prevented by idempotent handlers, rate limiting, and careful event design.",
              "difficulty": "hard"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design an event-driven architecture for a real-time fraud detection system. How do you ensure events are processed in order and without duplication?",
              "answer": "Architecture: (1) Events: transaction.created, account.updated, location.changed. (2) Kafka partitions by account_id (ensures per-account ordering). (3) Consumer groups for parallel processing (each partition consumed by one thread). (4) Exactly-once semantics: Kafka transactional API + idempotent consumers (dedup by event_id). State: (1) Event sourcing for transaction history per account. (2) In-memory state (per account) with snapshots to DynamoDB. Rules engine: (1) Stateful stream processing (Kafka Streams or Flink). (2) Sliding window for velocity checks (3 transactions in 10 min). (3) ML model for anomaly detection. Output: (1) Fraud alert event -> notification service. (2) Block card event -> payment gateway. Recovery: replay Kafka from last checkpoint. Ordering guarantee: same partition = same processing order. Duplication: exactly-once semantics + idempotent handlers.",
              "difficulty": "expert",
              "company": "Stripe"
            },
            {
              "question": "Compare and contrast Space-Based Architecture (Grid Computing) with traditional layered architecture for a high-frequency trading system.",
              "answer": "Space-Based Architecture (SBA): (1) Processing units with in-memory data grids (no DB bottleneck). (2) Near-linear scalability: add nodes = add capacity. (3) Sub-millisecond latency (in-memory). (4) Data replicated across nodes using distributed cache (Hazelcast, GemFire). (5) No single point of failure. Trade-offs: (1) Complex data consistency (eventual). (2) Memory constraints. (3) Difficult to implement complex queries. Layered: (1) Central database becomes bottleneck. (2) Horizontal scaling limited by DB. (3) 10-100ms latency due to DB. (4) ACID transactions. For HFT: SBA is preferred because latency is critical (microseconds matter). SBA used by financial exchanges, telecom (real-time billing), and massively multiplayer games.",
              "difficulty": "expert",
              "company": "Goldman Sachs"
            }
          ],
          "codingChallenges": [
            {
              "title": "Design a Plugin System (Microkernel)",
              "description": "Build a minimal plugin system where plugins register via a defined interface and core calls them at extension points.",
              "difficulty": "hard",
              "starterCode": "interface Plugin {\n  name: string;\n  version: string;\n  onEvent(event: string, data: any): Promise<any>;\n}\n\nclass PluginManager {\n  private plugins: Map<string, Plugin> = new Map();\n  register(plugin: Plugin): void { /* impl */ }\n  unregister(name: string): void { /* impl */ }\n  async executeExtensionPoint(event: string, data: any): Promise<any[]> { /* impl */ }\n}",
              "solutionHint": "Extension points are predefined events. Plugins are loaded from a directory (dynamic import). Each plugin receives the event and data, returns result. Manager collects and returns all results. Handle plugin crashes (try-catch per plugin)."
            }
          ]
        }
      ]
    },
    {
      "slug": "components",
      "title": "Components",
      "description": "Deep dive into core distributed system components - API Gateway, Load Balancer, Cache, Database, and Message Queue",
      "order": 2,
      "subtopics": [
        {
          "slug": "api-gateway",
          "title": "API Gateway",
          "order": 1,
          "content": {
            "overview": "An API Gateway is a server that acts as the single entry point for all client requests in a microservices architecture. It handles request routing, authentication, rate limiting, load balancing, caching, and protocol translation. Examples: Kong, NGINX Plus, AWS API Gateway, Zuul (Netflix).",
            "problemStatement": "In a microservices architecture, clients would need to know the addresses of dozens of services, handle authentication for each, implement retry logic, and deal with different protocols. The API Gateway encapsulates all this complexity behind a single endpoint.",
            "intuitionFirst": "An API Gateway is like a hotel concierge. Guests (clients) don't need to know where the restaurant, pool, or gym are - they ask the concierge. The concierge knows the location, hours, and handles reservations. If something changes, guests don't need to know.",
            "realLifeAnalogy": "Airport terminal: you check in at a single counter for your flight. Behind the scenes, baggage goes to the correct plane, gate info is displayed, security checks happen. The counter is your single point of interaction with a complex system.",
            "howItWorks": "Clients send all requests to the API Gateway. Gateway: (1) Authenticates via JWT/OAuth. (2) Rate limits per client. (3) Routes to appropriate service based on path. (4) Transforms protocol (gRPC -> REST, HTTP -> WebSocket). (5) Aggregates responses from multiple microservices. (6) Caches responses. (7) Logs and monitors. (8) Handles versioning and canary deployments. Backend services are isolated behind the gateway, providing a layer of abstraction and security.",
            "beginnerExample": "// API Gateway routing configuration (similar to NGINX/Kong)\nconst gatewayRoutes = {\n  '/api/users': { service: 'user-service', port: 3001 },\n  '/api/products': { service: 'product-service', port: 3002 },\n  '/api/orders': { service: 'order-service', port: 3003 },\n  '/api/search': { \n    service: 'search-service', \n    port: 3004,\n    cache: { ttl: 60 },\n  },\n};\n\n// Simple API Gateway implementation\nclass ApiGateway {\n  async handleRequest(req, res) {\n    const route = this.matchRoute(req.path);\n    if (!route) return res.status(404).json({ error: 'Route not found' });\n\n    // 1. Authenticate\n    const user = await this.authenticate(req);\n    if (!user) return res.status(401).json({ error: 'Unauthorized' });\n\n    // 2. Rate limit\n    if (!this.rateLimiter.allow(req.ip)) return res.status(429).json({ error: 'Too many requests' });\n\n    // 3. Check cache\n    if (route.cache) {\n      const cached = await redis.get(`${req.method}:${req.path}`);\n      if (cached) return res.json(JSON.parse(cached));\n    }\n\n    // 4. Route to service\n    try {\n      const response = await fetch(`http://${route.service}:${route.port}${req.path}`, {\n        method: req.method,\n        headers: req.headers,\n        body: req.body,\n      });\n      \n      // 5. Cache response\n      if (route.cache && response.status === 200) {\n        const body = await response.json();\n        await redis.setex(`${req.method}:${req.path}`, route.cache.ttl, JSON.stringify(body));\n        return res.json(body);\n      }\n      \n      res.status(response.status).json(await response.json());\n    } catch (err) {\n      return res.status(502).json({ error: 'Service unavailable' });\n    }\n  }\n}",
            "commonMistakes": "API Gateway becoming a bottleneck (too much logic in the gateway). Creating a 'God Class' gateway that knows about everything. Not handling gateway failures (become single point of failure). Using API Gateway for real-time WebSocket connections (better handled separately). Gateway being too chatty (sequential calls to many services per request).",
            "bestPractices": "Keep gateway logic thin - route and authenticate only. Use BFF (Backend For Frontend) pattern if different client types need different APIs. Implement circuit breakers for backend services. Use asynchronous communication through events for complex workflows. Monitor gateway performance (latency, error rate). Deploy gateway in multiple regions with DNS failover.",
            "interviewPerspective": "API Gateway is expected in microservices discussions. Cover: (1) Responsibilities: auth, routing, rate limiting, caching, transformation. (2) BFF pattern: separate gateways for mobile, web, IoT. (3) GraphQL Federation as alternative. (4) Backend services should never be directly accessible. (5) How to handle gateway failure: deploy as active-active, health check monitoring. Stand out by discussing GraphQL Gateway (Apollo Federation) vs REST API Gateway, and using service mesh (Istio) as an alternative at the infrastructure level.",
            "performanceNotes": "API Gateway adds ~2-5ms per request. Can handle 10K-100K req/s per instance. Caching can reduce effective load by 90%. Rate limiting per client prevents abuse. Gateway should be stateless (scale horizontally).",
            "securityNotes": "API Gateway is the security perimeter. Terminate TLS. Validate JWT/OAuth. Rate limiting prevents DDoS. IP whitelisting/blacklisting. Request validation (size limits, SQL injection detection). WAF integration. Hide internal service topology."
          },
          "quiz": [
            {
              "id": "hld-gw-1",
              "question": "What is the BFF (Backend For Frontend) pattern?",
              "options": [
                "Separate API Gateway for each client type (mobile, web, IoT) to provide optimized APIs",
                "Backend service that serves frontend static files",
                "A pattern where frontend directly calls backend services",
                "A backend optimized for batch processing"
              ],
              "correctIndex": 0,
              "explanation": "BFF creates a dedicated API Gateway per client type. Mobile needs different data shapes than web. IoT needs different protocols. Each BFF is optimized for its client.",
              "difficulty": "medium"
            },
            {
              "id": "hld-gw-2",
              "question": "What is the main risk of putting too much logic in the API Gateway?",
              "options": [
                "Gateway becomes a bottleneck, single point of failure, and hard to maintain",
                "Backend services become too fast",
                "Clients get too much data",
                "Network latency decreases"
              ],
              "correctIndex": 0,
              "explanation": "Overloading the gateway with business logic creates a bottleneck and a 'Smart Proxy' anti-pattern. Gateway should handle cross-cutting concerns only. Business logic belongs in backend services.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design Netflix's API Gateway (Zuul). How does it handle routing, resilience, and dynamic request handling?",
              "answer": "Netflix Zuul is a JVM-based API Gateway built on Servlet. (1) Routing: Zuul maintains dynamic route table from Eureka service registry. Routes to available instances via Ribbon (client-side LB). (2) Filters: Zuul has pre-filters (auth, rate limiting), routing filters (forward to service), post-filters (logging, response transformation), error filters. Filters are Groovy scripts loaded from dynamic directory - can be updated without restart. (3) Resilience: Hystrix circuit breakers per route. Each route has its own thread pool (bulkhead). (4) Request lifecycle: HTTP request -> Servlet Request -> ZuulFilterRunner -> pre filters -> routing filter -> post filters -> HTTP response. (5) Zuul 2 (async): Netty-based, non-blocking I/O, HTTP/2 support. Handles 50K+ req/s per instance. Key: dynamic filter loading enables real-time configuration changes without redeployment.",
              "difficulty": "expert",
              "company": "Netflix"
            }
          ],
          "codingChallenges": [
            {
              "title": "Build a Rate-Limiting API Gateway Middleware",
              "description": "Implement token bucket or sliding window rate limiting as middleware that can wrap any Express route.",
              "difficulty": "hard",
              "starterCode": "function rateLimit(options: { windowMs: number; maxRequests: number }) {\n  return (req, res, next) => {\n    // Your implementation\n  };\n}\n\napp.use('/api', rateLimit({ windowMs: 60000, maxRequests: 100 }));\napp.get('/api/data', handler);",
              "solutionHint": "Use sliding window log (store timestamps per IP in Redis sorted set). Count requests in window, reject if exceeded. Or use token bucket (refill at constant rate, consume per request). Clean up old entries periodically."
            }
          ]
        },
        {
          "slug": "load-balancer-components",
          "title": "Load Balancer",
          "order": 2,
          "content": {
            "overview": "Load balancers distribute incoming traffic across multiple backend servers to optimize resource utilization, maximize throughput, minimize latency, and ensure fault tolerance. They operate at different OSI layers and use various algorithms to make routing decisions. This is a key component in any scalable architecture.",
            "problemStatement": "A single web server can handle ~10K concurrent connections. At scale, you need hundreds of servers. Clients shouldn't know about individual servers. Need a single entry point that distributes traffic, handles failures, and enables seamless scaling.",
            "intuitionFirst": "A load balancer is like a traffic roundabout. Cars arrive from multiple directions and are directed to the road with least congestion. If one road is closed (server down), traffic is redirected to other roads automatically.",
            "realLifeAnalogy": "Supermarket checkout: customers go to a central waiting area, an employee directs them to the shortest checkout line. If a cashier goes on break, that line closes. Self-checkout (different capability) gets different weight.",
            "howItWorks": "Hardware load balancers (F5 BIG-IP) are specialized appliances. Software load balancers (HAProxy, NGINX, AWS ALB) run on commodity servers. Layer 4 (TCP/UDP): fast, session-agnostic. Layer 7 (HTTP/HTTPS): content-aware routing (by URL, cookie, header). Key features: health checks, SSL termination, session persistence (sticky sessions), connection draining, WebSocket support, HTTP/2 multiplexing.",
            "beginnerExample": "// HAProxy configuration example\n// Global settings\nglobal\n  maxconn 100000\n  ssl-default-bind-ciphers TLS_AES_256_GCM_SHA384\n\n// Frontend: client-facing\nfrontend web-frontend\n  bind *:80\n  bind *:443 ssl crt /etc/ssl/certs/myapp.pem\n  default_backend web-servers\n  \n  // Rate limiting\n  stick-table type ip size 100k expire 30s store conn_rate(10s)\n  http-request deny if { src_conn_rate ge 100 }\n\n// Backend: server pool\nbackend web-servers\n  balance leastconn  // Algorithm\n  option httpchk GET /health  // Health check\n  default-server inter 5s fall 3 rise 2\n  \n  server web1 10.0.1.1:8080 weight 10 maxconn 1000\n  server web2 10.0.1.2:8080 weight 10 maxconn 1000\n  server web3 10.0.1.3:8080 weight 5 maxconn 500  // Weaker server\n\n// NGINX equivalent\nupstream backend {\n  least_conn;\n  server 10.0.1.1:8080 weight=10 max_fails=3 fail_timeout=30s;\n  server 10.0.1.2:8080 weight=10 max_fails=3 fail_timeout=30s;\n  server 10.0.1.3:8080 backup;  // Backup if others fail\n}\n\nserver {\n  listen 80;\n  location / {\n    proxy_pass http://backend;\n    health_check interval=5s fails=3 passes=2;\n  }\n}",
            "commonMistakes": "Not configuring health checks (requests sent to dead servers). Using round-robin for APIs with variable response times (use least connections). Sticky sessions prevent even load distribution. Not enabling connection draining causes failed requests during deployments. Single load balancer (SPOF) without HA pair.",
            "bestPractices": "Use least connections for web APIs. Layer 7 for microservices routing. Health checks every 5 seconds. Connection draining for 30-60 seconds. Deploy as active-passive or active-active pair. SSL termination at LB (offload from apps). Enable HTTP/2. Use consistent hashing for cache affinity. Monitor backend response times per server.",
            "interviewPerspective": "Load balancing is a core component in every system design. Interviewers want to see you understand: (1) Which layer? L4 (faster) vs L7 (smarter). (2) Algorithm selection depends on workload profile. (3) Health check design (what endpoints, how often). (4) Session persistence trade-offs. (5) Global Server Load Balancing (GSLB) for multi-region. Stand out by discussing: connection pooling at LB, PROXY protocol for preserving client IP, DNS load balancing as first line of defense, and anycast routing for global latency optimization.",
            "performanceNotes": "HAProxy: 2M+ req/s on modern hardware. NGINX: 500K+ concurrent connections. AWS ALB: auto-scales to handle 100K+ req/s. Latency added: L4 ~0.1ms, L7 ~0.5-2ms. Max connections: depends on file descriptors (~64K per LB instance, more with SO_REUSEPORT).",
            "securityNotes": "Terminate TLS at LB (offload + centralize cert management). DDoS protection: rate limiting, SYN flood protection, WAF. Hide backend IPs. mTLS for backend communication. HTTP request validation (header size limits, method filtering)."
          },
          "quiz": [
            {
              "id": "hld-lb-1",
              "question": "What is connection draining and why is it important?",
              "options": [
                "Gradually stops sending new requests to a server being removed, allowing in-flight requests to complete gracefully",
                "Reduces database connections during peak load",
                "Drains server memory cache",
                "Removes idle connections from the pool"
              ],
              "correctIndex": 0,
              "explanation": "Connection draining (or graceful shutdown) ensures that when a server is being removed from the pool (deployment, scaling down), existing requests are allowed to complete while no new requests are sent. Prevents failed requests and user-facing errors.",
              "difficulty": "medium"
            },
            {
              "id": "hld-lb-2",
              "question": "What is Global Server Load Balancing (GSLB)?",
              "options": [
                "DNS-based routing that directs users to the nearest regional data center for lowest latency",
                "Load balancing within a single data center",
                "Load balancing across CPU cores",
                "A hardware load balancer model"
              ],
              "correctIndex": 0,
              "explanation": "GSLB uses DNS to route users to the closest or healthiest regional data center. Based on latency, geography, or load. If one region fails, DNS routes traffic to healthy regions. Used by all global-scale services.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "How does Google's global HTTP load balancer work? How does it handle traffic globally?",
              "answer": "Google's global LB is a software-defined, anycast-based Layer 7 load balancer. (1) Anycast: single IP advertised from all Google edge locations worldwide. User traffic goes to the nearest edge location (POP). (2) At the edge: Google Front End (GFE) terminates TLS, routes to the closest backend instance group. (3) Health-based routing: if the nearest region is unhealthy, traffic is routed to the next closest healthy region. (4) Session affinity: optional cookie-based affinity. (5) Auto-scaling: backend instance groups auto-scale based on CPU or request count. (6) Features: Cloud Armor (WAF), CDN integration, traffic splitting for canary deployments. Key: anycast provides built-in global load distribution without DNS TTL delays. GFE handles 100K+ req/s per instance, millions globally.",
              "difficulty": "expert",
              "company": "Google"
            },
            {
              "question": "Design a global load balancing strategy for a real-time collaborative editing system (like Google Docs).",
              "answer": "Challenges: real-time collaboration requires low latency and stateful connections (WebSocket). (1) DNS-based GSLB routes users to nearest region based on latency probes. (2) Each region has a regional LB (L7) handling WebSocket upgrade and HTTP requests. (3) Session affinity: client is pinned to a specific region for the document session (cookies or anycast source IP affinity). (4) Within region: consistent hashing on document ID to route all editors of same doc to the same server. (5) Cross-region: CRDT-based state synchronization (OT/CRDT). If user moves regions (travel), reconnect to original region (latency penalty but consistent state). (6) Failover: if region goes down, DNS routes users to next closest region. CRDT state replicated across regions for seamless failover.",
              "difficulty": "expert",
              "company": "Google"
            }
          ],
          "codingChallenges": [
            {
              "title": "Implement Health Check with Circuit Breaker",
              "description": "Load balancer health checks with circuit breaker: mark server unhealthy after N consecutive failures, retry after timeout.",
              "difficulty": "medium",
              "starterCode": "class HealthChecker {\n  private servers: Map<string, { healthy: boolean; failCount: number }> = new Map();\n  check(server: string): Promise<boolean> { /* impl */ }\n  getHealthyServers(): string[] { /* impl */ }\n}",
              "solutionHint": "Periodically send TCP ping or HTTP GET to /health. Track consecutive failures. After threshold, mark as unhealthy. Wait for retry timeout, then probe once. If success, mark healthy. Use exponential backoff for retry interval."
            }
          ]
        },
        {
          "slug": "cache-database-queue",
          "title": "Cache, Database & Queue",
          "order": 3,
          "content": {
            "overview": "Cache, Database, and Queue are the three foundational data components in any distributed system. Each serves a distinct purpose: cache for speed, database for persistence and queryability, queue for async communication and buffering. Understanding when and how to use each is critical for system design.",
            "problemStatement": "Systems that rely on a single database for everything suffer from: high latency (DB queries take 10-100ms), low throughput (DB handles limited concurrent writes), and tight coupling (synchronous processing chains). Adding cache reduces latency, adding queue increases resilience and throughput.",
            "intuitionFirst": "Think of a library: Database = the stacks (all books, slow to search). Cache = the popular books shelf at the front (fast access to what everyone wants). Queue = the book request system (you submit a request slip, librarian processes it when ready, you pick it up later).",
            "realLifeAnalogy": "A coffee shop: Database = the recipe book (slow to reference every order). Cache = the barista's memory of regular orders (fast, but limited). Queue = the order counter with numbered tickets (customers don't block each other, orders processed as resources available).",
            "howItWorks": "Cache (Redis/Memcached): In-memory data store. Sub-millisecond access. Used for session data, API responses, database query results, rate limiting, real-time leaderboards. Eviction policies (LRU, LFU, TTL). Database (PostgreSQL, Cassandra, DynamoDB): Persistent storage with ACID or BASE guarantees. Used for authoritative data, complex queries, transactions. Queue (Kafka, RabbitMQ, SQS): Asynchronous message broker. Used for decoupling services, buffering spikes, event-driven processing, background jobs.",
            "beginnerExample": "// Typical three-component architecture for an e-commerce API\napp.get('/api/products/:id', async (req, res) => {\n  const { id } = req.params;\n\n  // 1. Check cache\n  const cached = await redis.get(`product:${id}`);\n  if (cached) return res.json(JSON.parse(cached));\n\n  // 2. Query database\n  const product = await db.query('SELECT * FROM products WHERE id = $1', [id]);\n  if (!product) return res.status(404).json({ error: 'Not found' });\n\n  // 3. Populate cache\n  await redis.setex(`product:${id}`, 3600, JSON.stringify(product));\n  res.json(product);\n});\n\n// Order processing with queue\napp.post('/api/orders', async (req, res) => {\n  // 1. Validate and save order to DB\n  const order = await db.query(\n    'INSERT INTO orders (user_id, total, status) VALUES ($1, $2, $3) RETURNING *',\n    [req.user.id, req.body.total, 'pending']\n  );\n\n  // 2. Enqueue processing task\n  await queue.send('order.process', {\n    orderId: order.id,\n    userId: req.user.id,\n  });\n\n  res.status(202).json({ orderId: order.id, status: 'pending' });\n});\n\n// Queue consumer processes async\nqueue.consume('order.process', async (message) => {\n  const { orderId } = message;\n  // Charge payment, update inventory, send email, etc.\n  await processOrder(orderId);\n  await db.query('UPDATE orders SET status = $1 WHERE id = $2', ['completed', orderId]);\n  await redis.del(`order:${orderId}`); // Invalidate cache\n});",
            "commonMistakes": "Using cache for data that changes frequently (cache churn). Not using queues for long-running tasks (blocking HTTP requests). Putting business logic in cache (cache invalidation becomes consistency nightmare). Using queue for synchronous request-reply (use HTTP/gRPC). Not monitoring queue depth (unbounded growth).",
            "bestPractices": "Cache: read-heavy, write-rare data. Set TTLs. Use cache-aside pattern. Queue: async processing, spike buffering, cross-service communication. Monitor queue depth and consumer lag. Database: authoritative data store, choose based on access patterns. Three-component architecture: request comes in -> check cache -> if miss, query DB -> if async needed, enqueue for processing. This is the backbone of most production systems.",
            "interviewPerspective": "Every system design involves these three components. Interviewers evaluate: (1) WHAT goes where? (Cache: hot data, Queue: async processing, DB: authoritative state). (2) DATA FLOW: request -> cache -> DB -> queue -> response. (3) CONSISTENCY across components (cache invalidation, queue eventual consistency with DB). (4) RESILIENCE: queue survives if DB is down, cache survives if DB is slow. The best discussion: 'For the read path, I use cache-aside with Redis. For the write path, I use the outbox pattern with Kafka to ensure reliable processing. The database (PostgreSQL) is the source of truth.'",
            "performanceNotes": "Cache: <1ms, ~100K ops/sec (Redis). Database: 10-100ms, ~10K writes/sec (PostgreSQL). Queue: 2-50ms latency, high throughput (Kafka: millions/sec). The combination: cache reduces DB read load by 90%+, queue smoothes write spikes by 10x+. Typical architecture: cache handles 95% of reads, DB handles writes + remaining 5% reads, queue handles async processing.",
            "securityNotes": "Cache: may contain sensitive data - set TTL, encrypt if needed, never cache PII without encryption. Database: encryption at rest, network isolation, least privilege access. Queue: encrypt messages at rest, authenticate producers/consumers, audit access."
          },
          "quiz": [
            {
              "id": "hld-ccq-1",
              "question": "What is the typical data flow for a read request in a well-designed system?",
              "options": [
                "Client -> API Gateway -> Check Cache -> If miss, Query DB -> Return response",
                "Client -> Direct DB Query",
                "Client -> Queue -> DB -> Cache",
                "Client -> API Gateway -> Queue -> Worker -> DB"
              ],
              "correctIndex": 0,
              "explanation": "The typical read path: request arrives, check cache first (fast path), if miss (slow path) query database and populate cache for next request. This optimizes for the common case (cache hit).",
              "difficulty": "easy"
            },
            {
              "id": "hld-ccq-2",
              "question": "Why should long-running tasks be processed via a queue instead of synchronously in an HTTP request?",
              "options": [
                "To avoid tying up server resources and provide resilience - if processing fails, the queue message can be retried",
                "Queues are faster than HTTP",
                "HTTP cannot handle long-running tasks",
                "Queues require less code to implement"
              ],
              "correctIndex": 0,
              "explanation": "Long-running tasks (email sending, image processing, report generation) should be async via queue so HTTP request returns quickly. The queue provides buffering, retries, and doesn't block server resources.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design the read/write path for a social media photo sharing app (like Instagram). Include cache, database, and queue.",
              "answer": "Read Path (loading feed): (1) Request hits API Gateway. (2) Gateway calls Feed Service. (3) Feed Service checks Redis (feed is sorted set of post IDs per user). (4) Cache hit: pull post metadata from Memcached (post-by-id). (5) Cache miss: query PostgreSQL shards for post data, populate cache. (6) Return paginated feed (20 posts). P99 <50ms. Write Path (posting photo): (1) Upload photo directly to S3 via pre-signed URL. (2) After upload completes, client calls POST /api/posts with metadata. (3) API writes post to PostgreSQL (sharded by user_id). (4) Publish 'post.created' event to Kafka. (5) Fan-out consumer: pushes post ID to followers' Redis feeds (if <100K followers). (6) Thumbnail consumer: generates 3 thumbnail sizes, uploads to S3. (7) Notifications consumer: sends push notifications to followers. Write returns immediately, processing happens async. Resilience: if Kafka is down, post is safe in PostgreSQL. If Redis is down, feed falls back to PostgreSQL query.",
              "difficulty": "expert",
              "company": "Meta"
            }
          ],
          "codingChallenges": [
            {
              "title": "Build a Multi-Layer Cache System",
              "description": "Implement L1 (in-memory) and L2 (Redis) cache with TTL and automatic population from database.",
              "difficulty": "hard",
              "starterCode": "interface CacheLayer {\n  get(key: string): Promise<string | null>;\n  set(key: string, value: string, ttlSeconds: number): Promise<void>;\n}\n\nclass MultiLayerCache {\n  constructor(private l1: CacheLayer, private l2: CacheLayer, private db: any) {}\n  async get(key: string, fetchFn: () => Promise<string>): Promise<string> { /* impl */ }\n}",
              "solutionHint": "Check L1 first (in-memory Map with expiration). If miss, check L2 (Redis). If miss, call fetchFn (DB query), populate L2 then L1. Use TTL for eviction. Set shorter TTL for L1 (minutes), longer for L2 (hours)."
            }
          ]
        }
      ]
    },
    {
      "slug": "scaling",
      "title": "Scaling",
      "description": "Understand horizontal and vertical scaling strategies, when to use each, and how to design systems that scale from 1 to millions of users",
      "order": 3,
      "subtopics": [
        {
          "slug": "horizontal-vertical-scaling",
          "title": "Horizontal & Vertical Scaling",
          "order": 1,
          "content": {
            "overview": "Horizontal scaling (scale out) adds more machines to handle load. Vertical scaling (scale up) adds more power to existing machines. Each approach has distinct cost, complexity, and performance characteristics. Modern systems design for horizontal scaling as the primary strategy, with vertical scaling for specific components.",
            "problemStatement": "As traffic grows, systems need more capacity. The naive approach (bigger servers) hits hard physical limits. The alternative (more servers) introduces complexity of distribution, consistency, and coordination. Understanding when to use each approach is fundamental.",
            "intuitionFirst": "Vertical scaling is upgrading your car to a bigger engine. Horizontal scaling is adding more cars to your fleet with a dispatcher (load balancer). You can only make a car so big, but you can always add more cars.",
            "realLifeAnalogy": "A restaurant: Vertical = build a bigger kitchen with more stoves. Horizontal = open more restaurant locations. The kitchen has physical limits (building size, gas lines). New locations can keep opening as long as there's demand.",
            "howItWorks": "Vertical: Upgrade CPU, RAM, SSD, network. Simple (no code changes needed for many apps). No architecture changes. But: expensive (high-end hardware costs exponentially more), limited (max CPU cores, RAM slots, disk size), single point of failure. Horizontal: Add commodity servers behind load balancer. Near-linear scaling. Better fault tolerance. But: requires stateless or distributed-state design, adds network overhead, needs service discovery and coordination.",
            "beginnerExample": "// Vertical scaling: just increase capacity parameters\nconst pool = new Pool({ max: 200 }); // Increase from 50 to 200 connections\n// Upgrade the server (AWS: t2.micro -> t2.xlarge -> c5.24xlarge)\n\n// Horizontal scaling: add more instances\nconst servers = ['10.0.0.1:3000', '10.0.0.2:3000', '10.0.0.3:3000']; // Scale out\nconst lb = new LoadBalancer(servers);\n\n// Must make app stateless for horizontal scaling\n// Bad (stateful):\napp.use(session({ store: new MemoryStore() })); // Sessions lost on restart\n\n// Good (stateless for horizontal):\napp.use(session({ store: new RedisStore({ client: redis }) })); // Shared session store",
            "commonMistakes": "Vertical scaling without considering the ceiling (hitting hardware limits at the worst time). Using vertical scaling for stateless web servers when horizontal is cheaper. Not making applications stateless before attempting horizontal scaling. Assuming horizontal scaling is free (it adds operational complexity).",
            "bestPractices": "Default to horizontal scaling for stateless services (web servers, API servers). Use vertical scaling for stateful services that are hard to shard (some databases, legacy systems). Always benchmark before scaling. Right-size instances (many small instances may be more cost-effective than few large ones). Auto-scale based on metrics.",
            "interviewPerspective": "Scaling discussion is the heart of every system design interview. Key points: (1) Start with back-of-envelope calculation to determine required capacity. (2) Horizontal is the default for stateless tiers. (3) Database horizontal scaling requires sharding (much harder). (4) Cache horizontal scaling uses consistent hashing. (5) Vertical scaling is simpler but has limits. The best answers show: 'For web servers, I'll use horizontal with auto-scaling. For PostgreSQL, I'll vertically scale until it is cost-prohibitive, then introduce read replicas, and finally shard.'",
            "performanceNotes": "Vertical scaling limits: x86 servers max ~128 CPU cores, ~4TB RAM. Network bandwidth: ~100 Gbps. Cost: c5.24xlarge (96 vCPU) ~$4/hr. Horizontal scaling: near-linear up to thousands of nodes. Web server horizontal scaling: minimal complexity. Database horizontal scaling: major complexity (sharding, rebalancing). Cache horizontal scaling: consistent hashing enables smooth scaling.",
            "securityNotes": "Horizontal scaling increases attack surface (more instances). Each instance must be properly secured (patching, firewall). Network segmentation between tiers. Service-to-service authentication (mTLS). Horizontal scaling also improves security resilience (DDoS absorbed by more instances, compromised instance can be terminated)."
          },
          "quiz": [
            {
              "id": "hld-scale-1",
              "question": "What is the main practical limitation of vertical scaling?",
              "options": [
                "Physical hardware limits (max CPU, RAM, disk) and exponentially increasing cost",
                "It requires code changes",
                "It increases network latency",
                "It makes the system less secure"
              ],
              "correctIndex": 0,
              "explanation": "Vertical scaling hits physical hardware ceilings (maximum CPU cores, RAM slots). Beyond a point, upgrading costs exponentially more per unit of capacity. A c5.24xlarge costs 48x more than a t2.micro but is not 48x faster.",
              "difficulty": "easy"
            },
            {
              "id": "hld-scale-2",
              "question": "What must you do before horizontally scaling an application?",
              "options": [
                "Make it stateless or use a shared state store (Redis, DB)",
                "Install a bigger database",
                "Rewrite the code in a faster language",
                "Add more RAM to each server"
              ],
              "correctIndex": 0,
              "explanation": "For horizontal scaling, any instance must be able to handle any request. If sessions are stored in local memory, requests with the same session must go to the same instance. Solution: store state externally (Redis for sessions, database for data).",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "How would you scale a database-intensive application from 10 to 10 million users? Walk through the scaling stages.",
              "answer": "Stage 1 (10-1000 users): Single PostgreSQL server. Everything in one DB. Simple indexing. Stage 2 (1000-10K): Separate read replicas (1-2 replicas). READ traffic served by replicas, WRITE on primary. Cache query results in Redis. Stage 3 (10K-100K): Vertical scaling of primary DB. Connection pooling (PgBouncer). Increase replica count for read scaling. Stage 4 (100K-1M): Sharding. Partition by user_id hash across 4+ PostgreSQL shards. Each shard has its own replicas. Application must route queries to correct shard. Stage 5 (1M-10M): More shards (re-sharding or consistent hashing). Consider Citus (distributed PostgreSQL) or migrate to Cassandra for write-heavy workloads. Read replicas per shard. CQRS for complex read models. At each stage, only invest in the complexity that the current scale demands.",
              "difficulty": "expert",
              "company": "Meta"
            },
            {
              "question": "Compare horizontal scaling approaches for stateful services (databases) vs stateless services (web servers).",
              "answer": "Stateless (web): Trivial to scale horizontally - just add more instances behind a load balancer. No coordination needed. Auto-scaling based on CPU/request count. Graceful shutdown via connection draining. Stateful (DB): Much harder. (1) Read replicas: scale reads, but writes still bottlenecked on primary. (2) Sharding: distribute data across nodes, but resharding is painful. (3) Distributed DB (Spanner, CockroachDB): built-in horizontal scaling, but higher latency and cost. (4) Partitioning (Vitess, Citus): sharding layer above MySQL/PostgreSQL. Key insight: design applications to minimize stateful scaling needs. Make as much of the system stateless as possible. Push state to purpose-built stores (Redis for sessions, S3 for files, distributed DB for data).",
              "difficulty": "expert",
              "company": "Google"
            }
          ],
          "codingChallenges": [
            {
              "title": "Auto-Scaling Decision Engine",
              "description": "Implement a simple auto-scaling algorithm that decides when to scale up/down based on CPU, memory, and request rate.",
              "difficulty": "medium",
              "starterCode": "interface Metrics {\n  cpuPercent: number;\n  memoryPercent: number;\n  requestRate: number; // requests/second\n  currentInstances: number;\n}\n\nclass AutoScaler {\n  private targetCpu = 70;\n  private cooldownPeriod = 60_000; // ms\n  private lastAction = 0;\n\n  async evaluate(metrics: Metrics): Promise<'scale-up' | 'scale-down' | 'noop'> {\n    // Your implementation\n  }\n}",
              "solutionHint": "Check if outside cooldown period. If CPU > targetCpu for sustained period -> scale up. If CPU < targetCpu/2 for sustained period -> scale down. Use sliding window of metrics. Add safety margins to prevent thrashing. Consider both scale-up and cool-down timers."
            }
          ]
        }
      ]
    },
    {
      "slug": "design-questions",
      "title": "Design Questions",
      "description": "Practice designing real-world systems - YouTube, WhatsApp, Netflix, Uber, Instagram, and ChatGPT",
      "order": 4,
      "subtopics": [
        {
          "slug": "design-youtube",
          "title": "Design YouTube",
          "order": 1,
          "content": {
            "overview": "Designing YouTube requires addressing massive scale: 2B+ monthly active users, 500+ hours of video uploaded per minute, 1B+ hours watched daily. The system must handle video upload, processing (transcoding, thumbnails, content ID), storage (exabytes), and delivery (global CDN) with recommendations and search.",
            "problemStatement": "Videos are large (GBs each), uploaded constantly, must be transcoded to multiple formats and resolutions, checked for copyright, stored durably, and delivered globally with low latency. Recommendations must be personalized for billions of users.",
            "intuitionFirst": "YouTube upload is like a global film distribution pipeline: filmmakers submit reels (upload), editors process and duplicate (transcode), censors review (content ID), copies stored in vaults (storage), and distributed to theaters worldwide (CDN).",
            "realLifeAnalogy": "A TV network that receives raw footage from thousands of reporters, edits each into multiple formats (broadcast, online, mobile), checks for legal issues, stores in a media library, and broadcasts via satellites, cable, and streaming.",
            "howItWorks": "Upload: Client -> HTTPS upload to GCS via resumable upload. Pub/Sub triggers processing pipeline. Processing: (1) Transcoding (parallel): FFmpeg jobs on Dataflow split video into segments, encode each to multiple resolutions (144p-4K) and codecs (H.264, VP9, AV1). (2) Thumbnail generation: extract frames, select best via ML. (3) Content ID: audio/video fingerprinting. (4) Caption generation: speech-to-text. Storage: Hot (SSD cache on CDN edges), Warm (GCS Standard), Cold (GCS Archive, tape). Metadata in Bigtable (video info), sharded MySQL (user data). Serving: Client requests DASH/HLS manifest, fetches segments from nearest Google Global Cache node. Adaptive bitrate adjusts quality based on bandwidth. Recommendations: Deep neural networks (two-stage: candidate generation + ranking).",
            "beginnerExample": "// Simplified upload processing pipeline\nasync function handleUpload(videoId, userId) {\n  // 1. Receive upload chunk\n  const upload = await storage.receiveChunk(videoId, chunk);\n  \n  // 2. On upload complete\n  await pubsub.publish('video.uploaded', { videoId, userId });\n}\n\n// Processing consumers\nasync function transcodeVideo(event) {\n  const { videoId } = event;\n  // Parallel transcoding: split into 10-second segments\n  const segments = await splitVideo(videoId, 10);\n  const resolutions = ['144p', '360p', '480p', '720p', '1080p', '4K'];\n  \n  // Encode each segment at each resolution in parallel\n  const jobs = [];\n  for (const segment of segments) {\n    for (const resolution of resolutions) {\n      jobs.push(encodeSegment(segment, resolution, 'h264'));\n    }\n  }\n  await Promise.all(jobs);\n  \n  // Generate manifest file (DASH MPD or HLS m3u8)\n  await generateManifest(videoId, segments, resolutions);\n  \n  // Update metadata\n  await bigtable.updateVideoStatus(videoId, 'ready');\n}\n\n// Adaptive bitrate streaming - client side\n// Client requests manifest, then segments at appropriate quality\n// fetch('https://cdn.youtube.com/video123/manifest.mpd')\n// -> Get list of available qualities and segment URLs\n// -> Monitor buffer level and bandwidth\n// -> Request segments from optimal quality\n// -> Switch quality smoothly on keyframe boundaries",
            "commonMistakes": "Not chunking large files for resumable upload (upload fails entirely). Transcoding sequentially (much slower than parallel). Single CDN provider (regional outages cause global impact). Storing all data in hot storage (costs explode). Not optimizing for mobile users (2G networks, limited data).",
            "bestPractices": "Resumable upload with chunking (PATCH with byte ranges). Parallel transcoding with job queue. Multi-CDN or custom CDN (Google Global Cache in ISPs). Tiered storage (hot/warm/cold/archive). Adaptive bitrate for varying network conditions. Pre-compute recommendations offline. Cache popular content at CDN edges, serve long-tail from origin.",
            "interviewPerspective": "Designing YouTube is a classic FAANG question. Cover: (1) Requirements: upload, stream, search, recommend. Scale numbers: 500h/min upload, 1B hours/day watch. (2) Upload path: chunked upload to GCS, async processing pipeline. (3) Transcoding: parallel segment encoding, multiple resolutions/codecs. (4) Storage hierarchy: SSD edge cache -> GCS -> Coldline -> Archive. (5) CDN: Google Global Cache inside ISPs. (6) Serving: DASH/HLS adaptive streaming. (7) Recommendations: two-stage DNN ranking. (8) Search: Elasticsearch/Bigtable inverted index. Back-of-envelope: storage ~2EB total, transcoding ~500K vCPU-hours/day, CDN bandwidth ~100Tbps.",
            "performanceNotes": "Transcoding: 1 min video takes ~1 min for HD, ~4 min for 4K. GGC cache hit ratio >95% for popular. CDN serves 95% of traffic. First byte latency <100ms from edge. P99 video start time <5s.",
            "securityNotes": "Content ID: audio/video fingerprint matching against copyrighted DB. DRM: Widevine, PlayReady. Geoblocking for regional licensing. Upload scanning: malware, CSAM. Comment moderation: ML filters hate speech, spam."
          },
          "quiz": [
            {
              "id": "hld-yt-1",
              "question": "Why does YouTube transcode videos into multiple resolutions and codecs?",
              "options": [
                "To support different devices and network conditions with adaptive bitrate streaming",
                "To reduce storage costs",
                "To make videos look better on 4K screens",
                "To avoid copyright detection"
              ],
              "correctIndex": 0,
              "explanation": "Multiple resolutions (144p to 4K) support different screen sizes and bandwidths. Multiple codecs (H.264, VP9, AV1) support different device capabilities. Adaptive streaming (DASH/HLS) lets the client choose appropriate quality dynamically.",
              "difficulty": "easy"
            },
            {
              "id": "hld-yt-2",
              "question": "How does YouTube handle the fact that 500+ hours of video are uploaded every minute?",
              "options": [
                "Massively parallel processing pipeline with distributed transcoding jobs",
                "Stores raw uploads without processing",
                "Limits uploads per user",
                "Processes uploads overnight"
              ],
              "correctIndex": 0,
              "explanation": "YouTube splits video into segments, transcodes each segment independently in parallel across thousands of workers (Dataflow). Multiple resolutions and codecs processed simultaneously. This scales linearly with compute resources.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design YouTube's video recommendation system. How does it generate personalized recommendations for 2B+ users?",
              "answer": "Two-stage architecture: (1) Candidate Generation: retrieve hundreds of relevant videos from multiple sources. Sources: user watch history (collaborative filtering via matrix factorization), video similarity (content-based), trending, new uploads, subscribed channels. Uses deep neural network with user embeddings (watch history, search history, demographics) and video embeddings. Trained on watch time (not clicks - better engagement metric). (2) Ranking: deep neural network with hundreds of features (video ID, user-video interaction signals, freshness, language, quality). Optimizes for expected watch time. Features: impressions (watch time of similar videos), language match, upload freshness. (3) Re-ranking: apply business rules (diversity - avoid same creator, freshness - include recent, topic diversity), filter already watched. (4) Caching: pre-compute for active users. Training: TensorFlow on TPU pods, daily model updates. Online A/B testing for new models.",
              "difficulty": "expert",
              "company": "Google"
            },
            {
              "question": "How does YouTube's Content ID system work? How does it compare uploaded videos against copyrighted content at scale?",
              "answer": "Content ID creates a digital fingerprint (hash) of copyrighted content. Upload pipeline: (1) Rights holders submit reference files (audio + video) to Content ID database. (2) System extracts features: audio (spectrogram peaks, tempo, melody), video (keyframes, motion vectors, scene changes). (3) Features hashed into fingerprints, stored in massive distributed fingerprint DB (Bigtable). (4) Every new upload is fingerprinted and compared against DB. (5) Matches scored by confidence threshold. (6) Rights holder policy applied: block, monetize (ads), or track (analytics). Scale: scans 500+ hours of new uploads per minute against petabytes of reference data. Fingerprinting is efficient: each minute of video generates ~20KB of fingerprints (compressed from GBs of source). Near real-time: upload processed within minutes.",
              "difficulty": "expert",
              "company": "Google"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "design-whatsapp",
          "title": "Design WhatsApp",
          "order": 2,
          "content": {
            "overview": "Designing a messaging app like WhatsApp for 2B+ users. Must handle real-time messaging, group chats, media sharing, voice/video calls, end-to-end encryption, and offline message delivery. All on a minimal infrastructure budget.",
            "problemStatement": "Messages must be delivered in real-time when users are online, queued when offline (up to 30 days), encrypted end-to-end, and work reliably on low-bandwidth networks. A 2B user base means 100B+ messages/day with minimal server storage.",
            "intuitionFirst": "WhatsApp is like a global postal service where letters self-destruct after delivery. Post offices (servers) route letters but can't read them. If you're not home, letters wait at the post office until you pick them up.",
            "realLifeAnalogy": "A walkie-talkie network: real-time for active users, voicemail for offline, all encrypted. The switchboard operator doesn't listen to conversations, just connects the right people.",
            "howItWorks": "Registration: phone number verification via SMS/call. Connection management: persistent TCP connection (custom XMPP variant) with heartbeat. Each connection handled by an Erlang process (lightweight, millions per server). Message flow: (1) Client encrypts message with Signal Protocol session key. (2) Sends to server via persistent connection. (3) Server routes to recipient's connection server. (4) If recipient online: push via their persistent connection. (5) If offline: store in server queue (up to 30 days). (6) On reconnect: deliver queued messages in order. (7) Delivery receipts flow back. Media: upload to encrypted blob storage, send thumbnail + encrypted URL. Groups: server-managed membership list, relay for small groups (<256), client-relay for larger.",
            "beginnerExample": "// Simplified message routing\nclass MessageServer {\n  private connections: Map<string, WebSocket> = new Map();\n  private offlineQueues: Map<string, Message[]> = new Map();\n  private servers: string[] = []; // other server nodes\n\n  async handleMessage(msg: Message) {\n    // Find which server has the recipient\n    const serverId = this.getHomeServer(msg.recipientId);\n    \n    if (serverId === this.myId) {\n      // Recipient connected to this server\n      const conn = this.connections.get(msg.recipientId);\n      if (conn && conn.readyState === WebSocket.OPEN) {\n        conn.send(this.encode(msg));\n        this.sendReceipt(msg.id, msg.senderId, 'delivered');\n      } else {\n        // Store for offline delivery\n        if (!this.offlineQueues.has(msg.recipientId)) {\n          this.offlineQueues.set(msg.recipientId, []);\n          this.startQueueTimer(msg.recipientId);\n        }\n        const queue = this.offlineQueues.get(msg.recipientId);\n        if (queue && queue.length < 10000) { // Max 10K queued\n          queue.push(msg);\n        }\n      }\n    } else {\n      // Forward to the correct server (internal RPC)\n      await this.rpcCall(serverId, 'deliver', msg);\n    }\n  }\n\n  onUserConnect(userId: string, ws: WebSocket) {\n    this.connections.set(userId, ws);\n    // Deliver queued messages\n    const queue = this.offlineQueues.get(userId) || [];\n    this.offlineQueues.delete(userId);\n    for (const msg of queue) {\n      ws.send(this.encode(msg));\n    }\n  }\n}",
            "commonMistakes": "Global message ordering (not feasible at scale, order per conversation only). Storing messages permanently on server (privacy + storage costs). Not handling queued message expiry (messages from years ago shouldn't deliver). No encryption for group messages (group metadata leakage).",
            "bestPractices": "E2E encryption using Signal Protocol (Double Ratchet + prekeys). Minimal server storage (deliver and delete). Binary protocol for bandwidth efficiency. Persistent TCP connection with resumption. Store-and-forward with 30-day TTL. Erlang/OTP for massive concurrency. Phone number identity (no passwords to manage).",
            "interviewPerspective": "WhatsApp design tests understanding of real-time systems at extreme scale. Discuss: (1) Why Erlang? Actor model gives millions of lightweight processes, fault tolerance, hot code reloading. (2) Connection management: persistent TCP with heartbeat, exponential backoff for reconnection. (3) Offline messaging: store-and-forward with expiry. (4) E2E encryption: Signal Protocol (Double Ratchet, prekeys, X3DH). (5) Group messaging: sender fan-out for small groups, server relay for larger. (6) Media: encrypted S3 + thumbnail caching. Stand out by discussing the '50 engineers for 2B users' stat - WhatsApp achieved this through simplicity and Erlang's productivity. Also discuss binary protocol vs protobuf vs JSON trade-offs.",
            "performanceNotes": "Each Erlang server: ~1M concurrent connections. Server memory: ~100KB per connection. Message delivery latency: <100ms for online users. Offline queue: up to 30 days. Message storage: minimal (encrypted, deliver and delete). Bandwidth: binary protocol ~100 bytes per text message.",
            "securityNotes": "Signal Protocol: Double Ratchet for perfect forward secrecy. X3DH for initial key exchange. Curve25519 public keys. AES-256-CBC + HMAC-SHA256. No server access to message content. Metadata: sender, recipient, timestamp (minimal). Group encryption: Sender Keys (efficient for groups). No cloud backup of messages (or encrypted with user's passphrase)."
          },
          "quiz": [
            {
              "id": "hld-wa-1",
              "question": "How does WhatsApp maintain persistent connections with millions of users on a single server?",
              "options": [
                "Erlang lightweight processes handle each connection independently with ~100KB memory per connection",
                "Each user gets a dedicated thread (expensive but simple)",
                "HTTP long-polling instead of WebSocket",
                "Users maintain their own connections without server involvement"
              ],
              "correctIndex": 0,
              "explanation": "WhatsApp uses Erlang on FreeBSD. Erlang's lightweight processes (~300 bytes each) handle each connection. A single server manages ~1M connections with ~100KB overhead per connection. Much more efficient than thread-per-connection model.",
              "difficulty": "hard"
            },
            {
              "id": "hld-wa-2",
              "question": "How does WhatsApp's E2E encryption work using the Signal Protocol?",
              "options": [
                "Uses Double Ratchet algorithm for perfect forward secrecy - each message derives new keys from previous ones",
                "Uses RSA key exchange for each message",
                "Uses a shared secret stored on server",
                "Uses TLS encryption only"
              ],
              "correctIndex": 0,
              "explanation": "Signal Protocol uses Double Ratchet: combines asymmetric (DH) and symmetric (hash chain) ratchets. Each message derives new encryption keys. If a key is compromised, only messages in that ratchet step are exposed. Past and future messages remain secure.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design a real-time messaging system like WhatsApp for 2B users with E2E encryption and offline delivery.",
              "answer": "Connection: (1) Users connect via persistent TCP to nearest edge server (geo-routed via DNS). (2) Custom binary protocol (protobuf) for bandwidth efficiency. (3) Heartbeat every 30s to detect disconnection. (4) Erlang/OTP handles 1M+ concurrent connections per node. Message routing: (1) Shard users across server pool by user_id hash. (2) Each server maintains routing table of 'which server has which user'. (3) Internal RPC between servers for message delivery. Offline: (1) Message queued in encrypted form on sender's home server. (2) TTL of 30 days. (3) Delivered on user reconnect via push notification wakeup. E2E Encryption: (1) X3DH initial key exchange using prekeys (one-time + signed). (2) Double Ratchet for ongoing conversation. (3) Group: Sender Keys (share session key with group members, encrypted individually). Media: upload to encrypted S3, send thumbnail + encrypted reference. Group chat: server manages membership, sender distributes message to all members (fan-out) for groups <256, server relay for larger. Delivery semantics: FIFO per conversation (message order preserved via sequence numbers).",
              "difficulty": "expert",
              "company": "Meta"
            },
            {
              "question": "How would you design WhatsApp group chat for groups with up to 256 participants?",
              "answer": "Group management: (1) Group metadata (name, members, admin) stored in Cassandra. (2) Membership replicated to all group participants' home servers. Message delivery for small groups (<256): (1) Sender sends message to their home server. (2) Server fans out to each participant's home server. (3) Each home server delivers to recipient (online or queue). E2E encryption: Signal Protocol Sender Keys. (1) Sender creates a session key chain. (2) Shares initial key with all group members, encrypted with each member's individual session key. (3) Subsequent messages use ratcheted keys from the chain (one ratchet per message). (4) Each member can decrypt using their copy of the sender's key chain. This avoids N² encryption operations (each sender encrypts once, each message is small). For >256 participants: use broadcast channels with streaming cipher. Server never has access to plaintext keys or messages.",
              "difficulty": "expert",
              "company": "Signal"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "design-netflix",
          "title": "Design Netflix",
          "order": 3,
          "content": {
            "overview": "Designing Netflix for 260M+ subscribers streaming 1B+ hours/week. The system must handle video ingestion from studios, transcoding, content delivery via Open Connect CDN, personalized recommendations, and a seamless multi-device viewing experience.",
            "problemStatement": "Netflix streams ~15% of global internet traffic. Videos must be available in dozens of resolutions and codecs, start playing in <1.5s, adapt to network conditions, and survive regional CDN outages. Recommendations must be personalized in real-time.",
            "intuitionFirst": "Netflix is like a global network of video rental stores where each store (Open Connect appliance) is inside your internet provider's building. The central office manages inventory, creates multiple format copies, and decides what to stock at each store.",
            "realLifeAnalogy": "A massive video production company with thousands of editors (encoding pipeline), a global distribution network (Open Connect in ISPs), and a team of personal shoppers (recommendation system) who know your taste.",
            "howItWorks": "Content pipeline: (1) Studio delivers master file. (2) Source validated, metadata extracted. (3) Transcoding pipeline: parallel jobs for each resolution (235Kbps-58Mbps) and codec (H.264, H.265, VP9, AV1). Per-title encoding optimization (analyzes content complexity to optimize bitrate ladder). (4) Content packaged into DASH/HLS. (5) Master + encodes stored in S3. Serving: (1) Open Connect appliances in ISP data centers pre-populated with popular content (predictive caching). (2) Client requests manifest (list of available qualities). (3) Client monitors bandwidth/buffer, requests appropriate segments. (4) Adaptive bitrate switches quality seamlessly. Recommendations: ML models (collaborative filtering, content-based, contextual) scored offline, combined with real-time signals (trending, continue watching, device type). Each user's home page is personalized with row-level ranking. Infrastructure: AWS (compute, storage), Cassandra (metadata), EVCache (Redis-like cache), Elasticsearch (search), Kafka (event streaming), Spinnaker (CD).",
            "beginnerExample": "// Adaptive bitrate selection algorithm (client side)\nclass AdaptiveBitrate {\n  private qualities = ['240p', '360p', '480p', '720p', '1080p', '4K'];\n  private currentQuality = 2; // 480p default\n  private bandwidthHistory: number[] = [];\n\n  async selectQuality(): Promise<string> {\n    // Measure recent bandwidth\n    const lastSegment = await this.getLastSegmentMetrics();\n    this.bandwidthHistory.push(lastSegment.bandwidth);\n    \n    // Use weighted average (recent more important)\n    const avgBandwidth = this.bandwidthHistory.slice(-5).reduce((a, b) => a + b, 0) / 5;\n    \n    // Choose highest quality that fits in 80% of bandwidth (margin)\n    const usableBandwidth = avgBandwidth * 0.8;\n    \n    let selected = 0;\n    for (const [i, quality] of this.qualities.entries()) {\n      if (this.getBitrate(quality) <= usableBandwidth) {\n        selected = i;\n      }\n    }\n    \n    // Smooth transitions: don't jump more than 1 level\n    if (Math.abs(selected - this.currentQuality) > 1) {\n      selected = this.currentQuality + (selected > this.currentQuality ? 1 : -1);\n    }\n    \n    this.currentQuality = selected;\n    return this.qualities[selected];\n  }\n}",
            "commonMistakes": "Single-region deployment (regional outage affects all). Not having fallback CDN if Open Connect node fails. Buffer bloat on client (too much buffering wastes bandwidth). Not considering different device capabilities (TV vs phone).",
            "bestPractices": "Open Connect CDN: deploy appliances inside ISP data centers. Predictive caching: pre-populate based on popularity forecasts. Per-title encoding: custom bitrate ladder per video. Multi-CDN fallback: fallback to commercial CDN if Open Connect unavailable. Client-side adaptive bitrate: BOLA or MPC algorithms for optimal quality. Chaos engineering: regularly test failure scenarios.",
            "interviewPerspective": "Netflix is a great system design topic because it covers so many distributed systems concepts. Discuss: (1) Open Connect: Netflix's CDN inside ISPs. (2) Transcoding pipeline: massively parallel, per-title optimization. (3) Adaptive bitrate: client-side algorithms (BOLA, MPC). (4) Recommendation: two-stage, matrix factorization to DNN. (5) Chaos Engineering: building resilience through controlled failure. (6) Microservices: Netflix's migration from monolith to 500+ microservices. Stand out: discuss the evolution from DVD-by-mail (monolith) to streaming (cloud-native), and Netflix's open-source contributions (Hystrix, Eureka, Zuul, Chaos Monkey, Spinnaker).",
            "performanceNotes": "Open Connect: serves 95% of traffic. Each appliance: ~100TB SSD cache. Start time: <1.5s (goal). Adaptive bitrate: switches in <2s on bandwidth change. Transcoding: 1 hour video in ~1 hour (HD), ~4 hours (4K). Per-title encoding: 20% bandwidth reduction vs fixed ladder.",
            "securityNotes": "DRM: Widevine (Android, Chrome), FairPlay (Apple), PlayReady (Xbox, Windows). Content keys delivered securely. CSP (Content Security Policy) headers on web. API authentication via device tokens + customer ID. Anti-piracy: forensic watermarking (unique per-subscriber watermark embedded in video)."
          },
          "quiz": [
            {
              "id": "hld-nf-1",
              "question": "What is per-title encoding optimization in Netflix?",
              "options": [
                "Customizing the bitrate ladder for each video based on its content complexity to optimize quality vs bandwidth",
                "Encoding every video at the same bitrate",
                "Using only one codec for all videos",
                "Manually setting bitrates per title"
              ],
              "correctIndex": 0,
              "explanation": "Per-title encoding analyzes each video's complexity (motion, detail, grain). Action movies need higher bitrate than talking heads. Customizing the encoding ladder per video reduces bandwidth by ~20% without quality loss.",
              "difficulty": "medium"
            },
            {
              "id": "hld-nf-2",
              "question": "Why does Netflix use Open Connect instead of a commercial CDN?",
              "options": [
                "To control the delivery infrastructure, reduce costs, and place content inside ISP networks for optimal latency",
                "Commercial CDNs are too slow",
                "To build their own hardware",
                "To avoid paying for bandwidth"
              ],
              "correctIndex": 0,
              "explanation": "Netflix streams ~15% of global internet traffic. Commercial CDNs would be cost-prohibitive. Open Connect appliances are free to ISPs in exchange for being placed inside their network, reducing transit costs and improving performance for both Netflix and ISPs.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design Netflix's Open Connect CDN. How does it decide what content to cache and where?",
              "answer": "(1) Open Connect appliances (OCAs) are deployed inside ISP data centers worldwide (10,000+ nodes). (2) Each OCA has ~100TB SSD storage, serving popular content. (3) Content placement: Netflix predicts content popularity per region using ML models (historical views, time of day, new releases, day-of-week patterns, cultural preferences). (4) Pre-population: overnight, OCAs fetch predicted popular titles from regional hub (aggregation node). (5) Cache replacement: LRU with popularity weighting. (6) Dynamic updates: if a title becomes unexpectedly popular (viral), OCA fetches from hub or origin. (7) Regional hubs: store larger content catalog, serve OCAs in the region. (8) Origin: master copies in AWS S3 (us-east-1, us-west-2). (9) Fallback: if OCA doesn't have content, requests go to hub, then to origin. (10) ISP benefits: reduced transit costs (90%+ of video served locally), better QoE for subscribers. Cache hit ratio: >95% for popular content, overall ~90%.",
              "difficulty": "expert",
              "company": "Netflix"
            },
            {
              "question": "Design Netflix's Chaos Engineering platform (Chaos Monkey, Chaos Kong). How do you test resilience without causing real outages?",
              "answer": "Chaos Monkey: (1) Randomly terminates EC2 instances during business hours. (2) Runs across all production regions, all services. (3) Scheduled during low-traffic hours. (4) Automatically stops if error rate exceeds threshold. (5) Forces teams to build: no single point of failure, auto-healing, graceful degradation. Chaos Kong: (1) Simulates entire AWS region failure. (2) Forwards traffic from simulated-failed region to healthy region. (3) Validates multi-region active-active setup. (4) Monitors: error rates, latency, throughput, data consistency. Failure Injection Testing (FIT): (1) Injects latency and errors into service-to-service calls. (2) Tests: Hystrix circuit breakers, retry logic, fallback behavior. (3) Fine-grained: target specific API paths, user segments. Best practices: (1) Start small (terminate 1 instance), expand gradually. (2) Monitoring in place: auto-abort if KPIs degrade. (3) Game days: scheduled chaos events with incident response practice. (4) Blameless culture: failures are system weaknesses, not human errors.",
              "difficulty": "expert",
              "company": "Netflix"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "design-uber",
          "title": "Design Uber",
          "order": 4,
          "content": {
            "overview": "Designing Uber for 25M+ trips daily across 10,000+ cities. The system must match riders with drivers in real-time, calculate ETAs and pricing, handle payments, and optimize supply/demand across geographies - all with <500ms dispatch latency.",
            "problemStatement": "A ride request triggers: finding nearby drivers, calculating ETAs, surge pricing, matching, routing, payment, real-time tracking. Each subproblem is hard independently. Combined, they require a sophisticated distributed system integrating maps, geospatial indexing, ML, and payments.",
            "intuitionFirst": "Uber is like air traffic control for ground transportation. Controllers (dispatch service) know the position of every plane (driver), assign incoming flights (ride requests) to the nearest available gate, adjust landing fees (surge) based on demand, and track each flight's progress.",
            "realLifeAnalogy": "A taxi dispatch center in a city with 10,000 taxis. Dispatchers know each taxi's location via radio (GPS), assign the nearest available taxi to caller, calculate fare based on distance and demand, and track the trip.",
            "howItWorks": "Request flow: (1) Rider opens app, sees map with ETAs (pre-computed for surrounding area). (2) Set pickup/drop-off, request ride. (3) Request sent to Dispatch service. (4) Dispatch queries geospatial index (Redis GEO or Uber's custom solution) for nearby available drivers. (5) For each candidate driver, compute ETA (pre-computed ML model). (6) Surge pricing: calculate demand/supply ratio in geohash cell. (7) Send push notification to top 3 drivers (first to accept wins). (8) On acceptance, ride details sent to both parties. (9) Driver navigates to pickup (optimized routing). (10) Trip starts, GPS tracking sends to rider. (11) Payment processed end-of-trip. Infrastructure: Peloton (resource isolation), Ringpop (consistent hashing), Schemaless (scalable datastore), Hive (stream processing), Manas (ML platform), kafka (event streaming).",
            "beginnerExample": "// Geohash-based driver discovery\nclass DispatchService {\n  private redis = new Redis();\n\n  async findNearbyDrivers(lat: number, lng: number, radiusKm: number): Promise<Driver[]> {\n    // Convert to geohash with precision based on radius\n    const precision = this.getPrecisionForRadius(radiusKm); // ~6 for 1km, ~5 for 5km\n    const centerHash = geohash.encode(lat, lng, precision);\n    const neighbors = geohash.neighbors(centerHash); // 8 adjacent cells\n    \n    // Query Redis for available drivers in these cells\n    const allCells = [centerHash, ...neighbors];\n    const nearbyDrivers: Driver[] = [];\n    \n    for (const cell of allCells) {\n      const driverIds = await redis.smembers(`drivers:available:${cell}`);\n      for (const id of driverIds) {\n        const driver = await redis.hgetall(`driver:${id}`);\n        if (driver && driver.status === 'available') {\n          const distance = this.haversineDistance(lat, lng, driver.lat, driver.lng);\n          nearbyDrivers.push({ id, distance, ...driver });\n        }\n      }\n    }\n    \n    return nearbyDrivers.sort((a, b) => a.distance - b.distance);\n  }\n\n  async dispatchRide(request: RideRequest) {\n    const drivers = await this.findNearbyDrivers(request.pickupLat, request.pickupLng, 2);\n    \n    if (drivers.length === 0) {\n      return { error: 'No drivers available', surgeMultiplier: 1.5 };\n    }\n    \n    // Calculate ETA for top 5 drivers\n    const candidates = await Promise.all(\n      drivers.slice(0, 5).map(d => this.calculateETA(d, request))\n    );\n    \n    // Send to top 3 drivers (first accept wins)\n    const sentTo = candidates.slice(0, 3);\n    const result = await this.dispatchToDrivers(sentTo, request);\n    \n    return result;\n  }\n}",
            "commonMistakes": "Not handling driver cancellation after matching (re-dispatch needed). Geohash edge cases (driver on cell border). GPS drift causing inaccurate driver positions. Surge pricing angering users (need transparent pricing). Not pre-computing ETAs (too slow for real-time).",
            "bestPractices": "Pre-compute ETAs for all riders in area (background). Use geohash with adjacent cells for spatial index. Multiple driver notification (first-accept-wins) to reduce no-shows. Surge pricing with user elasticity model. Real-time GPS with Kalman filtering to reduce noise. Fallback: if primary dispatch fails, queue request for retry.",
            "interviewPerspective": "Uber is a favorite design question. Cover: (1) Geospatial indexing: geohash vs quad-tree vs S2 (Google). (2) Real-time matching: find nearest driver quickly. (3) ETA calculation: traffic-aware routing, ML models. (4) Surge pricing: demand/supply curves. (5) Trip execution: routing, tracking, payment. (6) Architecture evolution: monolith -> microservices -> domain-oriented. Stand out: discuss Uber's use of Apache Hive for stream processing, Peloton for resource isolation, and how they handle the 'supply triangle' (rider wants low price + short wait, driver wants high earnings + consistent work, Uber wants profit + market share).",
            "performanceNotes": "Dispatch: <500ms end-to-end. GPS updates: every 4 seconds. Geohash precision 7 (~150m). Redis GEO queries: ~100K ops/sec. Kafka GPS ingestion: ~1M events/sec. Pre-computed ETAs: refreshed every 30 seconds.",
            "securityNotes": "Rider/driver verification (ID checks, background checks). Real-time GPS access restricted to active trips. Payment card tokenization (PCI compliance). Phone number privacy (masked calling). Trip history access controls. Fraud detection ML models (fake rides, payment fraud)."
          },
          "quiz": [
            {
              "id": "hld-ub-1",
              "question": "What geospatial indexing approach does Uber use for finding nearby drivers?",
              "options": [
                "Geohash with 8 adjacent cells (or Google S2 library)",
                "Brute force distance calculation for all drivers",
                "Quad-tree spatial index on a single server",
                "Zip code matching"
              ],
              "correctIndex": 0,
              "explanation": "Uber uses geohash (and later Google S2) to partition the world into hierarchical grid cells. Each driver's location maps to their cell. Finding nearby drivers queries the rider's cell plus 8 adjacent cells for drivers at the same geohash precision.",
              "difficulty": "medium"
            },
            {
              "id": "hld-ub-2",
              "question": "How does Uber handle the 'first-accept-wins' dispatch without double-booking drivers?",
              "options": [
                "Sends ride request to multiple drivers, driver's device shows a timeout countdown, first to tap 'Accept' gets the ride - others see 'Ride no longer available'",
                "Sends to one driver at a time sequentially",
                "Uses a bidding system",
                "Pre-assigns rides based on a schedule"
              ],
              "correctIndex": 0,
              "explanation": "Uber sends the ride offer to 3 nearby drivers simultaneously. Each has ~10 seconds to accept. The first server-side 'accept' wins. Other drivers immediately see 'ride no longer available'. This reduces match time vs sequential dispatch.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design Uber's surge pricing system. How does it calculate real-time pricing based on supply and demand?",
              "answer": "Surge pricing core algorithm: (1) Divide city into geohash cells (dynamic size based on density). (2) For each cell, maintain sliding window counters: demand (ride requests in last 5 min), supply (available drivers in last 5 min). (3) Surge multiplier = base_multiplier * (demand / supply) * elasticity_factor. (4) Elasticity factor: how sensitive riders are to price increases (ML model trained on historical response). (5) Dynamic thresholds: minimum surge (1.1x) and maximum (5x) configured per city. (6) Heat map generation: every minute, compute surge for each cell, publish to clients. (7) Driver notification: 'Earnings boost' notifications incentivize drivers to move to surge areas. (8) User experience: show surge multiplier before request, confirm higher fare. (9) Multi-armed bandit: A/B test different pricing models to optimize revenue + rider satisfaction. (10) Downtime: if surge service is down, fall back to flat pricing.",
              "difficulty": "expert",
              "company": "Uber"
            },
            {
              "question": "How would you design Uber's ETA prediction system? How does it compute accurate arrival times?",
              "answer": "Three models combined: (1) Base travel time: road network graph (OpenStreetMap) + A* routing algorithm. Compute shortest path considering road type, speed limits, distance. (2) Real-time traffic: segment-level traffic speed from GPS probe data (anonymized Uber driver speeds + third-party traffic data). Segments categorized: free-flow, moderate, congested, blocked. (3) ML prediction: gradient-boosted trees or neural network with features: time of day, day of week, holiday, weather, events (concerts, sports), historical travel times for this route at this time. Output: ETA distribution (P50, P95, P99). Combined: ML model takes base time + traffic + contextual features. Pre-computation: ETAs from every active rider's location to surrounding areas refreshed every 30s (background job). Cached: rider opens app, ETAs are already computed. Accuracy: median error <1 minute for typical city trips.",
              "difficulty": "expert",
              "company": "Uber"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "design-instagram",
          "title": "Design Instagram",
          "order": 5,
          "content": {
            "overview": "Design Instagram for 1B+ monthly active users sharing 100M+ photos/videos daily. Core features: photo upload with processing, news feed (algorithmic ranking), stories (ephemeral content), explore (content discovery), and direct messaging. Famous for scaling from 0 to 1B users on a simple tech stack.",
            "problemStatement": "Instagram started as a single Django server serving 13M users. Hyper-growth required scaling: feed generation (fan-out), photo processing (thumbnails), storage (S3 for exabytes), and maintaining real-time engagement features (likes, comments, stories).",
            "intuitionFirst": "Instagram is a digital photo album that automatically shows you your friends' latest pictures. When a friend posts, their photo appears at the top of your album. For popular friends (celebrities), you check their album directly instead.",
            "realLifeAnalogy": "A school photo wall: students pin photos to the wall. Your friends' photos are at eye level (feed). Popular kids have their own bulletin boards. Photos disappear after a day (stories). Every photo has likes written below it.",
            "howItWorks": "Post/Photo: (1) Upload to S3 via pre-signed URL. (2) S3 event triggers Lambda for thumbnail generation (3 sizes). (3) Metadata (user_id, caption, location) in PostgreSQL (sharded). (4) Post ID added to followers' feeds (fan-out on write, or pull for celebrities). Feed: (1) Pre-computed list of post IDs in Redis (sorted by timestamp or ML rank score). (2) On scroll, fetch next page of post IDs, get full post data from Memcached. (3) Algorithmic ranking: ML model scores posts. Stories: (1) Upload to S3 with 24h TTL. (2) Metadata in Redis with TTL. (3) View tracking via Redis sets. Explore: (1) Graph-based discovery (followers of followers, similar interests). (2) ML embedding similarity. Infrastructure: PostgreSQL (sharded), Redis (feed cache), Memcached (object cache), S3 (media), CDN (CloudFront), Cassandra (stories, direct messages).",
            "beginnerExample": "// Photo upload flow\nasync function uploadPhoto(userId: string, imageBuffer: Buffer, caption: string) {\n  // 1. Generate unique ID\n  const photoId = generateId();\n  \n  // 2. Upload original to S3\n  const s3Key = `photos/${userId}/${photoId}/original.jpg`;\n  await s3.upload({ Bucket: 'insta-photos', Key: s3Key, Body: imageBuffer }).promise();\n  \n  // 3. Queue thumbnail generation\n  await sqs.sendMessage({\n    QueueUrl: 'thumbnail-queue',\n    MessageBody: JSON.stringify({ photoId, userId, bucket: 'insta-photos' }),\n  }).promise();\n  \n  // 4. Save metadata to DB\n  await db.query(\n    'INSERT INTO photos (id, user_id, caption, s3_key, created_at) VALUES ($1, $2, $3, $4, NOW())',\n    [photoId, userId, caption, s3Key]\n  );\n  \n  // 5. Fan-out to followers\n  const followers = await db.query(\n    'SELECT follower_id FROM follows WHERE followee_id = $1', [userId]\n  );\n  \n  const pipeline = redis.pipeline();\n  for (const { follower_id } of followers.rows) {\n    pipeline.lpush(`feed:${follower_id}`, photoId);\n    pipeline.ltrim(`feed:${follower_id}`, 0, 499);\n  }\n  await pipeline.exec();\n  \n  return { photoId, s3Key };\n}\n\n// Thumbnail consumer\nasync function generateThumbnail(event: SQSMessage) {\n  const { photoId, userId, bucket } = JSON.parse(event.Body);\n  \n  // Download original from S3\n  const original = await s3.getObject({ Bucket: bucket, Key: `photos/${userId}/${photoId}/original.jpg` });\n  \n  // Generate thumbnails at different sizes\n  const sizes = [\n    { width: 150, suffix: 'small' },\n    { width: 320, suffix: 'medium' },\n    { width: 640, suffix: 'large' },\n  ];\n  \n  for (const size of sizes) {\n    const resized = await sharp(original.Body).resize(size.width).toBuffer();\n    await s3.upload({\n      Bucket: bucket,\n      Key: `photos/${userId}/${photoId}/${size.suffix}.jpg`,\n      Body: resized,\n    }).promise();\n  }\n}",
            "commonMistakes": "Fan-out on write for everyone (celebrities with millions of followers). Not using separate sizes for feed vs detail view (bandwidth waste). Storing all media in single S3 bucket (throttling). Loading full feed at once (not paginating). Stories not expiring properly (TTL management).",
            "bestPractices": "Hybrid fan-out (push for regular, pull for celebrities). Multiple thumbnail sizes for different contexts. S3 bucket sharding by user_id. Cursor-based pagination for infinite scroll. Redis TTL for stories. CDN for media delivery with long cache TTL (versioned URLs). Pre-compute algorithmic ranking offline.",
            "interviewPerspective": "Instagram is the go-to question for feed design. Discuss: (1) Feed architecture: fan-out on write (push) vs fan-out on read (pull) vs hybrid. (2) Photo processing pipeline: async thumbnail generation. (3) Media storage hierarchy: S3 + CDN. (4) Feed ranking: chronological vs algorithmic (Instagram's 2016 switch). (5) Stories: ephemeral storage design. (6) Explore: graph-based discovery. Key lesson: Instagram scaled to 13M users on a single server before needing to shard. Start simple, scale when necessary.",
            "performanceNotes": "Post write: ~1M posts/min at peak. Feed read: ~500K feed loads/min. Redis feed lists: 500-800 entries per user. Thumbnails: 3 sizes per photo (150, 320, 640). Media CDN hit ratio: >95% for popular content. P99 feed load: <200ms.",
            "securityNotes": "Private accounts: post visibility filtering. Photo metadata (EXIF) stripping. NSFW content detection ML. Spam detection for comments. Account verification for public figures. Rate limiting for API endpoints."
          },
          "quiz": [
            {
              "id": "hld-ig-1",
              "question": "Why did Instagram switch from chronological to algorithmic feed ranking?",
              "options": [
                "To increase engagement by showing users the most relevant content first, not just the most recent",
                "To reduce server load",
                "To promote sponsored posts",
                "To simplify the codebase"
              ],
              "correctIndex": 0,
              "explanation": "With 1B users, a purely chronological feed meant users missed important posts from close friends buried under hundreds of less relevant posts. Algorithmic ranking (2016) scores posts by predicted interest, increasing engagement and time spent.",
              "difficulty": "medium"
            },
            {
              "id": "hld-ig-2",
              "question": "How does Instagram handle the fan-out problem for celebrity posts?",
              "options": [
                "Hybrid approach: fan-out on write for regular users, fan-out on read for celebrities (>10K followers)",
                "Always fan-out on write for all users",
                "Always fan-out on read for all users",
                "Celebrities have separate app"
              ],
              "correctIndex": 0,
              "explanation": "Regular users (<10K followers): push post ID to all followers' feeds (fan-out on write). Celebrities: followers pull from celebrity's feed on timeline load (fan-out on read). This prevents the write explosion of pushing to millions of followers' lists.",
              "difficulty": "hard"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design Instagram's 'Explore' page. How does it recommend content users might like?",
              "answer": "Multi-stage pipeline: (1) Candidate generation: multiple sources - Graph-based (users followed by users you follow), Content embedding similarity (posts similar to liked posts via visual embeddings), Trending (popular in your region). (2) Embedding: posts embedded using CNN (visual features) + text embedding (caption, hashtags). User embedding from interaction history. (3) Similarity search: approximate nearest neighbor (ANN) using FAISS or ScaNN. (4) Ranking: ML model (typically gradient-boosted tree or DNN) with features: engagement prediction (likes, saves, shares), user similarity score, freshness, content quality, diversity penalty (avoid same topics). (5) Filtering: remove seen posts, blocked accounts, NSFW content. (6) Personalization: real-time signals (recent likes, saves) > offline signals (long-term preferences). Training: incremental daily updates, A/B tested. Infrastructure: Cassandra for candidate storage, Redis for real-time signals, S3 for embeddings, Spark for batch training.",
              "difficulty": "expert",
              "company": "Meta"
            },
            {
              "question": "How would you design Instagram Stories with 24-hour expiration and view tracking?",
              "answer": "Upload: (1) User captures story, uploads to S3 (key: stories/{userId}/{storyId}.mp4). (2) Metadata stored in Redis with 24h TTL (hash: story:{storyId} -> userId, mediaUrl, timestamp, filters). (3) User's active stories tracked in Redis sorted set: user_stories:{userId} -> {storyId: timestamp}. (4) Followers' story feed populated on load (pull model): gather all followed users, check each user's active stories set. (5) View tracking: for each story, maintain Redis set story_views:{storyId} -> set of viewer userIds. (6) Viewer sees 'seen by' count, story poster sees list. Deletion: (1) Redis TTL auto-deletes keys after 24h. (2) Cron job marks S3 files for deletion (eventual). (3) User can manually delete earlier. Analytics: story views, completion rate, exit points aggregated via Kafka -> Hive. Privacy: close friends list for selective sharing. Performance: stories tray loads <100ms (all metadata in Redis, thumbnails from CDN).",
              "difficulty": "hard",
              "company": "Meta"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "design-chatgpt",
          "title": "Design ChatGPT",
          "order": 6,
          "content": {
            "overview": "Design ChatGPT for 100M+ weekly active users generating billions of tokens daily. The system must handle real-time text generation with large language models (GPT-4), manage conversation history, implement safety filters, and scale inference across thousands of GPUs.",
            "problemStatement": "LLM inference is computationally expensive: a single GPT-4 response uses 100x+ more compute than a typical web request. Response must stream in real-time (<2s first token, then tokens streamed). Must handle millions of concurrent users with cost-effective GPU utilization.",
            "intuitionFirst": "ChatGPT is like a library where each book is written on-demand by a super-fast author. Reading the first page (first token) takes a moment, but subsequent pages arrive quickly. Multiple readers share the author's attention (GPU batches).",
            "realLifeAnalogy": "A team of expert consultants (LLM model instances) answering questions. You submit a question, a consultant starts answering immediately (first token), continues until finished (streaming). If busy, you wait for next available consultant (request queue). Safety reviewer checks answers before delivery (content filter).",
            "howItWorks": "Request flow: (1) User sends message (text, image for GPT-4V). (2) API Gateway authenticates, rate limits. (3) Request routed to inference cluster. (4) Conversation history loaded from Redis (last N messages). (5) Tokenizer converts text to tokens. (6) GPU inference: Transformer model processes tokens, generates response autoregressively (one token at a time). (7) Response streamed back via SSE (Server-Sent Events). (8) Safety filter checks output (content moderation). (9) Conversation saved to PostgreSQL/Cosmos DB. Infrastructure: (1) GPU cluster: thousands of NVIDIA A100/H100 GPUs. (2) Model parallelism: tensor parallelism (split layers across GPUs) + pipeline parallelism (split sequence across GPUs). (3) KV cache per conversation for efficient generation. (4) Request batching: dynamic batching groups multiple requests for efficient GPU utilization. (5) Load shedding: priority queues for paid users, rate limit for free. (6) Monitoring: tokens/sec, latency P50/P99, GPU utilization, queue depth.",
            "beginnerExample": "// Simplified LLM inference with streaming\nasync function* generateResponse(model: LLMModel, messages: Message[], maxTokens: number) {\n  // 1. Tokenize input\n  const inputTokens = tokenizer.encode(messages);\n  \n  // 2. Initialize KV cache with prefix\n  const kvCache = model.prefill(inputTokens);\n  \n  // 3. Autoregressive generation\n  let outputTokens: number[] = [];\n  for (let i = 0; i < maxTokens; i++) {\n    // 4. One forward pass through transformer\n    const logits = model.forward(outputTokens[outputTokens.length - 1] || inputTokens[0], kvCache);\n    \n    // 5. Sample next token\n    const nextToken = sample(logits, { temperature: 0.7, top_p: 0.9 });\n    \n    // 6. Check for stop token\n    if (nextToken === tokenizer.eosTokenId) break;\n    \n    outputTokens.push(nextToken);\n    \n    // 7. Yield decoded token for streaming\n    yield tokenizer.decode([nextToken]);\n  }\n}\n\n// Server-Sent Events streaming endpoint\napp.get('/api/chat', async (req, res) => {\n  res.setHeader('Content-Type', 'text/event-stream');\n  res.setHeader('Cache-Control', 'no-cache');\n  res.setHeader('Connection', 'keep-alive');\n  \n  const generator = generateResponse(gpt4, req.body.messages, 2048);\n  for await (const token of generator) {\n    res.write(`data: ${JSON.stringify({ token })}\\n\\n`);\n  }\n  res.write('data: [DONE]\\n\\n');\n  res.end();\n});",
            "commonMistakes": "Not streaming responses (waiting for full generation causes 10+ second latency). Not implementing KV cache (recomputes attention for every token, 10x slower). Not batching requests (single-digit GPU utilization). No safety guardrails (toxic/unsafe outputs reach users). Losing conversation context (no history management).",
            "bestPractices": "Streaming via SSE for real-time token delivery. KV cache for efficient generation (reuse past attention computations). Dynamic batching for GPU efficiency. Context window management (truncate oldest messages when exceeding limit). Safety filters: input (injection prevention) + output (toxicity, bias, factual consistency). Rate limiting per user (token bucket). A/B testing for model updates. Conversation persistence for session continuity.",
            "interviewPerspective": "Designing ChatGPT is a modern ML systems question. Discuss: (1) Prefill + Decode phases: prefill processes input (compute-bound), decode generates tokens (memory-bound). (2) KV cache: stores key-value pairs from attention layers, enables O(1) per-token generation. (3) Batching: dynamic grouping of requests with similar input lengths. (4) Model parallelism: tensor parallelism (within node) + pipeline parallelism (across nodes). (5) Quantization: FP16 or INT8 inference to reduce memory. (6) Content moderation: safety filters at input and output. Stand out: discuss speculative decoding (use a small model to generate draft tokens, large model validates in parallel) for 2-3x latency improvement, and continuous batching (add requests to running batch as others finish).",
            "performanceNotes": "GPT-4 inference: ~500ms first token, ~50ms per subsequent token (with KV cache). GPU: A100 80GB handles ~100 concurrent conversations. Dynamic batching: 50%+ GPU utilization. KV cache per conversation: ~1MB per 1000 tokens. Response time target: <2s first token, <30s total for long responses.",
            "securityNotes": "Content moderation: classifier filters input (prompt injection, harmful requests) and output (toxicity, hate speech, personal information). Rate limiting to prevent abuse. Data privacy: conversations not used for training (opt-out). Prompt injection protection: system prompt isolation, input sanitization. Jailbreak detection: monitor for attempts to bypass safety rules."
          },
          "quiz": [
            {
              "id": "hld-cgpt-1",
              "question": "What is the KV cache in LLM inference and why is it important?",
              "options": [
                "Stores intermediate attention key-value pairs from previous tokens to avoid recomputation, reducing per-token cost from O(n) to O(1)",
                "Cache for storing user conversations",
                "Disk cache for model weights",
                "A cache for token embeddings"
              ],
              "correctIndex": 0,
              "explanation": "Without KV cache, each new token would recompute attention over ALL previous tokens (O(n) per step). With KV cache, we store and reuse key-value pairs from previous steps, making each new token O(1). This is essential for real-time generation.",
              "difficulty": "hard"
            },
            {
              "id": "hld-cgpt-2",
              "question": "Why does ChatGPT stream responses token-by-token instead of sending the full response at once?",
              "options": [
                "To reduce perceived latency - users see tokens appearing in real-time rather than waiting 10-30s for a complete response",
                "To reduce server load",
                "To improve response quality",
                "To save bandwidth"
              ],
              "correctIndex": 0,
              "explanation": "Streaming via Server-Sent Events significantly improves user experience. The first token appears in <2s, and subsequent tokens appear as generated. Without streaming, users wait 10-30 seconds for a complete response, which feels much slower.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design a real-time LLM inference serving system for ChatGPT. How do you achieve low latency with high throughput?",
              "answer": "Core architecture: (1) Request admission: rate limiter, priority queue (paid users > free). (2) Tokenizer service: converts text to token IDs. (3) Inference engine: custom CUDA kernels (FlashAttention) for efficient attention. (4) Model parallelism: tensor parallelism (split attention heads across GPUs within node), pipeline parallelism (split layers across nodes). (5) Continuous batching: scheduler maintains a dynamic batch - new requests added as others finish, maximizing GPU utilization. (6) KV cache management: paged attention (vLLM approach) allocates KV cache in pages, reducing fragmentation and enabling 2x more concurrent users. (7) Quantization: FP16 inference (half the memory, minimal quality loss) or INT8 with calibration for further optimization. (8) Speculative decoding: small model drafts tokens, large model validates in parallel (2-3x speedup). (9) Distributed serving: requests routed to least-loaded GPU node via consistent hashing on user_id (for KV cache locality). (10) Autoscaling: GPU cluster scaled based on queue depth and latency SLO. Monitoring: tokens/sec per GPU, queue wait time, P50/P95/P99 TTFT (time to first token) and TPOT (time per output token).",
              "difficulty": "expert",
              "company": "OpenAI"
            },
            {
              "question": "How would you implement safety guardrails for ChatGPT to prevent harmful outputs?",
              "answer": "Multi-layer safety system: (1) Pre-generation: Input classification (classifier checks for prompt injection, jailbreak attempts, harmful requests). Rate limit repeated abuse attempts. (2) System prompt hardening: explicit instructions to avoid harmful content, role-playing as helpful AI. (3) In-generation: real-time token filtering (block specific harmful outputs before streaming). (4) Post-generation: output classifier scores response for toxicity, bias, factual consistency, personal information leakage. Block or flag high-risk responses. (5) Human review loop: flagged responses reviewed by human moderators. Feedback used to improve classifiers. (6) Adversarial testing: red team continuously probes for vulnerabilities. (7) Evals: automated test suite for safety categories (hate, harassment, self-harm, violence, sexual). (8) Monitoring: dashboards for safety metrics, drift detection (new attack vectors). (9) User reporting: easy in-app reporting of problematic outputs. (10) Policy layer: configurable safety levels per use case (strict for children, relaxed for research). This creates defense-in-depth: multiple independent safety layers, each catching what others miss.",
              "difficulty": "expert",
              "company": "OpenAI"
            }
          ],
          "codingChallenges": []
        }
      ]
    }
  ]
};

import type { SubjectData } from "./types";

export const systemDesignSubject: SubjectData = {
  "slug": "system-design",
  "title": "System Design",
  "description": "Master system design from fundamentals to real-world architectures - scalability, databases, caching, load balancing, messaging, and production systems at Google/Facebook scale",
  "icon": "Network",
  "color": "text-emerald-500",
  "order": 9,
  "topics": [
    {
      "slug": "fundamentals",
      "title": "Fundamentals",
      "description": "Learn the core principles that underpin every distributed system - scalability, reliability, availability, fault tolerance, and consistency models",
      "order": 1,
      "subtopics": [
        {
          "slug": "scalability",
          "title": "Scalability",
          "order": 1,
          "content": {
            "overview": "Scalability is the ability of a system to handle increasing amounts of work by adding resources. A scalable system can grow to accommodate higher loads without degrading performance. There are two primary approaches: vertical scaling (adding more power to a single machine) and horizontal scaling (adding more machines).",
            "problemStatement": "As user bases grow from thousands to millions to billions, systems that worked perfectly at small scale begin to fail. Database connections max out, servers run at 100% CPU, response times skyrocket, and eventually the system crashes. Without designing for scalability from the start, companies face costly re-architecting efforts.",
            "intuitionFirst": "Think of a food truck versus a restaurant chain. The food truck (single server) can serve maybe 50 customers per hour. To serve 10,000 customers, you don't build a bigger food truck - you open 200 locations (horizontal scaling) with a central kitchen (database) and delivery logistics (load balancer).",
            "realLifeAnalogy": "A highway system: a 2-lane road handles 2,000 cars per hour. When traffic grows to 10,000 cars, you don't widen the same road to 10 lanes (vertical scaling is limited). Instead, you build parallel roads, add public transit, and create smart traffic routing (horizontal scaling + load balancing).",
            "howItWorks": "Vertical scaling upgrades CPU, RAM, or storage on existing machines - simple but has hard limits (max CPU cores, max RAM). Horizontal scaling adds commodity machines behind a load balancer. Stateless services scale trivially horizontally. Stateful services (databases) need sharding, replication, or distributed consensus. Key techniques: load balancing, caching, database indexing, read replicas, sharding, async processing with queues, and microservices decomposition.",
            "beginnerExample": "// A non-scalable approach - single server handles all\napp.get('/api/users', async (req, res) => {\n  const users = await db.query('SELECT * FROM users');\n  res.json(users);\n});\n\n// Scalable approach - add caching and pagination\napp.get('/api/users', async (req, res) => {\n  const page = parseInt(req.query.page) || 1;\n  const limit = parseInt(req.query.limit) || 50;\n  const cacheKey = `users:${page}:${limit}`;\n\n  const cached = await redis.get(cacheKey);\n  if (cached) return res.json(JSON.parse(cached));\n\n  const users = await db.query(\n    'SELECT * FROM users LIMIT $1 OFFSET $2',\n    [limit, (page - 1) * limit]\n  );\n  await redis.setex(cacheKey, 60, JSON.stringify(users));\n  res.json(users);\n});",
            "commonMistakes": "Premature optimization before understanding bottlenecks. Scaling vertically without considering horizontal limits. Ignoring database as the bottleneck. Assuming all components scale the same way. Forgetting that state (sessions, WebSocket connections) prevents simple horizontal scaling. Not testing at production scale before launching.",
            "bestPractices": "Design for statelessness wherever possible. Use horizontal scaling as the default. Cache aggressively at multiple layers. Shard databases before they become hot. Use connection pooling. Implement auto-scaling based on metrics. Design for graceful degradation under load. Always benchmark and load-test.",
            "interviewPerspective": "At FAANG, scalability is THE most important design dimension. Interviewers want to see you think in orders of magnitude. Start by asking: 'What scale are we designing for? DAU? QPS? Data size?' Frame every decision in terms of trade-offs. Show you understand the difference between scaling a read-heavy system (caching, CDN, read replicas) vs a write-heavy system (queue, batch processing, NoSQL). Mention specific numbers: 10K QPS needs ~10-20 web servers, 1M QPS needs thousands with aggressive caching. The best answers include back-of-envelope calculations.",
            "performanceNotes": "Vertical scaling: limited by hardware ceiling (max 4TB RAM, 128 CPU cores). Horizontal scaling: near-linear up to thousands of nodes. Amdahl's Law limits parallel speedup from serial portions. A typical web server handles 500-2000 concurrent connections. PostgreSQL handles ~300 concurrent write transactions before degradation.",
            "securityNotes": "Horizontal scaling introduces new attack surface: inter-service communication must be secured, auto-scaling can expose new instances to attacks, distributed systems need mutual TLS, and request routing must prevent IP spoofing.",
            "visualExplanation": "Vertical vs Horizontal Scaling:\n\nVertical:       [ Server ]\n           +--------+--------+\n           |     BIG BOX      |\n           | 128 CPU | 4TB RAM |\n           +------------------+\n           (Limited - max $$$)\n\nHorizontal:     [ Load Balancer ]\n                      |\n     +--------+-------+-------+--------+\n     |        |               |        |\n  [Srv A] [Srv B]       [Srv C] [Srv N]\n     |        |               |        |\n     +--------+-------+-------+--------+\n                      |\n               [ Database Shard ]\n           (Elastic - add more nodes)"
          },
          "quiz": [
            {
              "id": "sd-scale-1",
              "question": "What is the main limitation of vertical scaling?",
              "options": [
                "Hardware has a maximum ceiling (CPU cores, RAM slots)",
                "It costs less than horizontal scaling",
                "It is more complex to implement",
                "It increases network latency"
              ],
              "correctIndex": 0,
              "explanation": "Vertical scaling hits physical hardware limits. You cannot add unlimited CPU cores or RAM to a single machine.",
              "difficulty": "easy"
            },
            {
              "id": "sd-scale-2",
              "question": "Which type of application is easiest to scale horizontally?",
              "options": [
                "Stateless applications",
                "Stateful applications with WebSocket connections",
                "Applications using local file storage",
                "Applications with server-side session state"
              ],
              "correctIndex": 0,
              "explanation": "Stateless applications can be replicated across any number of servers.",
              "difficulty": "medium"
            },
            {
              "id": "sd-scale-3",
              "question": "What is Amdahl's Law in the context of scaling?",
              "options": [
                "The speedup is limited by the serial portion of the workload",
                "Adding more servers linearly increases throughput",
                "Network bandwidth doubles every 18 months",
                "Database queries become faster with more indexes"
              ],
              "correctIndex": 0,
              "explanation": "Amdahl's Law states that the maximum speedup from parallelization is limited by the portion that must be done sequentially.",
              "difficulty": "hard"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design Twitter's timeline. How do you scale the fan-out approach for celebrities with millions of followers?",
              "answer": "Hybrid approach: For regular users, pre-compute timeline and push to followers' feeds (fan-out on write). For celebrities, pull tweets on timeline load (fan-out on read) to avoid the write explosion. Cache celebrity timelines aggressively. Use Redis for tweet ID lists with TTL. Background workers handle fan-out asynchronously.",
              "difficulty": "expert",
              "company": "Twitter"
            },
            {
              "question": "How does a system like Google Search scale to handle billions of queries per day?",
              "answer": "Massive horizontal scaling across thousands of machines. Sharded inverted index distributed across GoogleFS/Colossus. Query broadcast to all shards in parallel, results merged and ranked. Caching at multiple layers. Custom hardware (TPU) for ranking ML models.",
              "difficulty": "expert",
              "company": "Google"
            }
          ],
          "codingChallenges": [
            {
              "title": "Implement a Rate Limiter",
              "description": "Build a sliding window rate limiter that restricts API calls per user to N requests per minute.",
              "difficulty": "hard",
              "starterCode": "interface RateLimiter {\n  isAllowed(userId: string, maxRequests: number, windowMs: number): boolean;\n}\n\nclass SlidingWindowRateLimiter implements RateLimiter {\n  isAllowed(userId: string, maxRequests: number, windowMs: number): boolean {\n    // Your implementation\n  }\n}",
              "solutionHint": "Use a sorted set (Redis ZADD) with timestamp as score. Remove entries outside window. Count remaining entries."
            }
          ]
        },
        {
          "slug": "reliability-availability",
          "title": "Reliability & Availability",
          "order": 2,
          "content": {
            "overview": "Reliability is the probability a system performs its intended function without failure over time. Availability is the proportion of time a system is operational and accessible. While related, they measure different things: a system can be available (running) but unreliable (returning wrong data), or reliable (correct data) but unavailable (down for maintenance).",
            "problemStatement": "Modern users expect 24/7 service availability. A 1-hour outage for a platform like AWS can cost millions of dollars in lost revenue. Achieving high availability requires eliminating single points of failure, designing for redundancy, and planning for inevitable failures.",
            "intuitionFirst": "Think of an airline. Reliability means the plane flies safely to its destination every time. Availability means flights depart on schedule. You could have a perfectly maintained plane (reliable) that only flies once a week (low availability).",
            "realLifeAnalogy": "A restaurant kitchen with two chefs: if one chef calls in sick, the other can still serve food (redundancy = high availability). But if both chefs use the same recipe that sometimes gives food poisoning, the food is available but unreliable.",
            "howItWorks": "Availability is measured in nines: 99.9% (8.7 hrs/year downtime), 99.99% (52 mins/year), 99.999% (5.2 mins/year). Achieved through redundancy (active-active or active-passive), failover mechanisms, health checks, and multi-region deployment.",
            "beginnerExample": "// Monitoring availability with health checks\napp.get('/health', (req, res) => {\n  const dbHealthy = checkDatabaseConnection();\n  const cacheHealthy = checkRedisConnection();\n  if (dbHealthy && cacheHealthy) {\n    res.status(200).json({ status: 'healthy' });\n  } else {\n    res.status(503).json({ status: 'degraded', db: dbHealthy, cache: cacheHealthy });\n  }\n});\n\n// Redundant database connections\nasync function queryWithFailover(sql, params) {\n  try {\n    return await dbPool1.query(sql, params);\n  } catch (err) {\n    return await dbPool2.query(sql, params);\n  }\n}",
            "commonMistakes": "Confusing reliability with availability. Not testing failure modes. Assuming the cloud provider guarantees availability. Ignoring the impact of deployments on uptime.",
            "bestPractices": "Design for failure: assume every component will fail. Use circuit breakers. Implement graceful degradation. Have clear SLIs, SLOs, and SLAs. Run chaos experiments. Automate failover testing.",
            "interviewPerspective": "FAANG interviewers ask about reliability to gauge your understanding of production realities. Discuss: hardware redundancy (RAID, multi-AZ), application patterns (circuit breakers, bulkheads, retries), operational practices (error budgets, on-call). Know typical numbers: 99.9% minimum, 99.99% for critical systems.",
            "performanceNotes": "High availability trades cost for uptime: 3x for active-active-active, 2x for active-passive. Failover time depends on detection + recovery.",
            "securityNotes": "Redundant systems must maintain consistent security posture. Failover servers need same patch levels and firewall rules.",
            "comparisonTable": "| Metric | Formula | 99.9% | 99.99% | 99.999% |\n|--------|---------|-------|--------|--------|\n| Daily | 24h * (1 - avail) | 86.4s | 8.64s | 0.864s |\n| Monthly | 30d * (1 - avail) | 43m 12s | 4m 19s | 25.9s |\n| Yearly | 365d * (1 - avail) | 8h 45m | 52m 34s | 5m 15s |"
          },
          "quiz": [
            {
              "id": "sd-avail-1",
              "question": "What is the max allowed downtime per year for 99.99% availability?",
              "options": [
                "52 minutes",
                "8.7 hours",
                "5.2 minutes",
                "43 minutes"
              ],
              "correctIndex": 0,
              "explanation": "99.99% allows ~52 minutes downtime per year.",
              "difficulty": "easy"
            },
            {
              "id": "sd-avail-2",
              "question": "What is the difference between reliability and availability?",
              "options": [
                "Reliability measures correct operation; availability measures uptime",
                "They are the same",
                "Availability measures correct data; reliability measures uptime",
                "Reliability only applies to hardware"
              ],
              "correctIndex": 0,
              "explanation": "Reliability is about correct results. Availability is about being operational.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design a highly available payment system processing $1B daily.",
              "answer": "Multi-region active-active with global load balancer. CockroachDB/Spanner for ACID. Idempotency keys. Circuit breakers for bank APIs. Chaos engineering. CQRS for read/write paths.",
              "difficulty": "expert",
              "company": "Stripe"
            },
            {
              "question": "Compare active-active vs active-passive failover.",
              "answer": "Active-Active: all serve traffic, full capacity, complex consistency. Best for stateless. Active-Passive: one serves, standby takes over, simple consistency, wasted capacity. Best for databases.",
              "difficulty": "hard",
              "company": "Amazon"
            }
          ],
          "codingChallenges": [
            {
              "title": "Build a Circuit Breaker",
              "description": "Implement circuit breaker tracking failures in a sliding window.",
              "difficulty": "hard",
              "starterCode": "type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';\n\nclass CircuitBreaker {\n  private state: CircuitState = 'CLOSED';\n  private failureCount = 0;\n\n  constructor(private threshold = 5, private timeoutMs = 30000) {}\n\n  async call<T>(fn: () => Promise<T>, fallback: () => Promise<T>): Promise<T> {\n    // Your impl\n  }\n}",
              "solutionHint": "Track failures with timestamps. OPEN -> return fallback. After timeout, HALF_OPEN -> allow probe. Success -> CLOSED, fail -> OPEN again."
            }
          ]
        },
        {
          "slug": "fault-tolerance-consistency",
          "title": "Fault Tolerance & Consistency",
          "order": 3,
          "content": {
            "overview": "Fault tolerance is a system's ability to continue operating despite failures. Consistency ensures all nodes see the same data. These properties often conflict, creating fundamental trade-offs explored by CAP theorem.",
            "problemStatement": "In distributed systems, failures are not exceptions - they are guarantees. Building systems that remain correct and available under failures requires careful decisions about replication, consensus, and consistency models.",
            "intuitionFirst": "A group of friends keeping a shared IOU ledger. If one friend is unreachable, either wait (consistency, unavailable) or record independently and reconcile later (available, temporarily inconsistent).",
            "realLifeAnalogy": "Git version control: developers work offline, make changes, merge later. Conflicts may occur (inconsistency). Git resolves via three-way merge - like optimistic replication with conflict resolution.",
            "howItWorks": "Fault tolerance: redundancy, replication, failover, retry, circuit breakers, bulkheads. Consistency models: strict to eventual. Consensus: Paxos, Raft, Zab. Quorum: R+W > N for strong consistency.",
            "beginnerExample": "// Retry with exponential backoff\nasync function fetchWithRetry(url, maxRetries = 3) {\n  for (let attempt = 1; attempt <= maxRetries; attempt++) {\n    try {\n      const res = await fetch(url);\n      if (res.ok) return res;\n    } catch (err) {\n      if (attempt === maxRetries) throw err;\n      await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 1000));\n    }\n  }\n}\n\n// Consistent hashing\nfunction consistentHash(key, nodes) {\n  let hash = 0;\n  for (let i = 0; i < key.length; i++) {\n    hash = ((hash << 5) - hash) + key.charCodeAt(i);\n    hash |= 0;\n  }\n  return Math.abs(hash) % nodes;\n}",
            "commonMistakes": "Assuming strong consistency is always needed. Building systems intolerant of any data loss. Ignoring the network. Not testing with failures. Over-engineering consistency when idempotency suffices.",
            "bestPractices": "Know your consistency requirements. Use idempotent operations. Implement the outbox pattern. Use distributed tracing. Design for partial failures.",
            "interviewPerspective": "This topic separates senior from junior engineers. Discuss: failure types (crash, omission, byzantine), Raft (leader election, log replication, safety), quorum math, vector clocks, CRDTs. Mention real incidents: GitHub replication lag, Dynamo outage, Spanner TrueTime.",
            "performanceNotes": "Strong consistency: sync replication doubles write latency. Quorum: N=3, W=2, R=2 for strong with 1 node failure tolerance. Raft requires majority.",
            "securityNotes": "Fault tolerance mechanisms can be attack vectors. Retry amplifies DDoS. Circuit breakers can be triggered maliciously. BFT for byzantine adversaries."
          },
          "quiz": [
            {
              "id": "sd-ft-1",
              "question": "Minimum nodes for Raft to tolerate 1 failure?",
              "options": [
                "3",
                "2",
                "4",
                "5"
              ],
              "correctIndex": 0,
              "explanation": "Raft needs majority. With 3 nodes, majority is 2, so you can lose 1.",
              "difficulty": "medium"
            },
            {
              "id": "sd-ft-2",
              "question": "Difference between sync and async replication?",
              "options": [
                "Sync guarantees strong consistency; async may have lag",
                "Async is less durable",
                "Sync needs more nodes",
                "Async never loses data"
              ],
              "correctIndex": 0,
              "explanation": "Sync waits for all replicas. Async returns immediately, risking data loss.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Explain Raft consensus algorithm.",
              "answer": "Raft: leader election (followers -> candidates -> leaders via random timers), log replication (leader accepts requests, replicates, commits on majority), safety (leader never overwrites committed entries). Handles partitions via split-brain prevention.",
              "difficulty": "expert",
              "company": "Google"
            },
            {
              "question": "What are CRDTs and how do they enable conflict-free replication?",
              "answer": "CRDTs are data structures replicated across nodes that converge automatically without coordination. Types: state-based (commutative merge) and operation-based (commuting ops). Examples: G-Counter, OR-Set, LWW-Register. Used by Riak, Redis, Figma, Apple Notes.",
              "difficulty": "expert",
              "company": "Apple"
            }
          ],
          "codingChallenges": [
            {
              "title": "Implement a G-Counter CRDT",
              "description": "Build a grow-only counter replicated across nodes.",
              "difficulty": "hard",
              "starterCode": "class GCounter {\n  private counts = new Map();\n  constructor(private nodeId: string) {}\n  increment(amount = 1): void { /* impl */ }\n  get value(): number { /* sum all */ }\n  merge(other: GCounter): void { /* max per node */ }\n}",
              "solutionHint": "Each node tracks its own count. merge() takes max per node. Commutative, associative, idempotent."
            }
          ]
        }
      ]
    },
    {
      "slug": "cap-theorem",
      "title": "CAP Theorem",
      "description": "Understand the fundamental trade-off in distributed systems - consistency, availability, and partition tolerance cannot all be guaranteed simultaneously",
      "order": 2,
      "subtopics": [
        {
          "slug": "cap-theory",
          "title": "CAP Theory",
          "order": 1,
          "content": {
            "overview": "CAP theorem states a distributed data store cannot simultaneously provide more than two of: Consistency (every read gets the latest write), Availability (every request gets a response), Partition Tolerance (system continues despite network failures).",
            "problemStatement": "Network partitions are inevitable. When a network failure prevents communication between nodes, designers must choose: stop serving to maintain consistency (sacrifice availability) or continue serving with risk of stale reads (sacrifice consistency).",
            "intuitionFirst": "Two friends meeting at a restaurant. If phones are disconnected (partition): (A) wait forever (consistent but not available), (B) go independently, possibly to different restaurants (available but inconsistent).",
            "realLifeAnalogy": "Wikipedia editing: if network to main DB is cut, either show read-only (consistent, no writes) or let users edit locally and merge later (available writes, temporarily inconsistent).",
            "howItWorks": "CP systems (RDBMS with replication) stop writes on partitioned side. AP systems (DynamoDB, Cassandra) let both sides accept writes and reconcile. True CA is impossible in distributed systems (partitions always happen).",
            "beginnerExample": "// CP: MongoDB primary writes, secondary reads\n// During partition, secondary cannot write\n\n// AP: Cassandra - any node accepts writes\n// Later reconciled via timestamps\n\n// Configurable consistency (Cassandra)\n// QUORUM read = strong, ONE = eventual",
            "commonMistakes": "Claiming a DB is absolutely 'CP' or 'AP' - most are configurable. Forgetting CAP only applies during partitions. Confusing CAP consistency with ACID consistency.",
            "bestPractices": "Design for the partition case. Use configurable consistency levels. PACELC extends CAP for normal operation. Monitor partitions and adjust consistency automatically.",
            "interviewPerspective": "CAP is universal in system design interviews. Common mistake: textbook definition without application. Instead: 'CAP tells us during a partition we choose between C and A. For this system I prioritize X because...' Discuss PACELC. Real choices: DynamoDB (AP configurable), Spanner (CP with TrueTime), Cassandra (AP tunable). Connect CAP to concrete trade-offs.",
            "performanceNotes": "Strong consistency needs coordination (Paxos/Raft): 2-3 RTTs. Eventual: near-zero coordination overhead. Read-heavy: AP with read-replicas. Write-heavy: CP with careful sharding.",
            "securityNotes": "During partitions, stale reads might show revoked permissions. AP systems might accept writes from unauthorized nodes. Validate consistency for security-critical ops.",
            "comparisonTable": "| Database | Category | Consistency | Use Case |\n|----------|----------|-------------|----------|\n| PostgreSQL | CP | Strong ACID | Payments |\n| MongoDB | CP config | Strong primary | Catalogs |\n| Cassandra | AP config | Tunable | Time-series |\n| DynamoDB | AP config | Eventual | Sessions |\n| Spanner | CP | External consistency | Global financial |\n| Redis | CP (single) | Strong | Caching |"
          },
          "quiz": [
            {
              "id": "sd-cap-1",
              "question": "What two guarantees must you choose between during a network partition?",
              "options": [
                "Consistency and Availability",
                "Partition Tolerance and Consistency",
                "Partition Tolerance and Availability",
                "All three maintained"
              ],
              "correctIndex": 0,
              "explanation": "During a network partition, you must choose between Consistency (all nodes see same data) and Availability (all requests get responses).",
              "difficulty": "easy"
            },
            {
              "id": "sd-cap-2",
              "question": "What does PACELC add beyond CAP?",
              "options": [
                "Trade-offs when running normally (Else)",
                "Replaces CAP",
                "Adds Durability",
                "Only applies to RDBMS"
              ],
              "correctIndex": 0,
              "explanation": "PACELC: Partition -> choose A or C. Else (normal) -> choose Latency or Consistency.",
              "difficulty": "hard"
            },
            {
              "id": "sd-cap-3",
              "question": "Why is CA impossible in practice?",
              "options": [
                "Network partitions are inevitable",
                "CA databases would be too slow",
                "Consistency and Availability cannot coexist",
                "CAP is purely theoretical"
              ],
              "correctIndex": 0,
              "explanation": "Partitions will happen. True CA would need to stop all nodes during a partition, contradicting availability.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "How does Google Spanner achieve strong consistency and high availability despite CAP?",
              "answer": "Spanner uses TrueTime (GPS + atomic clocks) for bounded clock uncertainty. Provides external consistency without the usual CAP trade-off. Uses Paxos for replication, 2PC across shards. During partitions, prefers consistency (CP). TrueTime enables knowing definitively 'what happened before what' globally.",
              "difficulty": "expert",
              "company": "Google"
            },
            {
              "question": "Design a global payment system. Handle CAP trade-offs for cross-region transactions.",
              "answer": "Partition by region (CP islands). Spanner/CockroachDB for multi-region ACID. Idempotency keys. 2PC for cross-region transfers. Read replicas for non-critical data. During partition: deny cross-region, allow same-region. Replay pending transactions from WAL after partition heals.",
              "difficulty": "expert",
              "company": "Stripe"
            }
          ],
          "codingChallenges": [
            {
              "title": "Distributed KV Store with Configurable Consistency",
              "description": "Build a key-value store with ONE, QUORUM, ALL consistency levels. Simulate partitions.",
              "difficulty": "hard",
              "starterCode": "type ConsistencyLevel = 'ONE' | 'QUORUM' | 'ALL';\n\nclass DistributedKVStore {\n  private nodes: any[] = [];\n  async write(key: string, value: string, consistency: ConsistencyLevel): Promise<boolean> { /* impl */ }\n  async read(key: string, consistency: ConsistencyLevel): Promise<string | null> { /* impl */ }\n}",
              "solutionHint": "Hash key to find primary node, replicate to successors. QUORUM = N/2+1 acks. On read, query QUORUM, compare versions. Track failed nodes."
            }
          ]
        }
      ]
    },
    {
      "slug": "databases",
      "title": "Databases",
      "description": "Deep dive into SQL vs NoSQL, sharding strategies, replication methods, and choosing the right database for your use case",
      "order": 3,
      "subtopics": [
        {
          "slug": "sql-vs-nosql",
          "title": "SQL vs NoSQL",
          "order": 1,
          "content": {
            "overview": "SQL databases (PostgreSQL, MySQL) use structured schemas with ACID transactions and relational joins. NoSQL databases (MongoDB, Cassandra, DynamoDB) sacrifice these for scalability and flexibility. The choice depends on your access patterns.",
            "problemStatement": "Using PostgreSQL for write-heavy social media feeds will fail. Using MongoDB for financial ledgers needing ACID will fail. Choosing wrong means costly migrations.",
            "intuitionFirst": "SQL is a well-organized library with strict cataloging rules. NoSQL is your garage - you can throw anything in quickly but finding items later takes more work.",
            "realLifeAnalogy": "SQL: bank ledger with exact fields, complex queries, consistency paramount. NoSQL: social media feed with varied structures, massive scale, consistency less critical than speed.",
            "howItWorks": "SQL: predefined schemas, JOINs, ACID, query optimizers. NoSQL: Document (MongoDB), Key-Value (Redis), Column-Family (Cassandra), Graph (Neo4j). Each excels at different access patterns.",
            "beginnerExample": "-- SQL: structured schema with relations\nCREATE TABLE users (id UUID PRIMARY KEY, name VARCHAR(100) NOT NULL);\nCREATE TABLE orders (id UUID PRIMARY KEY, user_id UUID REFERENCES users(id));\nSELECT u.name, COUNT(o.id) FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.name;\n\n// MongoDB: embedded documents\n{\n  _id: ObjectId(),\n  name: \"Alice\",\n  orders: [{ id: 1, total: 29.99 }]\n}",
            "commonMistakes": "Using SQL for simple key-value lookups (overkill). Using NoSQL when you need joins and transactions. Not considering operational complexity. Assuming 'NoSQL means no schema'.",
            "bestPractices": "Start with PostgreSQL for most applications. Use NoSQL for specific needs (massive writes, flexible schema). Polyglot persistence: right DB for each component.",
            "interviewPerspective": "FAANG wants DB choice driven by access patterns, not hype. Frame: 'For this feature, access pattern is X requiring Y ops/sec with Z latency. Therefore I choose...' Mention trade-offs explicitly. Know numbers: PostgreSQL ~10K writes/sec, Cassandra ~100K writes/sec. Demonstrate Polyglot Persistence.",
            "performanceNotes": "PostgreSQL: ~10K writes/sec, ~100K reads/sec. MongoDB: ~20K writes/sec. Cassandra: ~100K writes/sec, near-linear scaling. DynamoDB: auto-scaling, single-digit ms latency.",
            "securityNotes": "SQL injection (use parameterized queries). NoSQL injection (MongoDB $where). Both need encryption at rest/in-transit, proper authentication, least privilege.",
            "comparisonTable": "| Feature | SQL (PostgreSQL) | NoSQL (MongoDB) | NoSQL (Cassandra) |\n|---------|-----------------|-----------------|-------------------|\n| Schema | Fixed, enforced | Flexible | Flexible (CQL) |\n| ACID | Full ACID | Multi-doc ACID (v4+) | None (eventual) |\n| Joins | Native | $lookup (slower) | Denormalize |\n| Scaling | Vertical + replicas | Sharding | Horizontal (linear) |\n| Write throughput | ~10K/s/node | ~20K/s/node | ~100K/s/node |\n| Use case | Financial, ERP | Catalogs, CMS | Time-series, IoT |"
          },
          "quiz": [
            {
              "id": "sd-db-1",
              "question": "When would you choose NoSQL over SQL?",
              "options": [
                "Massive write throughput and horizontal scaling",
                "Complex joins and transactions",
                "Data integrity is highest priority",
                "Standard SQL querying"
              ],
              "correctIndex": 0,
              "explanation": "NoSQL excels at horizontal scaling for write-heavy workloads, sacrificing joins and ACID.",
              "difficulty": "easy"
            },
            {
              "id": "sd-db-2",
              "question": "What is polyglot persistence?",
              "options": [
                "Using multiple database types for different use cases within one app",
                "Using only one DB type",
                "Migrating between databases",
                "Using a multi-query-language DB"
              ],
              "correctIndex": 0,
              "explanation": "Using different DB technologies for different components based on requirements.",
              "difficulty": "medium"
            },
            {
              "id": "sd-db-3",
              "question": "Main performance limitation of SQL at scale?",
              "options": [
                "Write bottleneck from ACID and index maintenance",
                "Read query slowness",
                "Network latency",
                "Storage limits"
              ],
              "correctIndex": 0,
              "explanation": "SQL maintains indexes, enforces constraints, and provides ACID - all adding write overhead.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design Twitter's database. What DB for tweets, users, timeline, search?",
              "answer": "Polyglot: (1) Users: PostgreSQL (complex queries). (2) Tweets: Cassandra (high write throughput). (3) Timeline: Redis sorted sets. (4) Search: Elasticsearch inverted index. (5) Media: S3 + CDN. (6) Relationships: Neo4j or PostgreSQL adjacency list.",
              "difficulty": "expert",
              "company": "Twitter"
            },
            {
              "question": "Compare DynamoDB vs Cassandra. When would you choose each?",
              "answer": "Both: AP systems, key-value + columnar, automatic sharding, gossip protocol. DynamoDB: fully managed, auto-scaling, AWS integration. Cassandra: more control (compaction, repair), multi-cloud, lower costs at massive scale. Choose DynamoDB for serverless, Cassandra for multi-cloud or on-prem.",
              "difficulty": "expert",
              "company": "Amazon"
            }
          ],
          "codingChallenges": [
            {
              "title": "Data Migration Script SQL to NoSQL",
              "description": "Migrate user data from SQL to MongoDB. Handle schema transformation and error recovery.",
              "difficulty": "hard",
              "starterCode": "async function migrateUsers(sqlDb, mongoDb, batchSize = 1000) {\n  // Your implementation with checkpointing\n}",
              "solutionHint": "Process in batches with checkpoint. Transform SQL rows to MongoDB documents (embed fields). Validate before insert. Bulk operations. Transaction per batch. Upsert for duplicates."
            }
          ]
        },
        {
          "slug": "sharding-replication",
          "title": "Sharding & Replication",
          "order": 2,
          "content": {
            "overview": "Sharding distributes data across multiple database instances horizontally. Replication copies data across nodes for redundancy and read scaling. Together they form the foundation of scalable database architectures.",
            "problemStatement": "A single DB server handles ~10K writes/sec. Modern apps like Uber need 100K+ updates/sec. The DB must be split across many servers (sharding) while maintaining data integrity and availability (replication).",
            "intuitionFirst": "A single librarian shelves 10 books/min. To handle 1000 books/min, split the library into 100 sections (shards) by genre. To handle sickness, each section has an assistant (replica).",
            "realLifeAnalogy": "Phone book split alphabetically: A-F, G-M, N-R, S-Z. Each shard is independent. If A-F is lost, others still work. Multiple copies of each book (read replicas) for faster lookups.",
            "howItWorks": "Sharding: range-based, hash-based (consistent hashing), directory-based. Replication: leader-follower (async), multi-leader, quorum-based (W+R > N). Consistent hashing with virtual nodes minimizes resharding disruption.",
            "beginnerExample": "// Hash-based sharding\nfunction getShard(key, totalShards) {\n  let hash = 0;\n  for (let i = 0; i < key.length; i++) {\n    hash = ((hash << 5) - hash) + key.charCodeAt(i);\n    hash |= 0;\n  }\n  return Math.abs(hash) % totalShards;\n}\n\n// Consistent hashing with virtual nodes\nclass ConsistentHash {\n  private ring: number[] = [];\n  addNode(nodeId: string) {\n    for (let i = 0; i < 100; i++) {\n      const hash = this.hash(`${nodeId}:${i}`);\n      this.ring.push(hash);\n    }\n    this.ring.sort((a, b) => a - b);\n  }\n  getNode(key: string): string { /* binary search ring */ }\n}",
            "commonMistakes": "Bad shard key creating hot spots. Not planning resharding. Assuming replication solves all availability (async replication can lose data). Making shard key immutable. Ignoring cross-shard query complexity.",
            "bestPractices": "Choose evenly-distributed shard keys (UUIDs). Use consistent hashing. Monitor shard balance. Set up replication with health checks and automated failover. For read-heavy: read replicas. For write-heavy: shard first.",
            "interviewPerspective": "Sharding is critical. Key points: (1) Why shard? Write throughput exceeds single node. (2) Shard key selection is THE most important decision. (3) Resharding is hard: consistent hashing minimizes disruption. (4) Cross-shard ops are expensive. (5) Sync vs async replication trade-offs. Top candidates discuss scatter-gather patterns and shard rebalancing. Mention Vitess (YouTube/Slack).",
            "performanceNotes": "10 shards = ~10x write throughput. Read replicas: 5 replicas = ~5x read throughput. Cross-shard latency = slowest shard. Hot spotting nullifies sharding benefits.",
            "securityNotes": "Sharding adds access control complexity. Replication must respect data residency (GDPR). Encrypt at rest per shard. Centralized audit logging across shards."
          },
          "quiz": [
            {
              "id": "sd-shard-1",
              "question": "Main benefit of consistent hashing over modulo sharding?",
              "options": [
                "Minimizes data movement when nodes added/removed",
                "Computationally faster",
                "Better security",
                "Eliminates virtual nodes"
              ],
              "correctIndex": 0,
              "explanation": "Consistent hashing remaps only K/N keys when nodes change. Modulo remaps almost all keys.",
              "difficulty": "medium"
            },
            {
              "id": "sd-shard-2",
              "question": "What is a hot spot and how to mitigate?",
              "options": [
                "Shard receiving disproportionate traffic; better shard key or splitting the hot shard",
                "Shard with most storage; add more disks",
                "Shard that fails often; replication",
                "Shard with oldest data; archiving"
              ],
              "correctIndex": 0,
              "explanation": "Hot spots from uneven distribution. Mitigate with granular shard keys, compound keys, or further splitting.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "How does Instagram shard its database?",
              "answer": "PostgreSQL with custom sharding layer by user ID range. Each shard holds a subset of users. User data kept on same shard to avoid cross-shard queries. Lookup table mapping user_id to shard. Later migrated to custom distributed DB. Key: keep user data together, avoid cross-shard ops, plan resharding early.",
              "difficulty": "hard",
              "company": "Meta"
            },
            {
              "question": "Design multi-tenant SaaS DB architecture.",
              "answer": "Three models: (1) Shared DB with tenant_id column (simple, poor isolation). (2) Shared DB, separate schema per tenant (better isolation). (3) DB-per-tenant (best isolation, highest cost). Hybrid: pool small tenants in shared DBs, dedicated for large tenants. Use connection pooling and schema-based routing.",
              "difficulty": "hard",
              "company": "Salesforce"
            }
          ],
          "codingChallenges": [
            {
              "title": "Consistent Hashing with Virtual Nodes",
              "description": "Build a consistent hash ring that distributes keys across nodes. Support add/remove.",
              "difficulty": "hard",
              "starterCode": "class ConsistentHashRing {\n  private ring: Array<{hash: number; node: string}> = [];\n  addNode(nodeId: string): void { /* impl */ }\n  removeNode(nodeId: string): void { /* impl */ }\n  getNode(key: string): string { /* impl */ }\n}",
              "solutionHint": "Create N virtual nodes per physical node. Hash each identifier. Sort ring. Binary search for key hash. Only affected virtual nodes move on changes."
            }
          ]
        }
      ]
    },
    {
      "slug": "caching",
      "title": "Caching",
      "description": "Master caching strategies with Redis and Memcached - from cache-aside to write-through, invalidation patterns, and distributed caching at scale",
      "order": 4,
      "subtopics": [
        {
          "slug": "caching-strategies",
          "title": "Caching Strategies",
          "order": 1,
          "content": {
            "overview": "Caching stores frequently accessed data in a high-speed storage layer to reduce latency and DB load. Cache hit ratios of 90-99% can dramatically reduce infrastructure costs and improve user experience.",
            "problemStatement": "A 100ms slowdown at Amazon causes a 1% revenue drop. Raw DB queries are too slow for user-facing features. The naive approach (load from DB on every request) collapses under load.",
            "intuitionFirst": "Your phone keeps contacts in memory (cache) because reading from SIM (DB) every time would be slow. You update contact, save to SIM, and update in-memory copy. Same pattern in web apps.",
            "realLifeAnalogy": "Coffee shop keeps 10 popular drinks pre-made (cache). Order one = instant (hit). Less popular = made fresh (miss). They refresh selection regularly (TTL-based invalidation).",
            "howItWorks": "Patterns: Cache-Aside (app checks cache, loads from DB on miss), Read-Through, Write-Through, Write-Behind, Write-Around. Eviction: LRU, LFU, FIFO, TTL. Distributed caching uses consistent hashing.",
            "beginnerExample": "// Cache-aside with Redis\nclass UserService {\n  async getUser(id: string) {\n    const cached = await redis.get(`user:${id}`);\n    if (cached) return JSON.parse(cached);\n\n    const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);\n    if (!user) return null;\n\n    await redis.setex(`user:${id}`, 3600, JSON.stringify(user));\n    return user;\n  }\n\n  async updateUser(id: string, data: any) {\n    const user = await db.query('UPDATE users SET ... WHERE id = $1 RETURNING *', [id, data]);\n    await redis.del(`user:${id}`); // Invalidate\n    return user;\n  }\n}",
            "commonMistakes": "Caching everything without considering benefits. Not setting TTLs. Cache stampede (thousands hit DB simultaneously on cache miss). Caching user-specific data globally (security leak). Not monitoring hit ratio.",
            "bestPractices": "Cache aggressive for read-heavy, write-rare data. Set appropriate TTLs. Implement stampede protection (mutex locks, stale-while-revalidate). Monitor hit ratio (target >90%). Use Redis for complex structures, Memcached for simple KV. Progressive caching (CDN -> app -> DB).",
            "interviewPerspective": "Cache is high-leverage in every design interview. Evaluate: WHERE to cache (browser, CDN, API gateway, app, DB query cache). WHAT to cache (hot data, expensive computations). CACHE SIZE calculation. CONSISTENCY model. INVALIDATION strategy. Best candidates discuss stampede solutions, local vs distributed cache, optimal TTL calculation.",
            "performanceNotes": "Redis: single-threaded, ~100K ops/sec, sub-ms latency. Memcached: multi-threaded, ~200K ops/sec. Hit ratio: 95%+ achievable. Cache size: 5% of DB often achieves 90%+.",
            "securityNotes": "Never cache PII, passwords, or financial data without encryption. Redis AOF can be encrypted. Cache keys must not leak business logic. Tenant isolation in multi-tenant systems.",
            "comparisonTable": "| Feature | Redis | Memcached |\n|---------|-------|-----------|\n| Data types | Strings, Lists, Sets, Sorted Sets, Hashes, Streams | Only strings |\n| Persistence | RDB snapshots, AOF logs | None (in-memory) |\n| Threading | Single-threaded | Multi-threaded |\n| Replication | Leader-follower, Cluster | No native replication |\n| Pub/Sub | Full support | Not supported |\n| Operations/sec | ~100K | ~200K |\n| Use case | Complex data, persistence | Simple KV, max throughput |"
          },
          "quiz": [
            {
              "id": "sd-cache-1",
              "question": "What is a cache stampede and how to prevent it?",
              "options": [
                "Many requests miss cache simultaneously for the same key, overwhelming DB. Use mutex locks or stale-while-revalidate.",
                "Cache memory full causing evictions. Use LRU.",
                "Cache server crashes. Use replication.",
                "Cache inconsistent with DB. Use write-through."
              ],
              "correctIndex": 0,
              "explanation": "Cache stampede: popular key expires, all concurrent requests hit DB. Prevention: mutex lock so only one request populates cache, or serve stale while refreshing async.",
              "difficulty": "hard"
            },
            {
              "id": "sd-cache-2",
              "question": "Difference between cache-aside and read-through?",
              "options": [
                "Cache-aside: app manages cache. Read-through: cache layer auto-loads from DB on miss.",
                "Cache-aside is faster.",
                "Read-through needs less memory.",
                "They're the same."
              ],
              "correctIndex": 0,
              "explanation": "Cache-aside: app checks cache, on miss loads from DB and writes to cache. Read-through: caching layer transparently fetches from DB.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design Facebook's news feed cache for billions of users.",
              "answer": "Multi-layered: (1) Pre-computed feed in Redis sorted set per user (fan-out on write). (2) CDN for anonymous users. (3) Memcached for individual post objects. (4) Edge caching for images/video. Celebrities: fan-out on read. Warm cache for active users, evict inactive. Stale-while-revalidate. Cache keys: `feed:{userId}:{page}` with 30-60s TTL.",
              "difficulty": "expert",
              "company": "Meta"
            },
            {
              "question": "Local cache vs distributed cache (Redis). When to use each?",
              "answer": "Local: in-process memory, fastest (<0.1ms), no network, limited memory, duplication across instances, complex invalidation. Distributed: shared across instances, larger capacity, centralized eviction, ~1ms network latency. Use local for: static config, feature flags, extremely hot data. Use distributed for: session data, user-specific data, consistent data across instances. Hybrid L1+L2: check local first, then distributed, then DB.",
              "difficulty": "hard",
              "company": "Microsoft"
            }
          ],
          "codingChallenges": [
            {
              "title": "Implement an LRU Cache",
              "description": "Build LRU cache with O(1) get and put operations.",
              "difficulty": "hard",
              "starterCode": "class LRUCache<K, V> {\n  private capacity: number;\n  private cache: Map<K, V>;\n  constructor(capacity: number) { /* init */ }\n  get(key: K): V | undefined { /* impl */ }\n  put(key: K, value: V): void { /* impl */ }\n}",
              "solutionHint": "Use JavaScript Map (maintains insertion order). get(): delete and re-set to move to end. put(): if at capacity, delete oldest (Map.keys().next().value)."
            }
          ]
        }
      ]
    },
    {
      "slug": "load-balancing",
      "title": "Load Balancing",
      "description": "Understand load balancing algorithms from round-robin to least connections, and how they distribute traffic across server pools",
      "order": 5,
      "subtopics": [
        {
          "slug": "load-balancing-algorithms",
          "title": "Load Balancing Algorithms",
          "order": 1,
          "content": {
            "overview": "Load balancers distribute traffic across backend servers, prevent bottlenecks, provide fault tolerance, and enable horizontal scaling. From round-robin to least-connections, the algorithm choice significantly impacts performance.",
            "problemStatement": "Without a load balancer, clients need to know individual server IPs, scaling requires updating every client, and a single server failure takes everything down.",
            "intuitionFirst": "A restaurant host picks the least busy waiter. If a waiter is out sick, skip them. If full, redirect to bar. If more popular, hire more waiters and add to rotation.",
            "realLifeAnalogy": "Airport check-in: passengers arrive at central queue, dispatcher sends to shortest line. If counter closes, passengers redirected. This is Least Connections - optimal for variable service times.",
            "howItWorks": "Layer 4 (IP+TCP): faster but less intelligent. Layer 7 (HTTP): content-aware routing. Algorithms: Round Robin, Least Connections, Weighted, IP Hash, Random. Health checks detect and remove unhealthy servers. Connection draining for graceful removal.",
            "beginnerExample": "// Round robin\nclass RoundRobinLB {\n  private servers: string[];\n  private current = 0;\n  getNextServer() {\n    const s = this.servers[this.current];\n    this.current = (this.current + 1) % this.servers.length;\n    return s;\n  }\n}\n\n// Least connections\nclass LeastConnectionsLB {\n  private connections = new Map<string, number>();\n  getNextServer() {\n    let min = Infinity, selected = '';\n    for (const [server, count] of this.connections) {\n      if (count < min) { min = count; selected = server; }\n    }\n    this.connections.set(selected, min + 1);\n    return selected;\n  }\n}",
            "commonMistakes": "Round-robin with variable request times (causes imbalance). No connection draining (failed requests during deployment). Infrequent health checks (slow failure detection). Sticky sessions creating uneven load.",
            "bestPractices": "Least-connections for variable request times. Layer 7 for microservices path-based routing. Health checks every 5-10s. Connection draining 30-60s. Consistent hashing for cache affinity. Monitor latency per server.",
            "interviewPerspective": "Expect LB knowledge in every design interview. Discuss: (1) Which layer? L4 (faster) vs L7 (smarter). (2) Algorithm depends on workload. (3) Health checks. (4) Session persistence. (5) Advanced: consistent hashing, circuit breakers, rate limiting, GSLB for multi-region. Stand out: Netflix Zone-Aware LB (prefer same-AZ).",
            "performanceNotes": "L4: ~10M+ packets/sec. L7: ~100K-500K req/sec. HAProxy: 2M req/s. NGINX: ~500K concurrent. Latency: L4 ~0.1ms, L7 ~0.5-2ms.",
            "securityNotes": "Terminate TLS at LB (SSL offloading). DDoS protection (rate limiting, WAF). Hide backend IPs. mTLS for backend communication. IP blacklisting at LB level.",
            "comparisonTable": "| Algorithm | Best For | Drawback |\n|-----------|----------|----------|\n| Round Robin | Identical servers, uniform time | Unbalanced with variable processing |\n| Least Connections | Variable processing time | Metric may be stale |\n| Weighted | Heterogeneous servers | Needs capacity knowledge |\n| IP Hash | Session persistence | Uneven with small client pools |\n| Consistent Hash | Cache affinity | Complex implementation |"
          },
          "quiz": [
            {
              "id": "sd-lb-1",
              "question": "Difference between Layer 4 and Layer 7 LB?",
              "options": [
                "L4 routes on IP/TCP; L7 inspects HTTP headers and content",
                "L7 is faster",
                "L4 supports TLS termination; L7 does not",
                "L7 only works with UDP"
              ],
              "correctIndex": 0,
              "explanation": "Layer 4 routes on IP and TCP ports (faster). Layer 7 inspects HTTP headers, making content-aware decisions.",
              "difficulty": "easy"
            },
            {
              "id": "sd-lb-2",
              "question": "When to choose least-connections over round-robin?",
              "options": [
                "When request processing times vary significantly",
                "When all servers have identical capacity",
                "When needing simplest algorithm",
                "When health checks aren't needed"
              ],
              "correctIndex": 0,
              "explanation": "Round-robin distributes evenly by count but ignores processing time. Least-connections sends to the server with fewest active connections.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "How does Netflix use load balancing across AWS regions and AZs?",
              "answer": "Multi-layered: (1) DNS-based GSLB: geo-routes to nearest region. (2) ELB/ALB: distributes across AZs. (3) Eureka + Ribbon: client-side LB within service cluster. Zone-Aware: prefer same-AZ to reduce latency/cost. Adaptive: uses metrics to avoid unhealthy nodes. During regional failures, DNS routes to healthy regions.",
              "difficulty": "expert",
              "company": "Netflix"
            },
            {
              "question": "Design global LB for real-time multiplayer game minimizing latency.",
              "answer": "Latency-based DNS routing via anycast IP (Cloudflare). Each edge runs session orchestrator assigning player to optimal game server. Player speed test to multiple regions -> lowest latency. WebSocket persistent. Region-local Redis pub/sub. Cross-region play via relay servers. Consistent hashing on game session ID.",
              "difficulty": "expert",
              "company": "Riot Games"
            }
          ],
          "codingChallenges": [
            {
              "title": "Weighted Round-Robin Load Balancer",
              "description": "Build LB where each server has a weight based on capacity.",
              "difficulty": "hard",
              "starterCode": "interface Server { host: string; weight: number; }\nclass WeightedRoundRobin {\n  private servers: Server[];\n  getNext(): string { /* impl */ }\n}",
              "solutionHint": "Use smooth weighted round-robin (nginx algorithm). Maintain gcd of all weights. Pick server exceeding currentWeight. Subtract gcd from selected, add to current."
            }
          ]
        }
      ]
    },
    {
      "slug": "messaging",
      "title": "Messaging",
      "description": "Explore message queuing systems - Kafka, RabbitMQ, SQS - and how they enable decoupled, scalable, fault-tolerant architectures",
      "order": 6,
      "subtopics": [
        {
          "slug": "message-queues",
          "title": "Message Queues",
          "order": 1,
          "content": {
            "overview": "Message queues enable asynchronous communication between distributed components. From simple task queues to event streaming platforms, they are the backbone of modern distributed architectures - decoupling, buffering, and providing resilience.",
            "problemStatement": "In a monolithic checkout system, if the email service is down, the entire order fails. If traffic spikes 10x during Black Friday, the system collapses. Message queues break this coupling.",
            "intuitionFirst": "Your email inbox: you send emails when you want (producer). Recipient reads when they have time (consumer). If asleep, email waits in inbox (queue). You don't wait for them to wake up.",
            "realLifeAnalogy": "Restaurant order tickets. Waiters place orders on a spindle (queue). Chefs pick them when ready. If one chef steps out, orders accumulate but don't get lost. Multiple chefs work concurrently.",
            "howItWorks": "Components: Producer (creates messages), Broker (stores/routes), Consumer (processes). Delivery: At-most-once, At-least-once, Exactly-once. Models: Point-to-point (competing consumers), Pub-Sub (fan-out). Patterns: Dead letter queues, Priority queues, Delayed queues.",
            "beginnerExample": "// Kafka producer\nawait kafkaProducer.send({\n  topic: 'order-created',\n  messages: [{ key: '123', value: JSON.stringify(order) }],\n});\n\n// Kafka consumer\nawait kafkaConsumer.subscribe({ topic: 'order-created' });\nawait kafkaConsumer.run({\n  eachMessage: async ({ message }) => {\n    const order = JSON.parse(message.value!.toString());\n    await processOrder(order);\n  },\n});\n\n// RabbitMQ\nawait channel.assertQueue('orders', { durable: true });\nawait channel.sendToQueue('orders', Buffer.from(JSON.stringify(order)), { persistent: true });",
            "commonMistakes": "Not handling duplicate messages (consumers must be idempotent). Using MQ for synchronous request-reply. Assuming message order (partition keys control ordering). No dead letter queues. Ignoring backpressure from faster producers.",
            "bestPractices": "Idempotent consumers. Set message TTL. Use dead letter queues for failures. Monitor consumer lag. Design for backpressure. Choose right delivery semantics: at-least-once for most, exactly-once for financial, at-most-once for logging.",
            "interviewPerspective": "MQs appear in almost every design interview. Discuss: (1) WHY async? Decoupling, buffering, resilience. (2) WHICH? Kafka for event streaming, RabbitMQ for reliable queues, SQS for managed. (3) Delivery semantics. (4) Ordering via partition keys. (5) Outbox pattern for reliable publishing. Stand out: Kafka exactly-once semantics + idempotent producers.",
            "performanceNotes": "Kafka: millions of msgs/sec, ~10ms latency. RabbitMQ: ~50K/sec, sub-ms latency. Kafka optimized for throughput, RabbitMQ for low-latency routing.",
            "securityNotes": "Encrypt at rest (Kafka TLS + encrypted logs). Authenticate producers/consumers (SASL/SCRAM, mTLS). Authorize topic access (ACLs). Avoid sensitive data in payloads (use reference IDs).",
            "comparisonTable": "| Feature | Kafka | RabbitMQ | SQS |\n|---------|-------|----------|-----|\n| Model | Distributed log | Message broker | Managed queue |\n| Throughput | Millions/sec | ~50K/sec | Unlimited |\n| Latency | ~10ms | Sub-ms | Variable |\n| Persistence | Disk (log) | Memory or disk | Cloud-managed |\n| Ordering | Per partition | Per queue | FIFO option |\n| Use case | Event streaming | Task queues | Serverless |"
          },
          "quiz": [
            {
              "id": "sd-mq-1",
              "question": "Difference between at-least-once and exactly-once?",
              "options": [
                "At-least-once may deliver duplicates; exactly-once guarantees no duplicates via idempotent consumers and transactional brokers",
                "At-least-once is more reliable",
                "Exactly-once is default",
                "At-least-once guarantees no duplicates"
              ],
              "correctIndex": 0,
              "explanation": "At-least-once may duplicate if consumer fails after processing but before ack. Exactly-once requires broker dedup + consumer idempotency.",
              "difficulty": "medium"
            },
            {
              "id": "sd-mq-2",
              "question": "When choose RabbitMQ over Kafka?",
              "options": [
                "Complex routing, priority queues, low-latency task processing",
                "Millions of messages/sec",
                "Persistent storage for replay",
                "Exactly-once semantics"
              ],
              "correctIndex": 0,
              "explanation": "RabbitMQ excels at complex routing, priority queues, delayed messages, sub-ms latency. Kafka excels at high-throughput event streaming and replay.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design Uber's real-time ride matching system.",
              "answer": "High-throughput event-driven: (1) Ride request to Kafka partitioned by geo-hash. (2) Driver location stream to driver-locations topic. (3) Matching service maintains in-memory spatial index (geohash grid). (4) On request, query index + adjacent cells for nearest driver. (5) Match published to ride-matches topic. (6) Push notification to driver (accept within 10s). (7) No driver -> wait queue with delayed retry. Kafka partitioning by geo-hash ensures region-local processing.",
              "difficulty": "expert",
              "company": "Uber"
            },
            {
              "question": "Explain the outbox pattern for reliable message publishing.",
              "answer": "Solves dual-write problem (DB + message). Write to business table AND outbox in same transaction. Separate process reads outbox and publishes to broker. After successful publish, mark processed. Kafka Connect Debezium uses CDC (change data capture) to tail transaction log, avoiding polling.",
              "difficulty": "expert",
              "company": "Amazon"
            }
          ],
          "codingChallenges": [
            {
              "title": "In-Memory Message Queue",
              "description": "Implement pub/sub message queue with at-least-once delivery and consumer groups.",
              "difficulty": "hard",
              "starterCode": "class MessageQueue {\n  private topics = new Map();\n  private offsets = new Map();\n  publish(topic: string, data: any): void { /* impl */ }\n  subscribe(topic: string, consumerId: string, handler: Function): void { /* impl */ }\n}",
              "solutionHint": "Store messages in a list per topic. Each consumer has offset pointer. Move offset only after handler succeeds. Support competing consumer pattern."
            }
          ]
        }
      ]
    },
    {
      "slug": "storage",
      "title": "Storage",
      "description": "Understand blob storage, CDNs, and how to store and serve massive amounts of binary data efficiently",
      "order": 7,
      "subtopics": [
        {
          "slug": "blob-storage-cdn",
          "title": "Blob Storage & CDN",
          "order": 1,
          "content": {
            "overview": "Blob storage systems (S3, GCS, Azure Blob) provide scalable, durable object storage for unstructured data. CDNs cache content at edge locations worldwide for low-latency delivery. Together they serve images, videos, and documents at global scale.",
            "problemStatement": "Storing and serving videos on one server is impossible at YouTube scale (500+ hours/minute). Files need durable, redundant storage across regions, served from the closest location to users.",
            "intuitionFirst": "Amazon fulfillment centers (blob storage). Products stored in massive warehouses nationwide. When you order, it ships from nearest warehouse (CDN edge). You get it quickly because it's nearby.",
            "realLifeAnalogy": "Netflix Open Connect: movies stored on custom servers inside ISP data centers. When you press play, it streams from within your ISP's network, not from Netflix's central datacenter.",
            "howItWorks": "Blob storage: objects in flat namespaces (buckets), RESTful HTTP API, 11 nines durability via multi-AZ replication. CDN: edge servers worldwide, Anycast DNS routing to nearest edge. Cache hit (<50ms), miss (fetch from origin).",
            "beginnerExample": "// S3 upload\nconst s3 = new S3Client({ region: 'us-east-1' });\nawait s3.send(new PutObjectCommand({\n  Bucket: 'my-app-uploads',\n  Key: key,\n  Body: buffer,\n  ContentType: 'image/jpeg',\n  CacheControl: 'public, max-age=31536000',\n}));\n\n// CDN (CloudFront) caches at edge locations\n// CDN URL: https://d123.cloudfront.net/photo.jpg\n// Origin: S3 bucket\n// Reduces origin load by ~95%",
            "commonMistakes": "Not setting Cache-Control headers (CDN won't cache). Confusing CDN invalidation (not instant). Using blob storage for tiny objects (<1KB). No lifecycle policies (unnecessary costs). Not using multipart upload for large files.",
            "bestPractices": "Set Cache-Control (static: max-age=1 year, HTML: no-cache). Origin shielding. Multipart upload for >100MB. Pre-signed URLs for temporary access. Lifecycle rules for cheaper tiers. Versioning for data protection. Cross-region replication for DR.",
            "interviewPerspective": "Storage/CDN questions test latency optimization and cost management. Discuss: (1) Upload: pre-signed URL -> direct S3 (bypass app). (2) Processing: S3 event -> Lambda -> thumbnail -> metadata. (3) Serving: CDN edge -> S3 origin. (4) Invalidation: versioned URLs. Stand out: Lambda@Edge for dynamic content at edge, signed cookies for premium content.",
            "performanceNotes": "S3: first byte ~50-200ms, up to 100 Gbps per prefix. CDN: first byte <20ms, hit ratio >90%. CDN reduces origin load by 80-95%. Bandwidth: CDN ~$0.02-0.08/GB vs S3 ~$0.09/GB.",
            "securityNotes": "Encryption at rest (SSE-S3/KMS/C), in transit (HTTPS), bucket policies, IAM roles, pre-signed URLs, block public access by default. CDN: Origin Access Identity restricts S3 to CloudFront only, WAF for DDoS, geo-restriction, signed URLs/cookies.",
            "comparisonTable": "| Feature | AWS S3 | GCS | Azure Blob |\n|---------|--------|-----|------------|\n| Durability | 11 nines | 11 nines | 11 nines |\n| Consistency | Read-after-write (new) | Strong (global) | Strong |\n| Classes | 6 tiers | 4 tiers | 4 tiers |\n| Max object | 5 TB | 5 TB | 4.75 TB |"
          },
          "quiz": [
            {
              "id": "sd-storage-1",
              "question": "How does a CDN reduce latency?",
              "options": [
                "Caching content at edge servers geographically close to users",
                "Compressing content",
                "Using faster servers than origin",
                "Fewer network hops"
              ],
              "correctIndex": 0,
              "explanation": "CDNs cache at hundreds of edge locations. Content comes from nearest edge (~50km) instead of distant origin.",
              "difficulty": "easy"
            },
            {
              "id": "sd-storage-2",
              "question": "Purpose of pre-signed URLs?",
              "options": [
                "Grant temporary secure access to private objects without exposing credentials",
                "Speed up uploads",
                "Compress files",
                "Share files permanently"
              ],
              "correctIndex": 0,
              "explanation": "Pre-signed URLs provide time-limited access to private objects. URL contains auth in query params, expires after set time.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design YouTube's video upload and serving pipeline.",
              "answer": "Upload: (1) Client uploads to GCS via resumable upload. (2) GCS triggers Pub/Sub. (3) Dataflow pipeline: transcode to multiple formats (240p-4K), generate thumbnails, copyright detection. (4) Metadata in sharded MySQL (Vitess), video refs in Bigtable. Serving: (1) Google Global Cache (edge inside ISPs). (2) DASH/HLS adaptive bitrate streaming. (3) Popular videos cached everywhere, long-tail from storage.",
              "difficulty": "expert",
              "company": "Google"
            },
            {
              "question": "Design photo storage service like Instagram.",
              "answer": "Upload: (1) Client gets pre-signed S3 URL (bypasses app). (2) S3 event triggers Lambda for thumbnails (3 sizes: 150, 640, 1080). (3) Thumbnails in separate bucket with CDN. (4) Metadata (user_id, caption) in PostgreSQL + Redis cache. Serving: (1) CDN URLs with versioned hashes. (2) Private photos: pre-signed CDN URLs with short expiration. (3) WebP + AVIF for 30-50% smaller files. S3 lifecycle: old photos -> Glacier after 1 year.",
              "difficulty": "hard",
              "company": "Meta"
            }
          ],
          "codingChallenges": [
            {
              "title": "Pre-Signed URL Generator",
              "description": "Generate time-limited access URLs without requiring auth.",
              "difficulty": "medium",
              "starterCode": "class UrlSigner {\n  constructor(private config: { secretKey: string; expirationMs: number }) {}\n  sign(resourcePath: string, userIp?: string): string { /* impl */ }\n  verify(signedUrl: string, userIp?: string): string | null { /* impl */ }\n}",
              "solutionHint": "HMAC-SHA256 of (resourcePath + expiration + IP). Format: /resource?expires={ts}&sig={hmac}. Verify by recomputing HMAC and checking expiration."
            }
          ]
        }
      ]
    },
    {
      "slug": "security",
      "title": "Security",
      "description": "Master authentication, authorization, and encryption - OAuth 2.0, JWT, TLS, and securing distributed systems",
      "order": 8,
      "subtopics": [
        {
          "slug": "auth-authorization",
          "title": "Authentication & Authorization",
          "order": 1,
          "content": {
            "overview": "Authentication verifies identity. Authorization determines access rights. OAuth 2.0 is the standard for delegated authorization. JWT is a compact, self-contained token format for authenticated API requests. Together they form the security backbone of modern applications.",
            "problemStatement": "Early web stored passwords directly (security nightmare). Users needed separate accounts for every service. Authorization was ad-hoc. Industry needed standardized, secure protocols for identity and access management.",
            "intuitionFirst": "Hotel: authentication is checking ID at front desk (who you are). Authorization is room key card - grants access to specific rooms and times (what you can do). The key card is self-contained like a JWT.",
            "realLifeAnalogy": "OAuth 2.0 is valet parking: you give car keys to valet (authorization). Valet gets ticket allowing them to park but not access trunk. Ticket is limited in scope and time. Valet never gets your personal ID (password).",
            "howItWorks": "OAuth 2.0 flows: Authorization Code (web), PKCE (mobile), Client Credentials (server-to-server). JWT: Header (algorithm, type), Payload (claims), Signature (integrity). Base64url encoded, signed (not encrypted by default).",
            "beginnerExample": "// JWT generation\nimport jwt from 'jsonwebtoken';\nconst token = jwt.sign(\n  { sub: user.id, role: user.role },\n  process.env.JWT_SECRET!,\n  { expiresIn: '1h' }\n);\n\n// JWT verification middleware\nfunction authMiddleware(req, res, next) {\n  const auth = req.headers.authorization;\n  if (!auth?.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing token' });\n  try {\n    req.user = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET!);\n    next();\n  } catch { return res.status(401).json({ error: 'Invalid token' }); }\n}\n\n// OAuth 2.0 flow (simplified):\n// 1. Redirect to /authorize?client_id=APP&redirect_uri=CALLBACK&scope=read\n// 2. User authenticates, grants permission\n// 3. Auth server redirects to CALLBACK?code=AUTH_CODE\n// 4. Server exchanges code for tokens at /oauth/token",
            "commonMistakes": "Storing JWT in localStorage (XSS vulnerable - use httpOnly cookies). Not validating exp, iss, aud. Using symmetric keys in microservices (use public/private). No refresh tokens. Not rotating signing keys.",
            "bestPractices": "OAuth 2.0 + PKCE for user-facing apps. Short-lived access tokens (15-60 min). Refresh tokens with rotation. httpOnly, Secure, SameSite cookies. Asymmetric keys (RS256, ES256). JWT blacklisting for revocation. API keys for server-to-server.",
            "interviewPerspective": "Security questions separate thorough engineers. Discuss: (1) JWT vs opaque tokens: self-contained vs revocable. (2) OAuth 2.0 vs OIDC: auth layer on top. (3) Security: CSRF, XSS, token binding (mTLS, DPoP). Mention real incidents: Facebook token theft, GitHub OAuth vulnerability.",
            "performanceNotes": "JWT verify: ~0.1ms HMAC, ~0.5-1ms RSA. JWKS caching reduces key fetch overhead. OAuth token exchange: ~10-20ms. Session stores for opaque tokens: ~1ms.",
            "securityNotes": "Algorithm confusion attack: validate algorithm against allowlist. JWK injection: don't accept embedded JWK. Token theft: short expiration, refresh rotation, device fingerprinting. Use 'sub' claim not arbitrary data.",
            "comparisonTable": "| Feature | JWT | Opaque Token | Session Cookie |\n|---------|-----|--------------|----------------|\n| Storage | Self-contained | Server-side | Server-side |\n| Revocation | Cannot (until expiry) | Delete from store | Delete session |\n| Verification | Fast (decode+verify) | DB/cache lookup | DB/cache lookup |\n| Size | Large (2K+ chars) | Small (UUID) | Small (ID) |\n| Cross-domain | Works natively | Needs shared store | Difficult |\n| Use case | Stateless APIs | Immediate revocation | Traditional web |"
          },
          "quiz": [
            {
              "id": "sd-sec-1",
              "question": "Purpose of PKCE in OAuth 2.0?",
              "options": [
                "Prevents auth code interception in mobile/native apps",
                "Encrypts access token",
                "Provides user authentication",
                "Replaces client secrets"
              ],
              "correctIndex": 0,
              "explanation": "PKCE prevents auth code interception attacks. Client generates code_verifier, sends code_challenge. Token request includes verifier validated by auth server.",
              "difficulty": "hard"
            },
            {
              "id": "sd-sec-2",
              "question": "Why should JWT access tokens be short-lived?",
              "options": [
                "JWTs cannot be individually revoked before expiration",
                "JWT encryption degrades",
                "Shorter tokens are smaller",
                "Verification becomes slower"
              ],
              "correctIndex": 0,
              "explanation": "JWTs are self-contained: once issued, they're valid until expiration. Stolen JWT gives access until expiry. Short-lived tokens limit damage. Use refresh tokens for new access tokens.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design secure auth for a fintech API. Handle revocation, refresh, multi-device.",
              "answer": "OAuth 2.0 + PKCE. Access: JWT RS256, 15 min expiry. Refresh: opaque, stored in Redis with device id, rotation. Revocation: delete refresh from Redis (immediate), JWT blacklist in Redis with remaining TTL. Multi-device: separate refresh per device, max 5 devices. Security: mTLS binding, refresh rotation, device fingerprinting. Rate limit token endpoint. Audit log all events.",
              "difficulty": "expert",
              "company": "Stripe"
            },
            {
              "question": "Compare OAuth 2.0 with SAML.",
              "answer": "OAuth 2.0: modern, lightweight, REST+JSON, mobile-friendly, delegated access. Better for consumer apps, mobile, APIs, microservices. SAML: older, XML-based, enterprise SSO, heavy (XML signatures, SOAP). Better for enterprise SSO (Okta, ADFS), government, legacy. OAuth 2.0 + OIDC is modern SAML replacement.",
              "difficulty": "hard",
              "company": "Okta"
            }
          ],
          "codingChallenges": [
            {
              "title": "JWT Authentication Middleware",
              "description": "Express middleware validating JWTs against JWKS endpoint with asymmetric keys.",
              "difficulty": "hard",
              "starterCode": "function createAuthMiddleware(config: { jwksUrl: string; issuer: string; audience: string }) {\n  return async (req, res, next) => {\n    // Your implementation\n  };\n}",
              "solutionHint": "Extract Bearer token. Fetch JWKS (cache 1h). Find key matching kid. Verify signature using matching public key. Validate exp, iss, aud. Attach payload to req.user. Return 401/403."
            }
          ]
        }
      ]
    },
    {
      "slug": "monitoring",
      "title": "Monitoring",
      "description": "Learn how to observe, measure, and debug production systems using Prometheus, Grafana, and the three pillars of observability",
      "order": 9,
      "subtopics": [
        {
          "slug": "observability",
          "title": "Observability",
          "order": 1,
          "content": {
            "overview": "Observability is understanding a system's internal state from external outputs. Three pillars: Metrics (Prometheus), Logs (ELK/Loki), Traces (Jaeger/OpenTelemetry). Together they enable engineers to understand what happened, why, and how to fix it.",
            "problemStatement": "In a distributed system with hundreds of services, a single request traverses 20+ services. Traditional debugging (SSH into server, check logs) is impossible. Need unified observability to track requests across services.",
            "intuitionFirst": "Car dashboard: speedometer (metrics), check engine light (logs), GPS with traffic (traces - route taken, delays). Without these, you're driving blind.",
            "realLifeAnalogy": "Hospital ICU: heart rate monitors (real-time metrics), nurse notes (structured logs), patient history (traces of treatment). Doctors correlate all three to diagnose. Same pattern as debugging production systems.",
            "howItWorks": "Metrics: Prometheus scrapes endpoints at intervals. Time-series with labels. RED (Rate, Errors, Duration) for services, USE (Utilization, Saturation, Errors) for resources. Logs: JSON structured logs to centralized store. Traces: OpenTelemetry instrumentation creates spans with parent-child relationships. Grafana unifies all three.",
            "beginnerExample": "// Prometheus metrics\nconst httpDuration = new prometheus.Histogram({\n  name: 'http_request_duration_seconds',\n  labelNames: ['method', 'route', 'status'],\n  buckets: [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],\n});\n\n// OpenTelemetry tracing\nconst tracer = opentelemetry.trace.getTracer('my-service');\nconst span = tracer.startSpan('process-order');\ntry {\n  const result = await processOrder(data);\n  httpDuration.labels('POST', '/order', '200').observe(duration);\n  return result;\n} finally { span.end(); }",
            "commonMistakes": "No monitoring until production incident. Alert fatigue (too many alerts). Using average instead of percentiles (P50 hides bad P99). Not correlating logs/metrics/traces. Not instrumenting critical paths.",
            "bestPractices": "Define SLOs before monitoring. RED for services, USE for resources. Alert on symptoms (high latency) not causes (high CPU). Use percentiles: P50, P95, P99. Structured JSON logging with correlation IDs. OpenTelemetry for vendor-neutral instrumentation. Create runbooks before incidents.",
            "interviewPerspective": "Observability increasingly important in FAANG interviews. Discuss: (1) Three pillars working together. (2) Prometheus pull-based architecture. (3) Distributed tracing: W3C trace context, sampling strategies. (4) Observability > monitoring (knows vs asks why). (5) Cost: 100% tracing is expensive. Stand out: OpenTelemetry standard, eBPF for zero-instrumentation, Google Dapper.",
            "performanceNotes": "Prometheus: ~1M samples/sec. Grafana: ~1000 concurrent dashboards. Jaeger: ~100K spans/sec. Storage: 100 services x 1000 spans/min x 1KB = ~4.3GB/day for traces. Metrics cheaper: ~10MB/day. Logs most expensive: ~100GB/day.",
            "securityNotes": "Observability contains sensitive data. Authenticate Prometheus endpoints. Redact PII from logs. Sanitize spans (auth tokens in headers). Grafana RBAC. mTLS for observability pipeline. Audit access.",
            "comparisonTable": "| Pillar | Tool | Data Type | Volume | Query | Use Case |\n|--------|------|-----------|--------|-------|----------|\n| Metrics | Prometheus | Numbers+labels | Low | PromQL | Alerting, dashboards |\n| Logs | ELK/Loki | Structured text | High | LogQL/DSL | Debugging, audit |\n| Traces | Jaeger/Tempo | Span trees | Medium | TraceID | Latency analysis |\n| Profiles | Pyroscope | Stack traces | High | Flame graphs | CPU/memory optimization |"
          },
          "quiz": [
            {
              "id": "sd-mon-1",
              "question": "Difference between monitoring and observability?",
              "options": [
                "Monitoring tells you something is wrong; observability lets you ask why",
                "They are the same",
                "Observability is monitoring with dashboards",
                "Monitoring needs agents; observability doesn't"
              ],
              "correctIndex": 0,
              "explanation": "Monitoring observes predefined metrics. Observability enables understanding system state to ask new questions without new code.",
              "difficulty": "medium"
            },
            {
              "id": "sd-mon-2",
              "question": "Why use percentiles instead of averages for latency?",
              "options": [
                "Averages hide the long tail of slow requests; percentiles show distribution",
                "Averages are harder to calculate",
                "Percentiles need less storage",
                "Percentiles are more accurate"
              ],
              "correctIndex": 0,
              "explanation": "Average: 99 fast at 10ms + 1 slow at 10s = ~109ms. P99 shows 10s, revealing the real problem.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design distributed tracing for microservices handling 1M req/s.",
              "answer": "Based on Dapper/Jaeger: (1) OpenTelemetry SDK auto-instruments libraries. W3C traceparent context propagation. (2) Head-based sampling (1%) + tail-based (errors + high latency). (3) OTLP collectors aggregate and batch-write. (4) Hot storage (Elasticsearch/Cassandra) for 7 days, cold (S3/Parquet) longer. (5) Query: trace_id lookup, service/operation/tags. (6) Service graph derived from spans. Bloom filters for fast trace_id lookup.",
              "difficulty": "expert",
              "company": "Google"
            },
            {
              "question": "Set up effective alerting minimizing false positives.",
              "answer": "Multi-tier: (1) Page (P0): customer errors >1%, P99 >5s, all instances down. (2) Ticket (P1): error rate >0.5% for 5 min, disk >80%. (3) Watch (P2): trends, capacity. Prevention: proper thresholds with baseline+seasonality, multi-condition alerts, silence during maintenance, auto-ack during known incidents, flapping detection, error budget-based alerting.",
              "difficulty": "hard",
              "company": "Datadog"
            }
          ],
          "codingChallenges": [
            {
              "title": "Prometheus Metrics Exporter",
              "description": "Create Node.js HTTP server exposing custom metrics in Prometheus format.",
              "difficulty": "medium",
              "starterCode": "const server = http.createServer((req, res) => {\n  if (req.url === '/metrics') {\n    // Expose Prometheus-formatted metrics\n  }\n});",
              "solutionHint": "Expose at /metrics. Format: # HELP, # TYPE headers, then values. Counter for requestCount, gauge for activeUsers. Include labels."
            }
          ]
        }
      ]
    },
    {
      "slug": "real-designs",
      "title": "Real Designs",
      "description": "Study production architectures of the world's largest systems - Netflix, WhatsApp, Uber, YouTube, Instagram, Twitter",
      "order": 10,
      "subtopics": [
        {
          "slug": "netflix-architecture",
          "title": "Netflix Architecture",
          "order": 1,
          "content": {
            "overview": "Netflix serves 260M+ subscribers streaming 1B+ hours/week. Their architecture evolved from a monolith to a cloud-native microservices platform on AWS, pioneering chaos engineering, circuit breakers, and immutable infrastructure.",
            "problemStatement": "Netflix had a monolithic Java WAR file. Every change needed full regression testing, any bug took down all features, scaling required expensive vertical upgrades. Needed a globally distributed system serving 190+ countries.",
            "intuitionFirst": "Netflix DVD-by-mail was a monolith (one warehouse). Streaming needed 1000+ specialized micro-libraries worldwide, each handling a specific task (recommendations, streaming, billing) via standardized request forms.",
            "realLifeAnalogy": "City infrastructure: electricity grid (AWS), roads (networking), specialized buildings (microservices), city hall (API gateway), emergency services (Chaos Monkey checks for failures).",
            "howItWorks": "Client apps -> CDN (Open Connect) -> CloudFront -> Zuul API Gateway -> Microservices (Eureka discovery, Ribbon LB) -> Hystrix circuit breakers -> Data stores (Cassandra, EVCache, S3). Key: Zuul (edge), Eureka (registry), Hystrix (resilience), Chaos Monkey (fault testing), Atlas (telemetry), Spinnaker (deployment).",
            "beginnerExample": "// Hystrix-style circuit breaker\nasync function executeWithFallback(primary, fallback, timeoutMs = 10000) {\n  try {\n    return await Promise.race([\n      primary(),\n      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeoutMs)),\n    ]);\n  } catch (err) {\n    return fallback();\n  }\n}\n\n// Service discovery\nclass ServiceRegistry {\n  private services = new Map();\n  register(name, instance) {\n    if (!this.services.has(name)) this.services.set(name, []);\n    this.services.get(name).push(instance);\n  }\n  getInstance(name) {\n    const instances = this.services.get(name);\n    return instances[Math.floor(Math.random() * instances.length)];\n  }\n}",
            "commonMistakes": "Hystrix without proper fallback (circuit open returns error instead of degraded response). No bulkheads (failing recommendation service exhausts threads for content delivery). Chaos Monkey without redundancy (just causes real outages).",
            "bestPractices": "Circuit breakers with meaningful fallbacks (cached data). Bulkheads: separate thread pools per dependency. Auto-scale on real-time metrics. Chaos engineering. Canary deployments (Spinnaker). Immutable infrastructure (no SSH).",
            "interviewPerspective": "Netflix architecture is a goldmine. Discuss: (1) Chaos Engineering. (2) Microservices trade-offs. (3) Hystrix: circuit breaker, bulkhead, fallback. (4) Open Connect CDN inside ISPs. (5) Zuul API Gateway. (6) Multi-region active-active. Stand out: specialized systems (Hermes for messaging, Atlas for metrics, Mantis for stream processing).",
            "performanceNotes": "Open Connect serves 95% of traffic. Each appliance caches ~100TB. Adaptive bitrate streaming. Per-title encoding optimization.",
            "securityNotes": "DRM (Widevine, PlayReady). API auth via customer ID + device tokens. Post-play encryption. CSP headers. Anti-piracy monitoring."
          },
          "quiz": [
            {
              "id": "sd-real-1",
              "question": "Purpose of Chaos Monkey?",
              "options": [
                "Randomly terminates instances to ensure system handles failures gracefully",
                "Optimizes DB queries",
                "Detects vulnerabilities",
                "Manages content encoding"
              ],
              "correctIndex": 0,
              "explanation": "Chaos Monkey randomly terminates production instances, forcing engineers to build resilient systems by continuously testing failure scenarios.",
              "difficulty": "easy"
            },
            {
              "id": "sd-real-2",
              "question": "Why did Netflix create Open Connect CDN?",
              "options": [
                "To control experience by placing servers inside ISPs, reducing latency and bandwidth costs",
                "To save on cloud costs",
                "To avoid vendor lock-in",
                "To support more formats"
              ],
              "correctIndex": 0,
              "explanation": "Netflix streams ~15% of global internet traffic. Open Connect appliances deployed inside ISP data centers dramatically reduce latency and transit costs.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design Netflix's video streaming pipeline from studio to user.",
              "answer": "Ingestion: (1) Studio delivers master to cloud. (2) Source validated. Processing: (3) Transcode to multiple bitrates (235kbps-58Mbps) and codecs (H.264, H.265, VP9, AV1). (4) Per-title optimization. (5) Subtitles, audio (5.1, Atmos), metadata. (6) Packaged as DASH/HLS. Storage: (7) Master and encodes in S3. (8) Open Connect pre-populated (predictive caching). Delivery: (9) User plays -> CDN manifest -> client selects bitrate -> fetches from nearest Open Connect node -> adaptive bitrate adjusts. (10) Telemetry for QoE monitoring.",
              "difficulty": "expert",
              "company": "Netflix"
            },
            {
              "question": "How does Netflix recommendation system serve 260M users?",
              "answer": "Multi-stage ML: (1) Offline: TensorFlow models on GPU clusters (collaborative filtering, content-based, contextual). (2) Feature store in Cassandra/EVCache. (3) Nearline inference. (4) Online: evidence system gathers real-time signals, combines with offline scores, applies business rules. (5) Two-stage ranking: lightweight filters top 500, heavy model ranks top 20. Cached in EVCache. All <500ms.",
              "difficulty": "expert",
              "company": "Netflix"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "whatsapp-architecture",
          "title": "WhatsApp Architecture",
          "order": 2,
          "content": {
            "overview": "WhatsApp serves 2B+ users with ~50 engineers at acquisition. Their architecture handles 100B+ messages/day using minimal stack: Erlang on FreeBSD with custom EJABBERD. Built for reliability and simplicity.",
            "problemStatement": "Build global messaging for billions with E2E encryption, delivery guarantees, minimal infrastructure. Messages must deliver even if recipient is offline for days. Must work on low-bandwidth networks and $30 smartphones.",
            "intuitionFirst": "Postal service: mail a letter, post office doesn't call recipient. They store it, try to deliver. When recipient checks mailbox (opens app), letter is there. Store-and-forward model.",
            "realLifeAnalogy": "Walkie-talkie plus answering machine. Real-time for active sessions, offline delivery when unavailable. All messages encrypted - sealed envelopes only intended recipient can open.",
            "howItWorks": "Clients connect via persistent TCP (XMPP + custom extensions). Server maintains routing table (user ID -> server). Message flow: (1) Encrypted with recipient's public key (Signal Protocol). (2) Sent to server. (3) Server looks up recipient. (4) If online: push via persistent connection. (5) If offline: store in queue (up to 30 days). (6) Recipient comes online: deliver stored messages in order. (7) Delivery receipts (single/double check marks).",
            "beginnerExample": "// Simplified message delivery with offline queue\nclass MessageRouter {\n  private connections = new Map();\n  private offlineQueues = new Map();\n\n  async sendMessage(sender, recipient, content) {\n    const message = {\n      id: generateId(), sender, content, timestamp: Date.now(),\n      encrypted: encrypt(content, getPublicKey(recipient)),\n    };\n    const conn = this.connections.get(recipient);\n    if (conn?.readyState === WebSocket.OPEN) {\n      conn.send(JSON.stringify(message));\n    } else {\n      if (!this.offlineQueues.has(recipient)) this.offlineQueues.set(recipient, []);\n      this.offlineQueues.get(recipient).push(message);\n      await sendPushNotification(recipient, sender);\n    }\n  }\n\n  onUserConnect(userId, ws) {\n    this.connections.set(userId, ws);\n    const queue = this.offlineQueues.get(userId) || [];\n    this.offlineQueues.delete(userId);\n    for (const msg of queue) ws.send(JSON.stringify(msg));\n  }\n}",
            "commonMistakes": "No offline message delivery (messages lost). Global sequential IDs (not scalable). No back-pressure on persistent connections. Storing messages indefinitely (privacy, cost). Not optimizing for low-bandwidth (big payloads fail on 2G).",
            "bestPractices": "E2E encryption (Signal Protocol, perfect forward secrecy). Store-and-forward for offline. Minimal server-side storage (deliver and delete). Binary protocol for bandwidth (custom protobuf). Persistent TCP with heartbeat. Exponential backoff reconnection. Phone number as identity.",
            "interviewPerspective": "WhatsApp demonstrates simple well-executed designs can scale. Focus: (1) Why Erlang? Actor model for millions of connections, hot code reloading. (2) Minimalist design: each server handles 1M+ connections. (3) Store-and-forward delivery model. (4) E2E encryption (Signal Protocol). (5) Phone-based identity (no usernames/passwords). Key stat: ~50 engineers supporting 2B users.",
            "performanceNotes": "Each Erlang server handles ~1M concurrent connections. ~100B messages/day. Server stores messages up to 30 days. Binary protocol ~100 bytes per message (vs JSON ~500+ bytes).",
            "securityNotes": "Signal Protocol: Double Ratchet algorithm for perfect forward secrecy. Curve25519 key exchange. AES-256-CBC + HMAC-SHA256. No server access to message content. Metadata kept minimal (sender, recipient, timestamp)."
          },
          "quiz": [
            {
              "id": "sd-wa-1",
              "question": "How does WhatsApp handle message delivery when recipient is offline?",
              "options": [
                "Stores messages in server queue up to 30 days, delivers on reconnect",
                "Drops messages until recipient comes online",
                "Sends via SMS instead",
                "Calls the recipient's phone"
              ],
              "correctIndex": 0,
              "explanation": "WhatsApp stores messages in a server-side queue for up to 30 days. When the recipient comes online, queued messages are delivered in order.",
              "difficulty": "easy"
            },
            {
              "id": "sd-wa-2",
              "question": "Why does WhatsApp use Erlang?",
              "options": [
                "Actor model excels at millions of concurrent connections and hot code reloading",
                "Erlang is the fastest language for message processing",
                "Erlang has built-in database support",
                "Erlang is the only language supporting XMPP"
              ],
              "correctIndex": 0,
              "explanation": "Erlang's actor model enables handling millions of concurrent connections with lightweight processes. Hot code reloading allows updates without downtime.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design a messaging system like WhatsApp supporting 2B users with E2E encryption.",
              "answer": "Connection: Persistent TCP with custom binary protocol (protobuf). Routing: Sharded by user ID. Each user has a home server maintaining their connection. Messaging: (1) Client encrypts message with recipient's Signal Protocol session key. (2) Sent to sender's home server. (3) Server routes to recipient's home server via internal RPC. (4) Recipient's server pushes if online or queues for offline. (5) Recipient decrypts with their session key. Group messaging: server-side fan-out for small groups (<256), client-side fan-out for larger. Media: Upload to S3, send encrypted URL. Delivery receipts: TCP-level ACK + app-level read receipts.",
              "difficulty": "expert",
              "company": "Meta"
            },
            {
              "question": "Explain the Signal Protocol and how it provides perfect forward secrecy.",
              "answer": "Signal Protocol combines Double Ratchet + prekeys + X3DH (Extended Triple Diffie-Hellman). (1) X3DH: establishes initial shared secret between parties using prekeys (one-time + signed). (2) Double Ratchet: each message derives new encryption keys from previous keys, providing forward secrecy (past keys useless if current is compromised). Asymmetric ratchet (DH) + symmetric ratchet (hash chain). (3) If a session key is compromised, only messages in that ratchet step are exposed - past and future messages remain secure. Header encryption hides metadata. Used by WhatsApp, Signal, Google Messages (RCS).",
              "difficulty": "expert",
              "company": "Signal"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "uber-architecture",
          "title": "Uber Architecture",
          "order": 3,
          "content": {
            "overview": "Uber processes 25M+ trips daily across 10,000+ cities. Their architecture evolved from a monolithic Python/Node app to a domain-oriented microservices platform built on its own infrastructure (Peloton, Ringpop, Schemaless).",
            "problemStatement": "A single ride involves: rider request, driver matching, pricing (surge), route optimization, payment processing, real-time tracking, and ETA calculation. Each subproblem needs specialized systems handling millions of events per second with <500ms latency.",
            "intuitionFirst": "Uber dispatch is like air traffic control. A plane (driver) needs to be assigned to a gate (rider request) optimally. Air traffic controller (matching service) considers: proximity (geohash), type (surge pricing), queue (driver availability).",
            "realLifeAnalogy": "A taxi dispatch in a city: dispatcher (matching service) knows where all cabs are (GPS updates), assigns nearest available cab to caller (rider), calculates fare based on demand (surge), tracks the trip (GPS), and processes payment automatically.",
            "howItWorks": "Rider app -> API Gateway -> Dispatch (matching + pricing) -> Driver app. Key services: (1) Geospatial Index: Redis/GEO or custom for finding nearby drivers. (2) Dispatch: matches rider to driver based on proximity, ETA, surge. (3) Surge: real-time demand/supply pricing. (4) Maps/Navigation: routing, ETA, traffic. (5) Payments: per-trip charges, split fare. (6) Marketplace: supply-demand forecasting. (7) Uber Eats: separate dispatch for food delivery. Infrastructure: Peloton (resource isolation), Ringpop (consistent hashing), Schemaless (scalable datastore), Hive (stream processing).",
            "beginnerExample": "// Geohash proximity search\nfunction getGeohash(lat: number, lng: number, precision: number): string {\n  const base32 = '0123456789bcdefghjkmnpqrstuvwxyz';\n  let bits = 0, hash = '';\n  // ... geohash encoding logic\n  return hash;\n}\n\n// Find drivers in nearby geohash cells\nasync function findNearbyDrivers(lat: number, lng: number, radius: number) {\n  const center = getGeohash(lat, lng, 7);\n  const neighbors = getNeighborGeohashes(center); // 8 adjacent cells\n  const cells = [center, ...neighbors];\n  \n  const drivers = [];\n  for (const cell of cells) {\n    const cellDrivers = await redis.smembers(`drivers:${cell}`);\n    drivers.push(...cellDrivers);\n  }\n  return drivers;\n}",
            "commonMistakes": "Not accounting for driver cancellations/no-shows (need re-matching). Surge pricing perception (users hate surge). Geohash edge cases (driver on border of cell). Real-time tracking latency (driver GPS update frequency >5s causes issues).",
            "bestPractices": "Use geohash for spatial indexing (8 adjacent cells for radius search). Pre-compute ETAs with ML for accurate arrival times. Fallback matching if primary fails. Real-time streaming for GPS updates (Kafka). Idempotent ride requests to prevent duplicates. Rate limiting on dispatch.",
            "interviewPerspective": "Uber is an excellent system design interview topic. Discuss: (1) Geospatial indexing: geohash vs quad-tree vs S2 (Google's library). (2) Real-time matching: how to find nearest driver quickly. (3) Surge pricing: demand/supply curves, user elasticity. (4) ETA calculation: traffic data, historical patterns. (5) Payment: idempotency, fraud detection. (6) Distributed tracing across microservices. Stand out: discuss Uber's use of Apache Hive for stream processing, Peloton for resource isolation, and the evolution from monolith to domain-oriented architecture.",
            "performanceNotes": "Dispatch: <500ms end-to-end. GPS updates: 4-10 second intervals. Geohash precision 7 (~150m) for driver search. Redis geo queries: ~100K ops/sec. Kafka ingestion: ~1M events/sec for GPS data.",
            "securityNotes": "Rider/driver data encryption at rest and transit. Payment PCI DSS compliance. Fraud detection ML models. Phone number privacy (masked calling). Trip history access controls."
          },
          "quiz": [
            {
              "id": "sd-uber-1",
              "question": "What geospatial indexing method does Uber use for finding nearby drivers?",
              "options": [
                "Geohash with 8 adjacent cells",
                "Latitude/longitude bounding box",
                "R-tree spatial index",
                "Zip code lookup"
              ],
              "correctIndex": 0,
              "explanation": "Uber uses geohash (Google S2 library for some services). The rider's location geohash plus 8 adjacent cells are searched for available drivers within ~150m precision.",
              "difficulty": "medium"
            },
            {
              "id": "sd-uber-2",
              "question": "How does surge pricing work in Uber?",
              "options": [
                "Multiplier based on real-time demand/supply ratio in a geohash cell",
                "Fixed pricing per city",
                "Time-of-day based pricing",
                "Driver sets their own price"
              ],
              "correctIndex": 0,
              "explanation": "Surge pricing uses real-time demand (ride requests) vs supply (available drivers) ratio. High demand/low supply increases multiplier. Algorithm considers user elasticity to avoid excessive pricing.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design Uber's real-time dispatch system. How do you match millions of riders to drivers with <500ms latency?",
              "answer": "Event-driven architecture: (1) Driver GPS updates streamed to Kafka (driver-locations topic). (2) Geospatial service subscribes, updates Redis GEO index per geohash cell. (3) Rider request -> API Gateway -> Dispatch service. (4) Dispatch calculates geohash of rider, queries Redis for drivers in that cell + 8 adjacent. (5) Filters available (not on trip, not paused). (6) Computes ETA for each candidate driver (pre-computed ML model). (7) Sends push notification to top 3 closest drivers (first to accept wins). (8) On acceptance, ride created, driver status set to 'on trip'. (9) If no driver accepts within 10 seconds, retry with wider radius + higher surge. Kafka ensures exactly-once delivery for ride events.",
              "difficulty": "expert",
              "company": "Uber"
            },
            {
              "question": "How would you design Uber's pricing/surge engine?",
              "answer": "Core components: (1) Real-time demand: count ride requests in each geohash cell (sliding window 5 min). (2) Real-time supply: count available drivers in same cell. (3) Surge multiplier = base_price * demand/supply ratio * elasticity_factor. (4) Heat map generated every minute showing surge areas. (5) ML model predicts future demand (historical patterns, events, weather, time of day). (6) Surge pricing triggers 'earnings boost' notification to drivers to move to high-demand areas. (7) Price floor/ceiling configured per city. (8) A/B testing for new pricing models. Simplification: Uber uses a multi-armed bandit approach to optimize pricing in real-time.",
              "difficulty": "expert",
              "company": "Uber"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "youtube-architecture",
          "title": "YouTube Architecture",
          "order": 4,
          "content": {
            "overview": "YouTube serves 2B+ monthly active users, with 500+ hours of video uploaded every minute and 1B+ hours watched daily. Google's architecture leverages massive global infrastructure: custom hardware, global CDN, Bigtable for metadata, and ML for recommendations.",
            "problemStatement": "Storing and serving exabytes of video data globally. Uploads must be processed in real-time (transcoding, thumbnails, content ID checks). Recommendations must be personalized for billions of users. All with 99.9%+ availability.",
            "intuitionFirst": "YouTube is like a global library where every book is unique, constantly being added, and each reader gets a personalized suggestion list. The books must be available in multiple languages (resolutions) instantly.",
            "realLifeAnalogy": "A news network with thousands of reporters uploading footage constantly. Each video needs editing (transcoding), captioning (subtitles), fact-checking (copyright detection), and distribution to local stations (CDN).",
            "howItWorks": "Upload: API -> load balancer -> upload service -> Google Cloud Storage. Processing: Pub/Sub triggers -> Transcoder (multiple resolutions + codecs) -> Thumbnail generator -> Content ID (copyright check) -> Metadata index. Storage: GCS for videos, Bigtable for metadata (titles, descriptions, stats), sharded MySQL (Vitess) for user data. Serving: Global cache (Google Global Cache in ISPs) -> Client (DASH/HLS adaptive streaming) -> Recommendation ML (deep neural networks).",
            "beginnerExample": "// Simplified upload processing pipeline\nasync function processUpload(videoId: string, userId: string) {\n  // Receive upload\n  const upload = await storage.receive(videoId);\n  \n  // Publish processing task\n  await pubsub.publish('video-uploaded', { videoId, userId });\n  \n  // Processing pipeline (async)\n  // 1. Transcode: 240p, 360p, 480p, 720p, 1080p, 4K\n  // 2. Generate thumbnails (auto-select best frame)\n  // 3. Content ID check (audio/video fingerprinting)\n  // 4. Generate captions (speech-to-text)\n  // 5. Update metadata in Bigtable\n  \n  // Update user's video list\n  await db.execute(\n    'INSERT INTO user_videos (user_id, video_id, uploaded_at) VALUES ($1, $2, NOW())',\n    [userId, videoId]\n  );\n}",
            "commonMistakes": "Not optimizing for long-tail videos (recommendation system must handle both viral hits and niche content). Assuming linear scaling of transcoding (up to 4K requires >10x compute vs 1080p). Ignoring regional content regulations (GDPR, local copyright).",
            "bestPractices": "Adaptive bitrate streaming (DASH/HLS) for varying network conditions. Per-title encoding optimization. Pre-compute recommendations offline, serve from cache. Content delivery via ISP-partnered CDN. Regional content caching with geo-restrictions. Upload resumption (HTTP range requests).",
            "interviewPerspective": "YouTube tests full-stack system design knowledge. Discuss: (1) Upload: resumable protocol, direct-to-storage, async pipeline. (2) Transcoding: parallel job distribution, codec selection (VP9, AV1). (3) Storage hierarchy: hot storage (SSD cache), warm (HDD), cold (tape/archive). (4) CDN: Google Global Cache with ISP peering. (5) Recommendation: two-stage retrieval (candidate generation + ranking) using deep neural networks. (6) Thumbnail optimization: A/B testing thumbnails for click-through rate.",
            "performanceNotes": "Transcoding: 1 hour of video ~1 hour processing time for HD, ~4 hours for 4K. Google Global Cache: thousands of nodes inside ISPs worldwide. Cache hit ratio: >95% for popular content. CDN serves ~95% of traffic, origin serves ~5%.",
            "securityNotes": "Content ID: audio/video fingerprinting against copyrighted database. DRM: Widevine, PlayReady for premium content. Regional restrictions: geo-IP blocking. Upload scanning: malware, CSAM detection. Comment moderation: ML-based spam/hate speech detection."
          },
          "quiz": [
            {
              "id": "sd-yt-1",
              "question": "What is the purpose of adaptive bitrate streaming?",
              "options": [
                "Dynamically adjusts video quality based on user's network bandwidth",
                "Reduces file size",
                "Increases video resolution",
                "Encrypts video content"
              ],
              "correctIndex": 0,
              "explanation": "Adaptive bitrate streaming (DASH/HLS) splits video into short segments at multiple quality levels. The client requests the highest quality that current bandwidth can support, switching seamlessly as conditions change.",
              "difficulty": "easy"
            },
            {
              "id": "sd-yt-2",
              "question": "How does YouTube's Content ID system work?",
              "options": [
                "Fingerprints audio/video content and matches against a reference database of copyrighted works",
                "Uses AI to detect faces in videos",
                "Manually reviews every upload",
                "Blocks all uploads from suspicious IPs"
              ],
              "correctIndex": 0,
              "explanation": "Content ID creates a fingerprint (digital signature) of copyrighted content uploaded by rights holders. Every new upload is compared against this database. Matches result in block, monetize (ad revenue to rights holder), or track.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design YouTube's video recommendation system.",
              "answer": "Two-stage architecture: (1) Candidate generation: retrieve hundreds of videos from multiple sources (user history - collaborative filtering, similar videos - content-based, trending, new uploads). Deep neural networks with embeddings for user and video features. (2) Ranking: deep neural network with hundreds of features (watch time, engagement, freshness, quality). Optimizes for expected watch time (not click-through rate). (3) Re-ranking: apply business rules (diversity, freshness, avoid repetitive content), filter already-watched. (4) Caching: pre-compute recommendations for active users. Training: TensorFlow on TPUs, daily model updates. A/B testing for new models. Key metric: watch time per session.",
              "difficulty": "expert",
              "company": "Google"
            },
            {
              "question": "How does YouTube ensure video uploads are processed quickly while maintaining quality at 500+ hours/min?",
              "answer": "Massively parallel processing pipeline: (1) Upload goes directly to GCS (bypassing app server). (2) GCS event triggers Pub/Sub message. (3) Transcoder pool: thousands of workers pick up encoding jobs from queue. Each video segment processed independently (chunked encoding). (4) Multiple encoding profiles run in parallel (different resolutions + codecs). (5) Thumbnail selection: extract frames, score by quality metrics (brightness, sharpness, face presence), select top 3. (6) Content ID: audio fingerprint comparison in parallel. (7) Caption generation: speech-to-text pipeline. All steps are massively parallel. SLA: <5 minutes for HD processing, <15 minutes for 4K. Priority queue for trending content.",
              "difficulty": "expert",
              "company": "Google"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "instagram-architecture",
          "title": "Instagram Architecture",
          "order": 5,
          "content": {
            "overview": "Instagram serves 1B+ monthly active users sharing 100M+ photos and videos daily. Originally a simple Python/Django monolith on a single server, it evolved to a sophisticated microservices architecture on AWS/Facebook infrastructure. Famous for its minimalist MVP startup story.",
            "problemStatement": "Instagram launched with 13 million users on a single Django server. The monolith couldn't scale to handle viral growth. Needed to split into services: feed, stories, direct messages, explore, notifications - each with different scaling characteristics.",
            "intuitionFirst": "Instagram's evolution: from a single Polaroid camera (monolith) to a professional photography studio (microservices) where each department handles a specific task: feed curation, story editing, photo processing, etc.",
            "realLifeAnalogy": "A newspaper: reporters (users) submit stories (photos). Editors (algorithms) curate the front page (feed). Photo editors (image processing) enhance quality. Delivery team (CDN) distributes to subscribers.",
            "howItWorks": "Feed: (1) Pre-compute fan-out on write. When user A posts, push post ID to all followers' Redis feed lists. (2) For celebrities (>10K followers), pull on read (fan-out on read). Explore: (1) ML-based content discovery (similarity to liked posts). (2) Graph database for relationships. Stories: (1) Ephemeral content (24h TTL). (2) Separate Redis store. Direct: (1) XMPP/WebSocket for real-time. (2) Message queue for delivery. Infrastructure: PostgreSQL (sharded), Redis (feed cache), Cassandra (stories), Memcached (general cache), S3 (photos), CDN (delivery).",
            "beginnerExample": "// Fan-out on write for feed\nasync function publishPost(userId: string, postId: string) {\n  // Save post to database\n  await db.query(\n    'INSERT INTO posts (id, user_id, created_at) VALUES ($1, $2, NOW())',\n    [postId, userId]\n  );\n\n  // Fan-out to followers (only for non-celebrities)\n  const followers = await getFollowers(userId);\n  const pipeline = redis.pipeline();\n  for (const followerId of followers) {\n    // Only push to active users' feed lists\n    if (await isActiveUser(followerId)) {\n      pipeline.lpush(`feed:${followerId}`, postId);\n      pipeline.ltrim(`feed:${followerId}`, 0, 499); // Keep 500 most recent\n    }\n  }\n  await pipeline.exec();\n}\n\n// Read timeline\nasync function getTimeline(userId: string, page: number) {\n  const start = page * 20;\n  const end = start + 19;\n  const postIds = await redis.lrange(`feed:${userId}`, start, end);\n  if (postIds.length === 0) {\n    // Fallback: pull from DB (cold start)\n    return getTimelineFromDB(userId, page);\n  }\n  return getPostsByIds(postIds);\n}",
            "commonMistakes": "Fan-out on write for everyone (celebrities with millions of followers cause write explosion). Not using versioned cache keys (stale feed after old cache). Not paginating feed properly (loading all posts at once).",
            "bestPractices": "Hybrid fan-out: push for regular users, pull for celebrities. Pre-compute feed as list of post IDs (not full objects). Cache individual post data (Memcached). Lazy loading: load feed posts on scroll. Rate limit posts per user (anti-spam). Graceful degradation: if Redis is down, fall back to DB query.",
            "interviewPerspective": "Instagram is perfect for discussing feed design (the classic system design question). Cover: (1) Feed generation: push vs pull vs hybrid. (2) Fan-out on write: when to push, when to pull. (3) Feed ranking: chronological vs algorithmic (introduced in 2016). (4) Media storage: S3 + CDN, thumbnail generation pipeline. (5) Explore: content discovery via graph algorithms and ML. (6) Stories: ephemeral storage and TTL. Mention the famous Instagram engineering blog posts on sharding PostgreSQL, feed infrastructure, and migration to Python 3.",
            "performanceNotes": "Feed cache: Redis sorted sets. ~1M posts per second at peak. Read-heavy: 90% reads, 10% writes. Feed generation for celebrity post: fan-out on read with per-request computation. Redis feed list trimmed to 500-800 entries per user.",
            "securityNotes": "Private accounts: feed filtering to remove unauthorized posts. Photo metadata stripping (EXIF). Report/block system. Spam detection ML models. Age restrictions for sensitive content."
          },
          "quiz": [
            {
              "id": "sd-ig-1",
              "question": "What is the hybrid fan-out approach in Instagram's feed?",
              "options": [
                "Push (fan-out on write) for regular users, pull (fan-out on read) for celebrities",
                "Always push to all followers",
                "Always pull for all users",
                "Pre-compute feed for everyone daily"
              ],
              "correctIndex": 0,
              "explanation": "Regular users: push post IDs to followers' feed lists (fan-out on write, manageable size). Celebrities with millions of followers: pull on timeline load (fan-out on read) to avoid write explosion.",
              "difficulty": "medium"
            },
            {
              "id": "sd-ig-2",
              "question": "How did Instagram scale PostgreSQL?",
              "options": [
                "Custom sharding layer partitioning user data by user ID range",
                "Migrated directly to Cassandra",
                "Used only MySQL",
                "Single master with unlimited replicas"
              ],
              "correctIndex": 0,
              "explanation": "Instagram developed a custom sharding layer in Python/Django that partitioned PostgreSQL data by user ID ranges. Each shard was a full PG instance holding a subset of users. Later evolved into their own distributed DB.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design Instagram's feed. How would you show a user their home feed with algorithmic ranking?",
              "answer": "Feed generation: (1) Candidate pool: all posts from followed users in last 48 hours. (2) Ranking: ML model scores each post using features (recency, engagement on poster's recent posts, relationship strength, content type preference, platform engagement signals). (3) Filtering: remove seen posts, blocked users, sensitive content. (4) Insert ads: intersperse sponsor posts at optimal positions. (5) Caching: pre-compute feed for active users every 5 minutes, cache in Redis sorted set (post ID + rank score). (6) For new posts: real-time injection into cached feed via WebSocket push. (7) Pagination: cursor-based (pass `after` parameter) for infinite scroll. Key: balance between freshness and relevance. Instagram uses the same infrastructure for chronological (for 'following' tab) and algorithmic (main feed).",
              "difficulty": "expert",
              "company": "Meta"
            },
            {
              "question": "Design Instagram Stories (ephemeral content with 24h TTL).",
              "answer": "Storage: (1) Story uploaded to S3 with key `stories/{userId}/{timestamp}`. (2) Story metadata in Redis (TTL 24h) - key `story:{storyId}` with user_id, media_url, timestamp, viewed_by set. (3) User's active stories stored in Redis sorted set `user_stories:{userId}` sorted by timestamp. Feed: (1) When loading stories tray, gather followed user IDs, check each user's active stories set. (2) Stories loaded in reverse chronological order. (3) Viewed status tracked by sets `story_views:{storyId}` containing userIds. Deletion: (1) Redis automatically expires keys after 24h. (2) Background job deletes S3 files after 24h. (3) Screenshot detection: WebSocket notification when story is screenshotted. Performance: Stories use CDN for media delivery. Stories creation >50M/day at peak.",
              "difficulty": "hard",
              "company": "Meta"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "twitter-architecture",
          "title": "Twitter Architecture",
          "order": 6,
          "content": {
            "overview": "Twitter serves 330M+ monthly active users processing 500M+ tweets per day. Known for the 'Fail Whale' era (scaling challenges), Twitter's architecture has evolved from Ruby on Rails monolith to a JVM-based microservices platform with sophisticated caching and real-time event processing.",
            "problemStatement": "The 'fan-out problem': when a celebrity with 100M followers tweets, 100M timelines must be updated. Early Twitter used Ruby on Rails with MySQL, famously struggling under load (Fail Whale). Needed a complete re-architecture.",
            "intuitionFirst": "Twitter's fan-out is like a town crier shouting news. If everyone in the city must hear it (fan-out), the crier needs a megaphone (async system). For global announcements, let people come to the town square to read the notice themselves.",
            "realLifeAnalogy": "Breaking news alert: most subscribers get the push notification (fan-out on write). But a press conference by the President (100M followers) is pulled by news stations (fan-out on read) - stations check the wire service when they need the story.",
            "howItWorks": "Tweet flow: (1) User posts tweet. (2) Tweet written to MySQL (user_tweets table, sharded by user_id). (3) Tweet routed to fan-out service. (4) For followers < 100K: push tweet ID to each follower's timeline in Redis (fan-out on write, async queue). (5) For followers > 100K: store tweet in celebrity's timeline in Redis, individual timelines pull on request (fan-out on read). Timeline: (1) Request hits API. (2) Merge timeline from Redis (push-based) + celebrity tweets (pull-based). (3) Return sorted by timestamp. Search: Elasticsearch inverted index. Trends: real-time counting of hashtags in sliding window (Twitter Storm/Heron). Notifications: Kafka + stream processing.",
            "beginnerExample": "// Fan-out service\nasync function fanoutTweet(tweet: Tweet, followers: string[]) {\n  if (followers.length < 100000) {\n    // Push-based: insert tweet ID into each follower's timeline\n    const pipeline = redis.pipeline();\n    for (const follower of followers) {\n      pipeline.lpush(`timeline:${follower}`, tweet.id);\n      pipeline.ltrim(`timeline:${follower}`, 0, 800);\n    }\n    await pipeline.exec();\n  } else {\n    // Pull-based: add to celebrity timeline set\n    await redis.zadd(`celebrity_tweets:${tweet.userId}`, tweet.timestamp, tweet.id);\n    // Followers will pull on timeline request\n  }\n}\n\n// Timeline read (merge push + pull)\nasync function getTimeline(userId: string, page: number) {\n  const pushedTweets = await redis.lrange(`timeline:${userId}`, page * 20, page * 20 + 19);\n  \n  // Also check celebrity followings for pull-based tweets\n  const celebrities = await getCelebrityFollowees(userId);\n  const pullTweets = [];\n  for (const celeb of celebrities) {\n    const tweets = await redis.zrevrange(`celebrity_tweets:${celeb}`, 0, 19);\n    pullTweets.push(...tweets);\n  }\n  \n  // Merge, sort by timestamp, trim\n  const all = [...pushedTweets, ...pullTweets].sort((a, b) => b.timestamp - a.timestamp);\n  return all.slice(0, 20);\n}",
            "commonMistakes": "Fan-out on write for all followers (celebrities kill the system). Using synchronous fan-out (blocking tweet creation). Not handling tweet deletion (timeline cleanup). Not handling unfollow (stale tweets in timeline).",
            "bestPractices": "Hybrid fan-out with threshold (push for <100K, pull for >100K). Async fan-out queue (Kafka) so tweet creation doesn't block. Timeline as list of tweet IDs (not full objects). Cache individual tweets with content. Deletion: tombstone entries in timeline. Unfollow: batch cleanup background job.",
            "interviewPerspective": "Twitter is the classic 'design Twitter' question. Discuss: (1) Fan-out problem: the fundamental challenge. (2) Hybrid push/pull with threshold. (3) Timeline composition: merge push and pull on read. (4) Trending topics: sliding window counting. (5) Search: Elasticsearch. (6) Real-time (Twitter streaming API): persistent connections, Kafka. (7) The Fail Whale era and how they rebuilt (Manhattan, Twemcache, Blender). Stand out: discuss Twitter's migration from Ruby on Rails to JVM (Scala/Java) for performance, Manhattan (custom key-value store), and Twemcache (Memcached fork).",
            "performanceNotes": "500M+ tweets/day. Timeline generation: <100ms P99. Redis clusters: thousands of nodes. Fan-out processing: seconds for regular users, delayed for celebrities. Search: Elasticsearch with near-real-time indexing. Trending: sliding window over 24 hours.",
            "securityNotes": "Tweet privacy: public vs protected accounts, DM encryption. Abuse detection: ML models for spam, harassment. Account verification. Rate limiting API. XSS prevention in tweet rendering."
          },
          "quiz": [
            {
              "id": "sd-tw-1",
              "question": "What is the fan-out problem in Twitter?",
              "options": [
                "When a user with many followers tweets, updating all followers' timelines requires massive write throughput",
                "When too many users tweet simultaneously",
                "When tweets contain too many hashtags",
                "When the search index fails"
              ],
              "correctIndex": 0,
              "explanation": "The fan-out problem: a celebrity tweet must appear in millions of followers' timelines. Pushing to each follower's timeline is a massive write operation. Twitter solved this with hybrid push/pull.",
              "difficulty": "easy"
            },
            {
              "id": "sd-tw-2",
              "question": "What threshold does Twitter use for choosing push vs pull fan-out?",
              "options": [
                "~100K followers",
                "~10K followers",
                "~1M followers",
                "~500 followers"
              ],
              "correctIndex": 0,
              "explanation": "Twitter uses a threshold around 100K followers. Users with fewer followers get push-based fan-out (write to each follower's timeline). Celebrities with more followers get pull-based fan-out (followers fetch from celebrity's timeline on read).",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design Twitter's trending topics. How do you identify what's trending in real-time?",
              "answer": "Real-time counting pipeline: (1) Tweet ingestion: all tweets streamed through Kafka. (2) Tokenization service: extracts hashtags, topics, named entities. (3) Sliding window counter: 10-minute window with 1-minute granularity. Data structure: HyperLogLog for cardinality estimation (unique users per topic). (4) Trending algorithm: burst detection (current rate vs historical baseline). (5) Ranking: normalize by city/country, apply business rules (avoid spam, political manipulation). (6) Storage: trending data in Redis sorted sets per location. (7) Frontend: polling or WebSocket for updates. ML model for trend prediction (velocity + acceleration of topic mentions). Twitter uses Storm (Heron) for real-time stream processing. Scaling: 500K+ tweets/min during events (Super Bowl, elections).",
              "difficulty": "expert",
              "company": "Twitter"
            },
            {
              "question": "Design Twitter's search. How do you index and serve 500M+ tweets/day?",
              "answer": "Based on Earlybird (Twitter's custom search engine): (1) Inverted index built from tweet text, user mentions, hashtags, URLs. (2) Real-time indexing: tweets indexed within seconds of posting. (3) Index sharded by time-based partitions (recent tweets on SSD, older on HDD). (4) Earlybird uses self-contained per-segment indexes (no global merge needed). (5) Query: parse user query, search relevant partitions, score by recency + relevance + engagement (retweets, likes). (6) Filter by: user, language, location, media type. (7) Cache: top queries cached in Redis. (8) For trends and events, pre-compute search results. Modern: Elasticsearch-based for some workloads, custom Earlybird for core search. P99 latency <100ms for typical queries.",
              "difficulty": "expert",
              "company": "Twitter"
            }
          ],
          "codingChallenges": []
        }
      ]
    }
  ]
};

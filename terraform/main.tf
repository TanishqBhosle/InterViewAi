terraform {
  required_version = ">= 1.5"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# VPC
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  name   = "interviewai-vpc"
  cidr   = "10.0.0.0/16"

  azs             = ["ap-south-1a", "ap-south-1b", "ap-south-1c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway   = true
  enable_vpn_gateway   = false
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = { Name = "interviewai", Environment = var.environment }
}

# EKS Cluster
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = "interviewai-cluster"
  cluster_version = "1.28"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  cluster_endpoint_public_access = true

  eks_managed_node_groups = {
    main = {
      desired_size = 3
      min_size     = 3
      max_size     = 10
      instance_types = ["t3.medium"]
    }
  }

  tags = { Name = "interviewai-eks", Environment = var.environment }
}

# RDS PostgreSQL
resource "aws_db_instance" "main" {
  identifier        = "interviewai-db-${var.environment}"
  engine            = "postgres"
  engine_version    = "16"
  instance_class    = "db.t3.medium"
  allocated_storage = 50
  storage_encrypted = true

  db_name  = "interviewai"
  username = "postgres"
  password = random_password.db_password.result

  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name

  backup_retention_period = 30
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"

  storage_type      = "gp3"
  multi_az          = var.environment == "prod" ? true : false
  deletion_protection = var.environment == "prod" ? true : false

  tags = { Name = "interviewai-db", Environment = var.environment }
}

# ElastiCache Redis
resource "aws_elasticache_cluster" "redis" {
  cluster_id      = "interviewai-redis-${var.environment}"
  engine          = "redis"
  node_type       = "cache.t3.medium"
  num_cache_nodes = 1
  parameter_group_name = "default.redis7"
  port            = 6379

  subnet_group_name = aws_elasticache_subnet_group.main.name
  security_group_ids = [aws_security_group.redis.id]

  tags = { Name = "interviewai-redis", Environment = var.environment }
}

# S3 Bucket for uploads
resource "aws_s3_bucket" "uploads" {
  bucket = "interviewai-uploads-${var.environment}"
  force_destroy = var.environment != "prod"
}

resource "aws_s3_bucket_public_access_block" "uploads" {
  bucket = aws_s3_bucket.uploads.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# CloudFront CDN
resource "aws_cloudfront_distribution" "cdn" {
  origin {
    domain_name = aws_s3_bucket.uploads.bucket_regional_domain_name
    origin_id   = "S3-uploads"
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-uploads"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  price_class = "PriceClass_All"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = { Name = "interviewai-cdn", Environment = var.environment }
}

# Security Groups
resource "aws_security_group" "rds" {
  name   = "interviewai-rds-sg"
  vpc_id = module.vpc.vpc_id
  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = module.vpc.private_subnets_cidr_blocks
  }
}

resource "aws_security_group" "redis" {
  name   = "interviewai-redis-sg"
  vpc_id = module.vpc.vpc_id
  ingress {
    from_port   = 6379
    to_port     = 6379
    protocol    = "tcp"
    cidr_blocks = module.vpc.private_subnets_cidr_blocks
  }
}

resource "aws_db_subnet_group" "main" {
  name       = "interviewai-db-subnet-group"
  subnet_ids = module.vpc.private_subnets
}

resource "aws_elasticache_subnet_group" "main" {
  name       = "interviewai-redis-subnet-group"
  subnet_ids = module.vpc.private_subnets
}

resource "random_password" "db_password" {
  length  = 24
  special = false
}

# Variables
variable "aws_region" {
  default = "ap-south-1"
}

variable "environment" {
  default = "prod"
}

# Outputs
output "eks_cluster_endpoint" {
  value = module.eks.cluster_endpoint
}

output "rds_endpoint" {
  value = aws_db_instance.main.endpoint
}

output "redis_endpoint" {
  value = aws_elasticache_cluster.redis.cache_nodes[0].address
}

output "s3_bucket" {
  value = aws_s3_bucket.uploads.id
}

output "cloudfront_domain" {
  value = aws_cloudfront_distribution.cdn.domain_name
}

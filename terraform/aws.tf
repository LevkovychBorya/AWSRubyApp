# Create vpc for application
resource "aws_vpc" "ruby-language-school-vpc" {
  cidr_block       = "10.0.0.0/16"
  instance_tenancy = "default"
  enable_dns_hostnames = true

  tags = {
    Name = "ruby-language-school-vpc"
    ita_group = "Lv-517"
    Language = "Ruby"
    Owner = "Borys"
  }
}

#--------------NAT/Routing/IGW------------------#

# Create internet gateway (virtual router) for application
resource "aws_internet_gateway" "ruby-language-school-internet-gw" {
  vpc_id = aws_vpc.ruby-language-school-vpc.id

  tags = {
    Name = "ruby-language-school-internet-gw"
    ita_group = "Lv-517"
    Language = "Ruby"
    Owner = "Borys"
  }
}

# Create ElasticIP for NAT gateway
resource "aws_eip" "ruby-language-school-eip" {
  vpc      = true

  tags = {
    Name = "ruby-language-school-eip"
    ita_group = "Lv-517"
    Language = "Ruby"
    Owner = "Borys"
  }

}

# Create NAT gatweway inside public subnet
resource "aws_nat_gateway" "ruby-language-school-nat-gw" {
  allocation_id = aws_eip.ruby-language-school-eip.id
  subnet_id     = aws_subnet.ruby-language-school-subnet-public-1a.id

  tags = {
    Name = "ruby-language-school-nat-gw"
    ita_group = "Lv-517"
    Language = "Ruby"
    Owner = "Borys"
  }
}

# Update to use NAT gateway in default routing table
resource "aws_default_route_table" "ruby-language-school-default-route" {
  default_route_table_id = aws_vpc.ruby-language-school-vpc.default_route_table_id

  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.ruby-language-school-nat-gw.id
  }

  tags = {
    Name = "ruby-language-school-default-route"
    ita_group = "Lv-517"
    Language = "Ruby"
    Owner = "Borys"
  }
}

# Create new routing table for public subnet
resource "aws_route_table" "ruby-language-school-public-route" {
  vpc_id = aws_vpc.ruby-language-school-vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.ruby-language-school-internet-gw.id
  }

  tags = {
    Name = "ruby-language-school-public-route"
    ita_group = "Lv-517"
    Language = "Ruby"
    Owner = "Borys"
  }
}

# Define that public subnet will use public routing table
resource "aws_route_table_association" "ruby-language-school-public-1a-association" {
  subnet_id      = aws_subnet.ruby-language-school-subnet-public-1a.id
  route_table_id = aws_route_table.ruby-language-school-public-route.id
}

resource "aws_route_table_association" "ruby-language-school-public-1b-association" {
  subnet_id      = aws_subnet.ruby-language-school-subnet-public-1b.id
  route_table_id = aws_route_table.ruby-language-school-public-route.id
}

#---------------Subnets-----------------#

# Create public subnet for application
resource "aws_subnet" "ruby-language-school-subnet-public-1a" {
  vpc_id     = aws_vpc.ruby-language-school-vpc.id
  cidr_block = "10.0.0.0/24"
  availability_zone = "eu-central-1a"

  tags = {
    Name = "ruby-language-school-subnet-public-1a"
    ita_group = "Lv-517"
    Language = "Ruby"
    Owner = "Borys"
  }
}

# Create public subnet for test database
resource "aws_subnet" "ruby-language-school-subnet-public-1b" {
  vpc_id     = aws_vpc.ruby-language-school-vpc.id
  cidr_block = "10.0.3.0/24"
  availability_zone = "eu-central-1b"

  tags = {
    Name = "ruby-language-school-subnet-public-1b"
    ita_group = "Lv-517"
    Language = "Ruby"
    Owner = "Borys"
  }
}


# Create private subnet for database on 1a avail.zone
resource "aws_subnet" "ruby-language-school-subnet-private-1a" {
  vpc_id     = aws_vpc.ruby-language-school-vpc.id
  cidr_block = "10.0.1.0/24"
  availability_zone = "eu-central-1a"

  tags = {
    Name = "ruby-language-school-subnet-private-1a"
    ita_group = "Lv-517"
    Language = "Ruby"
    Owner = "Borys"
  }
}

# Create private subnet for database pn 2a avail.zone
resource "aws_subnet" "ruby-language-school-subnet-private-1b" {
  vpc_id     = aws_vpc.ruby-language-school-vpc.id
  cidr_block = "10.0.2.0/24"
  availability_zone = "eu-central-1b"

  tags = {
    Name = "ruby-language-school-subnet-private-1b"
    ita_group = "Lv-517"
    Language = "Ruby"
    Owner = "Borys"
  }
}

#-------------Security/DBSubnet Groups---------------#

# Create security group for my application
resource "aws_security_group" "ruby-language-school-sg-app" {
  name        = "ruby-language-school-sg-app"
  description = "Security group for ruby-language-school application"
  vpc_id      = aws_vpc.ruby-language-school-vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ruby-language-school-sg-app"
    ita_group = "Lv-517"
    Language = "Ruby"
    Owner = "Borys"
  }
}

# Create security group for my production database
resource "aws_security_group" "ruby-language-school-sg-db" {
  name        = "ruby-language-school-sg-db"
  description = "Security group for ruby-language-school database"
  vpc_id      = aws_vpc.ruby-language-school-vpc.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    security_groups = [aws_security_group.ruby-language-school-sg-app.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ruby-language-school-sg-db"
    ita_group = "Lv-517"
    Language = "Ruby"
    Owner = "Borys"
  }
}

# Create security group for my test database
resource "aws_security_group" "ruby-language-school-sg-db-public" {
  name        = "ruby-language-school-sg-db-public"
  description = "Security group for ruby-language-school database test"
  vpc_id      = aws_vpc.ruby-language-school-vpc.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ruby-language-school-sg-db-public"
    ita_group = "Lv-517"
    Language = "Ruby"
    Owner = "Borys"
  }
}

# Create subnet group from 2 private subnets
resource "aws_db_subnet_group" "ruby-language-school-db-subnet-group" {
  name       = "ruby-language-school-db-subnet-group"
  description = "Database subnet group for production database"
  subnet_ids = [aws_subnet.ruby-language-school-subnet-private-1a.id, aws_subnet.ruby-language-school-subnet-private-1b.id]

  tags = {
    ita_group = "Lv-517"
    Language = "Ruby"
    Owner = "Borys"
  }
}

# Create subnet group from 2 public subnets
resource "aws_db_subnet_group" "ruby-language-school-db-subnet-group-public" {
  name       = "ruby-language-school-db-subnet-group-public"
  description = "Database subnet group for test database"
  subnet_ids = [aws_subnet.ruby-language-school-subnet-public-1a.id, aws_subnet.ruby-language-school-subnet-public-1b.id]

  tags = {
    ita_group = "Lv-517"
    Language = "Ruby"
    Owner = "Borys"
  }
}

#---------------Tests-------------------#

# Create database for tests
resource "aws_db_instance" "ruby-language-school-db-test" {
  allocated_storage      = 10
  storage_type           = "gp2"
  engine                 = "postgres"
  engine_version         = "9.5.2"
  instance_class         = "db.t2.micro"
  name                   = "rubylanguageschooldbtest"
  identifier             = "rubylanguageschooldbtest"
  username               = var.RDS_USERNAME_TEST
  password               = var.RDS_PASSWORD_TEST
  vpc_security_group_ids = [aws_security_group.ruby-language-school-sg-db-public.id]
  db_subnet_group_name   = aws_db_subnet_group.ruby-language-school-db-subnet-group-public.id
  skip_final_snapshot    = true
  multi_az               = false
  publicly_accessible    = true

  tags = {
    ita_group = "Lv-517"
    Language = "Ruby"
    Owner = "Borys"
  }
}

resource "null_resource" "export_variables" {
  triggers = {
    always_run = "${timestamp()}"
  }
  
  provisioner "local-exec" {
    command = "echo export RDS_HOSTNAME_TEST=${aws_db_instance.ruby-language-school-db-test.address} >> export_var.sh"
  }

  provisioner "local-exec" {
    command = "echo export RDS_DB_NAME_TEST=${aws_db_instance.ruby-language-school-db-test.name} >> export_var.sh"
  }

}

#---------------BeanStalk---------------#

# Create database
resource "aws_db_instance" "ruby-language-school-db" {
  allocated_storage      = 10
  storage_type           = "gp2"
  engine                 = "postgres"
  engine_version         = "9.5.2"
  instance_class         = "db.t2.micro"
  name                   = "rubylanguageschooldb"
  identifier             = "rubylanguageschooldb"
  username               = var.RDS_USERNAME #HERE
  password               = var.RDS_PASSWORD #HERE
  vpc_security_group_ids = [aws_security_group.ruby-language-school-sg-db.id]
  db_subnet_group_name   = aws_db_subnet_group.ruby-language-school-db-subnet-group.id
  skip_final_snapshot    = true
  multi_az               = false

  tags = {
    ita_group = "Lv-517"
    Language = "Ruby"
    Owner = "Borys"
  }
}

# Create beanstalk application
resource "aws_elastic_beanstalk_application" "ruby-language-school-app" {
  name        = "ruby-language-school-app"
  description = "Application for ruby-language-school"

  tags = {
    ita_group = "Lv-517"
    Language = "Ruby"
    Owner = "Borys"
  }
}

# Create beanstalk environment
resource "aws_elastic_beanstalk_environment" "ruby-language-school-env" {
  name                = "ruby-language-school-env"
  description = "Environment for ruby-language-school application"
  application         = aws_elastic_beanstalk_application.ruby-language-school-app.name
  solution_stack_name = "64bit Amazon Linux 2018.03 v2.11.9 running Ruby 2.2 (Passenger Standalone)"
  
  setting {
    namespace = "aws:ec2:vpc"
    name      = "VPCId"
    value     = aws_vpc.ruby-language-school-vpc.id
    resource  = ""
  }

  setting {
    namespace = "aws:ec2:vpc"
    name      = "Subnets"
    value     = aws_subnet.ruby-language-school-subnet-public-1a.id
    resource  = ""
  }

  setting {
    namespace = "aws:autoscaling:asg"
    name      = "MaxSize"
    value     = "1"
    resource  = ""
  }
  
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "SecurityGroups"
    value     = aws_security_group.ruby-language-school-sg-app.id
    resource  = ""
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = "aws-elasticbeanstalk-ec2-role"
    resource  = ""
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "SECRET_KEY_BASE" #HERE
    value     = var.SECRET_KEY_BASE
    resource  = ""
  }
  
setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "RDS_HOSTNAME"
    value     = aws_db_instance.ruby-language-school-db.address
    resource  = ""
  }

 setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "RDS_DB_NAME"
    value     = aws_db_instance.ruby-language-school-db.name
    resource  = ""
  }

setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "RDS_USERNAME"
    value     = aws_db_instance.ruby-language-school-db.username
    resource  = ""
  }

 setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "RDS_PASSWORD"
    value     = aws_db_instance.ruby-language-school-db.password
    resource  = ""
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "EnvironmentType"
    value     = "SingleInstance"
    resource  = ""
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "ServiceRole"
    value     = "aws-elasticbeanstalk-service-role"
    resource  = ""
  }

  tags = {
    ita_group = "Lv-517"
    Language = "Ruby"
    Owner = "Borys"
  }
}

#---------------Variables----------------#

variable "RDS_USERNAME_TEST" {
  type	= string
}

variable "RDS_PASSWORD_TEST" {
  type  = string
}

variable "RDS_USERNAME" {
  type  = string
}

variable "RDS_PASSWORD" {
  type  = string
}

variable "SECRET_KEY_BASE" {
  type  = string
}

terraform {
 backend "s3" {
 bucket = "ruby-language-school-tfstate"
 key = "terraform.tfstate"
 region = "eu-central-1"
 }
}

provider "aws" {
  region = "ap-south-1"
}

terraform {
  backend "s3" {
    bucket = "tf-backend-state-files"
    key    = "food-rating/terraform.tfstate"
    region = "ap-south-1"
  }
}



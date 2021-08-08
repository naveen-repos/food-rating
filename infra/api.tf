data "template_file" "food_rating_swagger" {
  template = file("api.yml")
  vars = {
    index               = aws_lambda_function.food_rating.invoke_arn
    execution_role      = aws_iam_role.food_rating_gateway_role.arn
    terraform_workspace = terraform.workspace
  }
}

resource "aws_api_gateway_rest_api" "food_rating" {
  name        = "${terraform.workspace}_food_rating"
  description = "${terraform.workspace} food_rating"
  body        = data.template_file.food_rating_swagger.rendered
}

resource "aws_api_gateway_deployment" "food_rating_deployment" {
  rest_api_id = aws_api_gateway_rest_api.food_rating.id
  stage_name  = "v1"
  lifecycle {
    create_before_destroy = true
  }
  stage_description = filemd5("api.yml")
  variables = {
    file_hash = filemd5("api.tf")
  }
}

output "invocation_URL_new_api" {
  value = aws_api_gateway_deployment.food_rating_deployment.invoke_url
}
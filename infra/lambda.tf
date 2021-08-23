
resource "aws_lambda_layer_version" "layer" {
  filename            = "../lambda/dist/layer.zip"
  source_code_hash    = filebase64sha256("../lambda/dist/layer.zip")
  layer_name          = "${terraform.workspace}_food_rating_layer"
  compatible_runtimes = [ "nodejs12.x" , "nodejs14.x"]
}


resource "aws_lambda_function" "food_rating" {
  function_name    = "${terraform.workspace}_food_rating"
  handler          = "index.handler"
  role             = aws_iam_role.food_rating.arn
  runtime          = "nodejs12.x"
  layers           = [aws_lambda_layer_version.layer.arn]
  filename         = "../lambda/dist/food-rating.zip"
  source_code_hash = filebase64sha256("../lambda/dist/food-rating.zip")
  timeout          = 30
  memory_size      = 1024
environment {
  variables = {
    serectId = "stg-food-rating"
  }
}
}

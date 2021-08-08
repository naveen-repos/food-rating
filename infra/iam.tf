resource "aws_iam_role" "food_rating" {
  name               = "${terraform.workspace}_food_rating_role"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "lambda_vpc_basic_excution_policy_attachment" {
  role       = aws_iam_role.food_rating.id
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}

resource "aws_iam_role" "food_rating_gateway_role" {
  name               = "${terraform.workspace}_food_rating_gateway_role"
  assume_role_policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
    {
        "Effect": "Allow",
        "Principal": {
        "Service": "apigateway.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
    }
    ]
}
EOF
}

resource "aws_iam_policy" "food_rating_gateway_policy" {
  name        = "${terraform.workspace}_food_rating_gateway_policy"
  description = "Policy For Public cache Gateway Api Gateway"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "lambda:InvokeFunction"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "food_rating_attach" {
  role       = aws_iam_role.food_rating_gateway_role.name
  policy_arn = aws_iam_policy.food_rating_gateway_policy.arn
}

resource "aws_lambda_permission" "lambda_permission" {
  statement_id  = "AllowMyDemoAPIInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.food_rating.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.food_rating.execution_arn}/*/*"
}




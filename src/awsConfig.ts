import * as cdk from '@aws-cdk/core'
import * as lambda from '@aws-cdk/aws-lambda'
import * as apigateway from '@aws-cdk/aws-apigateway'

export class awsConfig extends cdk.Stack {
    constructor(scope: cdk.Construct , id: string , props?: cdk.StackProps){
        super(scope , id , props)

        const graphqlLambda = new lambda.Function(this , 'GraphQLLambda' , {
            runtime: lambda.Runtime.NODEJS_16_X,
            handler: 'index.handler',
            code: lambda.Code.fromAsset('lambda')
        })

         const api = new apigateway.RestApi(this, 'GraphqlApi')

         const resource = api.root.addResource('graphql')
         const integration = new apigateway.LambdaIntegration(graphqlLambda)

         resource.addMethod('POST' , integration)

    }
}
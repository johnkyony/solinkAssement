import * as cdk from '@aws-cdk/core'
import {awsConfig} from './awsConfig'

const app = new cdk.App()
new awsConfig(app , 'awsConfig')
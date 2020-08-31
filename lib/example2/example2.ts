import * as cdk from '@aws-cdk/core';
import {CloudfrontS3MultipleBuckets} from "./cloudfront-s3-multiple-buckets";

export class Example2 extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CloudfrontS3MultipleBuckets(this, "test-cloudfront", {});
  }
}

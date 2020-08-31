import {Construct, Stack, StackProps} from "@aws-cdk/core";
import {Bucket, BucketPolicy} from "@aws-cdk/aws-s3";

export interface BucketUserStackProps extends StackProps {
    bucket:Bucket;
}

export class BucketUserStack extends Stack {


    constructor(scope: Construct, id: string, props: BucketUserStackProps) {
        super(scope, id, props);

        console.log(`Here I can use the bucket: ${props.bucket.bucketArn}`);

        // props.bucket.policy?.document.addStatements({...})

        // props.bucket.policy = new BucketPolicy(this, "bucketpolicy", {...})
    }
}

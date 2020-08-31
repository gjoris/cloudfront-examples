import {Construct, Stack, StackProps} from "@aws-cdk/core";
import {BucketStack} from "./BucketStack";
import {BucketUserStack} from "./BucketUserStack";

export class Example1 extends Stack {

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        let bucketStack = new BucketStack(this, "bucket-stack");

        new BucketUserStack(this, "bucket-user-stack", {
            bucket: bucketStack.bucket
        })
    }
}

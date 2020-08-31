import {Construct, Stack, StackProps} from "@aws-cdk/core";
import {Bucket} from "@aws-cdk/aws-s3";

export class BucketStack extends Stack {

    private _bucket:Bucket;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this._bucket = new Bucket(this, "my-bucket");

    }

    get bucket(): Bucket {
        return this._bucket;
    }
}

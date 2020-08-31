import {Construct, Stack, StackProps} from "@aws-cdk/core";
import {Bucket} from "@aws-cdk/aws-s3";
import {
    CloudFrontAllowedCachedMethods,
    CloudFrontAllowedMethods,
    CloudFrontWebDistribution,
    OriginAccessIdentity
} from "@aws-cdk/aws-cloudfront";
import {BucketDeployment, Source} from "@aws-cdk/aws-s3-deployment";

export class CloudfrontS3MultipleBuckets extends Stack {


    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        let www1Bucket = new Bucket(this, "s3-website-bucket-www1", {
            websiteIndexDocument: "index.html",
            websiteErrorDocument: "error.html"
        });

        new BucketDeployment(this, "www1-deployment", {
            sources: [Source.asset("./assets/www1")],
            destinationBucket: www1Bucket
        });

        let www2Bucket = new Bucket(this, "s3-website-bucket-www2", {
            websiteIndexDocument: "index.html",
            websiteErrorDocument: "error.html"
        });

        new BucketDeployment(this, "www2-deployment", {
            sources: [Source.asset("./assets/www2")],
            destinationBucket: www2Bucket,
            destinationKeyPrefix: "www2/"
        });

        let www3Bucket = new Bucket(this, "s3-website-bucket-www3", {
            websiteIndexDocument: "index.html",
            websiteErrorDocument: "error.html"
        });

        new BucketDeployment(this, "www3-deployment", {
            sources: [Source.asset("./assets/www3")],
            destinationBucket: www3Bucket,
            destinationKeyPrefix: "www3/"
        });

        let identity1 = new OriginAccessIdentity(this, "www1-identity");

        let identity2 = new OriginAccessIdentity(this, "www2-identity");

        let identity3 = new OriginAccessIdentity(this, "www3-identity");

        let distribution = new CloudFrontWebDistribution(this, "cloudfront", {
            errorConfigurations: [
                {
                    responsePagePath: "/error.html",
                    responseCode: 404,
                    errorCode: 404,
                    errorCachingMinTtl: 300
                }
            ],
            originConfigs: [
                {
                    s3OriginSource: {
                        s3BucketSource: www1Bucket,
                        originAccessIdentity: identity1
                    },
                    behaviors: [
                        {
                            isDefaultBehavior: true,
                            pathPattern: "www1/*",
                            allowedMethods: CloudFrontAllowedMethods.ALL,
                            cachedMethods: CloudFrontAllowedCachedMethods.GET_HEAD_OPTIONS
                        }
                    ]
                },
                {
                    s3OriginSource: {
                        s3BucketSource: www2Bucket,
                        originAccessIdentity: identity2
                    },
                    behaviors: [
                        {
                            pathPattern: "www2/*",
                            allowedMethods: CloudFrontAllowedMethods.ALL,
                            cachedMethods: CloudFrontAllowedCachedMethods.GET_HEAD_OPTIONS
                        }
                    ]
                },
                {
                    s3OriginSource: {
                        s3BucketSource: www3Bucket,
                        originAccessIdentity: identity3
                    },
                    behaviors: [
                        {
                            pathPattern: "www3/*",
                            allowedMethods: CloudFrontAllowedMethods.ALL,
                            cachedMethods: CloudFrontAllowedCachedMethods.GET_HEAD_OPTIONS
                        }
                    ]
                }
            ]
        });

    }


}

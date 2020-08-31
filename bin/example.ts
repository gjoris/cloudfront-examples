#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import {Example2} from '../lib/example2/example2';
import {Example1} from "../lib/example1/example1";

const app = new cdk.App();
// new Example1(app, 'Example1Stack');
new Example2(app, 'Example2Stack');
app.synth();

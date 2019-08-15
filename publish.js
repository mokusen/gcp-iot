/**
 * 参照：https://github.com/GoogleCloudPlatform/nodejs-docs-samples/blob/master/iot/http_example/cloudiot_http_example.js
 */

'use strict';

const config = require('config')
const jwtService = require('./app/jwtService')
const publishService = require('./app/publishService')

// 初期値設定
const authToken = jwtService.createJwt(config.projectId, config.privateKeyFile, config.algorithm)
publishService.mqttPublish(authToken)

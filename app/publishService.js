/**
 * 参照：https://github.com/GoogleCloudPlatform/nodejs-docs-samples/blob/master/iot/http_example/cloudiot_http_example.js
 * 参照：http://kmth23.hatenablog.com/entry/2018/04/12/000149
 */

'use strict';

const config = require('config');
const mqtt = require('mqtt');
const exec = require('child_process').exec;

function mqttPublish(authTokenJwt) {
    // 初期設定設定
    const mqttClientId = `projects/${config.projectId}/locations/${config.cloudRegion}/registries/${config.registryId}/devices/${config.deviceId}`;
    const connectionArgs = {
        host: config.mqttBridgeHostname,
        port: config.mqttBridgePort,
        clientId: mqttClientId,
        username: 'unused',
        password: authTokenJwt,
        protocol: 'mqtts',
        secureProtocol: 'TLSv1_2_method',
    }

    // Create a client, and connect to the Google MQTT bridge.
    const client = mqtt.connect(connectionArgs);
    client.subscribe(`/devices/${config.deviceId}/config`)

    // The MQTT topic that this device will publish data to. The MQTT topic name is
    // required to be in the format below. The topic name must end in 'state' to
    // publish state and 'events' to publish telemetry. Note that this is not the
    // same as the device registry's Cloud Pub/Sub topic.
    const mqttTopic = `/devices/${config.deviceId}/${config.messageType}`;

    client.on('connect', success => {
        console.log('connect');
        if (!success) {
            console.log('Client not connected...');
        } else {
            setInterval(() => {
                exec('python3 /home/pi/open/temp/gettemp_gcp.py', (error, stdout, stderr) => {
                    if (error !== null) {
                        console.log('exec error: ' + error)
                        return
                    }
                    const data = stdout.replace("\n","");
                    const datas = data.split(",");
                    const record = {
                        temperature: Number(datas[0]),
                        humidity: Number(datas[1])
                    };
                    const payload = JSON.stringify(record);
                    console.log("Publish: " + payload);
                    client.publish(mqttTopic, payload, {qos: 1});
                });
                return;
            }, 5000);
        }
      });

    client.on('close', () => {
        console.log('close');
    });

    client.on('error', err => {
        console.log('error', err);
    });

    client.on('message', (topic, message) => {
        let messageStr = 'Message received: ';
        if (topic === `/devices/${config.deviceId}/config`) {
            messageStr = 'Config message received: ';
        } else if (topic === `/devices/${config.deviceId}/commands`) {
            messageStr = 'Command message received: ';
        }

        messageStr += Buffer.from(message, 'base64').toString('ascii');
        console.log(messageStr);
    });
}

module.exports.mqttPublish = mqttPublish
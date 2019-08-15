# gcp-iot
テスト的にローカルRaspberry PiからGCP IoT Coreへ温度、湿度データを送る。

## 注意事項
- JWTが20分設定になっているので、長時間稼働は考えてない。（Ver1.0）
- Ver2.0以降で大本の[GCP Node.js Client](https://github.com/GoogleCloudPlatform/nodejs-docs-samples/blob/master/iot/mqtt_example/cloudiot_mqtt_example_nodejs.js)を自分好みに改修して、長時間稼働を考慮する。
- 温湿度センサのDHT11を使用します。

## 動作環境
| 言語 | バージョン |
| :--- | :--- |
| Python | 3.7.2以上 |
| Node.js | v10.16.2(LTS) |

## sample.json
- このあとの過程でdevelopment.jsonに変更する

| 項目 | 内容 |
| :--- | :--- |
| cloudRegion | GCP IoT Coreのリージョン |
| projectId | GCPプロジェクトのID |
| registryId | GCP IoT CoreのレジストリID |
| deviceId | GCP IoT CoreのデバイスID |
| privateKeyFile | ラズパイに配置した秘密鍵パス（GCP IoT Coreに配置した公開鍵に対応すること） |
| algorithm | 変換形式 |
| tokenExpMins | JWTが期限切れになる分数 |
| mqttBridgeHostname | GCP IoT CoreへのURL（デフォルト固定） |
| mqttBridgePort | GCP IoT CoreへのPort（デフォルト固定 |
| messageType | GCP IoT Coreへの送信タイプ（デフォルト固定） |
| interval | GCP IoT Coreへ送る間隔[ms] |

## 使い方
1. Clone
    ```bash
    # Current確認
    pwd
    # /home/{username}

    git clone git@github.com:mokusen/gcp-iot.git

    cd gcp-iot
    ```

2. 初期設定をする
    ```bash
    npm install

    pwd
    # /home/{username}/gcp-iot

    # configパッケージを使用するため、領域作成
    mkdir config

    # sample.jsonを移動する
    mv sample.json /config/development.json
    ```

3. 稼働開始
    ```bash
    node publish.js
    ```
const jwt = require('jsonwebtoken');
const fs = require('fs')

/**
 * JWTを作成する
 * @param projectId {string} - GCPのプロジェクトID
 * @param privateKeyFile {string} - ローカルの秘密鍵パス
 * @param algorithm {string} - 秘密鍵作成手法
 * @reutrn jwt.sign
 */
function createJwt(projectId, privateKeyFile, algorithm) {
    // Create a JWT to authenticate this device. The device will be disconnected
    // after the token expires, and will have to reconnect with a new token. The
    // audience field should always be set to the GCP project id.
    const token = {
        iat: parseInt(Date.now() / 1000),
        exp: parseInt(Date.now() / 1000) + 20 * 60, // 20 minutes
        aud: projectId,
    };
    const privateKey = fs.readFileSync(privateKeyFile);
    return jwt.sign(token, privateKey, {algorithm: algorithm});
}

module.exports.createJwt = createJwt
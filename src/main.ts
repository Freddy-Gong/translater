const CryptoJS = require("crypto-js");
import * as https from 'https'
import * as querystring from 'querystring'

export const translate = (text: string) => {
    const appKey = '47393dc71bdfd82e'
    const salt = (new Date).getTime();
    const curtime = Math.round(new Date().getTime() / 1000);
    const Key = 'DkgkKXaMc6bofg5JScDP7aSMRLfSu2OU'
    const sign = CryptoJS.SHA256(appKey + text + salt + curtime + Key).toString(CryptoJS.enc.Hex);
    let from, to
    if (/[a-zA-Z]/.test(text[0])) {
        from = 'zh-CHS'
        to = 'en'
    } else {
        from = 'en'
        to = 'zh-CHS'
    }
    const query: string = querystring.stringify({ q: text, from, to, signType: "v3", appKey, salt, curtime, sign })
    const options = {
        hostname: 'openapi.youdao.com',
        port: 443,
        path: '/api?' + query,
        method: 'GET'
    };

    const request = https.request(options, (response) => {
        const chunks: Buffer[] = []
        response.on('data', (chunk) => {
            chunks.push(chunk)
        });

        response.on('end', () => {
            type result = {
                value: string[],
                key: string
            }
            const string = Buffer.concat(chunks).toString()
            const object = JSON.parse(string)
            if (object.errorCode === '0') {
                const results = object['basic']?.['explains']
                if (results) {
                    console.log(results)
                } else {
                    console.log('无对应翻译，请检查拼写')
                }
                object["web"]?.map((item: result) => {
                    console.log(item['key'] + ':' + item['value'])
                })
                process.exit(0)
            } else {
                console.log('出现错误,请检查账号密码')
                process.exit(2)
            }

        });
    });
    request.on('error', (e) => {
        console.error(e);
    });
    request.end();
}

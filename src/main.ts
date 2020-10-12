const CryptoJS = require("crypto-js");
import * as https from 'https'
import { type } from 'os';
import * as querystring from 'querystring'

export const translate = (world) => {
    console.log(world)
    const appKey = '47393dc71bdfd82e'
    const salt = (new Date).getTime();
    const curtime = Math.round(new Date().getTime() / 1000);
    const Key = 'DkgkKXaMc6bofg5JScDP7aSMRLfSu2OU'
    const sign = CryptoJS.SHA256(appKey + world + salt + curtime + Key).toString(CryptoJS.enc.Hex);
    console.log(sign)

    const query: string = querystring.stringify({ q: world, form: 'zh-CHS', to: 'en', signType: "v3", appKey, salt, curtime, sign })
    const options = {
        hostname: 'openapi.youdao.com',
        port: 443,
        path: '/api?' + query,
        method: 'GET'
    };

    const request = https.request(options, (response) => {
        const chunks = []
        response.on('data', (chunk) => {
            chunks.push(chunk)
        });

        response.on('end', () => {
            const string = Buffer.concat(chunks).toString()
            const object = JSON.parse(string)
            // type result = {
            //     value: string[],
            //     key: string
            // }
            // type YouDaoResult = {
            //     errorCode: string,
            //     query: string,
            //     translation: string[],
            //     basic: [k: string]: [v:string],
            //     web: result[],
            //     l: string,
            //     dict: [k: string]: string,
            //     webdict: [k: string]: string,
            //     tSpeakUrl: string,
            //     speakUrl: string,
            //     returnPhrase: string[]
            // }
            object["web"].map((item) => {
                console.log(item['key'] + ':' + item['value'])
            })
        });
    });

    request.on('error', (e) => {
        console.error(e);
    });
    request.end();
}

//ts -> .d.ts 翻译文件 -> js
import superagent from 'superagent';
class Crowller {
    private secret = 'secretKey';
    private url = 'https://space.bilibili.com/19121704';

    private rawHtml = '';
    async getRawHtml(){
        const result = await superagent.get(this.url)
        console.log(result.text)
    }
    constructor(){
        this.getRawHtml();

    }
}

const crowller = new Crowller();

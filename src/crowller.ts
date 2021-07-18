//ts -> .d.ts 翻译文件 -> js
import superagent from 'superagent';
import cherrio from 'cheerio'
import fs from 'fs';
import path from 'path'
import { data } from 'cheerio/lib/api/attributes';
interface hot{
    data:string;
}

interface CourseResult {
    time:number,
    data:hot[]
}

interface Content {
    [propName:number]:hot
}
class Crowller {
    private secret = 'secretKey';
    private url = 'https://s.weibo.com/top/summary';
    // private rawHtml = '';

    getCourseInfo(html:string){
        const $ = cherrio.load(html);
        const td = $('.td-02');
        const tds:hot[] = []
        // console.log(td)
        td.map((index,element)=>{
            const box = $(element).find('a').text();
            // console.log(box);
            tds.push({data:box})

        })
        return {
            time:(new Date()).getTime(),
            data: tds
        }

    }

    async getRawHtml(){
        const result = await superagent.get(this.url)
        // console.log(result.text)
        return result.text


    }
    generateJsonContent(courseInfo:CourseResult){
        const filePath = path.resolve(__dirname,'../data/title.json');
        let fileContent = {};
        if(fs.existsSync(filePath)){
            fileContent = JSON.parse(fs.readFileSync(filePath,'utf-8'));
        }
        console.log(courseInfo.data)
        fileContent = courseInfo.data;
        
        fs.writeFileSync(filePath,JSON.stringify(fileContent))
        // console.log(fileContent)
    }
    async initSpiderProcess(){
        const html = await this.getRawHtml();
        const courseInfo = this.getCourseInfo(html)
        this.generateJsonContent(courseInfo);
        console.log(courseInfo)
    }
    constructor(){
        this.initSpiderProcess();

    }
}

const crowller = new Crowller();

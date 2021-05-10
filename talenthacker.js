const request = require('request');

let urls = [];

function requestPromise(link)
{
    return new Promise( (resolve, reject) => {
        request(link, (err, res, body) => {
            if (!err) {
                resolve(body);
            }
            else {
                reject(err);
            }
        });
    });
}

module.exports = (link, affiliate, max_size = 3) => {
    return new Promise( async (resolve, reject) => {       
        try {
            const body = await requestPromise(link);

            const script = body.match(/<script>window\.__INITIAL_STATE__=(.*?)<\/script>/);
    
            const json = JSON.parse(script[1]);
            
            const jobs = json.allJobs.splice(0, max_size).reverse();

            const links = jobs.map(job => `${link}${job.area}/${job.slug}${affiliate}`);

            const newUrls = links.filter(l => !urls.includes(l));

            urls = [...newUrls, ...urls];
            if (urls.length > max_size) {
                urls = urls.splice(0, max_size);
            }
            
            resolve(newUrls);
        }
        catch(error){
            reject(error);
        }        
    });    
}
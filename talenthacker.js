const request = require('request');
 
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
 
let mins = 0;
module.exports = (date, link, affiliate) => {
    return new Promise( async (resolve, reject) => {       
        try {
            let lastestDate;
            const urls = [];
 
            /*const body = await requestPromise(link);
 
            const script = body.match(/<script>window\.__INITIAL_STATE__=(.*?)<\/script>/);
    
            const json = JSON.parse(script[1]);
            
            const jobs = json.allJobs.splice(0, 5);*/
 
            const jobs = [
                {
                    body: 'Actualizado hace 1 horas',
                    link: 'https://talenthackers.net/spots/Development/tech-leadcto-441'
                },
                {
                    body: 'Actualizado hace 2 horas',
                    link: 'https://talenthackers.net/spots/Digital/customer-success-manager-tech-427'
                },
                {
                    body: 'Actualizado hace 3 horas',
                    link: 'https://talenthackers.net/spots/SysOps/administrador-de-sistemas-439'
                }
            ];
 
            for(let job of jobs) {
                //const jobLink = `${link}${job.area}/${job.slug}`;
                const jobLink = job.link;
                const now = new Date();
                //const jobBody = await requestPromise(jobLink);
                const jobBody = job.body;
 
                let actualizado = jobBody.match(/Actualizado hace (\d+) horas/);
                if (actualizado) {                                                    
                    //const published = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()) - actualizado[1] * 3600000;
                    const published = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()) - actualizado[1] * 3600000 + mins * 60000;
                    console.log(`${new Date(published)} > ${new Date(date)}`);
                    if (published > date) {
                        lastestDate = lastestDate ? Math.max(lastestDate, published) : published;
                        urls.push(jobLink+affiliate);
                    }
                }
            }
 
            mins++;
            resolve({urls, lastestDate});
        }
        catch(error){
            reject(error);
        }        
    });    
}
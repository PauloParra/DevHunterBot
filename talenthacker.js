const request = require('request');

function requestPromise(link) {
    return new Promise((resolve, reject) => {
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

module.exports = (date, link, affiliate) => {
    return new Promise(async (resolve, reject) => {
        try {
            let lastestDate;
            const urls = [];

            const body = await requestPromise(link);

            const script = body.match(/<script>window\.__INITIAL_STATE__=(.*?)<\/script>/);

            const json = JSON.parse(script[1]);

            const jobs = json.allJobs.splice(0, 5);

            for (let job of jobs) {
                const jobLink = `${link}${job.area}/${job.slug}`;
                const now = new Date(new Date().toLocaleString("en-US", {timeZone: 'Etc/GMT+2'}));
                const jobBody = await requestPromise(jobLink);

                let actualizado = jobBody.match(/Actualizado hace (\d+) horas/);
                if (actualizado) {
                    console.log(`Actualizado hace ${actualizado[1]} horas. Ahora: ${new Date()}`);
                    const published = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()) - actualizado[1] * 3600000;
                    console.log(`${new Date(published)} > ${new Date(date)}`);
                    if (published > date) {
                        lastestDate = lastestDate ? Math.max(lastestDate, published) : published;
                        urls.push(jobLink + affiliate);
                    }
                }
            }

            resolve({ urls, lastestDate });
        }
        catch (error) {
            reject(error);
        }
    });
}
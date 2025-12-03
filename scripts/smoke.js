const http = require('http');
const endpoints = ['/', '/healthz', '/assets/js/main.js'];
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;

function check(url){
  return new Promise((resolve) => {
    http.get({ host, port, path: url, timeout: 3000 }, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => resolve({ url, error: e.message }));
  });
}

(async ()=>{
  const results = [];
  for(const e of endpoints){
    results.push(await check(e));
  }
  console.log(JSON.stringify(results, null, 2));
  const failed = results.find(r => (r.status && r.status >= 400) || r.error);
  process.exit(failed ? 1 : 0);
})();
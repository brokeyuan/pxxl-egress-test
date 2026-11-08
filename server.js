const http = require('http');
const port = process.env.PORT || 8080;
async function getText(url){ const r = await fetch(url, {headers:{'User-Agent':'curl/8'}}); return await r.text(); }
const server = http.createServer(async (req,res)=>{
  let out = '';
  try { out = await getText('https://ipinfo.io/json'); }
  catch(e){ try { out = 'ipinfo failed: ' + e.message + ' | fallback: ' + await getText('https://ifconfig.co/json'); } catch(e2){ out = 'both failed: ' + e.message + ' / ' + e2.message; } }
  res.writeHead(200, {'Content-Type':'application/json'});
  res.end(JSON.stringify({egress_lookup: out, when: new Date().toISOString()}, null, 2));
});
server.listen(port, '0.0.0.0', ()=>console.log('listening on ' + port));

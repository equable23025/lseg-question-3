const axios = require('axios');
const cheerio = require('cheerio');

async function main() {
  const args = process.argv.slice(2);
  const fundNameArgInput = args[0];
  if (!fundNameArgInput) {
    console.error('Please provide a fund name as an argument eg. node index.js <FUND_NAME>');
    process.exit(1);
  }

  const response = await axios.get('https://codequiz.azurewebsites.net/', { headers: { 'Cookie': 'hasCookie=true' }})
  const $ = cheerio.load(response.data);
  
  const trElements = $('table tr')
  const rowLength = trElements.length;
  for (let i = 1 ; i < rowLength ; i++) {
    const tdElements = trElements.eq(i).children('td');
    const fundName = tdElements.eq(0).text();
    const nav = tdElements.eq(1).text();

    if (fundName.trim().toLowerCase() === fundNameArgInput.trim().toLowerCase()) {
      console.log(nav);
      process.exit(0);
    }
  }
  
  console.log(`Fund ${fundNameArgInput} not found`);
  process.exit(1);
}
main();
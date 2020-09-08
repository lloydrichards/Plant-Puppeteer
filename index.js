const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const { Cluster } = require('puppeteer-cluster');

(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 5,
  });

  const urlArray = Array.from(
    { length: 1758 },
    (_, i) => 'https://plantdatabase.kpu.ca/plant/plantDetail/' + (i + 1)
  );

  const results = [];
  const count = 0,

  await cluster.task(async ({ page, data: url }) => {
    await page.goto(url);
    let data = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('table tr'));

      const data = Array.from(rows, (rows) => {
        const columns = rows.querySelectorAll('td');
        return Array.from(columns, (column) => column.innerText);
      });
      const scientificName = data.find((i) => i[0] === 'Scientific Name:');
      const commonName = data.find((i) => i[0] === 'Common Name:');
      const familyName = data.find((i) => i[0] === 'Family Name:');
      const plantType = data.find((i) => i[0] === 'Plant Type:');
      const keyFeatures = data.find((i) => i[0] === 'Key ID Features:');

      const habitat = data.find((i) => i[0] === 'Habit:');
      const form = data.find((i) => i[0] === 'Form:');
      const height = data.find((i) => i[0] === 'Height:');
      const spread = data.find((i) => i[0] === 'Spread:');
      const growthRate = data.find((i) => i[0] === 'Growth Rate:');
      const origin = data.find((i) => i[0] === 'Origin:');
      const hardiness = data.find((i) => i[0] === 'Hardiness Rating:');
      const exposure = data.find((i) => i[0] === 'Exposure:');
      const soil = data.find((i) => i[0] === 'Soil/ Growing Medium:');
      const water = data.find((i) => i[0] === 'Water Use:');

      const inflorescence = data.find((i) => i[0] === 'Inflorescence Type:');
      const flowerMorphology = data.find((i) => i[0] === 'Flower Morphology:');
      const petalNumber = data.find((i) => i[0] === 'Number of Petals:');
      const petalColour = data.find((i) => i[0] === 'Colour (petals):');
      const flowerScent = data.find((i) => i[0] === 'Flower Scent:');
      const flowerTime = data.find((i) => i[0] === 'Flower Time at Peak:');
      const fruitType = data.find((i) => i[0] === 'Fruit Type:');
      const fruitColour = data.find((i) => i[0] === 'Fruit Colour:');
      const fruitTime = data.find((i) => i[0] === 'Fruiting Time:');

      const propagation = data.find((i) => i[0] === 'Propagation:');
      const optimalTemp = data.find((i) => i[0] === 'Optimal Temp.:');
      const optimalLight = data.find((i) => i[0] === 'Light Level:');
      const maintenance = data.find((i) => i[0] === 'Maintenance:');
      const pests = data.find((i) => i[0] === 'Pest Susceptibility:');

      return {
        scientificName: scientificName ? scientificName[1] : 'n/a',
        commonName: commonName
          ? commonName[1].split(' or ').join(', ').split(', ')
          : 'n/a',
        familyName: familyName ? familyName[1] : 'n/a',
        plantType: plantType ? plantType[1].split(', ') : 'n/a',
        keyFeatures: keyFeatures ? keyFeatures[1] : 'n/a',
        habitat: habitat ? habitat[1].split(', ') : 'n/a',
        form: form ? form[1].split(',') : 'n/a',
        minHeight: height
          ? height[1].includes('>')
            ? +height[1].replace('> ', '').replace('m', '')
            : +height[1].split(' - ')[0]
          : 'n/a',
        maxHeight: height
          ? height[1].includes('>')
            ? +height[1].replace('> ', '').replace('m', '')
            : +height[1].split(' - ')[1].replace('m', '')
          : 'n/a',
        minSpread: spread
          ? spread[1].includes('>')
            ? +spread[1].replace('> ', '').replace('m', '')
            : +spread[1].split(' - ')[0]
          : 'n/a',
        maxSpread: spread
          ? spread[1].includes('>')
            ? +spread[1].replace('> ', '').replace('m', '')
            : +spread[1].split(' - ')[1].replace('m', '')
          : 'n/a',
        growthRate: growthRate ? growthRate[1] : 'n/a',
        origin: origin ? origin[1].split(', ') : 'n/a',
        hardiness: hardiness ? hardiness[1].split(':')[0] : 'n/a',
        exposure: exposure ? exposure[1].split(', ') : 'n/a',
        soil: soil ? soil[1].split(' or ').join(', ').split(', ') : 'n/a',
        water: water ? water[1].split(', ') : 'n/a',
        inflorescence: inflorescence ? inflorescence[1] : 'n/a',
        flowerMorphology: flowerMorphology ? flowerMorphology[1] : 'n/a',
        petalNumber: petalNumber ? +petalNumber[1] : 'n/a',
        petalColour: petalColour ? petalColour[1].split(', ') : 'n/a',
        flowerScent: flowerScent ? flowerScent[1] : 'n/a',
        flowerTime: flowerTime ? flowerTime[1].split(', ') : 'n/a',
        fruitType: fruitType ? fruitType[1] : 'n/a',
        fruitColour: fruitColour ? fruitColour[1].split(',') : 'n/a',
        fruitTime: fruitTime ? fruitTime[1].split(', ') : 'n/a',
        propagation: propagation ? propagation[1].split(', ') : 'n/a',
        optimalTemp: optimalTemp ? optimalTemp[1].splite(', ') : 'n/a',
        optimalLight: optimalLight ? optimalLight[1].splite(', ') : 'n/a',
        maintenance: maintenance ? maintenance[1].splite(', ') : 'n/a',
        pests: pests
          ? pests[1]
              .replace(' or ', ', ')
              .replace('( ', '')
              .replace(' )', '')
              .split(', ')
          : 'n/a',
      };
    });
    count++;
    console.log('Number of records: ', count);
    await results.push(data);
  });

  urlArray.forEach((i) => {
    cluster.queue(i);
  });

  await cluster.idle();
  await cluster.close();

  await fs.writeFile('plant-data.json', JSON.stringify(results));
})();

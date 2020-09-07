const puppeteer = require('puppeteer');

const findPlantData = async (index) => {
  let url = `https://plantdatabase.kpu.ca/plant/plantDetail/${index}`;
  //Set up chromium browser and open new page.
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  //send bowser to stored page
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
      commonName: commonName ? commonName[1].split(' or ') : 'n/a',
      familyName: familyName ? familyName[1] : 'n/a',
      plantType: plantType ? plantType[1] : 'n/a',
      keyFeatures: keyFeatures ? keyFeatures[1] : 'n/a',
      habitat: habitat ? habitat[1] : 'n/a',
      form: form ? form[1] : 'n/a',
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
      minSpread: spread ? +spread[1].split(' - ')[0] : 'n/a',
      maxSpread: spread ? +spread[1].split(' - ')[1].replace('m', '') : 'n/a',
      growthRate: growthRate ? growthRate[1] : 'n/a',
      origin: origin ? origin[1] : 'n/a',
      hardiness: hardiness ? hardiness[1].split(':')[0] : 'n/a',
      exposure: exposure ? exposure[1] : 'n/a',
      soil: soil ? soil[1] : 'n/a',
      water: water ? water[1] : 'n/a',
      inflorescence: inflorescence ? inflorescence[1] : 'n/a',
      flowerMorphology: flowerMorphology ? flowerMorphology[1] : 'n/a',
      petalNumber: petalNumber ? +petalNumber[1] : 'n/a',
      petalColour: petalColour ? petalColour[1] : 'n/a',
      flowerScent: flowerScent ? flowerScent[1] : 'n/a',
      flowerTime: flowerTime ? flowerTime[1].split(', ') : 'n/a',
      fruitType: fruitType ? fruitType[1] : 'n/a',
      fruitColour: fruitColour ? fruitColour[1] : 'n/a',
      fruitTime: fruitTime ? fruitTime[1].split(', ') : 'n/a',
      propagation: propagation ? propagation[1] : 'n/a',
      pests: pests ? pests[1].split(', ') : 'n/a',
    };
  });
  console.log(data);
  await browser.close();
  return data;
};

console.log('Starting to Scrap!');
findPlantData(2);

// const  openNewBrowser = require('../common/method')
const path = require('path');
const {  rules } = require('../constants/bonvelo.constant')
// const fs = require('fs')
// const f= require()
const getPuppeteer = () => {
    const puppeteer = require('puppeteer-extra');
    const StealthPlugin = require('puppeteer-extra-plugin-stealth');
    puppeteer.use(StealthPlugin());
  
    return puppeteer;
};
const openNewBrowser = async () => {
    const puppeteer = getPuppeteer();

    const browser =await puppeteer.launch({
        headless:true,
        executablePath:
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      userDataDir:
        '/Users/ztlab97/Library/Application Support/Google/Chrome/Profile 3',
    });
    return browser;
};
const getLinks = async (page, bikeLink) => {
    console.log("Get Links ", bikeLink );
    console.log("fgfdjkafjgjldfgjkadfhlgjk")
    let originalOffset = 0;
    while (true) {
        await page.evaluate('window.scrollBy(0, document.body.scrollHeight)');
        await page.waitForTimeout(200);
        let newOffset = await page.evaluate('window.pageYOffset');
        if (originalOffset === newOffset) {
            
            break;
        }
        originalOffset = newOffset;
    }

    return await page.evaluate( async (bikeLink)=>{
        const linksBikeCard = [];
        document.querySelectorAll(bikeLink.CARD_URL_RULE).forEach((e)=>{
            
            linksBikeCard.push({
                url: e?.getAttribute('href'),
            });
        })  
        return linksBikeCard;
    },
    rules,
    )
    

}

const getBikeDetails = async (page, rules,url) => {
    console.log("Get Details ");
    const bike={};
    bike.cur_url=url;

    return await page.evaluate(async (rules,bike)=>{
        
        let extra=[];
        bike.bike_image=document.querySelector(rules.BIKE_IMAGE)?.getAttribute('srcset').split(",")[0];
        bike.bike_model=await document.querySelector(rules.BIKE_MODEL)?.textContent.trim();
        bike.bike_price=document.querySelector(rules.BIKE_PRICE)?.textContent?.trim(); 

        let data =document.querySelectorAll(rules.BIKE_FRAME_DETAILS).forEach(result => {
            let headings=result.querySelector(rules.BIKE_HEADINGS)?.textContent?.trim();
            let details= result.querySelector(rules.BIKE_DESCRIPTION)?.textContent?.trim();

            console.log("headings is ::::::::::::::::::::: ", headings);
            switch (headings){
                
                case 'Rahmen:':
                    bike.frame=details;
                    break;
                case 'Fork':
                    bike.fork=details;
                    break;
                case 'Rear derailleur':
                    bike.bike_rear_derailleur=details;
                    break;
                case 'UMWERFER':
                    bike.bike_front_derailleur=details;
                    break;
                case 'Shift lever':
                    bike.bike_shift_leaver=details;
                    break;
                case "Brake lever":
                    bike.bike_brake_lever=details;
                    break;
                case 'KASSETTE':
                    bike.bike_cassette=details;
                    break;
                case 'Crankset':
                    bike.bike_crankset=details;
                    break;

                case 'Bremsen:':
                    bike.bike_brake=details
                    break;
                
                case 'Kette:':
                    bike.bike_chain=details;
                    
                    break;
                case 'Rear wheel hub':
                    bike.bike_rear_hubs=details;
                    break;
                case 'Front wheel hub':
                    bike.bike_front_hubs=details;
                    break;
                case 'Handlebar':
                    bike.bike_handlebar=details;
                    break;
                case 'Stem':
                    bike.bike_stem=details;
                    break;
                case 'Grips':
                    bike.bike_grip=details;
                    break;
                case 'Headlight':
                    bike.bike_front_light=details;
                    break;
                case 'Rear light':
                    bike.bike_rear_light=details;
                    break;
                
                case 'Seat post':
                    bike.bike_seatpost=details;
                    break;
                case 'Sattel:':
                    bike.bike_saddle=details;
                    break;
                case 'Pedale:':
                    bike.bike_pedals=details;
                    break;

                case 'Schock':
                    bike.bike_rear_shock=details;
                    break;
                case 'Tretlager:':
                    bike.bike_bottom_bracket=details;
                    break;
                case 'Headset':
                    bike.bike_headset=details;
                    break;
                case 'Lock':
                    bike.bike_lock=details;
                    break;
                case 'Brake lever':
                    bike.bike_break_leaver=details;
                    break; 
                case 'Spokes':
                    bike.bike_spokes=details; 
                    break;

                case 'Engine':
                    bike.bike_motor=details;
                    bike.electric="yes";
                         //electric
                    break;
                case 'Battery':
                    bike.bike_battery=details;
                    bike.electric="yes";
                    break;
                case 'Rim':
                    bike.bike_rims=details;
                    break;
                case 'Bereifung':
                    bike.bike_tires=details;
                    break;
                case 'Schaltung':
                    bike.bike_gears=details;
                    break;
                case 'Farbe':
                    bike.bike_color=details;
                    break;

                case 'Ladegerät':
                    bike.bike_charger=details;
                    break;

                case 'Gewicht:':
                    bike.bike_weight=details;
                    break;

                default: 
                    
                    extra.push(headings+" : " +details)
                    break;
                
            }
            
            bike.extras=extra.toString();
            
            
        });
        extra=[];
        return bike
    },
    rules,
    bike

    )

}

const bike = async() =>{
    const browser = await openNewBrowser();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    await page.setRequestInterception(true);
    page.on('request', (request) => {
        if (request.resourceType() === 'image') {
            request.abort();
        } else {
            request.continue();
        }
    });
}
const scrape = async () => {
    console.log('Started scraping...');

     const browser = await openNewBrowser();
     const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    await page.setRequestInterception(true);
    page.on('request', (request) => {
        if (request.resourceType() === 'image') {
            request.abort();
        } else {
            request.continue();
        }
    });

    await page.goto("https://bonvelo.de/bikes?p=2");
    await page.waitForTimeout(6000);   
    
    let allLinks = await getLinks(page, rules );

    await page.close();
    await browser.close();
    return allLinks;
}

const bikeDetails = async (url) =>{
    console.log("url====================================================================================================", url);
    const browser = await openNewBrowser();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setRequestInterception(true);
    await page.on('request', (request) => {
        if (request.resourceType() === 'image') {
            request.continue();
        } else {
            request.continue();
        }
    });
    const bikeDetails =[]
    for(let i=0; i<url.length;i++){
        console.log("Remaining bike is ", url.length - i)
        console.log("my url",  url);
        
        await page.goto(url[i]['dataValues']['url'], { timeout: 0 });

        await page.waitForTimeout(3000);

        bikeDetails.push(await getBikeDetails(page, rules ,url[i]));
        
    }
    
   
    // await page.close();
    // await browser.close();
    return bikeDetails;
}

const downloadImage = async (url, ind) =>{
    const imageData = [];
    const browser = await openNewBrowser();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setRequestInterception(true);
    await page.on('request', (request) => {
        if (request.resourceType() === 'image') {
            request.continue();
        } else {
            request.continue();
        }
    });

    console.log("my url",  url);
    
    const images=url.split(';')

    const imageName=[];
    for(let i=0;i<images.length;i++){

        let viewImage=await page.goto(images[i], {timeout: 0});

        let image_name = `bike${ind.toString().padStart(5, 0)}` ;

        console.log("Image name Type", images[i])
        let fileName = `${image_name}` + '.png' ;
        imageName.push(fileName)

        console.log(path.join(__dirname , `/../BonveloImage/${fileName}`));

        require('fs').writeFile(
            path.join(__dirname , `/../BonveloImage/${fileName}`),
            await viewImage.buffer(),
            (err) => {
                if (err) {
                    console.log(err);
                }
            }
        );
        await page.waitForTimeout(3000);
        imageData.push({image_name:imageName.toString(), image_url :images[i]});

    }
    // console.log("Images Name ==========> ",imageData)
    await page.close();
    await browser.close();
    return imageData;
}

module.exports = {
    getLinks,
    scrape,
    bike,
    bikeDetails,
    downloadImage,
}




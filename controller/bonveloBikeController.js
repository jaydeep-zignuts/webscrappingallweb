const { getLinks, scrape, bike, bikeDetails, downloadImage } =require ('../helper/bonveloBike.helper');


const { constants, rules } = require('../constants/bonvelo.constant');
const db = require('../models');
const bikedetailsModel = require('../models/bikedetails.model');
const BonveloBikeDetails = db.BonveloBikeDetails;

const Op = db.Op;
exports.getBikeCardLink = async(req, res)=>{
    console.log("Hello controller called");
    const result =await scrape().then(async (url)=>{
        console.log("data in controller",url);

        for(let ind= 0; ind<url.length;ind++){ 
            await BonveloBikeDetails.create({url : url[ind]["url"],model : model[ind]["model"] }).then(r=>{
                console.log("created");
            }).catch(err=>{
                console.log("error", err);
            });
        }
        return url;
    }).catch(err => {
        console.log("Error", err);
        return err
    });
    return result;
}

exports.getBikeDetails= async (req, res) =>{
    try{
        const findData = await BonveloBikeDetails.findAll({attributes:['url']});
        let data = await bikeDetails(findData);
        console.log("Here is all the data that are available ============================================================================>",data);
        for(let i=0; i<data.length ; i++ ){
            await BonveloBikeDetails.update({
                electric:data[i]['electric'],
                category:data[i]['bike_category'] ,
                // model: data[i]['bike_model'],
                modelYear: data[i]['bike_model_year'],
                retailPrice:data[i]['bike_price'] ,
                rearShock:data[i]['bike_rear_shock'],
                frontDerailleur:data[i]['bike_front_derailleur'],
                cassette: data[i]['bike_cassette'],
                crank: data[i]['bike_crankset'],
                pedals: data[i]['bike_pedals'],
                image: data[i]['bike_image'],
                bike_shock:data[i]['bike_shock'],
                bike_currency: data[i]['bike_currancy'],
                frame: data[i]['frame'],
                fork: data[i]['fork'],
                color: data[i]['bike_color'],
                forkSuspensionTravel:data[i]['bike_travel_suspension_fork'] ,
                motor: data[i]['bike_motor'],
                battery:data[i]['bike_battery'],
                charger:data[i]['bike_charger'],
                bike_shifter:data[i]['bike_shifter'] ,
                rearDerailleur:data[i]['bike_rear_derailleur'] ,
                bike_sprocket: data[i]['bike_sprocket'],
                chain: data[i]['bike_chain'],
                bike_crankset: data[i]['bike_crankset'],
                bike_transimission_drive:data[i]['bike_transimission_drive'] ,
                bottomBracket:data[i]['bike_bottom_bracket'] ,
                handlebar:data[i]['bike_handlebar'], 
                stem:data[i]['bike_stem'],
                headset:data[i]['bike_headset'], 
                saddle:data[i]['bike_saddle'], 
                seatpost:data[i]['bike_seatpost'], 
                bike_break_caliper:data[i]['bike_break_caliper'], 
                brakeLevers:data[i]['bike_break_leaver'], 
                brakes:data[i]['bike_brake'],
                diskRotors:data[i]['bike_disk_rotors'],
                rims: data[i]['bike_rims'], 
                tires:data[i]['bike_tires'],
                gear:data[i]['bike_gears'], 
                spokes:data[i]['bike_spokes'],
                weight:data[i]['bike_weight'], 
                wheelSize:data[i]['bike_wheel_size'],
                frontHub: data[i]['bike_front_hubs'],
                rearHub: data[i]['bike_rear_hubs'],
                frontLight:data[i]['bike_front_light'] ,
                rearLight:data[i]['bike_rear_light'] ,
                lockInfo:data[i]["bike_lock"],
                shiftLevers:data[i]['bike_shift_leaver'],
                extra:data[i]['extras'],
    
            },{ where:{ url: data[i]['cur_url']["url"]}});
        }
        

        console.log("data inserted successfully!!!!");
        }catch(err){
            console.log("Error in inserting data", err)
        }
    
    
}

exports.downloadImage =(req, res) =>{
    BonveloBikeDetails.findAll({attributes:['image']}).then((result)=>{
      
        for(let ind=0; ind<result.length; ind++){
            
            downloadImage(result[ind]['dataValues']['image'], ind).then((imageData)=>{

                console.log("Image data ========> ", imageData)

                for( let j = 0 ; j< imageData.length ; j++){
                console.log(`image Name at index is ${ind} - ${imageData[j].image_name}`)
                console.log(`image URL at index is ${ind} - ${imageData[j].image_url}`)
                
                BonveloBikeDetails.update({
                    imageName: imageData[j].image_name
                },
                {       
                    where:{
                        image: result[ind]['dataValues']['image']
                    } 
                });
            }
            
            }).catch(err=>{
                console.log(err)
            })
            
            // let spdata= result[ind]['dataValues']['image'].split()z
            
        }
    }).catch(err=>{
        console.log(err);
    });
}


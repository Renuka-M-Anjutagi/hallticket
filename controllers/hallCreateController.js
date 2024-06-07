

import  hallbookingModel  from "../models/hallbookingModel.js";
import hallcreateModel from "../models/hallcreateModel.js";

export const hallCreateController = async(req, res) =>{
    try {
        
        const {noofseat, amenities, priceforperhour} = req.body;
       if(!noofseat) return res.send({error: 'No of seat is missing'});
       if(!amenities) return res.send({error: 'amenities is missing'});
       if(!priceforperhour) return res.send({error: 'Price for 1 hour is missing'});
      
       const existinguser = await hallbookingModel.findOne({noofseat});
       if(existinguser) 
       {
         return res.status(200).send(
            {
                success: false,
                message: 'Already registred HallBooked, please check other'
    
            }
         )
       }
    
        const HallBooked = await new hallbookingModel({noofseat, amenities, priceforperhour}).save();
       res.status(201).send({
        success: true,
        message: 'Hall Booked success',
        HallBooked
       })
    } catch (error) {
        console.log(error);
    
        res.status(500).send({
            success: false,
            message: 'Error in Booking',
            error
        })
    }
    }


    export const hallBookingController = async(req, res) =>{
        try {
            
            const {customername,date, starttime, endtime,roomID} = req.body;
           if(!customername) return res.send({error: 'customername is missing'});
           if(!starttime) return res.send({error: 'starttime  is missing'});
           if(!endtime) return res.send({error: 'endtime is missing'});
          
           const existinguser = await hallbookingModel.findOne({customername});
           if(existinguser) 
           {
             return res.status(200).send(
                {
                    success: false,
                    message: 'Already customername  exist, please check other'
        
                }
             )
           }
        
            const HallBooked = await new hallbookingModel({customername,date, starttime, endtime,roomID}).save();
           res.status(201).send({
            success: true,
            message: 'Hall Booked success',
            HallBooked
           })
        } catch (error) {
            console.log(error);
        
            res.status(500).send({
                success: false,
                message: 'Error in Booking',
                error
            })
        }
        }

 // define the getBookingdetails method
 export const getBookingdetails = async(req, res) =>{
    try {
       
        // find the bookings by id in the database
        const bookings = await hallbookingModel.find();

        // if the bookings does not exist, return an error
        if (!bookings) {
            return res.status(404).json({ message: 'bookings not found' });
        }

        // if the bookings exists, return the bookings
        res.json({ message: 'bookings found', bookings });
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

// define the getBookingdetails method
 export const getCustomerdetails = async(req, res) =>{
    try {
       
        // find the bookings by id in the database
        const bookings = await hallbookingModel.find();

        // if the bookings does not exist, return an error
        if (!bookings) {
            return res.status(404).json({ message: 'bookings not found' });
        }

        // if the bookings exists, return the bookings
        res.json({ message: 'bookings found', bookings });
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}



// define the getBookingdetails method
export const getdetails = async(req, res) =>{
    try {
       
        const {id} = req.params;

           // find the bookings by id in the database
   
            const bookings = await hallbookingModel.find();

            

        // if the bookings does not exist, return an error
        if (!bookings) {
            return res.status(404).json({ message: 'bookings not found' });
        }

        // if the bookings exists, return the bookings
        res.json({ message: 'bookings found', bookings });
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}
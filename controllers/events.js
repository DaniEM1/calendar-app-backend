const { response, json } = require('express');
const Event = require('../models/Event');


const getEvents = async( req, res = response ) => {

    const  events = await Event.find()
                                .populate('user', 'name')
    
    return res.json({
        ok:true,
        events
    })

}

const createEvent = async( req, res = response ) => {

    const event = new Event( req.body );

    try {
         
        event.user = req.uid;

        const savedEvent = await event.save();

        res.json({
            ok:true,
            event: savedEvent
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el admin'
        });
    }

}

const updateEvent = async( req, res = response ) => {

    const eventID = req.params.id; 

    try {

        const event = await Event.findById( eventID )

        if(!event){
            return res.status(404).json({
                ok:false,
                msg:'Evento con ese ID no existe'
            });
        }

        if(event.user.toString() !== req.uid){
            return res.status(401).json({
                ok:false,
                msg: 'No tiene privilegios para editar'
            });
        }

        const newEvent = {
            ...req.body,
            user: req.uid
        } 

        const updatedEvent = await Event.findByIdAndUpdate( eventID, newEvent, {new:true} );

        res.json({
            ok:true,
            evento: updatedEvent
        })
        
    } catch (error) {
        console.log(error);
        res.status(500),json({
            ok:false,
            msg:"hable con el admin"
        });
    }

}

const deleteEvent = async( req, res = response ) => {
    
    // console.log(req);
    const eventID = req.params.id; 

    try {

        const event = await Event.findById( eventID )

        if(!event){
            return res.status(404).json({
                ok:false,
                msg:'Evento con ese ID no existe'
            });
        }

        if(event.user.toString() !== req.uid){
            return res.status(401).json({
                ok:false,
                msg: 'No tiene privilegios para borrar'
            });
        }


        // const deletedEvent = await Event.findByIdAndUpdate( eventID, newEvent, {new:true} );
        const deletedEvent = await Event.findByIdAndDelete( eventID );

        res.json({
            ok:true,
            evento: deletedEvent
        })
        
    } catch (error) {
        console.log(error);
        res.status(500),json({
            ok:false,
            msg:"hable con el admin"
        });
    }

}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}
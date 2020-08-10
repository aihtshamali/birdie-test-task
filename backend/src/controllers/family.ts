import { Events } from '../entity/Event';
import * as express from "express";
import { createConnection,getRepository, Connection } from "typeorm";
import * as moment from 'moment'
import conn from '../db/db'

module.exports = {
  searchLastActivity: async (req: express.Request, res: express.Response) => {
    try {
        createConnection()
          .then(async (connection) => {
            const event :Events = await connection.getRepository(Events).
            findOne({care_recipient_id: req.params.id},{order: {timestamp:-1}})
            // createQueryBuilder("Events")
            //   .where("event_type like :event_type", {
            //     event_type: "%medicat%",
            //   })
            //   .getMany();
            // console.log(event.map((event) => event.payload = JSON.parse(event.payload)))
            if (!event)
              return res.status(404).send({ message: "Not found", success: false });
            event.payload = JSON.parse(event.payload)
            connection.close()

            return res.status(200).json({
              event: event,
              success:true,
              message: "Events retreived successfully!"
            })

          })
          .catch((error) => {
            console.log(error);
            return res
              .status(500)
              .send({ message: "Something failed", success: false });
          });  
    } catch (e) {
      console.log(e)
      return res.status(500).send({"message":"Something failed",success:false})
    }
  },
  searchByDates: async (req: express.Request, res: express.Response) => {
    createConnection()
      .then(async (connection) => {

        // Fetching events that happenend between two given dates of a person
        const events: Array<Events> = await connection.manager.query(
          `select * from events WHERE date(timestamp) >= date(${req.query.fromDate}) and date(timestamp) <= date(${req.query.toDate})
            and care_recipient_id = '${req.params.id}'
            order by timestamp DESC
          `
          );
          // if no event found then send appropriate message
          if (!events.length) return res.status(404).send({ "message": "No recipient's data found", "success": false })

          // const fluidTaken = events.filter((event) => event.event_type ==="fluid_intake_observation").map((event) => {
          //   const payload = JSON.parse(String(event.payload))
          //   return {"fluid_taken":payload["consumed_volume_ml"], "date": moment(new Date(payload["timestamp"])).format("Y-M-D") }
          // })
          
          //Containers for data
          let fluidTaken = {},
            moods = { happy: 0, okay: 0 },
            alerts = { HIGH: 0, MEDIUM: 0, LOW: 0 },
            concerns = Array(), eventTypes = Array()

          //Iterating over events and parsing out the relevant data 
          events.forEach((event) => {
            const payload = JSON.parse(String(event.payload));
            event.payload = payload
            eventTypes.push({"value":event.event_type, "text": event.event_type.split("_").join(" ").toUpperCase()})
            const dte = moment(new Date(payload["timestamp"])).format("Y-M-D");

          // Switch to identify and to parse the relevant data 
            switch (event.event_type) {
              case "fluid_intake_observation":
                if (fluidTaken[dte]) {
                  fluidTaken[dte] += payload["consumed_volume_ml"];
                } else {
                  fluidTaken[dte] = payload["consumed_volume_ml"];
                }
                break;

              case "mood_observation":
                if (moods[payload["mood"]]) {
                  moods[payload["mood"]] += 1;
                } else {
                  moods[payload["mood"]] = 1;
                }
                break;

              case "alert_qualified":
                if (alerts[payload["alert_severity"]]) {
                  alerts[payload["alert_severity"]] += 1;
                } else {
                  alerts[payload["alert_severity"]] = 1;
                }
                break;

              case "concern_raised":
                concerns.push(payload)
                break;
            }
          });

         

          connection.close()
          return res.status(200).send({
            message: "Retrieved successfully!",
            fluidTaken: fluidTaken,
            moods: moods,
            alerts: alerts,
            concerns: concerns,
            eventTypes: eventTypes,
            events: events,
            success: true
          });
      })
      // .catch((error) => {
      //   console.log(error)
      //   return res
      //     .status(500)
      //     .send({ message: "Something failed", success: false });
      // });
  },
    searchByDatesAndEvent: async (req: express.Request, res: express.Response) => {
    createConnection()
      .then(async (connection) => {

        // Fetching events that happenend between two given dates of a person
        const events: Array<Events> = await connection.manager.query(
          `select * from events WHERE date(timestamp) >= date(${req.query.fromDate}) and date(timestamp) <= date(${req.query.toDate})
            and care_recipient_id = '${req.params.id}' and event_type = ${req.query.event_type}
            order by timestamp DESC
          `
          );
          // if no event found then send appropriate message
          if (!events.length) return res.status(404).send({ "message": "No recipient's data found", "success": false })
            connection.close()
          return res.status(200).send({
            message: "Retrieved successfully!",
            events: events,
            success: true
          });

      })
      .catch((error) => {
        console.log(error)
        return res
          .status(500)
          .send({ message: "Something failed", success: false });
      });
    }

}
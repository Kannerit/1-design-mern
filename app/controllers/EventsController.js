const { trusted } = require("mongoose");
const EventModel = require("../models/EventModel");

module.exports = {
  index: async (req, res, next) => {
    try {
      const result = await EventModel.find({});
      res.json(result);
    } catch(err) {
      return res.status(500).json({
        message: "Error while fetching events",
        error: err
      })
    }
  },

  create: async (req, res, next) => {
    try {
      const event = new EventModel({
        name: req.body.name,
        event: req.body.event,
        city: req.body.city,
      });
      const savedEvent = await event.save();
      return res.status(201).json(savedEvent);
    } catch (err) {
      return res.status(500).json({
        message: "Error while creating event",
        error: err,
      });
    }
  },

  delete: async (req, res, next) => {
    try {
      const id = req.params.id;
      const deletedEvent = await EventModel.findByIdAndDelete(id);

      if (!deletedEvent) {
        return res.status(404).json({
          message: "Event not found",
          error: "Event with the provided ID does not exist",
        });
      }

      return res.status(200).json({
        id: id,
        delete: true,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error while deleting event",
        error: err,
      });
    }
  },
};

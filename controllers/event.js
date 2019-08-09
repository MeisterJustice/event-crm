export const getEvent = (req, res, next) => {
    res.json({message: "event route"});
  }

  export const getCreateEvent = (req, res, next) => {
    res.json({message: "create event"})
}

export const postEvent = (req, res, next) => {
    res.json({message: "post event"})
}

export const showEvent = (req, res, next) => {
    res.json({message: "show event"})
}

export const getEdit = (req, res, next) => {
    res.json({message: "edit event"})
}

export const putEvent = (req, res, next) => {
    res.json({message: "put event"})
}

export const deleteEvent = (req, res, next) => {
    res.json({message: "delete event"})
}
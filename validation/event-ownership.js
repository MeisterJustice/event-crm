import Event from '../models/event';

export default async (req, res, next) => {
    if(req.isAuthenticated()){
        await Event.findById(req.params.id, (err, foundEvent) =>{
           if(err){
               req.flash("error", "Event not found");
               res.redirect(`/event/${Event.id}`);
           } else{
               if(foundEvent.author.id.equals(req.user._id)){
                   return next();
               } else{
                   req.flash("error", "You don't have permission to do that!");
                   res.redirect("back");
               }
           }
        });
    }else{
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("/login");
    }
}
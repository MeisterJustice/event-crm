import Event from '../models/event';
import Blog from '../models/blog';
import Ticket from '../models/ticket';
import TicketPurchase from '../models/ticketPurchase';
import {cloudinary} from '../cloudinary';
import _ from 'lodash';
import request from 'request';
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const {initializePayment, verifyPayment} = require('../config/paystackTicket')(request);


export const getEvent = async(req, res, next) => {
    let findEvent = await Event.find({});
    res.render("event/index", {findEvent});
  }
  

  export const getCreateEvent = async(req, res, next) => {
    res.render("event/new")
}

export const postEvent = async(req, res, next) => {
    
    let author = await {
        id: req.user._id,
        username: req.user.username
    }

    req.body.author = author;
    
    req.body.images = [];
    for(const file of req.files) {
        req.body.images.push({
            url: file.secure_url,
            public_id: file.public_id
        });
    }   

    await Event.create(req.body);
    res.redirect("/event");
}

export const showEvent = async(req, res, next) => {
    let latestBlog = await Blog.find({});
    let event = await Event.findById(req.params.id).populate('comments').exec();
    res.render("event/show", {event, latestBlog})
}

export const getEdit = async(req, res, next) => {
    let showEdit = await Event.findById(req.params.id);
    res.render("event/edit", {showEdit})
}

export const putEvent = async(req, res, next) => {
    let event = await Event.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/event/${event.id}`);
}

export const deleteEvent = async(req, res, next) => {
    let event = await Event.findById(req.params.id);
    await Event.findByIdAndDelete();
    res.redirect("/event");
}

export const postTicket = async(req, res, next) => {
    let event = await Event.findById(req.params.id);
    let ticket = await Ticket.create(req.body);
    const msg = {
        to: ticket.email,
        from: `Ticket Guy <thechiefje@gmail.com>`,
        subject: 'Ticket Created',
        text: `${event.author.username} ${ticket.regularAmount} ${ticket.coupleAmount} ${ticket.vipAmount}`,
        html: `<h3>Hello ${event.author.username},</h3> <br> <p>We're pleased to notify you that ticket sales has been created for the event with title; <strong>${event.title}</strong>. You'll be hearing from us anytime a ticket is sold. Below is the details of the ticket you created for your review;</p><p><strong>Regular</strong>: &#8358;${ticket.regularAmount} <br><strong>Couple</strong>: &#8358;${ticket.coupleAmount} <br><strong>VIP</strong>: &#8358;${ticket.vipAmount} </p><p>Remember to mark this email as not SPAM if it got to your SPAM folder</p><br><br> <h4>Regards, <div>Justice E.</div><div>Ticket Guy</div></h4>`
    };
    
    await sgMail.send(msg);
    req.flash('success', `ticket created for ${event.title}. Check your email`)
    res.redirect(`/event/${event.id}`);
}

export const getTicketPage = async(req, res, next) => {
    let event = await Event.findById(req.params.id);
    let ticket = await Ticket.findById(req.params.ticket_id);
    req.session.redirectTo = `/event/${event.id}/ticket/${ticket.id}`;
    res.render('event/payment', {event, ticket});
}

export const purchaseTicket = async(req, res, next) => {
    const event = await Event.findById(req.params.id);
    const ticket = await Ticket.findById(req.params.ticket_id);
    const form = await _.pick(req.body,['amount','email','full_name']);
      form.metadata = {
          full_name : form.full_name
      }
      form.amount *= 100;
      await initializePayment(form, (error, body)=>{
          if(error){
              console.log(error);
              return;
         }
         const response = JSON.parse(body);
         console.log(response);
         
         res.redirect(response.data.authorization_url)
      });
  }
  
  export const ticketCallback = async(req, res, next) => {
    const ref = await req.query.reference;
      await verifyPayment(ref, (error,body)=>{
          if(error){
              console.log(error)
              return res.redirect('/error');
          }
          const response = JSON.parse(body);
          console.log(response);
          const data = [response.data.reference, response.data.amount / 100, response.data.customer.email, response.data.metadata.full_name]
         
          const [reference, amount, email, full_name] = data;
          const newTicket = {reference, amount, email, full_name}
          const purchase = new TicketPurchase(newTicket)
          purchase.save();
          res.redirect(req.session.redirectTo || '/');
          let event = Event.findById(req.params.id);
            let ticket = Ticket.findById(req.params.ticket_id);
            console.log(ticket);
            delete req.session.redirectTo;
          
      })
  }
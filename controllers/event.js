var Event = require('../models/event');
var Blog = require('../models/blog');
var TicketPurchase = require('../models/ticketPurchase');
var {cloudinary} = require('../cloudinary');
var _ = require('lodash');
var request = require('request');
var sgMail = require('@sendgrid/mail');
var crypto = require('crypto');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const {initializePayment, verifyPayment} = require('../config/paystackTicket')(request);

exports.getEvent = async (req, res, next) => {
    let event = await Event.paginate({}, {
        page: req.query.page || 1,
        limit: 12
    });
    event.page = Number(event.page);
    res.render("event/index", {
        event
    });
} 

exports.getCreateEvent = async(req, res, next) => {
    res.render("event/new")
}

exports.postEvent = async(req, res, next) => {
    
    let author = await {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email
    }

    req.body.author = author;
    
    req.body.images = [];
    for(const file of req.files) {
        req.body.images.push({
            url: file.secure_url,
            public_id: file.public_id
        });
    }   

    let event = await Event.create(req.body);

    if(event.regularAmount) {
        const msg = {
            to: req.user.email,
            from: `Ticket Guy <thechiefje@gmail.com>`,
            subject: 'Event Created',
            text: `${event.author.username} ${event.regularAmount} ${event.coupleAmount} ${event.vipAmount}`,
            html: `<h3>Hello ${event.author.username},</h3> <br> <p>We're pleased to notify you that your event is now live on Ticket Guy and ticket sales has been created for the event with title; <strong>${event.title}</strong>. Do well to check your dashboard in the website often for details on each purchase. Below is the details of the ticket you created for your review;</p><p><strong>Regular</strong>: &#8358; ${event.regularAmount} <br><strong>Couple</strong>: &#8358; ${event.coupleAmount} <br><strong>VIP</strong>: &#8358; ${event.vipAmount} </p><p style="color: brown">Remember to mark this email as not SPAM if it got to your SPAM folder</p><br><br> <h4>Regards, <div>Justice E.</div><div>Ticket Guy</div></h4>`
        };
        await sgMail.send(msg);
    }

    if(!event.regularAmount) {
        const msg = {
            to: req.user.email,
            from: `Ticket Guy <thechiefje@gmail.com>`,
            subject: 'Event Created',
            text: `${event.author.username} ${event.regularAmount} ${event.coupleAmount} ${event.vipAmount}`,
            html: `<h3>Hello ${event.author.username},</h3> <br> <p>We're pleased to notify you that your event with title; <strong>${event.title}</strong> is now live on Ticket Guy. We noticed you're not selling tickets with us. You can do that by updating your event and inputting the details of the ticket. <p style="color: brown">Remember to mark this email as not SPAM if it got to your SPAM folder</p><br><br> <h4>Regards, <div>Justice E.</div><div>Ticket Guy</div></h4>`
        };
        await sgMail.send(msg);
    }
    res.redirect("/event");
}

exports.showEvent = async(req, res, next) => {
    let latestBlog = await Blog.find({});
    let event = await Event.findById(req.params.id).populate('comments').exec();
    res.render("event/show", {event, latestBlog})
}

exports.getEdit = async(req, res, next) => {
    let showEdit = await Event.findById(req.params.id);
    res.render("event/edit", {showEdit})
}

exports.putEvent = async(req, res, next) => {
    let event = await Event.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/event/${event.id}`);
}

exports.deleteEvent = async(req, res, next) => {
    let event = await Event.findById(req.params.id);
    await Event.findByIdAndDelete();
    res.redirect("/event");
}

// exports.success = async(req, res, next) => {
//     let event = await Event.findById(req.params.id);
//     res.render("event/success");
// }

exports.purchaseTicket = async(req, res, next) => {
    const event = await Event.findById(req.params.id);
    req.session.redirectToEvent = event;
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
         const response = JSON.parse(body)
         console.log(response);
         
         res.redirect(response.data.authorization_url)
      });
  }
  
  exports.ticketCallback = async(req, res, next) => {
    const event = req.session.redirectToEvent;
    let eventId = await {
        id: event._id,
        email: event.author.email,
        username: event.author.username
    };
    const ref = await req.query.reference;
    const token = await crypto.randomBytes(5).toString('hex');
      await verifyPayment(ref, (error,body)=>{
          if(error){
              console.log(error)
              return res.redirect('/error');
          }
          const response = JSON.parse(body);
          console.log(response);
          const data = [response.data.reference, response.data.amount / 100, response.data.customer.email, response.data.metadata.full_name]
          const [reference, amount, email, full_name] = data;
          const newTicket = {reference, amount, email, full_name, token, eventId}
          const purchase = new TicketPurchase(newTicket)
          purchase.save();
        //   message to client
          const msg = {
            to: purchase.email,
            from: `Ticket Guy <thechiefje@gmail.com>`,
            subject: 'Ticket Purchase Successful',
            text: `${purchase.token} ${purchase.amount} ${purchase.email} ${purchase.full_name}`,
            html: `<h4>Hello ${purchase.full_name},</h4> <br> <p>We're pleased to notify you that your ticket was purchased successfully on Ticket Guy and your reference number has been sent to the event planner. Each reference number is unique and attached to a name.</p><p>Your unique reference number helps validate that you actually payed for the ticket. Please have your reference number in hand while coming for the event</p> <br><p>Your reference is: <strong>${purchase.token}</strong></p><p style="color: brown;">Remember to mark this email as not SPAM if it got to your SPAM folder</p><br><br> <h4>Regards, <div>Justice E.</div><div>Ticket Guy</div></h4>`
        };
        sgMail.send(msg);
        // message to event planner
        const Eventmsg = {
            to: eventId.email,
            from: `Ticket Guy <thechiefje@gmail.com>`,
            subject: 'Ticket Activity!',
            text: `${purchase.token} ${purchase.full_name} ${purchase.amount} ${purchase.email} ${eventId.username} ${eventId.title}`,
            html: `<h4>Hello ${eventId.username},</h4> <br> <p>Your event; <strong>${eventId.title}</strong> is getting serious activities!!. Navigate to your dashboard to see the overview. Latest Sales;</p> <br><h5>Name: ${purchase.full_name}</h5><h5>Amount: ${purchase.amount}</h5><h5>Reference: ${purchase.token}</h5></p><p style="color: brown;">Remember to mark this email as not SPAM if it got to your SPAM folder</p><br><br> <h4>Regards, <div>Justice E.</div><div>Ticket Guy</div></h4>`
        };
        sgMail.send(Eventmsg); 
        res.render(`event/success`, {purchase, event});
        delete req.session.redirectToEvent;
      }); 
      event.totalEventAmount += purchase.amount;
      event.save();
  }
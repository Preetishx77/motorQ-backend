const PORT = 8000;
const express = require('express');
const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const uri = 'mongodb+srv://preetishbs:5CxrvnvyUyAAZe0n@cluster0.crsperq.mongodb.net/?retryWrites=true&w=majority';

const app = express();
app.use(cors());
app.use(express.json());

// var ObjectId = require('mongodb').ObjectId;
const overlapping = (a, b) => {
	const getMinutes = s => {
	   const p = s.split(':').map(Number);
	   return p[0] * 60 + p[1];
	};
	return getMinutes(a.end) > getMinutes(b.start) && getMinutes(b.end) > getMinutes(a.start);
 };
 const isOverlapping = (arr) => {
	let i, j;
	for (i = 0; i < arr.length - 1; i++) {
		for (j = i + 1; j < arr.length; j++) {
		  if (overlapping(arr[i], arr[j])) {
			 return true;
		  }
	   };
	};
	return false;
 };


app.post('/addevent', async (req, res) => {
	const client = new MongoClient(uri);
	const body = req.body;
	let word = "test" + Math.floor(Math.random() * 100) + 1
	//event_name, event_start_timestamp, event_end_timestamp, location, event_capacity

	const data = { event_id: word, ...body, registered: 0, registered_users: [] };

	try {
		await client.connect();
		const database = client.db('app-data');
		const event = database.collection('events');

		const registered = await event.insertOne(data);
		res.send(registered);
	} finally {
		await client.close();
	}
});

app.patch('/updateevent/:eventId', async (req, res) => {
	const client = new MongoClient(uri);
	const body = req.body;
	const id = req.params.eventId;

	console.log(req.body);

	try {
		await client.connect();
		const database = client.db('app-data');
		const event = database.collection('events');

		const registered = await event.updateOne({ event_id: id }, { $set: body });
		res.send(registered);
	} finally {
		await client.close();
	}
});

app.get('/events', async (req, res) => {
	const client = new MongoClient(uri);

	try {
		await client.connect();
		const database = client.db('app-data');
		const events = database.collection('events');
		const allEvents = await events.find({}).toArray();
		res.json(allEvents);
	} finally {
		await client.close();
	}
});

app.delete('/deleteevent/:eventId', async (req, res) => {
	const client = new MongoClient(uri);
	const id = req.params.eventId;

	try {
		await client.connect();
		const database = client.db('app-data');
		const event = database.collection('events');
		const users = database.collection('users');
		const allEvents = await event.find({ event_id: id }).toArray();
		for (let i = 0; i < allEvents.length; i++) {
			for (let j = 0; j < allEvents[i].registered_users.length; j++) {
				console.log(allEvents[i].registered_users[j]);
				const userId = allEvents[i].registered_users[j].user_id;
				const updateUser = await users.updateOne({ user_id: userId }, { $pull: { events: { event_id: id } } });
			}
		}

		const registered = await event.deleteOne({ event_id: id });
		res.send('deleteEventFromUser');
	} finally {
		await client.close();
	}
});

app.get('/verify/:user_id', async (req, res) => {
	const client = new MongoClient(uri);
	const user_id = req.params.user_id;

	try {
		await client.connect();
		const database = client.db('app-data');
		const events = database.collection('events');
		const users = database.collection('users');
		const allEvents = await events.find({}).toArray();
		const flag = false;
		allEvents.forEach((obj) => {
			for (let i = 0; i < obj.registered_users.length; i++) {
				if (obj.registered_users[i].user_code === user_id && !obj.checked_in.includes(user_id)) {
					res.send(obj);
				}
				else if(obj.checked_in.includes(user_id)){
					res.send("Already used");
				}
				else if(obj.registered_users[i].user_code !== user_id){
					res.send("Invalid");
				}
			}
		})
	} finally {
		await client.close();
	}
});

app.get('/events/:user_id', async (req, res) => {
	const client = new MongoClient(uri);
	const id = req.params.user_id;
	try {
		await client.connect();
		const database = client.db('app-data');
		const users = database.collection('users');
		const events = database.collection('events');
		const eventDetailsArray = [];
		const User = await users.find({user_id: id}).toArray();
		const Events = await events.find({}).toArray();
		const eventIdArray = [];
		User.forEach((user) => {
			for(let i = 0 ; i < user.events.length; i++){
				eventIdArray.push(user.events[i].event_id);
			}
		});
		eventIdArray.forEach((id1) =>  {
			for(let i = 0; i < Events.length; i++){
				if(Events[i].event_id === id1){
					eventDetailsArray.push(Events[i]);
				}
			}

			console.log(eventDetailsArray);
		})
		res.json(eventDetailsArray);
	} finally {
		await client.close();
	}
});
app.delete('/events/:event_id/:user_id', async (req, res) => {
	const client = new MongoClient(uri);
	const event_id = req.params.event_id;
	const user_id = req.params.user_id;
	try {
		await client.connect();
		const database = client.db('app-data');
		const event = database.collection('events');
		const user = database.collection('users');
		const updateEvent = await event.updateOne({ event_id: event_id }, { $pull: { registered_users: { user_id: user_id } } });
		const updateUser = await user.updateOne({ user_id: user_id }, { $pull: { events: { event_id: event_id } } });
		updateUser && res.send('deleteEventFromUser');

	} finally {
		await client.close();
	}
});
app.post('/events/:event_id/:user_id', async (req, res) => {
	const client = new MongoClient(uri);
	const event_id = req.params.event_id;
	const user_id = req.params.user_id;
	const generatedUserId = uuidv4();
	try {

		await client.connect();
		const database = client.db('app-data');
		const users = database.collection('users');
		const events = database.collection('events');
		const eventDetailsArray = [];
		const User = await users.find({user_id: user_id}).toArray();
		const NewEvent = await events.find({event_id: event_id}).toArray();
		console.log(NewEvent);
		let new_start_time = NewEvent[0].event_start_timestamp.toString().match(/\d\d:\d\d/);
		let new_end_time = NewEvent[0].event_end_timestamp.toString().match(/\d\d:\d\d/);
		const Events = await events.find({}).toArray();
		const eventIdArray = [];
		User.forEach((user) => {
			for(let i = 0 ; i < user.events.length; i++){
				eventIdArray.push(user.events[i].event_id);
			}
		});
		eventIdArray.forEach((id1) =>  {
			for(let i = 0; i < Events.length; i++){
				if(Events[i].event_id === id1){
					eventDetailsArray.push(Events[i]);
				}
			}

		})
		let timeStartEndArray = [];
		for(let i = 0; i < eventDetailsArray.length; i++){
			let start_time = eventDetailsArray[i].event_start_timestamp.toString().match(/\d\d:\d\d/);
			let end_time = eventDetailsArray[i].event_end_timestamp.toString().match(/\d\d:\d\d/);
			timeStartEndArray.push({start: start_time[0], end: end_time[0]});
		}
		timeStartEndArray.push({start: new_start_time[0], end: new_end_time[0]});
		if(NewEvent[0].registered_users.length < NewEvent[0].event_capacity && !isOverlapping(timeStartEndArray)){

			const registeredUser = await users.updateOne(
				{ user_id: user_id },
				{ $push: { events: { event_id: event_id, user_code: generatedUserId } } }
			);
	
			const registeredEvent = await events.updateOne(
				{ event_id: event_id },
				{ $push: { registered_users: { user_id: user_id, user_code: generatedUserId } } }
			);
			res.json("success");
		}
	} finally {
		await client.close();
	}
});
app.post('/register/:id', async (req, res) => {
	const user_id = req.params.id;
	const client = new MongoClient(uri);
	const user = {user_id, events: []};
	try{
		await client.connect();
		const database = client.db('app-data');
		const events = database.collection('events');
		const users = database.collection('users');
		const registered = await users.insertOne(user);
		res.send({message: "registered" + "" + user_id});
	} finally {
		await client.close();
	}

});
app.listen(PORT, () => console.log('server running on PORT ' + PORT));

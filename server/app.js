"use strict";
const express 			= 	require("express"),
	  helmet 			= 	require('helmet'),
	  app				= 	express(),
	  cors 				= 	require('cors'),
	  puerto 			= 	process.env.PORT || 3300,
	  bodyParser 		= 	require('body-parser'),
	  db   				= 	require('./modules/database'),
	  striptags     	= 	require('striptags'),
	  sanitizer 		= 	require('sanitizer');

	app.use(helmet());
	app.use(helmet.hidePoweredBy({ setTo: 'Developed by https://jorger.github.io/page/es/' }));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(cors());

	//Función que busca una palabra...
	/*
	TODO
	Separar la función...
	*/
	let findWord = (word, callback) => {
		db.coleccion("words").findOne({word : word.toLowerCase()}, (err, meaning) => {
			if (err) console.warn("Error buscar palabra", err.message);
			callback(err, meaning);
		});
	};

	app.get("/all", (req, res) => {
		let word = striptags(sanitizer.escape(req.params.word));
		db.coleccion("words").find({}, {limit : 20, sort : ['word', 'asc']}).toArray((err, words) => {
			res.json({words, error : words.length === 0 });
		});
	});

	app.get("/searchword/:word", (req, res) => {
		let word = striptags(sanitizer.escape(req.params.word));
		db.coleccion("words").find({'word': {'$regex': word.toLowerCase()}}, {limit : 5}).toArray((err, words) => {
			res.json({words, error : words.length === 0 });
		});
	});
	
	//Servicios extensión...
	app.get("/word/:word", (req, res) => {
		let word = striptags(sanitizer.escape(req.params.word));
		findWord(word, (err, meaning) => {
			if(meaning)
				res.json(meaning);
			else
				res.json({word, error : true});
		});
	});

	app.post("/saveword", (req, res) => {
		let data 	= req.body,
			words 	= db.coleccion("words"),
			date 	= new Date();
		data.fecha = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
		data.word = striptags(sanitizer.escape(data.word.toLowerCase()));
		data.meaning = striptags(sanitizer.escape(data.meaning));
		words.insert(data, (err, doc) => {
			if (err) console.warn("Error guarda", err.message);
			if(doc.result.ok === 1){
				res.json({status : true});
			}
		});
	});

	db.conectaMongo((err, database) =>
	{
		if(err) throw err;
		let server = app.listen(puerto, (err) =>
		{
	   		if(err) throw err;
	   		let message = 'Servidor corriendo en @ http://localhost:' + server.address().port;
	   		console.log(message);
		});
	});

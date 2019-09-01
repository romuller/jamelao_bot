const { prefix, token } = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const { msg } = require('./chok.json');

client.login( token );

client.on('ready', () => {
	console.log('entrei nessa porra');
	client.user.setStatus('available')
    client.user.setPresence({
        game: {
            name: '!help',
        }
    });
});

const commandList = ['comer', 'idai', 'bater', "ofender", "observar", "chok" ];

const ofensasIndividuais = ["a sua mãe é tão grande que tem o próprio fuso horário",
							"planta bananeira em chuva de piroca",
							"transa de costas",
							"chupa pinto",
							"queima a rosca"];

const ofensasColetivas = ["fez uma suruba com vossa mãe... ta em chok kk?"];

client.on('message', message => {

	if ( !message.content.startsWith(prefix) || message.author.bot ) {
		if ( !message.content.startsWith(prefix) && message.mentions.everyone && !message.author.bot ){
			return message.channel.send('Marca a mãe também fdp');
		}
		return;
	}

	const splitCommand = message.content.slice(prefix.length).split(/ +/);
	const command = splitCommand.shift().toLowerCase();
	
	if ( command === 'merda' ){
		return message.channel.send('Tu que é um merda, rapá');
	}

	else if(command === 'observar'){

		const observado = message.mentions.users.first();

		if ( !message.mentions.users.size && !message.mentions.everyone ) {
			return message.reply('precisa especificar né...');
		}

		if(!message.mentions.users.first().presence.game){
			return message.channel.send(observado + " não está fazendo nada");
		}
		else {
			return message.channel.send(observado + "está jogando " + message.mentions.users.first().presence.game.name);
		}

	}

	else if(command === 'ofender'){

		if ( !message.mentions.users.size && !message.mentions.everyone ) {
			return message.reply('precisa especificar né...');
		}

		const alvo = message.mentions.users.first();
		
		if (message.mentions.everyone) {
			return message.channel.send( " O Jamelão " + ofensasColetivas[ofensaEscolhida = Math.floor(Math.random() * ofensasColetivas.length)] );
		}
		else{
			return message.channel.send( alvo + " " + ofensasIndividuais[Math.floor(Math.random() * ofensasIndividuais.length)] );
		}
		
	}

	else if (command === 'bater'){
		if ( !message.mentions.users.size && !message.mentions.everyone ){
			return message.channel.send(message.author + ' enfiou a mão no cu');
		}
		else if (message.mentions.users.first() === message.author){
			return message.channel.send(message.author + ' gozou no teclado');
		}
		else if ( message.mentions.everyone ){
			return message.channel.send(message.author + ' bateu uma pra todo mundo');
		}
		else {
			return message.channel.send(message.author + ' bateu uma pro ' + message.mentions.users.first());
		}
	}

	else if ( command === 'comer' ) {
		if ( !message.mentions.users.size && !message.mentions.everyone ) {
			return message.reply('precisa especificar né...');
		}
		
		const alvo = message.mentions.users.first();
		const comedor = message.author;

		if ( message.mentions.everyone ){
			return message.channel.send( comedor.username + ' comeu todo mundo do ' + message.channel.guild );
		}
		else if ( comedor.username === alvo.username ){
			message.channel.send( comedor.username + ' se comeu kkj mó retardado' );
		}
		else{
			message.channel.send( comedor.username + ' comeu ' + alvo.username + ' kkj' );
		}
	}

	else if ( command === 'idai' ){
		message.channel.send({
				embed: {
					thumbnail: {
						url: 'https://i.pinimg.com/originals/82/42/ee/8242ee01f0193bcc49746adfeefa827d.jpg'
					}
				}
			});
	}

	else if (command === 'help'){
		var content = new String;
		for (const command of commandList) {
			content += ("!" + command + "\n").toString();
		}
		return message.channel.send(content);
	}

	else if (command === 'chok'){

		var content = new String;

		for (const line of msg) {
			content += ( line + "\n");
		}

		return message.channel.send(content);

	}

	else{
		return message.channel.send( 'como assim, não entendi' ,{
				  embed: {
				  	thumbnail: {
				    	url: 'http://pm1.narvii.com/6720/c19745f0fdaeafa01ce90fddf9be489b4342e75c_00.jpg',
				  	}
				  }
				});
	}

});
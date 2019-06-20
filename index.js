const commands = require('./commands.json');
const { prefix, token } = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();

client.login( token );

client.on('ready', () => {
	console.log('entrei nessa porra');
});

const command_list = ['comer', 'idai', 'merda' ];

client.on('message', message => {

	if ( !message.content.startsWith(prefix) || message.author.bot ) 
		return;

	const splitCommand = message.content.slice(prefix.length).split(/ +/);
	const command  = splitCommand.shift().toLowerCase();
	
	if ( command === 'merda' ){
		return message.channel.send('Tu que é um merda, rapá');
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
		for (const command of command_list) {
			content += ("!" + command + "\n").toString();
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
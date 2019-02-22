const commands = require('./commands.json');
const { prefix, token } = require('./config.json');
const go_discord = require('discord.js');
const go_client = new go_discord.Client();

go_client.login( token );

go_client.on('ready', () => {
	console.log('entrei nessa porra');
});

const command_list = ['comer', 'idai', 'merda' ];

go_client.on('message', message => {

	if ( !message.content.startsWith(prefix) || message.author.bot ) 
		return;

	const lc_args = message.content.slice(prefix.length).split(/ +/);
	const lc_cmd  = lc_args.shift().toLowerCase();
	
	if ( lc_cmd === 'merda' ){
		return message.channel.send('Tu que é um merda, rapá');
	}

	else if ( lc_cmd === 'comer' ) {
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

	else if ( lc_cmd === 'idai' ){
		message.channel.send({
				embed: {
					thumbnail: {
						url: 'https://i.pinimg.com/originals/82/42/ee/8242ee01f0193bcc49746adfeefa827d.jpg'
					}
				}
			});
	}

	else if (lc_cmd === 'help'){
		for (const command of command_list) {
			message.channel.send(command);
		}
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
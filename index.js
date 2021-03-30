const Discord = require('discord.js'); // discord's api
const fs = require('fs'); // to see the commands folder
const { prefix, token } = require('./config.json'); // tell the index.js for a prefix and a token

const client = new Discord.Client();
client.commands = new Discord.Collection();

// Command Handler //

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +  /);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;
    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.log(error);
        message.reply('There Was An Issue Execution That Command!');
    }
})

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', async () => {
    console.log(`Username: ${client.user.username}`);
    client.user.setActivity(`Under Development` , {type: 'PLAYING'});
});

client.login(token);

require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'hey',
        description: 'Replies with hey!'
    }, {
        name: 'purge',
        description: 'Purges a batch of messages in the current channel',
        options: [
            {
                name: 'amount',
                description: 'Specify the amount of messages you want to purge',
                type: ApplicationCommandOptionType.Number,
                required: true
            }
        ]
    }, {
        name: 'say',
        description: 'Tell me what to say',
        options: [
            {
                name: 'message',
                description: 'Specify the message you want me to say',
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    }, {
        name: 'info',
        description: 'Provides info about this bot'
    }, {
        name: 'joke',
        description: 'Tells a joke'
    }
];

const rest = new REST({version:'10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('> Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(process.env.BOT_ID, process.env.GUILD_ID),
            { body: commands }
        );

        console.log('✔ Slash commands registered successfully!');
    } catch (err) {
        console.log("❌❌❌");
        console.log(err);
        console.log("❌ Failed to register slash commands.")
    }
})();
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
    }, {
        name: 'quote',
        description: 'Enlightens you with wise words',
        options: [
            {
                name: 'category',
                description: 'Filter by category',
                type: ApplicationCommandOptionType.String,
                required: false,
                choices: [
                    {
                        name: "architecture",
                        value: "architecture"
                    }, {
                        name: "art",
                        value: "art"
                    }, {
                        name: "business",
                        value: "business"
                    }, {
                        name: "change",
                        value: "change"
                    }, {
                        name: "computers",
                        value: "computers"
                    }, {
                        name: "courage",
                        value: "courage"
                    }, {
                        name: "dreams",
                        value: "dreams"
                    }, {
                        name: "experience",
                        value: "experience"
                    }, {
                        name: "failure",
                        value: "failure"
                    }, {
                        name: "fear",
                        value: "fear"
                    }, {
                        name: "fitness",
                        value: "fitness"
                    }, {
                        name: "friendship",
                        value: "friendship"
                    }, {
                        name: "funny",
                        value: "funny"
                    }, {
                        name: "future",
                        value: "future"
                    }, {
                        name: "graduation",
                        value: "graduation"
                    }, {
                        name: "happiness",
                        value: "happiness"
                    }, {
                        name: "health",
                        value: "health"
                    }, {
                        name: "home",
                        value: "home"
                    }, {
                        name: "imagination",
                        value: "imagination"
                    }, {
                        name: "inspirational",
                        value: "inspirational"
                    }, {
                        name: "intelligence",
                        value: "intelligence"
                    }, {
                        name: "knowledge",
                        value: "knowledge"
                    }, {
                        name: "learning",
                        value: "learning"
                    }, {
                        name: "life",
                        value: "life"
                    }, {
                        name: "success",
                        value: "success"
                    }
                ]
            }
        ]
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
        console.log("❌");
        console.log(err);
        console.log("❌ Failed to register slash commands.");
    }
})();
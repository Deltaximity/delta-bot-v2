require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, underscore } = require('discord.js');

// intents, data access
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

client.on("ready", (e) => {
    console.log(`✔ ${e.user.tag} is ready.`);
});

client.on("messageCreate", async (e) => {
    if (e.author.bot) return; // bot barrier

    let msg = e.content.toLowerCase();

    if (msg.includes("delta") || msg.includes("<@483941946495336487>")) {
        e.channel.send("Hold on... give Delta a moment, he's probably drowning in the toilet.");
    } else if (msg.includes("welcome")) {
        e.channel.send("Welcome!! ^^");
    } else if (msg === "owo") {
        e.channel.send("What's This?");
    } else if (msg === "no u" || msg === "no you") {
        e.channel.send("no u");
    } else if (msg.includes("no u") || msg.includes("no you")) {
        e.channel.send("Fine! you win :x");
    } else if (msg.includes("hmm")) {
        e.channel.send("Hmm indeed...") || e.channel.send("Hm?");
    } else if (msg.includes("pog")) {
        e.channel.send(":O");
    } else if (msg === "what" || msg === "wat" || msg === "wut") {
        e.channel.send("What?");
    } else if (msg.includes("nani")) {
        e.channel.send("NANI!?");
    } else if (msg.includes("gigachad") && msg.includes("suck")) {
        e.channel.send("No, we all know gigachad is the best!");
    } else if (msg.includes("shut up")) {
        e.channel.send("That's not very nice. Do you need some mental help?");
    }
});

client.on("interactionCreate", (e) => {
    if (!e.isChatInputCommand()) return; // slash command barrier

    switch (e.commandName) {
        case 'hey':
            e.reply("hey!");
            break;
        case 'purge':
            let amount = e.options.get('amount').value;
            if (amount > 100) {e.reply("Are you trying to delete the server from existence or what?"); return;}
            if (amount = 0) {e.reply("I would do something better with my time."); return;}
            if (amount < 0) {e.reply("You trying to do reverse psychology on me? Nice try."); return;}
            purge(e, amount);
            break;
        case 'say':
            e.channel.send(e.options.get('message').value);
            e.reply({ content: "Done. 🗿", ephemeral: true });
            break;
        case 'info':
            const devEmbed = new EmbedBuilder()
                .setColor('#000000')
                .setTitle('Deltaximity - Github')
                .setURL('https://github.com/Deltaximity')
                .setDescription('I\'m being programmed by <@483941946495336487>. Click the link above to see me on Github!')
            
            e.reply({ embeds:[devEmbed] });
            break;
        case 'joke':
            joke(e);
            break;
        case 'quote':
            let category;
            if (e.options.get('category') !== null) {
                category = e.options.get('category').value;
                quote(e, category);
            } else {
                quote(e);
            }
            break;
    }
});

async function purge(e, amount) {
    await e.channel.messages.fetch({limit:amount}).then((messages) => {
        e.channel.bulkDelete(messages);
        e.reply(`Purged ${amount} message(s).`);
        setTimeout(() => e.channel.bulkDelete(1), 5000);
    });
}

async function joke(e) {
    const { id, type, setup, punchline } = await fetch(`https://official-joke-api.appspot.com/jokes/random`).then(response => response.json());
    e.reply(setup);
    setTimeout(() => {
        e.channel.send(punchline);
    }, 4000);
}

async function quote(e, category) {
    const request = require('request');
    let url = "https://api.api-ninjas.com/v1/quotes";
    if (category) url += `?category=${category}`;
    request.get({
        url: url,
        headers: {
            'X-Api-Key': process.env.API_NINJA
        },
    }, function (error, response, body) {
        if (error) {
            return console.error('Request failed:', error);
        } else if (response.statusCode != 200) {
            return console.error('Error:', response.statusCode, body.toString('utf8'));
        } else {
            const res = JSON.parse(body);
            e.reply(`[${res[0].category}] "${res[0].quote}" - ${res[0].author}`);
        }
    });
}

client.login(process.env.TOKEN);

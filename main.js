const Discord = require('discord.js'),
    client = new Discord.Client(),
    config = require('./config.json')
    fs = require('fs')
 
client.login(config.token)
client.commands = new Discord.Collection()

 
fs.readdir('./commands', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command)
    })
})
 
client.on('message', message => {
    if (message.type !== 'DEFAULT' || message.author.bot) return
 
    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if (!commandName.startsWith(config.prefix)) return
    const command = client.commands.get(commandName.slice(config.prefix.length))
    if (!command) return
    command.run(message, args, client)
})

client.on('ready', () => {
    const statuses = [
        () => `by Alice | https://github.com/SaabniaTv UwU`,
        () => `${config.name} ^^`,
        () => `.join / .leave UwU`
    ]
    let i = 0
    setInterval(() => {
        client.user.setActivity(statuses[i](), {type: 'PLAYING'})
        i = ++i % statuses.length
    }, 1e4)
})

console.log(`Est en ligne !`);
console.log('Commands = .join / .leave / .info')

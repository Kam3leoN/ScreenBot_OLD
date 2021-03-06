const { Command } = require('discord-akairo');

class KickCommand extends Command {
    constructor() {
        super('kick', {
           aliases: ['kick'],
           args: [
            {
              id: 'member',
              type: 'member',
            },
            {
                id: 'reason',
                type: 'string',
            },
           ],
           clientPermissions: ["KICK_MEMBERS"],
           userPermissions: ["KICK_MEMBERS"],
           channel: "guild",
        });
    }

    async exec(message, args) {
        message.delete();
        if (!args.member) return message.reply("Aucun membre n'a été trouvé !");
        if (!args.member.kickable) return message.reply('Je ne peut pas le kick !');
        await args.member.kick({ reason: args.reason ? args.reason : 'no reason' }).then(onfulfilled => {
            return message.channel.send(`${args.member} a été kick !`);
        }).catch(onrejected => {
            require('./../../utils/error')(onrejected, message, client);
            return message.channel.send(`Une erreur est survenue`);
        });
        require('./../../utils/error')(new Error({
            message: 'La commande \"KICK\" à mal était executé pour cause le /return/ n\'as pas était éxecuté',
            type: '"return" not fonctionned'
        }));
    }
}

module.exports = KickCommand;
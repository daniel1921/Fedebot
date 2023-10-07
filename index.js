const Discord = require("discord.js");
const axios = require("axios");
require("dotenv").config();

const client = new Discord.Client({ intents: 32767 });


client.on("ready", () => {
  console.log(`El bot esta listo, su nombre es: ${client.user.tag}`);

  // Lista De comandos

  client.application.commands.set([
    {
      name: "registro",
      description:
        "Este comando se utiliza para Registrarse en el discord, debe tener su mismo nick que en Albion",
      options: [
        {
          type: 3,
          name: "user",
          description: "El usuario que se desea registrar",
          required: true,
        },
      ],
    },
  ]);
});

//
try {
    client.on("interactionCreate", (int) => {
        if (int.isCommand() && int.commandName === "registro") {
          const nickname = int.options.getString("user");
      
    
      
          axios
            .get(
              `https://gameinfo.albiononline.com/api/gameinfo/search?q=${nickname}`
            )
      
            .then(function (response) {
              const playersLowerCase = [];
      
              response.data.players.forEach((player) => {
                playersLowerCase.push({
                  player: player.Name.toLowerCase(),
                  guild: player.GuildName,
                });
              });
      
              const estaElPlayer = playersLowerCase.some(
                (miembro) =>
                  miembro.guild === "La Federacion Y" &&
                  miembro.player === nickname.toLowerCase()
              );
      

      
              if (response.data.players.length === 0) {
                return int.reply(
                  ` El usuario ${nickname}, No esta escrito correctamente, porfavor vuelve a intentarlo!`
                );
              } else if (estaElPlayer) {
                try {
                  int.member.roles.add("955948751338471455");
                  int.member.setNickname(nickname);
      
                  return int.reply(
                    ` El usuario ${nickname}, se ha registrado en el servidor, Bienvenido! :green_heart:  `
                  );
                } catch (error) {
                  return int.reply(
                      error
                    );
                }
              } else if (!estaElPlayer) {
                return int.reply(
                  ` Hubo un problema al momento de registrarte, probablemente no estes en el gremio, no esperes para ser parte nuestra comunidad  :beers: `
                );
              }
              // else if(response.data.players[0].GuildName === '')    {
      
              //     return  int.reply(` El usuario ${response.data.players[0].Name} aun no tiene gremio, no esperes para ser parte nuestra comunidad  :beers:  `);
      
              // }
              //  else if(response.data.players[0].GuildName !== 'La Federacion Y' ) {
      
              //   return  int.reply(` El usuario ${response.data.players[0].Name} actualmente esta en el gremio ${response.data.players[0].GuildName}, Si deseas unirte al gremio debes primero abandonar en el que estas. `);
      
              // }
            });
        }
      });
} catch (error) {
    console.log(error)
}


client.login(process.env.TOKEN_DISCORD);

const Discord = require('discord.js');
const axios = require('axios');
require('dotenv').config();

const client = new Discord.Client({intents: 32767});

const infiteLoop = async (j) => {
    if(j === 100) {
        j = 0
        console.clear();
    }
    let i = j + 1
    setTimeout(() => {
        console.log(j)
        infiteLoop(i); 
    }, 5000);
    
    
   
}

client.on('ready', () => {

    console.log(`El bot esta listo, su nombre es: ${client.user.tag}`)
 //   infiteLoop(0);
// Lista De comandos

    client.application.commands.set([
        {
            name: 'registro',
            description: 'Este comando se utiliza para Registrarse en el discord, debe tener su mismo nick que en Albion',
            options: [
                {
                    type: 3,
                    name: 'user',
                    description: 'El usuario que se desea registrar',
                    required: true
                }

            ]
        }
    ])


});


// 

    client.on('interactionCreate', (int) => {

        if(int.isCommand() && int.commandName === 'registro') {
    
            const nickname = int.options.getString('user')
           
           // console.log(int);
           // console.log(int.member.roles);
    
           
         
            
    
            axios.get(`https://gameinfo.albiononline.com/api/gameinfo/search?q=${nickname}`)
    
            .then(function (response) {           
             
                if(response.data.players.length === 0) {
    
                  return  int.reply(` El usuario ${nickname}, No esta escrito correctamente, porfavor vuelve a intentarlo!`);
    
                }
                else if(response.data.players[0].GuildName === '')    {
    
                    return  int.reply(` El usuario ${response.data.players[0].Name} aun no tiene gremio, no esperes para ser parte nuestra comunidad  :beers:  `);
                    
                }
                 else if(response.data.players[0].GuildName !== 'La Federacion Y' ) {
    
                  return  int.reply(` El usuario ${response.data.players[0].Name} actualmente esta en el gremio ${response.data.players[0].GuildName}, Si deseas unirte al gremio debes primero abandonar en el que estas. `);
    
                } 
            
                    int.member.roles.add('955948751338471455');
                    int.member.setNickname(nickname);
              
               
                            
                return int.reply(` El usuario ${nickname}, se ha registrado en el servidor, Bienvenido! :green_heart:  `);
              
    
            })
    
    
           
            
        }
    })




client.login(process.env.TOKEN_DISCORD);


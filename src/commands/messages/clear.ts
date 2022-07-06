import Commands from "../../structures/ICommand";
import { SlashCommandBuilder } from "@discordjs/builders";
import {TextChannel} from "discord.js";


export = new Commands(
    new SlashCommandBuilder()
            .setName("clear")
            .setDescription("clear messages in channel")
            .addNumberOption(option => option.setName("amount").setDescription("amount of messages to delete ::minus to all::"))
            .setDefaultPermission(true)
    ,

    async (client, interaction) => {
        let amount = interaction.options.getNumber("amount");
        if(amount === null) {
            await interaction.followUp(`no amount!`);
            return;
        }
        
        if(amount >= 0) {
            try {
                await (interaction.channel as TextChannel).bulkDelete(amount + 1);
            } catch (err) {
                await interaction.followUp(`callback error: ${err}`)
            }
        } else {
            await interaction.followUp(`amount should be positive number, not : ${amount}`)
            // todo : clear all
        }
    }
)

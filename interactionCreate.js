module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {
        if (!interaction.isCommand()) return;
        const command = client.slashCommands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.executeSlash(interaction);
        } catch (err) {
            console.error(err);
            await interaction.reply({ content: 'Error while executing command.', ephemeral: true });
        }
    }
};
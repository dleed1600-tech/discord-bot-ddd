const db = require('quick.db');

module.exports = {
    add(guildId, messageId, emoji, roleId) {
        db.set(`rr_${guildId}_${messageId}_${emoji}`, roleId);
    },
    remove(guildId, messageId, emoji) {
        db.delete(`rr_${guildId}_${messageId}_${emoji}`);
    },
    get(guildId, messageId, emoji) {
        return db.get(`rr_${guildId}_${messageId}_${emoji}`);
    }
};
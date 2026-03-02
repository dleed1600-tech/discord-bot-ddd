const db = require('./db');

// simple xp/level system: xp = current xp, level = floor(0.1 * sqrt(xp)) or another formula

module.exports = {
    async addXP(guildId, userId, amount) {
        const res = await db.query(
            'INSERT INTO xp (guild_id, user_id, xp) VALUES ($1, $2, $3) ON CONFLICT (guild_id, user_id) DO UPDATE SET xp = xp + $3 RETURNING xp',
            [guildId, userId, amount]
        );
        return res.rows[0].xp;
    },
    calcLevel(xp) {
        return Math.floor(0.1 * Math.sqrt(xp));
    },
    async getXP(guildId, userId) {
        const res = await db.query('SELECT xp FROM xp WHERE guild_id=$1 AND user_id=$2', [guildId, userId]);
        return res.rows[0] ? res.rows[0].xp : 0;
    },
    async getLeaderboard(guildId, limit = 10) {
        const res = await db.query(
            'SELECT user_id, xp FROM xp WHERE guild_id=$1 ORDER BY xp DESC LIMIT $2',
            [guildId, limit]
        );
        return res.rows;
    }
};
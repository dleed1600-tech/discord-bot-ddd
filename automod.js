const banned = ['badword'];
module.exports = {
    check(message) {
        const lower = message.content.toLowerCase();
        for (const word of banned) {
            if (lower.includes(word)) return true;
        }
        return false;
    }
};
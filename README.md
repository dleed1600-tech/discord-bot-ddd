# Discord Bot Boilerplate

A full-featured Discord bot skeleton using Node.js, discord.js v14, and PostgreSQL.

## Features (basic implementation)
- **Moderation**: warn, kick, ban, mute (via commands)
- **Automod/anti-spam**: simple rate-limiter on messages
- **XP/levels** with leaderboard (stored in PostgreSQL)
- **AI chat & image** commands with placeholder stubs
- **Ticket system**: create/close ticket channels
- **Music playback** from YouTube with queue
- **Reaction roles** setup via command and role assignment
- **Economy**: balance, daily, shop, buy commands using quick.db
- **Polls**: create simple emoji polls
- **Welcome/leave messages** and auto-role on join
- **Server statistics** command
- **Reminders**: one-off reminders via command
- **Twitch/YouTube integration** stub command
- **Slash command support** with deploy script
- **Web dashboard** placeholder using Express

## Setup
1. Clone or copy this repo.
2. Run `npm install` to install dependencies.
3. Create `.env` from `.env.example` and fill in your bot token, prefix, CLIENT_ID, and database URL.
4. Run `node src/deploy-commands.js` to register slash commands (requires CLIENT_ID env variable).
5. Prepare PostgreSQL tables; example schema:

```sql
CREATE TABLE xp (
  guild_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  xp BIGINT DEFAULT 0,
  PRIMARY KEY (guild_id, user_id)
);
```

You can add more tables (`warns`, `tickets`, etc.) as needed.

6. Start the bot with `npm run dev` or `npm start`.

---
This repository now contains a working bot skeleton covering most requested features. Extend each module further when you need more robust behavior. See code comments for guidance.
## Directory structure
```
src/
  commands/        # commands grouped by category
  events/          # event handlers
  utils/           # helper functions (database, formatting, etc.)
  index.js         # entry point
```

## Adding commands
Create command files under `src/commands/<category>/`. Each command exports `name`, `description`, an optional `slash` boolean and methods `execute` (message) and `executeSlash` (interaction).

## Building features
Refer to the README sections above when implementing each subsystem. Consider using separate classes or modules in `src/utils` for database access, moderation logging, XP handling, etc.

---
This repository is meant to serve as the foundation for the rich feature set you've requested. Each section will need further implementation; see Discord.js guides and community resources for detailed patterns.
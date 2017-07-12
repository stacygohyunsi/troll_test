# About Troll Bot
Troll Bot is a Telegram bot that replies motivational message when it detects a troll within the message.

A new intended feature is to use it as a reminder bot where user can pin reminders and it will automatically remind users in a certain interval.

# Usage
1. Git clone the repository
2. run `npm install`
3. run `node index.js`
4. Create a telegram bot using telegram botfather
5. In `config/index` folder, use the generated token from the botfather and to fill up the key


To use the feature to save reminders to Google sheets, 
1. You have to create a google sheet 
2. Take the spreadsheet key from the URL of your google sheet and fill it in `config/index`
3. For authentication of writing to Google sheets using a service account, follow the setup instructions below.

**Setup Instructions**

1. Go to the Google Developers Console
2. Select your project or create a new one (and then select it)
3. Enable the Drive API for your project
4. Create a service account for your project
5. Save your generated JSON key file as `Troll-bot.json` in config.

# Features
## troll [words]
Allows the bot to reply you with a motivational message.

## troll pin [reminder]
Allows you to pin a reminder for reference later.

## troll remind
Shows you a list of whatever you have pinned.

## troll create
Allows you to create your own motivational message.

After typing `troll create`, you should receive a prompt which says 'Send me a message to be added to your list of motivational messages.'

## troll store
Allows you to store your reminders into a Google sheet.


# Check List

- [x] Reminders to be stored in easily accessible places e.g. Google Drive, Google Sheets
- [x] Customizable Motivational Message
- [x] Handle other text without the word 'troll'
- [x] Automatically sends reminders for certain intervals
- [x] Added in ESlint, .gitignore
- [x] Fixed grammatical errors
- [x] Split code into components
- [ ] Error handling
- [ ] Add in API.ai
- [ ] Unit Tests (half done!)
- [ ] CI/CD pipeline
- [ ] Use a database such as Mongodb/Redis

# Sources
For information on how to setup a telegram bot:
https://core.telegram.org/bots

Telegram library used to develop telegram bot:
https://github.com/Naltox/telegram-node-bot

Google Spreadsheet library used to save reminders:
https://github.com/theoephraim/node-google-spreadsheet
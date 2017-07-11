# About Troll Bot
Troll Bot is a Telegram bot that replies motivational message when it detects a troll within the message.

A new intended feature is to use it as a reminder bot where user can pin reminders and it will automatically remind users in a certain interval.

# Usage
For information on how to setup a telegram bot:
https://core.telegram.org/bots

Library used to develop telegram bot:
https://github.com/Naltox/telegram-node-bot

Just create a telegram bot using telegram botfather, then replace the key in the code and run the js file

1. Git clone the repository
2. run `npm install`
3. run `node index.js`

And you should be able to test the bot by sending a private message to the bot.


## troll [words]
Allows the bot to reply you with a motivational message.

## troll pin [reminder]
Allows you to pin a reminder for reference later.

## troll remind
Shows you a list of whatever you have pinned.

## troll create [message]
Allows you to create your own motivational message.

## troll store [reminder]
Allows you to store your reminders into a Google sheet


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
- [ ] Unit Tests
- [ ] CI/CD pipeline
- [ ] Use a database such as Mongodb/Redis

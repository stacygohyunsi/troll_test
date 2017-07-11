'use strict';

const Telegram = require('telegram-node-bot');
const Config = require('./config');
const Store = require('./components/Store');
const Replies = require('./components/Replies');
const Reminders = require('./components/Reminders');
const announcements = require('./components/Announcements.js').announcements;
const async = require('async');
const TelegramBaseController = Telegram.TelegramBaseController;
const RegexpCommand = Telegram.RegexpCommand;
const telegramBot = new Telegram.Telegram(Config.telegram, { workers: 1 });

let count = 0;

Reminders.handleAutomaticReminders(function(id, result) {
    console.log(id, result);
    telegramBot.api.sendMessage(id, result);
});

class OtherwiseController extends TelegramBaseController {
    handle($) {
        $.sendMessage('Sorry I dont understand - I ish troll bot so obviously you need to type in `troll pin`, `troll create`, `troll remind` to do something!');
    }
}

class PingController extends TelegramBaseController {
    pingMessage($) {
        console.log(count);
        // var randInt = Math.floor(Math.random() * 
        // ((ansArr.length-1) - 0 + 1) + 0);
        let randInt = count += 1;
        let reply = Replies[randInt];
        $.sendMessage(reply[0]);

        if (reply.length > 1) {
            setTimeout(function() {
                $.sendMessage(reply[1]);
            }, 5000);
        }
        if (count == Replies.length) {
            count = 0;
        }
    }

    pinMessage($) {
        let newItem = {
            message: $.message.text,
            dateAdded: new Date(),
        };
        if (announcements[$.message.chat.id] == undefined) {
            announcements[$.message.chat.id] = [];
        }
        announcements[$.message.chat.id].push(newItem);
        $.sendMessage('Your message have been added!');
    }

    remindMessage($) {
        let chatGrpReminders = announcements[$.message.chat.id];
        if (chatGrpReminders != undefined && chatGrpReminders.length > 0) {
            let result = Reminders.generateReminders(chatGrpReminders);
            $.sendMessage(result);
        } else {
            $.sendMessage('No Announcement Yet! Please try later');
        }
    }

    storeMessage($) {
        let chatGrpReminders = announcements[$.message.chat.id];
        if (chatGrpReminders != undefined && chatGrpReminders.length > 0) {
            async.series([
                Store.setAuth,
                Store.getInfoAndWorksheets,
                (next) => {
                    Store.updateSheets(chatGrpReminders, next)
                }
            ], function(err){
                if( err ) {
                    console.log('Error: ' + err);
                }
                $.sendMessage('Reminders are stored in Google Docs.');
            })
        }
    }

    createMessage($) {
        const form = {
            message: {
                q: 'Send me a message to be added to your list of motivational messages.',
                error: 'Sorry, wrong input. Please type in a message to be added to your list',
                validator: (message, callback) => {
                    if(message.text) {
                        callback(true, message.text)
                        return
                    }
                    callback(false)
                }
            }
        }
        $.runForm(form, (result) => {
            Replies.push([result.message]);
            $.sendMessage('Your message have been added!');
        })
    }

    get routes() {
        return {
            'pingCommand': 'pingMessage',
            'pinCommand': 'pinMessage',
            'remindCommand': 'remindMessage',
            'newMessageCommand': 'createMessage',
            'newStoreCommand': 'storeMessage'
        };
    }
}

telegramBot.router
    .when(
        new RegexpCommand(/^troll pin /i, 'pinCommand'),
        new PingController()
    )
    .when(
        new RegexpCommand(/^troll remind/i, 'remindCommand'),
        new PingController()
    )
    .when(
        new RegexpCommand(/^troll create/i, 'newMessageCommand'),
        new PingController()
    )
    .when(
        new RegexpCommand(/^troll store/i, 'newStoreCommand'),
        new PingController()
    )
    .when(
        new RegexpCommand(/troll/i, 'pingCommand'),
        new PingController()
    )
    .otherwise(new OtherwiseController())

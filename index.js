'use strict'

var count = 0;
var http = require("http");

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const TextCommand = Telegram.TextCommand;
const RegexpCommand = Telegram.RegexpCommand;
const tg = new Telegram.Telegram('Your Key Here',{
});

var lastSentDay = (new Date()).getDay();

var checkInt = setInterval(function(){
    var today = new Date();
    if(lastSentDay != today.getDay() && today.getHours() >= 1){
        if(today.getDay() != 5 && today.getDay() != 6){
            sendRemind();
            lastSentDay = today.getDay();
        }
    }
    removeOldRecords();
}, 600000); //every 10 mins

function sendRemind(){
    remindMessage();
}

function remindMessage(){
    for(var id in annoucements){
        var chatGrpReminders = annoucements[id];
        
        if(chatGrpReminders != undefined && chatGrpReminders.length > 0){
            var result =  "Here are the reminders\n";
            result =  result + "=======================\n";
            for(var i = 0; i < chatGrpReminders.length; i++){  
                var rawStr = chatGrpReminders[i].message.message.text;
                var stringToAdd = rawStr.substring("troll pin ".length);
                result += (i+1).toString()+"-"+ stringToAdd + "\n";
            }
            result =  result + "=======================\n";
            result = result + "That's all folks!";
            tg.api.sendMessage(id, result);
        }    
    }
}

const annoucements = {};
const ansArr = [
                ["Chill and listen to this.... https://www.facebook.com/ProgrammersCreateLife/videos/1374850705897137/?hc_ref=NEWSFEED ... while listening, help to clear it? :)"],
                ["Eh Eh! What's this? What's this? To the person who did this, let's keep our workplace clean like our home.... unless you do this at home?"],
                ["Wah lau eh, why always tell me? The one who did it, you better own up and settle it ar!!"],
                ["Can someone help to settle it? If not settled, it will bring down our productivity by 29.1313846353813%!"],
                ["Wah lau eh, this is like the 87 times this is happening, why like that ar?"],
                ["Yeah, this is bad.. can someone help to settle it?"],
                ["Can you take care of it? Take one for the team!"],
                ["Clear it! Clear it! Mai Tu Liao!"],
                ["This one bo swee, can someone help? Thanks!"],
                ["Here got problem, there got problem, but there is only 1 bot here, how ar?"],
                ["Thank you for contacting the TrollBot service, please hold while we connect you to the operator........","Eh... wait, there is no operator! Please help to settle it? Thanks!"]];

function removeOldRecords(){
    var currDate = new Date();
    for(var id in annoucements){
        var chatGroupReminder = annoucements[id];
        for(var i = chatGroupReminder.length -1; i >= 0 ; i--){
            if(daysBetween(chatGroupReminder[i].dateAdded,currDate) >=5){
                console.log("Clearing Data", chatGroupReminder[i]);
                chatGroupReminder.splice(i,1);
            }
        }
    }
}
    
function daysBetween( date1, date2 ) {
    console.log(date1);
    console.log(date2);
    //Get 1 day in milliseconds
    var one_day=1000*60*60*24;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    return Math.round(difference_ms/one_day); 
}

class PingController extends TelegramBaseController {
    
    pingHandler($) {
//        var randInt = Math.floor(Math.random() * ((ansArr.length-1) - 0 + 1) + 0);
        var randInt = count++;
        var reply = ansArr[randInt];
        $.sendMessage(reply[0]);
        
        if(reply[1] != undefined){
            setTimeout(function(){
                $.sendMessage(reply[1]);
            }, 5000);
        }      
        if(count == ansArr.length){
            count = 0 ;
        }
    }

    pinMessage($) {
        var newItem = {
            message: $,
            dateAdded: new Date()
        };
        console.log(newItem);
        if(annoucements[$.message.chat.id] == undefined){
            annoucements[$.message.chat.id] = [];
        }
        annoucements[$.message.chat.id].push(newItem);
        $.sendMessage("Your message have been added! ");
        //$.message.text
    }
    
    remindMessage($){
        var chatGrpReminders = annoucements[$.message.chat.id];
        
        if(chatGrpReminders != undefined && chatGrpReminders.length > 0){
            var result =  "Here are the reminders\n";
            result =  result + "=======================\n";
            for(var i =0; i < chatGrpReminders.length; i++){
                var rawStr = chatGrpReminders[i].message.message.text;
                var stringToAdd = rawStr.substring("troll pin ".length);
                result += (i+1).toString()+"-"+ stringToAdd + "\n";
            }
            result =  result + "=======================\n";
            result = result + "That's all folks!"; 
            $.sendMessage(result);
        }else {
            $.sendMessage("No Annoucement Yet! Please try  later");
        }
    }
    
    get routes() {
        return { 
            'pingCommand': 'pingHandler',
            'pinCommand': 'pinMessage',
            'remindCommand': 'remindMessage'
        }
    }
}

tg.router
    .when(
        new RegexpCommand(/^troll pin /i, 'pinCommand'),
        new PingController()
    )
    .when(
        new RegexpCommand(/^troll remind/i, 'remindCommand'),
        new PingController()
    )
    .when(      
        new RegexpCommand(/troll/i, 'pingCommand'),
        new PingController()
    )

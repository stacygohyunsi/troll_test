let lastSentDay = (new Date()).getDay();
const Calculation = require('./Calculation');
const announcements = require('./Announcements.js').announcements;

const Reminders = {
	handleAutomaticReminders: function(callback) {
		setInterval(() => {
			let today = new Date();
			if (lastSentDay != today.getDay() && today.getHours() >= 1) {
				if (today.getDay() != 5 && today.getDay() != 6) {
					Reminders.send(callback);
					lastSentDay = today.getDay();
				}
			}
			Reminders.removeOld();
		}, 600000); // every 10 mins
	},
	removeOld: function() {
    let currDate = new Date();
    for(var id in announcements){
        var chatGroupReminder = announcements[id];
        for(var i = chatGroupReminder.length -1; i >= 0 ; i--){
            if(Calculation.daysBetween(chatGroupReminder[i].dateAdded,currDate) >=5){
                console.log("Clearing Data", chatGroupReminder[i]);
                chatGroupReminder.splice(i,1);
            }
        }
    }
	},
	generateReminders: function(chatGrpReminders) {
		if (chatGrpReminders != undefined && chatGrpReminders.length > 0) {
			let result = 'Here are the reminders\n';
			result = result + '=======================\n';
			for (let i = 0; i < chatGrpReminders.length; i++) {
				let rawStr = chatGrpReminders[i].message;
				let stringToAdd = rawStr.substring('troll pin '.length);
				result += (i+1).toString() + '-' + stringToAdd + '\n';
			}
			result = result + '=======================\n';
			result = result + 'That\'s all folks!';
			return result;
		}
	},
	send: function(callback) {
		for(var id in announcements){
			let chatGrpReminders = announcements[id];
			if(chatGrpReminders != undefined && chatGrpReminders.length > 0){
				let result = Reminders.generateReminders(chatGrpReminders);
				callback(id, result);
			}
		}
	}
}

module.exports = Reminders;
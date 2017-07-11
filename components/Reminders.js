let lastSentDay = (new Date()).getDay();
const Calculation = require('./Calculation');
const announcements = require('./Announcements.js').announcements;

const Reminders = {
	handleAutomaticReminders: function() {
		setInterval(() => {
			let today = new Date();
			if (lastSentDay != today.getDay() && today.getHours() >= 1) {
					if (today.getDay() != 5 && today.getDay() != 6) {
							Reminders.send();
							lastSentDay = today.getDay();
					}
			}
			Reminders.removeOld();
		}, 600000); // every 10 mins
	},
	removeOld: function() {
    let currDate = new Date();
    for (let id in announcements) {
        let chatGroupReminder = announcements[id];
        for (let i = chatGroupReminder.length -1; i >= 0; i--) {
            if (Calculation.daysBetween(chatGroupReminder[i].dateAdded, currDate) >=5) {
                console.log('Clearing Data', chatGroupReminder[i]);
                chatGroupReminder.splice(i, 1);
            }
        }
    }
	},
	send: function() {

	}
}

module.exports = Reminders;
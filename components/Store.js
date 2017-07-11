const GoogleSpreadsheet = require('google-spreadsheet');
const config = require('../config');
let doc = new GoogleSpreadsheet(config.spreadsheetKey);
let sheet;

const Store = {
  setAuth: function(step) {
    let creds = require('../config/Troll-bot.json');
    doc.useServiceAccountAuth(creds, step);
  },
  getInfoAndWorksheets: function(step) {
    doc.getInfo(function(err, info) {
			console.log(err);
      sheet = info.worksheets[0];
      step();
    });
  },
	updateSheets: function(chatGrpReminders, step) {
    sheet.getCells({
      'min-row': 1,
      'max-row': 5,
      'return-empty': true
    }, function(err, cells) {
			console.log(err);
			for (var i = 0; i <chatGrpReminders.length; i++) {
				let rawStr = chatGrpReminders[i].message
				cells[i].value = rawStr.substring('troll pin '.length);
			}
      sheet.bulkUpdateCells(cells);
      step();
		});
	}
}

module.exports = Store;
const path = require('path');
const { expect } = require('chai');

describe('Troll test::Components::Reminders', () => {
	const expectedComponentLocation = path.join(__dirname, './Reminders.js');
	let component;
	try {
		component = require(expectedComponentLocation);
	} catch(ex) {}

	it('exists at the right location', () => {
		expect(() => {
			require(expectedComponentLocation);
		}).to.not.throw();
	});

	it('implements .handleAutomaticReminders()', () => {
		expect(component.handleAutomaticReminders).to.not.be.undefined;
	});

	it('implements .removeOld()', () => {
		expect(component.removeOld).to.not.be.undefined;
	});

	it('implements .generateReminders()', () => {
		expect(component.generateReminders).to.not.be.undefined;
	});

	it('takes in an argument of chatGrpReminders and returns a string', () => {
		let remindersList = component.generateReminders([{ message: "troll pin reminder1" }, { message: "troll pin reminder2" }]);
		expect(typeof remindersList).to.be.equal('string');
	});

	it('implements .send()', () => {
		expect(component.send).to.not.be.undefined;
	});

	it('implements .send()', () => {
		expect(component.send).to.not.be.undefined;
	});

})
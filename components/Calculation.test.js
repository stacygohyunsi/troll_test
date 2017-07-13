const path = require('path');
const { expect } = require('chai');

describe('Troll test::Components::Calculation', () => {
	const expectedComponentLocation = path.join(__dirname, './Calculation.js');
	let component;
	try {
		component = require(expectedComponentLocation);
	} catch(ex) {}

	it('exists at the right location', () => {
		expect(() => {
			require(expectedComponentLocation);
		}).to.not.throw();
	});

	it('implements .daysBetween()', () => {
		expect(component.daysBetween).to.not.be.undefined;
	});

	it('takes in two arguments of dateOne,dateTwo and returns an integer', () => {
		let dateOne = new Date(2012, 0, 1);
		let dateTwo = new Date(2012, 0, 2);
		const daysBetweenResult = component.daysBetween(dateOne, dateTwo);
		expect(typeof daysBetweenResult).to.be.equal('number');
	})
})
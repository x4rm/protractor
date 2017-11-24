var util = require('../util/common.js');
var data = require('../data/productions.e2e-data.json');

var pageTitle = require('../po/common/page/pageTitle.js');
var publicationData = require('../po/specific/publication/publicationData.js');

var MainMenu = require('../po/common/page/mainMenu.js');
var SaveData = require('../po/common/data/saveData.js');

var mainMenu = new MainMenu(data);
var saveData = new SaveData(data);

describe('lab 1 - productions page', function () {

    beforeAll(function () {
        browser.get(browser.params.baseUrl);
    });
    
    it('lab 1, step 1 - should set title value by menu element', function () {
        mainMenu.productionsMenuElement.click();
        expect(pageTitle.title.getText()).toEqual(data.productionsMenuElement);
    });
    
    it('lab 1, step 2 - should set fields values after click on branch element', function () {
        util.selectBranchInnerNode(data.nodes);
        expect(publicationData.number.getAttribute('value')).toEqual(data.number);
        expect(publicationData.type.getAttribute('value')).toEqual(data.type);
        expect(publicationData.date.getAttribute('value')).toEqual(data.date);
        expect(publicationData.price.getAttribute('value')).toEqual(data.price);
    });
    
    it('lab 1, step 3 - 4 - should set fields new values after click on trees element, rollback', function () {        
        util.setValue(publicationData.number, data.testNumber);
        util.setDropdownMenuValue(publicationData.type, 'UP');
        util.setValue(publicationData.date, data.testDate);
        util.setDropdownMenuValue(publicationData.price, 'DOWN');
        expect(publicationData.number.getAttribute('value')).toEqual(data.testNumber);
        expect(publicationData.type.getAttribute('value')).toEqual(data.testType);
        expect(publicationData.date.getAttribute('value')).toEqual(data.testDate);
        expect(publicationData.price.getAttribute('value')).toEqual(data.testPrice);

        saveData.cancelButton.click();
        expect(saveData.cancelMessage.isPresent()).toBe(true);
    });

    afterAll(function () {
        util.closeBranch([data.nodes[0], data.nodes[1]]);
    });
});

















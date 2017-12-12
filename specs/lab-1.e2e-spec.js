"use strict";

var util = require('../util/common.js'),
    data = require('../data/lab-1.e2e-data.json'),

    title = require('../po/common/title.js'),
    mainMenu = require('../po/common/mainMenu.js'),
    publicationTree = require('../po/specific/publication/publicationTree.js'),

    PublicationData = require('../po/specific/publication/publicationData.js'),
    publicationData = new PublicationData(data);

describe('lab 1', function () {

    beforeAll(function () {
        util.loadPage();
    });

    it('should set title value by menu element', function () {
        mainMenu.open(data.productionsMenuSubElement);
        expect(title.getTitle()).toEqual(data.productionsMenuSubElement);
    });

    it('should set fields values after click on branch element', function () {
        publicationTree.toggleBranch(data.outerNodes, true);
        publicationTree.nodeDoubleClick(data.innerNode);
        expect(publicationData.publication).toEqualPublicationData(data.publication);
    });

    it('should set fields new values after click on trees element, rollback', function () {
        publicationData.setElementValue(publicationData.testPublication.number, data.testPublication.number);
        publicationData.setValue(publicationData.publication.type, data.testPublication.type);
        publicationData.setElementValue(publicationData.testPublication.date, data.testPublication.date);
        publicationData.setValue(publicationData.publication.price, data.testPublication.price);
        expect(publicationData.testPublication).toEqualPublicationData(data.testPublication);

        publicationData.cancelButton.click();
        expect(publicationData.cancelMessage.isDisplayed()).toBe(true);
    });

    afterAll(function () {
        publicationTree.toggleBranch(data.outerNodes, false);
    });
});
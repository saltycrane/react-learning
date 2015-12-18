import React from "react";
import TestUtils from "react-addons-test-utils";

import App from "../src/App";


describe("App", function() {
    it("should render without error", function () {
        const subject = <App />;
        const renderedSubject = TestUtils.renderIntoDocument(subject);
        expect(renderedSubject).to.not.equal(undefined);
    });
});

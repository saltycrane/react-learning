import React from "react";
import assert from "assert";
import TestUtils from "react-addons-test-utils";

import App from "../src/App";


describe("App", function() {
    it("should render without error", function () {
        const subject = <App />;
        const shallowRenderer = TestUtils.createRenderer();
        shallowRenderer.render(subject);
        const result = shallowRenderer.getRenderOutput();
        assert.equal(result.type, "h1");
    });
});

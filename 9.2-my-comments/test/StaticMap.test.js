import React from "react";
import assert from "assert";
import TestUtils from "react-addons-test-utils";

import StaticMap from "../src/components/StaticMap";


describe("StaticMap", function() {
    it("should render without error", function () {
        const subject = <StaticMap location="here" />;
        const shallowRenderer = TestUtils.createRenderer();
        shallowRenderer.render(subject);
        const result = shallowRenderer.getRenderOutput();
        assert.equal(result.type, "div");
    });
});

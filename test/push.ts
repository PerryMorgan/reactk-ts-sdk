import {ReactK} from "../src/reactk";

describe("Push event", () => {
    it("should push event", async () => {
        let reactk = new ReactK("js-client-test");
        reactk.setUserId("MYUSERID");
        let axiosResponse = await reactk.track("unit_test", {key:"value"});
        expect(axiosResponse.status).toEqual(204);
    })
});
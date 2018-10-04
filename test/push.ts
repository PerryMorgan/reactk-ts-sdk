import {init, ReactK, setUserId, track} from "../src/reactk";

describe("Push event", () => {
    it("should push event", async () => {
        init("js-client-test");
        setUserId("MYUSERID");
        let axiosResponse = await track("unit_test", {key:"value"});
        expect(axiosResponse.status).toEqual(204);
    })
});
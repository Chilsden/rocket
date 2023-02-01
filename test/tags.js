const nock = require("nock");
const sinon = require("sinon");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const utils = require("../dist/utils");

const { expect, assert } = chai;

const rllc = require("../dist/index");
const clientGen = rllc.default;

describe("tags method", () => {
  let sandbox;
  let client;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    client = clientGen("aac004f6-07ab-4f82-bff2-71d977072c56");
    sandbox.restore();
  });

  after(() => {
    utils.warn.restore();
  });

  it("should execute a query with no args", async () => {
    const scope = nock("https://fdo.rocketlaunch.live", {
      reqheaders: {
        authorization: "Bearer aac004f6-07ab-4f82-bff2-71d977072c56",
      },
    })
      .get("/json/tags")
      .query((actualQueryObject) => {
        return Object.keys(actualQueryObject).length === 0;
      })
      .reply(200, {});

    await client.tags();

    scope.done();
  });

  it("should warn if combining id with another param", async () => {
    sandbox.spy(utils, "warn");

    const testParams = { id: 5, text: "banana" };

    const params = new URLSearchParams(testParams);

    const scope = nock("https://fdo.rocketlaunch.live", {
      reqheaders: {
        authorization: "Bearer aac004f6-07ab-4f82-bff2-71d977072c56",
      },
    })
      .get("/json/tags")
      .query(params)
      .reply(200, {});

    await client.tags(testParams);

    scope.done();

    expect(utils.warn.getCall(0).args[0]).to.equal(
      "Using 'id', 'slug', or 'cospar_id' as query parameters generally returns a single result. Combining it with other parameters may not be achieving the result you expect."
    );
  });

  it("should warn if using invalid query params", async () => {
    sandbox.spy(utils, "warn");

    const testParams = { inactive: false };

    const params = new URLSearchParams({});

    const scope = nock("https://fdo.rocketlaunch.live", {
      reqheaders: {
        authorization: "Bearer aac004f6-07ab-4f82-bff2-71d977072c56",
      },
    })
      .get("/json/tags")
      .query(params)
      .reply(200, {});

    await client.tags(testParams);

    scope.done();

    expect(utils.warn.getCall(0).args[0]).to.equal(
      'Parameter "inactive" is not a valid option for the tags endpoint. It will be ignored.'
    );
  });

  describe("page parameter", () => {
    it("should reject on malformed string page", async () => {
      return assert.isRejected(
        client.tags({ page: "banana" }),
        `Malformed query parameter for resource "tags" and parameter: "page": Must be a number.`
      );
    });

    it("should reject on malformed array page", () => {
      return assert.isRejected(
        client.tags({ page: [] }),
        `Malformed query parameter for resource "tags" and parameter: "page": Must be a number.`
      );
    });

    it("should reject on malformed object page", () => {
      return assert.isRejected(
        client.tags({ page: {} }),
        `Malformed query parameter for resource "tags" and parameter: "page": Must be a number.`
      );
    });

    it("should reject on malformed date page", () => {
      return assert.isRejected(
        client.tags({ page: new Date() }),
        `Malformed query parameter for resource "tags" and parameter: "page": Must be a number.`
      );
    });

    it("should reject on malformed boolean page", () => {
      return assert.isRejected(
        client.tags({ page: false }),
        `Malformed query parameter for resource "tags" and parameter: "page": Must be a number.`
      );
    });

    it("should reject on malformed null page", () => {
      return assert.isRejected(
        client.tags({ page: null }),
        `Malformed query parameter for resource "tags" and parameter: "page": Must be a number.`
      );
    });

    it("should reject on malformed function page", () => {
      return assert.isRejected(
        client.tags({ page: () => 5 }),
        `Malformed query parameter for resource "tags" and parameter: "page": Must be a number.`
      );
    });

    it("should execute corectly with page number", async () => {
      const testParams = { page: 6 };

      const params = new URLSearchParams({ page: 6 });

      const scope = nock("https://fdo.rocketlaunch.live", {
        reqheaders: {
          authorization: "Bearer aac004f6-07ab-4f82-bff2-71d977072c56",
        },
      })
        .get("/json/tags")
        .query(params)
        .reply(200, {});

      await client.tags(testParams);

      scope.done();
    });

    it("should convert string page to number", async () => {
      const testParams = { page: "5" };

      const params = new URLSearchParams({ page: 5 });

      const scope = nock("https://fdo.rocketlaunch.live", {
        reqheaders: {
          authorization: "Bearer aac004f6-07ab-4f82-bff2-71d977072c56",
        },
      })
        .get("/json/tags")
        .query(params)
        .reply(200, {});

      await client.tags(testParams);

      scope.done();
    });

    it("should ignore undefined page", async () => {
      sandbox.spy(utils, "warn");

      const testParams = { page: undefined };

      const params = new URLSearchParams({});

      const scope = nock("https://fdo.rocketlaunch.live", {
        reqheaders: {
          authorization: "Bearer aac004f6-07ab-4f82-bff2-71d977072c56",
        },
      })
        .get("/json/tags")
        .query(params)
        .reply(200, {});

      await client.tags(testParams);

      scope.done();

      expect(utils.warn.getCall(0).args[0]).to.equal(
        'Parameter "page" is undefined and will be ignored.'
      );
    });
  });

  describe("id parameter", () => {
    it("should reject on malformed string id", async () => {
      return assert.isRejected(
        client.tags({ id: "banana" }),
        `Malformed query parameter for resource "tags" and parameter: "id": Must be a number.`
      );
    });

    it("should reject on malformed array id", () => {
      return assert.isRejected(
        client.tags({ id: [] }),
        `Malformed query parameter for resource "tags" and parameter: "id": Must be a number.`
      );
    });

    it("should reject on malformed object id", () => {
      return assert.isRejected(
        client.tags({ id: {} }),
        `Malformed query parameter for resource "tags" and parameter: "id": Must be a number.`
      );
    });

    it("should reject on malformed date id", () => {
      return assert.isRejected(
        client.tags({ id: new Date() }),
        `Malformed query parameter for resource "tags" and parameter: "id": Must be a number.`
      );
    });

    it("should reject on malformed boolean id", () => {
      return assert.isRejected(
        client.tags({ id: false }),
        `Malformed query parameter for resource "tags" and parameter: "id": Must be a number.`
      );
    });

    it("should reject on malformed null id", () => {
      return assert.isRejected(
        client.tags({ id: null }),
        `Malformed query parameter for resource "tags" and parameter: "id": Must be a number.`
      );
    });

    it("should reject on malformed function id", () => {
      return assert.isRejected(
        client.tags({ id: () => 5 }),
        `Malformed query parameter for resource "tags" and parameter: "id": Must be a number.`
      );
    });

    it("should execute correctly with id number", async () => {
      const testParams = { id: 6 };

      const params = new URLSearchParams({ id: 6 });

      const scope = nock("https://fdo.rocketlaunch.live", {
        reqheaders: {
          authorization: "Bearer aac004f6-07ab-4f82-bff2-71d977072c56",
        },
      })
        .get("/json/tags")
        .query(params)
        .reply(200, {});

      await client.tags(testParams);

      scope.done();
    });

    it("should convert string id to number", async () => {
      const testParams = { id: "5" };

      const params = new URLSearchParams({ id: 5 });

      const scope = nock("https://fdo.rocketlaunch.live", {
        reqheaders: {
          authorization: "Bearer aac004f6-07ab-4f82-bff2-71d977072c56",
        },
      })
        .get("/json/tags")
        .query(params)
        .reply(200, {});

      await client.tags(testParams);

      scope.done();
    });

    it("should ignore undefined id", async () => {
      sandbox.spy(utils, "warn");

      const testParams = { id: undefined };

      const params = new URLSearchParams({});

      const scope = nock("https://fdo.rocketlaunch.live", {
        reqheaders: {
          authorization: "Bearer aac004f6-07ab-4f82-bff2-71d977072c56",
        },
      })
        .get("/json/tags")
        .query(params)
        .reply(200, {});

      await client.tags(testParams);

      scope.done();

      expect(utils.warn.getCall(0).args[0]).to.equal(
        'Parameter "id" is undefined and will be ignored.'
      );
    });
  });

  describe("text parameter", () => {
    it("should reject on malformed empty string text", async () => {
      return assert.isRejected(
        client.tags({ text: "" }),
        `Malformed query parameter for resource "tags" and parameter: "text": String must have length greater than 0`
      );
    });

    it("should reject on malformed array text", () => {
      return assert.isRejected(
        client.tags({ text: [] }),
        `Malformed query parameter for resource "tags" and parameter: "text": Must be a string.`
      );
    });

    it("should reject on malformed object text", () => {
      return assert.isRejected(
        client.tags({ text: {} }),
        `Malformed query parameter for resource "tags" and parameter: "text": Must be a string.`
      );
    });

    it("should reject on malformed date text", () => {
      return assert.isRejected(
        client.tags({ text: new Date() }),
        `Malformed query parameter for resource "tags" and parameter: "text": Must be a string.`
      );
    });

    it("should reject on malformed boolean text", () => {
      return assert.isRejected(
        client.tags({ text: false }),
        `Malformed query parameter for resource "tags" and parameter: "text": Must be a string.`
      );
    });

    it("should reject on malformed null text", () => {
      return assert.isRejected(
        client.tags({ text: null }),
        `Malformed query parameter for resource "tags" and parameter: "text": Must be a string.`
      );
    });

    it("should reject on malformed function text", () => {
      return assert.isRejected(
        client.tags({ text: () => "spacex" }),
        `Malformed query parameter for resource "tags" and parameter: "text": Must be a string.`
      );
    });

    it("should excute correctly with text attribute", async () => {
      const testParams = { text: "SpaceX" };

      const params = new URLSearchParams({ text: "SpaceX" });

      const scope = nock("https://fdo.rocketlaunch.live", {
        reqheaders: {
          authorization: "Bearer aac004f6-07ab-4f82-bff2-71d977072c56",
        },
      })
        .get("/json/tags")
        .query(params)
        .reply(200, {});

      await client.tags(testParams);

      scope.done();
    });

    it("should excute correctly with text number", async () => {
      const testParams = { text: 5 };

      const params = new URLSearchParams({ text: "5" });

      const scope = nock("https://fdo.rocketlaunch.live", {
        reqheaders: {
          authorization: "Bearer aac004f6-07ab-4f82-bff2-71d977072c56",
        },
      })
        .get("/json/tags")
        .query(params)
        .reply(200, {});

      await client.tags(testParams);

      scope.done();
    });

    it("should ignore undefined text", async () => {
      sandbox.spy(utils, "warn");

      const testParams = { text: undefined };

      const params = new URLSearchParams({});

      const scope = nock("https://fdo.rocketlaunch.live", {
        reqheaders: {
          authorization: "Bearer aac004f6-07ab-4f82-bff2-71d977072c56",
        },
      })
        .get("/json/tags")
        .query(params)
        .reply(200, {});

      await client.tags(testParams);

      scope.done();

      expect(utils.warn.getCall(0).args[0]).to.equal(
        'Parameter "text" is undefined and will be ignored.'
      );
    });
  });
});
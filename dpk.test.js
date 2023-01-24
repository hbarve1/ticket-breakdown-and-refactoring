const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the hash string with 128 character length when given a random object {}", () => {
    const trivialKey = deterministicPartitionKey({name: 'test', age: 20});
    expect(trivialKey.length).toBe(128);
  });

  it("Returns the same string value when given and object with 'partitionKey' as key", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: "" });
    expect(trivialKey.length).toBe(128);
  });

  it("Returns the same string value when given and object with 'partitionKey' as key", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: "thisisgoodtest" });
    expect(trivialKey).toBe("thisisgoodtest");
  });

  it("Returns the hash string with 128 character length when given and object with 'partitionKey' as string value of length greater then MAX_PARTITION_KEY_LENGTH", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: "c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862ab" });
    expect(trivialKey.length).toBe(128);
  });

  it("Returns the literal '0' when given no input", () => {
    const inputObject = {partitionKey: { name: "Himank" }};
    const trivialKey = deterministicPartitionKey(inputObject);
    expect(trivialKey).toBe(JSON.stringify(inputObject.partitionKey));
  });

  it("Returns the hash string with 128 character length when given empty object {}", () => {
    const trivialKey = deterministicPartitionKey({});
    expect(trivialKey.length).toBe(128);
  });
});

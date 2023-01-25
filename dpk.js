const crypto = require("crypto");

// exports.deterministicPartitionKey = (event) => {
//   const TRIVIAL_PARTITION_KEY = "0";
//   const MAX_PARTITION_KEY_LENGTH = 256;
//   let candidate;

//   if (event) {
//     if (event.partitionKey) {
//       candidate = event.partitionKey;
//     } else {
//       const data = JSON.stringify(event);
//       candidate = crypto.createHash("sha3-512").update(data).digest("hex");
//     }
//   }

//   if (candidate) {
//     if (typeof candidate !== "string") {
//       candidate = JSON.stringify(candidate);
//     }
//   } else {
//     candidate = TRIVIAL_PARTITION_KEY;
//   }

//   if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
//     candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
//   }
//   return candidate;
// };

// Global constants should be kept out of the function body
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

/**
 * This function is creating a hash from the data
 * @param {*} data 
 * @returns 
 */
function createHash(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

// this function is handling event parameter as null or undefined
// and checking if event has partitionKey property
function getPartitionKey(event) {
  if (!event) {
    return;
  }

  if (event.partitionKey) {
    return event.partitionKey;
  }

  const data = JSON.stringify(event);
  return createHash(data);
}

// this function is handling candidate parameter
function candidateStringfy(candidate) {
  if (candidate) {
    if (typeof candidate !== "string") {
      return JSON.stringify(candidate);
    }
  } else {
    return TRIVIAL_PARTITION_KEY;
  }

  return candidate;
}

// this function is handling candidate parameter
function validateCandidate(candidate) {
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return createHash(candidate);
  }
  return candidate;
}

/**
 * Explanation: breaking down the function into smaller functions, this helps to understand the code better
 * and also helps to test each function separately, also helps to reuse the functions in other places.
 * This function can be further improved by using the ternary operator and also by using the optional chaining operator.
 * 
 * @param {*} event 
 * @returns 
 */
exports.deterministicPartitionKey = (event) => {
  let candidate = getPartitionKey(event);

  candidate = candidateStringfy(candidate);

  return validateCandidate(candidate);
};
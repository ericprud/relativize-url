/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
  return {
    // verbose: false,
    testMatch: [
      "**/__tests__/*-test.js" // why do I need "**/" ?
    ],
  };
};

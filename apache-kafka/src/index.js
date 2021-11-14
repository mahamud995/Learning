const produceMessages = require("./publisher");
const processConsumer = require("./consumer");

// call the `produce` function and log an error if it occurs
produceMessages().catch((err) => {
  console.error("error in producer: ", err);
});

// start the consumer, and log any errors
processConsumer().catch((err) => {
  console.error("error in consumer: ", err);
});

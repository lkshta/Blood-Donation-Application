const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cron = require("node-cron");
const dbConnection = require("./utils/db");
// const { sendDetailsProspectEmail } = require("./EmailServices/sendDetailsProspect");
// const { sendEligibilityEmail } = require("./EmailServices/sendEligibilityEmail");
// const { sendDonorDetailsEmail } = require("./EmailServices/sendDonorDetailsEmail");
// const { sendBloodDonationReminder } = require("./EmailServices/sendBloodDonationReminder");
dotenv.config();

// SERVER
const PORT = process.env.PORT;

// SCHEDULE TASK
const run = () => {
  cron.schedule("* * * * * *", () => {
    sendDetailsProspectEmail();
    sendEligibilityEmail();
    sendBloodDonationReminder();
    sendDonorDetailsEmail();
    // console.log("running a task every second");
  });
};

run();

app.listen(PORT, () => {
  console.log(`Backgroundservices is running on ${PORT}`);
  dbConnection();
});

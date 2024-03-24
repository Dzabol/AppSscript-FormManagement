// Queue data structure (using an array)
const taskQueue = [];

// Function to add a task to the queue
function addToQueue(task) {
  taskQueue.push(task);
}

// Function to process the queue (with error handling and retry logic)
function processQueue() {
  while (taskQueue.length > 0) {
    const task = taskQueue.shift(); // Get and remove the first task

    try {
      task(); // Execute the task
    } catch (error) {
      console.error("Error processing task:", error);
      // Retry logic: Add the task back to the queue with an optional delay
      addToQueue(task, 5000); // Add a 5-second delay before retrying
    }
  }
}

function onSubmit(event) {
  // Add task to queue, handling potential errors within the callback
  addToQueue(() => {
    try {
      // Perform critical operations within a try-catch block
      SpreadsheetApp.flush();
      const lock = LockService.getScriptLock();

      if (lock.tryLock(5000000)) { // Use tryLock for better resource management
        try {
          const sheetName = event.range.getSheet().getName();

          // Check sheet name and execute logic accordingly
          if (sheetName === "ContactForm") {
            const dataToSend = Form.generateIDAndURLAdressForNewCustomer(
              event, FIELDS_OF_INTERESTS_INPUTDATA, FORM_TEMPLATES_DATA
            );
            sendEmailWithLinks(dataToSend);
          } else if (sheetName in FIELDS_OF_INTERESTS_INPUTDATA) {
            const fieldOfInterestBasicInformations =
              FIELDS_OF_INTERESTS_INPUTDATA[sheetName];
            console.log("-------------------------------------");
            console.log(sheetName);
            console.log("-------------------------------------");
            Form.generateUserSpaceForRequiredFieldOfInterest(
              event,
              FORM_TEMPLATES_DATA,
              ANSWERS_FORM_DATA,
              fieldOfInterestBasicInformations,
              MONTH_DESCRIPTION
            );
          } else {
            console.warn("Unknown sheet name:", sheetName); // Inform about unexpected sheet names
          }
        } finally {
          lock.releaseLock(); // Ensure lock release even with exceptions
        }
      } else {
        console.warn("Failed to acquire lock, retrying later...");
      }
    } catch (error) {
      console.error("Error processing onSubmit:", error);
      // Add task back to queue for retry after a delay
      addToQueue(() => onSubmit(event), 5000); // Add a delay before retrying
    }
  });

  // Process the queue
  processQueue();
}
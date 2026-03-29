// oxlint-disable no-console
import app from "./src/app.js";

const port = process.env.PORT || 3000;

function main() {
  try {
    app.listen(port)
    console.log(`Server running on port ${port}`)
  } catch (error) {
    console.log("Error starting server:", error)
  }
}

main();
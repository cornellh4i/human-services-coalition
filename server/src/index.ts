const appName = "Server API"; 
const port = process.env.PORT || 8080;
const serverInit = require("./server");
const server = serverInit();
server.listen(port, () => console.log(`${appName} running on port ${port}!`));
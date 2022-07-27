const app = require("./server")
const port  = 3001
const http = 'http://localhost'

app.listen(port, () => console.log(`🚀 Api Iniciada na porta:  ${http}${port}`))
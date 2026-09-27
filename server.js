import "dotenv/config"
import app from "./src/app.js"

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server is listening at PORT: ${port}`)
})
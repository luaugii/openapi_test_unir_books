import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
};
app.get("/books", (req, res) => {
    const data = readData();
    res.json(data.books);

});
app.get("/books/:id", (req, res) => {
    const data = readData();
    const book = data.books.find((book) => book.id === parseInt(req.params.id));
    res.json(book);
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.post("/books", (req, res) => {
    const data = readData();
    const id = data.books.length + 1;
    const book = {
        "id": id,
        "name": "La mejor receta para leer los mariscos. ",
        "date": "2023-01-03",
        "publication": `Publication ${id}`
    }
    data.books.push(book);
    writeData(data);
    res.json(book)
});
app.put("/books/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const bookIndex = data.books.findIndex((book) => book.id === parseInt(req.params.id));
    console.log(body);
    console.log(bookIndex);
    console.log(req.body);
    data.books[bookIndex] = {
        ...data.books[bookIndex],
        ...body,
    }

    writeData(data);
    res.json(data);
});

app.delete("/books/:id", (req, res) => {
    const data = readData();
    const bookIndex = data.books.findIndex((book) => book.id === parseInt(req.params.id));
    data.books.splice(bookIndex, 1)
    writeData(data);
    res.json({
            message:
                "Se elimino correctamente el libro"
        }
    );
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


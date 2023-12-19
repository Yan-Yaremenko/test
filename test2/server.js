const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const PORT = 3001;

app.use(bodyParser.json());

app.use(cors());
app.use(bodyParser.json());
const readData = () => {
    const rawData = fs.readFileSync('./public/data/cats.json');
    return JSON.parse(rawData);
};

// Записуємо дані у JSON-файл
const writeData = (data) => {
    fs.writeFileSync('./public/data/cats.json', JSON.stringify(data, null, 2));
};

// Отримуємо всіх котів
app.get('/cats', (req, res) => {
    const cats = readData().cats || [];
    res.json(cats);
});

// Додаємо нового кота
app.post('/cats', (req, res) => {
    const { name, breed, age, treats } = req.body;
    const cats = readData().cats || [];
    const newCat = { id: Date.now().toString().slice(11, 15), name, breed, age, treats: treats || {}, };
    const updatedCats = [...cats, newCat];
    writeData({ cats: updatedCats });
    res.json(newCat);
});

// Видаляємо кота за ідентифікатором
app.delete('/cats/:id', (req, res) => {
    const id = req.params.id;
    const cats = readData().cats || [];
    const updatedCats = cats.filter((cat) => cat.id !== id);
    writeData({ cats: updatedCats });
    res.json({ success: true });
});

// Оновлюємо існуючого кота
app.put('/cats/:id', (req, res) => {
    const id = req.params.id;
    const { name, breed, age, treats } = req.body;
    const cats = readData().cats || [];
    const updatedCats = cats.map((cat) =>
        cat.id === id ? { ...cat, name, breed, age, treats } : cat
    );
    writeData({ cats: updatedCats });
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
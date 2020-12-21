let goods = [
    {
        name: "Ящерица",
        price: 900,
        amount: 4,
        id: 1
    },
    {
        name: "Бабочка",
        price: 400,
        amount: 34,
        id: 2
    },
    {
        name: "Крокодил",
        price: 19000,
        amount: 1,
        id: 3
    },
    {
        name: "Змея",
        price: 7000,
        amount: 7,
        id: 4
    },
    {
        name: "Птеродактиль",
        price: 100000000,
        amount: 1,
        id: 5
    },
    {
        name: "Певчая птица",
        price: 3000,
        amount: 10,
        id: 6
    },
    {
        name: "Пингвин",
        price: 7000,
        amount: 8,
        id: 7
    },
    {
        name: "Саламандра",
        price: 900000,
        amount: 2,
        id: 8
    },
    {
        name: "Выхухоль",
        price: 6000,
        amount: 15,
        id: 9
    },
    
    {
        name: "Креветка",
        price: 90,
        amount: 78,
        id: 10
    }
]

const express = require('express');
const app = express();

app.get('/good/:id', function (req, res) {
    const findedNumber = JSON.stringify(goods.find((good) => good.id == req.params.id));
    if (!findedNumber) {
        res.status(404).send();
    } else {
        res.status(200).send(findedNumber);
    }
});

app.get('/good', function (req, res) {
    const findedGoods = JSON.stringify(goods.map(good => good));
    res.send(findedGoods);
});

app.get('/goods', function (req, res) {
    const count = parseInt(req.query.count);
    const offset = parseInt(req.query.offset);
    res.send({ goods: goods.slice(offset, offset + count), count: goods.length });
});

app.post('/good', function (req, res) {
    goods.push(req.params);
    res.json(req.params);
});

app.put('/good/:id', function (req, res) {
    const idOfGood = parseInt(req.params.id);
    const goodIdx = goods.findIndex((el) => parseInt(el.id) === idOfGood);
    console.log(goodIdx);
    if (goodIdx !== -1) {
      const oldGood = goods[goodIdx];
      goods[goodIdx] = { ...oldGood, ...req.body };
      res.json(goods[goodIdx]);
    } else {
      res.status(404).json();
    }
});

app.delete('/good/:id', function (req, res) {
    const idOfGood = parseInt(req.params.id);
    goods = goods.filter((el) => parseInt(el.id) !== idOfGood);
    res.json(goods);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
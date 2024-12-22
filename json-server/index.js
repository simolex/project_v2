const fs = require("fs");
const jsonServer = require("json-server");
const path = require("path");

const TelegramApi = require("node-telegram-bot-api");
const token = "7612955325:AAGj3znmNsefZxJNEl4PZGcU2xxzJ6vxlzA";
const bot = new TelegramApi(token, { polling: true });
const chatBoss = {};

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, "db.json"));

router.param("type", (req, res, next) => {
    console.log("CALLED ONLY ONCE");
    next();
});

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
server.use(async (req, res, next) => {
    next();
});

// Эндпоинт для логина
server.post("/login", (req, res) => {
    try {
        const { username, password } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"));
        const { users = [] } = db;

        const userFromBd = users.find((user) => user.username === username && user.password === password);

        if (userFromBd) {
            return res.json(userFromBd);
        }

        return res.status(403).json({ message: "User not found" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

// проверяем, авторизован ли пользователь
// eslint-disable-next-line
server.use((req, res, next) => {
    if (req.url === "orderlists") {
        const { username, phone, OrderId, status } = req.body;
        console.log(chatBoss.chatId, OrderId);
        if (chatBoss.chatId) {
            // bot.sendMessage(chatBoss.chatId, `Ты угадал!!! ${OrderId}`);
        }
    }

    next();
});

server.use(router);

bot.setMyCommands([
    { command: "/start", description: "Приветствие" },
    { command: "/boss", description: "Стань боссом в чате" }
]);

bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    // send a message to the chat acknowledging receipt of their message
    if (text === "/start") {
        if (!chatBoss.chatId) {
            chatBoss.chatId = chatId;
        }
        return bot.sendMessage(chatId, `Welcome!!!`);
    }
    if (text === "/boss") {
        chatBoss.chatId = chatId;
        console.log(chatId);
        return bot.sendMessage(chatId, "Вы Босс! Все сообщения с сайта будут приходить вам");
    }
});

bot.on("callback_query", async (msg) => {
    const chatId = msg.message.chat.id;
    const data = msg.data;
    if (data === "/again") {
        return startGame(chatId);
    }
    if (data === chat[chatId]) {
        return bot.sendMessage(chatId, `Ты угадал!!!`, againOptions);
    } else {
        return bot.sendMessage(chatId, `Ты не угадал!!! Загаданное число: ${chat[chatId]}`, againOptions);
    }
});

// запуск сервера
server.listen(7000, () => {
    console.log("server is running on 7000 port");
});

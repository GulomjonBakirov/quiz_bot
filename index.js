import { Bot, InlineKeyboard } from "grammy";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("WUssup");
});

const port = 8080;

app.listen(port, () => {
  console.log("Server running in host");
});

const bot = new Bot("6739714663:AAEqw-_Uz2sWvOgm6s-Uqcx4pVZoD-9EfhA");

bot.command("start", (ctx) => ctx.reply("Wussup 2"));

bot.on("message", async (ctx) => {
  console.log(ctx.message.text);
  const parts = ctx.message.text.split("/").map((message) => message.trim());

  // Extract the last word from the first part and the first word from the last part
  const firstPartWords = parts[0].split(" ");
  const lastPartWords = parts[parts.length - 1].split(" ");

  // Take the last word from the first part and the first word from the last part
  const firstWord = firstPartWords.pop();
  const lastWord = lastPartWords.shift();

  const text = `${firstPartWords.join(" ").trim()} _____ ${lastPartWords
    .join(" ")
    .trim()}`;

  console.log(firstWord, lastWord, parts[1]);

  await ctx.reply(text, {
    reply_markup: new InlineKeyboard()
      .text(firstWord, "set 1")
      .text(parts[1], "set 2")
      .text(lastWord, "set 3"),
  });
});

bot.callbackQuery("set 1", async (ctx) => {
  await ctx.answerCallbackQuery({});

  console.log(
    "Ctx: ",
    ctx.callbackQuery.message.text,
    ctx.callbackQuery.message.reply_markup.inline_keyboard,
    ctx.callbackQuery.message.reply_markup.inline_keyboard[0][0]
  );

  ctx.api.sendPoll(
    ctx.msg.chat.id,
    ctx.callbackQuery.message.text,
    [
      ctx.callbackQuery.message.reply_markup.inline_keyboard[0][0].text,
      ctx.callbackQuery.message.reply_markup.inline_keyboard[0][1].text,
      ctx.callbackQuery.message.reply_markup.inline_keyboard[0][2].text,
    ],
    {
      is_anonymous: true,
      type: "quiz",
      correct_option_id: 0,
    }
  );
});

bot.callbackQuery("set 2", async (ctx) => {
  console.log(
    "Ctx: ",
    ctx.callbackQuery.message.text,
    ctx.callbackQuery.message.reply_markup.inline_keyboard,
    ctx.callbackQuery.message.reply_markup.inline_keyboard[0][0]
  );

  ctx.api.sendPoll(
    ctx.msg.chat.id,
    ctx.callbackQuery.message.text,
    [
      ctx.callbackQuery.message.reply_markup.inline_keyboard[0][0].text,
      ctx.callbackQuery.message.reply_markup.inline_keyboard[0][1].text,
      ctx.callbackQuery.message.reply_markup.inline_keyboard[0][2].text,
    ],
    {
      is_anonymous: true,
      type: "quiz",
      correct_option_id: 1,
    }
  );
});

bot.callbackQuery("set 3", async (ctx) => {
  console.log(
    "Ctx: ",
    ctx.callbackQuery.message.text,
    ctx.callbackQuery.message.reply_markup.inline_keyboard,
    ctx.callbackQuery.message.reply_markup.inline_keyboard[0][0]
  );

  ctx.api.sendPoll(
    ctx.msg.chat.id,
    ctx.callbackQuery.message.text,
    [
      ctx.callbackQuery.message.reply_markup.inline_keyboard[0][0].text,
      ctx.callbackQuery.message.reply_markup.inline_keyboard[0][1].text,
      ctx.callbackQuery.message.reply_markup.inline_keyboard[0][2].text,
    ],
    {
      is_anonymous: true,
      type: "quiz",
      correct_option_id: 2,
    }
  );
});

bot.start();
console.log("Bot");

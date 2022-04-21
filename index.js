require('dotenv').config();

const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.TOKEN, { username: 'spampolice_bot' });
const messageString = "This message is flagged as spam, please verify by voting yes/no below. Voting \"yes\" will remove message and ban user.";

bot.on('text', (ctx) => {
    let messageSent = ctx.message.text;
    let messageArr = messageSent.split(" ");
    let startsWithAtArr = messageArr.filter(x => x.startsWith("@"));
    let messageArr2 = messageSent.split("\n");
    let startsWithAtArr2 = messageArr2.filter(x => x.startsWith("@"));
    if ((messageSent.includes("https://t.me/") == true || new Set(startsWithAtArr).size !== startsWithAtArr.length || new Set(startsWithAtArr2).size !== startsWithAtArr2.length) {
        ctx.reply(messageString, {
            reply_to_message_id: ctx.message.message_id,
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "Yes, it's spam",
                            callback_data: 'yes-' + ctx.message.message_id + "-" + ctx.message.from.id
                        },
                        { text: "No, not spam", callback_data: "no" }
                    ]
                ]
            }
        });
    }
});

bot.action(/yes+/, (ctx) => {
    ctx.answerCbQuery();
    let message = ctx.match.input;
    let messageId = message.split('-')[1];
    let messageUserId = message.split('-')[2];
    ctx.deleteMessage();
    ctx.tg.deleteMessage(ctx.chat.id, messageId);
    ctx.banChatMember(Number(messageUserId));
});

bot.action("no", (ctx) => {
    ctx.answerCbQuery();
    ctx.deleteMessage();
});

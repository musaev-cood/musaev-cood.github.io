import asyncio
import logging
import sys
from os import getenv

from aiogram import Bot, Dispatcher, F
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart
from aiogram.types import Message, ReplyKeyboardMarkup, KeyboardButton
from aiogram.types.web_app_info import WebAppInfo
from aiogram.types.web_app_data import WebAppData

TOKEN = getenv("BOT_TOKEN")

bot = Bot(TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
dp = Dispatcher()


@dp.message(CommandStart())
async def command_start_handler(message: Message) -> None:
    webApp = WebAppInfo(url="https://musaev-cood.github.io/")

    keyboard = ReplyKeyboardMarkup(keyboard=[[KeyboardButton(text="GoyMarket", web_app=webApp)]], resize_keyboard=True)

    await message.reply(text="Нажмите на кнопку что бы открыть GoyMarket", reply_markup=keyboard)


@dp.message(F.web_app_data)
async def webapp_data_handler(message: WebAppData) -> None:
    user_id = message.from_user.id
    username = message.from_user.username
    text = f"!НОВЫЙ ЗАКАЗ!\nот @{username}\nuserID - {user_id}\n{message.text}"
    await bot.send_message(chat_id=800227103, text=text)
    await message.reply(text=message.web_app_data.data)


async def main() -> None:
    try:
        await dp.start_polling(bot)
    except asyncio.CancelledError:
        print("Polling was cancelled.")
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        print("Closing the event loop.")
        await bot.session.close()


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())

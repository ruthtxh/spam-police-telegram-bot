# @spampolice_bot
This telegram bot listens to new messages in a group chat, identifies potential spam messages and asks group members for verification. If confirmed as a spam, the message will be removed and spammer will be banned.

<img src="https://user-images.githubusercontent.com/40910744/164384793-a96a9706-3908-4fcb-884a-3f064d249bfc.jpg" width="300">

Spam message characteristics:
- contains link to another telegram group (https://t.me/...)
- repeated @mentions separated by spaces (@user @user)
- repeated @mentions separated by new line
This list is non-exhaustive, more validation can be added along the way with more data gathered.

Hosted on AWS with Lambda & API Gateway.

## Usage
1. Add @spampolice_bot to your group chat
2. In group chat settings, make @spampolice_bot as admin, with permission to delete messages and ban users

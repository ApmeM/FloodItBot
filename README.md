FloodItBot
==========
Flood it bot is a competitive game with the goal to fill most part of a field with your color.

Rules to play
==========

Tap/click on a color you want your part of a field to be colored in. 
All neighbours cells with the same color will join your area.
You cant select color that is currently yours (skip turn) or your opponents.
When your field take more then half of a field - you win.

Rules to rule
==========

This is also a game for coders to build best possible AI.

If you want to build a bot that will rule the world:

- Clone this repository
- Add new file to FloodItBot.Base/AI 
- Code... (See API section)
- Create pull request

API:
Your class should inherit BaseFloodItAI class and implement Act method.
Constructor of this class accept startX and startY parameters that can be either (0,0) or (width-1, height-1). Your opponent will receive opposite nubers.
As input data this class have access to int[,] array as a field with numbers as a color under this.Context property.
As output data code expect color number (from 0 to BasicScene.ColorsCount)
If your bot output invalid value (select your or opponent color, color less then 0 or more or equal then BasicScene.ColorsCount) the output will be ignored and turn will not be switched.

Please do not add external libraries to your bot as it might break web/android compatibility and I will not accept this pull request.

Credits
==========
- Game engine https://github.io/ApmeM/MyONez/ that allows to run same code on web, desktop and android (others were not tested).
- Bot engine is written https://github.io/ApmeM/BrainAI/.

Demo
==========
- Web demo at https://apmem.github.io/FloodItBot/

If you want to build your own game not related to flood it but with the same functionality please refer to https://github.io/ApmeM/MyONez/

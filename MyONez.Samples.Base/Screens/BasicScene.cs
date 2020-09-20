namespace MyONez.Samples.Base.Screens
{
    #region Using Directives

    using BrainAI.AI.FSM;
    using BrainAI.ECS.Components;
    using BrainAI.ECS.EntitySystems;

    using GeonBit.UI.ECS.Components;
    using GeonBit.UI.ECS.EntitySystems;
    using GeonBit.UI.Entities;
    using GeonBit.UI.Utils;

    using Microsoft.Xna.Framework;
    using Microsoft.Xna.Framework.Graphics;

    using MyONez.ECS;
    using MyONez.ECS.Components;
    using MyONez.Graphics.Renderers;
    using MyONez.Graphics.ResolutionPolicy;
    using MyONez.Samples.Base.AI;
    using MyONez.Samples.Base.Components;
    using MyONez.Samples.Base.Systems;

    using Random = MyONez.Maths.Random;

    #endregion

    public class BasicScene : Scene
    {
        public const int BlockSize = 30;

        public const int MapSize = 19;

        public static int ColorsCount = 7;

        public BasicScene()
        {
            this.SetDesignResolution(1200, 600, SceneResolutionPolicy.None);
            Core.Instance.Screen.SetSize(1200, 600);

            this.AddRenderer(new DefaultRenderer());

            this.AddEntitySystem(new FieldMeshGeneratorSystem());
            this.AddEntitySystem(new FieldClickUpdateSystem(this));
            this.AddEntitySystem(new ApplyTurnUpdateSystem(this));
            this.AddEntitySystem(new CounterToTextUpdateSystem());
            this.AddEntitySystem(new GameOverUpdateSystem(this));
            this.AddEntitySystem(new TextUIUpdateSystem());
            this.AddEntitySystem(new AIUpdateSystem());
            this.AddEntitySystem(new UIUpdateSystem(Core.Instance.Content));
            this.AddEntitySystem(new TurnSelectorUpdateSystem());
            this.AddEntitySystem(new ColorSelectorGrayingUpdateSystem(this));

            this.AddEntitySystemExecutionOrder<AIUpdateSystem, TurnSelectorUpdateSystem>();
            this.AddEntitySystemExecutionOrder<FieldClickUpdateSystem, TurnSelectorUpdateSystem>();
            this.AddEntitySystemExecutionOrder<TurnSelectorUpdateSystem, ApplyTurnUpdateSystem>();
            this.AddEntitySystemExecutionOrder<ApplyTurnUpdateSystem, FieldMeshGeneratorSystem>();
            this.AddEntitySystemExecutionOrder<ApplyTurnUpdateSystem, GameOverUpdateSystem>();
            this.AddEntitySystemExecutionOrder<ApplyTurnUpdateSystem, CounterToTextUpdateSystem>();
            this.AddEntitySystemExecutionOrder<ApplyTurnUpdateSystem, ColorSelectorGrayingUpdateSystem>();
            this.AddEntitySystemExecutionOrder<ColorSelectorGrayingUpdateSystem, FieldMeshGeneratorSystem>();
            this.AddEntitySystemExecutionOrder<CounterToTextUpdateSystem, GameOverUpdateSystem>();
            this.AddEntitySystemExecutionOrder<CounterToTextUpdateSystem, TextUIUpdateSystem>();
            this.AddEntitySystemExecutionOrder<UIUpdateSystem, TextUIUpdateSystem>();

            var moonTex = this.Content.Load<Texture2D>(ContentPaths.Basic.moon);

            var common = this.CreateEntity("Common");
            common.AddComponent(new CameraShakeComponent(this.Camera));

            var fieldEntity = this.CreateEntity("Field");
            fieldEntity.AddComponent<PositionComponent>().Position = new Vector2(285, 15);
            fieldEntity.AddComponent<TurnMadeComponent>();
            var field = fieldEntity.AddComponent<FieldComponent>();
            field.BlockSize = BlockSize;
            field.Map = new int[MapSize, MapSize];
            field.Texture = moonTex;

            var colorSelector = this.CreateEntity("ColorSelector");
            var colorSelectorPosition = colorSelector.AddComponent<PositionComponent>();
            colorSelectorPosition.Position = new Vector2(1000, Core.Instance.Screen.Center.Y - (BlockSize * 2 + 10) * ColorsCount / 2f);
            var colorSelectionField = colorSelector.AddComponent<FieldComponent>();
            colorSelectionField.Map = new int[1, ColorsCount];
            colorSelectionField.Texture = moonTex;
            colorSelectionField.BlockSize = BlockSize * 2;
            colorSelectionField.BlockInterval = 10;

            var player1 = this.CreateEntity("Player1");
            var player1Turn = player1.AddComponent<TurnMadeComponent>();
            player1Turn.Player = 0;
            player1Turn.TurnMade = false;

            var player2 = this.CreateEntity("Player2");
            var player2Turn = player2.AddComponent<TurnMadeComponent>();
            player2Turn.Player = 1;
            player2Turn.TurnMade = true;

            fieldEntity.AddComponent(new PlayerSwitcherComponent
            {
                Player1 = player1Turn,
                Player2 = player2Turn
            });
            
            var counterEntity = this.CreateEntity("Counter");
            var counter = counterEntity.AddComponent<CounterComponent>();
            counterEntity.AddComponent<TextComponent>().Text = "Test text;";
            counterEntity.AddComponent<ColorComponent>().Color = Color.Gray;

            var help = this.CreateEntity("Help");
            var ui = help.AddComponent<UIComponent>();
            ui.UserInterface.ShowCursor = false;
            var panel = ui.UserInterface.AddEntity(new Panel(new Vector2(250, 250), PanelSkin.None, Anchor.CenterLeft));
            panel.AddChild(
                new Button("Help")
                {
                    OnClick = (b) =>
                    {
                        player1.Enabled = false;
                        player2.Enabled = false;
                        MessageBox.ShowMsgBox(
                            "Help",
                            "Turn base flood it game.\n AIBot start in top left corner. \nYou start in bottom right corner. \nEach turn you select a color to flood your corner with by clicking on a colored cell on a field. \nIf any player reach size more then half of a field - game is over.",
                            onDone: () =>
                            {
                                player1.Enabled = true;
                                player2.Enabled = true;
                            });
                    }
                });
            panel.AddChild(
                new Button("Restart")
                {
                    OnClick = (b) => { this.Restart(field, counter); }
                });

            var player1Label = new Label("Player 1");
            var player1DropDown = new DropDown();
            player1DropDown.AddItem("User");
            player1DropDown.AddItem("Easy");
            player1DropDown.AddItem("Med.");
            player1DropDown.AddItem("Hard");
            player1DropDown.SelectedValue = "User";

            var colorsCountLabel = new Label("Colors count");
            var colorsCountDropDown = new DropDown();
            colorsCountDropDown.AddItem("4");
            colorsCountDropDown.AddItem("5");
            colorsCountDropDown.AddItem("6");
            colorsCountDropDown.AddItem("7");
            colorsCountDropDown.SelectedValue = "5";

            var player2Label = new Label("Player 1");
            var player2DropDown = new DropDown();
            player2DropDown.AddItem("User");
            player2DropDown.AddItem("Easy");
            player2DropDown.AddItem("Med.");
            player2DropDown.AddItem("Hard");
            player2DropDown.SelectedValue = "Hard";
            var messageBox = MessageBox.ShowMsgBox(
                "Settings",
                "",
                "Set",
                extraEntities: new Entity[] { player1Label, player1DropDown, player2Label, player2DropDown, colorsCountLabel, colorsCountDropDown },
                onDone: () =>
                {
                    player1.Enabled = true;
                    player2.Enabled = true;
                    counter.Player1Name = player1DropDown.SelectedValue;
                    counter.Player2Name = player2DropDown.SelectedValue;
                    ColorsCount = int.Parse(colorsCountDropDown.SelectedValue);
                    colorSelectionField.Map = new int[1, ColorsCount];
                    colorSelectorPosition.Position = new Vector2(1000, Core.Instance.Screen.Center.Y - (BlockSize * 2 + 10) * ColorsCount / 2f);
                    this.InitPlayer(0, player1, player1Turn, player1DropDown.SelectedValue, field.Map);
                    this.InitPlayer(1, player2, player2Turn, player2DropDown.SelectedValue, field.Map);
                    this.Restart(field, counter);
                });
            messageBox.Close();
            panel.AddChild(
                new Button("Settings")
                {
                    OnClick = (b) =>
                    {
                        player1.Enabled = false;
                        player2.Enabled = false;
                        ui.UserInterface.AddEntity(messageBox.Panel);
                    }
                });

            counter.Player1Name = player1DropDown.SelectedValue;
            counter.Player2Name = player2DropDown.SelectedValue;
            this.InitPlayer(0, player1, player1Turn, player1DropDown.SelectedValue, field.Map);
            this.InitPlayer(1, player2, player2Turn, player2DropDown.SelectedValue, field.Map);
            this.Restart(field, counter);
        }

        private void InitPlayer(
            int playerId,
            LocomotorECS.Entity player,
            TurnMadeComponent playerTurn,
            string selectedValue,
            int[,] fieldMap)
        {
            var pos = (playerId == 0) ? 0 : MapSize - 1;

            player.RemoveComponent<AIComponent>();
            player.RemoveComponent<InputMouseComponent>();
            player.RemoveComponent<InputTouchComponent>();
            switch (selectedValue)
            {
                case "User":
                    player.AddComponent<InputMouseComponent>();
                    player.AddComponent<InputTouchComponent>();
                    break;
                case "Easy":
                    player.AddComponent<AIComponent>().AIBot = new StateMachine<int[,]>(fieldMap, new RandomFloodItAI(playerTurn, pos, pos));
                    break;
                case "Med.":
                    player.AddComponent<AIComponent>().AIBot = new StateMachine<int[,]>(fieldMap, new LineFloodItAI(playerTurn, pos, pos));
                    break;
                case "Hard":
                    player.AddComponent<AIComponent>().AIBot = new StateMachine<int[,]>(fieldMap, new GreedyFloodItAI(playerTurn, pos, pos));
                    break;
            }
        }

        public void Restart(FieldComponent field, CounterComponent counter)
        {
            for (var x = 0; x < field.Map.GetLength(0); x++)
            for (var y = 0; y < field.Map.GetLength(1); y++)
            {
                field.Map[x, y] = Random.NextInt(ColorsCount);
            }

            counter.GameOver = false;
            counter.Player1Size = 1;
            counter.Player2Size = 1;
        }
    }
}
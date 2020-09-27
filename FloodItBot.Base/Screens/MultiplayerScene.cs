namespace FloodItBot.Base.Screens
{
    #region Using Directives

    using System.Collections;
    using System.Collections.Generic;

    using BrainAI.AI.FSM;
    using BrainAI.ECS.Components;
    using BrainAI.ECS.EntitySystems;

    using GeonBit.UI;
    using GeonBit.UI.ECS.Components;
    using GeonBit.UI.ECS.EntitySystems;
    using GeonBit.UI.Entities;
    using GeonBit.UI.Utils;

    using Microsoft.Xna.Framework;
    using Microsoft.Xna.Framework.Content;
    using Microsoft.Xna.Framework.Graphics;

    using MyONez.ECS;
    using MyONez.ECS.Components;
    using MyONez.Graphics.Renderers;
    using MyONez.Graphics.ResolutionPolicy;
    using FloodItBot.Base.AI;
    using FloodItBot.Base.Components;
    using FloodItBot.Base.Systems;

    using MyONez;

    using Random = MyONez.Maths.Random;

    #endregion

    public class MultiplayerScene : Scene
    {
        public MultiplayerScene()
        {
            this.SetDesignResolution(1200, 600, SceneResolutionPolicy.None);
            Core.Instance.Screen.SetSize(1200, 600);

            this.AddRenderer(new DefaultRenderer());

            this.AddEntitySystem(new FieldMeshGeneratorSystem());
            this.AddEntitySystem(new FieldClickUpdateSystem(this));
            this.AddEntitySystem(new ApplyTurnUpdateSystem(this));
            this.AddEntitySystem(new CounterToTextUpdateSystem());
            this.AddEntitySystem(new MultiplayerGameOverUpdateSystem(this));
            this.AddEntitySystem(new TextUIUpdateSystem());
            this.AddEntitySystem(new AIUpdateSystem());
            this.AddEntitySystem(new UIUpdateSystem(Core.Instance.Content));
            this.AddEntitySystem(new TurnSelectorUpdateSystem());
            this.AddEntitySystem(new ColorSelectorGrayingUpdateSystem(this));

            this.AddEntitySystemExecutionOrder<AIUpdateSystem, TurnSelectorUpdateSystem>();
            this.AddEntitySystemExecutionOrder<FieldClickUpdateSystem, TurnSelectorUpdateSystem>();
            this.AddEntitySystemExecutionOrder<TurnSelectorUpdateSystem, ApplyTurnUpdateSystem>();
            this.AddEntitySystemExecutionOrder<ApplyTurnUpdateSystem, FieldMeshGeneratorSystem>();
            this.AddEntitySystemExecutionOrder<ApplyTurnUpdateSystem, MultiplayerGameOverUpdateSystem>();
            this.AddEntitySystemExecutionOrder<ApplyTurnUpdateSystem, CounterToTextUpdateSystem>();
            this.AddEntitySystemExecutionOrder<ApplyTurnUpdateSystem, ColorSelectorGrayingUpdateSystem>();
            this.AddEntitySystemExecutionOrder<ColorSelectorGrayingUpdateSystem, FieldMeshGeneratorSystem>();
            this.AddEntitySystemExecutionOrder<CounterToTextUpdateSystem, MultiplayerGameOverUpdateSystem>();
            this.AddEntitySystemExecutionOrder<CounterToTextUpdateSystem, TextUIUpdateSystem>();
            this.AddEntitySystemExecutionOrder<UIUpdateSystem, TextUIUpdateSystem>();

            var moonTex = Core.Instance.Content.Load<Texture2D>(ContentPaths.moon);

            var common = this.CreateEntity("Common");
            common.AddComponent(new CameraShakeComponent(this.Camera));

            var fieldEntity = this.CreateEntity("Field");
            fieldEntity.AddComponent<PositionComponent>().Position = new Vector2(285, 5);
            fieldEntity.AddComponent<TurnMadeComponent>();
            var field = fieldEntity.AddComponent<FieldComponent>();
            field.BlockSize = 600 / SharedData.MapSize;
            field.Map = new int[SharedData.MapSize, SharedData.MapSize];
            field.Texture = moonTex;

            var colorSelector = this.CreateEntity("ColorSelector");
            var colorSelectorPosition = colorSelector.AddComponent<PositionComponent>();
            var colorSelectionField = colorSelector.AddComponent<FieldComponent>();
            colorSelectorPosition.Position = new Vector2(1000, Core.Instance.Screen.Center.Y - (400 / SharedData.ColorsCount) * SharedData.ColorsCount / 2f);
            colorSelectionField.Map = new int[1, SharedData.ColorsCount];
            colorSelectionField.Texture = moonTex;
            colorSelectionField.BlockSize = 400 / SharedData.ColorsCount - 10;
            colorSelectionField.BlockInterval = 10;

            var player1 = this.CreateEntity("Player1");
            var player1Turn = player1.AddComponent<TurnMadeComponent>();
            player1Turn.PlayerX = 0;
            player1Turn.PlayerY = 0;
            player1Turn.TurnMade = false;

            var player2 = this.CreateEntity("Player2");
            var player2Turn = player2.AddComponent<TurnMadeComponent>();
            player2Turn.PlayerX = SharedData.MapSize - 1;
            player2Turn.PlayerY = SharedData.MapSize - 1;
            player2Turn.TurnMade = true;

            var switcher = fieldEntity.AddComponent(
                new PlayerSwitcherComponent { Players = new List<TurnMadeComponent> { player1Turn, player2Turn } });
            
            var counterEntity = this.CreateEntity("Counter");
            var counter = counterEntity.AddComponent<CounterComponent>();
            counter.Players.Add(new CounterComponent.PlayerData());
            counter.Players.Add(new CounterComponent.PlayerData());
            counterEntity.AddComponent<TextComponent>().Text = "Test text;";
            counterEntity.AddComponent<ColorComponent>().Color = Color.Gray;
            counterEntity.AddComponent<RenderOrderComponent>().Order = -1;

            var uiEntity = this.CreateEntity("UI");
            var ui = uiEntity.AddComponent<UIComponent>();
            ui.UserInterface.ShowCursor = false;
            var panel = ui.UserInterface.AddEntity(new Panel(new Vector2(250, 250), PanelSkin.None, Anchor.CenterLeft));

            var helpMessageBox = BuildHelpMessageBox(player1, player2);

            var player1Label = new Label("Player 1", Anchor.TopLeft, null, new Vector2(0, 60));
            var player1DropDown = new DropDown(new Vector2(250, -1), Anchor.TopLeft, new Vector2(0, 90));
            player1DropDown.AddItem("User");
            player1DropDown.AddItem("Easy");
            player1DropDown.AddItem("Med.");
            player1DropDown.AddItem("Hard");
            player1DropDown.SelectedValue = "User";

            var player2Label = new Label("Player 2", Anchor.TopLeft, null, new Vector2(300, 60));
            var player2DropDown = new DropDown(new Vector2(250, -1), Anchor.TopLeft, new Vector2(300, 90));
            player2DropDown.AddItem("User");
            player2DropDown.AddItem("Easy");
            player2DropDown.AddItem("Med.");
            player2DropDown.AddItem("Hard");
            player2DropDown.SelectedValue = "Hard";

            var colorsCountLabel = new Label("Colors count", Anchor.TopLeft, null, new Vector2(0, 180));
            var colorsCountDropDown = new DropDown(new Vector2(250, -1), Anchor.TopLeft, new Vector2(0, 210));
            colorsCountDropDown.AddItem("4");
            colorsCountDropDown.AddItem("5");
            colorsCountDropDown.AddItem("6");
            colorsCountDropDown.AddItem("7");
            colorsCountDropDown.SelectedValue = SharedData.ColorsCount.ToString();

            var fieldSizeLabel = new Label("Field size", Anchor.TopLeft, null, new Vector2(300, 180));
            var fieldSizeDropDown = new DropDown(new Vector2(250, -1), Anchor.TopLeft, new Vector2(300, 210));
            fieldSizeDropDown.AddItem("7");
            fieldSizeDropDown.AddItem("11");
            fieldSizeDropDown.AddItem("15");
            fieldSizeDropDown.AddItem("19");
            fieldSizeDropDown.SelectedValue = SharedData.MapSize.ToString();

            var settingsMessageBox = MessageBox.BuildMessageBox(
                "Settings",
                "",
                "Set",
                new Vector2(600, 450),
                new Entity[]
                {
                    player1Label, player1DropDown, player2Label, player2DropDown, colorsCountLabel,
                    colorsCountDropDown, fieldSizeLabel, fieldSizeDropDown
                });

            settingsMessageBox.OnDone = (b) =>
            {
                player1.Enabled = true;
                player2.Enabled = true;
                counter.Players[0].Name = player1DropDown.SelectedValue;
                counter.Players[1].Name = player2DropDown.SelectedValue;
                SharedData.ColorsCount = int.Parse(colorsCountDropDown.SelectedValue);
                colorSelectorPosition.Position = new Vector2(1000, Core.Instance.Screen.Center.Y - (400 / SharedData.ColorsCount) * SharedData.ColorsCount / 2f);
                colorSelectionField.Map = new int[1, SharedData.ColorsCount];
                colorSelectionField.Texture = moonTex;
                colorSelectionField.BlockSize = 400 / SharedData.ColorsCount - 10;
                colorSelectionField.BlockInterval = 10;

                SharedData.MapSize = int.Parse(fieldSizeDropDown.SelectedValue);
                field.BlockSize = 600 / SharedData.MapSize;
                field.Map = new int[SharedData.MapSize, SharedData.MapSize];
                field.Texture = moonTex;
                player2Turn.PlayerX = SharedData.MapSize - 1;
                player2Turn.PlayerY = SharedData.MapSize - 1;

                this.InitPlayer(player1, player1Turn, switcher, player1DropDown.SelectedValue, field.Map);
                this.InitPlayer(player2, player2Turn, switcher, player2DropDown.SelectedValue, field.Map);
                this.Restart(field, counter);
            };

            panel.AddChild(
                new Button("Help")
                {
                    OnClick = (b) =>
                    {
                        helpMessageBox.Show();
                    }
                });

            panel.AddChild(
                new Button("Restart")
                {
                    OnClick = (b) => { this.Restart(field, counter); }
                });

            panel.AddChild(
                new Button("Settings")
                {
                    OnClick = (b) =>
                    {
                        settingsMessageBox.Show();
                        player1.Enabled = false;
                        player2.Enabled = false;
                    }
                });

            panel.AddChild(
                new Button("Back") { OnClick = (b) => { Core.Instance.SwitchScene(new GameChooseScene()); } });

            counter.Players[0].Name = player1DropDown.SelectedValue;
            counter.Players[1].Name = player2DropDown.SelectedValue;
            this.InitPlayer(player1, player1Turn, switcher, player1DropDown.SelectedValue, field.Map);
            this.InitPlayer(player2, player2Turn, switcher, player2DropDown.SelectedValue, field.Map);
            this.Restart(field, counter);

            UserInterface.Active = ui.UserInterface;
            helpMessageBox.Show();
        }

        private MessageBox.MessageBoxHandle BuildHelpMessageBox(LocomotorECS.Entity player1, LocomotorECS.Entity player2)
        {
            var images = new[]
            {
                Core.Instance.Content.Load<Texture2D>(ContentPaths.helpMulti1),
                Core.Instance.Content.Load<Texture2D>(ContentPaths.helpMulti2),
                Core.Instance.Content.Load<Texture2D>(ContentPaths.helpMulti3)
            };

            var image = new Image(images[0], anchor: Anchor.TopCenter, size: new Vector2(656, 500));
            var button = new Button("next ->", anchor: Anchor.BottomCenter, size: new Vector2(300, 50));

            var messageBox = MessageBox.BuildMessageBox(
                "",
                "",
                new MessageBox.MsgBoxOption[0],
                new Entity[] { image, button },
                new Vector2(710, 600));

            var currentImage = 0;
            button.OnClick = image.OnClick = (b) =>
            {
                if (currentImage + 1 == images.Length)
                {
                    messageBox.Close();
                    return;
                }

                currentImage++;
                image.Texture = images[currentImage];
                
            };

            messageBox.OnDone = (b) =>
            {
                player1.Enabled = true;
                player2.Enabled = true;
            };

            messageBox.OnShow = (b) =>
            {
                currentImage = 0;
                image.Texture = images[currentImage];
                player1.Enabled = false;
                player2.Enabled = false;
            };

            return messageBox;
        }

        private void InitPlayer(
            LocomotorECS.Entity player,
            TurnMadeComponent playerTurn,
            PlayerSwitcherComponent switcher,
            string selectedValue,
            int[,] fieldMap)
        {
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
                    player.AddComponent<AIComponent>().AIBot = new StateMachine<int[,]>(fieldMap, new RandomFloodItAI(playerTurn, switcher));
                    break;
                case "Med.":
                    player.AddComponent<AIComponent>().AIBot = new StateMachine<int[,]>(fieldMap, new LineFloodItAI(playerTurn, switcher));
                    break;
                case "Hard":
                    player.AddComponent<AIComponent>().AIBot = new StateMachine<int[,]>(fieldMap, new GreedyFloodItAI(playerTurn, switcher));
                    break;
            }
        }

        public void Restart(FieldComponent field, CounterComponent counter)
        {
            for (var x = 0; x < field.Map.GetLength(0); x++)
            for (var y = 0; y < field.Map.GetLength(1); y++)
            {
                field.Map[x, y] = Random.NextInt(SharedData.ColorsCount);
            }

            counter.GameOver = false;

            for (int i = 0; i < counter.Players.Count; i++)
            {
                counter.Players[i].Size = 1;
            }
        }

        public static IEnumerator GetEnumerator(ContentManager content)
        {
            content.Load<Texture2D>(ContentPaths.moon);
            yield return 0;
            content.Load<Texture2D>(ContentPaths.helpMulti1);
            yield return 0;
            content.Load<Texture2D>(ContentPaths.helpMulti2);
            yield return 0;
            content.Load<Texture2D>(ContentPaths.helpMulti3);
            yield return 0;
        }
    }
}
/**
 * @version 1.0.0
 * @author ApmeM
 * @copyright Copyright ©  2019
 * @compiler Bridge.NET 17.6.0
 */
Bridge.assembly("FloodItBot.Base", function ($asm, globals) {
    "use strict";

    Bridge.define("FloodItBot.Base.AI.BaseFloodItAI", {
        inherits: [BrainAI.AI.FSM.State$1(System.Array.type(System.Int32, 2))],
        fields: {
            turn: null,
            switcher: null,
            startX: 0,
            startY: 0
        },
        ctors: {
            ctor: function (turn, switcher) {
                this.$initialize();
                BrainAI.AI.FSM.State$1(System.Array.type(System.Int32, 2)).ctor.call(this);
                this.turn = turn;
                this.switcher = switcher;
                this.startX = this.turn.PlayerX;
                this.startY = this.turn.PlayerY;
            }
        },
        methods: {
            Update: function () {
                if (this.turn.TurnMade) {
                    return;
                }

                var color = this.Act();

                if (!this.IsColorPossible(color)) {
                    return;
                }

                this.turn.Color = color;
                this.turn.TurnMade = true;
            },
            IsColorPossible: function (color) {
                if (color < 0 || color >= FloodItBot.Base.Screens.SharedData.ColorsCount) {
                    return false;
                }

                for (var index = 0; index < this.switcher.Players.Count; index = (index + 1) | 0) {
                    var otherTurns = this.switcher.Players.getItem(index);
                    if (color === this.Context.get([otherTurns.PlayerX, otherTurns.PlayerY])) {
                        return false;
                    }
                }

                return true;
            }
        }
    });

    Bridge.define("FloodItBot.Base.Components.CounterComponent", {
        inherits: [LocomotorECS.Component],
        fields: {
            Players: null,
            GamesPlayed: 0,
            GameOver: false,
            TurnsMade: 0
        },
        ctors: {
            init: function () {
                this.Players = new (System.Collections.Generic.List$1(FloodItBot.Base.Components.CounterComponent.PlayerData)).ctor();
            }
        }
    });

    Bridge.define("FloodItBot.Base.Components.CounterComponent.PlayerData", {
        $kind: "nested class",
        fields: {
            Size: 0,
            Wins: 0,
            Name: null
        }
    });

    Bridge.define("FloodItBot.Base.Components.FieldComponent", {
        inherits: [LocomotorECS.Component],
        fields: {
            Texture: null,
            Map: null,
            BlockSize: 0,
            BlockInterval: 0
        }
    });

    Bridge.define("FloodItBot.Base.Components.PlayerSwitcherComponent", {
        inherits: [LocomotorECS.Component],
        props: {
            Players: null,
            CurrentPlayer: 0
        }
    });

    Bridge.define("FloodItBot.Base.Components.TurnMadeComponent", {
        inherits: [LocomotorECS.Component],
        fields: {
            PlayerX: 0,
            PlayerY: 0,
            Color: 0,
            TurnMade: false
        }
    });

    Bridge.define("FloodItBot.Base.ContentPaths", {
        statics: {
            fields: {
                content: null,
                helpMulti1: null,
                helpMulti2: null,
                helpMulti3: null,
                helpSingle1: null,
                helpSingle2: null,
                helpSingle3: null,
                moon: null
            },
            ctors: {
                init: function () {
                    this.content = "Content";
                    this.helpMulti1 = "helpMulti1";
                    this.helpMulti2 = "helpMulti2";
                    this.helpMulti3 = "helpMulti3";
                    this.helpSingle1 = "helpSingle1";
                    this.helpSingle2 = "helpSingle2";
                    this.helpSingle3 = "helpSingle3";
                    this.moon = "moon";
                }
            }
        }
    });

    /** @namespace FloodItBot.Base */

    /**
     * This is the main type for your game.
     *
     * @public
     * @class FloodItBot.Base.Game1
     * @augments MyONez.Core
     */
    Bridge.define("FloodItBot.Base.Game1", {
        inherits: [MyONez.Core],
        ctors: {
            ctor: function () {
                this.$initialize();
                MyONez.Core.ctor.call(this, 650, 800);
                this.Window.AllowUserResizing = true;
            }
        },
        methods: {
            Initialize: function () {
                MyONez.Core.prototype.Initialize.call(this);
                MyONez.Core.Instance.SwitchScene(new (MyONez.AdditionalContent.Scenes.LoadingScene$1(FloodItBot.Base.Screens.GameChooseScene))(Bridge.fn.bind(this, $asm.$.FloodItBot.Base.Game1.f1)(new (System.Collections.Generic.List$1(MyONez.AdditionalContent.Scenes.LoadingData)).ctor()), 1200, 600));
            }
        }
    });

    Bridge.ns("FloodItBot.Base.Game1", $asm.$);

    Bridge.apply($asm.$.FloodItBot.Base.Game1, {
        f1: function (_o1) {
            var $t;
            _o1.add(($t = new MyONez.AdditionalContent.Scenes.LoadingData(), $t.Count = 4, $t.Enumerator = FloodItBot.Base.Screens.MultiplayerScene.GetEnumerator(this.Content), $t));
            _o1.add(($t = new MyONez.AdditionalContent.Scenes.LoadingData(), $t.Count = 4, $t.Enumerator = FloodItBot.Base.Screens.SingleplayerScene.GetEnumerator(this.Content), $t));
            _o1.add(($t = new MyONez.AdditionalContent.Scenes.LoadingData(), $t.Count = 47, $t.Enumerator = GeonBit.UI.Utils.GeonBitUIResources.GetEnumerator(this.Content, "hd"), $t));
            return _o1;
        }
    });

    Bridge.define("FloodItBot.Base.Screens.GameChooseScene", {
        inherits: [MyONez.ECS.Scene],
        statics: {
            fields: {
                AvailableTurns: 0
            },
            ctors: {
                init: function () {
                    this.AvailableTurns = Bridge.Int.clip32(FloodItBot.Base.Screens.SharedData.MapSize * 1.65);
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                MyONez.ECS.Scene.ctor.call(this);
                this.SetDesignResolution(1200, 600, MyONez.Graphics.ResolutionPolicy.SceneResolutionPolicy.None);
                MyONez.Core.Instance.Screen.SetSize(1200, 600);

                this.AddRenderer(MyONez.Graphics.Renderers.DefaultRenderer, new MyONez.Graphics.Renderers.DefaultRenderer());

                this.AddEntitySystem(new GeonBit.UI.ECS.EntitySystems.UIUpdateSystem(MyONez.Core.Instance.Content));

                var uiEntity = this.CreateEntity("UI");
                var ui = uiEntity.AddComponent(GeonBit.UI.ECS.Components.UIComponent);
                ui.UserInterface.ShowCursor = false;

                var panel = new GeonBit.UI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(500, 500));

                panel.AddChild(new GeonBit.UI.Entities.Button.$ctor1("Single player")).OnClick = $asm.$.FloodItBot.Base.Screens.GameChooseScene.f1;
                panel.AddChild(new GeonBit.UI.Entities.Button.$ctor1("Multi player")).OnClick = $asm.$.FloodItBot.Base.Screens.GameChooseScene.f2;
                ui.UserInterface.AddEntity(panel);
            }
        }
    });

    Bridge.ns("FloodItBot.Base.Screens.GameChooseScene", $asm.$);

    Bridge.apply($asm.$.FloodItBot.Base.Screens.GameChooseScene, {
        f1: function (b) {
            MyONez.Core.Instance.SwitchScene(new FloodItBot.Base.Screens.SingleplayerScene());
        },
        f2: function (b) {
            MyONez.Core.Instance.SwitchScene(new FloodItBot.Base.Screens.MultiplayerScene());
        }
    });

    Bridge.define("FloodItBot.Base.Screens.MultiplayerScene", {
        inherits: [MyONez.ECS.Scene],
        statics: {
            methods: {
                GetEnumerator: function (content) {
                    var $step = 0,
                        $jumpFromFinally,
                        $returnValue,
                        $async_e;

                    var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                switch ($step) {
                                    case 0: {
                                        content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, FloodItBot.Base.ContentPaths.moon);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 1;
                                            return true;
                                    }
                                    case 1: {
                                        content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, FloodItBot.Base.ContentPaths.helpMulti1);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 2;
                                            return true;
                                    }
                                    case 2: {
                                        content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, FloodItBot.Base.ContentPaths.helpMulti2);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 3;
                                            return true;
                                    }
                                    case 3: {
                                        content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, FloodItBot.Base.ContentPaths.helpMulti3);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 4;
                                            return true;
                                    }
                                    case 4: {

                                    }
                                    default: {
                                        return false;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            throw $async_e;
                        }
                    }));
                    return $enumerator;
                }
            }
        },
        ctors: {
            ctor: function () {
                var $t;
                this.$initialize();
                MyONez.ECS.Scene.ctor.call(this);
                this.SetDesignResolution(1200, 600, MyONez.Graphics.ResolutionPolicy.SceneResolutionPolicy.None);
                MyONez.Core.Instance.Screen.SetSize(1200, 600);

                this.AddRenderer(MyONez.Graphics.Renderers.DefaultRenderer, new MyONez.Graphics.Renderers.DefaultRenderer());

                this.AddEntitySystem(new FloodItBot.Base.Systems.FieldMeshGeneratorSystem());
                this.AddEntitySystem(new FloodItBot.Base.Systems.FieldClickUpdateSystem(this));
                this.AddEntitySystem(new FloodItBot.Base.Systems.ApplyTurnUpdateSystem(this));
                this.AddEntitySystem(new FloodItBot.Base.Systems.CounterToTextUpdateSystem());
                this.AddEntitySystem(new FloodItBot.Base.Systems.MultiplayerGameOverUpdateSystem(this));
                this.AddEntitySystem(new GeonBit.UI.ECS.EntitySystems.TextUIUpdateSystem());
                this.AddEntitySystem(new BrainAI.ECS.EntitySystems.AIUpdateSystem());
                this.AddEntitySystem(new GeonBit.UI.ECS.EntitySystems.UIUpdateSystem(MyONez.Core.Instance.Content));
                this.AddEntitySystem(new FloodItBot.Base.Systems.TurnSelectorUpdateSystem());
                this.AddEntitySystem(new FloodItBot.Base.Systems.ColorSelectorGrayingUpdateSystem(this));

                this.AddEntitySystemExecutionOrder(BrainAI.ECS.EntitySystems.AIUpdateSystem, FloodItBot.Base.Systems.TurnSelectorUpdateSystem);
                this.AddEntitySystemExecutionOrder(FloodItBot.Base.Systems.FieldClickUpdateSystem, FloodItBot.Base.Systems.TurnSelectorUpdateSystem);
                this.AddEntitySystemExecutionOrder(FloodItBot.Base.Systems.TurnSelectorUpdateSystem, FloodItBot.Base.Systems.ApplyTurnUpdateSystem);
                this.AddEntitySystemExecutionOrder(FloodItBot.Base.Systems.ApplyTurnUpdateSystem, FloodItBot.Base.Systems.FieldMeshGeneratorSystem);
                this.AddEntitySystemExecutionOrder(FloodItBot.Base.Systems.ApplyTurnUpdateSystem, FloodItBot.Base.Systems.MultiplayerGameOverUpdateSystem);
                this.AddEntitySystemExecutionOrder(FloodItBot.Base.Systems.ApplyTurnUpdateSystem, FloodItBot.Base.Systems.CounterToTextUpdateSystem);
                this.AddEntitySystemExecutionOrder(FloodItBot.Base.Systems.ApplyTurnUpdateSystem, FloodItBot.Base.Systems.ColorSelectorGrayingUpdateSystem);
                this.AddEntitySystemExecutionOrder(FloodItBot.Base.Systems.ColorSelectorGrayingUpdateSystem, FloodItBot.Base.Systems.FieldMeshGeneratorSystem);
                this.AddEntitySystemExecutionOrder(FloodItBot.Base.Systems.CounterToTextUpdateSystem, FloodItBot.Base.Systems.MultiplayerGameOverUpdateSystem);
                this.AddEntitySystemExecutionOrder(FloodItBot.Base.Systems.CounterToTextUpdateSystem, GeonBit.UI.ECS.EntitySystems.TextUIUpdateSystem);
                this.AddEntitySystemExecutionOrder(GeonBit.UI.ECS.EntitySystems.UIUpdateSystem, GeonBit.UI.ECS.EntitySystems.TextUIUpdateSystem);

                var moonTex = MyONez.Core.Instance.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, FloodItBot.Base.ContentPaths.moon);

                var common = this.CreateEntity("Common");
                common.AddComponent$1(MyONez.ECS.Components.CameraShakeComponent, new MyONez.ECS.Components.CameraShakeComponent(this.Camera));

                var fieldEntity = this.CreateEntity("Field");
                fieldEntity.AddComponent(MyONez.ECS.Components.PositionComponent).Position = new Microsoft.Xna.Framework.Vector2.$ctor2(285, 5);
                fieldEntity.AddComponent(FloodItBot.Base.Components.TurnMadeComponent);
                var field = fieldEntity.AddComponent(FloodItBot.Base.Components.FieldComponent);
                field.BlockSize = (Bridge.Int.div(600, FloodItBot.Base.Screens.SharedData.MapSize)) | 0;
                field.Map = System.Array.create(0, null, System.Int32, FloodItBot.Base.Screens.SharedData.MapSize, FloodItBot.Base.Screens.SharedData.MapSize);
                field.Texture = moonTex;

                var colorSelector = this.CreateEntity("ColorSelector");
                var colorSelectorPosition = colorSelector.AddComponent(MyONez.ECS.Components.PositionComponent);
                var colorSelectionField = colorSelector.AddComponent(FloodItBot.Base.Components.FieldComponent);
                colorSelectorPosition.Position = new Microsoft.Xna.Framework.Vector2.$ctor2(1000, MyONez.Core.Instance.Screen.Center.Y - Bridge.Int.mul((((Bridge.Int.div(400, FloodItBot.Base.Screens.SharedData.ColorsCount)) | 0)), FloodItBot.Base.Screens.SharedData.ColorsCount) / 2.0);
                colorSelectionField.Map = System.Array.create(0, null, System.Int32, 1, FloodItBot.Base.Screens.SharedData.ColorsCount);
                colorSelectionField.Texture = moonTex;
                colorSelectionField.BlockSize = (((Bridge.Int.div(400, FloodItBot.Base.Screens.SharedData.ColorsCount)) | 0) - 10) | 0;
                colorSelectionField.BlockInterval = 10;

                var player1 = this.CreateEntity("Player1");
                var player1Turn = player1.AddComponent(FloodItBot.Base.Components.TurnMadeComponent);
                player1Turn.PlayerX = 0;
                player1Turn.PlayerY = 0;
                player1Turn.TurnMade = false;

                var player2 = this.CreateEntity("Player2");
                var player2Turn = player2.AddComponent(FloodItBot.Base.Components.TurnMadeComponent);
                player2Turn.PlayerX = (FloodItBot.Base.Screens.SharedData.MapSize - 1) | 0;
                player2Turn.PlayerY = (FloodItBot.Base.Screens.SharedData.MapSize - 1) | 0;
                player2Turn.TurnMade = true;

                var switcher = fieldEntity.AddComponent$1(FloodItBot.Base.Components.PlayerSwitcherComponent, ($t = new FloodItBot.Base.Components.PlayerSwitcherComponent(), $t.Players = function (_o1) {
                        _o1.add(player1Turn);
                        _o1.add(player2Turn);
                        return _o1;
                    }(new (System.Collections.Generic.List$1(FloodItBot.Base.Components.TurnMadeComponent)).ctor()), $t));

                var counterEntity = this.CreateEntity("Counter");
                var counter = counterEntity.AddComponent(FloodItBot.Base.Components.CounterComponent);
                counter.Players.add(new FloodItBot.Base.Components.CounterComponent.PlayerData());
                counter.Players.add(new FloodItBot.Base.Components.CounterComponent.PlayerData());
                counterEntity.AddComponent(GeonBit.UI.ECS.Components.TextComponent).Text = "Test text;";
                counterEntity.AddComponent(MyONez.ECS.Components.ColorComponent).Color = Microsoft.Xna.Framework.Color.Gray.$clone();
                counterEntity.AddComponent(MyONez.ECS.Components.RenderOrderComponent).Order = -1;

                var uiEntity = this.CreateEntity("UI");
                var ui = uiEntity.AddComponent(GeonBit.UI.ECS.Components.UIComponent);
                ui.UserInterface.ShowCursor = false;
                var panel = ui.UserInterface.AddEntity(new GeonBit.UI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(250, 250), GeonBit.UI.Entities.PanelSkin.None, GeonBit.UI.Entities.Anchor.CenterLeft));

                var helpMessageBox = this.BuildHelpMessageBox(player1, player2);

                var player1Label = new GeonBit.UI.Entities.Label.$ctor1("Player 1", GeonBit.UI.Entities.Anchor.TopLeft, null, new Microsoft.Xna.Framework.Vector2.$ctor2(0, 60));
                var player1DropDown = new GeonBit.UI.Entities.DropDown.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(250, -1), GeonBit.UI.Entities.Anchor.TopLeft, new Microsoft.Xna.Framework.Vector2.$ctor2(0, 90));
                player1DropDown.AddItem("User");
                player1DropDown.AddItem("Easy");
                player1DropDown.AddItem("Med.");
                player1DropDown.AddItem("Hard");
                player1DropDown.SelectedValue = "User";

                var player2Label = new GeonBit.UI.Entities.Label.$ctor1("Player 2", GeonBit.UI.Entities.Anchor.TopLeft, null, new Microsoft.Xna.Framework.Vector2.$ctor2(300, 60));
                var player2DropDown = new GeonBit.UI.Entities.DropDown.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(250, -1), GeonBit.UI.Entities.Anchor.TopLeft, new Microsoft.Xna.Framework.Vector2.$ctor2(300, 90));
                player2DropDown.AddItem("User");
                player2DropDown.AddItem("Easy");
                player2DropDown.AddItem("Med.");
                player2DropDown.AddItem("Hard");
                player2DropDown.SelectedValue = "Hard";

                var colorsCountLabel = new GeonBit.UI.Entities.Label.$ctor1("Colors count", GeonBit.UI.Entities.Anchor.TopLeft, null, new Microsoft.Xna.Framework.Vector2.$ctor2(0, 180));
                var colorsCountDropDown = new GeonBit.UI.Entities.DropDown.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(250, -1), GeonBit.UI.Entities.Anchor.TopLeft, new Microsoft.Xna.Framework.Vector2.$ctor2(0, 210));
                colorsCountDropDown.AddItem("4");
                colorsCountDropDown.AddItem("5");
                colorsCountDropDown.AddItem("6");
                colorsCountDropDown.AddItem("7");
                colorsCountDropDown.SelectedValue = Bridge.toString(FloodItBot.Base.Screens.SharedData.ColorsCount);

                var fieldSizeLabel = new GeonBit.UI.Entities.Label.$ctor1("Field size", GeonBit.UI.Entities.Anchor.TopLeft, null, new Microsoft.Xna.Framework.Vector2.$ctor2(300, 180));
                var fieldSizeDropDown = new GeonBit.UI.Entities.DropDown.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(250, -1), GeonBit.UI.Entities.Anchor.TopLeft, new Microsoft.Xna.Framework.Vector2.$ctor2(300, 210));
                fieldSizeDropDown.AddItem("7");
                fieldSizeDropDown.AddItem("11");
                fieldSizeDropDown.AddItem("15");
                fieldSizeDropDown.AddItem("19");
                fieldSizeDropDown.SelectedValue = Bridge.toString(FloodItBot.Base.Screens.SharedData.MapSize);

                var settingsMessageBox = GeonBit.UI.Utils.MessageBox.BuildMessageBox$1("Settings", "", "Set", new Microsoft.Xna.Framework.Vector2.$ctor2(600, 450), System.Array.init([player1Label, player1DropDown, player2Label, player2DropDown, colorsCountLabel, colorsCountDropDown, fieldSizeLabel, fieldSizeDropDown], GeonBit.UI.Entities.Entity));

                settingsMessageBox.OnDone = Bridge.fn.bind(this, function (b) {
                    player1.Enabled = true;
                    player2.Enabled = true;
                    counter.Players.getItem(0).Name = player1DropDown.SelectedValue;
                    counter.Players.getItem(1).Name = player2DropDown.SelectedValue;
                    FloodItBot.Base.Screens.SharedData.ColorsCount = System.Int32.parse(colorsCountDropDown.SelectedValue);
                    colorSelectorPosition.Position = new Microsoft.Xna.Framework.Vector2.$ctor2(1000, MyONez.Core.Instance.Screen.Center.Y - Bridge.Int.mul((((Bridge.Int.div(400, FloodItBot.Base.Screens.SharedData.ColorsCount)) | 0)), FloodItBot.Base.Screens.SharedData.ColorsCount) / 2.0);
                    colorSelectionField.Map = System.Array.create(0, null, System.Int32, 1, FloodItBot.Base.Screens.SharedData.ColorsCount);
                    colorSelectionField.Texture = moonTex;
                    colorSelectionField.BlockSize = (((Bridge.Int.div(400, FloodItBot.Base.Screens.SharedData.ColorsCount)) | 0) - 10) | 0;
                    colorSelectionField.BlockInterval = 10;

                    FloodItBot.Base.Screens.SharedData.MapSize = System.Int32.parse(fieldSizeDropDown.SelectedValue);
                    field.BlockSize = (Bridge.Int.div(600, FloodItBot.Base.Screens.SharedData.MapSize)) | 0;
                    field.Map = System.Array.create(0, null, System.Int32, FloodItBot.Base.Screens.SharedData.MapSize, FloodItBot.Base.Screens.SharedData.MapSize);
                    field.Texture = moonTex;
                    player2Turn.PlayerX = (FloodItBot.Base.Screens.SharedData.MapSize - 1) | 0;
                    player2Turn.PlayerY = (FloodItBot.Base.Screens.SharedData.MapSize - 1) | 0;

                    this.InitPlayer(player1, player1Turn, switcher, player1DropDown.SelectedValue, field.Map);
                    this.InitPlayer(player2, player2Turn, switcher, player2DropDown.SelectedValue, field.Map);
                    this.Restart(field, counter);
                });

                panel.AddChild(($t = new GeonBit.UI.Entities.Button.$ctor1("Help"), $t.OnClick = function (b) {
                    helpMessageBox.Show();
                }, $t));

                panel.AddChild(($t = new GeonBit.UI.Entities.Button.$ctor1("Restart"), $t.OnClick = Bridge.fn.bind(this, function (b) {
                    this.Restart(field, counter);
                }), $t));

                panel.AddChild(($t = new GeonBit.UI.Entities.Button.$ctor1("Settings"), $t.OnClick = function (b) {
                    settingsMessageBox.Show();
                    player1.Enabled = false;
                    player2.Enabled = false;
                }, $t));

                panel.AddChild(($t = new GeonBit.UI.Entities.Button.$ctor1("Back"), $t.OnClick = $asm.$.FloodItBot.Base.Screens.MultiplayerScene.f1, $t));

                counter.Players.getItem(0).Name = player1DropDown.SelectedValue;
                counter.Players.getItem(1).Name = player2DropDown.SelectedValue;
                this.InitPlayer(player1, player1Turn, switcher, player1DropDown.SelectedValue, field.Map);
                this.InitPlayer(player2, player2Turn, switcher, player2DropDown.SelectedValue, field.Map);
                this.Restart(field, counter);

                GeonBit.UI.UserInterface.Active = ui.UserInterface;
                helpMessageBox.Show();
            }
        },
        methods: {
            BuildHelpMessageBox: function (player1, player2) {
                var images = System.Array.init([MyONez.Core.Instance.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, FloodItBot.Base.ContentPaths.helpMulti1), MyONez.Core.Instance.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, FloodItBot.Base.ContentPaths.helpMulti2), MyONez.Core.Instance.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, FloodItBot.Base.ContentPaths.helpMulti3)], Microsoft.Xna.Framework.Graphics.Texture2D);

                var image = new GeonBit.UI.Entities.Image.$ctor1(images[System.Array.index(0, images)], new Microsoft.Xna.Framework.Vector2.$ctor2(656, 500), 0, GeonBit.UI.Entities.Anchor.TopCenter, void 0);
                var button = new GeonBit.UI.Entities.Button.$ctor1("next ->", 0, GeonBit.UI.Entities.Anchor.BottomCenter, new Microsoft.Xna.Framework.Vector2.$ctor2(300, 50), void 0);

                var messageBox = GeonBit.UI.Utils.MessageBox.BuildMessageBox("", "", System.Array.init(0, null, GeonBit.UI.Utils.MessageBox.MsgBoxOption), System.Array.init([image, button], GeonBit.UI.Entities.Entity), new Microsoft.Xna.Framework.Vector2.$ctor2(710, 600));

                var currentImage = 0;
                button.OnClick = (image.OnClick = function (b) {
                    if (((currentImage + 1) | 0) === images.length) {
                        messageBox.Close();
                        return;
                    }

                    currentImage = (currentImage + 1) | 0;
                    image.Texture = images[System.Array.index(currentImage, images)];

                });

                messageBox.OnDone = function (b) {
                    player1.Enabled = true;
                    player2.Enabled = true;
                };

                messageBox.OnShow = function (b) {
                    currentImage = 0;
                    image.Texture = images[System.Array.index(currentImage, images)];
                    player1.Enabled = false;
                    player2.Enabled = false;
                };

                return messageBox;
            },
            InitPlayer: function (player, playerTurn, switcher, selectedValue, fieldMap) {
                player.RemoveComponent$1(BrainAI.ECS.Components.AIComponent);
                player.RemoveComponent$1(MyONez.ECS.Components.InputMouseComponent);
                player.RemoveComponent$1(MyONez.ECS.Components.InputTouchComponent);
                switch (selectedValue) {
                    case "User": 
                        player.AddComponent(MyONez.ECS.Components.InputMouseComponent);
                        player.AddComponent(MyONez.ECS.Components.InputTouchComponent);
                        break;
                    case "Easy": 
                        player.AddComponent(BrainAI.ECS.Components.AIComponent).AIBot = new (BrainAI.AI.FSM.StateMachine$1(System.Array.type(System.Int32, 2)))(fieldMap, new FloodItBot.Base.AI.RandomFloodItAI(playerTurn, switcher));
                        break;
                    case "Med.": 
                        player.AddComponent(BrainAI.ECS.Components.AIComponent).AIBot = new (BrainAI.AI.FSM.StateMachine$1(System.Array.type(System.Int32, 2)))(fieldMap, new FloodItBot.Base.AI.LineFloodItAI(playerTurn, switcher));
                        break;
                    case "Hard": 
                        player.AddComponent(BrainAI.ECS.Components.AIComponent).AIBot = new (BrainAI.AI.FSM.StateMachine$1(System.Array.type(System.Int32, 2)))(fieldMap, new FloodItBot.Base.AI.GreedyFloodItAI(playerTurn, switcher));
                        break;
                }
            },
            Restart: function (field, counter) {
                for (var x = 0; x < System.Array.getLength(field.Map, 0); x = (x + 1) | 0) {
                    for (var y = 0; y < System.Array.getLength(field.Map, 1); y = (y + 1) | 0) {
                        field.Map.set([x, y], MyONez.Maths.Random.NextInt(FloodItBot.Base.Screens.SharedData.ColorsCount));
                    }
                }

                counter.GameOver = false;

                for (var i = 0; i < counter.Players.Count; i = (i + 1) | 0) {
                    counter.Players.getItem(i).Size = 1;
                }
            }
        }
    });

    Bridge.ns("FloodItBot.Base.Screens.MultiplayerScene", $asm.$);

    Bridge.apply($asm.$.FloodItBot.Base.Screens.MultiplayerScene, {
        f1: function (b) {
            MyONez.Core.Instance.SwitchScene(new FloodItBot.Base.Screens.GameChooseScene());
        }
    });

    Bridge.define("FloodItBot.Base.Screens.SharedData", {
        statics: {
            fields: {
                MapSize: 0,
                ColorsCount: 0
            },
            ctors: {
                init: function () {
                    this.MapSize = 15;
                    this.ColorsCount = 6;
                }
            }
        }
    });

    Bridge.define("FloodItBot.Base.Screens.SingleplayerScene", {
        inherits: [MyONez.ECS.Scene],
        statics: {
            props: {
                AvailableTurns: {
                    get: function () {
                        return Bridge.Int.clip32(FloodItBot.Base.Screens.SharedData.MapSize * 1.65);
                    }
                }
            },
            methods: {
                GetEnumerator: function (content) {
                    var $step = 0,
                        $jumpFromFinally,
                        $returnValue,
                        $async_e;

                    var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                switch ($step) {
                                    case 0: {
                                        content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, FloodItBot.Base.ContentPaths.moon);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 1;
                                            return true;
                                    }
                                    case 1: {
                                        content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, FloodItBot.Base.ContentPaths.helpSingle1);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 2;
                                            return true;
                                    }
                                    case 2: {
                                        content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, FloodItBot.Base.ContentPaths.helpSingle2);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 3;
                                            return true;
                                    }
                                    case 3: {
                                        content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, FloodItBot.Base.ContentPaths.helpSingle3);
                                            $enumerator.current = Bridge.box(0, System.Int32);
                                            $step = 4;
                                            return true;
                                    }
                                    case 4: {

                                    }
                                    default: {
                                        return false;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            throw $async_e;
                        }
                    }));
                    return $enumerator;
                }
            }
        },
        ctors: {
            ctor: function () {
                var $t;
                this.$initialize();
                MyONez.ECS.Scene.ctor.call(this);
                this.SetDesignResolution(1200, 600, MyONez.Graphics.ResolutionPolicy.SceneResolutionPolicy.None);
                MyONez.Core.Instance.Screen.SetSize(1200, 600);

                this.AddRenderer(MyONez.Graphics.Renderers.DefaultRenderer, new MyONez.Graphics.Renderers.DefaultRenderer());

                this.AddEntitySystem(new FloodItBot.Base.Systems.FieldMeshGeneratorSystem());
                this.AddEntitySystem(new FloodItBot.Base.Systems.FieldClickUpdateSystem(this));
                this.AddEntitySystem(new FloodItBot.Base.Systems.ApplyTurnUpdateSystem(this));
                this.AddEntitySystem(new FloodItBot.Base.Systems.CounterToTextUpdateSystem());
                this.AddEntitySystem(new FloodItBot.Base.Systems.SingleplayerGameOverUpdateSystem(this));
                this.AddEntitySystem(new GeonBit.UI.ECS.EntitySystems.TextUIUpdateSystem());
                this.AddEntitySystem(new BrainAI.ECS.EntitySystems.AIUpdateSystem());
                this.AddEntitySystem(new GeonBit.UI.ECS.EntitySystems.UIUpdateSystem(MyONez.Core.Instance.Content));
                this.AddEntitySystem(new FloodItBot.Base.Systems.TurnSelectorUpdateSystem());
                this.AddEntitySystem(new FloodItBot.Base.Systems.ColorSelectorGrayingUpdateSystem(this));

                this.AddEntitySystemExecutionOrder(BrainAI.ECS.EntitySystems.AIUpdateSystem, FloodItBot.Base.Systems.TurnSelectorUpdateSystem);
                this.AddEntitySystemExecutionOrder(FloodItBot.Base.Systems.FieldClickUpdateSystem, FloodItBot.Base.Systems.TurnSelectorUpdateSystem);
                this.AddEntitySystemExecutionOrder(FloodItBot.Base.Systems.TurnSelectorUpdateSystem, FloodItBot.Base.Systems.ApplyTurnUpdateSystem);
                this.AddEntitySystemExecutionOrder(FloodItBot.Base.Systems.ApplyTurnUpdateSystem, FloodItBot.Base.Systems.FieldMeshGeneratorSystem);
                this.AddEntitySystemExecutionOrder(FloodItBot.Base.Systems.ApplyTurnUpdateSystem, FloodItBot.Base.Systems.SingleplayerGameOverUpdateSystem);
                this.AddEntitySystemExecutionOrder(FloodItBot.Base.Systems.ApplyTurnUpdateSystem, FloodItBot.Base.Systems.CounterToTextUpdateSystem);
                this.AddEntitySystemExecutionOrder(FloodItBot.Base.Systems.ApplyTurnUpdateSystem, FloodItBot.Base.Systems.ColorSelectorGrayingUpdateSystem);
                this.AddEntitySystemExecutionOrder(FloodItBot.Base.Systems.ColorSelectorGrayingUpdateSystem, FloodItBot.Base.Systems.FieldMeshGeneratorSystem);
                this.AddEntitySystemExecutionOrder(FloodItBot.Base.Systems.CounterToTextUpdateSystem, FloodItBot.Base.Systems.SingleplayerGameOverUpdateSystem);
                this.AddEntitySystemExecutionOrder(FloodItBot.Base.Systems.CounterToTextUpdateSystem, GeonBit.UI.ECS.EntitySystems.TextUIUpdateSystem);
                this.AddEntitySystemExecutionOrder(GeonBit.UI.ECS.EntitySystems.UIUpdateSystem, GeonBit.UI.ECS.EntitySystems.TextUIUpdateSystem);

                var moonTex = MyONez.Core.Instance.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, FloodItBot.Base.ContentPaths.moon);

                var common = this.CreateEntity("Common");
                common.AddComponent$1(MyONez.ECS.Components.CameraShakeComponent, new MyONez.ECS.Components.CameraShakeComponent(this.Camera));

                var fieldEntity = this.CreateEntity("Field");
                fieldEntity.AddComponent(MyONez.ECS.Components.PositionComponent).Position = new Microsoft.Xna.Framework.Vector2.$ctor2(285, 5);
                fieldEntity.AddComponent(FloodItBot.Base.Components.TurnMadeComponent);
                var field = fieldEntity.AddComponent(FloodItBot.Base.Components.FieldComponent);
                field.BlockSize = (Bridge.Int.div(600, FloodItBot.Base.Screens.SharedData.MapSize)) | 0;
                field.Map = System.Array.create(0, null, System.Int32, FloodItBot.Base.Screens.SharedData.MapSize, FloodItBot.Base.Screens.SharedData.MapSize);
                field.Texture = moonTex;

                var colorSelector = this.CreateEntity("ColorSelector");
                var colorSelectorPosition = colorSelector.AddComponent(MyONez.ECS.Components.PositionComponent);
                var colorSelectionField = colorSelector.AddComponent(FloodItBot.Base.Components.FieldComponent);
                colorSelectorPosition.Position = new Microsoft.Xna.Framework.Vector2.$ctor2(1000, MyONez.Core.Instance.Screen.Center.Y - Bridge.Int.mul((((Bridge.Int.div(400, FloodItBot.Base.Screens.SharedData.ColorsCount)) | 0)), FloodItBot.Base.Screens.SharedData.ColorsCount) / 2.0);
                colorSelectionField.Map = System.Array.create(0, null, System.Int32, 1, FloodItBot.Base.Screens.SharedData.ColorsCount);
                colorSelectionField.Texture = moonTex;
                colorSelectionField.BlockSize = (((Bridge.Int.div(400, FloodItBot.Base.Screens.SharedData.ColorsCount)) | 0) - 10) | 0;
                colorSelectionField.BlockInterval = 10;

                var player1 = this.CreateEntity("Player1");
                var player1Turn = player1.AddComponent(FloodItBot.Base.Components.TurnMadeComponent);
                player1Turn.PlayerX = 0;
                player1Turn.PlayerY = 0;
                player1Turn.TurnMade = true;

                var switcher = fieldEntity.AddComponent$1(FloodItBot.Base.Components.PlayerSwitcherComponent, ($t = new FloodItBot.Base.Components.PlayerSwitcherComponent(), $t.Players = function (_o1) {
                        _o1.add(player1Turn);
                        return _o1;
                    }(new (System.Collections.Generic.List$1(FloodItBot.Base.Components.TurnMadeComponent)).ctor()), $t));

                player1.AddComponent(BrainAI.ECS.Components.AIComponent).AIBot = new (BrainAI.AI.FSM.StateMachine$1(System.Array.type(System.Int32, 2)))(field.Map, new FloodItBot.Base.AI.GreedyFloodItAI(player1Turn, switcher));

                var counterEntity = this.CreateEntity("Counter");
                var counter = counterEntity.AddComponent(FloodItBot.Base.Components.CounterComponent);
                counter.Players.add(new FloodItBot.Base.Components.CounterComponent.PlayerData());
                counterEntity.AddComponent(GeonBit.UI.ECS.Components.TextComponent).Text = "Test text;";
                counterEntity.AddComponent(MyONez.ECS.Components.ColorComponent).Color = Microsoft.Xna.Framework.Color.Gray.$clone();

                this.Restart(field, counter);

                var uiEntity = this.CreateEntity("UI");
                var ui = uiEntity.AddComponent(GeonBit.UI.ECS.Components.UIComponent);
                ui.UserInterface.ShowCursor = false;
                var panel = ui.UserInterface.AddEntity(new GeonBit.UI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(250, 250), GeonBit.UI.Entities.PanelSkin.None, GeonBit.UI.Entities.Anchor.CenterLeft));

                var helpMessageBox = this.BuildHelpMessageBox(player1);

                var player1Label = new GeonBit.UI.Entities.Label.$ctor1("Player 1", GeonBit.UI.Entities.Anchor.TopLeft, null, new Microsoft.Xna.Framework.Vector2.$ctor2(0, 60));
                var player1DropDown = new GeonBit.UI.Entities.DropDown.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(250, -1), GeonBit.UI.Entities.Anchor.TopLeft, new Microsoft.Xna.Framework.Vector2.$ctor2(0, 90));
                player1DropDown.AddItem("User");
                player1DropDown.AddItem("Easy");
                player1DropDown.AddItem("Med.");
                player1DropDown.AddItem("Hard");
                player1DropDown.SelectedValue = "User";

                var colorsCountLabel = new GeonBit.UI.Entities.Label.$ctor1("Colors count", GeonBit.UI.Entities.Anchor.TopLeft, null, new Microsoft.Xna.Framework.Vector2.$ctor2(0, 180));
                var colorsCountDropDown = new GeonBit.UI.Entities.DropDown.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(250, -1), GeonBit.UI.Entities.Anchor.TopLeft, new Microsoft.Xna.Framework.Vector2.$ctor2(0, 210));
                colorsCountDropDown.AddItem("4");
                colorsCountDropDown.AddItem("5");
                colorsCountDropDown.AddItem("6");
                colorsCountDropDown.AddItem("7");
                colorsCountDropDown.SelectedValue = Bridge.toString(FloodItBot.Base.Screens.SharedData.ColorsCount);

                var fieldSizeLabel = new GeonBit.UI.Entities.Label.$ctor1("Field size", GeonBit.UI.Entities.Anchor.TopLeft, null, new Microsoft.Xna.Framework.Vector2.$ctor2(300, 180));
                var fieldSizeDropDown = new GeonBit.UI.Entities.DropDown.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(250, -1), GeonBit.UI.Entities.Anchor.TopLeft, new Microsoft.Xna.Framework.Vector2.$ctor2(300, 210));
                fieldSizeDropDown.AddItem("7");
                fieldSizeDropDown.AddItem("11");
                fieldSizeDropDown.AddItem("15");
                fieldSizeDropDown.AddItem("19");
                fieldSizeDropDown.SelectedValue = Bridge.toString(FloodItBot.Base.Screens.SharedData.MapSize);

                var settingsMessageBox = GeonBit.UI.Utils.MessageBox.BuildMessageBox$1("Settings", "", "Set", new Microsoft.Xna.Framework.Vector2.$ctor2(600, 450), System.Array.init([player1Label, player1DropDown, colorsCountLabel, colorsCountDropDown, fieldSizeLabel, fieldSizeDropDown], GeonBit.UI.Entities.Entity));

                settingsMessageBox.OnDone = Bridge.fn.bind(this, function (b) {
                    player1.Enabled = true;
                    counter.Players.getItem(0).Name = player1DropDown.SelectedValue;
                    FloodItBot.Base.Screens.SharedData.ColorsCount = System.Int32.parse(colorsCountDropDown.SelectedValue);
                    colorSelectorPosition.Position = new Microsoft.Xna.Framework.Vector2.$ctor2(1000, MyONez.Core.Instance.Screen.Center.Y - Bridge.Int.mul((((Bridge.Int.div(400, FloodItBot.Base.Screens.SharedData.ColorsCount)) | 0)), FloodItBot.Base.Screens.SharedData.ColorsCount) / 2.0);
                    colorSelectionField.Map = System.Array.create(0, null, System.Int32, 1, FloodItBot.Base.Screens.SharedData.ColorsCount);
                    colorSelectionField.Texture = moonTex;
                    colorSelectionField.BlockSize = (((Bridge.Int.div(400, FloodItBot.Base.Screens.SharedData.ColorsCount)) | 0) - 10) | 0;
                    colorSelectionField.BlockInterval = 10;

                    FloodItBot.Base.Screens.SharedData.MapSize = System.Int32.parse(fieldSizeDropDown.SelectedValue);
                    field.BlockSize = (Bridge.Int.div(600, FloodItBot.Base.Screens.SharedData.MapSize)) | 0;
                    field.Map = System.Array.create(0, null, System.Int32, FloodItBot.Base.Screens.SharedData.MapSize, FloodItBot.Base.Screens.SharedData.MapSize);
                    field.Texture = moonTex;

                    this.InitPlayer(player1, player1Turn, switcher, player1DropDown.SelectedValue, field.Map);
                    this.Restart(field, counter);
                });

                panel.AddChild(($t = new GeonBit.UI.Entities.Button.$ctor1("Help"), $t.OnClick = function (b) {
                    helpMessageBox.Show();
                }, $t));

                panel.AddChild(($t = new GeonBit.UI.Entities.Button.$ctor1("Restart"), $t.OnClick = Bridge.fn.bind(this, function (b) {
                    this.Restart(field, counter);
                }), $t));

                panel.AddChild(($t = new GeonBit.UI.Entities.Button.$ctor1("Settings"), $t.OnClick = function (b) {
                    settingsMessageBox.Show();
                    player1.Enabled = false;
                }, $t));

                panel.AddChild(($t = new GeonBit.UI.Entities.Button.$ctor1("Back"), $t.OnClick = $asm.$.FloodItBot.Base.Screens.SingleplayerScene.f1, $t));

                counter.Players.getItem(0).Name = player1DropDown.SelectedValue;
                this.InitPlayer(player1, player1Turn, switcher, player1DropDown.SelectedValue, field.Map);
                this.Restart(field, counter);

                GeonBit.UI.UserInterface.Active = ui.UserInterface;
                helpMessageBox.Show();
            }
        },
        methods: {
            BuildHelpMessageBox: function (player1) {
                var images = System.Array.init([MyONez.Core.Instance.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, FloodItBot.Base.ContentPaths.helpSingle1), MyONez.Core.Instance.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, FloodItBot.Base.ContentPaths.helpSingle2), MyONez.Core.Instance.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, FloodItBot.Base.ContentPaths.helpSingle3)], Microsoft.Xna.Framework.Graphics.Texture2D);

                var image = new GeonBit.UI.Entities.Image.$ctor1(images[System.Array.index(0, images)], new Microsoft.Xna.Framework.Vector2.$ctor2(656, 500), 0, GeonBit.UI.Entities.Anchor.TopCenter, void 0);
                var button = new GeonBit.UI.Entities.Button.$ctor1("next ->", 0, GeonBit.UI.Entities.Anchor.BottomCenter, new Microsoft.Xna.Framework.Vector2.$ctor2(300, 50), void 0);

                var messageBox = GeonBit.UI.Utils.MessageBox.BuildMessageBox("", "", System.Array.init(0, null, GeonBit.UI.Utils.MessageBox.MsgBoxOption), System.Array.init([image, button], GeonBit.UI.Entities.Entity), new Microsoft.Xna.Framework.Vector2.$ctor2(710, 600));

                var currentImage = 0;
                button.OnClick = (image.OnClick = function (b) {
                    if (((currentImage + 1) | 0) === images.length) {
                        messageBox.Close();
                        return;
                    }

                    currentImage = (currentImage + 1) | 0;
                    image.Texture = images[System.Array.index(currentImage, images)];

                });

                messageBox.OnDone = function (b) {
                    player1.Enabled = true;
                };

                messageBox.OnShow = function (b) {
                    currentImage = 0;
                    image.Texture = images[System.Array.index(currentImage, images)];
                    player1.Enabled = false;
                };

                return messageBox;
            },
            InitPlayer: function (player, playerTurn, switcher, selectedValue, fieldMap) {
                player.RemoveComponent$1(BrainAI.ECS.Components.AIComponent);
                player.RemoveComponent$1(MyONez.ECS.Components.InputMouseComponent);
                player.RemoveComponent$1(MyONez.ECS.Components.InputTouchComponent);
                switch (selectedValue) {
                    case "User": 
                        player.AddComponent(MyONez.ECS.Components.InputMouseComponent);
                        player.AddComponent(MyONez.ECS.Components.InputTouchComponent);
                        break;
                    case "Easy": 
                        player.AddComponent(BrainAI.ECS.Components.AIComponent).AIBot = new (BrainAI.AI.FSM.StateMachine$1(System.Array.type(System.Int32, 2)))(fieldMap, new FloodItBot.Base.AI.RandomFloodItAI(playerTurn, switcher));
                        break;
                    case "Med.": 
                        player.AddComponent(BrainAI.ECS.Components.AIComponent).AIBot = new (BrainAI.AI.FSM.StateMachine$1(System.Array.type(System.Int32, 2)))(fieldMap, new FloodItBot.Base.AI.LineFloodItAI(playerTurn, switcher));
                        break;
                    case "Hard": 
                        player.AddComponent(BrainAI.ECS.Components.AIComponent).AIBot = new (BrainAI.AI.FSM.StateMachine$1(System.Array.type(System.Int32, 2)))(fieldMap, new FloodItBot.Base.AI.GreedyFloodItAI(playerTurn, switcher));
                        break;
                }
            },
            Restart: function (field, counter) {
                for (var x = 0; x < System.Array.getLength(field.Map, 0); x = (x + 1) | 0) {
                    for (var y = 0; y < System.Array.getLength(field.Map, 1); y = (y + 1) | 0) {
                        field.Map.set([x, y], MyONez.Maths.Random.NextInt(FloodItBot.Base.Screens.SharedData.ColorsCount));
                    }
                }

                counter.GameOver = false;

                for (var i = 0; i < counter.Players.Count; i = (i + 1) | 0) {
                    counter.Players.getItem(i).Size = 1;
                }
            }
        }
    });

    Bridge.ns("FloodItBot.Base.Screens.SingleplayerScene", $asm.$);

    Bridge.apply($asm.$.FloodItBot.Base.Screens.SingleplayerScene, {
        f1: function (b) {
            MyONez.Core.Instance.SwitchScene(new FloodItBot.Base.Screens.GameChooseScene());
        }
    });

    Bridge.define("FloodItBot.Base.Systems.ApplyTurnUpdateSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        fields: {
            scene: null
        },
        ctors: {
            ctor: function (scene) {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([FloodItBot.Base.Components.FieldComponent, FloodItBot.Base.Components.TurnMadeComponent]));
                this.scene = scene;
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var field = entity.GetComponent(FloodItBot.Base.Components.FieldComponent);
                var turn = entity.GetComponent(FloodItBot.Base.Components.TurnMadeComponent);
                var switcher = entity.GetComponent(FloodItBot.Base.Components.PlayerSwitcherComponent);
                var color = turn.Color;

                for (var index = 0; index < switcher.Players.Count; index = (index + 1) | 0) {
                    var otherTurns = switcher.Players.getItem(index);
                    if (color === field.Map.get([otherTurns.PlayerX, otherTurns.PlayerY])) {
                        return;
                    }
                }

                var counterEntity = this.scene.FindEntity("Counter");
                var counter = counterEntity.GetComponent(FloodItBot.Base.Components.CounterComponent);

                this.FloodIt(field.Map, color, turn.PlayerX, turn.PlayerY);
                counter.Players.getItem(switcher.CurrentPlayer).Size = this.Calc(field.Map, turn.PlayerX, turn.PlayerY);
                counter.TurnsMade = (counter.TurnsMade + 1) | 0;
            },
            FloodIt: function (map, floodColor, x, y) {
                var $t;
                var color = map.get([x, y]);

                var frontier = new (System.Collections.Generic.Queue$1(Microsoft.Xna.Framework.Point)).ctor();
                frontier.Enqueue(new Microsoft.Xna.Framework.Point.$ctor2(x, y));

                var visited = new (System.Collections.Generic.HashSet$1(Microsoft.Xna.Framework.Point)).ctor();

                while (frontier.Count > 0) {
                    var current = frontier.Dequeue().$clone();
                    map.set([current.X, current.Y], floodColor);

                    $t = Bridge.getEnumerator(this.GetNeighbors(current.$clone()), Microsoft.Xna.Framework.Point);
                    try {
                        while ($t.moveNext()) {
                            var next = $t.Current.$clone();
                            if (!this.IsInMap(map, next.$clone())) {
                                continue;
                            }

                            if (map.get([next.X, next.Y]) !== color) {
                                continue;
                            }

                            if (!visited.contains(next.$clone())) {
                                frontier.Enqueue(next.$clone());
                                visited.add(next.$clone());
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                }
            },
            Calc: function (map, x, y) {
                var $t;
                var color = map.get([x, y]);

                var result = 0;

                var frontier = new (System.Collections.Generic.Queue$1(Microsoft.Xna.Framework.Point)).ctor();
                frontier.Enqueue(new Microsoft.Xna.Framework.Point.$ctor2(x, y));

                var visited = new (System.Collections.Generic.HashSet$1(Microsoft.Xna.Framework.Point)).ctor();

                while (frontier.Count > 0) {
                    var current = frontier.Dequeue().$clone();

                    $t = Bridge.getEnumerator(this.GetNeighbors(current.$clone()), Microsoft.Xna.Framework.Point);
                    try {
                        while ($t.moveNext()) {
                            var next = $t.Current.$clone();
                            if (!this.IsInMap(map, next.$clone())) {
                                continue;
                            }

                            if (map.get([next.X, next.Y]) !== color) {
                                continue;
                            }

                            if (!visited.contains(next.$clone())) {
                                frontier.Enqueue(next.$clone());
                                visited.add(next.$clone());
                                result = (result + 1) | 0;
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                }

                return result;
            },
            IsInMap: function (map, next) {
                return next.X >= 0 && next.Y >= 0 && next.X < System.Array.getLength(map, 0) && next.Y < System.Array.getLength(map, 1);
            },
            GetNeighbors: function (current) {
                return new (Bridge.GeneratorEnumerable$1(Microsoft.Xna.Framework.Point))(Bridge.fn.bind(this, function (current) {
                    var $step = 0,
                        $jumpFromFinally,
                        $returnValue,
                        $async_e;

                    var $enumerator = new (Bridge.GeneratorEnumerator$1(Microsoft.Xna.Framework.Point))(Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                switch ($step) {
                                    case 0: {
                                        $enumerator.current = new Microsoft.Xna.Framework.Point.$ctor2(((current.X - 1) | 0), current.Y);
                                            $step = 1;
                                            return true;
                                    }
                                    case 1: {
                                        $enumerator.current = new Microsoft.Xna.Framework.Point.$ctor2(((current.X + 1) | 0), current.Y);
                                            $step = 2;
                                            return true;
                                    }
                                    case 2: {
                                        $enumerator.current = new Microsoft.Xna.Framework.Point.$ctor2(current.X, ((current.Y - 1) | 0));
                                            $step = 3;
                                            return true;
                                    }
                                    case 3: {
                                        $enumerator.current = new Microsoft.Xna.Framework.Point.$ctor2(current.X, ((current.Y + 1) | 0));
                                            $step = 4;
                                            return true;
                                    }
                                    case 4: {

                                    }
                                    default: {
                                        return false;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            throw $async_e;
                        }
                    }));
                    return $enumerator;
                }, arguments));
            }
        }
    });

    Bridge.define("FloodItBot.Base.Systems.ColorSelectorGrayingUpdateSystem", {
        inherits: [LocomotorECS.EntitySystem],
        fields: {
            scene: null
        },
        ctors: {
            ctor: function (scene) {
                this.$initialize();
                LocomotorECS.EntitySystem.ctor.call(this);
                this.scene = scene;
            }
        },
        methods: {
            DoAction: function (gameTime) {
                LocomotorECS.EntitySystem.prototype.DoAction.call(this, gameTime);
                var colorSelector = this.scene.FindEntity("ColorSelector");
                var colorSelectorMap = colorSelector.GetComponent(FloodItBot.Base.Components.FieldComponent).Map;

                var field = this.scene.FindEntity("Field");
                var fieldMap = field.GetComponent(FloodItBot.Base.Components.FieldComponent).Map;
                var switcher = field.GetComponent(FloodItBot.Base.Components.PlayerSwitcherComponent);

                for (var i = 0; i < System.Array.getLength(colorSelectorMap, 1); i = (i + 1) | 0) {
                    colorSelectorMap.set([0, i], i);
                }

                for (var index = 0; index < switcher.Players.Count; index = (index + 1) | 0) {
                    colorSelectorMap.set([0, fieldMap.get([switcher.Players.getItem(index).PlayerX, switcher.Players.getItem(index).PlayerY])], -1);
                }
            }
        }
    });

    Bridge.define("FloodItBot.Base.Systems.CounterToTextUpdateSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        ctors: {
            ctor: function () {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([GeonBit.UI.ECS.Components.TextComponent, FloodItBot.Base.Components.CounterComponent]));
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var text = entity.GetComponent(GeonBit.UI.ECS.Components.TextComponent);
                var counter = entity.GetComponent(FloodItBot.Base.Components.CounterComponent);

                var name = "     ";
                var size = "Size ";
                var wins = "Wins ";
                var rate = "Rate ";
                for (var i = 0; i < counter.Players.Count; i = (i + 1) | 0) {
                    name = (name || "") + ((System.String.format("| {0,5} ", [counter.Players.getItem(i).Name])) || "");
                    size = (size || "") + ((System.String.format("| {0,5} ", [Bridge.box(counter.Players.getItem(i).Size, System.Int32)])) || "");
                    wins = (wins || "") + ((System.String.format("| {0,5} ", [Bridge.box(counter.Players.getItem(i).Wins, System.Int32)])) || "");
                    rate = (rate || "") + ((System.String.format("| {0,4}% ", [Bridge.box((counter.GamesPlayed === 0 ? 0 : ((Bridge.Int.div(Bridge.Int.mul(counter.Players.getItem(i).Wins, 100), counter.GamesPlayed)) | 0)), System.Int32)])) || "");
                }

                text.Text = System.String.format("Statistic: \r\n{0}\r\n{1}\r\n{2}\r\n{3}", name, size, wins, rate);
            }
        }
    });

    Bridge.define("FloodItBot.Base.Systems.FieldClickUpdateSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        fields: {
            scene: null
        },
        ctors: {
            ctor: function (scene) {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([FloodItBot.Base.Components.TurnMadeComponent, MyONez.ECS.Components.InputMouseComponent]));
                this.scene = scene;
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var turn = entity.GetComponent(FloodItBot.Base.Components.TurnMadeComponent);
                var inputMouse = entity.GetComponent(MyONez.ECS.Components.InputMouseComponent);
                var inputTouch = entity.GetComponent(MyONez.ECS.Components.InputTouchComponent);

                if (!inputMouse.LeftMouseButtonPressed && (!inputTouch.IsConnected || !System.Linq.Enumerable.from(inputTouch.CurrentTouches).any())) {
                    return;
                }

                if (turn.TurnMade) {
                    return;
                }

                var cursorPosition = (inputTouch.IsConnected && System.Linq.Enumerable.from(inputTouch.CurrentTouches).any()) ? System.Linq.Enumerable.from(inputTouch.CurrentTouches).first().Position : inputMouse.MousePosition;

                var fieldEntity = this.scene.FindEntity("Field");
                var field = fieldEntity.GetComponent(FloodItBot.Base.Components.FieldComponent);
                var switcher = fieldEntity.GetComponent(FloodItBot.Base.Components.PlayerSwitcherComponent);

                if (this.TryMakeTurn(field.Map, switcher, fieldEntity, cursorPosition.$clone(), turn)) {
                    return;
                }

                fieldEntity = this.scene.FindEntity("ColorSelector");
                this.TryMakeTurn(field.Map, switcher, fieldEntity, cursorPosition.$clone(), turn);
            },
            TryMakeTurn: function (fieldMap, switcher, fieldEntity, cursorPosition, turn) {
                var position = fieldEntity.GetComponent(MyONez.ECS.Components.PositionComponent);
                var field = fieldEntity.GetComponent(FloodItBot.Base.Components.FieldComponent);
                var map = field.Map;

                var location = Microsoft.Xna.Framework.Vector2.op_Division$1((Microsoft.Xna.Framework.Vector2.op_Subtraction(cursorPosition.$clone(), position.Position.$clone())), (((field.BlockSize + field.BlockInterval) | 0)));
                var x = Bridge.Int.clip32(Math.floor(location.X));
                var y = Bridge.Int.clip32(Math.floor(location.Y));

                if (!this.IsInMap(map, x, y)) {
                    return false;
                }

                for (var index = 0; index < switcher.Players.Count; index = (index + 1) | 0) {
                    var otherTurns = switcher.Players.getItem(index);
                    if (map.get([x, y]) === field.Map.get([otherTurns.PlayerX, otherTurns.PlayerY])) {
                        var common = this.scene.FindEntity("Common");
                        common.GetComponent(MyONez.ECS.Components.CameraShakeComponent).Shake();
                        return true;
                    }
                }

                turn.Color = map.get([x, y]);
                turn.TurnMade = true;
                return true;
            },
            IsInMap: function (map, x, y) {
                return x >= 0 && y >= 0 && x < System.Array.getLength(map, 0) && y < System.Array.getLength(map, 1);
            }
        }
    });

    Bridge.define("FloodItBot.Base.Systems.FieldMeshGeneratorSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        ctors: {
            ctor: function () {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([FloodItBot.Base.Components.FieldComponent]));
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                var $t, $t1, $t2, $t3, $t4;
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var field = entity.GetComponent(FloodItBot.Base.Components.FieldComponent);
                var finalRender = entity.GetOrCreateComponent(MyONez.ECS.Components.FinalRenderComponent);
                var effect = ($t = (($t1 = entity.GetComponent(MyONez.ECS.Components.SpriteEffectsComponent)) != null ? $t1.SpriteEffects : null), $t != null ? $t : Microsoft.Xna.Framework.Graphics.SpriteEffects.None);
                var depth = ($t2 = (($t3 = entity.GetComponent(MyONez.ECS.Components.DepthLayerComponent)) != null ? $t3.Depth : null), $t2 != null ? $t2 : 0);

                if (finalRender.Batch.Meshes.Count !== Bridge.Int.mul(System.Array.getLength(field.Map, 0), System.Array.getLength(field.Map, 1))) {
                    finalRender.Batch.Clear();

                    var texture = field.Texture;

                    for (var x = 0; x < System.Array.getLength(field.Map, 0); x = (x + 1) | 0) {
                        for (var y = 0; y < System.Array.getLength(field.Map, 1); y = (y + 1) | 0) {
                            finalRender.Batch.Draw(texture, new MyONez.Maths.RectangleF.$ctor2(Bridge.Int.mul(x, (((field.BlockSize + field.BlockInterval) | 0))), Bridge.Int.mul(y, (((field.BlockSize + field.BlockInterval) | 0))), field.BlockSize, field.BlockSize), MyONez.Maths.RectangleF.op_Implicit$1(texture.Bounds.$clone()), this.ConvertMapToColor(field.Map.get([x, y])), depth);
                        }
                    }

                    var transformation = MyONez.Maths.TransformationUtils.GetTransformation(entity).LocalTransformMatrix.$clone();
                    $t4 = Bridge.getEnumerator(finalRender.Batch.Meshes);
                    try {
                        while ($t4.moveNext()) {
                            var mesh = $t4.Current;
                            mesh.ApplyEffectToMesh(effect);
                            mesh.ApplyTransformMesh(transformation.$clone());
                        }
                    } finally {
                        if (Bridge.is($t4, System.IDisposable)) {
                            $t4.System$IDisposable$Dispose();
                        }
                    }

                } else {
                    for (var x1 = 0; x1 < System.Array.getLength(field.Map, 0); x1 = (x1 + 1) | 0) {
                        for (var y1 = 0; y1 < System.Array.getLength(field.Map, 1); y1 = (y1 + 1) | 0) {
                            finalRender.Batch.Meshes.getItem(((Bridge.Int.mul(x1, System.Array.getLength(field.Map, 1)) + y1) | 0)).SetColor(this.ConvertMapToColor(field.Map.get([x1, y1])));
                        }
                    }
                }
            },
            ConvertMapToColor: function (map) {
                switch (map) {
                    case 0: 
                        return Microsoft.Xna.Framework.Color.Red.$clone();
                    case 1: 
                        return Microsoft.Xna.Framework.Color.Orange.$clone();
                    case 2: 
                        return Microsoft.Xna.Framework.Color.Yellow.$clone();
                    case 3: 
                        return Microsoft.Xna.Framework.Color.Green.$clone();
                    case 4: 
                        return Microsoft.Xna.Framework.Color.LightBlue.$clone();
                    case 5: 
                        return Microsoft.Xna.Framework.Color.Blue.$clone();
                    case 6: 
                        return Microsoft.Xna.Framework.Color.Magenta.$clone();
                }

                return Microsoft.Xna.Framework.Color.DimGray.$clone();
            }
        }
    });

    Bridge.define("FloodItBot.Base.Systems.MultiplayerGameOverUpdateSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        fields: {
            scene: null
        },
        ctors: {
            ctor: function (scene) {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([FloodItBot.Base.Components.CounterComponent]));
                this.scene = scene;
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                var $t;
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var counter = entity.GetComponent(FloodItBot.Base.Components.CounterComponent);

                if (counter.GameOver) {
                    return;
                }

                var field = this.scene.FindEntity("Field").GetComponent(FloodItBot.Base.Components.FieldComponent);

                for (var i = 0; i < counter.Players.Count; i = (i + 1) | 0) {
                    if (counter.Players.getItem(i).Size > ((Bridge.Int.div(Bridge.Int.mul(FloodItBot.Base.Screens.SharedData.MapSize, FloodItBot.Base.Screens.SharedData.MapSize), 2)) | 0)) {
                        counter.Players.getItem(i).Wins = (counter.Players.getItem(i).Wins + 1) | 0;
                        counter.GamesPlayed = (counter.GamesPlayed + 1) | 0;
                        counter.GameOver = true;
                        MyONez.Core.Instance.SwitchScene$2(($t = new MyONez.AdditionalContent.SceneTransitions.WindTransition(), $t.SceneLoadAction = Bridge.fn.bind(this, function () {
                            this.scene.Restart(field, counter);
                            return this.scene;
                        }), $t));
                    }
                }
            }
        }
    });

    Bridge.define("FloodItBot.Base.Systems.SingleplayerGameOverUpdateSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        fields: {
            scene: null
        },
        ctors: {
            ctor: function (scene) {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([FloodItBot.Base.Components.CounterComponent]));
                this.scene = scene;
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var counter = entity.GetComponent(FloodItBot.Base.Components.CounterComponent);

                if (counter.GameOver) {
                    return;
                }

                var field = this.scene.FindEntity("Field").GetComponent(FloodItBot.Base.Components.FieldComponent);
                if (counter.TurnsMade === FloodItBot.Base.Screens.SingleplayerScene.AvailableTurns) {
                    this.GameOver(counter, field, false);
                    return;
                }

                var color = field.Map.get([0, 0]);

                for (var x = 0; x < System.Array.getLength(field.Map, 0); x = (x + 1) | 0) {
                    for (var y = 0; y < System.Array.getLength(field.Map, 1); y = (y + 1) | 0) {
                        if (field.Map.get([x, y]) !== color) {
                            return;
                        }
                    }
                }

                this.GameOver(counter, field, true);
            },
            GameOver: function (counter, field, isWin) {
                var $t;
                if (isWin) {
                    counter.Players.getItem(0).Wins = (counter.Players.getItem(0).Wins + 1) | 0;
                }

                counter.GamesPlayed = (counter.GamesPlayed + 1) | 0;
                counter.GameOver = true;
                MyONez.Core.Instance.SwitchScene$2(($t = new MyONez.AdditionalContent.SceneTransitions.WindTransition(), $t.SceneLoadAction = Bridge.fn.bind(this, function () {
                    this.scene.Restart(field, counter);
                    return this.scene;
                }), $t));
            }
        }
    });

    Bridge.define("FloodItBot.Base.Systems.TurnSelectorUpdateSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        fields: {
            elapsed: null
        },
        ctors: {
            init: function () {
                this.elapsed = new System.TimeSpan();
                this.elapsed = System.TimeSpan.zero;
            },
            ctor: function () {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([FloodItBot.Base.Components.TurnMadeComponent, FloodItBot.Base.Components.PlayerSwitcherComponent]));
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                this.elapsed = System.TimeSpan.add(this.elapsed, gameTime);
                if (this.elapsed.getTotalSeconds() < 0.5) {
                    return;
                }

                var turn = entity.GetComponent(FloodItBot.Base.Components.TurnMadeComponent);
                var switcher = entity.GetComponent(FloodItBot.Base.Components.PlayerSwitcherComponent);

                var player = switcher.Players.getItem(switcher.CurrentPlayer);

                if (!player.TurnMade) {
                    return;
                }

                switcher.CurrentPlayer = (((switcher.CurrentPlayer + 1) | 0)) % switcher.Players.Count;
                var nextPlayer = switcher.Players.getItem(switcher.CurrentPlayer);

                this.elapsed = System.TimeSpan.zero;

                turn.Color = player.Color;
                turn.PlayerX = player.PlayerX;
                turn.PlayerY = player.PlayerY;
                nextPlayer.TurnMade = false;
            }
        }
    });

    Bridge.define("FloodItBot.Base.AI.GreedyFloodItAI", {
        inherits: [FloodItBot.Base.AI.BaseFloodItAI],
        fields: {
            copyArray: null
        },
        ctors: {
            ctor: function (turn, switcher) {
                this.$initialize();
                FloodItBot.Base.AI.BaseFloodItAI.ctor.call(this, turn, switcher);
            }
        },
        methods: {
            Act: function () {
                var maxValue = 0;
                var maxColor = 0;

                for (var i = 0; i < FloodItBot.Base.Screens.SharedData.ColorsCount; i = (i + 1) | 0) {
                    if (!this.IsColorPossible(i)) {
                        continue;
                    }

                    this.copyArray = this.copyArray || System.Array.create(0, null, System.Int32, System.Array.getLength(this.Context, 0), System.Array.getLength(this.Context, 1));
                    System.Array.copy(this.Context, 0, this.copyArray, 0, this.Context.length);
                    this.FloodIt(this.copyArray, i);
                    var value = this.Calc(this.copyArray);
                    if (maxValue < value) {
                        maxValue = value;
                        maxColor = i;
                    }
                }

                return maxColor;
            },
            Calc: function (map) {
                var $t;
                var color = map.get([this.startX, this.startY]);

                var result = 0;

                var frontier = new (System.Collections.Generic.Queue$1(Microsoft.Xna.Framework.Point)).ctor();
                frontier.Enqueue(new Microsoft.Xna.Framework.Point.$ctor2(this.startX, this.startY));

                var visited = new (System.Collections.Generic.HashSet$1(Microsoft.Xna.Framework.Point)).ctor();

                while (frontier.Count > 0) {
                    var current = frontier.Dequeue().$clone();

                    $t = Bridge.getEnumerator(this.GetNeighbors(current.$clone()), Microsoft.Xna.Framework.Point);
                    try {
                        while ($t.moveNext()) {
                            var next = $t.Current.$clone();
                            if (!this.IsInMap(map, next.$clone())) {
                                continue;
                            }

                            if (map.get([next.X, next.Y]) !== color) {
                                continue;
                            }

                            if (!visited.contains(next.$clone())) {
                                frontier.Enqueue(next.$clone());
                                visited.add(next.$clone());
                                result = (result + 1) | 0;
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                }

                return result;
            },
            FloodIt: function (map, floodColor) {
                var $t;
                var color = map.get([this.startX, this.startY]);

                var frontier = new (System.Collections.Generic.Queue$1(Microsoft.Xna.Framework.Point)).ctor();
                frontier.Enqueue(new Microsoft.Xna.Framework.Point.$ctor2(this.startX, this.startY));

                var visited = new (System.Collections.Generic.HashSet$1(Microsoft.Xna.Framework.Point)).ctor();

                while (frontier.Count > 0) {
                    var current = frontier.Dequeue().$clone();
                    map.set([current.X, current.Y], floodColor);

                    $t = Bridge.getEnumerator(this.GetNeighbors(current.$clone()), Microsoft.Xna.Framework.Point);
                    try {
                        while ($t.moveNext()) {
                            var next = $t.Current.$clone();
                            if (!this.IsInMap(map, next.$clone())) {
                                continue;
                            }

                            if (map.get([next.X, next.Y]) !== color) {
                                continue;
                            }

                            if (!visited.contains(next.$clone())) {
                                frontier.Enqueue(next.$clone());
                                visited.add(next.$clone());
                            }
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                }
            },
            IsInMap: function (map, next) {
                return next.X >= 0 && next.Y >= 0 && next.X < System.Array.getLength(map, 0) && next.Y < System.Array.getLength(map, 1);
            },
            GetNeighbors: function (current) {
                return new (Bridge.GeneratorEnumerable$1(Microsoft.Xna.Framework.Point))(Bridge.fn.bind(this, function (current) {
                    var $step = 0,
                        $jumpFromFinally,
                        $returnValue,
                        $async_e;

                    var $enumerator = new (Bridge.GeneratorEnumerator$1(Microsoft.Xna.Framework.Point))(Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                switch ($step) {
                                    case 0: {
                                        $enumerator.current = new Microsoft.Xna.Framework.Point.$ctor2(((current.X - 1) | 0), current.Y);
                                            $step = 1;
                                            return true;
                                    }
                                    case 1: {
                                        $enumerator.current = new Microsoft.Xna.Framework.Point.$ctor2(((current.X + 1) | 0), current.Y);
                                            $step = 2;
                                            return true;
                                    }
                                    case 2: {
                                        $enumerator.current = new Microsoft.Xna.Framework.Point.$ctor2(current.X, ((current.Y - 1) | 0));
                                            $step = 3;
                                            return true;
                                    }
                                    case 3: {
                                        $enumerator.current = new Microsoft.Xna.Framework.Point.$ctor2(current.X, ((current.Y + 1) | 0));
                                            $step = 4;
                                            return true;
                                    }
                                    case 4: {

                                    }
                                    default: {
                                        return false;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            throw $async_e;
                        }
                    }));
                    return $enumerator;
                }, arguments));
            }
        }
    });

    Bridge.define("FloodItBot.Base.AI.LineFloodItAI", {
        inherits: [FloodItBot.Base.AI.BaseFloodItAI],
        ctors: {
            ctor: function (turn, switcher) {
                this.$initialize();
                FloodItBot.Base.AI.BaseFloodItAI.ctor.call(this, turn, switcher);
            }
        },
        methods: {
            Act: function () {
                if (this.startX === 0 && this.startY === 0) {
                    for (var x = 0; x < System.Array.getLength(this.Context, 0); x = (x + 1) | 0) {
                        for (var y = 0; y < System.Array.getLength(this.Context, 1); y = (y + 1) | 0) {
                            if (!this.IsColorPossible(this.Context.get([x, y]))) {
                                continue;
                            }

                            return this.Context.get([x, y]);
                        }
                    }
                } else {
                    for (var x1 = (System.Array.getLength(this.Context, 0) - 1) | 0; x1 >= 0; x1 = (x1 - 1) | 0) {
                        for (var y1 = (System.Array.getLength(this.Context, 1) - 1) | 0; y1 >= 0; y1 = (y1 - 1) | 0) {
                            if (!this.IsColorPossible(this.Context.get([x1, y1]))) {
                                continue;
                            }

                            return this.Context.get([x1, y1]);
                        }
                    }
                }

                return this.Context.get([0, 0]);
            }
        }
    });

    Bridge.define("FloodItBot.Base.AI.RandomFloodItAI", {
        inherits: [FloodItBot.Base.AI.BaseFloodItAI],
        ctors: {
            ctor: function (turn, switcher) {
                this.$initialize();
                FloodItBot.Base.AI.BaseFloodItAI.ctor.call(this, turn, switcher);
            }
        },
        methods: {
            Act: function () {
                return MyONez.Maths.Random.NextInt(FloodItBot.Base.Screens.SharedData.ColorsCount);
            }
        }
    });
});

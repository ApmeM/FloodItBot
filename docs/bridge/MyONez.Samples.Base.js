/**
 * @version 1.0.0
 * @author ApmeM
 * @copyright Copyright ©  2019
 * @compiler Bridge.NET 17.6.0
 */
Bridge.assembly("MyONez.Samples.Base", function ($asm, globals) {
    "use strict";

    Bridge.define("MyONez.Samples.Base.AI.BaseFloodItAI", {
        inherits: [BrainAI.AI.FSM.State$1(System.Array.type(System.Int32, 2))],
        fields: {
            turn: null,
            startX: 0,
            startY: 0
        },
        ctors: {
            ctor: function (turn, startX, startY) {
                this.$initialize();
                BrainAI.AI.FSM.State$1(System.Array.type(System.Int32, 2)).ctor.call(this);
                this.turn = turn;
                this.startX = startX;
                this.startY = startY;
            }
        },
        methods: {
            Update: function () {
                if (this.turn.TurnMade) {
                    return;
                }

                var color = this.Act();

                if (this.Context.get([0, 0]) === color || this.Context.get([((System.Array.getLength(this.Context, 0) - 1) | 0), ((System.Array.getLength(this.Context, 1) - 1) | 0)]) === color || color < 0 || color >= MyONez.Samples.Base.Screens.BasicScene.ColorsCount) {
                    return;
                }

                this.turn.Color = color;
                this.turn.TurnMade = true;
            }
        }
    });

    Bridge.define("MyONez.Samples.Base.Components.CounterComponent", {
        inherits: [LocomotorECS.Component],
        fields: {
            Player1Size: 0,
            Player2Size: 0,
            Player1Wins: 0,
            Player2Wins: 0,
            GameOver: false,
            Player1Name: null,
            Player2Name: null
        }
    });

    Bridge.define("MyONez.Samples.Base.Components.FieldComponent", {
        inherits: [LocomotorECS.Component],
        fields: {
            Texture: null,
            Map: null,
            BlockSize: 0,
            BlockInterval: 0
        }
    });

    Bridge.define("MyONez.Samples.Base.Components.PlayerSwitcherComponent", {
        inherits: [LocomotorECS.Component],
        props: {
            Player2: null,
            Player1: null,
            Player: 0
        }
    });

    Bridge.define("MyONez.Samples.Base.Components.TurnMadeComponent", {
        inherits: [LocomotorECS.Component],
        fields: {
            Player: 0,
            Color: 0,
            TurnMade: false
        }
    });

    Bridge.define("MyONez.Samples.Base.ContentPaths", {
        statics: {
            fields: {
                content: null
            },
            ctors: {
                init: function () {
                    this.content = "Content";
                }
            }
        }
    });

    Bridge.define("MyONez.Samples.Base.ContentPaths.Basic", {
        $kind: "nested class",
        statics: {
            fields: {
                moon: null
            },
            ctors: {
                init: function () {
                    this.moon = "Basic/moon";
                }
            }
        }
    });

    Bridge.define("MyONez.Samples.Base.ContentPaths.SpriteLights", {
        $kind: "nested class",
        statics: {
            fields: {
                bg: null,
                moon: null,
                pixelspritelight: null,
                spritelight: null,
                tubelight: null
            },
            ctors: {
                init: function () {
                    this.bg = "SpriteLights/bg";
                    this.moon = "SpriteLights/moon";
                    this.pixelspritelight = "SpriteLights/pixel-sprite-light";
                    this.spritelight = "SpriteLights/sprite-light";
                    this.tubelight = "SpriteLights/tube-light";
                }
            }
        }
    });

    /** @namespace MyONez.Samples.Base */

    /**
     * This is the main type for your game.
     *
     * @public
     * @class MyONez.Samples.Base.Game1
     * @augments MyONez.Core
     */
    Bridge.define("MyONez.Samples.Base.Game1", {
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
                MyONez.Core.Instance.SwitchScene(new MyONez.Samples.Base.Screens.BasicScene());
            }
        }
    });

    Bridge.define("MyONez.Samples.Base.Screens.BasicScene", {
        inherits: [MyONez.ECS.Scene],
        statics: {
            fields: {
                BlockSize: 0,
                MapSize: 0,
                ColorsCount: 0
            },
            ctors: {
                init: function () {
                    this.BlockSize = 30;
                    this.MapSize = 19;
                    this.ColorsCount = 7;
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

                this.AddEntitySystem(new MyONez.Samples.Base.Systems.FieldMeshGeneratorSystem());
                this.AddEntitySystem(new MyONez.Samples.Base.Systems.FieldClickUpdateSystem(this));
                this.AddEntitySystem(new MyONez.Samples.Base.Systems.ApplyTurnUpdateSystem(this));
                this.AddEntitySystem(new MyONez.Samples.Base.Systems.CounterToTextUpdateSystem());
                this.AddEntitySystem(new MyONez.Samples.Base.Systems.GameOverUpdateSystem(this));
                this.AddEntitySystem(new GeonBit.UI.ECS.EntitySystems.TextUIUpdateSystem());
                this.AddEntitySystem(new BrainAI.ECS.EntitySystems.AIUpdateSystem());
                this.AddEntitySystem(new GeonBit.UI.ECS.EntitySystems.UIUpdateSystem(MyONez.Core.Instance.Content));
                this.AddEntitySystem(new MyONez.Samples.Base.Systems.TurnSelectorUpdateSystem());
                this.AddEntitySystem(new MyONez.Samples.Base.Systems.ColorSelectorGrayingUpdateSystem(this));

                this.AddEntitySystemExecutionOrder(BrainAI.ECS.EntitySystems.AIUpdateSystem, MyONez.Samples.Base.Systems.TurnSelectorUpdateSystem);
                this.AddEntitySystemExecutionOrder(MyONez.Samples.Base.Systems.FieldClickUpdateSystem, MyONez.Samples.Base.Systems.TurnSelectorUpdateSystem);
                this.AddEntitySystemExecutionOrder(MyONez.Samples.Base.Systems.TurnSelectorUpdateSystem, MyONez.Samples.Base.Systems.ApplyTurnUpdateSystem);
                this.AddEntitySystemExecutionOrder(MyONez.Samples.Base.Systems.ApplyTurnUpdateSystem, MyONez.Samples.Base.Systems.FieldMeshGeneratorSystem);
                this.AddEntitySystemExecutionOrder(MyONez.Samples.Base.Systems.ApplyTurnUpdateSystem, MyONez.Samples.Base.Systems.GameOverUpdateSystem);
                this.AddEntitySystemExecutionOrder(MyONez.Samples.Base.Systems.ApplyTurnUpdateSystem, MyONez.Samples.Base.Systems.CounterToTextUpdateSystem);
                this.AddEntitySystemExecutionOrder(MyONez.Samples.Base.Systems.ApplyTurnUpdateSystem, MyONez.Samples.Base.Systems.ColorSelectorGrayingUpdateSystem);
                this.AddEntitySystemExecutionOrder(MyONez.Samples.Base.Systems.ColorSelectorGrayingUpdateSystem, MyONez.Samples.Base.Systems.FieldMeshGeneratorSystem);
                this.AddEntitySystemExecutionOrder(MyONez.Samples.Base.Systems.CounterToTextUpdateSystem, MyONez.Samples.Base.Systems.GameOverUpdateSystem);
                this.AddEntitySystemExecutionOrder(MyONez.Samples.Base.Systems.CounterToTextUpdateSystem, GeonBit.UI.ECS.EntitySystems.TextUIUpdateSystem);
                this.AddEntitySystemExecutionOrder(GeonBit.UI.ECS.EntitySystems.UIUpdateSystem, GeonBit.UI.ECS.EntitySystems.TextUIUpdateSystem);

                var moonTex = this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, MyONez.Samples.Base.ContentPaths.Basic.moon);

                var common = this.CreateEntity("Common");
                common.AddComponent$1(MyONez.ECS.Components.CameraShakeComponent, new MyONez.ECS.Components.CameraShakeComponent(this.Camera));

                var fieldEntity = this.CreateEntity("Field");
                fieldEntity.AddComponent(MyONez.ECS.Components.PositionComponent).Position = new Microsoft.Xna.Framework.Vector2.$ctor2(285, 15);
                fieldEntity.AddComponent(MyONez.Samples.Base.Components.TurnMadeComponent);
                var field = fieldEntity.AddComponent(MyONez.Samples.Base.Components.FieldComponent);
                field.BlockSize = MyONez.Samples.Base.Screens.BasicScene.BlockSize;
                field.Map = System.Array.create(0, null, System.Int32, 19, 19);
                field.Texture = moonTex;

                var colorSelector = this.CreateEntity("ColorSelector");
                var colorSelectorPosition = colorSelector.AddComponent(MyONez.ECS.Components.PositionComponent);
                colorSelectorPosition.Position = new Microsoft.Xna.Framework.Vector2.$ctor2(1000, MyONez.Core.Instance.Screen.Center.Y - Bridge.Int.mul((70), MyONez.Samples.Base.Screens.BasicScene.ColorsCount) / 2.0);
                var colorSelectionField = colorSelector.AddComponent(MyONez.Samples.Base.Components.FieldComponent);
                colorSelectionField.Map = System.Array.create(0, null, System.Int32, 1, MyONez.Samples.Base.Screens.BasicScene.ColorsCount);
                colorSelectionField.Texture = moonTex;
                colorSelectionField.BlockSize = 60;
                colorSelectionField.BlockInterval = 10;

                var player1 = this.CreateEntity("Player1");
                var player1Turn = player1.AddComponent(MyONez.Samples.Base.Components.TurnMadeComponent);
                player1Turn.Player = 0;
                player1Turn.TurnMade = false;

                var player2 = this.CreateEntity("Player2");
                var player2Turn = player2.AddComponent(MyONez.Samples.Base.Components.TurnMadeComponent);
                player2Turn.Player = 1;
                player2Turn.TurnMade = true;

                fieldEntity.AddComponent$1(MyONez.Samples.Base.Components.PlayerSwitcherComponent, ($t = new MyONez.Samples.Base.Components.PlayerSwitcherComponent(), $t.Player1 = player1Turn, $t.Player2 = player2Turn, $t));

                var counterEntity = this.CreateEntity("Counter");
                var counter = counterEntity.AddComponent(MyONez.Samples.Base.Components.CounterComponent);
                counterEntity.AddComponent(GeonBit.UI.ECS.Components.TextComponent).Text = "Test text;";
                counterEntity.AddComponent(MyONez.ECS.Components.ColorComponent).Color = Microsoft.Xna.Framework.Color.Gray.$clone();

                var help = this.CreateEntity("Help");
                var ui = help.AddComponent(GeonBit.UI.ECS.Components.UIComponent);
                ui.UserInterface.ShowCursor = false;
                var panel = ui.UserInterface.AddEntity(new GeonBit.UI.Entities.Panel.$ctor1(new Microsoft.Xna.Framework.Vector2.$ctor2(250, 250), GeonBit.UI.Entities.PanelSkin.None, GeonBit.UI.Entities.Anchor.CenterLeft));
                panel.AddChild(($t = new GeonBit.UI.Entities.Button.$ctor1("Help"), $t.OnClick = function (b) {
                    player1.Enabled = false;
                    player2.Enabled = false;
                    GeonBit.UI.Utils.MessageBox.ShowMsgBox$1("Help", "Turn base flood it game.\n AIBot start in top left corner. \nYou start in bottom right corner. \nEach turn you select a color to flood your corner with by clicking on a colored cell on a field. \nIf any player reach size more then half of a field - game is over.", void 0, void 0, void 0, function () {
                        player1.Enabled = true;
                        player2.Enabled = true;
                    });
                }, $t));
                panel.AddChild(($t = new GeonBit.UI.Entities.Button.$ctor1("Restart"), $t.OnClick = Bridge.fn.bind(this, function (b) {
                    this.Restart(field, counter);
                }), $t));

                var player1Label = new GeonBit.UI.Entities.Label.$ctor1("Player 1");
                var player1DropDown = new GeonBit.UI.Entities.DropDown.ctor();
                player1DropDown.AddItem("User");
                player1DropDown.AddItem("Easy");
                player1DropDown.AddItem("Med.");
                player1DropDown.AddItem("Hard");
                player1DropDown.SelectedValue = "User";

                var colorsCountLabel = new GeonBit.UI.Entities.Label.$ctor1("Colors count");
                var colorsCountDropDown = new GeonBit.UI.Entities.DropDown.ctor();
                colorsCountDropDown.AddItem("4");
                colorsCountDropDown.AddItem("5");
                colorsCountDropDown.AddItem("6");
                colorsCountDropDown.AddItem("7");
                colorsCountDropDown.SelectedValue = "5";

                var player2Label = new GeonBit.UI.Entities.Label.$ctor1("Player 1");
                var player2DropDown = new GeonBit.UI.Entities.DropDown.ctor();
                player2DropDown.AddItem("User");
                player2DropDown.AddItem("Easy");
                player2DropDown.AddItem("Med.");
                player2DropDown.AddItem("Hard");
                player2DropDown.SelectedValue = "Hard";
                var messageBox = GeonBit.UI.Utils.MessageBox.ShowMsgBox$1("Settings", "", "Set", void 0, System.Array.init([player1Label, player1DropDown, player2Label, player2DropDown, colorsCountLabel, colorsCountDropDown], GeonBit.UI.Entities.Entity), Bridge.fn.bind(this, function () {
                    player1.Enabled = true;
                    player2.Enabled = true;
                    counter.Player1Name = player1DropDown.SelectedValue;
                    counter.Player2Name = player2DropDown.SelectedValue;
                    MyONez.Samples.Base.Screens.BasicScene.ColorsCount = System.Int32.parse(colorsCountDropDown.SelectedValue);
                    colorSelectionField.Map = System.Array.create(0, null, System.Int32, 1, MyONez.Samples.Base.Screens.BasicScene.ColorsCount);
                    colorSelectorPosition.Position = new Microsoft.Xna.Framework.Vector2.$ctor2(1000, MyONez.Core.Instance.Screen.Center.Y - Bridge.Int.mul((70), MyONez.Samples.Base.Screens.BasicScene.ColorsCount) / 2.0);
                    this.InitPlayer(0, player1, player1Turn, player1DropDown.SelectedValue, field.Map);
                    this.InitPlayer(1, player2, player2Turn, player2DropDown.SelectedValue, field.Map);
                    this.Restart(field, counter);
                }));
                messageBox.Close();
                panel.AddChild(($t = new GeonBit.UI.Entities.Button.$ctor1("Settings"), $t.OnClick = function (b) {
                    player1.Enabled = false;
                    player2.Enabled = false;
                    ui.UserInterface.AddEntity(messageBox.Panel);
                }, $t));

                counter.Player1Name = player1DropDown.SelectedValue;
                counter.Player2Name = player2DropDown.SelectedValue;
                this.InitPlayer(0, player1, player1Turn, player1DropDown.SelectedValue, field.Map);
                this.InitPlayer(1, player2, player2Turn, player2DropDown.SelectedValue, field.Map);
                this.Restart(field, counter);
            }
        },
        methods: {
            InitPlayer: function (playerId, player, playerTurn, selectedValue, fieldMap) {
                var pos = (playerId === 0) ? 0 : 18;

                player.RemoveComponent$1(BrainAI.ECS.Components.AIComponent);
                player.RemoveComponent$1(MyONez.ECS.Components.InputMouseComponent);
                player.RemoveComponent$1(MyONez.ECS.Components.InputTouchComponent);
                switch (selectedValue) {
                    case "User": 
                        player.AddComponent(MyONez.ECS.Components.InputMouseComponent);
                        player.AddComponent(MyONez.ECS.Components.InputTouchComponent);
                        break;
                    case "Easy": 
                        player.AddComponent(BrainAI.ECS.Components.AIComponent).AIBot = new (BrainAI.AI.FSM.StateMachine$1(System.Array.type(System.Int32, 2)))(fieldMap, new MyONez.Samples.Base.AI.RandomFloodItAI(playerTurn, pos, pos));
                        break;
                    case "Med.": 
                        player.AddComponent(BrainAI.ECS.Components.AIComponent).AIBot = new (BrainAI.AI.FSM.StateMachine$1(System.Array.type(System.Int32, 2)))(fieldMap, new MyONez.Samples.Base.AI.LineFloodItAI(playerTurn, pos, pos));
                        break;
                    case "Hard": 
                        player.AddComponent(BrainAI.ECS.Components.AIComponent).AIBot = new (BrainAI.AI.FSM.StateMachine$1(System.Array.type(System.Int32, 2)))(fieldMap, new MyONez.Samples.Base.AI.GreedyFloodItAI(playerTurn, pos, pos));
                        break;
                }
            },
            Restart: function (field, counter) {
                for (var x = 0; x < System.Array.getLength(field.Map, 0); x = (x + 1) | 0) {
                    for (var y = 0; y < System.Array.getLength(field.Map, 1); y = (y + 1) | 0) {
                        field.Map.set([x, y], MyONez.Maths.Random.NextInt(MyONez.Samples.Base.Screens.BasicScene.ColorsCount));
                    }
                }

                counter.GameOver = false;
                counter.Player1Size = 1;
                counter.Player2Size = 1;
            }
        }
    });

    Bridge.define("MyONez.Samples.Base.Systems.ApplyTurnUpdateSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        fields: {
            scene: null
        },
        ctors: {
            ctor: function (scene) {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([MyONez.Samples.Base.Components.FieldComponent, MyONez.Samples.Base.Components.TurnMadeComponent]));
                this.scene = scene;
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var map = entity.GetComponent(MyONez.Samples.Base.Components.FieldComponent);
                var turn = entity.GetComponent(MyONez.Samples.Base.Components.TurnMadeComponent);

                var color = turn.Color;

                if (color === map.Map.get([0, 0]) || color === map.Map.get([((System.Array.getLength(map.Map, 0) - 1) | 0), ((System.Array.getLength(map.Map, 1) - 1) | 0)])) {
                    return;
                }

                var counterEntity = this.scene.FindEntity("Counter");
                var counter = counterEntity.GetComponent(MyONez.Samples.Base.Components.CounterComponent);

                if (turn.Player === 0) {
                    this.FloodIt(map.Map, color, 0, 0);
                    counter.Player1Size = this.Calc(map.Map, 0, 0);
                } else {
                    this.FloodIt(map.Map, color, ((System.Array.getLength(map.Map, 0) - 1) | 0), ((System.Array.getLength(map.Map, 1) - 1) | 0));
                    counter.Player2Size = this.Calc(map.Map, ((System.Array.getLength(map.Map, 0) - 1) | 0), ((System.Array.getLength(map.Map, 1) - 1) | 0));
                }
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

    Bridge.define("MyONez.Samples.Base.Systems.ColorSelectorGrayingUpdateSystem", {
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
                var colorSelectorMap = colorSelector.GetComponent(MyONez.Samples.Base.Components.FieldComponent).Map;

                var field = this.scene.FindEntity("Field");
                var fieldMap = field.GetComponent(MyONez.Samples.Base.Components.FieldComponent).Map;

                for (var i = 0; i < System.Array.getLength(colorSelectorMap, 1); i = (i + 1) | 0) {
                    colorSelectorMap.set([0, i], i);
                }

                colorSelectorMap.set([0, fieldMap.get([0, 0])], -1);
                colorSelectorMap.set([0, fieldMap.get([((System.Array.getLength(fieldMap, 0) - 1) | 0), ((System.Array.getLength(fieldMap, 1) - 1) | 0)])], -1);
            }
        }
    });

    Bridge.define("MyONez.Samples.Base.Systems.CounterToTextUpdateSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        ctors: {
            ctor: function () {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([GeonBit.UI.ECS.Components.TextComponent, MyONez.Samples.Base.Components.CounterComponent]));
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var text = entity.GetComponent(GeonBit.UI.ECS.Components.TextComponent);
                var counter = entity.GetComponent(MyONez.Samples.Base.Components.CounterComponent);

                text.Text = System.String.format("\r\nStatistic: \r\n     | {0,5} | {1,5}\r\nSize | {2,5} | {3,5}\r\nWins | {4,5} | {5,5}", counter.Player1Name, counter.Player2Name, Bridge.box(counter.Player1Size, System.Int32), Bridge.box(counter.Player2Size, System.Int32), Bridge.box(counter.Player1Wins, System.Int32), Bridge.box(counter.Player2Wins, System.Int32));
            }
        }
    });

    Bridge.define("MyONez.Samples.Base.Systems.FieldClickUpdateSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        fields: {
            scene: null
        },
        ctors: {
            ctor: function (scene) {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([MyONez.Samples.Base.Components.TurnMadeComponent, MyONez.ECS.Components.InputMouseComponent]));
                this.scene = scene;
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var turn = entity.GetComponent(MyONez.Samples.Base.Components.TurnMadeComponent);
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
                var field = fieldEntity.GetComponent(MyONez.Samples.Base.Components.FieldComponent);
                if (this.TryMakeTurn(field.Map, fieldEntity, cursorPosition.$clone(), turn)) {
                    return;
                }

                fieldEntity = this.scene.FindEntity("ColorSelector");
                this.TryMakeTurn(field.Map, fieldEntity, cursorPosition.$clone(), turn);
            },
            TryMakeTurn: function (fieldMap, fieldEntity, cursorPosition, turn) {
                var position = fieldEntity.GetComponent(MyONez.ECS.Components.PositionComponent);
                var field = fieldEntity.GetComponent(MyONez.Samples.Base.Components.FieldComponent);
                var map = field.Map;

                var location = Microsoft.Xna.Framework.Vector2.op_Division$1((Microsoft.Xna.Framework.Vector2.op_Subtraction(cursorPosition.$clone(), position.Position.$clone())), (((field.BlockSize + field.BlockInterval) | 0)));
                var x = Bridge.Int.clip32(location.X);
                var y = Bridge.Int.clip32(location.Y);

                if (!this.IsInMap(map, x, y)) {
                    return false;
                }

                if (fieldMap.get([0, 0]) === map.get([x, y]) || fieldMap.get([((System.Array.getLength(fieldMap, 0) - 1) | 0), ((System.Array.getLength(fieldMap, 1) - 1) | 0)]) === map.get([x, y]) || map.get([x, y]) === -1) {
                    var common = this.scene.FindEntity("Common");
                    common.GetComponent(MyONez.ECS.Components.CameraShakeComponent).Shake();
                    return true;
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

    Bridge.define("MyONez.Samples.Base.Systems.FieldMeshGeneratorSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        ctors: {
            ctor: function () {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([MyONez.Samples.Base.Components.FieldComponent]));
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                var $t, $t1, $t2, $t3, $t4;
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var field = entity.GetComponent(MyONez.Samples.Base.Components.FieldComponent);
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

    Bridge.define("MyONez.Samples.Base.Systems.GameOverUpdateSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        fields: {
            scene: null
        },
        ctors: {
            ctor: function (scene) {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([MyONez.Samples.Base.Components.CounterComponent]));
                this.scene = scene;
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var counter = entity.GetComponent(MyONez.Samples.Base.Components.CounterComponent);

                if (counter.GameOver) {
                    return;
                }

                var field = this.scene.FindEntity("Field").GetComponent(MyONez.Samples.Base.Components.FieldComponent);
                if (counter.Player1Size > 180 || counter.Player2Size > 180) {
                    this.GameOver(counter, field);
                }
            },
            GameOver: function (counter, field) {
                var $t;
                if (counter.Player1Size > counter.Player2Size) {
                    counter.Player1Wins = (counter.Player1Wins + 1) | 0;
                }

                if (counter.Player1Size < counter.Player2Size) {
                    counter.Player2Wins = (counter.Player2Wins + 1) | 0;
                }

                counter.GameOver = true;
                MyONez.Core.Instance.SwitchScene$2(($t = new MyONez.AdditionalContent.SceneTransitions.WindTransition(), $t.SceneLoadAction = Bridge.fn.bind(this, function () {
                    this.scene.Restart(field, counter);
                    return this.scene;
                }), $t));
            }
        }
    });

    Bridge.define("MyONez.Samples.Base.Systems.TurnSelectorUpdateSystem", {
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
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([MyONez.Samples.Base.Components.TurnMadeComponent, MyONez.Samples.Base.Components.PlayerSwitcherComponent]));
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                this.elapsed = System.TimeSpan.add(this.elapsed, gameTime);
                if (this.elapsed.getTotalSeconds() < 0.5) {
                    return;
                }


                var turn = entity.GetComponent(MyONez.Samples.Base.Components.TurnMadeComponent);
                var switcher = entity.GetComponent(MyONez.Samples.Base.Components.PlayerSwitcherComponent);

                var player;
                var playerStart;
                if (switcher.Player === switcher.Player1.Player) {
                    player = switcher.Player1;
                    playerStart = switcher.Player2;
                } else {
                    player = switcher.Player2;
                    playerStart = switcher.Player1;
                }

                if (!player.TurnMade) {
                    return;
                }

                this.elapsed = System.TimeSpan.zero;

                turn.Color = player.Color;
                turn.Player = player.Player;
                switcher.Player = (1 - switcher.Player) | 0;
                playerStart.TurnMade = false;
            }
        }
    });

    /** @namespace MyONez.Samples.Base.AI */

    /**
     * Statistic 90%
     *
     * @public
     * @class MyONez.Samples.Base.AI.GreedyFloodItAI
     * @augments MyONez.Samples.Base.AI.BaseFloodItAI
     */
    Bridge.define("MyONez.Samples.Base.AI.GreedyFloodItAI", {
        inherits: [MyONez.Samples.Base.AI.BaseFloodItAI],
        fields: {
            copyArray: null
        },
        ctors: {
            ctor: function (turn, startX, startY) {
                this.$initialize();
                MyONez.Samples.Base.AI.BaseFloodItAI.ctor.call(this, turn, startX, startY);
            }
        },
        methods: {
            Act: function () {
                var maxValue = 0;
                var maxColor = 0;

                for (var i = 0; i < MyONez.Samples.Base.Screens.BasicScene.ColorsCount; i = (i + 1) | 0) {
                    if (this.Context.get([0, 0]) === i || this.Context.get([((System.Array.getLength(this.Context, 0) - 1) | 0), ((System.Array.getLength(this.Context, 1) - 1) | 0)]) === i) {
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

    Bridge.define("MyONez.Samples.Base.AI.LineFloodItAI", {
        inherits: [MyONez.Samples.Base.AI.BaseFloodItAI],
        ctors: {
            ctor: function (turn, startX, startY) {
                this.$initialize();
                MyONez.Samples.Base.AI.BaseFloodItAI.ctor.call(this, turn, startX, startY);
            }
        },
        methods: {
            Act: function () {
                if (this.startX === 0 && this.startY === 0) {
                    for (var x = 0; x < System.Array.getLength(this.Context, 0); x = (x + 1) | 0) {
                        for (var y = 0; y < System.Array.getLength(this.Context, 1); y = (y + 1) | 0) {
                            if (this.Context.get([0, 0]) === this.Context.get([x, y]) || this.Context.get([((System.Array.getLength(this.Context, 0) - 1) | 0), ((System.Array.getLength(this.Context, 1) - 1) | 0)]) === this.Context.get([x, y])) {
                                continue;
                            }

                            return this.Context.get([x, y]);
                        }
                    }
                } else {
                    for (var x1 = (System.Array.getLength(this.Context, 0) - 1) | 0; x1 >= 0; x1 = (x1 - 1) | 0) {
                        for (var y1 = (System.Array.getLength(this.Context, 1) - 1) | 0; y1 >= 0; y1 = (y1 - 1) | 0) {
                            if (this.Context.get([0, 0]) === this.Context.get([x1, y1]) || this.Context.get([((System.Array.getLength(this.Context, 0) - 1) | 0), ((System.Array.getLength(this.Context, 1) - 1) | 0)]) === this.Context.get([x1, y1])) {
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

    Bridge.define("MyONez.Samples.Base.AI.RandomFloodItAI", {
        inherits: [MyONez.Samples.Base.AI.BaseFloodItAI],
        ctors: {
            ctor: function (turn, startX, startY) {
                this.$initialize();
                MyONez.Samples.Base.AI.BaseFloodItAI.ctor.call(this, turn, startX, startY);
            }
        },
        methods: {
            Act: function () {
                return MyONez.Maths.Random.NextInt(MyONez.Samples.Base.Screens.BasicScene.ColorsCount);
            }
        }
    });
});
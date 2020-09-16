/**
 * @version 1.0.0
 * @author ApmeM
 * @copyright Copyright ©  2019
 * @compiler Bridge.NET 17.6.0
 */
Bridge.assembly("MyONez.Samples.Base", function ($asm, globals) {
    "use strict";

    /** @namespace MyONez.Samples.Base.AI */

    /**
     * Statistic 90%
     *
     * @public
     * @class MyONez.Samples.Base.AI.GreedyFloodItAI
     * @augments BrainAI.AI.FSM.State$1
     */
    Bridge.define("MyONez.Samples.Base.AI.GreedyFloodItAI", {
        inherits: [BrainAI.AI.FSM.State$1(System.Array.type(System.Int32, 2))],
        fields: {
            turn: null,
            delay: 0,
            copyArray: null
        },
        ctors: {
            ctor: function (turn) {
                this.$initialize();
                BrainAI.AI.FSM.State$1(System.Array.type(System.Int32, 2)).ctor.call(this);
                this.turn = turn;
            }
        },
        methods: {
            Update: function () {
                this.delay = (this.delay + 1) | 0;
                if (this.delay < MyONez.Samples.Base.Screens.BasicScene.GameSpeed) {
                    return;
                }

                var maxValue = 0;
                var maxColor = 0;

                for (var i = 0; i < 5; i = (i + 1) | 0) {
                    this.copyArray = this.copyArray || System.Array.create(0, null, System.Int32, System.Array.getLength(this.Context, 0), System.Array.getLength(this.Context, 1));
                    System.Array.copy(this.Context, 0, this.copyArray, 0, this.Context.length);
                    this.FloodIt(this.copyArray, i);
                    var value = this.Calc(this.copyArray);
                    if (maxValue < value) {
                        maxValue = value;
                        maxColor = i;
                    }
                }

                this.delay = 0;
                for (var x = 0; x < System.Array.getLength(this.Context, 0); x = (x + 1) | 0) {
                    for (var y = 0; y < System.Array.getLength(this.Context, 1); y = (y + 1) | 0) {
                        if (maxColor !== this.Context.get([x, y])) {
                            continue;
                        }

                        this.turn.X = x;
                        this.turn.Y = y;
                        return;
                    }
                }
            },
            Calc: function (map) {
                var $t;
                var color = map.get([0, 0]);

                var result = 0;

                var frontier = new (System.Collections.Generic.Queue$1(Microsoft.Xna.Framework.Point)).ctor();
                frontier.Enqueue(new Microsoft.Xna.Framework.Point.$ctor2(0, 0));

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
                var color = map.get([0, 0]);

                var frontier = new (System.Collections.Generic.Queue$1(Microsoft.Xna.Framework.Point)).ctor();
                frontier.Enqueue(new Microsoft.Xna.Framework.Point.$ctor2(0, 0));

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

    /**
     * Statistic 22%
     *
     * @public
     * @class MyONez.Samples.Base.AI.LineFloodItAI
     * @augments BrainAI.AI.FSM.State$1
     */
    Bridge.define("MyONez.Samples.Base.AI.LineFloodItAI", {
        inherits: [BrainAI.AI.FSM.State$1(System.Array.type(System.Int32, 2))],
        fields: {
            turn: null,
            delay: 0
        },
        ctors: {
            ctor: function (turn) {
                this.$initialize();
                BrainAI.AI.FSM.State$1(System.Array.type(System.Int32, 2)).ctor.call(this);
                this.turn = turn;
            }
        },
        methods: {
            Update: function () {
                this.delay = (this.delay + 1) | 0;
                if (this.delay < MyONez.Samples.Base.Screens.BasicScene.GameSpeed) {
                    return;
                }

                this.delay = 0;
                var color = this.Context.get([0, 0]);
                for (var x = 0; x < System.Array.getLength(this.Context, 0); x = (x + 1) | 0) {
                    for (var y = 0; y < System.Array.getLength(this.Context, 1); y = (y + 1) | 0) {
                        if (color === this.Context.get([x, y])) {
                            continue;
                        }

                        this.turn.X = x;
                        this.turn.Y = y;
                        return;
                    }
                }
            }
        }
    });

    /**
     * Statistic 0%
     *
     * @public
     * @class MyONez.Samples.Base.AI.RandomFloodItAI
     * @augments BrainAI.AI.FSM.State$1
     */
    Bridge.define("MyONez.Samples.Base.AI.RandomFloodItAI", {
        inherits: [BrainAI.AI.FSM.State$1(System.Array.type(System.Int32, 2))],
        fields: {
            turn: null,
            delay: 0
        },
        ctors: {
            ctor: function (turn) {
                this.$initialize();
                BrainAI.AI.FSM.State$1(System.Array.type(System.Int32, 2)).ctor.call(this);
                this.turn = turn;
            }
        },
        methods: {
            Update: function () {
                this.delay = (this.delay + 1) | 0;
                if (this.delay < MyONez.Samples.Base.Screens.BasicScene.GameSpeed) {
                    return;
                }

                this.delay = 0;
                var color = this.Context.get([0, 0]);

                this.turn.X = MyONez.Maths.Random.NextInt(System.Array.getLength(this.Context, 0));
                this.turn.Y = MyONez.Maths.Random.NextInt(System.Array.getLength(this.Context, 1));

                if (color === this.Context.get([this.turn.X, this.turn.Y])) {
                    this.delay = 1000;
                }
            }
        }
    });

    Bridge.define("MyONez.Samples.Base.Components.CounterComponent", {
        inherits: [LocomotorECS.Component],
        props: {
            Count: 0,
            StatisticWins: 0,
            StatisticCount: 0,
            GameOver: false
        }
    });

    Bridge.define("MyONez.Samples.Base.Components.FieldComponent", {
        inherits: [LocomotorECS.Component],
        fields: {
            Texture: null,
            ColorCount: 0,
            Map: null
        },
        ctors: {
            init: function () {
                this.ColorCount = 5;
            }
        }
    });

    Bridge.define("MyONez.Samples.Base.Components.TurnMadeComponent", {
        inherits: [LocomotorECS.Component],
        fields: {
            X: 0,
            Y: 0
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
                this.IsMouseVisible = false;
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
                GameSpeed: 0,
                MapSize: 0,
                AvailableTurns: 0
            },
            ctors: {
                init: function () {
                    this.BlockSize = 20;
                    this.GameSpeed = 5;
                    this.MapSize = 30;
                    this.AvailableTurns = 49;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                MyONez.ECS.Scene.ctor.call(this);
                this.SetDesignResolution(720, 720, MyONez.Graphics.ResolutionPolicy.SceneResolutionPolicy.None);
                MyONez.Core.Instance.Screen.SetSize(720, 720);

                this.AddRenderer(MyONez.Graphics.Renderers.DefaultRenderer, new MyONez.Graphics.Renderers.DefaultRenderer());

                this.AddEntitySystem(new MyONez.Samples.Base.Systems.FieldMeshGeneratorSystem());
                this.AddEntitySystem(new MyONez.Samples.Base.Systems.FieldClickUpdateSystem());
                this.AddEntitySystem(new MyONez.Samples.Base.Systems.ApplyTurnUpdateSystem(this));
                this.AddEntitySystem(new MyONez.Samples.Base.Systems.CounterToTextUpdateSystem());
                this.AddEntitySystem(new MyONez.Samples.Base.Systems.GameOverUpdateSystem(this));
                this.AddEntitySystem(new GeonBit.UI.ECS.EntitySystems.TextUIUpdateSystem());
                this.AddEntitySystem(new BrainAI.ECS.EntitySystems.AIUpdateSystem());
                this.AddEntitySystem(new GeonBit.UI.ECS.EntitySystems.UIUpdateSystem(MyONez.Core.Instance.Content));

                this.AddEntitySystemExecutionOrder(BrainAI.ECS.EntitySystems.AIUpdateSystem, MyONez.Samples.Base.Systems.ApplyTurnUpdateSystem);
                this.AddEntitySystemExecutionOrder(MyONez.Samples.Base.Systems.FieldClickUpdateSystem, MyONez.Samples.Base.Systems.ApplyTurnUpdateSystem);
                this.AddEntitySystemExecutionOrder(MyONez.Samples.Base.Systems.ApplyTurnUpdateSystem, MyONez.Samples.Base.Systems.FieldMeshGeneratorSystem);
                this.AddEntitySystemExecutionOrder(MyONez.Samples.Base.Systems.ApplyTurnUpdateSystem, MyONez.Samples.Base.Systems.GameOverUpdateSystem);
                this.AddEntitySystemExecutionOrder(MyONez.Samples.Base.Systems.ApplyTurnUpdateSystem, MyONez.Samples.Base.Systems.CounterToTextUpdateSystem);
                this.AddEntitySystemExecutionOrder(MyONez.Samples.Base.Systems.CounterToTextUpdateSystem, MyONez.Samples.Base.Systems.GameOverUpdateSystem);
                this.AddEntitySystemExecutionOrder(MyONez.Samples.Base.Systems.CounterToTextUpdateSystem, GeonBit.UI.ECS.EntitySystems.TextUIUpdateSystem);
                this.AddEntitySystemExecutionOrder(GeonBit.UI.ECS.EntitySystems.UIUpdateSystem, GeonBit.UI.ECS.EntitySystems.TextUIUpdateSystem);

                var moonTex = this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, MyONez.Samples.Base.ContentPaths.Basic.moon);

                var fieldEntity = this.CreateEntity("Field");
                fieldEntity.AddComponent(MyONez.ECS.Components.PositionComponent).Position = Microsoft.Xna.Framework.Vector2.op_Subtraction(MyONez.Core.Instance.Screen.Center.$clone(), Microsoft.Xna.Framework.Vector2.op_Division$1(Microsoft.Xna.Framework.Vector2.op_Multiply$1(Microsoft.Xna.Framework.Vector2.op_Multiply$1(Microsoft.Xna.Framework.Vector2.One.$clone(), MyONez.Samples.Base.Screens.BasicScene.MapSize), MyONez.Samples.Base.Screens.BasicScene.BlockSize), 2));
                fieldEntity.AddComponent(MyONez.ECS.Components.InputMouseComponent);
                var turn = fieldEntity.AddComponent(MyONez.Samples.Base.Components.TurnMadeComponent);
                var field = fieldEntity.AddComponent(MyONez.Samples.Base.Components.FieldComponent);
                field.Map = System.Array.create(0, null, System.Int32, 30, 30);
                field.Texture = moonTex;
                fieldEntity.AddComponent(BrainAI.ECS.Components.AIComponent).AIBot = new (BrainAI.AI.FSM.StateMachine$1(System.Array.type(System.Int32, 2)))(field.Map, new MyONez.Samples.Base.AI.GreedyFloodItAI(turn));

                var counterEntity = this.CreateEntity("Counter");
                var counter = counterEntity.AddComponent(MyONez.Samples.Base.Components.CounterComponent);
                counterEntity.AddComponent(GeonBit.UI.ECS.Components.TextComponent).Text = "Test text;";
                counterEntity.AddComponent(MyONez.ECS.Components.ColorComponent).Color = Microsoft.Xna.Framework.Color.Gray.$clone();

                this.Restart(field, counter);
            }
        },
        methods: {
            Restart: function (field, counter) {
                for (var x = 0; x < System.Array.getLength(field.Map, 0); x = (x + 1) | 0) {
                    for (var y = 0; y < System.Array.getLength(field.Map, 1); y = (y + 1) | 0) {
                        field.Map.set([x, y], MyONez.Maths.Random.NextInt(field.ColorCount));
                    }
                }

                counter.GameOver = false;
                counter.Count = 0;
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
                var position = entity.GetComponent(MyONez.Samples.Base.Components.TurnMadeComponent);

                var x = position.X;
                var y = position.Y;
                if (x < 0 || y < 0 || x > System.Array.getLength(map.Map, 0) || y > System.Array.getLength(map.Map, 1)) {
                    return;
                }

                var color = map.Map.get([x, y]);

                if (color === map.Map.get([0, 0])) {
                    return;
                }

                var counterEntity = this.scene.FindEntity("Counter");
                var counter = counterEntity.GetComponent(MyONez.Samples.Base.Components.CounterComponent);
                counter.Count = (counter.Count + 1) | 0;

                this.FloodIt(map.Map, color);
            },
            FloodIt: function (map, floodColor) {
                var $t;
                var color = map.get([0, 0]);

                var frontier = new (System.Collections.Generic.Queue$1(Microsoft.Xna.Framework.Point)).ctor();
                frontier.Enqueue(new Microsoft.Xna.Framework.Point.$ctor2(0, 0));

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

                text.Text = System.String.format("Moves: {0}. \n Wins: {1} / {2} = {3}", Bridge.box(((MyONez.Samples.Base.Screens.BasicScene.AvailableTurns - counter.Count) | 0), System.Int32), Bridge.box(counter.StatisticWins, System.Int32), Bridge.box(counter.StatisticCount, System.Int32), Bridge.box(((Bridge.Int.div(Bridge.Int.mul(counter.StatisticWins, 100), Math.max(1, counter.StatisticCount))) | 0), System.Int32));
            }
        }
    });

    Bridge.define("MyONez.Samples.Base.Systems.FieldClickUpdateSystem", {
        inherits: [LocomotorECS.EntityProcessingSystem],
        ctors: {
            ctor: function () {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([MyONez.Samples.Base.Components.TurnMadeComponent, MyONez.ECS.Components.InputMouseComponent]));
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var turn = entity.GetComponent(MyONez.Samples.Base.Components.TurnMadeComponent);
                var input = entity.GetComponent(MyONez.ECS.Components.InputMouseComponent);
                var position = entity.GetComponent(MyONez.ECS.Components.PositionComponent);

                if (!input.LeftMouseButtonPressed) {
                    return;
                }

                var location = Microsoft.Xna.Framework.Vector2.op_Division$1((Microsoft.Xna.Framework.Vector2.op_Subtraction(input.MousePosition.$clone(), position.Position.$clone())), MyONez.Samples.Base.Screens.BasicScene.BlockSize);
                turn.X = Bridge.Int.clip32(location.X);
                turn.Y = Bridge.Int.clip32(location.Y);
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
                var map = entity.GetComponent(MyONez.Samples.Base.Components.FieldComponent);
                var finalRender = entity.GetOrCreateComponent(MyONez.ECS.Components.FinalRenderComponent);
                var effect = ($t = (($t1 = entity.GetComponent(MyONez.ECS.Components.SpriteEffectsComponent)) != null ? $t1.SpriteEffects : null), $t != null ? $t : Microsoft.Xna.Framework.Graphics.SpriteEffects.None);
                var depth = ($t2 = (($t3 = entity.GetComponent(MyONez.ECS.Components.DepthLayerComponent)) != null ? $t3.Depth : null), $t2 != null ? $t2 : 0);

                if (finalRender.Batch.Meshes.Count !== Bridge.Int.mul(System.Array.getLength(map.Map, 0), System.Array.getLength(map.Map, 1))) {
                    finalRender.Batch.Clear();

                    var texture = map.Texture;

                    for (var x = 0; x < System.Array.getLength(map.Map, 0); x = (x + 1) | 0) {
                        for (var y = 0; y < System.Array.getLength(map.Map, 1); y = (y + 1) | 0) {
                            finalRender.Batch.Draw(texture, new MyONez.Maths.RectangleF.$ctor2(Bridge.Int.mul(x, MyONez.Samples.Base.Screens.BasicScene.BlockSize), Bridge.Int.mul(y, MyONez.Samples.Base.Screens.BasicScene.BlockSize), MyONez.Samples.Base.Screens.BasicScene.BlockSize, MyONez.Samples.Base.Screens.BasicScene.BlockSize), MyONez.Maths.RectangleF.op_Implicit$1(texture.Bounds.$clone()), this.ConvertMapToColor(map.Map.get([x, y])), depth);
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
                    for (var x1 = 0; x1 < System.Array.getLength(map.Map, 0); x1 = (x1 + 1) | 0) {
                        for (var y1 = 0; y1 < System.Array.getLength(map.Map, 1); y1 = (y1 + 1) | 0) {
                            finalRender.Batch.Meshes.getItem(((Bridge.Int.mul(x1, System.Array.getLength(map.Map, 1)) + y1) | 0)).SetColor(this.ConvertMapToColor(map.Map.get([x1, y1])));
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
                        return Microsoft.Xna.Framework.Color.Purple.$clone();
                }

                return Microsoft.Xna.Framework.Color.Black.$clone();
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
                if (counter.Count === MyONez.Samples.Base.Screens.BasicScene.AvailableTurns) {
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
                    counter.StatisticWins = (counter.StatisticWins + 1) | 0;
                }
                counter.StatisticCount = (counter.StatisticCount + 1) | 0;
                counter.GameOver = true;
                MyONez.Core.Instance.SwitchScene$2(($t = new MyONez.AdditionalContent.SceneTransitions.WindTransition(), $t.SceneLoadAction = Bridge.fn.bind(this, function () {
                    this.scene.Restart(field, counter);
                    return this.scene;
                }), $t));
            }
        }
    });
});

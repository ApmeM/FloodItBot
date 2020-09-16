﻿namespace MyONez.Samples.Base.Systems
{
    using System;

    using LocomotorECS;
    using LocomotorECS.Matching;

    using MyONez.ECS;
    using MyONez.ECS.Components;
    using MyONez.Samples.Base.Components;
    using MyONez.Samples.Base.Screens;

    public class FieldClickUpdateSystem : EntityProcessingSystem
    {
        private readonly Scene scene;

        public FieldClickUpdateSystem(Scene scene)
            : base(new Matcher().All(typeof(TurnMadeComponent), typeof(InputMouseComponent)))
        {
            this.scene = scene;
        }

        protected override void DoAction(Entity entity, TimeSpan gameTime)
        {
            base.DoAction(entity, gameTime);
            var turn = entity.GetComponent<TurnMadeComponent>();
            var input = entity.GetComponent<InputMouseComponent>();

            if (!input.LeftMouseButtonPressed)
            {
                return;
            }

            if (turn.TurnMade)
            {
                return;
            }

            var field = this.scene.FindEntity("Field");
            var position = field.GetComponent<PositionComponent>();
            var map = field.GetComponent<FieldComponent>().Map;

            var location = (input.MousePosition - position.Position) / BasicScene.BlockSize;
            turn.X = (int)location.X;
            turn.Y = (int)location.Y;

            if (!IsInMap(map, turn))
            {
                return;
            }

            if (map[0, 0] == map[turn.X, turn.Y] || map[map.GetLength(0) - 1, map.GetLength(1) - 1] == map[turn.X, turn.Y])
            {
                field.GetComponent<CameraShakeComponent>().Shake();
                return;
            }

            turn.TurnMade = true;
        }


        private bool IsInMap(int[,] map, TurnMadeComponent next)
        {
            return next.X >= 0 && next.Y >= 0 && next.X < map.GetLength(0) && next.Y < map.GetLength(1);
        }

    }
}
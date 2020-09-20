namespace MyONez.Samples.Base.Systems
{
    using System;
    using System.Linq;

    using LocomotorECS;
    using LocomotorECS.Matching;

    using Microsoft.Xna.Framework;

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
            var inputMouse = entity.GetComponent<InputMouseComponent>();
            var inputTouch = entity.GetComponent<InputTouchComponent>();

            if (!inputMouse.LeftMouseButtonPressed && (!inputTouch.IsConnected || !inputTouch.CurrentTouches.Any()))
            {
                return;
            }

            if (turn.TurnMade)
            {
                return;
            }

            var cursorPosition = (inputTouch.IsConnected && inputTouch.CurrentTouches.Any()) ? inputTouch.CurrentTouches.First().Position : inputMouse.MousePosition;

            var fieldEntity = this.scene.FindEntity("Field");
            var field = fieldEntity.GetComponent<FieldComponent>();
            if (this.TryMakeTurn(field.Map, fieldEntity, cursorPosition, turn))
            {
                return;
            }

            fieldEntity = this.scene.FindEntity("ColorSelector");
            this.TryMakeTurn(field.Map, fieldEntity, cursorPosition, turn);
        }

        private bool TryMakeTurn(int[,] fieldMap, Entity fieldEntity, Vector2 cursorPosition, TurnMadeComponent turn)
        {
            var position = fieldEntity.GetComponent<PositionComponent>();
            var field = fieldEntity.GetComponent<FieldComponent>();
            var map = field.Map;

            var location = (cursorPosition - position.Position) / (field.BlockSize + field.BlockInterval);
            var x = (int)location.X;
            var y = (int)location.Y;

            if (!this.IsInMap(map, x, y))
            {
                return false;
            }

            if (fieldMap[0, 0] == map[x, y] || fieldMap[fieldMap.GetLength(0) - 1, fieldMap.GetLength(1) - 1] == map[x, y] || map[x, y] == -1)
            {
                var common = this.scene.FindEntity("Common");
                common.GetComponent<CameraShakeComponent>().Shake();
                return true;
            }

            turn.Color = map[x, y];
            turn.TurnMade = true;
            return true;
        }

        private bool IsInMap(int[,] map, int x, int y)
        {
            return x >= 0 && y >= 0 && x < map.GetLength(0) && y < map.GetLength(1);
        }

    }
}
namespace MyONez.Samples.Base.Systems
{
    using System;

    using LocomotorECS;
    using LocomotorECS.Matching;

    using MyONez.ECS.Components;
    using MyONez.Samples.Base.Components;
    using MyONez.Samples.Base.Screens;

    public class FieldClickUpdateSystem : EntityProcessingSystem
    {
        public FieldClickUpdateSystem()
            : base(new Matcher().All(typeof(TurnMadeComponent), typeof(InputMouseComponent)))
        {
        }

        protected override void DoAction(Entity entity, TimeSpan gameTime)
        {
            base.DoAction(entity, gameTime);
            var turn = entity.GetComponent<TurnMadeComponent>();
            var input = entity.GetComponent<InputMouseComponent>();
            var position = entity.GetComponent<PositionComponent>();

            if (!input.LeftMouseButtonPressed)
            {
                return;
            }

            var location = (input.MousePosition - position.Position) / BasicScene.BlockSize;
            turn.X = (int)location.X;
            turn.Y = (int)location.Y;
        }
    }
}
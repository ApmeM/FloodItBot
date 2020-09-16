namespace MyONez.Samples.Base.Systems
{
    using System;

    using LocomotorECS;
    using LocomotorECS.Matching;

    using MyONez.AdditionalContent.SceneTransitions;
    using MyONez.Samples.Base.Components;
    using MyONez.Samples.Base.Screens;

    public class GameOverUpdateSystem : EntityProcessingSystem
    {
        private readonly BasicScene scene;

        public GameOverUpdateSystem(BasicScene scene)
            : base(new Matcher().All(typeof(CounterComponent)))
        {
            this.scene = scene;
        }

        protected override void DoAction(Entity entity, TimeSpan gameTime)
        {
            base.DoAction(entity, gameTime);
            var counter = entity.GetComponent<CounterComponent>();

            if (counter.GameOver)
            {
                return;
            }

            var field = this.scene.FindEntity("Field").GetComponent<FieldComponent>();
            if (counter.Player1Size > BasicScene.MapSize * BasicScene.MapSize / 2 || counter.Player2Size > BasicScene.MapSize * BasicScene.MapSize / 2)
            {
                this.GameOver(counter, field);
            }
        }

        private void GameOver(CounterComponent counter, FieldComponent field)
        {
            if (counter.Player1Size > counter.Player2Size)
            {
                counter.Player1Wins++;
            }

            if (counter.Player1Size < counter.Player2Size)
            {
                counter.Player2Wins++;
            }
            
            counter.GameOver = true;
            Core.Instance.SwitchScene(
                new WindTransition
                {
                    SceneLoadAction = () =>
                    {
                        this.scene.Restart(field, counter);
                        return this.scene;
                    }
                });
        }
    }
}
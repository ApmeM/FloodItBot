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
            if (counter.Count == BasicScene.AvailableTurns)
            {
                this.GameOver(counter, field, false);
                return;
            }

            var color = field.Map[0, 0];

            for (var x = 0; x < field.Map.GetLength(0); x++)
            for (var y = 0; y < field.Map.GetLength(1); y++)
            {
                if(field.Map[x,y] != color)
                {
                    return;
                }
            }

            this.GameOver(counter, field, true);
        }

        private void GameOver(CounterComponent counter, FieldComponent field, bool isWin)
        {
            if (isWin)
            {
                counter.StatisticWins++;
            }
            counter.StatisticCount++;
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
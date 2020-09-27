namespace FloodItBot.Base.Systems
{
    using System;

    using LocomotorECS;
    using LocomotorECS.Matching;

    using MyONez.AdditionalContent.SceneTransitions;
    using FloodItBot.Base.Components;
    using FloodItBot.Base.Screens;

    using MyONez;

    public class MultiplayerGameOverUpdateSystem : EntityProcessingSystem
    {
        private readonly MultiplayerScene scene;

        public MultiplayerGameOverUpdateSystem(MultiplayerScene scene)
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

            for (var i = 0; i < counter.Players.Count; i++)
            {
                if (counter.Players[i].Size > SharedData.MapSize * SharedData.MapSize / 2)
                {
                    counter.Players[i].Wins++;
                    counter.GamesPlayed++;
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
    }
}
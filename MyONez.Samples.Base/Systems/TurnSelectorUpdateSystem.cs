namespace MyONez.Samples.Base.Systems
{
    using System;

    using LocomotorECS;
    using LocomotorECS.Matching;

    using MyONez.Samples.Base.Components;

    public class TurnSelectorUpdateSystem : EntityProcessingSystem
    {
        public TurnSelectorUpdateSystem()
            : base(new Matcher().All(typeof(TurnMadeComponent), typeof(PlayerSwitcherComponent)))
        {
        }

        private TimeSpan elapsed = TimeSpan.Zero;

        protected override void DoAction(Entity entity, TimeSpan gameTime)
        {
            base.DoAction(entity, gameTime);
            this.elapsed += gameTime;
            if (this.elapsed.TotalSeconds < 0.5f)
            {
                return;
            }
            
            var turn = entity.GetComponent<TurnMadeComponent>();
            var switcher = entity.GetComponent<PlayerSwitcherComponent>();

            var player = switcher.Players[switcher.CurrentPlayer];

            if (!player.TurnMade)
            {
                return;
            }

            switcher.CurrentPlayer = (switcher.CurrentPlayer + 1) % switcher.Players.Count;
            var nextPlayer = switcher.Players[switcher.CurrentPlayer];

            this.elapsed = TimeSpan.Zero;

            turn.Color = player.Color;
            turn.PlayerX = player.PlayerX;
            turn.PlayerY = player.PlayerY;
            nextPlayer.TurnMade = false;
        }
    }
}
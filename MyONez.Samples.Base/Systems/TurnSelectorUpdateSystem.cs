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

            TurnMadeComponent player;
            TurnMadeComponent playerStart;
            if (switcher.Player == switcher.Player1.Player)
            {
                player = switcher.Player1;
                playerStart = switcher.Player2;
            }
            else
            {
                player = switcher.Player2;
                playerStart = switcher.Player1;
            }

            if (!player.TurnMade)
            {
                return;
            }

            this.elapsed = TimeSpan.Zero;

            turn.Color = player.Color;
            turn.Player = player.Player;
            switcher.Player = 1 - switcher.Player;
            playerStart.TurnMade = false;
        }
    }
}
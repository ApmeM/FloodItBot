namespace FloodItBot.Base.Systems
{
    using System;

    using LocomotorECS;

    using MyONez.ECS;
    using FloodItBot.Base.Components;

    public class ColorSelectorGrayingUpdateSystem : EntitySystem
    {
        private readonly Scene scene;

        public ColorSelectorGrayingUpdateSystem(Scene scene)
        {
            this.scene = scene;
        }

        public override void DoAction(TimeSpan gameTime)
        {
            base.DoAction(gameTime);
            var colorSelector = this.scene.FindEntity("ColorSelector");
            var colorSelectorMap = colorSelector.GetComponent<FieldComponent>().Map;

            var field = this.scene.FindEntity("Field");
            var fieldMap = field.GetComponent<FieldComponent>().Map;
            var switcher = field.GetComponent<PlayerSwitcherComponent>();

            for (var i = 0; i < colorSelectorMap.GetLength(1); i++)
            {
                colorSelectorMap[0, i] = i;
            }

            for (var index = 0; index < switcher.Players.Count; index++)
            {
                colorSelectorMap[0, fieldMap[switcher.Players[index].PlayerX, switcher.Players[index].PlayerY]] = -1;
            }
        }
    }
}
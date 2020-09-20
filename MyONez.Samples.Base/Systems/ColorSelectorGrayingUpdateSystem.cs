namespace MyONez.Samples.Base.Systems
{
    using System;

    using LocomotorECS;

    using MyONez.Samples.Base.Components;
    using MyONez.Samples.Base.Screens;

    public class ColorSelectorGrayingUpdateSystem : EntitySystem
    {
        private readonly BasicScene scene;

        public ColorSelectorGrayingUpdateSystem(BasicScene scene)
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

            for (var i = 0; i < colorSelectorMap.GetLength(1); i++)
            {
                colorSelectorMap[0, i] = i;
            }

            colorSelectorMap[0, fieldMap[0, 0]] = -1;
            colorSelectorMap[0, fieldMap[fieldMap.GetLength(0) - 1, fieldMap.GetLength(1) - 1]] = -1;
        }
    }
}
namespace MyONez.Samples.Base.Systems
{
    using System;

    using LocomotorECS;
    using LocomotorECS.Matching;

    using Microsoft.Xna.Framework;
    using Microsoft.Xna.Framework.Graphics;

    using MyONez.ECS.Components;
    using MyONez.Maths;
    using MyONez.Samples.Base.Components;
    using MyONez.Samples.Base.Screens;

    public class FieldMeshGeneratorSystem : EntityProcessingSystem
    {
        public FieldMeshGeneratorSystem()
            : base(new Matcher().All(typeof(FieldComponent)))
        {
        }

        protected override void DoAction(Entity entity, TimeSpan gameTime)
        {
            base.DoAction(entity, gameTime);
            var field = entity.GetComponent<FieldComponent>();
            var finalRender = entity.GetOrCreateComponent<FinalRenderComponent>();
            var effect = entity.GetComponent<SpriteEffectsComponent>()?.SpriteEffects ?? SpriteEffects.None;
            var depth = entity.GetComponent<DepthLayerComponent>()?.Depth ?? 0;

            if (finalRender.Batch.Meshes.Count != field.Map.GetLength(0) * field.Map.GetLength(1))
            {
                finalRender.Batch.Clear();

                var texture = field.Texture;

                for (var x = 0; x < field.Map.GetLength(0); x++)
                for (var y = 0; y < field.Map.GetLength(1); y++)
                {
                    finalRender.Batch.Draw(
                        texture,
                        new RectangleF(
                            x * (field.BlockSize + field.BlockInterval),
                            y * (field.BlockSize + field.BlockInterval),
                            field.BlockSize,
                            field.BlockSize),
                        texture.Bounds,
                        this.ConvertMapToColor(field.Map[x, y]),
                        depth);
                }

                var transformation = TransformationUtils.GetTransformation(entity).LocalTransformMatrix;
                foreach (var mesh in finalRender.Batch.Meshes)
                {
                    mesh.ApplyEffectToMesh(effect);
                    mesh.ApplyTransformMesh(transformation);
                }

            }
            else
            {
                for (var x = 0; x < field.Map.GetLength(0); x++)
                for (var y = 0; y < field.Map.GetLength(1); y++)
                {
                    finalRender.Batch.Meshes[x * field.Map.GetLength(1) + y].SetColor(this.ConvertMapToColor(field.Map[x, y]));
                }
            }
        }

        private Color ConvertMapToColor(int map)
        {
            switch (map)
            {
                case 0: return Color.Red;
                case 1: return Color.Orange;
                case 2: return Color.Yellow;
                case 3: return Color.Green;
                case 4: return Color.LightBlue;
                case 5: return Color.Blue;
                case 6: return Color.Magenta;
            }

            return Color.DimGray;
        }
    }
}
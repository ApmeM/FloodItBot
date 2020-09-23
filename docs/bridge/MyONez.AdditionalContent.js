/**
 * @version 1.0.0
 * @author ApmeM
 * @copyright Copyright �  2019
 * @compiler Bridge.NET 17.6.0
 */
Bridge.assembly("MyONez.AdditionalContent", function ($asm, globals) {
    "use strict";

    Bridge.define("MyONez.AdditionalContent.ContentPaths", {
        statics: {
            fields: {
                content: null
            },
            ctors: {
                init: function () {
                    this.content = "Content";
                }
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.ContentPaths.Effects", {
        $kind: "nested class",
        statics: {
            fields: {
                bevels: null,
                bloomCombine: null,
                bloomExtract: null,
                crosshatch: null,
                deferredLighting: null,
                deferredSprite: null,
                dissolve: null,
                dots: null,
                forwardLighting: null,
                gaussianBlur: null,
                grayscale: null,
                heatDistortion: null,
                invert: null,
                letterbox: null,
                multiTexture: null,
                multiTextureOverlay: null,
                noise: null,
                paletteCycler: null,
                pixelGlitch: null,
                polygonLight: null,
                reflection: null,
                scanlines: null,
                sepia: null,
                spriteAlphaTest: null,
                spriteBlinkEffect: null,
                spriteLightMultiply: null,
                spriteLines: null,
                squares: null,
                textureWipe: null,
                twist: null,
                vignette: null,
                wind: null
            },
            ctors: {
                init: function () {
                    this.bevels = "effects/Bevels";
                    this.bloomCombine = "effects/BloomCombine";
                    this.bloomExtract = "effects/BloomExtract";
                    this.crosshatch = "effects/Crosshatch";
                    this.deferredLighting = "effects/DeferredLighting";
                    this.deferredSprite = "effects/DeferredSprite";
                    this.dissolve = "effects/Dissolve";
                    this.dots = "effects/Dots";
                    this.forwardLighting = "effects/ForwardLighting";
                    this.gaussianBlur = "effects/GaussianBlur";
                    this.grayscale = "effects/Grayscale";
                    this.heatDistortion = "effects/HeatDistortion";
                    this.invert = "effects/Invert";
                    this.letterbox = "effects/Letterbox";
                    this.multiTexture = "effects/MultiTexture";
                    this.multiTextureOverlay = "effects/MultiTextureOverlay";
                    this.noise = "effects/Noise";
                    this.paletteCycler = "effects/PaletteCycler";
                    this.pixelGlitch = "effects/PixelGlitch";
                    this.polygonLight = "effects/PolygonLight";
                    this.reflection = "effects/Reflection";
                    this.scanlines = "effects/Scanlines";
                    this.sepia = "effects/Sepia";
                    this.spriteAlphaTest = "effects/SpriteAlphaTest";
                    this.spriteBlinkEffect = "effects/SpriteBlinkEffect";
                    this.spriteLightMultiply = "effects/SpriteLightMultiply";
                    this.spriteLines = "effects/SpriteLines";
                    this.squares = "effects/Squares";
                    this.textureWipe = "effects/TextureWipe";
                    this.twist = "effects/Twist";
                    this.vignette = "effects/Vignette";
                    this.wind = "effects/Wind";
                }
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.ContentPaths.Textures", {
        $kind: "nested class",
        statics: {
            fields: {
                heatDistortionNoise: null
            },
            ctors: {
                init: function () {
                    this.heatDistortionNoise = "textures/heatDistortionNoise";
                }
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.ContentPaths.Textures.TextureWipeTransition", {
        $kind: "nested class",
        statics: {
            fields: {
                angular: null,
                crissCross: null,
                diagonalDistort: null,
                horizontal: null,
                noise: null,
                pokemon: null,
                sawTooth: null,
                spiral: null,
                wink: null
            },
            ctors: {
                init: function () {
                    this.angular = "textures/textureWipeTransition/angular";
                    this.crissCross = "textures/textureWipeTransition/crissCross";
                    this.diagonalDistort = "textures/textureWipeTransition/diagonalDistort";
                    this.horizontal = "textures/textureWipeTransition/horizontal";
                    this.noise = "textures/textureWipeTransition/noise";
                    this.pokemon = "textures/textureWipeTransition/pokemon";
                    this.sawTooth = "textures/textureWipeTransition/sawTooth";
                    this.spiral = "textures/textureWipeTransition/spiral";
                    this.wink = "textures/textureWipeTransition/wink";
                }
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.BevelsEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Bevels";
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.BloomCombineEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/BloomCombine";
                }
            }
        },
        fields: {
            baseIntensityParam: null,
            baseMapParam: null,
            baseSaturationParam: null,
            bloomIntensityParam: null,
            bloomSaturationParam: null
        },
        props: {
            BloomIntensity: {
                get: function () {
                    return this.bloomIntensityParam.GetValueSingle();
                },
                set: function (value) {
                    this.bloomIntensityParam.SetValue$12(value);
                }
            },
            BaseIntensity: {
                get: function () {
                    return this.baseIntensityParam.GetValueSingle();
                },
                set: function (value) {
                    this.baseIntensityParam.SetValue$12(value);
                }
            },
            BloomSaturation: {
                get: function () {
                    return this.bloomSaturationParam.GetValueSingle();
                },
                set: function (value) {
                    this.bloomSaturationParam.SetValue$12(value);
                }
            },
            BaseSaturation: {
                get: function () {
                    return this.baseSaturationParam.GetValueSingle();
                },
                set: function (value) {
                    this.baseSaturationParam.SetValue$12(value);
                }
            },
            BaseMap: {
                get: function () {
                    return this.baseMapParam.GetValueTexture2D();
                },
                set: function (value) {
                    this.baseMapParam.SetValue(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.bloomIntensityParam = this.Parameters.getItem$1("_bloomIntensity");
                this.baseIntensityParam = this.Parameters.getItem$1("_baseIntensity");
                this.bloomSaturationParam = this.Parameters.getItem$1("_bloomSaturation");
                this.baseSaturationParam = this.Parameters.getItem$1("_baseSaturation");
                this.baseMapParam = this.Parameters.getItem$1("_baseMap");
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.BloomExtractEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/BloomExtract";
                }
            }
        },
        fields: {
            bloomThresholdParam: null
        },
        props: {
            BloomThreshold: {
                get: function () {
                    return this.bloomThresholdParam.GetValueSingle();
                },
                set: function (value) {
                    this.bloomThresholdParam.SetValue$12(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.bloomThresholdParam = this.Parameters.getItem$1("_bloomThreshold");
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.CrosshatchEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Crosshatch";
                }
            }
        },
        fields: {
            crosshatchSizeParam: null
        },
        props: {
            CrosshatchSize: {
                get: function () {
                    return this.crosshatchSizeParam.GetValueInt32();
                },
                set: function (value) {
                    if (!MyONez.Maths.Mathf.IsEven(value)) {
                        value = (value + 1) | 0;
                    }

                    this.crosshatchSizeParam.SetValue$11(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.crosshatchSizeParam = this.Parameters.getItem$1("crossHatchSize");
                this.CrosshatchSize = 16;
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.DeferredLightingEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/DeferredLighting";
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.DeferredSpriteEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/DeferredSprite";
                }
            }
        },
        fields: {
            alphaAsSelfIlluminationParam: null,
            alphaCutoffParam: null,
            normalMapParam: null,
            selfIlluminationPowerParam: null
        },
        props: {
            AlphaCutoff: {
                get: function () {
                    return this.alphaCutoffParam.GetValueSingle();
                },
                set: function (value) {
                    this.alphaCutoffParam.SetValue$12(value);
                }
            },
            NormalMap: {
                get: function () {
                    return this.normalMapParam.GetValueTexture2D();
                },
                set: function (value) {
                    this.normalMapParam.SetValue(value);
                }
            },
            UseNormalAlphaChannelForSelfIllumination: {
                get: function () {
                    return this.alphaAsSelfIlluminationParam.GetValueSingle() === 1.0;
                },
                set: function (value) {
                    this.alphaAsSelfIlluminationParam.SetValue$12(value ? 1.0 : 0.0);
                }
            },
            SelfIlluminationPower: {
                get: function () {
                    return this.selfIlluminationPowerParam.GetValueSingle();
                },
                set: function (value) {
                    this.selfIlluminationPowerParam.SetValue$12(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.normalMapParam = this.Parameters.getItem$1("_normalMap");
                this.alphaCutoffParam = this.Parameters.getItem$1("_alphaCutoff");
                this.alphaAsSelfIlluminationParam = this.Parameters.getItem$1("_alphaAsSelfIllumination");
                this.selfIlluminationPowerParam = this.Parameters.getItem$1("_selfIlluminationPower");

                this.AlphaCutoff = 0.3;
                this.SelfIlluminationPower = 1;
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.DissolveEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Dissolve";
                }
            }
        },
        fields: {
            dissolveTexParam: null,
            dissolveThresholdColorParam: null,
            dissolveThresholdParam: null,
            progressParam: null
        },
        props: {
            Progress: {
                get: function () {
                    return this.progressParam.GetValueSingle();
                },
                set: function (value) {
                    this.progressParam.SetValue$12(value);
                }
            },
            DissolveThreshold: {
                get: function () {
                    return this.dissolveThresholdParam.GetValueSingle();
                },
                set: function (value) {
                    this.dissolveThresholdParam.SetValue$12(value);
                }
            },
            DissolveThresholdColor: {
                get: function () {
                    return new Microsoft.Xna.Framework.Color.$ctor4(this.dissolveThresholdColorParam.GetValueVector4());
                },
                set: function (value) {
                    this.dissolveThresholdColorParam.SetValue$8(value.ToVector4());
                }
            },
            DissolveTexture: {
                get: function () {
                    return this.dissolveTexParam.GetValueTexture2D();
                },
                set: function (value) {
                    this.dissolveTexParam.SetValue(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.progressParam = this.Parameters.getItem$1("_progress");
                this.dissolveThresholdParam = this.Parameters.getItem$1("_dissolveThreshold");
                this.dissolveThresholdColorParam = this.Parameters.getItem$1("_dissolveThresholdColor");
                this.dissolveTexParam = this.Parameters.getItem$1("_dissolveTex");

                this.Progress = 0;
                this.DissolveThreshold = 0.1;
                this.DissolveThresholdColor = Microsoft.Xna.Framework.Color.Red.$clone();
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.DotsEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Dots";
                }
            }
        },
        fields: {
            angleParam: null,
            scaleParam: null
        },
        props: {
            Scale: {
                get: function () {
                    return this.scaleParam.GetValueSingle();
                },
                set: function (value) {
                    this.scaleParam.SetValue$12(value);
                }
            },
            Angle: {
                get: function () {
                    return this.angleParam.GetValueSingle();
                },
                set: function (value) {
                    this.angleParam.SetValue$12(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.scaleParam = this.Parameters.getItem$1("scale");
                this.angleParam = this.Parameters.getItem$1("angle");

                this.Scale = 0.5;
                this.Angle = 0.5;
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.ForwardLightingEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/ForwardLighting";
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.GaussianBlurEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/GaussianBlur";
                }
            }
        },
        fields: {
            blurOffsetsParam: null,
            blurWeightsParam: null,
            horizontalSampleOffsets: null,
            sampleCount: 0,
            sampleWeights: null,
            verticalSampleOffsets: null,
            blurAmount: 0,
            horizontalBlurDelta: 0,
            verticalBlurDelta: 0
        },
        props: {
            BlurAmount: {
                get: function () {
                    return this.blurAmount;
                },
                set: function (value) {
                    if (this.blurAmount === value) {
                        return;
                    }

                    if (value === 0) {
                        value = 0.001;
                    }

                    this.blurAmount = value;
                    this.CalculateSampleWeights();
                }
            },
            HorizontalBlurDelta: {
                get: function () {
                    return this.horizontalBlurDelta;
                },
                set: function (value) {
                    if (value === this.horizontalBlurDelta) {
                        return;
                    }

                    this.horizontalBlurDelta = value;
                    this.SetBlurEffectParameters(this.horizontalBlurDelta, 0, this.horizontalSampleOffsets);
                }
            },
            VerticalBlurDelta: {
                get: function () {
                    return this.verticalBlurDelta;
                },
                set: function (value) {
                    if (value === this.verticalBlurDelta) {
                        return;
                    }

                    this.verticalBlurDelta = value;
                    this.SetBlurEffectParameters(0, this.verticalBlurDelta, this.verticalSampleOffsets);
                }
            }
        },
        ctors: {
            init: function () {
                this.blurAmount = 2.0;
            },
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.blurWeightsParam = this.Parameters.getItem$1("_sampleWeights");
                this.blurOffsetsParam = this.Parameters.getItem$1("_sampleOffsets");

                this.sampleCount = this.blurWeightsParam.Elements.Count;

                this.sampleWeights = System.Array.init(this.sampleCount, 0, System.Single);
                this.verticalSampleOffsets = System.Array.init(this.sampleCount, function (){
                    return new Microsoft.Xna.Framework.Vector2();
                }, Microsoft.Xna.Framework.Vector2);
                this.horizontalSampleOffsets = System.Array.init(this.sampleCount, function (){
                    return new Microsoft.Xna.Framework.Vector2();
                }, Microsoft.Xna.Framework.Vector2);

                this.verticalSampleOffsets[System.Array.index(0, this.verticalSampleOffsets)] = Microsoft.Xna.Framework.Vector2.Zero.$clone();
                this.horizontalSampleOffsets[System.Array.index(0, this.horizontalSampleOffsets)] = Microsoft.Xna.Framework.Vector2.Zero.$clone();

                this.CalculateSampleWeights();
            }
        },
        methods: {
            PrepareForHorizontalBlur: function () {
                this.blurOffsetsParam.SetValue$5(this.horizontalSampleOffsets);
            },
            PrepareForVerticalBlur: function () {
                this.blurOffsetsParam.SetValue$5(this.verticalSampleOffsets);
            },
            SetBlurEffectParameters: function (dx, dy, offsets) {
                for (var i = 0; i < ((Bridge.Int.div(this.sampleCount, 2)) | 0); i = (i + 1) | 0) {
                    var sampleOffset = Bridge.Int.mul(i, 2) + 1.5;

                    var delta = Microsoft.Xna.Framework.Vector2.op_Multiply$1(new Microsoft.Xna.Framework.Vector2.$ctor2(dx, dy), sampleOffset);

                    offsets[System.Array.index(((Bridge.Int.mul(i, 2) + 1) | 0), offsets)] = delta.$clone();
                    offsets[System.Array.index(((Bridge.Int.mul(i, 2) + 2) | 0), offsets)] = Microsoft.Xna.Framework.Vector2.op_UnaryNegation(delta.$clone());
                }
            },
            CalculateSampleWeights: function () {
                this.sampleWeights[System.Array.index(0, this.sampleWeights)] = this.ComputeGaussian(0);

                var totalWeights = this.sampleWeights[System.Array.index(0, this.sampleWeights)];

                for (var i = 0; i < ((Bridge.Int.div(this.sampleCount, 2)) | 0); i = (i + 1) | 0) {
                    var weight = this.ComputeGaussian(((i + 1) | 0));

                    this.sampleWeights[System.Array.index(((Bridge.Int.mul(i, 2) + 1) | 0), this.sampleWeights)] = weight;
                    this.sampleWeights[System.Array.index(((Bridge.Int.mul(i, 2) + 2) | 0), this.sampleWeights)] = weight;

                    totalWeights += weight * 2;
                }

                for (var i1 = 0; i1 < this.sampleWeights.length; i1 = (i1 + 1) | 0) {
                    this.sampleWeights[System.Array.index(i1, this.sampleWeights)] /= totalWeights;
                }

                this.blurWeightsParam.SetValue$13(this.sampleWeights);
            },
            ComputeGaussian: function (n) {
                return 1.0 / Math.sqrt(6.2831853071795862 * this.blurAmount) * Math.exp(-(n * n) / (2 * this.blurAmount * this.blurAmount));
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.GrayscaleEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Grayscale";
                }
            }
        },
        ctors: {
            ctor: function (cloneSource) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, cloneSource);
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.HeatDistortionEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/HeatDistortion";
                }
            }
        },
        props: {
            DistortionFactor: {
                get: function () {
                    return this.Parameters.getItem$1("_distortionFactor").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_distortionFactor").SetValue$12(value);
                }
            },
            RiseFactor: {
                get: function () {
                    return this.Parameters.getItem$1("_riseFactor").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_riseFactor").SetValue$12(value);
                }
            },
            Time: {
                get: function () {
                    return this.Parameters.getItem$1("_time").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_time").SetValue$12(value);
                }
            },
            DistortionTexture: {
                get: function () {
                    return this.Parameters.getItem$1("_distortionTexture").GetValueTexture2D();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_distortionTexture").SetValue(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.InvertEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Invert";
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.LetterboxEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Letterbox";
                }
            }
        },
        props: {
            Color: {
                get: function () {
                    return new Microsoft.Xna.Framework.Color.$ctor4(this.Parameters.getItem$1("_color").GetValueVector4());
                },
                set: function (value) {
                    this.Parameters.getItem$1("_color").SetValue$8(value.ToVector4());
                }
            },
            LetterboxSize: {
                get: function () {
                    return this.Parameters.getItem$1("_letterboxSize").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_letterboxSize").SetValue$12(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.MultiTextureEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/MultiTexture";
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.MultiTextureOverlayEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/MultiTextureOverlay";
                }
            }
        },
        props: {
            SecondTexture: {
                get: function () {
                    return this.Parameters.getItem$1("_secondTexture").GetValueTexture2D();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_secondTexture").SetValue(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.NoiseEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Noise";
                }
            }
        },
        fields: {
            noiseParam: null
        },
        props: {
            Noise: {
                get: function () {
                    return this.noiseParam.GetValueSingle();
                },
                set: function (value) {
                    this.noiseParam.SetValue$12(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.noiseParam = this.Parameters.getItem$1("noise");
                this.Noise = 1;
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.PaletteCyclerEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/PaletteCycler";
                }
            }
        },
        fields: {
            cycleSpeedParam: null,
            paletteTextureParam: null,
            timeParam: null
        },
        props: {
            PaletteTexture: {
                get: function () {
                    return this.paletteTextureParam.GetValueTexture2D();
                },
                set: function (value) {
                    this.paletteTextureParam.SetValue(value);
                }
            },
            CycleSpeed: {
                get: function () {
                    return this.cycleSpeedParam.GetValueSingle();
                },
                set: function (value) {
                    this.cycleSpeedParam.SetValue$12(value);
                }
            },
            Time: {
                get: function () {
                    return this.timeParam.GetValueSingle();
                },
                set: function (value) {
                    this.timeParam.SetValue$12(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.paletteTextureParam = this.Parameters.getItem$1("_paletteTexture");
                this.cycleSpeedParam = this.Parameters.getItem$1("_cycleSpeed");
                this.timeParam = this.Parameters.getItem$1("_time");
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.PixelGlitchEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/PixelGlitch";
                }
            }
        },
        props: {
            VerticalSize: {
                get: function () {
                    return this.Parameters.getItem$1("_verticalSize").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_verticalSize").SetValue$12(value);
                }
            },
            HorizontalOffset: {
                get: function () {
                    return this.Parameters.getItem$1("_horizontalOffset").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_horizontalOffset").SetValue$12(value);
                }
            },
            ScreenSize: {
                get: function () {
                    return this.Parameters.getItem$1("_screenSize").GetValueVector2();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_screenSize").SetValue$4(value.$clone());
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.PolygonLightEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/PolygonLight";
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.ReflectionEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Reflection";
                }
            }
        },
        fields: {
            matrixTransformParam: null,
            normalMagnitudeParam: null,
            normalMapParam: null,
            reflectionIntensityParam: null,
            renderTextureParam: null
        },
        props: {
            ReflectionIntensity: {
                get: function () {
                    return this.reflectionIntensityParam.GetValueSingle();
                },
                set: function (value) {
                    this.reflectionIntensityParam.SetValue$12(value);
                }
            },
            NormalMagnitude: {
                get: function () {
                    return this.normalMagnitudeParam.GetValueSingle();
                },
                set: function (value) {
                    this.normalMagnitudeParam.SetValue$12(value);
                }
            },
            NormalMap: {
                get: function () {
                    return this.normalMapParam.GetValueTexture2D();
                },
                set: function (value) {
                    this.normalMapParam.SetValue(value);
                }
            },
            RenderTexture: {
                get: function () {
                    return this.renderTextureParam.GetValueTexture2D();
                },
                set: function (value) {
                    this.renderTextureParam.SetValue(value);
                }
            },
            MatrixTransform: {
                get: function () {
                    return this.matrixTransformParam.GetValueMatrix();
                },
                set: function (value) {
                    this.matrixTransformParam.SetValue$1(value.$clone());
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.reflectionIntensityParam = this.Parameters.getItem$1("_reflectionIntensity");
                this.renderTextureParam = this.Parameters.getItem$1("_renderTexture");
                this.normalMapParam = this.Parameters.getItem$1("_normalMap");
                this.matrixTransformParam = this.Parameters.getItem$1("_matrixTransform");
                this.normalMagnitudeParam = this.Parameters.getItem$1("_normalMagnitude");

                this.ReflectionIntensity = 0.4;
                this.NormalMagnitude = 0.05;
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.ScanlinesEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Scanlines";
                }
            }
        },
        fields: {
            attenuationParam: null,
            linesFactorParam: null
        },
        props: {
            Attenuation: {
                get: function () {
                    return this.attenuationParam.GetValueSingle();
                },
                set: function (value) {
                    this.attenuationParam.SetValue$12(value);
                }
            },
            LinesFactor: {
                get: function () {
                    return this.linesFactorParam.GetValueSingle();
                },
                set: function (value) {
                    this.linesFactorParam.SetValue$12(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.attenuationParam = this.Parameters.getItem$1("_attenuation");
                this.linesFactorParam = this.Parameters.getItem$1("_linesFactor");

                this.Attenuation = 0.04;
                this.LinesFactor = 800.0;
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.SepiaEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Sepia";
                }
            }
        },
        fields: {
            sepiaToneParam: null
        },
        props: {
            SepiaTone: {
                get: function () {
                    return this.sepiaToneParam.GetValueVector3();
                },
                set: function (value) {
                    this.sepiaToneParam.SetValue$6(value.$clone());
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.sepiaToneParam = this.Parameters.getItem$1("_sepiaTone");
                this.SepiaTone = new Microsoft.Xna.Framework.Vector3.$ctor3(1.2, 1.0, 0.8);
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.SpriteAlphaTestEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/SpriteAlphaTest";
                }
            }
        },
        fields: {
            alphaTestParam: null,
            compareFunction: 0,
            referenceAlpha: 0
        },
        props: {
            ReferenceAlpha: {
                get: function () {
                    return this.referenceAlpha;
                },
                set: function (value) {
                    if (this.referenceAlpha === value) {
                        return;
                    }

                    this.referenceAlpha = value;
                    this.UpdateEffectParameter();
                }
            },
            CompareFunction: {
                get: function () {
                    return this.compareFunction;
                },
                set: function (value) {
                    if (this.compareFunction === value) {
                        return;
                    }

                    this.compareFunction = value;
                    this.UpdateEffectParameter();
                }
            }
        },
        ctors: {
            init: function () {
                this.compareFunction = MyONez.AdditionalContent.Effects.SpriteAlphaTestEffect.AlphaTestCompareFunction.Greater;
                this.referenceAlpha = 0.5;
            },
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.alphaTestParam = this.Parameters.getItem$1("_alphaTest");
                this.UpdateEffectParameter();
            }
        },
        methods: {
            UpdateEffectParameter: function () {
                var value = new Microsoft.Xna.Framework.Vector3.ctor();

                value.X = this.referenceAlpha;

                switch (this.compareFunction) {
                    case MyONez.AdditionalContent.Effects.SpriteAlphaTestEffect.AlphaTestCompareFunction.Greater: 
                        value.Y = -1;
                        value.Z = 1;
                        break;
                    case MyONez.AdditionalContent.Effects.SpriteAlphaTestEffect.AlphaTestCompareFunction.LessThan: 
                        value.Y = 1;
                        value.Z = -1;
                        break;
                    case MyONez.AdditionalContent.Effects.SpriteAlphaTestEffect.AlphaTestCompareFunction.Always: 
                        value.Y = 1;
                        value.Z = 1;
                        break;
                    case MyONez.AdditionalContent.Effects.SpriteAlphaTestEffect.AlphaTestCompareFunction.Never: 
                        value.Y = -1;
                        value.Z = -1;
                        break;
                }

                this.alphaTestParam.SetValue$6(value.$clone());
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.SpriteAlphaTestEffect.AlphaTestCompareFunction", {
        $kind: "nested enum",
        statics: {
            fields: {
                Greater: 0,
                LessThan: 1,
                Always: 2,
                Never: 3
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.SpriteBlinkEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/SpriteBlinkEffect";
                }
            }
        },
        fields: {
            blinkColorParam: null
        },
        props: {
            BlinkColor: {
                get: function () {
                    return new Microsoft.Xna.Framework.Color.$ctor4(this.blinkColorParam.GetValueVector4());
                },
                set: function (value) {
                    this.blinkColorParam.SetValue$8(value.ToVector4());
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.blinkColorParam = this.Parameters.getItem$1("_blinkColor");

                this.BlinkColor = Microsoft.Xna.Framework.Color.TransparentBlack.$clone();
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.SpriteLightMultiplyEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/SpriteLightMultiply";
                }
            }
        },
        props: {
            LightTexture: {
                get: function () {
                    return this.Parameters.getItem$1("_lightTexture").GetValueTexture2D();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_lightTexture").SetValue(value);
                }
            },
            MultiplicativeFactor: {
                get: function () {
                    return this.Parameters.getItem$1("_multiplicativeFactor").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_multiplicativeFactor").SetValue$12(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.SpriteLinesEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/SpriteLines";
                }
            }
        },
        fields: {
            lineColorParam: null,
            lineSizeParam: null
        },
        props: {
            LineColor: {
                get: function () {
                    return new Microsoft.Xna.Framework.Color.$ctor4(this.lineColorParam.GetValueVector4());
                },
                set: function (value) {
                    this.lineColorParam.SetValue$8(value.ToVector4());
                }
            },
            LineSize: {
                get: function () {
                    return this.lineSizeParam.GetValueSingle();
                },
                set: function (value) {
                    this.lineSizeParam.SetValue$12(value);
                }
            },
            IsVertical: {
                get: function () {
                    return Bridge.referenceEquals(this.CurrentTechnique, this.Techniques.getItem$1("VerticalLines"));
                },
                set: function (value) {
                    this.CurrentTechnique = this.Techniques.getItem$1(value ? "VerticalLines:" : "HorizontalLines");
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.lineColorParam = this.Parameters.getItem$1("_lineColor");
                this.lineSizeParam = this.Parameters.getItem$1("_lineSize");

                this.LineColor = Microsoft.Xna.Framework.Color.Red.$clone();
                this.LineSize = 5.0;
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.SquaresEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect,MyONez.Graphics.Transitions.IProgressEffect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Squares";
                }
            }
        },
        props: {
            Color: {
                get: function () {
                    return new Microsoft.Xna.Framework.Color.$ctor4(this.Parameters.getItem$1("_color").GetValueVector4());
                },
                set: function (value) {
                    this.Parameters.getItem$1("_color").SetValue$8(value.ToVector4());
                }
            },
            Smoothness: {
                get: function () {
                    return this.Parameters.getItem$1("_smoothness").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_smoothness").SetValue$12(value);
                }
            },
            Size: {
                get: function () {
                    return this.Parameters.getItem$1("_size").GetValueVector2();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_size").SetValue$4(value.$clone());
                }
            },
            Progress: {
                get: function () {
                    return this.Parameters.getItem$1("_progress").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_progress").SetValue$12(value);
                }
            }
        },
        alias: ["Progress", "MyONez$Graphics$Transitions$IProgressEffect$Progress"],
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.Color = Microsoft.Xna.Framework.Color.Black.$clone();
                this.Smoothness = 0.5;
                this.Size = new Microsoft.Xna.Framework.Vector2.$ctor2(30, 30);
                this.Progress = 0;
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.TextureWipeEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect,MyONez.Graphics.Transitions.IProgressEffect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/TextureWipe";
                }
            }
        },
        props: {
            Opacity: {
                get: function () {
                    return this.Parameters.getItem$1("_opacity").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_opacity").SetValue$12(value);
                }
            },
            Color: {
                get: function () {
                    return new Microsoft.Xna.Framework.Color.$ctor4(this.Parameters.getItem$1("_color").GetValueVector4());
                },
                set: function (value) {
                    this.Parameters.getItem$1("_color").SetValue$8(value.ToVector4());
                }
            },
            Texture: {
                get: function () {
                    return this.Parameters.getItem$1("_transitionTex").GetValueTexture2D();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_transitionTex").SetValue(value);
                }
            },
            Progress: {
                get: function () {
                    return this.Parameters.getItem$1("_progress").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_progress").SetValue$12(value);
                }
            }
        },
        alias: ["Progress", "MyONez$Graphics$Transitions$IProgressEffect$Progress"],
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.TwistEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Twist";
                }
            }
        },
        fields: {
            angleParam: null,
            offsetParam: null,
            radiusParam: null
        },
        props: {
            Radius: {
                get: function () {
                    return this.radiusParam.GetValueSingle();
                },
                set: function (value) {
                    this.radiusParam.SetValue$12(value);
                }
            },
            Angle: {
                get: function () {
                    return this.angleParam.GetValueSingle();
                },
                set: function (value) {
                    this.angleParam.SetValue$12(value);
                }
            },
            Offset: {
                get: function () {
                    return this.offsetParam.GetValueVector2();
                },
                set: function (value) {
                    this.offsetParam.SetValue$4(value.$clone());
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
                this.radiusParam = this.Parameters.getItem$1("radius");
                this.angleParam = this.Parameters.getItem$1("angle");
                this.offsetParam = this.Parameters.getItem$1("offset");

                this.Radius = 0.5;
                this.Angle = 5.0;
                this.Offset = Microsoft.Xna.Framework.Vector2.op_Division$1(Microsoft.Xna.Framework.Vector2.One.$clone(), 2);
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.VignetteEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Vignette";
                }
            }
        },
        props: {
            Power: {
                get: function () {
                    return this.Parameters.getItem$1("_power").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_power").SetValue$12(value);
                }
            },
            Radius: {
                get: function () {
                    return this.Parameters.getItem$1("_radius").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_radius").SetValue$12(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.WindEffect", {
        inherits: [Microsoft.Xna.Framework.Graphics.Effect,MyONez.Graphics.Transitions.IProgressEffect],
        statics: {
            fields: {
                EffectAssetName: null
            },
            ctors: {
                init: function () {
                    this.EffectAssetName = "effects/Wind";
                }
            }
        },
        props: {
            Segments: {
                get: function () {
                    return this.Parameters.getItem$1("_windSegments").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_windSegments").SetValue$12(value);
                }
            },
            Size: {
                get: function () {
                    return this.Parameters.getItem$1("_size").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_size").SetValue$12(value);
                }
            },
            Progress: {
                get: function () {
                    return this.Parameters.getItem$1("_progress").GetValueSingle();
                },
                set: function (value) {
                    this.Parameters.getItem$1("_progress").SetValue$12(value);
                }
            }
        },
        alias: ["Progress", "MyONez$Graphics$Transitions$IProgressEffect$Progress"],
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                Microsoft.Xna.Framework.Graphics.Effect.ctor.call(this, effect);
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Materials.MaterialDefaults", {
        statics: {
            methods: {
                StencilWrite: function (stencilRef) {
                    var $t, $t1;
                    if (stencilRef === void 0) { stencilRef = 1; }
                    return ($t = new MyONez.Graphics.Materials.Material(), $t.DepthStencilState = ($t1 = new Microsoft.Xna.Framework.Graphics.DepthStencilState.ctor(), $t1.StencilEnable = true, $t1.StencilFunction = Microsoft.Xna.Framework.Graphics.CompareFunction.Always, $t1.StencilPass = Microsoft.Xna.Framework.Graphics.StencilOperation.Replace, $t1.ReferenceStencil = stencilRef, $t1.DepthBufferEnable = false, $t1), $t);
                },
                StencilRead: function (stencilRef) {
                    var $t, $t1;
                    if (stencilRef === void 0) { stencilRef = 1; }
                    return ($t = new MyONez.Graphics.Materials.Material(), $t.DepthStencilState = ($t1 = new Microsoft.Xna.Framework.Graphics.DepthStencilState.ctor(), $t1.StencilEnable = true, $t1.StencilFunction = Microsoft.Xna.Framework.Graphics.CompareFunction.Equal, $t1.StencilPass = Microsoft.Xna.Framework.Graphics.StencilOperation.Keep, $t1.ReferenceStencil = stencilRef, $t1.DepthBufferEnable = false, $t1), $t);
                },
                BlendDarken: function () {
                    var $t, $t1;
                    return ($t = new MyONez.Graphics.Materials.Material(), $t.BlendState = ($t1 = new Microsoft.Xna.Framework.Graphics.BlendState.ctor(), $t1.ColorSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.ColorDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.ColorBlendFunction = Microsoft.Xna.Framework.Graphics.BlendFunction.Min, $t1.AlphaSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.AlphaDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.AlphaBlendFunction = Microsoft.Xna.Framework.Graphics.BlendFunction.Min, $t1), $t);
                },
                BlendLighten: function () {
                    var $t, $t1;
                    return ($t = new MyONez.Graphics.Materials.Material(), $t.BlendState = ($t1 = new Microsoft.Xna.Framework.Graphics.BlendState.ctor(), $t1.ColorSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.ColorDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.ColorBlendFunction = Microsoft.Xna.Framework.Graphics.BlendFunction.Max, $t1.AlphaSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.AlphaDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.AlphaBlendFunction = Microsoft.Xna.Framework.Graphics.BlendFunction.Max, $t1), $t);
                },
                BlendScreen: function () {
                    var $t, $t1;
                    return ($t = new MyONez.Graphics.Materials.Material(), $t.BlendState = ($t1 = new Microsoft.Xna.Framework.Graphics.BlendState.ctor(), $t1.ColorSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.InverseDestinationColor, $t1.ColorDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.ColorBlendFunction = Microsoft.Xna.Framework.Graphics.BlendFunction.Add, $t1), $t);
                },
                BlendMultiply: function () {
                    var $t, $t1;
                    return ($t = new MyONez.Graphics.Materials.Material(), $t.BlendState = ($t1 = new Microsoft.Xna.Framework.Graphics.BlendState.ctor(), $t1.ColorSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.DestinationColor, $t1.ColorDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.Zero, $t1.ColorBlendFunction = Microsoft.Xna.Framework.Graphics.BlendFunction.Add, $t1.AlphaSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.DestinationAlpha, $t1.AlphaDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.Zero, $t1.AlphaBlendFunction = Microsoft.Xna.Framework.Graphics.BlendFunction.Add, $t1), $t);
                },
                BlendMultiply2X: function () {
                    var $t, $t1;
                    return ($t = new MyONez.Graphics.Materials.Material(), $t.BlendState = ($t1 = new Microsoft.Xna.Framework.Graphics.BlendState.ctor(), $t1.ColorSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.DestinationColor, $t1.ColorDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.SourceColor, $t1.ColorBlendFunction = Microsoft.Xna.Framework.Graphics.BlendFunction.Add, $t1), $t);
                },
                BlendLinearDodge: function () {
                    var $t, $t1;
                    return ($t = new MyONez.Graphics.Materials.Material(), $t.BlendState = ($t1 = new Microsoft.Xna.Framework.Graphics.BlendState.ctor(), $t1.ColorSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.ColorDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.ColorBlendFunction = Microsoft.Xna.Framework.Graphics.BlendFunction.Add, $t1), $t);
                },
                BlendLinearBurn: function () {
                    var $t, $t1;
                    return ($t = new MyONez.Graphics.Materials.Material(), $t.BlendState = ($t1 = new Microsoft.Xna.Framework.Graphics.BlendState.ctor(), $t1.ColorSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.ColorDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.ColorBlendFunction = Microsoft.Xna.Framework.Graphics.BlendFunction.ReverseSubtract, $t1), $t);
                },
                BlendDifference: function () {
                    var $t, $t1;
                    return ($t = new MyONez.Graphics.Materials.Material(), $t.BlendState = ($t1 = new Microsoft.Xna.Framework.Graphics.BlendState.ctor(), $t1.ColorSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.InverseDestinationColor, $t1.ColorDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.InverseSourceColor, $t1.ColorBlendFunction = Microsoft.Xna.Framework.Graphics.BlendFunction.Add, $t1), $t);
                },
                BlendSubtractive: function () {
                    var $t, $t1;
                    return ($t = new MyONez.Graphics.Materials.Material(), $t.BlendState = ($t1 = new Microsoft.Xna.Framework.Graphics.BlendState.ctor(), $t1.ColorSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.SourceAlpha, $t1.ColorDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.ColorBlendFunction = Microsoft.Xna.Framework.Graphics.BlendFunction.ReverseSubtract, $t1.AlphaSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.SourceAlpha, $t1.AlphaDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.AlphaBlendFunction = Microsoft.Xna.Framework.Graphics.BlendFunction.ReverseSubtract, $t1), $t);
                },
                BlendAdditive: function () {
                    var $t, $t1;
                    return ($t = new MyONez.Graphics.Materials.Material(), $t.BlendState = ($t1 = new Microsoft.Xna.Framework.Graphics.BlendState.ctor(), $t1.ColorSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.SourceAlpha, $t1.ColorDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1.AlphaSourceBlend = Microsoft.Xna.Framework.Graphics.Blend.SourceAlpha, $t1.AlphaDestinationBlend = Microsoft.Xna.Framework.Graphics.Blend.One, $t1), $t);
                }
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.RenderProcessors.BloomRenderProcessor", {
        inherits: [MyONez.Graphics.RenderProcessors.RenderProcessor,MyONez.ECS.IScreenResolutionChangedListener],
        fields: {
            bloomCombineEffect: null,
            bloomExtractEffect: null,
            gaussianBlurEffect: null,
            renderTarget1: null,
            renderTarget2: null,
            renderTargetScale: 0,
            scene: null,
            sceneRenderTarget: null,
            settings: null
        },
        props: {
            Settings: {
                get: function () {
                    return this.settings;
                },
                set: function (value) {
                    this.SetBloomSettings(value);
                }
            },
            RenderTargetScale: {
                get: function () {
                    return this.renderTargetScale;
                },
                set: function (value) {
                    if (this.renderTargetScale === value) {
                        return;
                    }

                    this.renderTargetScale = value;
                    this.UpdateBlurEffectDeltas();
                }
            }
        },
        alias: ["SceneBackBufferSizeChanged", "MyONez$ECS$IScreenResolutionChangedListener$SceneBackBufferSizeChanged"],
        ctors: {
            init: function () {
                this.sceneRenderTarget = new Microsoft.Xna.Framework.Rectangle();
                this.renderTargetScale = 1.0;
            },
            ctor: function (executionOrder) {
                this.$initialize();
                MyONez.Graphics.RenderProcessors.RenderProcessor.ctor.call(this, executionOrder);
                this.settings = MyONez.AdditionalContent.RenderProcessors.BloomRenderProcessor.BloomSettings.PresetSettings[System.Array.index(3, MyONez.AdditionalContent.RenderProcessors.BloomRenderProcessor.BloomSettings.PresetSettings)];
            }
        },
        methods: {
            SceneBackBufferSizeChanged: function (realRenderTarget, sceneRenderTarget) {
                this.sceneRenderTarget = sceneRenderTarget.$clone();
                this.UpdateBlurEffectDeltas();
            },
            OnAddedToScene: function (scene) {
                this.scene = scene;
                this.bloomExtractEffect = this.scene.Content.Load(MyONez.AdditionalContent.Effects.BloomExtractEffect, MyONez.AdditionalContent.Effects.BloomExtractEffect.EffectAssetName);
                this.bloomCombineEffect = this.scene.Content.Load(MyONez.AdditionalContent.Effects.BloomCombineEffect, MyONez.AdditionalContent.Effects.BloomCombineEffect.EffectAssetName);
                this.gaussianBlurEffect = this.scene.Content.Load(MyONez.AdditionalContent.Effects.GaussianBlurEffect, MyONez.AdditionalContent.Effects.GaussianBlurEffect.EffectAssetName);

                this.SetBloomSettings(this.settings);
            },
            SetBloomSettings: function (settings) {
                this.settings = settings;

                this.bloomExtractEffect.BloomThreshold = this.settings.Threshold;

                this.bloomCombineEffect.BloomIntensity = this.settings.Intensity;
                this.bloomCombineEffect.BaseIntensity = this.settings.BaseIntensity;
                this.bloomCombineEffect.BloomSaturation = this.settings.Saturation;
                this.bloomCombineEffect.BaseSaturation = this.settings.BaseSaturation;

                this.gaussianBlurEffect.BlurAmount = this.settings.BlurAmount;
            },
            UpdateBlurEffectDeltas: function () {
                if (this.sceneRenderTarget.Width === 0 || this.sceneRenderTarget.Height === 0) {
                    return;
                }

                this.gaussianBlurEffect.HorizontalBlurDelta = 1.0 / (this.sceneRenderTarget.Width * this.renderTargetScale);
                this.gaussianBlurEffect.VerticalBlurDelta = 1.0 / (this.sceneRenderTarget.Height * this.renderTargetScale);

                this.renderTarget1 != null ? this.renderTarget1.Dispose() : null;
                this.renderTarget1 = new Microsoft.Xna.Framework.Graphics.RenderTarget2D.$ctor2(MyONez.Core.Instance.GraphicsDevice, Bridge.Int.clip32(this.sceneRenderTarget.Width * this.renderTargetScale), Bridge.Int.clip32(this.sceneRenderTarget.Height * this.renderTargetScale), false, MyONez.Core.Instance.Screen.BackBufferFormat, Microsoft.Xna.Framework.Graphics.DepthFormat.None, 0, Microsoft.Xna.Framework.Graphics.RenderTargetUsage.PreserveContents);
                this.renderTarget2 != null ? this.renderTarget2.Dispose() : null;
                this.renderTarget2 = new Microsoft.Xna.Framework.Graphics.RenderTarget2D.$ctor2(MyONez.Core.Instance.GraphicsDevice, Bridge.Int.clip32(this.sceneRenderTarget.Width * this.renderTargetScale), Bridge.Int.clip32(this.sceneRenderTarget.Height * this.renderTargetScale), false, MyONez.Core.Instance.Screen.BackBufferFormat, Microsoft.Xna.Framework.Graphics.DepthFormat.None, 0, Microsoft.Xna.Framework.Graphics.RenderTargetUsage.PreserveContents);
            },
            Render: function (source, destination) {
                this.DrawFullScreenQuad(source, this.renderTarget1, this.bloomExtractEffect);

                this.gaussianBlurEffect.PrepareForHorizontalBlur();
                this.DrawFullScreenQuad(this.renderTarget1, this.renderTarget2, this.gaussianBlurEffect);

                this.gaussianBlurEffect.PrepareForVerticalBlur();
                this.DrawFullScreenQuad(this.renderTarget2, this.renderTarget1, this.gaussianBlurEffect);

                MyONez.Core.Instance.GraphicsDevice.SamplerStates.setItem(1, Microsoft.Xna.Framework.Graphics.SamplerState.LinearClamp);
                this.bloomCombineEffect.BaseMap = source;
                this.DrawFullScreenQuad(this.renderTarget1, destination, this.bloomCombineEffect);
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.RenderProcessors.BloomRenderProcessor.BloomSettings", {
        $kind: "nested class",
        statics: {
            fields: {
                PresetSettings: null
            },
            ctors: {
                init: function () {
                    this.PresetSettings = System.Array.init([
                        new MyONez.AdditionalContent.RenderProcessors.BloomRenderProcessor.BloomSettings(0.1, 0.6, 2.0, 1.0, 1, 0), 
                        new MyONez.AdditionalContent.RenderProcessors.BloomRenderProcessor.BloomSettings(0, 3, 1, 1, 1, 1), 
                        new MyONez.AdditionalContent.RenderProcessors.BloomRenderProcessor.BloomSettings(0.5, 8, 2, 1, 0, 1), 
                        new MyONez.AdditionalContent.RenderProcessors.BloomRenderProcessor.BloomSettings(0.25, 8, 1.3, 1, 1, 0), 
                        new MyONez.AdditionalContent.RenderProcessors.BloomRenderProcessor.BloomSettings(0, 2, 1, 0.1, 1, 1), 
                        new MyONez.AdditionalContent.RenderProcessors.BloomRenderProcessor.BloomSettings(0.5, 2, 1, 1, 1, 1)
                    ], MyONez.AdditionalContent.RenderProcessors.BloomRenderProcessor.BloomSettings);
                }
            }
        },
        fields: {
            BaseIntensity: 0,
            BaseSaturation: 0,
            BlurAmount: 0,
            Intensity: 0,
            Saturation: 0,
            Threshold: 0
        },
        ctors: {
            ctor: function (bloomThreshold, blurAmount, bloomIntensity, baseIntensity, bloomSaturation, baseSaturation) {
                this.$initialize();
                this.Threshold = bloomThreshold;
                this.BlurAmount = blurAmount;
                this.Intensity = bloomIntensity;
                this.BaseIntensity = baseIntensity;
                this.Saturation = bloomSaturation;
                this.BaseSaturation = baseSaturation;
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Scenes.LoadingData", {
        props: {
            Count: 0,
            Enumerator: null
        }
    });

    Bridge.define("MyONez.AdditionalContent.Scenes.LoadingScene$1", function (T) { return {
        inherits: [MyONez.ECS.Scene],
        ctors: {
            ctor: function (loadings, width, height) {
                this.$initialize();
                MyONez.ECS.Scene.ctor.call(this);
                this.SetDesignResolution(width, height, MyONez.Graphics.ResolutionPolicy.SceneResolutionPolicy.None);
                MyONez.Core.Instance.Screen.SetSize(width, height);
                this.AddRenderer(MyONez.Graphics.Renderers.DefaultRenderer, new MyONez.Graphics.Renderers.DefaultRenderer());

                var progress = this.CreateEntity("progress");
                var progressComponent = progress.AddComponent(MyONez.AdditionalContent.Scenes.LoadingScene$1.ProgressComponent(T));
                progressComponent.Total = System.Linq.Enumerable.from(loadings).sum($asm.$.MyONez.AdditionalContent.Scenes.LoadingScene$1.f1);

                this.AddEntitySystem(new (MyONez.AdditionalContent.Scenes.LoadingScene$1.LoadElementUpdateSystem(T))(loadings, progressComponent));
                this.AddEntitySystem(new (MyONez.AdditionalContent.Scenes.LoadingScene$1.ProgressMeshGeneratorSystem(T))());
            }
        }
    }; });

    Bridge.ns("MyONez.AdditionalContent.Scenes.LoadingScene$1", $asm.$);

    Bridge.apply($asm.$.MyONez.AdditionalContent.Scenes.LoadingScene$1, {
        f1: function (a) {
            return a.Count;
        }
    });

    Bridge.define("MyONez.AdditionalContent.Scenes.LoadingScene$1.LoadElementUpdateSystem", function (T) { return {
        inherits: [LocomotorECS.EntitySystem],
        $kind: "nested class",
        fields: {
            loadings: null,
            progress: null,
            currentLoading: 0
        },
        ctors: {
            ctor: function (loadings, progress) {
                this.$initialize();
                LocomotorECS.EntitySystem.ctor.call(this);
                this.loadings = loadings;
                this.progress = progress;
            }
        },
        methods: {
            DoAction: function (gameTime) {
                LocomotorECS.EntitySystem.prototype.DoAction.call(this, gameTime);
                if (this.loadings.Count === this.currentLoading) {
                    MyONez.Core.Instance.SwitchScene(Bridge.createInstance(T));
                    return;
                }

                var enumerator = this.loadings.getItem(this.currentLoading).Enumerator;
                if (!enumerator.System$Collections$IEnumerator$moveNext()) {
                    this.currentLoading = (this.currentLoading + 1) | 0;
                    return;
                }

                this.progress.Current = (this.progress.Current + 1) | 0;
            }
        }
    }; });

    Bridge.define("MyONez.AdditionalContent.Scenes.LoadingScene$1.ProgressComponent", function (T) { return {
        inherits: [LocomotorECS.Component],
        $kind: "nested class",
        fields: {
            Current: 0,
            Total: 0
        }
    }; });

    Bridge.define("MyONez.AdditionalContent.Scenes.LoadingScene$1.ProgressMeshGeneratorSystem", function (T) { return {
        inherits: [LocomotorECS.EntityProcessingSystem],
        $kind: "nested class",
        ctors: {
            ctor: function () {
                this.$initialize();
                LocomotorECS.EntityProcessingSystem.ctor.call(this, new LocomotorECS.Matching.Matcher().All([MyONez.AdditionalContent.Scenes.LoadingScene$1.ProgressComponent(T)]));
            }
        },
        methods: {
            DoAction$1: function (entity, gameTime) {
                LocomotorECS.EntityProcessingSystem.prototype.DoAction$1.call(this, entity, gameTime);
                var progress = entity.GetComponent(MyONez.AdditionalContent.Scenes.LoadingScene$1.ProgressComponent(T));
                var finalRender = entity.GetOrCreateComponent(MyONez.ECS.Components.FinalRenderComponent);

                finalRender.Batch.Clear();

                finalRender.Batch.Draw(MyONez.Graphics.Graphic.PixelTexture, new MyONez.Maths.RectangleF.$ctor2(99, ((MyONez.Core.Instance.Screen.Height - 101) | 0), ((MyONez.Core.Instance.Screen.Width - 198) | 0), 52), MyONez.Maths.RectangleF.op_Implicit$1(MyONez.Graphics.Graphic.PixelTexture.Bounds.$clone()), Microsoft.Xna.Framework.Color.Black.$clone());

                finalRender.Batch.Draw(MyONez.Graphics.Graphic.PixelTexture, new MyONez.Maths.RectangleF.$ctor2(100, ((MyONez.Core.Instance.Screen.Height - 100) | 0), progress.Current * (MyONez.Core.Instance.Screen.Width - 200.0) / progress.Total, 50), MyONez.Maths.RectangleF.op_Implicit$1(MyONez.Graphics.Graphic.PixelTexture.Bounds.$clone()), Microsoft.Xna.Framework.Color.White.$clone());
            }
        }
    }; });

    Bridge.define("MyONez.AdditionalContent.SceneTransitions.CinematicLetterboxTransition", {
        inherits: [MyONez.Graphics.Transitions.SceneTransition],
        fields: {
            tmpContentManager: null
        },
        props: {
            Duration: 0,
            Color: {
                get: function () {
                    return Bridge.cast(this.Effect, MyONez.AdditionalContent.Effects.LetterboxEffect).Color.$clone();
                },
                set: function (value) {
                    Bridge.cast(this.Effect, MyONez.AdditionalContent.Effects.LetterboxEffect).Color = value.$clone();
                }
            },
            LetterboxSize: {
                get: function () {
                    return Bridge.cast(this.Effect, MyONez.AdditionalContent.Effects.LetterboxEffect).LetterboxSize;
                },
                set: function (value) {
                    Bridge.cast(this.Effect, MyONez.AdditionalContent.Effects.LetterboxEffect).LetterboxSize = value;
                }
            }
        },
        ctors: {
            init: function () {
                this.tmpContentManager = new MyONez.XnaManagers.GlobalContentManager();
                this.Duration = 2;
            },
            ctor: function () {
                this.$initialize();
                MyONez.Graphics.Transitions.SceneTransition.ctor.call(this);
                this.Effect = this.tmpContentManager.Load(MyONez.AdditionalContent.Effects.LetterboxEffect, MyONez.AdditionalContent.Effects.LetterboxEffect.EffectAssetName);
            }
        },
        methods: {
            OnBeginTransition: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    startAt,
                    elapsed,
                    elapsed1,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    startAt = System.DateTime.getNow();
                                    $step = 1;
                                    continue;
                                }
                                case 1: {
                                    if ( (System.DateTime.subdd(System.DateTime.getNow(), startAt)).getTotalSeconds() < this.Duration / 2 ) {
                                            $step = 2;
                                            continue;
                                        } 
                                        $step = 4;
                                        continue;
                                }
                                case 2: {
                                    elapsed = (System.DateTime.subdd(System.DateTime.getNow(), startAt)).getTotalSeconds();
                                        this.LetterboxSize = MyONez.Maths.Easing.Lerps.Ease$8(MyONez.Maths.Easing.EaseType.ExpoIn, 0, this.PreviousSceneRender.Bounds.Height, elapsed, this.Duration / 2);
                                        $enumerator.current = null;
                                        $step = 3;
                                        return true;
                                }
                                case 3: {
                                    
                                        $step = 1;
                                        continue;
                                }
                                case 4: {
                                    this.SetNextScene();

                                        startAt = System.DateTime.getNow();
                                    $step = 5;
                                    continue;
                                }
                                case 5: {
                                    if ( (System.DateTime.subdd(System.DateTime.getNow(), startAt)).getTotalSeconds() < this.Duration / 2 ) {
                                            $step = 6;
                                            continue;
                                        } 
                                        $step = 8;
                                        continue;
                                }
                                case 6: {
                                    elapsed1 = (System.DateTime.subdd(System.DateTime.getNow(), startAt)).getTotalSeconds();
                                        this.LetterboxSize = MyONez.Maths.Easing.Lerps.Ease$8(MyONez.Maths.Easing.EaseType.ExpoOut, this.PreviousSceneRender.Bounds.Height, 0, elapsed1, this.Duration / 2);
                                        $enumerator.current = null;
                                        $step = 7;
                                        return true;
                                }
                                case 7: {
                                    
                                        $step = 5;
                                        continue;
                                }
                                case 8: {
                                    this.TransitionComplete();

                                        // cleanup
                                        this.tmpContentManager.Unload();

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.SceneTransitions.FadeTransition", {
        inherits: [MyONez.Graphics.Transitions.SceneTransition],
        fields: {
            DelayBeforeFadeInDuration: 0,
            FadeEaseType: 0,
            FadeInDuration: 0,
            FadeOutDuration: 0,
            FadeToColor: null,
            fromColor: null,
            toColor: null,
            color: null
        },
        ctors: {
            init: function () {
                this.FadeToColor = new Microsoft.Xna.Framework.Color();
                this.fromColor = new Microsoft.Xna.Framework.Color();
                this.toColor = new Microsoft.Xna.Framework.Color();
                this.color = new Microsoft.Xna.Framework.Color();
                this.DelayBeforeFadeInDuration = 0.2;
                this.FadeEaseType = MyONez.Maths.Easing.EaseType.Linear;
                this.FadeInDuration = 0.8;
                this.FadeOutDuration = 0.8;
                this.FadeToColor = Microsoft.Xna.Framework.Color.Black.$clone();
                this.fromColor = Microsoft.Xna.Framework.Color.White.$clone();
                this.toColor = Microsoft.Xna.Framework.Color.Transparent.$clone();
            }
        },
        methods: {
            OnBeginTransition: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    startAt,
                    elapsed,
                    elapsed1,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    startAt = System.DateTime.getNow();
                                    $step = 1;
                                    continue;
                                }
                                case 1: {
                                    if ( (System.DateTime.subdd(System.DateTime.getNow(), startAt)).getTotalSeconds() < this.FadeOutDuration ) {
                                            $step = 2;
                                            continue;
                                        } 
                                        $step = 4;
                                        continue;
                                }
                                case 2: {
                                    elapsed = (System.DateTime.subdd(System.DateTime.getNow(), startAt)).getTotalSeconds();
                                        this.color = MyONez.Maths.Easing.Lerps.Ease$1(this.FadeEaseType, Bridge.ref(this, "fromColor"), Bridge.ref(this, "toColor"), elapsed, this.FadeOutDuration);

                                        $enumerator.current = null;
                                        $step = 3;
                                        return true;
                                }
                                case 3: {
                                    
                                        $step = 1;
                                        continue;
                                }
                                case 4: {
                                    this.SetNextScene();

                                        $enumerator.current = MyONez.GlobalManagers.Coroutines.DefaultCoroutines.Wait(this.DelayBeforeFadeInDuration);
                                        $step = 5;
                                        return true;
                                }
                                case 5: {
                                    startAt = System.DateTime.getNow();
                                    $step = 6;
                                    continue;
                                }
                                case 6: {
                                    if ( (System.DateTime.subdd(System.DateTime.getNow(), startAt)).getTotalSeconds() < this.FadeInDuration ) {
                                            $step = 7;
                                            continue;
                                        } 
                                        $step = 9;
                                        continue;
                                }
                                case 7: {
                                    elapsed1 = (System.DateTime.subdd(System.DateTime.getNow(), startAt)).getTotalSeconds();
                                        this.color = MyONez.Maths.Easing.Lerps.Ease$1(MyONez.Maths.Easing.EaseHelper.OppositeEaseType(this.FadeEaseType), Bridge.ref(this, "toColor"), Bridge.ref(this, "fromColor"), elapsed1, this.FadeInDuration);

                                        $enumerator.current = null;
                                        $step = 8;
                                        return true;
                                }
                                case 8: {
                                    
                                        $step = 6;
                                        continue;
                                }
                                case 9: {
                                    this.TransitionComplete();

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            },
            Render: function () {
                this.Batch.Clear();
                this.Batch.Draw(this.PreviousSceneRender, MyONez.Maths.RectangleF.op_Implicit$1(this.PreviousSceneRender.Bounds.$clone()), MyONez.Maths.RectangleF.op_Implicit$1(this.PreviousSceneRender.Bounds.$clone()), this.color.$clone(), 0);

                this.Material.Effect = this.Effect;

                MyONez.Graphics.Graphic.Draw(null, Microsoft.Xna.Framework.Color.Black.$clone(), this.Batch, this.Material);
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.SceneTransitions.SquaresTransition", {
        inherits: [MyONez.Graphics.Transitions.SceneTransition],
        fields: {
            tmpContentManager: null,
            DelayBeforeSquaresInDuration: 0,
            EaseType: 0,
            SquaresInDuration: 0,
            SquaresOutDuration: 0
        },
        props: {
            SquareColor: {
                set: function (value) {
                    Bridge.cast(this.Effect, MyONez.AdditionalContent.Effects.SquaresEffect).Color = value.$clone();
                }
            },
            Smoothness: {
                set: function (value) {
                    Bridge.cast(this.Effect, MyONez.AdditionalContent.Effects.SquaresEffect).Smoothness = value;
                }
            },
            Size: {
                set: function (value) {
                    Bridge.cast(this.Effect, MyONez.AdditionalContent.Effects.SquaresEffect).Size = value.$clone();
                }
            }
        },
        ctors: {
            init: function () {
                this.tmpContentManager = new MyONez.XnaManagers.GlobalContentManager();
                this.DelayBeforeSquaresInDuration = 0;
                this.EaseType = MyONez.Maths.Easing.EaseType.QuartOut;
                this.SquaresInDuration = 0.6;
                this.SquaresOutDuration = 0.6;
            },
            ctor: function () {
                this.$initialize();
                MyONez.Graphics.Transitions.SceneTransition.ctor.call(this);
                this.Effect = this.tmpContentManager.Load(MyONez.AdditionalContent.Effects.SquaresEffect, MyONez.AdditionalContent.Effects.SquaresEffect.EffectAssetName);
                this.SquareColor = Microsoft.Xna.Framework.Color.Black.$clone();
                this.Smoothness = 0.5;

                var aspectRatio = MyONez.Core.Instance.Screen.Width / MyONez.Core.Instance.Screen.Height;
                this.Size = new Microsoft.Xna.Framework.Vector2.$ctor2(30, 30 / aspectRatio);
            }
        },
        methods: {
            OnBeginTransition: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    $enumerator.current = this.TickEffectProgressProperty(Bridge.cast(this.Effect, MyONez.AdditionalContent.Effects.SquaresEffect), this.SquaresInDuration, this.EaseType);
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    this.SetNextScene();

                                        $enumerator.current = MyONez.GlobalManagers.Coroutines.DefaultCoroutines.Wait(this.DelayBeforeSquaresInDuration);
                                        $step = 2;
                                        return true;
                                }
                                case 2: {
                                    $enumerator.current = this.TickEffectProgressProperty(Bridge.cast(this.Effect, MyONez.AdditionalContent.Effects.SquaresEffect), this.SquaresOutDuration, MyONez.Maths.Easing.EaseHelper.OppositeEaseType(this.EaseType), true);
                                        $step = 3;
                                        return true;
                                }
                                case 3: {
                                    this.TransitionComplete();

                                        // cleanup
                                        this.Effect.Dispose();
                                        this.tmpContentManager.Unload();

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            }
        }
    });

    /** @namespace MyONez.AdditionalContent.SceneTransitions */

    /**
     * Uses a texture (TransitionTexture) to control a wipe animation. The blue channel of the texture determines if color
         is shown or the previous scenes render. Sample textures are based on: https://www.youtube.com/watch?v=LnAoD7hgDxw
     *
     * @public
     * @class MyONez.AdditionalContent.SceneTransitions.TextureWipeTransition
     * @augments MyONez.Graphics.Transitions.SceneTransition
     */
    Bridge.define("MyONez.AdditionalContent.SceneTransitions.TextureWipeTransition", {
        inherits: [MyONez.Graphics.Transitions.SceneTransition],
        fields: {
            tmpContentManager: null,
            Duration: 0,
            EaseType: 0
        },
        props: {
            Opacity: {
                set: function (value) {
                    Bridge.cast(this.Effect, MyONez.AdditionalContent.Effects.TextureWipeEffect).Opacity = value;
                }
            },
            WipeColor: {
                set: function (value) {
                    Bridge.cast(this.Effect, MyONez.AdditionalContent.Effects.TextureWipeEffect).Color = value.$clone();
                }
            },
            TransitionTexture: {
                set: function (value) {
                    Bridge.cast(this.Effect, MyONez.AdditionalContent.Effects.TextureWipeEffect).Texture = value;
                }
            },
            UseRedGreenChannelsForDistortion: {
                set: function (value) {
                    this.Effect.CurrentTechnique = this.Effect.Techniques.getItem$1(value ? "TextureWipeWithDistort" : "TextureWipe");
                }
            }
        },
        ctors: {
            init: function () {
                this.tmpContentManager = new MyONez.XnaManagers.GlobalContentManager();
                this.Duration = 1.0;
                this.EaseType = MyONez.Maths.Easing.EaseType.Linear;
            },
            /**
             * Examples for textures can be found here:
                 ContentPaths.Textures.TextureWipeTransition.*
             *
             * @instance
             * @public
             * @this MyONez.AdditionalContent.SceneTransitions.TextureWipeTransition
             * @memberof MyONez.AdditionalContent.SceneTransitions.TextureWipeTransition
             * @param   {Microsoft.Xna.Framework.Graphics.Texture2D}    transitionTexture
             * @return  {void}
             */
            ctor: function (transitionTexture) {
                this.$initialize();
                MyONez.Graphics.Transitions.SceneTransition.ctor.call(this);
                this.Effect = this.tmpContentManager.Load(MyONez.AdditionalContent.Effects.TextureWipeEffect, MyONez.AdditionalContent.Effects.TextureWipeEffect.EffectAssetName);
                this.Opacity = 1.0;
                this.WipeColor = Microsoft.Xna.Framework.Color.Black.$clone();
                this.TransitionTexture = transitionTexture;
            }
        },
        methods: {
            OnBeginTransition: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    $enumerator.current = this.TickEffectProgressProperty(Bridge.cast(this.Effect, MyONez.AdditionalContent.Effects.TextureWipeEffect), this.Duration, this.EaseType);
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    this.SetNextScene();

                                        this.TransitionComplete();

                                        this.tmpContentManager.Unload();

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.SceneTransitions.TransformTransition", {
        inherits: [MyONez.Graphics.Transitions.SceneTransition],
        fields: {
            destinationRect: null,
            Duration: 0,
            finalRenderRect: null,
            TransitionEaseType: 0
        },
        ctors: {
            init: function () {
                this.destinationRect = new Microsoft.Xna.Framework.Rectangle();
                this.finalRenderRect = new Microsoft.Xna.Framework.Rectangle();
                this.Duration = 1.0;
                this.TransitionEaseType = MyONez.Maths.Easing.EaseType.QuartIn;
            },
            ctor: function (transitionType) {
                if (transitionType === void 0) { transitionType = 0; }

                this.$initialize();
                MyONez.Graphics.Transitions.SceneTransition.ctor.call(this);
                this.destinationRect = this.PreviousSceneRender.Bounds.$clone();

                switch (transitionType) {
                    case MyONez.AdditionalContent.SceneTransitions.TransformTransition.TransformTransitionType.ZoomOut: 
                        this.finalRenderRect = new Microsoft.Xna.Framework.Rectangle.$ctor2(((Bridge.Int.div(MyONez.Core.Instance.Screen.Width, 2)) | 0), ((Bridge.Int.div(MyONez.Core.Instance.Screen.Height, 2)) | 0), 0, 0);
                        break;
                    case MyONez.AdditionalContent.SceneTransitions.TransformTransition.TransformTransitionType.ZoomIn: 
                        this.finalRenderRect = new Microsoft.Xna.Framework.Rectangle.$ctor2(Bridge.Int.mul(((-MyONez.Core.Instance.Screen.Width) | 0), 5), Bridge.Int.mul(((-MyONez.Core.Instance.Screen.Height) | 0), 5), Bridge.Int.mul(this.destinationRect.Width, 10), Bridge.Int.mul(this.destinationRect.Height, 10));
                        break;
                    case MyONez.AdditionalContent.SceneTransitions.TransformTransition.TransformTransitionType.SlideRight: 
                        this.finalRenderRect = new Microsoft.Xna.Framework.Rectangle.$ctor2(MyONez.Core.Instance.Screen.Width, 0, this.destinationRect.Width, this.destinationRect.Height);
                        break;
                    case MyONez.AdditionalContent.SceneTransitions.TransformTransition.TransformTransitionType.SlideLeft: 
                        this.finalRenderRect = new Microsoft.Xna.Framework.Rectangle.$ctor2(((-MyONez.Core.Instance.Screen.Width) | 0), 0, this.destinationRect.Width, this.destinationRect.Height);
                        break;
                    case MyONez.AdditionalContent.SceneTransitions.TransformTransition.TransformTransitionType.SlideUp: 
                        this.finalRenderRect = new Microsoft.Xna.Framework.Rectangle.$ctor2(0, ((-MyONez.Core.Instance.Screen.Height) | 0), this.destinationRect.Width, this.destinationRect.Height);
                        break;
                    case MyONez.AdditionalContent.SceneTransitions.TransformTransition.TransformTransitionType.SlideDown: 
                        this.finalRenderRect = new Microsoft.Xna.Framework.Rectangle.$ctor2(0, MyONez.Core.Instance.Screen.Height, this.destinationRect.Width, this.destinationRect.Height);
                        break;
                    case MyONez.AdditionalContent.SceneTransitions.TransformTransition.TransformTransitionType.SlideBottomRight: 
                        this.finalRenderRect = new Microsoft.Xna.Framework.Rectangle.$ctor2(MyONez.Core.Instance.Screen.Width, MyONez.Core.Instance.Screen.Height, this.destinationRect.Width, this.destinationRect.Height);
                        break;
                    case MyONez.AdditionalContent.SceneTransitions.TransformTransition.TransformTransitionType.SlideBottomLeft: 
                        this.finalRenderRect = new Microsoft.Xna.Framework.Rectangle.$ctor2(((-MyONez.Core.Instance.Screen.Width) | 0), MyONez.Core.Instance.Screen.Height, this.destinationRect.Width, this.destinationRect.Height);
                        break;
                    case MyONez.AdditionalContent.SceneTransitions.TransformTransition.TransformTransitionType.SlideTopRight: 
                        this.finalRenderRect = new Microsoft.Xna.Framework.Rectangle.$ctor2(MyONez.Core.Instance.Screen.Width, ((-MyONez.Core.Instance.Screen.Height) | 0), this.destinationRect.Width, this.destinationRect.Height);
                        break;
                    case MyONez.AdditionalContent.SceneTransitions.TransformTransition.TransformTransitionType.SlideTopLeft: 
                        this.finalRenderRect = new Microsoft.Xna.Framework.Rectangle.$ctor2(((-MyONez.Core.Instance.Screen.Width) | 0), ((-MyONez.Core.Instance.Screen.Height) | 0), this.destinationRect.Width, this.destinationRect.Height);
                        break;
                }
            }
        },
        methods: {
            OnBeginTransition: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    startAt,
                    elapsed,
                    elapsed1,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    $enumerator.current = null;
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    startAt = System.DateTime.getNow();
                                    $step = 2;
                                    continue;
                                }
                                case 2: {
                                    if ( (System.DateTime.subdd(System.DateTime.getNow(), startAt)).getTotalSeconds() < this.Duration ) {
                                            $step = 3;
                                            continue;
                                        } 
                                        $step = 5;
                                        continue;
                                }
                                case 3: {
                                    elapsed = (System.DateTime.subdd(System.DateTime.getNow(), startAt)).getTotalSeconds();
                                        this.destinationRect = MyONez.Maths.Easing.Lerps.Ease$3(this.TransitionEaseType, this.PreviousSceneRender.Bounds.$clone(), this.finalRenderRect.$clone(), elapsed, this.Duration);

                                        $enumerator.current = null;
                                        $step = 4;
                                        return true;
                                }
                                case 4: {
                                    
                                        $step = 2;
                                        continue;
                                }
                                case 5: {
                                    this.SetNextScene();

                                        startAt = System.DateTime.getNow();
                                    $step = 6;
                                    continue;
                                }
                                case 6: {
                                    if ( (System.DateTime.subdd(System.DateTime.getNow(), startAt)).getTotalSeconds() < this.Duration ) {
                                            $step = 7;
                                            continue;
                                        } 
                                        $step = 9;
                                        continue;
                                }
                                case 7: {
                                    elapsed1 = (System.DateTime.subdd(System.DateTime.getNow(), startAt)).getTotalSeconds();
                                        this.destinationRect = MyONez.Maths.Easing.Lerps.Ease$3(this.TransitionEaseType, this.finalRenderRect.$clone(), this.PreviousSceneRender.Bounds.$clone(), elapsed1, this.Duration);

                                        $enumerator.current = null;
                                        $step = 8;
                                        return true;
                                }
                                case 8: {
                                    
                                        $step = 6;
                                        continue;
                                }
                                case 9: {
                                    this.TransitionComplete();

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            },
            Render: function () {
                this.Batch.Clear();
                this.Batch.Draw(this.PreviousSceneRender, MyONez.Maths.RectangleF.op_Implicit$1(this.destinationRect.$clone()), MyONez.Maths.RectangleF.op_Implicit$1(this.PreviousSceneRender.Bounds.$clone()), Microsoft.Xna.Framework.Color.White.$clone(), 0);
                this.Material.Effect = this.Effect;

                MyONez.Graphics.Graphic.Draw(null, Microsoft.Xna.Framework.Color.Black.$clone(), this.Batch, this.Material);
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.SceneTransitions.TransformTransition.TransformTransitionType", {
        $kind: "nested enum",
        statics: {
            fields: {
                ZoomOut: 0,
                ZoomIn: 1,
                SlideRight: 2,
                SlideLeft: 3,
                SlideUp: 4,
                SlideDown: 5,
                SlideBottomRight: 6,
                SlideBottomLeft: 7,
                SlideTopRight: 8,
                SlideTopLeft: 9
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.SceneTransitions.WindTransition", {
        inherits: [MyONez.Graphics.Transitions.SceneTransition],
        fields: {
            tmpContentManager: null,
            Duration: 0,
            EaseType: 0
        },
        props: {
            WindSegments: {
                set: function (value) {
                    Bridge.cast(this.Effect, MyONez.AdditionalContent.Effects.WindEffect).Segments = value;
                }
            },
            Size: {
                set: function (value) {
                    Bridge.cast(this.Effect, MyONez.AdditionalContent.Effects.WindEffect).Size = value;
                }
            }
        },
        ctors: {
            init: function () {
                this.tmpContentManager = new MyONez.XnaManagers.GlobalContentManager();
                this.Duration = 1.0;
                this.EaseType = MyONez.Maths.Easing.EaseType.QuartOut;
            },
            ctor: function () {
                this.$initialize();
                MyONez.Graphics.Transitions.SceneTransition.ctor.call(this);
                this.Effect = this.tmpContentManager.Load(MyONez.AdditionalContent.Effects.WindEffect, MyONez.AdditionalContent.Effects.WindEffect.EffectAssetName);
                this.Size = 0.3;
                this.WindSegments = 100;
            }
        },
        methods: {
            OnBeginTransition: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    $enumerator.current = this.TickEffectProgressProperty(Bridge.cast(this.Effect, MyONez.AdditionalContent.Effects.WindEffect), this.Duration, this.EaseType);
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    this.SetNextScene();

                                        this.TransitionComplete();

                                        this.tmpContentManager.Unload();

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Effects.WaterReflectionEffect", {
        inherits: [MyONez.AdditionalContent.Effects.ReflectionEffect],
        fields: {
            firstDisplacementSpeedParam: null,
            perspectiveCorrectionIntensityParam: null,
            screenSpaceVerticalOffsetParam: null,
            secondDisplacementScaleParam: null,
            secondDisplacementSpeedParam: null,
            sparkleColorParam: null,
            sparkleIntensityParam: null,
            timeParam: null
        },
        props: {
            SparkleIntensity: {
                get: function () {
                    return this.sparkleIntensityParam.GetValueSingle();
                },
                set: function (value) {
                    this.sparkleIntensityParam.SetValue$12(value);
                }
            },
            SparkleColor: {
                get: function () {
                    return new Microsoft.Xna.Framework.Color.$ctor3(this.sparkleColorParam.GetValueVector3());
                },
                set: function (value) {
                    this.sparkleColorParam.SetValue$6(value.ToVector3());
                }
            },
            ScreenSpaceVerticalOffset: {
                get: function () {
                    return this.screenSpaceVerticalOffsetParam.GetValueSingle();
                },
                set: function (value) {
                    this.screenSpaceVerticalOffsetParam.SetValue$12(value);
                }
            },
            PerspectiveCorrectionIntensity: {
                get: function () {
                    return this.perspectiveCorrectionIntensityParam.GetValueSingle();
                },
                set: function (value) {
                    this.perspectiveCorrectionIntensityParam.SetValue$12(value);
                }
            },
            FirstDisplacementSpeed: {
                get: function () {
                    return this.firstDisplacementSpeedParam.GetValueSingle();
                },
                set: function (value) {
                    this.firstDisplacementSpeedParam.SetValue$12(value);
                }
            },
            SecondDisplacementSpeed: {
                get: function () {
                    return this.secondDisplacementSpeedParam.GetValueSingle();
                },
                set: function (value) {
                    this.secondDisplacementSpeedParam.SetValue$12(value);
                }
            },
            SecondDisplacementScale: {
                get: function () {
                    return this.secondDisplacementScaleParam.GetValueSingle();
                },
                set: function (value) {
                    this.secondDisplacementScaleParam.SetValue$12(value);
                }
            },
            Time: {
                get: function () {
                    return this.timeParam.GetValueSingle();
                },
                set: function (value) {
                    this.timeParam.SetValue$12(value);
                }
            }
        },
        ctors: {
            ctor: function (effect) {
                this.$initialize();
                MyONez.AdditionalContent.Effects.ReflectionEffect.ctor.call(this, effect);
                this.CurrentTechnique = this.Techniques.getItem$1("WaterReflectionTechnique");

                this.timeParam = this.Parameters.getItem$1("_time");
                this.sparkleIntensityParam = this.Parameters.getItem$1("_sparkleIntensity");
                this.sparkleColorParam = this.Parameters.getItem$1("_sparkleColor");
                this.screenSpaceVerticalOffsetParam = this.Parameters.getItem$1("_screenSpaceVerticalOffset");
                this.perspectiveCorrectionIntensityParam = this.Parameters.getItem$1("_perspectiveCorrectionIntensity");
                this.firstDisplacementSpeedParam = this.Parameters.getItem$1("_firstDisplacementSpeed");
                this.secondDisplacementSpeedParam = this.Parameters.getItem$1("_secondDisplacementSpeed");
                this.secondDisplacementScaleParam = this.Parameters.getItem$1("_secondDisplacementScale");

                this.SparkleIntensity = 0.015;
                this.SparkleColor = Microsoft.Xna.Framework.Color.White.$clone();
                this.PerspectiveCorrectionIntensity = 0.3;
                this.FirstDisplacementSpeed = 0.06;
                this.SecondDisplacementSpeed = 0.02;
                this.SecondDisplacementScale = 3.0;
                this.ReflectionIntensity = 0.85;
                this.NormalMagnitude = 0.03;
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Materials.PaletteCyclerMaterial", {
        inherits: [MyONez.Graphics.Materials.Material$1(MyONez.AdditionalContent.Effects.PaletteCyclerEffect)],
        ctors: {
            ctor: function () {
                this.$initialize();
                MyONez.Graphics.Materials.Material$1(MyONez.AdditionalContent.Effects.PaletteCyclerEffect).$ctor1.call(this, MyONez.Core.Instance.Content.Load(MyONez.AdditionalContent.Effects.PaletteCyclerEffect, MyONez.AdditionalContent.Effects.PaletteCyclerEffect.EffectAssetName));
            }
        },
        methods: {
            Update: function (gameTime) {
                MyONez.Graphics.Materials.Material$1(MyONez.AdditionalContent.Effects.PaletteCyclerEffect).prototype.Update.call(this, gameTime);
                this.TypedEffect.Time = gameTime.getTotalSeconds();
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Materials.ReflectionMaterial", {
        inherits: [MyONez.Graphics.Materials.Material$1(MyONez.AdditionalContent.Effects.ReflectionEffect)],
        fields: {
            renderTarget: null,
            RenderTexture: null
        },
        ctors: {
            ctor: function (reflectionRenderer) {
                this.$initialize();
                MyONez.Graphics.Materials.Material$1(MyONez.AdditionalContent.Effects.ReflectionEffect).$ctor1.call(this, MyONez.Core.Instance.Content.Load(MyONez.AdditionalContent.Effects.ReflectionEffect, MyONez.AdditionalContent.Effects.ReflectionEffect.EffectAssetName));
                this.RenderTexture = reflectionRenderer.RenderTexture;
            }
        },
        methods: {
            OnPreRender: function (camera, entity) {
                MyONez.Graphics.Materials.Material$1(MyONez.AdditionalContent.Effects.ReflectionEffect).prototype.OnPreRender.call(this, camera, entity);
                if (this.renderTarget == null || !Bridge.referenceEquals(this.renderTarget, this.RenderTexture.RenderTarget)) {
                    this.renderTarget = this.RenderTexture.RenderTarget;
                    this.TypedEffect.RenderTexture = this.RenderTexture.RenderTarget;
                }

                this.TypedEffect.MatrixTransform = camera.ViewProjectionMatrix.$clone();
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.RenderProcessors.GaussianBlurRenderProcessor", {
        inherits: [MyONez.Graphics.RenderProcessors.RenderProcessor$1(MyONez.AdditionalContent.Effects.GaussianBlurEffect),MyONez.ECS.IScreenResolutionChangedListener],
        fields: {
            renderTarget: null,
            renderTargetScale: 0,
            sceneRenderTarget: null
        },
        props: {
            RenderTargetScale: {
                get: function () {
                    return this.renderTargetScale;
                },
                set: function (value) {
                    if (this.renderTargetScale === value) {
                        return;
                    }

                    this.renderTargetScale = value;
                    this.UpdateEffectDeltas();
                }
            }
        },
        alias: ["SceneBackBufferSizeChanged", "MyONez$ECS$IScreenResolutionChangedListener$SceneBackBufferSizeChanged"],
        ctors: {
            init: function () {
                this.sceneRenderTarget = new Microsoft.Xna.Framework.Rectangle();
                this.renderTargetScale = 1.0;
            },
            ctor: function (executionOrder) {
                this.$initialize();
                MyONez.Graphics.RenderProcessors.RenderProcessor$1(MyONez.AdditionalContent.Effects.GaussianBlurEffect).ctor.call(this, executionOrder, MyONez.Core.Instance.Content.Load(MyONez.AdditionalContent.Effects.GaussianBlurEffect, MyONez.AdditionalContent.Effects.GaussianBlurEffect.EffectAssetName));
            }
        },
        methods: {
            SceneBackBufferSizeChanged: function (realRenderTarget, sceneRenderTarget) {
                this.sceneRenderTarget = sceneRenderTarget.$clone();
                this.UpdateEffectDeltas();
            },
            UpdateEffectDeltas: function () {
                if (this.sceneRenderTarget.Width === 0 || this.sceneRenderTarget.Height === 0) {
                    return;
                }

                this.TypedEffect.HorizontalBlurDelta = 1.0 / (this.sceneRenderTarget.Width * this.renderTargetScale);
                this.TypedEffect.VerticalBlurDelta = 1.0 / (this.sceneRenderTarget.Height * this.renderTargetScale);
                this.renderTarget != null ? this.renderTarget.Dispose() : null;
                this.renderTarget = new Microsoft.Xna.Framework.Graphics.RenderTarget2D.$ctor2(MyONez.Core.Instance.GraphicsDevice, Bridge.Int.clip32(this.sceneRenderTarget.Width * this.renderTargetScale), Bridge.Int.clip32(this.sceneRenderTarget.Height * this.renderTargetScale), false, MyONez.Core.Instance.Screen.BackBufferFormat, Microsoft.Xna.Framework.Graphics.DepthFormat.None, 0, Microsoft.Xna.Framework.Graphics.RenderTargetUsage.PreserveContents);
            },
            Render: function (source, destination) {
                this.TypedEffect.PrepareForHorizontalBlur();
                this.DrawFullScreenQuad(source, this.renderTarget);

                this.TypedEffect.PrepareForVerticalBlur();
                this.DrawFullScreenQuad(this.renderTarget, destination);
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.RenderProcessors.HeatDistortionRenderProcessor", {
        inherits: [MyONez.Graphics.RenderProcessors.RenderProcessor$1(MyONez.AdditionalContent.Effects.HeatDistortionEffect)],
        fields: {
            distortionFactor: 0,
            riseFactor: 0,
            elapsed: 0
        },
        props: {
            DistortionFactor: {
                get: function () {
                    return this.distortionFactor;
                },
                set: function (value) {
                    if (this.distortionFactor === value) {
                        return;
                    }

                    this.distortionFactor = value;
                    if (this.TypedEffect != null) {
                        this.TypedEffect.DistortionFactor = this.distortionFactor;
                    }
                }
            },
            RiseFactor: {
                get: function () {
                    return this.riseFactor;
                },
                set: function (value) {
                    if (this.riseFactor === value) {
                        return;
                    }

                    this.riseFactor = value;
                    if (this.TypedEffect != null) {
                        this.TypedEffect.RiseFactor = this.riseFactor;
                    }
                }
            },
            DistortionTexture: {
                set: function (value) {
                    this.TypedEffect.DistortionTexture = value;
                }
            }
        },
        ctors: {
            init: function () {
                this.distortionFactor = 0.005;
                this.riseFactor = 0.15;
            },
            ctor: function (executionOrder) {
                this.$initialize();
                MyONez.Graphics.RenderProcessors.RenderProcessor$1(MyONez.AdditionalContent.Effects.HeatDistortionEffect).ctor.call(this, executionOrder);
            }
        },
        methods: {
            OnAddedToScene: function (scene) {
                this.TypedEffect = scene.Content.Load(MyONez.AdditionalContent.Effects.HeatDistortionEffect, MyONez.AdditionalContent.Effects.HeatDistortionEffect.EffectAssetName);

                this.TypedEffect.DistortionFactor = this.distortionFactor;
                this.TypedEffect.RiseFactor = this.riseFactor;

                this.DistortionTexture = scene.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, MyONez.AdditionalContent.ContentPaths.Textures.heatDistortionNoise);
            },
            Update: function (gameTime) {
                MyONez.Graphics.RenderProcessors.RenderProcessor$1(MyONez.AdditionalContent.Effects.HeatDistortionEffect).prototype.Update.call(this, gameTime);
                this.elapsed += gameTime.getTotalSeconds();
                this.TypedEffect.Time = this.elapsed;
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.RenderProcessors.PixelBloomRenderProcessor", {
        inherits: [MyONez.AdditionalContent.RenderProcessors.BloomRenderProcessor],
        fields: {
            layerRt: null,
            tempRt: null
        },
        alias: ["SceneBackBufferSizeChanged", "MyONez$ECS$IScreenResolutionChangedListener$SceneBackBufferSizeChanged"],
        ctors: {
            ctor: function (layerRenderTexture, executionOrder) {
                this.$initialize();
                MyONez.AdditionalContent.RenderProcessors.BloomRenderProcessor.ctor.call(this, executionOrder);
                this.layerRt = layerRenderTexture;
                this.tempRt = new MyONez.Graphics.RenderTexture.$ctor3(this.layerRt.RenderTarget.Width, this.layerRt.RenderTarget.Height, Microsoft.Xna.Framework.Graphics.DepthFormat.None);
            }
        },
        methods: {
            SceneBackBufferSizeChanged: function (realRenderTarget, sceneRenderTarget) {
                MyONez.AdditionalContent.RenderProcessors.BloomRenderProcessor.prototype.SceneBackBufferSizeChanged.call(this, realRenderTarget.$clone(), sceneRenderTarget.$clone());

                this.tempRt.Resize(sceneRenderTarget.Width, sceneRenderTarget.Height);
            },
            Render: function (source, destination) {
                MyONez.AdditionalContent.RenderProcessors.BloomRenderProcessor.prototype.Render.call(this, MyONez.Graphics.RenderTexture.op_Implicit(this.layerRt), MyONez.Graphics.RenderTexture.op_Implicit(this.tempRt));

                this.Batch.Clear();
                this.Batch.Draw(source, MyONez.Maths.RectangleF.op_Implicit$1(destination.Bounds.$clone()), MyONez.Maths.RectangleF.op_Implicit$1(source.Bounds.$clone()), Microsoft.Xna.Framework.Color.White.$clone(), 0);
                this.Batch.Draw(MyONez.Graphics.RenderTexture.op_Implicit(this.tempRt), MyONez.Maths.RectangleF.op_Implicit$1(destination.Bounds.$clone()), MyONez.Maths.RectangleF.op_Implicit$1(this.tempRt.RenderTarget.Bounds.$clone()), Microsoft.Xna.Framework.Color.White.$clone(), 0);
                this.Batch.Draw(MyONez.Graphics.RenderTexture.op_Implicit(this.layerRt), MyONez.Maths.RectangleF.op_Implicit$1(destination.Bounds.$clone()), MyONez.Maths.RectangleF.op_Implicit$1(this.layerRt.RenderTarget.Bounds.$clone()), Microsoft.Xna.Framework.Color.White.$clone(), 0);

                this.Material.BlendState = Microsoft.Xna.Framework.Graphics.BlendState.AlphaBlend;
                this.Material.SamplerState = this.SamplerState;
                this.Material.DepthStencilState = Microsoft.Xna.Framework.Graphics.DepthStencilState.None;

                MyONez.Graphics.Graphic.Draw(destination, Microsoft.Xna.Framework.Color.Black.$clone(), this.Batch, this.Material);
            },
            Unload: function () {
                MyONez.AdditionalContent.RenderProcessors.BloomRenderProcessor.prototype.Unload.call(this);

                this.tempRt.Dispose();
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.RenderProcessors.PixelGlitchRenderProcessor", {
        inherits: [MyONez.Graphics.RenderProcessors.RenderProcessor$1(MyONez.AdditionalContent.Effects.PixelGlitchEffect),MyONez.ECS.IScreenResolutionChangedListener],
        fields: {
            horizontalOffset: 0,
            verticalSize: 0
        },
        props: {
            VerticalSize: {
                get: function () {
                    return this.verticalSize;
                },
                set: function (value) {
                    if (this.verticalSize === value) {
                        return;
                    }

                    this.verticalSize = value;
                    if (this.TypedEffect != null) {
                        this.TypedEffect.VerticalSize = this.verticalSize;
                    }
                }
            },
            HorizontalOffset: {
                get: function () {
                    return this.horizontalOffset;
                },
                set: function (value) {
                    if (this.horizontalOffset === value) {
                        return;
                    }

                    this.horizontalOffset = value;
                    if (this.TypedEffect != null) {
                        this.TypedEffect.HorizontalOffset = this.horizontalOffset;
                    }
                }
            }
        },
        alias: ["SceneBackBufferSizeChanged", "MyONez$ECS$IScreenResolutionChangedListener$SceneBackBufferSizeChanged"],
        ctors: {
            init: function () {
                this.horizontalOffset = 10.0;
                this.verticalSize = 5.0;
            },
            ctor: function (executionOrder) {
                this.$initialize();
                MyONez.Graphics.RenderProcessors.RenderProcessor$1(MyONez.AdditionalContent.Effects.PixelGlitchEffect).ctor.call(this, executionOrder);
            }
        },
        methods: {
            SceneBackBufferSizeChanged: function (realRenderTarget, sceneRenderTarget) {
                this.TypedEffect.ScreenSize = new Microsoft.Xna.Framework.Vector2.$ctor2(sceneRenderTarget.Width, sceneRenderTarget.Height);
            },
            OnAddedToScene: function (scene) {
                this.TypedEffect = scene.Content.Load(MyONez.AdditionalContent.Effects.PixelGlitchEffect, MyONez.AdditionalContent.Effects.PixelGlitchEffect.EffectAssetName);
                this.TypedEffect.VerticalSize = this.verticalSize;
                this.TypedEffect.HorizontalOffset = this.horizontalOffset;
                this.TypedEffect.ScreenSize = new Microsoft.Xna.Framework.Vector2.$ctor2(MyONez.Core.Instance.Screen.Width, MyONez.Core.Instance.Screen.Height);
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.RenderProcessors.PixelMosaicRenderProcessor", {
        inherits: [MyONez.Graphics.RenderProcessors.RenderProcessor$1(MyONez.AdditionalContent.Effects.MultiTextureOverlayEffect),MyONez.ECS.IScreenResolutionChangedListener],
        fields: {
            CellColor: null,
            lastMosaicScale: 0,
            mosaicRenderTex: null,
            mosaicTexture: null,
            tmpMaterial: null
        },
        props: {
            Scene: null
        },
        alias: ["SceneBackBufferSizeChanged", "MyONez$ECS$IScreenResolutionChangedListener$SceneBackBufferSizeChanged"],
        ctors: {
            init: function () {
                var $t;
                this.CellColor = new Microsoft.Xna.Framework.Color();
                this.CellColor = new Microsoft.Xna.Framework.Color.$ctor10(8421504);
                this.lastMosaicScale = -1;
                this.tmpMaterial = ($t = new MyONez.Graphics.Materials.Material(), $t.SamplerState = Microsoft.Xna.Framework.Graphics.SamplerState.PointWrap, $t);
            },
            ctor: function (executionOrder) {
                this.$initialize();
                MyONez.Graphics.RenderProcessors.RenderProcessor$1(MyONez.AdditionalContent.Effects.MultiTextureOverlayEffect).ctor.call(this, executionOrder);
            }
        },
        methods: {
            SceneBackBufferSizeChanged: function (realRenderTarget, sceneRenderTarget) {
                var screenWidth = realRenderTarget.Width;
                var screenHeight = realRenderTarget.Height;

                var screenAspectRatio = screenWidth / screenHeight;
                var designSize = this.Scene.DesignResolutionSize.$clone();

                var pixelPerfectScale = 1;
                if (designSize.X / designSize.Y > screenAspectRatio) {
                    pixelPerfectScale = (Bridge.Int.div(screenWidth, designSize.X)) | 0;
                } else {
                    pixelPerfectScale = (Bridge.Int.div(screenHeight, designSize.Y)) | 0;
                }

                if (pixelPerfectScale === 0) {
                    pixelPerfectScale = 1;
                }

                if (this.lastMosaicScale !== pixelPerfectScale) {
                    this.CreateMosaicTexture(Bridge.Int.mul(50, pixelPerfectScale));
                    this.lastMosaicScale = pixelPerfectScale;
                }

                this.mosaicRenderTex != null ? this.mosaicRenderTex.Dispose() : null;
                this.mosaicRenderTex = new Microsoft.Xna.Framework.Graphics.RenderTarget2D.$ctor2(MyONez.Core.Instance.GraphicsDevice, Bridge.Int.mul(sceneRenderTarget.Width, pixelPerfectScale), Bridge.Int.mul(sceneRenderTarget.Height, pixelPerfectScale), false, MyONez.Core.Instance.Screen.BackBufferFormat, Microsoft.Xna.Framework.Graphics.DepthFormat.None, 0, Microsoft.Xna.Framework.Graphics.RenderTargetUsage.PreserveContents);

                this.Batch.Clear();
                this.Batch.Draw(this.mosaicTexture, MyONez.Maths.RectangleF.op_Implicit$1(this.mosaicRenderTex.Bounds.$clone()), MyONez.Maths.RectangleF.op_Implicit$1(this.mosaicRenderTex.Bounds.$clone()), Microsoft.Xna.Framework.Color.White.$clone(), 0);

                MyONez.Graphics.Graphic.Draw(this.mosaicRenderTex, Microsoft.Xna.Framework.Color.Black.$clone(), this.Batch, this.tmpMaterial);

                this.TypedEffect.SecondTexture = this.mosaicRenderTex;
            },
            OnAddedToScene: function (scene) {
                MyONez.Graphics.RenderProcessors.RenderProcessor$1(MyONez.AdditionalContent.Effects.MultiTextureOverlayEffect).prototype.OnAddedToScene.call(this, scene);
                this.Scene = scene;
                this.Effect = this.Scene.Content.Load(MyONez.AdditionalContent.Effects.MultiTextureOverlayEffect, MyONez.AdditionalContent.Effects.MultiTextureOverlayEffect.EffectAssetName);
            },
            CreateMosaicTexture: function (size) {
                this.mosaicTexture != null ? this.mosaicTexture.Dispose() : null;

                this.mosaicTexture = new Microsoft.Xna.Framework.Graphics.Texture2D.ctor(MyONez.Core.Instance.GraphicsDevice, size, size);
                var colors = System.Array.init(Bridge.Int.mul(size, size), 0, System.UInt32);

                for (var i = 0; i < colors.length; i = (i + 1) | 0) {
                    colors[System.Array.index(i, colors)] = this.CellColor.PackedValue;
                }

                colors[System.Array.index(0, colors)] = 4294967295;
                colors[System.Array.index(((Bridge.Int.mul(size, size) - 1) | 0), colors)] = 4278190080;

                for (var x = 1; x < ((size - 1) | 0); x = (x + 1) | 0) {
                    colors[System.Array.index(Bridge.Int.mul(x, size), colors)] = 4292927712;
                    colors[System.Array.index(((Bridge.Int.mul(x, size) + 1) | 0), colors)] = 4294967295;
                    colors[System.Array.index(((((Bridge.Int.mul(x, size) + size) | 0) - 1) | 0), colors)] = 4278190080;
                }

                for (var y = 1; y < ((size - 1) | 0); y = (y + 1) | 0) {
                    colors[System.Array.index(y, colors)] = 4294967295;
                    colors[System.Array.index(((Bridge.Int.mul((((size - 1) | 0)), size) + y) | 0), colors)] = 4278190080;
                }

                this.mosaicTexture.SetData(System.UInt32, colors);
            },
            Unload: function () {
                MyONez.Graphics.RenderProcessors.RenderProcessor$1(MyONez.AdditionalContent.Effects.MultiTextureOverlayEffect).prototype.Unload.call(this);
                this.mosaicTexture.Dispose();
                this.mosaicRenderTex.Dispose();
            }
        }
    });

    /** @namespace MyONez.AdditionalContent.RenderProcessors */

    /**
     * post processor to assist with making blended poly lights. Usage is as follows:
         - render all sprite lights with a separate Renderer to a RenderTarget. The clear color of the Renderer is your ambient light color.
         - render all normal objects in standard fashion
         - add this PostProcessor with the RenderTarget from your lights Renderer
     *
     * @public
     * @class MyONez.AdditionalContent.RenderProcessors.PolyLightRenderProcessor
     * @augments MyONez.Graphics.RenderProcessors.RenderProcessor$1
     * @implements  MyONez.ECS.IScreenResolutionChangedListener
     */
    Bridge.define("MyONez.AdditionalContent.RenderProcessors.PolyLightRenderProcessor", {
        inherits: [MyONez.Graphics.RenderProcessors.RenderProcessor$1(MyONez.AdditionalContent.Effects.SpriteLightMultiplyEffect),MyONez.ECS.IScreenResolutionChangedListener],
        fields: {
            lightsRenderTexture: null,
            blurEffect: null,
            blurEnabled: false,
            blurRenderTargetScale: 0,
            multiplicativeFactor: 0,
            renderTarget: null,
            scene: null,
            sceneRenderTarget: null
        },
        props: {
            MultiplicativeFactor: {
                get: function () {
                    return this.multiplicativeFactor;
                },
                set: function (value) {
                    if (this.TypedEffect != null) {
                        this.TypedEffect.MultiplicativeFactor = value;
                    }

                    this.multiplicativeFactor = value;
                }
            },
            EnableBlur: {
                get: function () {
                    return this.blurEnabled;
                },
                set: function (value) {
                    if (value === this.blurEnabled) {
                        return;
                    }

                    this.blurEnabled = value;
                    if (!this.blurEnabled || this.blurEffect != null || this.scene == null) {
                        return;
                    }

                    this.blurEffect = MyONez.Core.Instance.Content.Load(MyONez.AdditionalContent.Effects.GaussianBlurEffect, MyONez.AdditionalContent.Effects.GaussianBlurEffect.EffectAssetName);
                    this.UpdateBlurEffectDeltas();
                }
            },
            BlurRenderTargetScale: {
                get: function () {
                    return this.blurRenderTargetScale;
                },
                set: function (value) {
                    if (this.blurRenderTargetScale !== value) {
                        this.blurRenderTargetScale = value;
                        if (this.blurEffect != null) {
                            this.UpdateBlurEffectDeltas();
                        }
                    }
                }
            },
            BlurAmount: {
                get: function () {
                    var $t;
                    return ($t = (this.blurEffect != null ? this.blurEffect.BlurAmount : null), $t != null ? $t : -1);
                },
                set: function (value) {
                    if (this.blurEffect != null) {
                        this.blurEffect.BlurAmount = value;
                    }
                }
            }
        },
        alias: ["SceneBackBufferSizeChanged", "MyONez$ECS$IScreenResolutionChangedListener$SceneBackBufferSizeChanged"],
        ctors: {
            init: function () {
                this.sceneRenderTarget = new Microsoft.Xna.Framework.Rectangle();
                this.blurRenderTargetScale = 0.5;
                this.multiplicativeFactor = 1.0;
            },
            ctor: function (executionOrder, lightsRenderTexture) {
                this.$initialize();
                MyONez.Graphics.RenderProcessors.RenderProcessor$1(MyONez.AdditionalContent.Effects.SpriteLightMultiplyEffect).ctor.call(this, executionOrder);
                this.lightsRenderTexture = lightsRenderTexture;
            }
        },
        methods: {
            SceneBackBufferSizeChanged: function (realRenderTarget, sceneRenderTarget) {
                this.sceneRenderTarget = sceneRenderTarget.$clone();
                this.TypedEffect.LightTexture = MyONez.Graphics.RenderTexture.op_Implicit(this.lightsRenderTexture);

                if (this.blurEnabled) {
                    this.UpdateBlurEffectDeltas();
                }
            },
            UpdateBlurEffectDeltas: function () {
                if (this.sceneRenderTarget.Width === 0 || this.sceneRenderTarget.Height === 0) {
                    return;
                }

                this.blurEffect.HorizontalBlurDelta = 1.0 / (this.sceneRenderTarget.Width * this.blurRenderTargetScale);
                this.blurEffect.VerticalBlurDelta = 1.0 / (this.sceneRenderTarget.Height * this.blurRenderTargetScale);

                this.renderTarget != null ? this.renderTarget.Dispose() : null;
                this.renderTarget = new Microsoft.Xna.Framework.Graphics.RenderTarget2D.$ctor2(MyONez.Core.Instance.GraphicsDevice, Bridge.Int.clip32(this.sceneRenderTarget.Width * this.blurRenderTargetScale), Bridge.Int.clip32(this.sceneRenderTarget.Height * this.blurRenderTargetScale), false, MyONez.Core.Instance.Screen.BackBufferFormat, Microsoft.Xna.Framework.Graphics.DepthFormat.None, 0, Microsoft.Xna.Framework.Graphics.RenderTargetUsage.PreserveContents);
            },
            OnAddedToScene: function (scene) {
                this.scene = scene;
                this.TypedEffect = this.scene.Content.Load(MyONez.AdditionalContent.Effects.SpriteLightMultiplyEffect, MyONez.AdditionalContent.Effects.SpriteLightMultiplyEffect.EffectAssetName);
                this.TypedEffect.LightTexture = MyONez.Graphics.RenderTexture.op_Implicit(this.lightsRenderTexture);
                this.TypedEffect.MultiplicativeFactor = this.multiplicativeFactor;

                if (this.blurEnabled) {
                    this.blurEffect = MyONez.Core.Instance.Content.Load(MyONez.AdditionalContent.Effects.GaussianBlurEffect, MyONez.AdditionalContent.Effects.GaussianBlurEffect.EffectAssetName);
                }
            },
            Render: function (source, destination) {
                if (this.blurEnabled) {
                    this.blurEffect.PrepareForHorizontalBlur();
                    this.DrawFullScreenQuad(MyONez.Graphics.RenderTexture.op_Implicit(this.lightsRenderTexture), this.renderTarget, this.blurEffect);

                    this.blurEffect.PrepareForVerticalBlur();
                    this.DrawFullScreenQuad(this.renderTarget, MyONez.Graphics.RenderTexture.op_Implicit(this.lightsRenderTexture), this.blurEffect);
                }

                this.DrawFullScreenQuad(source, destination);
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.RenderProcessors.ScanlinesRenderProcessor", {
        inherits: [MyONez.Graphics.RenderProcessors.RenderProcessor$1(MyONez.AdditionalContent.Effects.ScanlinesEffect)],
        ctors: {
            ctor: function (executionOrder) {
                this.$initialize();
                MyONez.Graphics.RenderProcessors.RenderProcessor$1(MyONez.AdditionalContent.Effects.ScanlinesEffect).ctor.call(this, executionOrder, MyONez.Core.Instance.Content.Load(MyONez.AdditionalContent.Effects.ScanlinesEffect, MyONez.AdditionalContent.Effects.ScanlinesEffect.EffectAssetName));
            }
        }
    });

    /**
     * post processor to assist with making blended sprite lights. Usage is as follows:
         - render all sprite lights with a separate Renderer to a RenderTarget. The clear color of the Renderer is your ambient light color.
         - render all normal objects in standard fashion
         - add this PostProcessor with the RenderTarget from your lights Renderer
     *
     * @public
     * @class MyONez.AdditionalContent.RenderProcessors.SpriteLightRenderProcessor
     * @augments MyONez.Graphics.RenderProcessors.RenderProcessor$1
     * @implements  MyONez.ECS.IScreenResolutionChangedListener
     */
    Bridge.define("MyONez.AdditionalContent.RenderProcessors.SpriteLightRenderProcessor", {
        inherits: [MyONez.Graphics.RenderProcessors.RenderProcessor$1(MyONez.AdditionalContent.Effects.SpriteLightMultiplyEffect),MyONez.ECS.IScreenResolutionChangedListener],
        fields: {
            lightsRenderTexture: null,
            multiplicativeFactor: 0
        },
        props: {
            MultiplicativeFactor: {
                get: function () {
                    return this.multiplicativeFactor;
                },
                set: function (value) {
                    if (this.TypedEffect != null) {
                        this.TypedEffect.MultiplicativeFactor = value;
                    }

                    this.multiplicativeFactor = value;
                }
            }
        },
        alias: ["SceneBackBufferSizeChanged", "MyONez$ECS$IScreenResolutionChangedListener$SceneBackBufferSizeChanged"],
        ctors: {
            init: function () {
                this.multiplicativeFactor = 1.0;
            },
            ctor: function (executionOrder, lightsRenderTexture) {
                this.$initialize();
                MyONez.Graphics.RenderProcessors.RenderProcessor$1(MyONez.AdditionalContent.Effects.SpriteLightMultiplyEffect).ctor.call(this, executionOrder);
                this.lightsRenderTexture = lightsRenderTexture;
            }
        },
        methods: {
            SceneBackBufferSizeChanged: function (realRenderTarget, sceneRenderTarget) {
                this.TypedEffect.LightTexture = MyONez.Graphics.RenderTexture.op_Implicit(this.lightsRenderTexture);
            },
            OnAddedToScene: function (scene) {
                this.TypedEffect = scene.Content.Load(MyONez.AdditionalContent.Effects.SpriteLightMultiplyEffect, MyONez.AdditionalContent.Effects.SpriteLightMultiplyEffect.EffectAssetName);
                this.TypedEffect.LightTexture = MyONez.Graphics.RenderTexture.op_Implicit(this.lightsRenderTexture);
                this.TypedEffect.MultiplicativeFactor = this.multiplicativeFactor;
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.RenderProcessors.VignetteRenderProcessor", {
        inherits: [MyONez.Graphics.RenderProcessors.RenderProcessor$1(MyONez.AdditionalContent.Effects.VignetteEffect)],
        fields: {
            power: 0,
            radius: 0
        },
        props: {
            Power: {
                get: function () {
                    return this.power;
                },
                set: function (value) {
                    if (this.power === value) {
                        return;
                    }

                    this.power = value;
                    if (this.TypedEffect != null) {
                        this.TypedEffect.Power = this.power;
                    }
                }
            },
            Radius: {
                get: function () {
                    return this.radius;
                },
                set: function (value) {
                    if (this.radius === value) {
                        return;
                    }

                    this.radius = value;
                    if (this.TypedEffect != null) {
                        this.TypedEffect.Radius = this.radius;
                    }
                    ;
                }
            }
        },
        ctors: {
            init: function () {
                this.power = 1.0;
                this.radius = 1.25;
            },
            ctor: function (executionOrder) {
                this.$initialize();
                MyONez.Graphics.RenderProcessors.RenderProcessor$1(MyONez.AdditionalContent.Effects.VignetteEffect).ctor.call(this, executionOrder);
            }
        },
        methods: {
            OnAddedToScene: function (scene) {
                this.TypedEffect = scene.Content.Load(MyONez.AdditionalContent.Effects.VignetteEffect, MyONez.AdditionalContent.Effects.VignetteEffect.EffectAssetName);

                this.TypedEffect.Power = this.power;
                this.TypedEffect.Radius = this.radius;
            }
        }
    });

    Bridge.define("MyONez.AdditionalContent.Materials.WaterReflectionMaterial", {
        inherits: [MyONez.Graphics.Materials.Material$1(MyONez.AdditionalContent.Effects.WaterReflectionEffect)],
        fields: {
            renderTarget: null,
            RenderTexture: null
        },
        ctors: {
            ctor: function (reflectionRenderer) {
                this.$initialize();
                MyONez.Graphics.Materials.Material$1(MyONez.AdditionalContent.Effects.WaterReflectionEffect).$ctor1.call(this, MyONez.Core.Instance.Content.Load(MyONez.AdditionalContent.Effects.WaterReflectionEffect, MyONez.AdditionalContent.Effects.ReflectionEffect.EffectAssetName));
                this.RenderTexture = reflectionRenderer.RenderTexture;
            }
        },
        methods: {
            OnPreRender: function (camera, entity) {
                MyONez.Graphics.Materials.Material$1(MyONez.AdditionalContent.Effects.WaterReflectionEffect).prototype.OnPreRender.call(this, camera, entity);
                if (this.renderTarget == null || !Bridge.referenceEquals(this.renderTarget, this.RenderTexture.RenderTarget)) {
                    this.renderTarget = this.RenderTexture.RenderTarget;
                    this.TypedEffect.RenderTexture = this.RenderTexture.RenderTarget;
                }

                this.TypedEffect.MatrixTransform = camera.ViewProjectionMatrix.$clone();
                this.TypedEffect.CurrentTechnique = this.TypedEffect.Techniques.getItem$1("WaterReflectionTechnique");
            },
            Update: function (gameTime) {
                MyONez.Graphics.Materials.Material$1(MyONez.AdditionalContent.Effects.WaterReflectionEffect).prototype.Update.call(this, gameTime);
                this.TypedEffect.Time = gameTime.getTotalSeconds();
            }
        }
    });
});

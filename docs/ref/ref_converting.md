---
title: ISF Reference
prev: false
next: false
tags: [Reference, Converting Shaders]
keywords: texture2D(), texture2DRect(), IMG_NORM_PIXEL(), IMG_PIXEL(), GLSL, gl_FragCoord.xy, translate, convert
last_updated: June 12, 2018
summary: "Tips for converting GLSL shaders into the ISF specification."
sidebar: home_sidebar
permalink: ref_converting.html
folder: ref
---

# Converting Non-ISF GLSL shaders to ISF

In many cases there are only a few minor differences when converting existing GLSL code to the ISF specification. Here are some of the common changes to consider.

For examples on converting shaders, see [Chapter 9 - Adapting Existing GLSL Code to the ISF Specification](primer_chapter_9.html) of the ISF Primer.

## texture2D() or texture2DRect()
- You should replace any calls in your shader to ``texture2D()`` or ``texture2DRect()`` with ``IMG_NORM_PIXEL()`` or ``IMG_PIXEL()``, respectively.
- Images in ISF- inputs, persistent buffers, etc- can be accessed by either ``IMG_NORM_PIXEL()`` or ``IMG_PIXEL()``, depending on whether you want to use normalized or non-normalized coordinates to access the colors of the image. If your shader isn't using these- if it's using ``texture2D()`` or ``texture2DRect()``- it won't compile if the host application tries to send it a different type of texture.

## Common uniforms: RENDERSIZE and TIME
- Many shaders pass in the resolution of the image being rendered (knowing where the fragment being evaluated is located within the output image is frequently useful). By default, ISF automatically declares a uniform vec2 named `RENDERSIZE` which is passed the dimensions of the image being rendered.
- If the shader you're converting requires a time value, note that the uniform float `TIME` is declared, and passed the duration (in seconds) which the shader's been runing when the shader's rendered.
- See the [ISF Variables](ref_variables) page for more details on automatically declared variables in ISF.

## Uniform Variables and JSON
- Variables that you wish to show up as published parameters in host applications can listed in the INPUTS section of the JSON section of your ISF shader. When converting from other shader formats, you may want to consider moving the declared uniform variables to the JSON blob.
- See the [ISF JSON reference](ref_json) page for more details on declaring INPUTS.

## Alpha Channel
- Many shaders don't use (or even acknowledge) the alpha channel of the image being rendered. There's nothing wrong with this- but when the shader's loaded in an application that uses the alpha channel, the output of the shader can look bizarre and unpredictable (though it usually involves something being darker than it should be). If you run into this, try setting gl_FragColor.a to 1.0 at the end of your shader.

## Coordinates: gl_FragCoord vs isf_FragNormCoord
- `gl_FragCoord.xy` contains the coordinates of the fragment being evaluated. `isf_FragNormCoord.xy` contains the normalized coordinates of the fragment being evaluated.
- If your texture doesn't look right, make sure your texture coordinates are ranged properly (textures are typically "clamped" by the host implementation, if you specify an out-of-range texture coordinate it may look funny).

## Vertex Shaders and isf_vertShaderInit
- While ISF files are fragment shaders, and the host environment automatically generates a vertex shader, you can use your own vertex shader if you'd like. If you go this route, your vertex shader should have the same base name as your ISF file (just use the extension .vs), and the first thing you do in your vertex shader's main function is call `isf_vertShaderInit();`.
- See [Chapter 5 – Vertex Shaders](primer_chapter_5.html) in the ISF Primer for more details.

## IMPORTED image data
- If the shader you're converting requires imported graphic resources, note that the ISF format defines the ability to import image files by adding objects to your JSON dict under the `IMPORTED` key. The imported images are accessed via the usual `IMG_PIXEL()` or `IMG_NORM_PIXEL()` methods. See the [ISF JSON reference](ref_json) page for more details on including image data.
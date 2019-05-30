---
sidebar: home_sidebar
---

# Adapting Existing GLSL Code to the ISF Specification

As we have discussed several times, ISF is itself built on top of GLSL. Whether you are already familiar with the language or just getting started, you may at times find it useful to adapt code from elsewhere to meet the ISF specification so that you can use the shaders between different softwares. Likewise you may at times also find it useful to convert your ISF codebase into other formats to that have their own environment specific requirements for shaders.

In many cases GLSL code can be easily adapted to ISF by adding the JSON blob and making a few minor changes to a few function and variable names.

For example, if you are coming from an environment like Shader Toy or The Book of Shaders, the variable that they use for the time in seconds might be something like `u_time` and you would simply need to change those to `TIME` to work in ISF.

Some GLSL code can be partially or fully converted to ISF using the ISF Editor; in other situations you may need to convert some or all of the code manually. In the below sections we will look at these two approaches and an example.

In this chapter we'll look at:
- Using the ISF Editor to automatically convert shaders from Shadertoy and GLSLSandbox.
- General tips for converting non-ISF GLSL shaders to ISF.
- Adapting GLSL examples from The Book of Shaders.

## Using the ISF Editor to automatically convert shaders

Many shaders from [Shadertoy.com](https://shadertoy.com) and [GLSLSandbox.com](https://GLSLSandbox.com) can be automatically converted to the ISF specification using the [desktop ISF Editor](https://isf.vidvox.net/desktop-editor/) tool.

To use this feature:
1. Copy the URL for the Shadertoy or GLSLSandbox that you wish to convert.
2. In the ISF Editor, from the `File` menu, select the `Import from GLSLSandbox` or `Import from Shadertoy` option.
3. Paste the URL of the shader to be converted.

Shaders created by this method will be imported to:
- "~/Library/Graphics/ISF" directory on macOS
- "/ProgramData/ISF" directory on Windows

Along with the GLSL code, the JSON blob will include the link to the original URL in the description tag. You may also want to add the name of the original author in the credits or elsewhere in the code as a comment for attribution.

Some shaders will convert perfectly using this method, and some will require some additional work to compile or render properly.

A few notes on specific things that may need to be adjusted beyond the automatic conversion:
- Many shaders from Shadertoy / GLSLSandbox do not make use of alpha channels in anticipation of being rendered 'over' another image.
- While multi-pass conversion from Shadertoy is supported, it is possible to run into variable name collisions between passes. These may need to be manually fixed by changing the names of variables to be unique.
- Once you have converted a shader to ISF, the next step would be to add new variables to the code, and publish them using the JSON meta-data as INPUTS so that they can be accessible through UI elements in host applications.
- See below for other tips on converting shaders to ISF.

## Manually converting GLSL shaders to ISF

When automatic conversion to ISF only works for part of a shader, or for working with GLSL code examples from sources not yet supported for automatic conversion, it is also possible to do the work by hand.

Here is a list of tips that address many of the common differences:
- You should probably replace any calls in your shader to `texture2D()` or `texture2DRect()` with `IMG_NORM_PIXEL()` or `IMG_PIXEL()`, respectively. Images in ISF- inputs, persistent buffers, etc- can be accessed by either `IMG_NORM_PIXEL()` or `IMG_PIXEL()`, depending on whether you want to use normalized or non-normalized coordinates to access the colors of the image. If your shader isn't using these- if it's using `texture2D()` or `texture2DRect()`- it won't compile if the host application tries to send it a different type of texture.
- If the shader you are converting makes use of any custom uniform variable declarations for receiving information from a host application, replace these with elements in the `INPUTS` section of your JSON blob.
- Many shaders pass in the resolution of the image being rendered (knowing where the fragment being evaluated is located within the output image is frequently useful). By default, ISF automatically declares a uniform vec2 named `RENDERSIZE` which is passed the dimensions of the image being rendered.
- If the shader you're converting requires a time value, note that the uniform float `TIME` is declared, and passed the duration (in seconds) which the shader's been runing when the shader's rendered.
- Many shaders don't use (or even acknowledge) the alpha channel of the image being rendered. There's nothing wrong with this- but when the shader's loaded in an application that uses the alpha channel, the output of the shader can look bizarre and unpredictable (though it usually involves something being darker than it should be). If you run into this, try setting gl_FragColor.a to 1.0 at the end of your shader. Likewise you may want to add proper alpha channel handling to the shader so that it can be used with composition modes that appear 'over' other images.
- `gl_FragCoord.xy` contains the coordinates of the fragment being evaluated. `isf_FragNormCoord.xy` contains the normalized coordinates of the fragment being evaluated.  
- While ISF files are fragment shaders, and the host environment automatically generates a vertex shader, you can use your own vertex shader if you'd like. If you go this route, your vertex shader should have the same base name as your ISF file (just use the extension .vs), and the first thing you do in your vertex shader's main function is call `isf_vertShaderInit();`.
- If the shader you're converting requires imported graphic resources, note that the ISF format defines the ability to import image files by adding objects to your JSON dict under the `IMPORTED` key. The imported images are accessed via the usual `IMG_PIXEL()` or `IMG_NORM_PIXEL()` methods. Details on how to do this are listed in the full specification and ISF Reference Pages.
- If your texture doesn't look right, make sure your texture coordinates are ranged properly (textures are typically "clamped" by the host implementation, if you specify an out-of-range texture coordinate it may look funny).

You may also want to add the name of the original author of a shader being remixed in the credits, or elsewhere in the code as a comment for attribution.

### Example: Adapting GLSL examples from The Book of Shaders.

One of the most popular websites for learning GLSL is [The Book of Shaders](https://thebookofshaders.com/), where you can find both a great explanation of how the language works and lots of sample code that show off all kinds of creative uses of shaders.

Here we will look at how to adapt one of the shaders from [Chapter 12: Cellular Noise](https://thebookofshaders.com/12/) which covers a commonly used algorithm by Georgy Voronoi.  Similar to the Conway's Game of Life shader from the previous chapter,the voronoi algorithm simulates living forms that are shaped by this tension between an inner force to expand and grow, and limitations by outside forces.

You may want to read through the full explanation of voronoi from TBOS to get a full sense of what is happening in the shader, as in this tutorial we will simply look at how to adapt the code to work as in ISF.

Starting with this example:

```glsl
// Author: @patriciogv
// Title: CellularNoise

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random2( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(.0);

    // Scale
    st *= 3.;

    // Tile the space
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    float m_dist = 1.;  // minimun distance

    for (int y= -1; y <= 1; y++) {
        for (int x= -1; x <= 1; x++) {
            // Neighbor place in the grid
            vec2 neighbor = vec2(float(x),float(y));

            // Random position from current + neighbor place in the grid
            vec2 point = random2(i_st + neighbor);

			// Animate the point
            point = 0.5 + 0.5*sin(u_time + 6.2831*point);

			// Vector between the pixel and the point
            vec2 diff = neighbor + point - f_st;

            // Distance to the point
            float dist = length(diff);

            // Keep the closer distance
            m_dist = min(m_dist, dist);
        }
    }

    // Draw the min distance (distance field)
    color += m_dist;

    // Draw cell center
    color += 1.-step(.02, m_dist);

    // Draw grid
    color.r += step(.98, f_st.x) + step(.98, f_st.y);

    // Show isolines
    // color -= step(.7,abs(sin(27.0*m_dist)))*.5;

    gl_FragColor = vec4(color,1.0);
}
```

Going through the list of suggested tips, the steps in which we will approach this will be:
- Replace any automatically created variables with their respective ISF counterparts.
- Remove any declarations of automatically created variables as this is handled automatically by ISF.
- Add a JSON blob that describes the shader.
- If needed replace instances of `texture2D` / `texture2DRect` with `IMG_PIXEL`.

In this case, first replace all cases of `u_time` with `TIME` and `u_resolution` with `RENDERSIZE`.  Next remove their declarations.  In this case, the `u_mouse` uniform is also not used in this code and can be removed.  This generator does not make use of any pixel lookup so there no need to change any related functions.

When making adaptations it can also be useful to look in the code to find sections where you may want to add a custom uniform variable in the JSON blob.  In this example instead of the hardcoded value of 3.0 for the scaling, we have added a `scale` element of type float to the `INPUTS` array with a range of 0.0 to 8.0.

The adapted result looks quite similar:

```glsl
/*{
	"DESCRIPTION": "Cellular Noise example",
	"CREDIT": "@patriciogv",
	"ISFVSN": "2",
	"CATEGORIES": [
		"TBOS"
	],
	"INPUTS": [
		{
			"NAME": "scale",
			"TYPE": "float",
			"MIN": 0.0,
			"MAX": 8.0,
			"DEFAULT": 3.0
		}	
	]	
}*/

// Author: @patriciogv
// Title: CellularNoise

vec2 random2( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

void main() {
    vec2 st = gl_FragCoord.xy/RENDERSIZE.xy;
    st.x *= RENDERSIZE.x/RENDERSIZE.y;
    vec3 color = vec3(.0);

    // Scale
    st *= scale;

    // Tile the space
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    float m_dist = 1.;  // minimun distance

    for (int y= -1; y <= 1; y++) {
        for (int x= -1; x <= 1; x++) {
            // Neighbor place in the grid
            vec2 neighbor = vec2(float(x),float(y));

            // Random position from current + neighbor place in the grid
            vec2 point = random2(i_st + neighbor);

			// Animate the point
            point = 0.5 + 0.5*sin(TIME + 6.2831*point);

			// Vector between the pixel and the point
            vec2 diff = neighbor + point - f_st;

            // Distance to the point
            float dist = length(diff);

            // Keep the closer distance
            m_dist = min(m_dist, dist);
        }
    }

    // Draw the min distance (distance field)
    color += m_dist;

    // Draw cell center
    color += 1.-step(.02, m_dist);

    // Draw grid
    color.r += step(.98, f_st.x) + step(.98, f_st.y);

    // Show isolines
    // color -= step(.7,abs(sin(27.0*m_dist)))*.5;

    gl_FragColor = vec4(color,1.0);
}
```

Of course this is just a basic adaptation.  Though they aren't needed, looking more closely at the code you may notice other minor changes that could be made, such as changing:

```glsl
vec2 st = gl_FragCoord.xy/RENDERSIZE.xy;
```

to the simpler form of:

```glsl
vec2 st = isf_FragNormCoord;
```

As a challenge, take a few minutes to go through some of the other Cellular Noise examples from The Book of Shaders and convert them to work in ISF.

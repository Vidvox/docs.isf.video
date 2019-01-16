---
home: true
heroImage: /isf-logo.svg
actionText: Get Started →
actionLink: /quickstart
features:
- title: GLSL+JSON
  details: The ISF specification is designed around two widely used existing standards, GLSL and JSON.
- title: Versatility
  details: ISF compositions can be created with published controls and run inside a variety of different host applications.
- title: Performance
  details: GLSL code runs on the GPU for fast and efficient rendering on desktop, mobile and the web.
footer: Interactive Shader Format (ISF) copyright VIDVOX, LLC 2018, all rights reserved.
---

<div id="example">

```glsl
/*{
	"DESCRIPTION": "Demonstrates a float input",
	"CREDIT": "by VIDVOX",
	"ISFVSN": "2.0",
	"CATEGORIES": [
		"TEST-GLSL"
	],
	"INPUTS": [
		{
			"NAME": "level",
			"TYPE": "float",
			"LABEL": "Gray Level",
			"DEFAULT": 0.5,
			"MIN": 0.0,
			"MAX": 1.0
		}
	]
}*/

void main() {
	gl_FragColor = vec4(level,level,level,1.0);
}
```

<iframe src="https://isf.video/sketches/5c3cb5101b920200131ecd1d/embed" style="border: 0"></iframe>

</div>
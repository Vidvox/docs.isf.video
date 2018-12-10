---
home: true
heroImage: /isf-logo.svg
actionText: Get Started →
actionLink: /quickstart
features:
- title: GLSL+JSON
  details: Some words about this “selling point” that have been arranged into a sentence.
- title: Versatility
  details: Some words about this “selling point” that have been arranged into a sentence.
- title: Performance
  details: Some words about this “selling point” that have been arranged into a sentence.
footer: Interactive Shader Format (ISF) copyright VIDVOX, LLC 2018, all rights reserved.
---

```
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
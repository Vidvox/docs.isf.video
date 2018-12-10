module.exports = {
	title: 'ISF Documenation',
  description: 'Interactive Shader Format is a file format used to describe GLSL shaders for real-time image filtering and generation.',
	themeConfig: {
		sidebar: {
      '/primer/': [
        ['primer_chapter_1', 'Introduction'],
        ['primer_chapter_2', 'The Anatomy of an ISF'],
        ['primer_chapter_3', 'Using and Creating ISF Compositions'],
        ['primer_chapter_4', 'Data Types, Standard Variables and Functions'],
        ['primer_chapter_5', 'Vertex Shaders'],
        ['primer_chapter_6', 'Convolution Filters'],
        ['primer_chapter_7', 'Multi-Pass and Persistent Buffers in ISF'],
        ['primer_chapter_8', 'Audio Visualizers in ISF'],
        ['primer_chapter_9', 'Adapting Existing GLSL Code to the ISF Specification'],
      ],
      '/ref/': [
        ['ref_variables', 'Automatically Created Variables, Uniforms and Constants'],
        ['ref_functions', 'Built-In Functions'],
        ['ref_multipass', 'Multi-Pass Shaders and Persistent Buffers'],
        ['ref_json', 'ISF JSON Attributes'],
        ['ref_converting', 'Converting Non-ISF GLSL shaders to ISF'],
        ['ref_changes', 'Change Log'],
      ]
    },
    nav: [
      { text: 'Using ISF', link: '/using_isf.html' },
      { text: 'Quickstart', link: '/quickstart.html' },
      { text: 'Primer', link: '/primer/' },
      { text: 'Reference', link: '/ref/' },
      { text: 'ISF Homepage', link: 'https://isf.video'},
    ],
	},
  head: [
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Rubik:400,500' }]
  ]
}





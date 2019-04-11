module.exports = {
  plugins: ['@vuepress/medium-zoom'],
  title: 'ISF Documentation',
  description: 'Interactive Shader Format is a file format used to describe GLSL shaders for real-time image filtering and generation.',
	themeConfig: {
    prev: true,
    next: true,
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
        ['primer_chapter_9', 'Adapting GLSL Code to the ISF Spec'],
      ],
      '/ref/': [
        ['ref_variables', 'Automatically Created Variables, Uniforms and Constants'],
        ['ref_functions', 'Built-In Functions'],
        ['ref_multipass', 'Multi-Pass Shaders and Persistent Buffers'],
        ['ref_json', 'ISF JSON Attributes'],
        ['ref_converting', 'Converting Non-ISF GLSL shaders to ISF'],
        ['ref_changes', 'Change Log'],
      ],
    },
    nav: [
      { text: 'Quickstart', link: '/quickstart.html' },
      { text: 'Using ISF', link: '/using_isf.html' },
      { text: 'Primer', link: '/primer/' },
      { text: 'Reference', link: '/ref/' },
      { text: 'ISF Homepage', link: 'https://isf.video'},
    ],
	},
  head: [
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Rubik:400,500' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'icon', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico', color: '#33272C' }]
  ]
}
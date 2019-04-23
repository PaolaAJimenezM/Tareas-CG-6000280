var vertexShaderText =
[
'precision mediump float;',
'',
'attribute vec2 vertPosition;',
'attribute vec3 vertColor;',
'varying vec3 fragColor;',
'',
'void main()',
'{',
'  fragColor = vertColor;',
'  gl_Position = vec4(vertPosition,0.0, 3.0);',
'}'
].join('\n');

var fragmentShaderText =
[
'precision mediump float;',
'',
'varying vec3 fragColor;',
'void main()',
'{',
'  gl_FragColor = vec4(fragColor, 1.0);',
'}'
].join('\n');

var InitDemo = function () {
	console.log('This is working');

	var canvas = document.getElementById('game-surface');
	var gl = canvas.getContext('webgl');

	if (!gl) {
		console.log('WebGL not supported, falling back on experimental-webgl');
		gl = canvas.getContext('experimental-webgl');
	}

	if (!gl) {
		alert('Your browser does not support WebGL');
	}

	gl.clearColor(1.0, 1.0, 1.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	//
	// Create shaders
	//
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(vertexShader, vertexShaderText);
	gl.shaderSource(fragmentShader, fragmentShaderText);

	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
		return;
	}

	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
		return;
	}

	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error('ERROR linking program!', gl.getProgramInfoLog(program));
		return;
	}
	gl.validateProgram(program);
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
		console.error('ERROR validating program!', gl.getProgramInfoLog(program));
		return;
	}

	//
	// Create buffer
	//
	var triangleVertices =
	[ // X, Y,                R, G, B
    -0.3,    2.7,     0.69, 0.3, 0.25,
     -0.2,   2,     0.69, 0.3, 0.25,
   0.1,    2.2,     0.69, 0.3, 0.25,



    0.1,   2.2,     0.69, 0.3, 0.25,
    -0.2,    2,     0.69, 0.3, 0.25,
     0.6,    1.8,     0.69, 0.3, 0.25,



     0.1,    2.2,     0.69, 0.3, 0.25,
    0.6,    1.8,      0.69, 0.3, 0.25,
     1.2,    2.2,     0.69, 0.3, 0.25,


      1.2,    2.2,      0.69, 0.3, 0.25,
     0.6,    1.8,     0.69, 0.3, 0.25,
     1.3,    1.8,     0.69, 0.3, 0.25,




     1.3,    1.8,     0.69, 0.3, 0.25,
    1.1,    2.2,      0.69, 0.3, 0.25,
     1.5,    2.2,     0.69, 0.3, 0.25,





     1.5,    2.2,     0.69, 0.3, 0.25,
    1.8,    2.7,      0.69, 0.3, 0.25,
     1.7,   2,      0.69, 0.3, 0.25,


        1.7,   2,     0.69, 0.3, 0.25,
       1.5, 2.2,      0.69, 0.3, 0.25,
      1.3, 1.8,     0.69, 0.3, 0.25,



    1.7,    2,      0.69, 0.3, 0.25,
    2.3,    1.2,      0.69, 0.3, 0.25,
     1.3,    1.8,     0.69, 0.3, 0.25,



     1.3,    1.8,     0.69, 0.3, 0.25,
    0.8,    1.1,      0.69, 0.3, 0.25,
    2.3,    1.2,      0.69, 0.3, 0.25,



     0.8 , 1.1,     0.69, 0.3, 0.25,
     1.3,  1.8,     0.69, 0.3, 0.25,
    -0.2, 2,      0.69, 0.3, 0.25,



     -0.2,   2,     0.69, 0.3, 0.25,
     -0.9,  0.8,      0.69, 0.3, 0.25,
      0.8,   1.1,     0.69, 0.3, 0.25,



     0.8,   1.1,      0.69, 0.3, 0.25,
     0.4,    0.3,       0.69, 0.3, 0.25,
    -0.9,   0.8,        0.69, 0.3, 0.25,



     -0.9,   0.8,     0.69, 0.3, 0.25,
     -1.6,   -0.8,      0.69, 0.3, 0.25,
      0.4,    0.3,      0.69, 0.3, 0.25,



        0.4, 0.3,     0.69, 0.3, 0.25,
       0.8, 1.1,      0.69, 0.3, 0.25,
       2.3, 1.2,      0.69, 0.3, 0.25,



       2.3, 1.2,      0.69, 0.3, 0.25,
       3,  -0.7,      0.69, 0.3, 0.25,
       0.4,  0.3,     0.69, 0.3, 0.25,



        0.4,  0.3,      0.69, 0.3, 0.25,
       -0.8,  -0.3,     0.69, 0.3, 0.25,
       1.3 , -1.2,      0.69, 0.3, 0.25,



        1.3 ,  -1.2,      0.69, 0.3, 0.25,
       -1.2,   -1,      0.69, 0.3, 0.25,
       -0.8, -0.3,      0.69, 0.3, 0.25,


       -0.8, -0.3,      0.69, 0.3, 0.25,
       -1.6, -0.8,      0.69, 0.3, 0.25,
       -1.2, -1,      0.69, 0.3, 0.25,

        -1.2, -1,     0.69, 0.3, 0.25,
        -0.8, -0.3,     0.69, 0.3, 0.25,
       1.3,-1.2,      0.69, 0.3, 0.25,

        1.3,-1.2,     0.69, 0.3, 0.25,
       0.4, 0.3,      0.69, 0.3, 0.25,
       1.3, -0.1,     0.69, 0.3, 0.25,

         1.3, 0.1,      0.69, 0.3, 0.25,
        3, -0.7,      0.69, 0.3, 0.25,
       3.1, -1.7,     0.69, 0.3, 0.25,


       3.1, -1.7,     0.69, 0.3, 0.25,
       1.3, 0.1,      0.69, 0.3, 0.25,
       1.3, -1.2,     0.69, 0.3, 0.25,


       1.3, -1.2,       0.69, 0.3, 0.25,
       3.1, -1.7,       0.69, 0.3, 0.25,
       1.2, -2.5,       0.69, 0.3, 0.25,


        1.2, -2.5,        0.69, 0.3, 0.25,
       1.3, -1.2,       0.69, 0.3, 0.25,
        -1.4, -2.5,       0.69, 0.3, 0.25,


        -1.4, -2.5,     0.69, 0.3, 0.25,
       1.3, -1.2,       0.69, 0.3, 0.25,
       -1.2, -1,        0.69, 0.3, 0.25,

        -1.2, -1,       0.69, 0.3, 0.25,
       -1.6, -0.8,      0.69, 0.3, 0.25,
       -1.8,-2,        0.69, 0.3, 0.25,

        -1.8,-2,      0.69, 0.3, 0.25,
       -1.2,-1,     0.69, 0.3, 0.25,
       -1.4, -2.5,      0.69, 0.3, 0.25,

       -1.4, -2.5,      0.69, 0.3, 0.25,
       0.5, -3.7,     0.69, 0.3, 0.25,
       1.2, -2.5,     0.69, 0.3, 0.25,


       1.2, -2.5,     0.69, 0.3, 0.25,
       3.1, -1.7,     0.69, 0.3, 0.25,
       2.5, -3.2,     0.69, 0.3, 0.25,


        2.5, -3.2,      0.69, 0.3, 0.25,
        3.1, -1.7,      0.69, 0.3, 0.25,
       2.8, -3.5,      0.69, 0.3, 0.25,


       2.8, -3.5,     0.69, 0.3, 0.25,
       2.2, -4.5,     0.69, 0.3, 0.25,
       2.5, -3.2,     0.69, 0.3, 0.25,


       2.5, -3.2,     0.69, 0.3, 0.25,
       1.2, -2.5,     0.69, 0.3, 0.25,
       0.5, -3.7,     0.69, 0.3, 0.25,


       0.5, -3.7,     0.69, 0.3, 0.25,
       1.3, -4.3,     0.69, 0.3, 0.25,
       2.5, -3.2,     0.69, 0.3, 0.25,


       2.5, -3.2,     0.69, 0.3, 0.25,
       2.2, -4.5,     0.69, 0.3, 0.25,
       1.3,-4.3,      0.69, 0.3, 0.25,



       1.3,-4.3,      0.69, 0.3, 0.25,
       0.5, -3.7,     0.69, 0.3, 0.25,
       0.2, -3.9,     0.69, 0.3, 0.25,


       0.2, -3.9,     0.69, 0.3, 0.25,
       0.5, -3.7,     0.69, 0.3, 0.25,
       -1.4, -2.5,      0.69, 0.3, 0.25,



       -0.2,-3.9,     0.69, 0.3, 0.25,
       -1.4, -2.5,      0.69, 0.3, 0.25,
       -1, -4,      0.69, 0.3, 0.25,



       -1, -4,      0.69, 0.3, 0.25,
       -0.7, -4.4,      0.69, 0.3, 0.25,
       -0.2, -3.9,      0.69, 0.3, 0.25,



       -0.2, -3.5,      0.69, 0.3, 0.25,
       2.2, -4.5,     0.69, 0.3, 0.25,
       -0.7, -4.4,      0.69, 0.3, 0.25,


       -0.7, -4.4,      0.69, 0.3, 0.25,
       -4.9, -4.6,      0.69, 0.3, 0.25,
       -5.1, -4.5,      0.69, 0.3, 0.25,


       -5.1,-4.5,     0.69, 0.3, 0.25,
       -6.5, -4.4,      0.69, 0.3, 0.25,
       -6.5,-4,     0.69, 0.3, 0.25,


       -6.5,-4,     0.69, 0.3, 0.25,
       -5.1,-4.5,     0.69, 0.3, 0.25,
       -5.1,-4,     0.69, 0.3, 0.25,

       -5.1,-4,     0.69, 0.3, 0.25,
       -6.5,-4,     0.69, 0.3, 0.25,
       -5.9,-3.9,     0.69, 0.3, 0.25,

       -5.9,-3.9,     0.69, 0.3, 0.25,
       -5.7, -3.9,      0.69, 0.3, 0.25,
       -5.8, 0,     0.69, 0.3, 0.25,

       -5.8, 0,     0.69, 0.3, 0.25,
       -5.8, 0.6,     0.69, 0.3, 0.25,
       -5.3, 0.3,     0.69, 0.3, 0.25,


       -5.3, 0.3,     0.69, 0.3, 0.25,
       -5.3, 1,     0.69, 0.3, 0.25,
       -5.8, 0.6,     0.69, 0.3, 0.25,

       -5.8, 0.6,     0.69, 0.3, 0.25,
       -5.3, 1,     0.69, 0.3, 0.25,
       -5.9, 1.3,     0.69, 0.3, 0.25,


       -5.9, 1.3,     0.69, 0.3, 0.25,
       -6.4, 0.9,     0.69, 0.3, 0.25,
       -5.8, 0.6,     0.69, 0.3, 0.25,


        -5.8, 0.6,    0.69, 0.3, 0.25,
        -6.4, 0.9,    0.69, 0.3, 0.25,
        -6.4, 0.3,    0.69, 0.3, 0.25,

       -6.4, 0.3,     0.69, 0.3, 0.25,
       -5.8, 0,     0.69, 0.3, 0.25,
       -5.8, 0.6,     0.69, 0.3, 0.25,


	];


	var triangleVertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

	var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
	var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
	gl.vertexAttribPointer(
		positionAttribLocation, // Attribute location
		2, // Number of elements per attribute
		gl.FLOAT, // Type of elements
		gl.FALSE,
		5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
		0 // Offset from the beginning of a single vertex to this attribute
	);
	gl.vertexAttribPointer(
		colorAttribLocation, // Attribute location
		3, // Number of elements per attribute
		gl.FLOAT, // Type of elements
		gl.FALSE,
		5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
		2 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
	);

	gl.enableVertexAttribArray(positionAttribLocation);
	gl.enableVertexAttribArray(colorAttribLocation);

	//
	// Main render loop
	//
	gl.useProgram(program);
	gl.drawArrays(gl.TRIANGLES, 0, (3*51));
};

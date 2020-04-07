class Renderer {
	constructor(
		game, canvas, ctx = null,
		width = 0, height = 0, x = 0, y = 0
	) {
		this.game = game;
		this.canvas = canvas;
		this.ctx = ctx || canvas.getContext('2d');

		this.width = width || canvas.width;
		this.height = height || canvas.height;
		this.x = x;
		this.y = y;
	}

	createInstance(width, height, x, y) {
		return new Renderer(this.game, this.canvas, this.ctx, width, height, x, y);
	}
}

export default Renderer;

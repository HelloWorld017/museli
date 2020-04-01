class Vector2 {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	clone() {
		return new Vector2(this.x, this.y);
	}

	add(vec2) {
		this.x += vec2.x;
		this.y += vec2.y;
		return this;
	}

	subtract(vec2) {
		this.x -= vec2.x;
		this.y -= vec2.y;
		return this;
	}

	multiply(scala) {
		this.x *= scala;
		this.y *= scala;
		return this;
	}

	divide(scala) {
		this.x /= scala;
		this.y /= scala;
		return this;
	}

	elemwise(vec2) {
		this.x *= vec2.x;
		this.y *= vec2.y;
		return this;
	}

	dot(vec2) {
		return this.x * vec2.x + this.y * vec2.y;
	}

	cross(vec2) {
		return this.x * vec2.y - this.y * vec2.x;
	}

	size() {
		return Math.hypot(this.x, this.y);
	}

	normalize() {
		return this.divide(this.size());
	}

	perp() {
		return new Vector2(this.y, - this.x);
	}
}

export default Vector2;

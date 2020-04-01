class QuadraticBezier {
	constructor(p0, p1, p2) {
		this.p0 = p0;
		this.p1 = p1;
		this.p2 = p2;
	}

	at(t) {
		return (new Vector2())
			.add(this.p0.clone().multiply(     (1 - t) ** 2          ))
			.add(this.p1.clone().multiply( 2 * (1 - t)      * t      ))
			.add(this.p2.clone().multiply(                    t ** 2 ));
	}
}

export default QuadraticBezier;

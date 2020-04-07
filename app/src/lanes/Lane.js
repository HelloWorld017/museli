import GameObject from "~/GameObject";
import QuadraticBezier from "~/utils/QuadraticBezier";
import Vector2 from "~/utils/Vector2";

const ANGLE = [70, 80, 90, 100, 110];
const CURVE_START_HEIGHT = 0.5;
const CURVE_CONTROL_HEIGHT = 0.8;

class Lane extends GameObject {
	constructor(game, laneId, lanePosition) {
		super(game);

		this.id = laneId;
		this.position = lanePosition / 4;
		this.angle = ANGLE[lanePosition];
		this.cos = Math.cos(this.angle);
		this.isCurve = game.config.curve;

		this.curveOffset = 0;
		this.renderer = game.layers.playground;
	}

	update() {
		this.curveOffset = Math.sin(this.game.tick / 50) * .5;

		this.o  = this.getPositionLinear(0);
		this.p0 = this.getPositionLinear(CURVE_START_HEIGHT);
		this.p1 = this.getPositionLinear(CURVE_CONTROL_HEIGHT);
		this.p2 = this.getPositionLinear(1);
		this.p2.x -= this.curveOffset * this.renderer.width;

		this.curve = new QuadraticBezier(this.p0, this.p1, this.p2);
	}

	getPosition(progress) {
		if(progress < CURVE_START_HEIGHT)
			return this.getPositionLinear(progress);

		return this.getPositionCurve(progress);
	}

	getPositionLinear(progress) {
		const { width, height } = this.renderer;

		return new Vector2(
			this.position * width + this.cos * height * progress,
			height * progress
		);
	}

	getPositionCurve(t) {
		return this.curve.at(t - CURVE_START_HEIGHT);
	}

	getSubPath(progress1, progress2) {
		let progressP0 = 0;

		const path = [];

		if(progress1 <= CURVE_START_HEIGHT) {
			path.push({
				method: 'moveTo',
				args: [ this.getPositionLinear(progress1) ],
				progress: [ progress1 ]
			});

			if(progress2 <= CURVE_START_HEIGHT) {
				path.push({
					method: 'lineTo',
					args: [ this.getPositionLinear(progress2) ],
					progress: [ progress2 ]
				});

				return path;
			}

			progressP0 = CURVE_START_HEIGHT;
			path.push({
				method: 'lineTo',
				args: [ this.p0 ],
				progress: [ progressP0 ]
			});
		} else {
			progressP0 = progress1;
			path.push({
				method: 'moveTo',
				args: [ this.getPositionCurve(progress1) ],
				progress: [ progressP0 ]
			});
		}

		const p0 = this.getPositionCurve(progressP0);
		const p1 =
			this.p1.clone().multiply(progressP0 - CURVE_START_HEIGHT).add(
				this.p2.clone().multiply(1 - CURVE_START_HEIGHT + progressP0)
			);
		const p2 = this.p2;
		const curve = new QuadraticBezier(p0, p1, p2);

		const newProgress = (progress2 - progressP0) / (1 - progressP0);
		const l1 =
			p0.clone().multiply(newProgress).add(
				p1.clone().multiply(1 - newProgress)
			);
		const l2 = curve.at(newProgress);

		path.push({
			method: 'curveTo',
			args: [
				l1,
				l2
			],
			progress: [ progressP0, newProgress ]
		});

		return path;
	}

	getSize(progress) {

	}

	render(renderer) {
		renderer.feed(this.renderLane(renderer, {
			lineWidth: renderer.skin.width.lane,
			lineColor: renderer.skin.color.lane
		}));
	}

	renderLane({ width, height }, style) {
		return {
			style,
			path: [
				{ method: 'moveTo', args: [ this.o ] },
				{ method: 'lineTo', args: [ this.p0 ] },
				{ method: 'quadraticCurveTo', args: [ this.p1, this.p2 ] },
				{ method: 'stroke' }
			]
		};
	}
}

export default Lane;

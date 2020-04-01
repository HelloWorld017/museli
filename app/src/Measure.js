import GameObject from "~/GameObject";

class Measure extends GameObject {
	constructor(game, measure, previousMeasure) {
		super(game);

		this.previousMeasure = previousMeasure;

		this.bpm = measure.bpm;
		this.timingStart = measure.timingStart;
		this.timingEnd = measure.timingEnd;
		this.length = measure.timingEnd - measure.timingStart;

		this.speed = this.game.getSpeedByBPM(this.bpm);
		this.progressLength = this.speed * this.length;
		this.progressStart = 1;
		this.progressEnd = 1;
		this.updateProgress();
	}

	update(renderer) {
		if(this.previousMeasure.progressEnd > 0) {
			this.progressStart = this.previousMeasure.progressEnd;
		} else {
			this.progressStart = this.speed * (this.timingStart - this.game.tick);
		}

		this.progressEnd = this.progressStart + this.progressLength;
	}
}

export default Measure;

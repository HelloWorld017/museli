class ChargeHit extends Charge {
	render(renderer) {
		const centerSubPath = this.translateSubPath(new Vector2(0, -1));
		const centerSubPathReversed = centerSubPath.reduce((prev, curr) => {
			
		}, );

		const rightSubPath = this.translateSubPath(new Vector2(1, 0));
	}

	translateSubPath(offset) {
		const progress0 = this.notes[0].progress;
		const progress1 = this.notes[1].progress;
		const subPath = this.lane.getSubPath(progress0, progress1);

		subPath.forEach(({ method, args, progress }) => {
			args.forEach((point, index) => {
				const size = this.lane.getSize(progress[index]);
				point.add(offset.clone().multiply(size));

				return point;
			});
		});

		return subPath;
	}
}

export default ChargeHit;

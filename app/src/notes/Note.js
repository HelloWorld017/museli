import GameObject from "~/GameObject";

class Note extends GameObject {
	constructor(game, note) {
		super(game);

		this.measure = game.getMeasure(note.measure);
		this.lane = game.getLane(note.lane);

		this.connectedIds = note.connected;
		this.timing = note.timing;
		this.timingRelative = note.timing - this.measure.timing;
		this.lastUpdate = game.tick;

		this.progress = 1;
		this.position = { x: 0, y: 0 };

		this.nextNote = null;
	}

	init() {
		this.connected = this.connectedIds.map(
			connectedId => this.game.getNote(connectedId)
		);
	}

	update(renderer) {
		this.progress = this.measure.progressStart + this.timingRelative * this.measure.speed;
		this.position = this.lane.getPosition(this.progress);
	}

	render(renderer) {
		this.renderNote(renderer);
		this.renderConnected(renderer);
	}

	renderNote(renderer) {
		throw new Error("Not Implemented");
	}

	renderConnected(renderer) {
		if(this.connected.length === 0) return;
		if(this.connected.length === 1) {
			const connected = this.connected[0];
			if(connected.lane.position > this.lane.position) {
				this.renderConnectedOne(renderer, connected);
			}

			return;
		}

		let lowestNote = null;
		let connectingNote = null;

		for(const connected of this.connected) {
			if(!lowestNote)
				lowestNote = connected;

			if(lowestNote.lane.position > connected.lane.position)
				lowestNote = connected;

			if(connected.lane.position <= this.lane.position) continue;

			if(!connectingNote)
				connectingNote = connected;

			if(connectingNote.lane.position > connected.lane.position)
				connectingNote = connected;
		}

		if(!connectingNote)
			connectingNote = lowestNote;

		this.renderConnectedOne(renderer, connectingNote);
	}

	renderConnectedOne(renderer, note) {

	}
}

export default Note;

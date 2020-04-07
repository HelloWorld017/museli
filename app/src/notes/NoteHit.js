import Note from "~/notes/Note";

class NoteHit extends Note {
	constructor(game, note) {
		super(game, note);
		this.texture = `note_${note.lane}`;
	}

	renderNote(renderer) {
		renderer.drawImage(
			renderer.skin.image[this.texture], this.position
		);
	}
}

export default NoteHit;

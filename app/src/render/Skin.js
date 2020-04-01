class Skin {
	constructor(id, skinInfo) {
		this.id = id;
		this.name = skinInfo.name;
		this.color = skinInfo.color;
		this.width = skinInfo.width;
		this.fonts = skinInfo.fonts;
		this.resources = {};
	}

	async loadResources() {

	}
}

export default Skin;

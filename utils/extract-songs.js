const fs = require('fs');
const path = require('path');
const { Parser } = require('xml2js');

const basedir = path.resolve("G:\\FTPWriteArea\\Guest\\PIX-2018073002\\contents", "data");
const shiftJisDecoder = new TextDecoder('shift-jis');
const utfDecoder = new TextDecoder('utf-8');
const xmlParser = new Parser({
	charkey: 'value',
	attrkey: 'attrs',
	tagNameProcessors: [
		(name) => {
			return name.replace(/_(.)/g, (match, p1) => p1.toUpperCase());
		}
	]
});

const decode = buffer => {
	if(buffer.length < 3)
		return utfDecoder.decode(buffer);

	if(buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF)
		return utfDecoder.decode(buffer);

	return shiftJisDecoder.decode(buffer);
};

const parseXml = async xmlPath => {
	const buffer = await fs.promises.readFile(xmlPath);
	const raw = decode(buffer);

	const parsed = await parser.parseStringPromise(raw);
	parser.reset();

	return parsed;
}

(async () => {
	const musics = await parseXml(path.join(basedir, "museca", "xml", "music-info-b.xml"));
	console.log(musics)
})();

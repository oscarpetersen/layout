let crypto = require('crypto');

	class FairGenerator {
		constructor(server_seed, client_seed) {
			this.server_seed = (server_seed || crypto.randomBytes(16).toString('hex')).toLowerCase();
			this.client_seed = (client_seed || crypto.randomBytes(16).toString('hex')).toLowerCase();
		}
		get server_hash() {
			let hash = crypto.createHash('SHA256');
			hash.write(this.server_seed);

			return hash.digest().toString('hex');
		}
		get round_result() {
			let hmac = crypto.createHmac('SHA512', this.server_seed);
			hmac.write(this.client_seed);

			let buf = hmac.digest();
			return buf.readUInt32BE() / Math.pow(2, 32) * 100;
		}
	}

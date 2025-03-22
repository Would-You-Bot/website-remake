export default interface Server {
	id: string;
	name: string;
	members: string;
	memberCount: number;
	features: string[];
	avatar: string;
	verified: boolean;
	partnered: boolean;
	invite: string;
	vanityURLCode: string;
	iconURL: string;
}

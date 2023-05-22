export type CustomAttribute = {
	name: string;
	type?: string | number;
	value: string;
};

export interface ERC721Metadata {
	name: string;
	description: string;
	image: string;
	tags: Array<string>;
}

/**
 * @description: Below type and interface follows the
 * opensea metadata standard, for more details check on
 * the following link: https://docs.opensea.io/docs/metadata-standards
 */

declare const OPENSEA_DISPLAY_TRAIT: {
	readonly NUMBER: 'number';
	readonly DATE: 'date';
	readonly BOOST_PERCENTAGE: 'boost_percentage';
	readonly BOOST_NUMBER: 'boost_number';
};

export type OPENSEA_DISPLAY_TRAIT_TYPE =
	(typeof OPENSEA_DISPLAY_TRAIT)[keyof typeof OPENSEA_DISPLAY_TRAIT];

export type OpenSeaAttribute = {
	display_type?: OPENSEA_DISPLAY_TRAIT_TYPE;
	trait_type?: string;
	value: number | string;
};

export interface OpenSeaERC721Metadata extends ERC721Metadata {
	youtube_url: string;
	external_url: string;
	animation_url: string;
	background_color: string;
	attributes: Array<CustomAttribute | OpenSeaAttribute>;
}

export interface NFTResponseData {
	nftId: string;
	id: string;
	tokenId: string;
	tokenAddress: string;
	contractType: string;
	name: string;
	currency: string;
	tokenURI: string;
	ownershipTrxHash: string;
	effectiveDate: string;
	chainId: string;
	walletAddress: string;
}

export interface TxnHistoryResponse {
	walletAddress: string;
	tillDate: string;
	preOwnershipTrxHash: string;
}

export interface NFTProcessResponse {
	details: NFTResponseData;
	metadata: OpenSeaERC721Metadata;
	imageDetail?: Blob;
}

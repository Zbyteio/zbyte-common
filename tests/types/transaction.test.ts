import {
	Args,
	Domain,
	RelayOperations,
	TxnMetadata,
	UnsignedBatchTx,
	UnsignedTxn,
	UnSignedTxnMetaData,
} from '../../src/types/transaction';

describe('transaction interfaces ', () => {
	describe('Args', () => {
		it('should allow for creating an argument', () => {
			const arg: Args = { name: 'arg1', type: 'string', value: 'hello world' };
			expect(arg.name).toEqual('arg1');
			expect(arg.type).toEqual('string');
			expect(arg.value).toEqual('hello world');
		});
	});

	describe('Domain', () => {
		it('should allow for creating a domain object', () => {
			const domain: Domain = { name: 'test', chainId: 1 };
			expect(domain.name).toEqual('test');
			expect(domain.chainId).toEqual(1);
		});
	});

	describe('TxnMetadata', () => {
		it('should allow for creating a transaction metadata object', () => {
			const metadata: TxnMetadata = { functionName: 'foo', subOperation: 'invoke' };
			expect(metadata.functionName).toEqual('foo');
			expect(metadata.subOperation).toEqual('invoke');
		});
	});

	describe('UnSignedTxnMetaData', () => {
		it('should allow for creating an unsigned transaction metadata object', () => {
			const txnMetadata: UnSignedTxnMetaData = {
				operation: RelayOperations.TRANSFER,
				zbyteTokens: '100',
				functionName: 'foo',
				chainID:123
			};
			expect(txnMetadata.operation).toEqual(RelayOperations.TRANSFER);
			expect(txnMetadata.zbyteTokens).toEqual('100');
			expect(txnMetadata.functionName).toEqual('foo');
		});
	});

	describe('UnsignedTxn', () => {
		it('should allow for creating an unsigned transaction object', () => {
			const unsignedTxn: UnsignedTxn = {
				data: {
					types: {
						EIP712Domain: [{ name: 'name', type: 'string' }],
						Test: [{ name: 'value', type: 'uint256' }],
					},
					domain: { name: 'test', chainId: 1 },
					primaryType: 'Test',
					message: { value: '123' },
				},
				metadata: { functionName: 'foo', subOperation: 'invoke' },
			};
			expect(unsignedTxn.data.domain.name).toEqual('test');
			expect(unsignedTxn.metadata.functionName).toEqual('foo');
		});
	});

	describe('UnsignedBatchTx', () => {
		it('should allow for creating an unsigned batch transaction object', () => {
			const unsignedBatchTx: UnsignedBatchTx = {
				transactions: [
					{
						data: {
							types: {
								EIP712Domain: [{ name: 'name', type: 'string' }],
								Test: [{ name: 'value', type: 'uint256' }],
							},
							domain: { name: 'test', chainId: 1 },
							primaryType: 'Test',
							message: { value: '123' },
						},
						metadata: { functionName: 'foo', subOperation: 'invoke' },
					},
				],
				metadata: {
					operation: RelayOperations.TRANSFER,
					zbyteTokens: '100',
					functionName: 'foo',
					chainID:123
				},
			};
			expect(unsignedBatchTx.transactions[0].data.domain.chainId).toEqual(1);
			expect(unsignedBatchTx.metadata.functionName).toEqual('foo');
		});
	});
});

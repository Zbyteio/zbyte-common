export interface NetworkConfig {
    networkName: string,
    networkRpcUrl: string,
    iconPath?: string,
    chainId: number,
    chainSymbol: string,
    explorer: string,
    networkType: string,
}

export interface OperationSign {
    operationName: string
    signature: string
}
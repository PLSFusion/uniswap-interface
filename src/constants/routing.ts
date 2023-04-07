// a list of tokens by chain
import { Currency, Token } from '@uniswap/sdk-core'
import { SupportedChainId } from 'constants/chains'

import {
  AMPL,
  CEUR_CELO,
  CEUR_CELO_ALFAJORES,
  CMC02_CELO,
  CUSD_CELO,
  CUSD_CELO_ALFAJORES,
  DAI,
  DAI_ARBITRUM_ONE,
  DAI_ETHF,
  DAI_ETHW,
  DAI_OPTIMISM,
  DAI_PLS,
  DAI_POLYGON,
  DAI_TPLS,
  DAI_TPLS4,
  ETH2X_FLI,
  FEI,
  FRAX,
  FXS,
  HDRN_ETHF,
  HDRN_ETHW,
  HDRN_MAINNET,
  HDRN_PLS,
  HDRN_TPLS,
  HDRN_TPLS4,
  HEX_ETHF,
  HEX_ETHW,
  HEX_MAINNET,
  HEX_PLS,
  HEX_TPLS,
  HEX_TPLS4,
  ICSA_ETHF,
  ICSA_ETHW,
  ICSA_MAINNET,
  ICSA_PLS,
  ICSA_TPLS,
  ICSA_TPLS4,
  nativeOnChain,
  PHIAT_MAINNET,
  PORTAL_ETH_CELO,
  PORTAL_USDC_CELO,
  renBTC,
  rETH2,
  sETH2,
  SWISE,
  TRIBE,
  USDC_ARBITRUM,
  USDC_ARBITRUM_GOERLI,
  USDC_ETHF,
  USDC_ETHW,
  USDC_MAINNET,
  USDC_OPTIMISM,
  USDC_PLS,
  USDC_POLYGON,
  USDC_TPLS,
  USDC_TPLS4,
  USDT,
  USDT_ARBITRUM_ONE,
  USDT_ETHF,
  USDT_ETHW,
  USDT_OPTIMISM,
  USDT_PLS,
  USDT_POLYGON,
  USDT_TPLS,
  USDT_TPLS4,
  WBTC,
  WBTC_ARBITRUM_ONE,
  WBTC_OPTIMISM,
  WBTC_POLYGON,
  WETH_POLYGON,
  WETH_POLYGON_MUMBAI,
  WETHW,
  WRAPPED_NATIVE_CURRENCY,
  WTPLS,
} from './tokens'

type ChainTokenList = {
  readonly [chainId: number]: Token[]
}

type ChainCurrencyList = {
  readonly [chainId: number]: Currency[]
}

const WRAPPED_NATIVE_CURRENCIES_ONLY: ChainTokenList = Object.fromEntries(
  Object.entries(WRAPPED_NATIVE_CURRENCY)
    .map(([key, value]) => [key, [value]])
    .filter(Boolean)
)

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WRAPPED_NATIVE_CURRENCIES_ONLY,
  [SupportedChainId.MAINNET]: [
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.MAINNET],
    DAI,
    USDC_MAINNET,
    USDT,
    WBTC,
  ],
  [SupportedChainId.PLS]: [
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.PLS],
    DAI_PLS,
    USDC_PLS,
    USDT_PLS,
    HDRN_PLS,
    HEX_PLS,
    ICSA_PLS,
  ],
  [SupportedChainId.TPLS]: [
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.TPLS],
    DAI_TPLS,
    USDC_TPLS,
    USDT_TPLS,
    HDRN_TPLS,
    HEX_TPLS,
    ICSA_TPLS,
  ],
  [SupportedChainId.TPLS4]: [
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.TPLS4],
    DAI_TPLS4,
    USDC_TPLS4,
    USDT_TPLS4,
    HDRN_TPLS4,
    HEX_TPLS4,
    ICSA_TPLS4,
  ],
  [SupportedChainId.ETHW]: [
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.ETHW],
    DAI_ETHW,
    USDC_ETHW,
    USDT_ETHW,
    HDRN_ETHW,
    HEX_ETHW,
    ICSA_ETHW,
  ],
  [SupportedChainId.ETHF]: [
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.ETHF],
    DAI_ETHF,
    USDC_ETHF,
    USDT_ETHF,
    HDRN_ETHF,
    HEX_ETHF,
    ICSA_ETHF,
  ],
  [SupportedChainId.OPTIMISM]: [
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.OPTIMISM],
    DAI_OPTIMISM,
    USDT_OPTIMISM,
    WBTC_OPTIMISM,
  ],
  [SupportedChainId.ARBITRUM_ONE]: [
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.ARBITRUM_ONE],
    DAI_ARBITRUM_ONE,
    USDT_ARBITRUM_ONE,
    WBTC_ARBITRUM_ONE,
  ],
  [SupportedChainId.POLYGON]: [
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.POLYGON],
    DAI_POLYGON,
    USDC_POLYGON,
    USDT_POLYGON,
    WETH_POLYGON,
  ],
  [SupportedChainId.CELO]: [CUSD_CELO, CEUR_CELO, CMC02_CELO, PORTAL_USDC_CELO, PORTAL_ETH_CELO],
}
export const ADDITIONAL_BASES: { [chainId: number]: { [tokenAddress: string]: Token[] } } = {
  [SupportedChainId.MAINNET]: {
    '0xF16E4d813f4DcfDe4c5b44f305c908742De84eF0': [ETH2X_FLI],
    [rETH2.address]: [sETH2],
    [SWISE.address]: [sETH2],
    [FEI.address]: [TRIBE],
    [TRIBE.address]: [FEI],
    [FRAX.address]: [FXS],
    [FXS.address]: [FRAX],
    [WBTC.address]: [renBTC],
    [renBTC.address]: [WBTC],
  },
}
/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId: number]: { [tokenAddress: string]: Token[] } } = {
  [SupportedChainId.MAINNET]: {
    [AMPL.address]: [DAI, WRAPPED_NATIVE_CURRENCY[SupportedChainId.MAINNET] as Token],
  },
}

/**
 * Shows up in the currency select for swap and add liquidity
 */
export const COMMON_BASES: ChainCurrencyList = {
  [SupportedChainId.MAINNET]: [
    nativeOnChain(SupportedChainId.MAINNET),
    HDRN_MAINNET,
    HEX_MAINNET,
    ICSA_MAINNET,
    PHIAT_MAINNET,
    DAI,
    USDC_MAINNET,
    WRAPPED_NATIVE_CURRENCY[SupportedChainId.MAINNET] as Token,
  ],
  [SupportedChainId.GOERLI]: [
    nativeOnChain(SupportedChainId.GOERLI),
    WRAPPED_NATIVE_CURRENCY[SupportedChainId.GOERLI] as Token,
  ],
  [SupportedChainId.PLS]: [
    nativeOnChain(SupportedChainId.PLS),
    HDRN_PLS,
    HEX_PLS,
    ICSA_PLS,
    WRAPPED_NATIVE_CURRENCY[SupportedChainId.PLS] as Token,
  ],
  [SupportedChainId.TPLS]: [
    nativeOnChain(SupportedChainId.TPLS),
    HDRN_TPLS,
    HEX_TPLS,
    ICSA_TPLS,
    WRAPPED_NATIVE_CURRENCY[SupportedChainId.TPLS] as Token,
    WTPLS,
  ],
  [SupportedChainId.TPLS4]: [
    nativeOnChain(SupportedChainId.TPLS4),
    HDRN_TPLS4,
    HEX_TPLS4,
    ICSA_TPLS4,
    WRAPPED_NATIVE_CURRENCY[SupportedChainId.TPLS4] as Token,
  ],
  [SupportedChainId.ETHW]: [
    nativeOnChain(SupportedChainId.ETHW),
    HDRN_ETHW,
    HEX_ETHW,
    ICSA_ETHW,
    WRAPPED_NATIVE_CURRENCY[SupportedChainId.ETHW] as Token,
    WETHW,
  ],
  [SupportedChainId.ETHF]: [
    nativeOnChain(SupportedChainId.ETHF),
    HDRN_ETHF,
    HEX_ETHF,
    ICSA_ETHF,
    WRAPPED_NATIVE_CURRENCY[SupportedChainId.ETHF] as Token,
  ],
  [SupportedChainId.ARBITRUM_ONE]: [
    nativeOnChain(SupportedChainId.ARBITRUM_ONE),
    DAI_ARBITRUM_ONE,
    USDC_ARBITRUM,
    USDT_ARBITRUM_ONE,
    WBTC_ARBITRUM_ONE,
    WRAPPED_NATIVE_CURRENCY[SupportedChainId.ARBITRUM_ONE] as Token,
  ],
  [SupportedChainId.ARBITRUM_GOERLI]: [
    nativeOnChain(SupportedChainId.ARBITRUM_GOERLI),
    WRAPPED_NATIVE_CURRENCY[SupportedChainId.ARBITRUM_GOERLI] as Token,
    USDC_ARBITRUM_GOERLI,
  ],
  [SupportedChainId.OPTIMISM]: [
    nativeOnChain(SupportedChainId.OPTIMISM),
    DAI_OPTIMISM,
    USDC_OPTIMISM,
    USDT_OPTIMISM,
    WBTC_OPTIMISM,
  ],
  [SupportedChainId.OPTIMISM_GOERLI]: [nativeOnChain(SupportedChainId.OPTIMISM_GOERLI)],
  [SupportedChainId.POLYGON]: [
    nativeOnChain(SupportedChainId.POLYGON),
    WETH_POLYGON,
    USDC_POLYGON,
    DAI_POLYGON,
    USDT_POLYGON,
    WBTC_POLYGON,
  ],
  [SupportedChainId.POLYGON_MUMBAI]: [
    nativeOnChain(SupportedChainId.POLYGON_MUMBAI),
    WRAPPED_NATIVE_CURRENCY[SupportedChainId.POLYGON_MUMBAI] as Token,
    WETH_POLYGON_MUMBAI,
  ],

  [SupportedChainId.CELO]: [
    nativeOnChain(SupportedChainId.CELO),
    CEUR_CELO,
    CUSD_CELO,
    PORTAL_ETH_CELO,
    PORTAL_USDC_CELO,
    CMC02_CELO,
  ],
  [SupportedChainId.CELO_ALFAJORES]: [
    nativeOnChain(SupportedChainId.CELO_ALFAJORES),
    CUSD_CELO_ALFAJORES,
    CEUR_CELO_ALFAJORES,
  ],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WRAPPED_NATIVE_CURRENCIES_ONLY,
  [SupportedChainId.MAINNET]: [
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.MAINNET],
    DAI,
    USDC_MAINNET,
    USDT,
    WBTC,
  ],
  [SupportedChainId.PLS]: [
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.PLS],
    DAI_PLS,
    USDC_PLS,
    USDT_PLS,
    HDRN_PLS,
    HEX_PLS,
    ICSA_PLS,
  ],
  [SupportedChainId.TPLS]: [
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.TPLS],
    DAI_TPLS,
    USDC_TPLS,
    USDT_TPLS,
    HDRN_TPLS,
    HEX_TPLS,
    ICSA_TPLS,
  ],
  [SupportedChainId.TPLS4]: [
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.TPLS4],
    DAI_TPLS4,
    USDC_TPLS4,
    USDT_TPLS4,
    HDRN_TPLS4,
    HEX_TPLS4,
    ICSA_TPLS4,
  ],
  [SupportedChainId.ETHW]: [
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.ETHW],
    DAI_ETHW,
    USDC_ETHW,
    USDT_ETHW,
    HDRN_ETHW,
    HEX_ETHW,
    ICSA_ETHW,
  ],
  [SupportedChainId.ETHF]: [
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.ETHF],
    DAI_ETHF,
    USDC_ETHF,
    USDT_ETHF,
    HDRN_ETHF,
    HEX_ETHF,
    ICSA_ETHF,
  ],
}
export const PINNED_PAIRS: { readonly [chainId: number]: [Token, Token][] } = {
  [SupportedChainId.MAINNET]: [
    [
      new Token(SupportedChainId.MAINNET, '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643', 8, 'cDAI', 'Compound Dai'),
      new Token(
        SupportedChainId.MAINNET,
        '0x39AA39c021dfbaE8faC545936693aC917d5E7563',
        8,
        'cUSDC',
        'Compound USD Coin'
      ),
    ],
    [USDC_MAINNET, USDT],
    [DAI, USDT],
  ],
}

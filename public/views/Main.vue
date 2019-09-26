<template>
	<div>
		<h1 id="title">TokenSets Dashboard</h1>
		<div id="stats">
			<div class="stat">
				<div class="stat-amount">{{ totalSetCount }}</div>
				<div class="stat-label">Tokens</div>
			</div>
			<div class="stat">
				<div class="stat-amount">{{ formatMoney(totalMarketCap) }}</div>
				<div class="stat-label">Total market cap</div>
			</div>
		</div>
		<div id="table">
			<table>
				<tr>
					<th class="column-name">Name</th>
					<th class="column-number">Supply</th>
					<th class="column-number">Price</th>
					<th class="column-number">Market cap</th>
				</tr>

				<tr class="row-data" @click="openSet(tokenSet)" v-for="tokenSet in tokenSets">
					<td class="column-name">
						<img class="set-icon" :src="tokenSet.icon">
						<span class="set-title">{{ tokenSet.ticker }}</span>
					</td>
					<td class="column-number">{{ formatSupply(tokenSet.supply) }}</td>
					<td class="column-number">{{ formatMoney(tokenSet.price) }}</td>
					<td class="column-number">{{ formatMoney(tokenSet.marketCap) }}</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import BigNumber from 'bignumber.js';

import eth20smaco from "../assets/eth20smaco.svg";
import eth50smaco from "../assets/eth50smaco.svg";
import eth12emaco from "../assets/eth12emaco.svg";
import eth26emaco from "../assets/eth26emaco.svg";
import btceth5050 from "../assets/btceth5050.svg";
import btceth2575 from "../assets/btceth2575.svg";
import btceth7525 from "../assets/btceth7525.svg";
import ethvol from "../assets/ethvol.svg";
import btcvol from "../assets/btcvol.svg";

export default {
	data() {
		return {
			'sets': {},
			'setTickers': {
				'ETH20SMACO': 'ETH20SMACO',
				'ETH50SMACO': 'ETH50SMACO',
				'ETH12EMACO': 'ETH12EMACO',
				'ETH26EMACO': 'ETH26EMACO',
				'BTCETH7525': 'BTCETH7525',
				'BTCETH2575': 'ETHBTC7525',
				'BTCETH5050': 'BTCETH5050',
				'BTCMINVOL': 'BTCMINVOL',
				'ETHMINVOL': 'ETHMINVOL',
				'STBTCDai': 'BTCLOVOL',
				'STETHDai': 'ETHLOVOL',
				'BTCDai': 'BTCHIVOL',
				'ETHDai': 'ETHHIVOL',
			},
			'setIcons': {
				'ETH20SMACO': eth20smaco,
				'ETH50SMACO': eth50smaco,
				'ETH12EMACO': eth12emaco,
				'ETH26EMACO': eth26emaco,
				'BTCETH7525': btceth7525,
				'ETHBTC7525': btceth2575,
				'BTCETH5050': btceth5050,
				'BTCMINVOL': btcvol,
				'ETHMINVOL': ethvol,
				'BTCLOVOL': btcvol,
				'ETHLOVOL': ethvol,
				'BTCHIVOL': btcvol,
				'ETHHIVOL': ethvol,
			},
			'prices': {
				'DAI': 0,
				'USDC': 0,
				'WETH': 0,
				'WBTC': 0,
			},
			'decimals': {
				'DAI': 18,
				'USDC': 6,
				'WETH': 18,
				'WBTC': 8,
			},
			'addresses': {
				'0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359': 'DAI',
				'0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': 'USDC',
				'0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': 'WETH',
				'0x2260fac5e5542a773aa44fbcfedf7c193bc2c599': 'WBTC',
			},
		}
	},
	async mounted() {
		await this.loadPrices();
		await this.loadSets();
	},
	methods: {
		openSet(tokenSet) {
			this.$router.push({
				name: 'set',
				params: {
					ticker: tokenSet.ticker,
				},
			});
		},
		async loadPrices() {
			const tickers = {
				'dai': 'DAI',
				'usd-coin': 'USDC',
				'ethereum': 'WETH',
				'wrapped-bitcoin': 'WBTC',
			};
			const assetIds = Object.keys(tickers).join('%2C');
			const url = `https://api.coingecko.com/api/v3/simple/price?ids=${assetIds}&vs_currencies=usd`;
			const response = await fetch(url);
			const prices = await response.json();
			for (const id in prices) {
				const ticker = tickers[id];
				const price = prices[id].usd;
				Vue.set(this.prices, ticker, price);
			}
		},
		async loadSets() {
			const url = "https://api.thegraph.com/subgraphs/name/destiner/token-sets";
			const query = `
				query {
					tokenSets {
						set_ {
							symbol
							supply
							units
							naturalUnit
						}
						underlyingSet {
							components
							units
							naturalUnit
						}
					}
				}`;
			const opts = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ query })
			};
			const response = await fetch(url, opts);
			const json = await response.json();
			const data = json.data;
			const tokenSets = data.tokenSets;
			const sets = [];
			for (const tokenSet of tokenSets) {
				const set = {
					symbol: tokenSet.set_.symbol,
					supply: tokenSet.set_.supply,
					units: tokenSet.set_.units,
					naturalUnit: tokenSet.set_.naturalUnit,
					underlyingComponents: tokenSet.underlyingSet.components,
					underlyingUnits: tokenSet.underlyingSet.units,
					underlyingNaturalUnit: tokenSet.underlyingSet.naturalUnit,
				};
				sets.push(set);
			}
			this.sets = sets;
		},
		getSupply(supplyString) {
			const supplyNumber = new BigNumber(supplyString);
			const ten = new BigNumber(10);
			const multiplier = ten.pow(18);
			const shortSupplyNumber = supplyNumber.div(multiplier);
			const shortSupplyString = shortSupplyNumber.toString();
			return shortSupplyString;
		},
		getPrice(set) {
			const underlyingComponents = set.underlyingComponents;
			const underlyingUnits = set.underlyingUnits;
			const underlyingNaturalUnit = set.underlyingNaturalUnit;
			const count = underlyingComponents.length;
			let value = new BigNumber(0);
			for (let i = 0; i < count; i++) {
				const component = underlyingComponents[i];
				const componentTicker = this.addresses[component];
				const unit = new BigNumber(underlyingUnits[i]);
				const price = new BigNumber(this.prices[componentTicker]);
				const ten = new BigNumber(10);
				const decimals = this.decimals[componentTicker];
				const multiplier = ten.pow(18 - decimals);
				const componentValue = unit.times(price).times(multiplier);
				value = value.plus(componentValue);
			}
			const setUnits = set.units;
			const setNaturalUnit = set.naturalUnit;
			const price = value.div(underlyingNaturalUnit).times(setUnits).div(setNaturalUnit);
			return price.toString();
		},
		getMarketCap(supplyString, priceString) {
			const supply = new BigNumber(supplyString);
			const price = new BigNumber(priceString);
			const ten = new BigNumber(10);
			const multiplier = ten.pow(18);
			const marketCap = supply.times(price);
			return marketCap.toString();
		},
		formatSupply(supplyString) {
			const supply = new BigNumber(supplyString);
			return supply.toFixed(2);
		},
		formatMoney(priceString) {
			let price = new BigNumber(priceString);
			let suffix = '';
			if (price.gt(1000)) {
				price = price.div(1000);
				suffix = 'K';
			}
			if (price.gt(1000)) {
				price = price.div(1000);
				suffix = 'M';
			}
			return `$${price.toFixed(2)}${suffix}`;
		}
	},
	computed: {
		tokenSets() {
			const tokenSets = [];
			if (Object.keys(this.sets) == 0) {
				return tokenSets;
			}
			for (const set of this.sets) {
				const ticker = this.setTickers[set.symbol];
				const supply = this.getSupply(set.supply);
				const price = this.getPrice(set);
				const tokenSet = {
					ticker,
					icon: this.setIcons[ticker],
					supply,
					price,
					marketCap: this.getMarketCap(supply, price),
				};
				tokenSets.push(tokenSet);
			}
			tokenSets.sort((a, b) => {
				const aMarketCap = new BigNumber(a.marketCap);
				const bMarketCap = new BigNumber(b.marketCap);
				return aMarketCap.lt(bMarketCap)
					? 1
					: aMarketCap.gt(bMarketCap)
						? -1
						: 0;
			})
			return tokenSets;
		},
		totalMarketCap() {
			const zero = new BigNumber(0);
			const marketCap = this.tokenSets.reduce((total, tokenSet) => {
				return total.plus(tokenSet.marketCap);
			}, zero);
			return marketCap;
		},
		totalSetCount() {
			return this.tokenSets.length;
		},
	}
}
</script>

<style scoped>
#title {
	margin-left: 40px;
}

#stats {
	margin-top: 3em;
	display: flex;
	justify-content: center;
}

.stat {
	margin: 0 3em;
}

.stat-amount {
	font-size: 3em;
}

.stat-label {
	display: flex;
	justify-content: center;
	font-size: 0.85em;
}

#table {
	margin-top: 3em;
	display: flex;
	justify-content: center;
}

table {
	width: 800px;
	padding: 1em;
	border-radius: 8px;
	border: 1px solid #9f958c;
}

tr {
	display: flex;
	border-bottom: 1px solid #9f958c;
	padding: 0.75em 1em;
}

tr:last-child {
	border-bottom: none;
}

tr.row-data {
	cursor: pointer;
}

tr.row-data:hover {
	background: #f5f7f8;
}

th {
	text-align: left;
	font-weight: normal;
	color: #9b9b9b;
}

.set-icon {
	height: 24px;
}

.set-title {
	margin-left: 0.5em;
}

.column-name {
	display: flex;
	flex: 1.5;
	text-align: left;
	align-items: center;
}

.column-number {
	flex: 1;
	text-align: right;
}
</style>

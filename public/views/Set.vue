<template>
	<div id="view" v-if="tokenSet">
		<h1 id="set-name">
			<img class="set-logo" :src="tokenSet.icon" >
			{{ tokenSet.ticker }}
		</h1>
		<div id="set-description">{{ tokenSet.description }}</div>
		<div id="stats">
			<div class="stat">
				<div class="stat-amount">{{ formatSupply(tokenSet.supply) }}</div>
				<div class="stat-label">Supply</div>
			</div>
			<div class="stat">
				<div class="stat-amount">{{ formatMoney(tokenSet.marketCap) }}</div>
				<div class="stat-label">Market cap</div>
			</div>
			<div class="stat">
				<div class="stat-amount">{{ formatMoney(tokenSet.price) }}</div>
				<div class="stat-label">Price</div>
			</div>
		</div>
		<div class="section-wrapper">
			<div id="holdings" class="section block">
				<h3 class="section-title">Holdings</h3>
				<div id="holding-list">
					<div class="holding">
						<div class="holding-asset">ETH</div>
						<div class="holding-line">---------------------------------------------------------------------------------------------------------------------------------------------------------------------</div>
						<div class="holding-share">100%</div>
					</div>
					<div class="holding">
						<div class="holding-asset">USDC</div>
						<div class="holding-line">-</div>
						<div class="holding-share">0%</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="section-wrapper">
			<div id="issuances-redemptions" class="section-big">
				<div id="issuances" class="block">
					<h3 class="section-title">Recent issuances</h3>
					<table>
						<tr>
							<th class="column-date">Date</th>
							<th class="column-address">User</th>
							<th class="column-number">Amount</th>
						</tr>
						<tr class="row-data">
							<td class="column-date">Today</td>
							<td class="column-address">0x1234…5678</td>
							<td class="column-number">1,312</td>
						</tr>
						<tr class="row-data">
							<td class="column-date">Yesterday</td>
							<td class="column-address">0x1234…5678</td>
							<td class="column-number">659</td>
						</tr>
					</table>
				</div>
				<div id="redemptions" class="block">
					<h3 class="section-title">Recent redemptions</h3>
					<table>
						<tr>
							<th class="column-date">Date</th>
							<th class="column-address">User</th>
							<th class="column-number">Amount</th>
						</tr>
						<tr class="row-data">
							<td class="column-date">Today</td>
							<td class="column-address">0x1234…5678</td>
							<td class="column-number">1,312</td>
						</tr>
						<tr class="row-data">
							<td class="column-date">Yesterday</td>
							<td class="column-address">0x1234…5678</td>
							<td class="column-number">659</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		<div class="section-wrapper">
			<div id="rebalances" class="section block">
				<h3 class="section-title">Rebalances</h3>
				<table>
					<tr>
						<th class="column-date">Date</th>
						<th class="column-address">Old set</th>
						<th class="column-address">New set</th>
					</tr>
					<tr class="row-data">
						<td class="column-date">Today</td>
						<td class="column-address">0x1234…5678</td>
						<td class="column-address">0x1234…5678</td>
					</tr>
					<tr class="row-data">
						<td class="column-date">Yesterday</td>
						<td class="column-address">0x1234…5678</td>
						<td class="column-address">0x1234…5678</td>
					</tr>
				</table>
			</div>
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
			'set': undefined,
			'ticker': '',
			'tickers': {
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
			'descriptions': {
				'ETH20SMACO': 'ETH 20 Day Moving Average Crossover',
				'ETH50SMACO': 'ETH 50 Day Moving Average Crossover',
				'ETH12EMACO': 'ETH 12 Day EMA Crossover',
				'ETH26EMACO': 'ETH 26 Day EMA Crossover',
				'BTCETH7525': 'BTC ETH 75%/25% Weight',
				'ETHBTC7525': 'ETH BTC 75%/25% Weight',
				'BTCETH5050': 'BTC ETH Equal Weight',
				'BTCMINVOL': 'BTC Range Bound Min Volatility',
				'ETHMINVOL': 'ETH Range Bound Min Volatility',
				'BTCLOVOL': 'BTC Range Bound Low Volatility',
				'ETHLOVOL': 'ETH Range Bound Low Volatility',
				'BTCHIVOL': 'BTC Range Bound High Volatility',
				'ETHHIVOL': 'ETH Range Bound High Volatility',
			},
			'icons': {
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
		this.ticker = this.$route.params.ticker;
		await this.loadPrices();
		await this.loadSet();
	},
	methods: {
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
		async loadSet() {
			const url = "https://api.thegraph.com/subgraphs/name/destiner/token-sets";
			const query = `
				query {
					tokenSets {
						set_ {
							symbol
							supply
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
			for (const tokenSet of tokenSets) {
				const symbol = tokenSet.set_.symbol;
				const ticker = this.tickers[symbol];
				if (ticker != this.ticker) {
					continue;
				}
				const set = {
					symbol: tokenSet.set_.symbol,
					supply: tokenSet.set_.supply,
					components: tokenSet.underlyingSet.components,
					units: tokenSet.underlyingSet.units,
					naturalUnit: tokenSet.underlyingSet.naturalUnit,
				};
				this.set = set;
			}
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
			const components = set.components;
			const units = set.units;
			const naturalUnit = set.naturalUnit;
			const count = components.length;
			let value = new BigNumber(0);
			for (let i = 0; i < count; i++) {
				const component = components[i];
				const componentTicker = this.addresses[component];
				const unit = new BigNumber(units[i]);
				const price = new BigNumber(this.prices[componentTicker]);
				const ten = new BigNumber(10);
				const decimals = this.decimals[componentTicker];
				const multiplier = ten.pow(18 - decimals);
				const componentValue = unit.times(price).times(multiplier);
				value = value.plus(componentValue);
			}
			const price = value.div(naturalUnit);
			return price.toString();
		},
		getMarketCap(supplyString, priceString) {
			const supply = new BigNumber(supplyString);
			const price = new BigNumber(priceString);
			const ten = new BigNumber(10);
			const multiplier = ten.pow(18);
			const marketCap = supply.times(price);
			return marketCap;
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
		},
	},
	computed: {
		tokenSet() {
			const ticker = this.ticker;
			const set = this.set;
			if (!ticker || !set) {
				return;
			}
			const supply = this.getSupply(set.supply);
			const price = this.getPrice(set);
			const tokenSet = {
				ticker,
				icon: this.icons[ticker],
				description: this.descriptions[ticker],
				supply,
				price,
				marketCap: this.getMarketCap(supply, price),
			}
			return tokenSet;
		}
	},
}
</script>

<style scoped>
#set-name {
	margin-left: 40px;
}

.set-logo {
	height: 32px;
}

#set-description {
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

.section-wrapper {
	margin-top: 2em;
	display: flex;
	justify-content: center;
}

.section {
	width: 1000px;
}

.section-big {
	width: 1040px;
}

.block {
	border-radius: 8px;
	padding: 1em;
	border: 1px solid #e0d8f4;
}

#holdings {
	margin-top: 1em;
}

.holding {
	display: flex;
	margin-bottom: 0.5em;
}

.holding-asset {
	flex: 1;
}

.holding-line {
	flex: 10;
}

.holding-share {
	flex: 1;
	text-align: right;
}

#issuances-redemptions {
	display: flex;
}

#issuances {
	flex: 1;
}

#redemptions {
	margin-left: 2em;
	flex: 1;
}

#rebalances {
}

/* Table */
table {
	width: 100%;
}

th {
	font-weight: normal;
	color: #9b9b9b;
}

tr {
	display: flex;
	border-bottom: 1px solid #dad7e2;
	padding: 0.75em 1em;
}

tr:last-child {
	border-bottom: none;
}

.column-date {
	flex: 1;
	text-align: left;
}

.column-address {
	flex: 1;
	text-align: left;
}

.column-number {
	flex: 1;
	text-align: right;
}

</style>

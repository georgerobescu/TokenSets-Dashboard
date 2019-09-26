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
					<div class="holding" v-for="holding in tokenSet.holdings">
						<div class="holding-asset">{{ holding.ticker }}</div>
						<div class="holding-line-wrapper">
							<div class="holding-line" :class="{ 
								'holding-line-usdc': holding.ticker == 'USDC',
								'holding-line-dai': holding.ticker == 'DAI',
								'holding-line-eth': holding.ticker == 'WETH',
								'holding-line-btc': holding.ticker == 'WBTC',
								'holding-line-0': holding.share < 0.2,
								'holding-line-25': holding.share >= 0.2 && holding.share < 0.45,
								'holding-line-50': holding.share >= 0.45 && holding.share < 0.65,
								'holding-line-75': holding.share >= 0.65 && holding.share < 0.85,
								'holding-line-100': holding.share >= 0.85,
							}"></div>
						</div>
						<div class="holding-share">{{ formatShare(holding.share) }}</div>
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
						<tr class="row-data" v-for="issuance in issuances">
							<td class="column-date">{{ formatTimestamp(issuance.timestamp) }}</td>
							<td class="column-address">{{ formatAddress(issuance.account) }}</td>
							<td class="column-number">{{ issuance.amount }}</td>
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
						<tr class="row-data" v-for="redemption in redemptions">
							<td class="column-date">{{ formatTimestamp(redemption.timestamp) }}</td>
							<td class="column-address">{{ formatAddress(redemption.account) }}</td>
							<td class="column-number">{{ redemption.amount }}</td>
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
					<tr class="row-data" v-for="rebalance in rebalances">
						<td class="column-date">{{ formatTimestamp(rebalance.timestamp)}}</td>
						<td class="column-address">{{ formatAddress(rebalance.oldSet) }}</td>
						<td class="column-address">{{ formatAddress(rebalance.newSet) }}</td>
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
			'issuances': [],
			'redemptions': [],
			'rebalances': [],
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
			'addresses': {
				'ETH12EMACO': '0x2c5a9980b41861d91d30d0e0271d1c093452dca5',
				'ETH26EMACO': '0x614857c755739354d68ae0abd53849cf45d6a41d',
				'ETH20SMACO': '0x9ea463ec4ce9e9e5bc9cfd0187c4ac3a70dd951d',
				'ETH50SMACO': '0xa360f2af3f957906468c0fd7526391aed08ae3db',
				'BTCETH7525': '0xa35fc5019c4dc509394bd4d74591a0bf8852c195',
				'BTCETH2575': '0xa6c040045d962e4b8efa00954c7d23ccd0a2b8ad',
				'BTCETH5050': '0xc06aec5191be16b94ffc97b6fc01393527367365',
				'BTCLOVOL': '0x20649d97b1393105cf92a5083fd2aff7c99ebe56',
				'ETHLOVOL': '0x585c2cf94c41b528ec7329cbc3cde3c4f8d268db',
				'BTCHIVOL': '0x6123a0cbc95cb157995a0795187a60995b85e0a9',
				'BTCMINVOL': '0x81c55017f7ce6e72451ced49ff7bab1e3df64d0c',
				'ETHHIVOL': '0x8ddc86dba7ad728012efc460b8a168aba60b403b',
				'ETHMINVOL': '0xf1e5f03086e1c0ce55e54cd8146bc9c28435346f',
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
			'componentAddresses': {
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
			const setAddress = this.addresses[this.ticker];
			const query = `
				query {
					tokenSets(where: {
						set_: "${setAddress}"
					}) {
						set_ {
							symbol
							supply
						}
						underlyingSet {
							components
							units
							naturalUnit
						}
						rebalances(orderBy: timestamp, orderDirection: desc) {
							timestamp
							oldSet {
								address
							}
							newSet {
								address
							}
						}
					}
					issuances(first: 3, orderBy: timestamp, orderDirection: desc, where: {
						set_: "${setAddress}"
					}) {
						timestamp
						amount
						account
					}
					redemptions(first: 3, orderBy: timestamp, orderDirection: desc, where: {
						set_: "${setAddress}"
					}) {
						timestamp
						amount
						account
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
			const tokenSet = data.tokenSets[0];
			const symbol = tokenSet.set_.symbol;
			// Save set
			const set = {
				symbol: tokenSet.set_.symbol,
				supply: tokenSet.set_.supply,
				components: tokenSet.underlyingSet.components,
				units: tokenSet.underlyingSet.units,
				naturalUnit: tokenSet.underlyingSet.naturalUnit,
			};
			this.set = set;
			// Save issuances
			const issuances = data.issuances;
			for (const issuance of issuances) {
				const amount = new BigNumber(issuance.amount);
				const ten = new BigNumber(10);
				const multiplier = ten.pow(18);
				const shortAmount = amount.div(multiplier);
				this.issuances.push({
					timestamp: issuance.timestamp,
					account: issuance.account,
					amount: shortAmount.toString(),
				});
			}
			// Save redemptions
			const redemptions = data.redemptions;
			for (const redemption of redemptions) {
				const amount = new BigNumber(redemption.amount);
				const ten = new BigNumber(10);
				const multiplier = ten.pow(18);
				const shortAmount = amount.div(multiplier);
				this.redemptions.push({
					timestamp: redemption.timestamp,
					account: redemption.account,
					amount: shortAmount.toString(),
				})
			}
			// Save rebalances
			const rebalances = tokenSet.rebalances;
			for (const rebalance of rebalances) {
				this.rebalances.push({
					timestamp: rebalance.timestamp,
					oldSet: rebalance.oldSet.address,
					newSet: rebalance.newSet.address,
				});
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
				const unit = new BigNumber(units[i]);
				const componentValue = this.getComponentValue(component, unit);
				value = value.plus(componentValue);
			}
			const price = value.div(naturalUnit);
			return price.toString();
		},
		getHoldings(set) {
			const components = set.components;
			const units = set.units;
			const naturalUnit = set.naturalUnit;
			const count = components.length;
			let value = new BigNumber(0);
			for (let i = 0; i < count; i++) {
				const component = components[i];
				const unit = new BigNumber(units[i]);
				const componentValue = this.getComponentValue(component, unit);
				value = value.plus(componentValue);
			}
			const holdings = [];
			for (let i = 0; i < count; i++) {
				const component = components[i];
				const unit = new BigNumber(units[i]);
				const componentValue = this.getComponentValue(component, unit);
				const componentShare = componentValue.div(value);
				const holding = {
					ticker: this.componentAddresses[component],
					share: componentShare.toString(),
				};
				holdings.push(holding);
			}
			return holdings;
		},
		getComponentValue(component, unit) {
			const componentTicker = this.componentAddresses[component];
			const price = new BigNumber(this.prices[componentTicker]);
			const ten = new BigNumber(10);
			const decimals = this.decimals[componentTicker];
			const multiplier = ten.pow(18 - decimals);
			const componentValue = unit.times(price).times(multiplier);
			return componentValue;
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
		formatShare(shareString) {
			const share = new BigNumber(shareString);
			return `${share.times(100).toFixed(0)}%`;
		},
		formatTimestamp(timestamp) {
			const date = new Date(timestamp * 1000);
			const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
			const dateString = date.toLocaleDateString('en-EN', options);
			return dateString;
		},
		formatAddress(addresses) {
			const shortAddress = `${addresses.substr(0,6)}…${addresses.substr(38)}`;
			return shortAddress;
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
				holdings: this.getHoldings(set),
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

.holding-line-wrapper {
	flex: 10;
	display: flex;
	align-items: center;
}

.holding-line {
	border-radius: 20px;
	font-weight: 600;
	height: 8px;
}

.holding-line-0 {
	width: 0%;
}

.holding-line-25 {
	width: 25%;
}

.holding-line-50 {
	width: 50%;
}

.holding-line-75 {
	width: 75%;
}

.holding-line-100 {
	width: 100%;
}

.holding-line-eth {
	background: linear-gradient(to right, #8089f5, #4950e8);
}

.holding-line-btc {
	background: linear-gradient(to right, #f4b27a, #f09242);
}

.holding-line-usdc {
	background: linear-gradient(to right, #2775ca, #2926c9);
}

.holding-line-dai {
	background: linear-gradient(to right, #ffcc80, #ffb74d);
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

<template>
	<div>
		<h1 id="title">TokenSets Dashboard</h1>
		<div id="stats">
			<div class="stat">
				<div class="stat-amount">13</div>
				<div class="stat-label">Tokens</div>
			</div>
			<div class="stat">
				<div class="stat-amount">$1.8M</div>
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
				<tr class="row-data" @click="openSet()">
					<td class="column-name">
						<img class="set-icon" src="../assets/eth20smaco.svg">
						<span class="set-title">ETH20SMACO</span>
					</td>
					<td class="column-number">5,712</td>
					<td class="column-number">$245.37</td>
					<td class="column-number">$1,401,439</td>
				</tr>
				<tr class="row-data" @click="openSet()">
					<td class="column-name">
						<img class="set-icon" src="../assets/eth12emaco.svg">
						<span class="set-title">ETH12EMACO</span>
					</td>
					<td class="column-number">1,354</td>
					<td class="column-number">$199.92</td>
					<td class="column-number">$270,601</td>
				</tr>
				<tr class="row-data" @click="openSet()">
					<td class="column-name">
						<img class="set-icon" src="../assets/eth26emaco.svg">
						<span class="set-title">ETH26EMACO</span>
					</td>
					<td class="column-number">1,357</td>
					<td class="column-number">$169.26</td>
					<td class="column-number">$229,752</td>
				</tr>
				<tr class="row-data" @click="openSet()">
					<td class="column-name">
						<img class="set-icon" src="../assets/ethvol.svg">
						<span class="set-title">ETHLOVOL</span>
					</td>
					<td class="column-number">1,191</td>
					<td class="column-number">$103.21</td>
					<td class="column-number">$122,926</td>
				</tr>
				<tr class="row-data" @click="openSet()">
					<td class="column-name">
						<img class="set-icon" src="../assets/btceth5050.svg">
						<span class="set-title">BTCETH5050</span>
					</td>
					<td class="column-number">420</td>
					<td class="column-number">$248.58</td>
					<td class="column-number">$104,445</td>
				</tr>
				<tr class="row-data" @click="openSet()">
					<td class="column-name">
						<img class="set-icon" src="../assets/eth50smaco.svg">
						<span class="set-title">ETH50SMACO</span>
					</td>
					<td class="column-number">608</td>
					<td class="column-number">$146.55</td>
					<td class="column-number">$89,049</td>
				</tr>
				<tr class="row-data" @click="openSet()">
					<td class="column-name">
						<img class="set-icon" src="../assets/ethvol.svg">
						<span class="set-title">ETHMINVOL</span>
					</td>
					<td class="column-number">484</td>
					<td class="column-number">$77.47</td>
					<td class="column-number">$37,530</td>
				</tr>
				<tr class="row-data" @click="openSet()">
					<td class="column-name">
						<img class="set-icon" src="../assets/btceth2575.svg">
						<span class="set-title">ETHBTC7525</span>
					</td>
					<td class="column-number">279</td>
					<td class="column-number">$110.91</td>
					<td class="column-number">$30,960</td>
				</tr>
				<tr class="row-data" @click="openSet()">
					<td class="column-name">
						<img class="set-icon" src="../assets/btceth7525.svg">
						<span class="set-title">BTCETH7525</span>
					</td>
					<td class="column-number">191</td>
					<td class="column-number">$144.33</td>
					<td class="column-number">$27,560</td>
				</tr>
				<tr class="row-data" @click="openSet()">
					<td class="column-name">
						<img class="set-icon" src="../assets/btcvol.svg">
						<span class="set-title">BTCMINVOL</span>
					</td>
					<td class="column-number">228</td>
					<td class="column-number">$92.58</td>
					<td class="column-number">$21,110</td>
				</tr>
				<tr class="row-data" @click="openSet()">
					<td class="column-name">
						<img class="set-icon" src="../assets/ethvol.svg">
						<span class="set-title">ETHHIVOL</span>
					</td>
					<td class="column-number">162</td>
					<td class="column-number">$107.82</td>
					<td class="column-number">$17,419</td>
				</tr>
				<tr class="row-data" @click="openSet()">
					<td class="column-name">
						<img class="set-icon" src="../assets/btcvol.svg">
						<span class="set-title">BTCLOVOL</span>
					</td>
					<td class="column-number">109</td>
					<td class="column-number">$133.37</td>
					<td class="column-number">$14,527</td>
				</tr>
				<tr class="row-data" @click="openSet()">
					<td class="column-name">
						<img class="set-icon" src="../assets/btcvol.svg">
						<span class="set-title">BTCHIVOL</span>
					</td>
					<td class="column-number">82</td>
					<td class="column-number">$135.22</td>
					<td class="column-number">$11,103</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
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
	methods: {
		openSet() {
			this.$router.push({
				name: 'set',
				params: {
					ticker: 'eth20smaco'
				}
			});
		}
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
	border: 1px solid #dad7e2;
}

tr {
	display: flex;
	border-bottom: 1px solid #dad7e2;
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

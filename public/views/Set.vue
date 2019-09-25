<template>
	<div id="view">
		<h1 id="set-name">
			<img class="set-logo" src="../assets/eth20smaco.svg">
			ETH20SMACO
		</h1>
		<div id="set-description">ETH 20 Day Moving Average Crossover</div>
		<div id="stats">
			<div class="stat">
				<div class="stat-amount">108</div>
				<div class="stat-label">Holders</div>
			</div>
			<div class="stat">
				<div class="stat-amount">1,312</div>
				<div class="stat-label">Supply</div>
			</div>
			<div class="stat">
				<div class="stat-amount">$825k</div>
				<div class="stat-label">Total market cap</div>
			</div>
			<div class="stat">
				<div class="stat-amount">$269</div>
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
export default {

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

<script lang="ts">
	import medailleOr from '$lib/assets/icons/medaille-or.svg';
	import medailleArgent from '$lib/assets/icons/medaille-argent.svg';
	import medailleBronze from '$lib/assets/icons/medaille-bronze.svg';

	import Thanks from '$lib/thanks.svelte';

	import {
		LEADERBOARD,
		LEADERBOARD_REGION,
		METADATA,
		getDayNumber,
		getDepartmentName,
		getRegionName
	} from '$lib/utils';

	const dayNumber = getDayNumber();

	const append = (a, x) => a.concat([x]);

	const resultLines = LEADERBOARD.map(([code, score]) => ({ code, score })).reduce(
		(acc, x, i) =>
			append(acc, {
				...x,
				rank: i > 0 && x.score === acc[i - 1].score ? acc[i - 1].rank : i + 1
			}),
		[]
	);

	const resultLinesRegion = LEADERBOARD_REGION.map(([code, score]) => ({ code, score })).reduce(
		(acc, x, i) =>
			append(acc, {
				...x,
				rank: i > 0 && x.score === acc[i - 1].score ? acc[i - 1].rank : i + 1
			}),
		[]
	);

	const now = new Date();
	const formattedDate = now.toLocaleDateString('fr', { dateStyle: 'medium' });

	const lastUpdateDate = new Date(METADATA.lastImport);
	lastUpdateDate.setDate(lastUpdateDate.getDate() - 1);
	const formattedLastUpdateDate = lastUpdateDate.toLocaleDateString('fr', { dateStyle: 'medium' });
</script>

<svelte:head><title>Régions | 100 jours de zbeul</title></svelte:head>

<main role="main">
	<p class="mb-16 mt-24 text-center">
		<span class="zbeul olympic-red mb-0 block text-8xl leading-[5rem]">
			{100 - dayNumber}
		</span>
		<span class="mt-0 block text-xl">jours restants</span>
	</p>

	<h2 class="zbeul mb-2">Classement temporaire au {formattedDate}</h2>
	<p class="mb-2 text-center italic">
		(tenant compte des données jusqu’au {formattedLastUpdateDate} inclus)
	</p>
	<p class="mb-6 text-center italic">
		Cliquez sur le nom de la région pour avoir le détail du décompte.
	</p>
	<div class="mx-auto mb-6 mt-10 flex max-w-5xl flex-wrap items-start justify-between text-xl">
		<table class="ranking">
			<thead>
				<tr>
					<th scope="col" class="p-1 sm:p-2">Région</th>
					<th scope="col" class="p-1 text-center sm:p-2">Rang</th>
					<th scope="col" class="p-1 text-center sm:p-2">Points</th>
				</tr>
			</thead>
			<tbody>
				{#each resultLinesRegion as { code, score, rank }}
					<tr class="ranking-line">
						<th scope="row" class="p-1 sm:p-2">
							<a
								href="/region/{code}"
								class="ranking-link no-underline hover:underline"
								class:font-bold={rank < 4}
							>
								{getRegionName(code)}
							</a>
						</th>
						<td class="p-1 text-center sm:p-2">
							{#if rank === 1}
								<img role="img" src={medailleOr} alt="1 (médaille d’or)" class="m-auto" />
							{:else if rank === 2}
								<img role="img" src={medailleArgent} alt="2 (médaille d’argent)" class="m-auto" />
							{:else if rank === 3}
								<img role="img" src={medailleBronze} alt="3 (médaille de bronze)" class="m-auto" />
							{:else}
								{rank}
							{/if}
						</td>
						<td class="p-1 text-right sm:p-2" class:font-bold={rank < 4}>
							{score} pts<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								class="icon-link"
								aria-hidden="true"
								><path
									d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"
								/></svg
							>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<ul class="mb-20 text-center text-lg">
		<li><a href="/">Classement par département</a></li>
		<li><a href="/regles-du-jeu">Règles du jeu</a></li>
		<li><a href="/comment-participer">Comment participer</a></li>
		<li><a href="/presse">Revue de presse</a></li>
		<li>
			<a
				href="https://framaforms.org/100-jours-de-zbeul-proposer-un-evenement-1682372493"
				class="font-bold">Signaler une action</a
			>
		</li>
	</ul>

	<Thanks />
</main>

<style lang="postcss">
	.olympic-red {
		@apply text-[#dd0220];
	}

	.ranking {
		@apply w-full;
		text-align: left;
		margin-bottom: 3rem;
	}

	.ranking thead {
		background-color: #e5e7eb;
	}

	.ranking tr {
		position: relative;
	}

	.ranking th,
	.ranking td {
		border-width: 1px 0;
		border-style: solid;
		border-color: #e5e7eb;
	}

	.ranking th:last-child,
	.ranking td:last-child {
		min-width: 7rem;
	}

	.ranking-line th {
		@apply font-normal;
	}

	/* Étend la zone cliquable du lien à toute la ligne */
	.ranking-link::before {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		content: '';
	}
</style>

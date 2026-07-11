/**
 * 首頁文章搜尋：載入 search.json 索引，輸入時以子字串比對
 * 標題＋標籤＋摘要，顯示/隱藏伺服器渲染好的文章卡片。
 * 無 JS 環境下列表照常顯示（漸進增強）。
 */
(function () {
	const input = document.getElementById('search-input');
	const list = document.getElementById('post-list');
	const empty = document.getElementById('search-empty');
	if (!input || !list) return;

	let index = null;
	let loading = null;

	function loadIndex() {
		if (!loading) {
			loading = fetch('/search.json')
				.then(function (r) { return r.json(); })
				.then(function (data) { index = data; })
				.catch(function (err) { console.error('搜尋索引載入失敗:', err); });
		}
		return loading;
	}

	// 第一次 focus 才載入索引，不拖慢首頁
	input.addEventListener('focus', loadIndex, { once: true });

	input.addEventListener('input', function () {
		const q = input.value.trim().toLowerCase();
		const cards = list.querySelectorAll('.post-card');

		if (!q) {
			cards.forEach(function (card) { card.style.display = ''; });
			if (empty) empty.classList.add('hidden');
			return;
		}

		loadIndex().then(function () {
			if (!index) return;

			const matchedUrls = new Set(
				index.filter(function (post) {
					const haystack = (
						post.title + ' ' +
						(post.tags || []).join(' ') + ' ' +
						(post.excerpt || '')
					).toLowerCase();
					return haystack.indexOf(q) !== -1;
				}).map(function (post) { return post.url; })
			);

			let visible = 0;
			cards.forEach(function (card) {
				const show = matchedUrls.has(card.dataset.url);
				card.style.display = show ? '' : 'none';
				if (show) visible++;
			});
			if (empty) empty.classList.toggle('hidden', visible > 0);
		});
	});
})();

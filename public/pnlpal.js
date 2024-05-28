$(window).on('action:app.load', function () {
	let inited = false;
	$(window).on('action:topics.loaded', function () {
		if (!inited) {
			setupVote();
			inited = true;
		}
	});

	setupDictionariezTrove();
	highlightCategoryOnSidebar();
	setupAddToDictionariezToAllCodeBlocks();
});

function setupAddToDictionariezToAllCodeBlocks() {
	function waitForElement(selector, timeout = 3000) {
		return new Promise((resolve, reject) => {
			const interval = setInterval(() => {
				const element = document.querySelector(selector);
				if (element) {
					clearInterval(interval);
					resolve(element);
				}
			}, 300);
			setTimeout(() => {
				clearInterval(interval);
				reject(new Error(`Element ${selector} not found`));
			}, timeout);
		});
	}

	waitForElement('body[data-dictionariez-version]')
		.then(() => {
			$(document).on(
				'mouseenter',
				'[component="post/content"], [component="composer"] .preview',
				function () {
					const $this = $(this);
					if ($this.find('.add-to-dictionariez').length) {
						return;
					}
					if ($this.find('pre code').length === 0) {
						return;
					}

					const $addToDictionariez =
						$(`<a href="https://github.com/pnlpal/dictionaries" 
			target="_blank" rel="nofollow" 
			class="btn btn-sm btn-outline-info add-to-dictionariez">Add to Dictionariez</a>
		`);

					$this.find('code').before($addToDictionariez);
				}
			);
		})
		.catch((_) => {
			// ignore
		});
}

function setupDictionariezTrove() {
	const categoryName = 'Dictionariez Trove';

	$(window).on('action:topic.loaded', function (ev, topic) {
		if (topic.category && topic.category.name === categoryName) {
			$('.add-to-dictionariez').removeClass('hidden');
		}
	});
}

const highlightCategoryOnSidebar = function () {
	$(window).on('action:category.loaded', function (_, { cid }) {
		$('ul.categories-list li a').each(function () {
			const $this = $(this);
			if ($this.attr('href').includes(`/category/${cid}`)) {
				$this.addClass('active');
			}
		});
	});
};

function setupVote() {
	require(['api'], function (api) {
		$(document).on('click', '.topic-list a.upvote', function (event) {
			var postWrapper = $(this).closest('[data-pid]');
			var pid = postWrapper.data('pid');
			var upvoted = $(this).data('upvoted');

			const method = upvoted ? 'del' : 'put';
			api[method](`/posts/${pid}/vote`, {
				delta: 1,
			})
				.then(() => {})
				.catch((err) => {
					app.alertError(err.message);

					if (err.message === '[[error:not-logged-in]]') {
						ajaxify.go('login');
					}
				});

			return false;
		});

		function togglePostVote(data) {
			var post = $('[data-pid="' + data.post.pid + '"]', '.topic-list');
			var $el = post.find('[component="post/upvote"]');
			if (data.upvote) {
				$el.data('upvoted', true);
				$el.find('i.fa').removeClass('fa-heart-o').addClass('fa-heart');
			} else {
				$el.data('upvoted', false);
				$el.find('i.fa').addClass('fa-heart-o').removeClass('fa-heart');
			}

			post.find('[component="post/vote-count"]').html(data.post.votes);
		}

		const events = {
			'posts.upvote': togglePostVote,
			'posts.unvote': togglePostVote,
		};

		for (var eventName in events) {
			if (events.hasOwnProperty(eventName)) {
				socket.on(eventName, events[eventName]);
			}
		}
	});
}

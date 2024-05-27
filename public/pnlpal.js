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
});

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

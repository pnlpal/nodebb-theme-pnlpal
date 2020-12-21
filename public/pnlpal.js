$(window).on('action:app.load', function () {
    setupDictionariezTrove();
    
    let inited = false;
    $(window).on('action:topics.loaded', function(ev, res) {
        if (!inited) {
            setupVote();
            inited = true;
        }
    });
});

function setupDictionariezTrove() {
    const categoryName = 'Dictionariez Trove';

    $(window).on('action:topics.loaded', function(ev, res) {
        if (res && res.topics) {
            res.topics.forEach(topic => {
                const $div = $(`div[component="topic/teaser"][data-tid="${topic.tid}"]`);

                if (topic.category.name === categoryName) {
                    $div.find('.add-to-dictionariez').removeClass('hidden');
                } else {
                    $div.find('.post-content').removeClass('hidden');
                }
            });
        }
    });
    $(window).on('action:topic.loaded', function(ev, topic) {
        if (topic.category && topic.category.name === categoryName) {
            $('.topic .add-to-dictionariez').removeClass('hidden');
        }
    });
}

function setupVote() {
    require(['api'], function (api) {
        $(document).on('click', '.topic-list a.upvote', function (event) {
            var postWrapper = $(this).closest('[data-pid]');
            var pid = postWrapper.data('pid');
            var upvoted = $(this).data('upvoted');
    
            const method = upvoted ? 'del' : 'put';
            api[method](`/posts/${pid}/vote`, {
                delta: 1,
            }).then(() => {

            }).catch((err) => {
                app.alertError(err.message);
    
                if (err.message === '[[error:not-logged-in]]') {
                    ajaxify.go('login');
                }
            });
    
            return false;
        });

        function togglePostVote (data) {
            var post = $('[data-pid="' + data.post.pid + '"]', '.topic-list');
            var $el = post.find('[component="post/upvote"]');
            if (data.upvote) {
                $el.data('upvoted', true);
                $el.find('i.fa').removeClass('fa-heart-o').addClass('fa-heart');
            } else {
                $el.data('upvoted', false);
                $el.find('i.fa').addClass('fa-heart-o').removeClass('fa-heart');
            };

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

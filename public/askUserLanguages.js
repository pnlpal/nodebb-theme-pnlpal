'use strict';

$(document).ready(function () {
	const someLanguages = [
		'English',
		'Spanish',
		'Swedish',
		'Japanese',
		'French',
		'German',
		'Italian',
		'Mandarin',
		'Cantonese',
		'Vietnamese',
		'Indonesian',
		'Russian',
		'Arabic',
	];

	const success = () => {
		bootbox.dialog({
			size: 'large',
			className: 'modal-dialog-centered',
			title: "🎉Settings saved! You're ready to explore PNL.",
			message: `
            <p>Check out our six main categories:</p>
            <ul style="list-style:none; padding-left:0;">
                <li style="margin-bottom: 12px;">
                    <strong>
                        <a href="/category/7/language-exchange" style="color: #fff; background: #007bff; padding: 4px 12px; border-radius: 20px; text-decoration: none; font-weight: bold; box-shadow: 0 2px 8px rgba(0,123,255,0.15); display:inline-block;">
                            🌍 Language Exchange
                        </a>
                    </strong>
                    <span style="display:block; margin-top:4px; color:#007bff; font-weight:500;">
                        Ready to meet a language pal? Practice, teach, and learn together in Language Exchange!
                    </span>
                </li>
                <li style="margin-bottom: 12px;">
                    <strong>
                        <a href="/category/6/crafting" style="color: inherit; background: none; padding: 4px 12px; border-radius: 20px; text-decoration: none; font-weight: bold; display:inline-block;">
                            💻 Crafting
                        </a>
                    </strong>
                    <span style="display:block; margin-top:4px;">
                        Are you a developer, designer, or entrepreneur? Share your projects, code, and creative work here.
                    </span>
                </li>
                <li style="margin-bottom: 12px;">
                    <strong>
                        <a href="/category/1/sharing" style="color: inherit; background: none; padding: 4px 12px; border-radius: 20px; text-decoration: none; font-weight: bold; display:inline-block;">
                            📢 Sharing
                        </a>
                    </strong>
                    <span style="display:block; margin-top:4px;">
                        Post tutorials, tips, resources, or anything you've learned to help your fellow pals grow.
                    </span>
                </li>
                <li style="margin-bottom: 12px;">
                    <strong>
                        <a href="/category/3/feedback" style="color: inherit; background: none; padding: 4px 12px; border-radius: 20px; text-decoration: none; font-weight: bold; display:inline-block;">
                            🐞 Feedback
                        </a>
                    </strong>
                    <span style="display:block; margin-top:4px;">
                        Found a bug or have ideas to improve PNL? Share suggestions and help shape our community.
                    </span>
                </li>
                <li style="margin-bottom: 12px;">
                    <strong>
                        <a href="/category/4/dictionariez-trove" style="color: inherit; background: none; padding: 4px 12px; border-radius: 20px; text-decoration: none; font-weight: bold; display:inline-block;">
                            📚 Dictionariez Trove
                        </a>
                    </strong>
                    <span style="display:block; margin-top:4px;">
                        Enhance your Dictionariez, build your vocabulary, contribute to our dictionary collection.
                    </span>
                </li>
                <li style="margin-bottom: 12px;">
                    <strong>
                        <a href="/category/5/captionz-trove" style="color: inherit; background: none; padding: 4px 12px; border-radius: 20px; text-decoration: none; font-weight: bold; display:inline-block;">
                            🎬 Captionz Trove
                        </a>
                    </strong>
                    <span style="display:block; margin-top:4px;">
                        Explore and share educational videos. Find captions and help others learn through youtube.
                    </span>
                </li>
            </ul>
			
			<hr style="margin: 2em 0 1em 0; border-top: 1px solid #e0e0e0;">
			<p style="text-align:center; font-weight:500; margin-bottom:1em;">
				Want to connect beyond the forum?<br>
				<strong>Join our community chats and stay in the loop!</strong>
			</p>
			<div style="display:flex; justify-content:center; gap:18px; margin-bottom:1.2em;">
                <a href="https://discord.gg/KqBc6s96" target="_blank" rel="noopener" title="Join us on Discord" style="text-decoration:none;">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/discord.svg" alt="Discord" style="height:2em;vertical-align:middle;filter:invert(42%) sepia(98%) saturate(7492%) hue-rotate(221deg) brightness(99%) contrast(101%);margin-right:6px;">
                    <span style="font-weight:600; color:#5865F2;">Discord</span>
                </a>
                <a href="https://t.me/programmingandlanguage" target="_blank" rel="noopener" title="Join our Telegram channel" style="text-decoration:none;">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/telegram.svg" alt="Telegram" style="height:2em;vertical-align:middle;filter:invert(54%) sepia(97%) saturate(7492%) hue-rotate(176deg) brightness(99%) contrast(101%);margin-right:6px;">
                    <span style="font-weight:600; color:#229ED9;">Telegram</span>
                </a>
                <a href="https://bsky.app/profile/pnlcommunity.bsky.social" target="_blank" rel="noopener" title="Follow us on Bluesky" style="text-decoration:none;">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/bluesky.svg" alt="Bluesky" style="height:2em;vertical-align:middle;filter:invert(54%) sepia(97%) saturate(7492%) hue-rotate(176deg) brightness(99%) contrast(101%);margin-right:6px;">
                    <span style="font-weight:600; color:#229ED9;">Bluesky</span>
                </a>
				<a href="https://mastodon.social/@river_young" target="_blank" rel="noopener" title="Follow us on Mastodon" style="text-decoration:none;">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mastodon.svg" alt="Mastodon" style="height:2em;vertical-align:middle;filter:invert(33%) sepia(99%) saturate(7492%) hue-rotate(220deg) brightness(99%) contrast(101%);margin-right:6px;">
                    <span style="font-weight:600; color:#5865F2;">Mastodon</span>
                </a>
            </div>
        `,
			buttons: {
				ok: {
					label: 'Start Exploring!',
					className: 'btn-success',
				},
			},
		});
	};

	// window.success = success;

	const setupSelect2 = (selector, dropdownParent, savedValue = '') => {
		const $select = $(selector);
		if (!$select.length) {
			return;
		}
		const selectedValues = (savedValue || '')
			.split(',')
			.map((s) => s.trim())
			.filter(Boolean);
		// Populate options from someLanguages array
		const allValues = [...new Set([...someLanguages, ...selectedValues])];
		allValues.forEach(function (lang) {
			$select.append(
				$('<option>', {
					value: lang,
					text: lang,
					selected: selectedValues.includes(lang),
				})
			);
		});

		$select.select2({
			tags: true,
			placeholder: 'Type or select languages...',
			width: 'resolve',
			dropdownParent: dropdownParent,
		});
	};

	let dialogInitialized = false;
	$(window).on('action:topics.loaded', function () {
		if (!app.user?.uid) {
			return;
		}
		if (app.user.learningLanguages && app.user.fluentLanguages) {
			return; // User has already set their languages
		}
		if (dialogInitialized) {
			return; // Dialog already initialized
		}
		dialogInitialized = true;

		bootbox.dialog({
			size: 'large',
			className: 'ask-user-languages modal-dialog-centered',
			title: 'Welcome to our programming and language community!',
			message: `
    <p>Let others know what languages you're learning and which ones you're fluent in. This helps you connect with people who share your interests or need your expertise!</p>
    <div class="mb-3">
      <label for="learning-languages" class="form-label">Languages you are learning</label>
      <select id="learning-languages" multiple style="width:100%">
      </select>
    </div>
    <div class="mb-3">
      <label for="fluent-languages" class="form-label">Languages you are fluent in</label>
      <select id="fluent-languages" multiple style="width:100%">
      </select>
    </div>
  `,
			buttons: {
				confirm: {
					label: 'Save',
					className: 'btn-primary',
					callback: function () {
						const learning = $('#learning-languages').val();
						const fluent = $('#fluent-languages').val();
						if (!learning.length || !fluent.length) {
							bootbox.alert(
								'Please select at least one language in each category.'
							);
							return false;
						}
						$.ajax({
							type: 'POST',
							url: `/api/user/${app.user.uid}/languages`,
							data: {
								learningLanguages: learning.join(','),
								fluentLanguages: fluent.join(','),
							},
							success: success,
						});
					},
				},
			},
			onShown: function () {
				const $modal = $('.bootbox.modal');
				setupSelect2('#learning-languages', $modal, app.user.learningLanguages);
				setupSelect2('#fluent-languages', $modal, app.user.fluentLanguages);
			},
		});
	});

	$(window).on('action:ajaxify.end', function (ev, data) {
		if (data.tpl_url === 'account/edit') {
			setupSelect2('#user-learningLanguages', null, app.user.learningLanguages);
			setupSelect2('#user-fluentLanguages', null, app.user.fluentLanguages);
		}
	});
	$(window).on('action:profile.update', function (ev, data) {
		if (Array.isArray(data.learningLanguages)) {
			data.learningLanguages = data.learningLanguages.join(',');
		}
		if (Array.isArray(data.fluentLanguages)) {
			data.fluentLanguages = data.fluentLanguages.join(',');
		}
	});
});

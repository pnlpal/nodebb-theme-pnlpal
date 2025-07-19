$(window).on('action:topics.loaded', function () {
	if (!app.user?.uid) {
		return;
	}
	if (app.user.learningLanguages && app.user.fluentLanguages) {
		return; // User has already set their languages
	}
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
							learningLanguages: learning,
							fluentLanguages: fluent,
						},
						success: function (resp) {
							// handle success
						},
					});
				},
			},
		},
		onShown: function () {
			const $modal = $('.bootbox.modal');
			const $learning = $('#learning-languages');
			const $fluent = $('#fluent-languages');

			// Populate options from someLanguages array
			someLanguages.forEach(function (lang) {
				$learning.append($('<option>', { value: lang, text: lang }));
				$fluent.append($('<option>', { value: lang, text: lang }));
			});

			$learning.select2({
				tags: true,
				placeholder: 'Type or select languages...',
				width: 'resolve',
				dropdownParent: $modal,
			});
			$fluent.select2({
				tags: true,
				placeholder: 'Type or select languages...',
				width: 'resolve',
				dropdownParent: $modal,
			});
		},
	});
});

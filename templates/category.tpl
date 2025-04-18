<div data-widget-area="header">
	{{{ each widgets.header }}}
	{{widgets.header.html}}
	{{{ end }}}
</div>
<div class="row">
	<div data-widget-area="left" class="sticky-top col-lg-3 col-md-3 hidden-sm hidden-xs">
		{{{each widgets.left}}}
		{{widgets.left.html}}
		{{{end}}}
	</div>

	<div class="category {{{if widgets.sidebar.length }}}col-lg-6 col-md-9 col-sm-12{{{ else }}}col-lg-9 col-md-9{{{ end }}} <!-- IF isCaptionzTrove --> captionz-trove <!-- END --> <!-- IF isDictionariezTrove --> dictionariez-trove <!-- END -->">
		<!-- IMPORT partials/category/subcategory.tpl -->

		{{{ if (topics.length || privileges.topics:create) }}}
		<div class="topic-list-header visible-sm visible-xs sticky-top btn-toolbar justify-content-between py-2 mb-2 flex-nowrap">
			<div class="d-flex gap-1 align-items-stretch">
				{{{ if privileges.topics:create }}}
				<a href="{config.relative_path}/compose?cid={cid}" component="category/post" id="new_topic" class="btn btn-primary text-nowrap" data-ajaxify="false" role="button">[[category:new-topic-button]]</a>
				{{{ else }}}
					{{{ if !loggedIn }}}
					<a component="category/post/guest" href="{config.relative_path}/login" class="btn btn-primary">[[category:guest-login-post]]</a>
					{{{ end }}}
				{{{ end }}}

				<a href="{url}" class="d-inline-block">
					<div class="alert alert-warning h-100 m-0 px-2 py-1 d-flex gap-1 align-items-center hide" id="new-topics-alert"><i class="fa fa-fw fa-rotate-right"></i>[[recent:load-new-posts]]</div>
				</a>
			</div>
		</div>
		{{{ end }}}

		{{{ if (!topics.length && privileges.topics:create)}}}
		<hr class="visible-xs" />
		<div class="alert alert-warning" id="category-no-topics">
			[[category:no-topics]]
		</div>
		{{{ end }}}

		<!-- IMPORT partials/topics_list.tpl -->

		{{{ if config.usePagination }}}
		<!-- IMPORT partials/paginator.tpl -->
		{{{ end }}}
	</div>
	<div data-widget-area="sidebar" class="col-lg-3 col-md-12 col-sm-12 {{{ if !widgets.sidebar.length }}}hidden{{{ end }}}">
		{{{ each widgets.sidebar }}}
		{{widgets.sidebar.html}}
		{{{ end }}}
	</div>
</div>

<div data-widget-area="footer">
	{{{each widgets.footer}}}
	{{widgets.footer.html}}
	{{{end}}}
</div>

<!-- IF !config.usePagination -->
<noscript>
	<!-- IMPORT partials/paginator.tpl -->
</noscript>
<!-- ENDIF !config.usePagination -->

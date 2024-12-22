<!-- IMPORT partials/breadcrumbs.tpl -->
<div data-widget-area="header">
	{{{each widgets.header}}}
	{{widgets.header.html}}
	{{{end}}}
</div>
<div class="tag row">
	<div data-widget-area="left" class="sticky-top col-lg-3 col-md-3 hidden-sm hidden-xs">
		{{{each widgets.left}}}
		{{widgets.left.html}}
		{{{end}}}
	</div>
	<div class="col-lg-6 col-md-9 col-sm-12">
		<div class="topic-list-header visible-sm visible-xs sticky-top btn-toolbar justify-content-between py-2 mb-2 gap-1">
			<div class="d-flex gap-1 align-items-stretch">
				{{{ if loggedIn }}}
				<!-- IMPORT partials/buttons/newTopic.tpl -->
				{{{ else }}}
				<a component="category/post/guest" href="{config.relative_path}/login" class="btn btn-primary">[[category:guest-login-post]]</a>
				{{{ end }}}
			</div>
		</div>

		<div class="category">
			{{{ if !topics.length }}}
			<div class="alert alert-warning">[[tags:no-tag-topics]]</div>
			{{{ end }}}

			<!-- IMPORT partials/topics_list.tpl -->
			<button id="load-more-btn" class="btn btn-primary hide">[[unread:load-more]]</button>
			{{{ if config.usePagination }}}
			<!-- IMPORT partials/paginator.tpl -->
			{{{ end }}}
		</div>
	</div>
	<div data-widget-area="sidebar"
		class="col-lg-3 col-md-12 col-sm-12 {{{ if !widgets.sidebar.length }}}hidden{{{ end }}}">
		{{{ each widgets.sidebar }}}
		{{widgets.sidebar.html}}
		{{{ end }}}
	</div>
</div>

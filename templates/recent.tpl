<!-- IMPORT partials/breadcrumbs.tpl -->
<div data-widget-area="header">
	{{{each widgets.header}}}
	{{widgets.header.html}}
	{{{end}}}
</div>

<div class="recent row">
	<div data-widget-area="left" class="sticky-top col-lg-3 col-md-3 hidden-sm hidden-xs">
		{{{each widgets.left}}}
		{{widgets.left.html}}
		{{{end}}}
	</div>
	<div class="col-lg-6 col-md-9 col-sm-12">
		<div class="topic-list-header visible-sm visible-xs sticky-top btn-toolbar justify-content-between py-2 mb-2 gap-1">
			<div class="d-flex gap-1 align-items-stretch">
				<div class="visible-sm visible-xs">
					{{{ if canPost }}}
					<!-- IMPORT partials/buttons/newTopic.tpl -->
					{{{ else }}}
					<a component="category/post/guest" href="{config.relative_path}/login" class="btn btn-primary">[[category:guest-login-post]]</a>
					{{{ end }}}
				</div>
				<a href="{config.relative_path}/{selectedFilter.url}{querystring}" class="d-inline-block">
					<div class="alert alert-warning h-100 m-0 px-2 py-1 d-flex gap-1 align-items-center hide" id="new-topics-alert"><i class="fa fa-fw fa-rotate-right"></i>[[recent:load-new-posts]]</div>
				</a>
			</div>
		</div>

		<div class="category">
			<!-- IF !topics.length -->
			<div class="alert alert-warning" id="category-no-topics">[[recent:no-recent-topics]]</div>
			<!-- ENDIF !topics.length -->

			<!-- IMPORT partials/topics_list.tpl -->

			<!-- IF config.usePagination -->
				<!-- IMPORT partials/paginator.tpl -->
			<!-- ENDIF config.usePagination -->
		</div>
	</div>
	<div data-widget-area="sidebar"
		class="col-lg-3 col-md-12 col-sm-12 {{{ if !widgets.sidebar.length }}}hidden{{{ end }}}">
		{{{ each widgets.sidebar }}}
		{{widgets.sidebar.html}}
		{{{ end }}}
	</div>
</div>

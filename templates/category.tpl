<div data-widget-area="header">
	{{{each widgets.header}}}
	{{widgets.header.html}}
	{{{end}}}
</div>

<div class="row">
	<div data-widget-area="left" class="category-left col-lg-3 col-md-3 col-sm-3 hidden-xs">
		{{{each widgets.left}}}
		{{widgets.left.html}}
		{{{end}}}
	</div>

	<div class="category <!-- IF widgets.sidebar.length -->col-lg-6 col-md-6 col-sm-6<!-- ELSE -->col-lg-9 col-md-9 col-sm-9<!-- ENDIF widgets.sidebar.length --> <!-- IF isCaptionzTrove --> captionz-trove <!-- END --> <!-- IF isDictionariezTrove --> dictionariez-trove <!-- END -->">
		<!-- IF !topics.length -->
		<hr class="visible-xs" />
		<div class="alert alert-warning" id="category-no-topics">
			[[category:no_topics]]
		</div>
		<!-- ENDIF !topics.length -->
		
		<!-- IMPORT partials/topics_list.tpl -->

		<!-- IF config.usePagination -->
			<!-- IMPORT partials/paginator.tpl -->
		<!-- ENDIF config.usePagination -->
	</div>
	<div data-widget-area="sidebar" class="col-lg-3 col-md-3 col-sm-12 <!-- IF !widgets.sidebar.length -->hidden<!-- ENDIF !widgets.sidebar.length -->">
		{{{each widgets.sidebar}}}
		{{widgets.sidebar.html}}
		{{{end}}}
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

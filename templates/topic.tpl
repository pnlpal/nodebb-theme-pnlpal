<div data-widget-area="header">
	{{{each widgets.header}}}
	{{widgets.header.html}}
	{{{end}}}
</div>
<div class="row">
	<div class="topic <!-- IF widgets.sidebar.length -->col-lg-9 col-sm-12<!-- ELSE -->col-lg-12<!-- ENDIF widgets.sidebar.length -->">
		<div class="topic-header">
			<h1 component="post/header" class="" itemprop="name">
				<span class="topic-title" component="topic/title">
					<span component="topic/labels">
						<i component="topic/pinned" class="fa fa-thumb-tack <!-- IF !pinned -->hidden<!-- ENDIF !pinned -->" title="{{{ if !pinExpiry }}}[[topic:pinned]]{{{ else }}}[[topic:pinned-with-expiry, {pinExpiryISO}]]{{{ end }}}"></i>
						<i component="topic/locked" class="fa fa-lock <!-- IF !locked -->hidden<!-- ENDIF !locked -->" title="[[topic:locked]]"></i>
						<i class="fa fa-arrow-circle-right <!-- IF !oldCid -->hidden<!-- ENDIF !oldCid -->" title="{{{ if privileges.isAdminOrMod }}}[[topic:moved-from, {oldCategory.name}]]{{{ else }}}[[topic:moved]]{{{ end }}}"></i>
						{{{each icons}}}{@value}{{{end}}}
					</span>

					<!-- IF externalLink -->
					<a href="{externalLink}" rel="nofollow" target="_blank" itemprop="url" class="external-link" data-tid="{tid}">
						<i class="fa fa-external-link"></i>
						{title}
					</a>
					<!-- ELSE -->
					{title}
					<!-- ENDIF externalLink -->
				</span>
				
				<!-- IF category.isDictionariezTrove -->
				<div class="pull-right">
					<a href="https://github.com/pnlpal/dictionaries" target="_blank" rel="nofollow" 
						data-tid="{tid}"
						class="btn btn-sm btn-info add-to-dictionariez">Add to Dictionariez</a>
				</div>
				<!-- END -->
			</h1>

			<div class="topic-info clearfix">
				<div class="category-item inline-block">
					{{{ if category.icon }}}
					<div role="presentation" class="icon pull-left" style="{{{ if category.bgColor }}}background-color: {category.bgColor};{{{end}}}; {{{ if category.color}}}color: {category.color};{{{end}}}">
						<i class="fa fa-fw {category.icon}"></i>
					</div>
					{{{ end }}}
					<a href="{config.relative_path}/category/{category.slug}">{category.name}</a>

				</div>

				<div class="tags tag-list inline-block hidden-xs">
					<!-- IMPORT partials/topic/tags.tpl -->
				</div>
				<div class="inline-block hidden-xs">
					<!-- IMPORT partials/topic/stats.tpl -->
				</div>
				{{{ if !feeds:disableRSS }}}
				{{{ if rssFeedUrl }}}<a class="hidden-xs" target="_blank" href="{rssFeedUrl}"><i class="fa fa-rss-square"></i></a>{{{ end }}}
				{{{ end }}}

				<a class="need-share-button hidden-xs" href=""
				title="If you like this post, share it. It really helps!"
				data-share-networks="Twitter,Pinterest,Facebook,Reddit,Linkedin,Tumblr,mailto,Evernote,Wechat,Douban"
				>
					<i class="fa fa-share-alt"></i>
				</a>
				<!-- IMPORT partials/topic/browsing-users.tpl -->

				<!-- IMPORT partials/post_bar.tpl -->
			</div>
		</div>
		<!-- IF merger -->
		<div component="topic/merged/message" class="alert alert-warning clearfix">
			<span class="pull-left">[[topic:merged_message, {config.relative_path}/topic/{mergeIntoTid}, {merger.mergedIntoTitle}]]</span>
			<span class="pull-right">
				<a href="{config.relative_path}/user/{merger.userslug}">
					<strong>{merger.username}</strong>
				</a>
				<small class="timeago" title="{mergedTimestampISO}"></small>
			</span>
		</div>
		<!-- ENDIF merger -->

		<!-- IMPORT partials/topic/deleted-message.tpl -->

		<ul component="topic" class="posts" data-tid="{tid}" data-cid="{cid}">
			{{{each posts}}}
				<li component="post" class="{{{ if posts.deleted }}}deleted{{{ end }}} {{{ if posts.selfPost }}}self-post{{{ end }}} {{{ if posts.topicOwnerPost }}}topic-owner-post{{{ end }}}" <!-- IMPORT partials/data/topic.tpl -->>
					<a component="post/anchor" data-index="{posts.index}" id="{posts.index}"></a>

					<meta itemprop="datePublished" content="{posts.timestampISO}">
					<meta itemprop="dateModified" content="{posts.editedISO}">

					<!-- IMPORT partials/topic/post.tpl -->
				</li>
			{{{end}}}
		</ul>

		<!-- IF config.enableQuickReply -->
		<!-- IMPORT partials/topic/quickreply.tpl -->
		<!-- ENDIF config.enableQuickReply -->

		<!-- IF config.usePagination -->
		<!-- IMPORT partials/paginator.tpl -->
		<!-- ENDIF config.usePagination -->

		<div class="navigator-thumb text-center hidden">
			<strong class="text"></strong><br/>
			<span class="time"></span>
		</div>
		<div class="visible-xs visible-sm pagination-block text-center">
			<div class="progress-bar"></div>
			<div class="wrapper">
				<i class="fa fa-2x fa-angle-double-up pointer fa-fw pagetop"></i>
				<i class="fa fa-2x fa-angle-up pointer fa-fw pageup"></i>
				<span class="pagination-text"></span>
				<i class="fa fa-2x fa-angle-down pointer fa-fw pagedown"></i>
				<i class="fa fa-2x fa-angle-double-down pointer fa-fw pagebottom"></i>
			</div>
		</div>
	</div>
	<div data-widget-area="sidebar" class="col-lg-3 col-sm-12 <!-- IF !widgets.sidebar.length -->hidden<!-- ENDIF !widgets.sidebar.length -->">
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

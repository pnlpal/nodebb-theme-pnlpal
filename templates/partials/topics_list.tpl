<ul component="category" class="topic-list" itemscope itemtype="http://www.schema.org/ItemList" data-nextstart="{nextStart}" data-set="{set}">
	{{{each topics}}}
	<li component="category/topic" data-cid="{./cid}" class="row clearfix category-item {function.generateTopicClass}" <!-- IMPORT partials/data/category.tpl -->>
		<link itemprop="url" content="{config.relative_path}/topic/{../slug}" />
		<meta itemprop="name" content="{function.stripTags, ../title}" />
		<meta itemprop="itemListOrder" content="descending" />
		<meta itemprop="position" content="{increment(./index, "1")}" />
		<a id="{../index}" data-index="{../index}" component="topic/anchor"></a>

		<div class="col-md-12 col-sm-12 col-12 content">
			<div class="avatar float-start me-2">
				<!-- IF topics.videoThumb -->
				<a href="{config.relative_path}/topic/{./slug}" itemprop="url" class="video-thumb">
					<img src="{./videoThumb}" class="user-img not-responsive" />
					<!-- IF topics.playlistId -->
					<i class="fa fa-fw fa-list" data-content=""></i>
					<!-- ENDIF topics.playlistId -->
				</a>
				<!-- ELSE -->
				<a href="<!-- IF topics.user.userslug -->{config.relative_path}/user/{topics.user.userslug}<!-- ELSE -->#<!-- ENDIF topics.user.userslug -->" class="float-start">
					{{{ if ./thumbs.length }}}
					<img src="{./thumbs.0.url}" class="user-img not-responsive" />
					{{{ else }}}
					{buildAvatar(../user, "48px", true, "not-responsive")}
					{{{ end }}}
				</a>
				<!-- ENDIF topics.videoThumb -->
			</div>

			<h2 component="topic/header" class="title mb-1">
				<i component="topic/scheduled" class="fa fa-clock-o {{{ if !topics.scheduled }}}hidden{{{ end }}}" title="[[topic:scheduled]]"></i>
				<i component="topic/pinned" class="fa fa-thumb-tack {{{ if (topics.scheduled || !topics.pinned) }}}hidden{{{ end }}}" title="{{{ if !../pinExpiry }}}[[topic:pinned]]{{{ else }}}[[topic:pinned-with-expiry, {../pinExpiryISO}]]{{{ end }}}"></i>
				<i component="topic/locked" class="fa fa-lock {{{ if !topics.locked }}}hidden{{{ end }}}" title="[[topic:locked]]"></i>
				<i component="topic/moved" class="fa fa-arrow-circle-right {{{ if !topics.oldCid }}}hidden{{{ end }}}" title="[[topic:moved]]"></i>
				{{{each topics.icons}}}{@value}{{{end}}}

				{{{ if topics.noAnchor }}}
				<span>{./title}</span>
				{{{ else }}}

				<!-- IF topics.externalLink -->
				<a href="{./externalLink}" rel="nofollow" target="_blank" itemprop="url" class="external-link" data-tid="{./tid}">
					<i class="fa fa-external-link"></i>
				</a>
				<!-- ENDIF topics.externalLink -->

				<a class="topic-title" href="{config.relative_path}/topic/{./slug}{{{ if ./bookmark }}}/{./bookmark}{{{ end }}}">{./title}</a>
				{{{ end }}}
			</h2>
			<div class="info">
				<div class="post-content-wrapper" data-for-dictionariez="{./isDictionariezTrove}">
					<div>
						{topics.teaser.content}
					</div>
					<a href="{config.relative_path}/topic/{topics.slug}" class="fade-effect">
					</a>
				</div>

				<!-- IF !template.category -->
				<div class="category-item d-inline-block">
					{buildCategoryIcon(./category, "24px", "rounded-circle")}
					<a class="text-muted" href="{config.relative_path}/category/{topics.category.slug}">{topics.category.name}</a>
				</div>
				&bull;
				<!-- ENDIF !template.category -->
		
				<span data-tid="{./tid}" component="topic/tags" class="tag-list hidden-xs {{{ if !./tags.length }}}hidden{{{ end}}}">
					{{{ each ./tags }}}
					<!-- IMPORT partials/topic/tag.tpl -->
					{{{ end }}}
					&bull;
				</span>

				<span class="hidden-xs"><span class="timeago text-muted" title="{./timestampISO}"></span> &bull; <a class="text-muted" href="{{{ if ./user.userslug }}}{config.relative_path}/user/{./user.userslug}{{{ else }}}#{{{ end }}}">{./user.displayname}</a></span>

				<span class="visible-xs-inline timeago text-muted" title="{{{ if ./teaser.timestampISO }}}{./teaser.timestampISO}{{{ else }}}{./timestampISO}{{{ end }}}"></span>
			</div>

			<div class="stats-row info" data-pid="{./mainPid}">
				<div class="stats stats-votes">
					<!-- IF !reputation:disabled -->
					<a href="" class="upvote text-muted btn btn-light" component="post/upvote" data-upvoted="{./upvoted}">
						<!-- IF ./upvoted -->
							<i class="fa fa-heart"></i>
						<!-- ELSE -->
							<i class="fa fa-heart-o"></i>
						<!-- END -->
						<span class="human-readable-number" component="post/vote-count" title="{./votes}">{./votes}</span>
					</a>
					<!-- END -->
				</div>
		
				<div class="stats stats-postcount">
					<a href="{config.relative_path}/compose?tid={./tid}" class="text-muted btn btn-light">
						<i class="fa fa-comment-o"></i>
						<span class="human-readable-number" title="{./postcount}">{./postcount}</span>
					</a>
				</div>

				<div class="hidden-xs stats stats-share">
					<a href="" data-share-url="{config.relative_path}/topic/{./slug}" class="text-muted btn btn-light need-share-button"
					title="If you like this post, share it. It really helps!"
					data-share-networks="Twitter,Pinterest,Facebook,Reddit,Linkedin,Tumblr,mailto,Evernote,Wechat,Douban">
						<i class="fa fa-share-alt"></i>
					</a>
				</div>
			</div>
		</div>
	</li>
	{{{end}}}
</ul>

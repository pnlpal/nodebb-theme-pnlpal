<ul component="category" class="topic-list" itemscope itemtype="http://www.schema.org/ItemList" data-nextstart="{nextStart}" data-set="{set}">
	{{{each topics}}}
	<li component="category/topic" class="row clearfix category-item {function.generateTopicClass}" <!-- IMPORT partials/data/category.tpl -->>
		<link itemprop="url" content="{config.relative_path}/topic/{../slug}" />
		<meta itemprop="name" content="{function.stripTags, ../title}" />
		<meta itemprop="itemListOrder" content="descending" />
		<meta itemprop="position" content="{../index}" />
		<a id="{../index}" data-index="{../index}" component="topic/anchor"></a>

		<div class="col-md-12 col-sm-12 col-xs-12 content">
			<div class="avatar pull-left">
				<!-- IF showSelect -->
				<div class="select" component="topic/select">
					{{{ if ./thumbs.length }}}
					<img src="{./thumbs.0.url}" class="user-img not-responsive" />
					{{{ else }}}
					{buildAvatar(../user, "46", true, "not-responsive")}
					{{{ end }}}
					<i class="fa fa-check"></i>
				</div>
				<!-- ENDIF showSelect -->

				<!-- IF !showSelect -->
				<!-- IF topics.videoThumb -->
				<a href="{config.relative_path}/topic/{topics.slug}" itemprop="url" class="video-thumb">
					<img src="{topics.videoThumb}" class="user-img not-responsive" />
					<!-- IF topics.playlistId -->
					<i class="fa fa-fw fa-list" data-content=""></i>
					<!-- ENDIF topics.playlistId -->
				</a>
				<!-- ELSE -->
				<a href="<!-- IF topics.user.userslug -->{config.relative_path}/user/{topics.user.userslug}<!-- ELSE -->#<!-- ENDIF topics.user.userslug -->" class="pull-left">
					{{{ if ./thumbs.length }}}
					<img src="{./thumbs.0.url}" class="user-img not-responsive" />
					{{{ else }}}
					{buildAvatar(../user, "46", true, "not-responsive")}
					{{{ end }}}
				</a>
				<!-- ENDIF topics.videoThumb -->
				<!-- ENDIF !showSelect -->
			</div>

			<h2 component="topic/header" class="title">
				<i component="topic/scheduled" class="fa fa-clock-o <!-- IF !topics.scheduled -->hide<!-- ENDIF !topics.scheduled -->" title="[[topic:scheduled]]"></i>
				<i component="topic/pinned" class="fa fa-thumb-tack <!-- IF (topics.scheduled || !topics.pinned) -->hide<!-- ENDIF (topics.scheduled || !topics.pinned) -->" title="{{{ if !../pinExpiry }}}[[topic:pinned]]{{{ else }}}[[topic:pinned-with-expiry, {../pinExpiryISO}]]{{{ end }}}"></i>
				<i component="topic/locked" class="fa fa-lock <!-- IF !topics.locked -->hide<!-- ENDIF !topics.locked -->" title="[[topic:locked]]"></i>
				<i component="topic/moved" class="fa fa-arrow-circle-right <!-- IF !topics.oldCid -->hide<!-- ENDIF !topics.oldCid -->" title="[[topic:moved]]"></i>
				{{{each topics.icons}}}{@value}{{{end}}}


				<!-- IF !topics.noAnchor -->
					<!-- IF topics.externalLink -->
					<a href="{topics.externalLink}" rel="nofollow" target="_blank" itemprop="url" class="external-link" data-tid="{topics.tid}">
						<i class="fa fa-external-link"></i>
					</a>
					<!-- ENDIF topics.externalLink -->

					<a class="topic-title" href="{config.relative_path}/topic/{topics.slug}<!-- IF topics.bookmark -->/{topics.bookmark}<!-- ENDIF topics.bookmark -->" itemprop="url">{topics.title}</a><br />
				<!-- ELSE -->
				<span>{topics.title}</span><br />
				<!-- ENDIF !topics.noAnchor -->

				<!-- IF !template.category -->
				<!-- <small>
					<a href="{config.relative_path}/category/{topics.category.slug}"><span class="fa-stack fa-lg" style="{function.generateCategoryBackground, topics.category}"><i style="color:{topics.category.color};" class="fa {topics.category.icon} fa-stack-1x"></i></span> {topics.category.name}</a> &bull;
				</small> -->
				<!-- ENDIF !template.category -->
		
				<div class="post-content-wrapper">
					<div>
						{topics.teaser.content}
					</div>
					<a href="{config.relative_path}/topic/{topics.slug}" class="fade-effect">
					</a>
				</div>

				{{{ if topics.tags.length }}}
				<span class="tag-list hidden-xs">
					{{{each topics.tags}}}
					<a href="{config.relative_path}/tags/{topics.tags.valueEncoded}"><span class="tag tag-item tag-class-{topics.tags.class}">{topics.tags.valueEscaped}</span></a>
					{{{end}}}
					<small>&bull;</small>
				</span>
				{{{ end }}}

				<small class="hidden-xs"><span class="timeago" title="{topics.timestampISO}"></span> &bull; <a href="<!-- IF topics.user.userslug -->{config.relative_path}/user/{topics.user.userslug}<!-- ELSE -->#<!-- ENDIF topics.user.userslug -->">{topics.user.displayname}</a></small>
				<small class="visible-xs-inline">
					<!-- IF topics.teaser.timestamp -->
					<span class="timeago" title="{topics.teaser.timestampISO}"></span>
					<!-- ELSE -->
					<span class="timeago" title="{topics.timestampISO}"></span>
					<!-- ENDIF topics.teaser.timestamp -->
				</small>
			</h2>

			<div class="stats-row" data-pid="{topics.mainPid}">
				<div class="col-xs-4 col-sm-3 stats stats-votes">
					<!-- IF !reputation:disabled -->
					<a href="" class="upvote text-muted" component="post/upvote" data-upvoted="{topics.upvoted}">
						<!-- IF topics.upvoted -->
							<i class="fa fa-heart"></i>
						<!-- ELSE -->
							<i class="fa fa-heart-o"></i>
						<!-- END -->
						<span class="human-readable-number" component="post/vote-count" title="{topics.votes}">{topics.votes}</span>
					</a>
					<!-- END -->
				</div>
		
				<div class="col-xs-4 col-sm-3 stats stats-postcount">
					<a href="{config.relative_path}/compose?tid={topics.tid}" class="text-muted">
						<i class="fa fa-comment-o"></i>
						<span class="human-readable-number" title="{topics.postcount}">{topics.postcount}</span>
					</a>
				</div>
		
				<div class="col-xs-4 col-sm-3 stats stats-viewcount">
					<a href="{config.relative_path}/topic/{topics.slug}" class="text-muted">
						<i class="fa fa-eye"></i>
						<span class="human-readable-number" title="{topics.viewcount}">{topics.viewcount}</span>
					</a>
				</div>

				<div class="hidden-xs col-sm-3 stats stats-share">
					<a href="" data-share-url="{config.relative_path}/topic/{topics.slug}" class="text-muted need-share-button"
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

<ul component="category" class="topic-list captionz-trove" itemscope itemtype="http://www.schema.org/ItemList" data-nextstart="{nextStart}" data-set="{set}">
	<meta itemprop="itemListOrder" content="descending">
	{{{each topics}}}
	<li component="category/topic" class="row clearfix category-item {function.generateTopicClass}" <!-- IMPORT partials/data/category.tpl -->>
		<a id="{../index}" data-index="{../index}" component="topic/anchor"></a>
		<meta itemprop="name" content="{function.stripTags, title}">

		<div class="col-md-12 col-sm-12 col-xs-12 content">
			<div class="pull-left">
				<!-- IF topics.thumb -->
				<a href="{config.relative_path}/topic/{topics.slug}<!-- IF topics.bookmark -->/{topics.bookmark}<!-- ENDIF topics.bookmark -->" itemprop="url" class="video-thumb">
					<img src="{topics.thumb}" class="user-img not-responsive" />
					<!-- IF topics.playlistId -->
					<i class="fa fa-fw fa-list" data-content=""></i>
					<!-- ENDIF topics.playlistId -->
				</a>
				<!-- ELSE -->
				<a href="<!-- IF topics.user.userslug -->{config.relative_path}/user/{topics.user.userslug}<!-- ELSE -->#<!-- ENDIF topics.user.userslug -->" class="user-avatar">
					{buildAvatar(topics.user, "46", true, "not-responsive")}
				</a>
				<!-- ENDIF topics.thumb -->
			</div>

			<h2 component="topic/header" class="title">
				<i component="topic/pinned" class="fa fa-thumb-tack <!-- IF !topics.pinned -->hide<!-- ENDIF !topics.pinned -->" title="{{{ if !../pinExpiry }}}[[topic:pinned]]{{{ else }}}[[topic:pinned-with-expiry, {../pinExpiryISO}]]{{{ end }}}"></i>
				<i component="topic/locked" class="fa fa-lock <!-- IF !topics.locked -->hide<!-- ENDIF !topics.locked -->" title="[[topic:locked]]"></i>
				<i component="topic/moved" class="fa fa-arrow-circle-right <!-- IF !topics.oldCid -->hide<!-- ENDIF !topics.oldCid -->" title="[[topic:moved]]"></i>
				{{{each icons}}}{@value}{{{end}}}

				<!-- IF !topics.noAnchor -->
					<a href="{config.relative_path}/topic/{topics.slug}<!-- IF topics.bookmark -->/{topics.bookmark}<!-- ENDIF topics.bookmark -->" itemprop="url">{topics.title}</a><br />
				<!-- ELSE -->
				<span>{topics.title}</span><br />
				<!-- ENDIF !topics.noAnchor -->

				<!-- IF !template.category -->
				<!-- <small>
					<a href="{config.relative_path}/category/{topics.category.slug}"><span class="fa-stack fa-lg" style="{function.generateCategoryBackground, topics.category}"><i style="color:{topics.category.color};" class="fa {topics.category.icon} fa-stack-1x"></i></span> {topics.category.name}</a> &bull;
				</small> -->
				<!-- ENDIF !template.category -->

				<!-- IF topics.tags.length -->
				<span class="tag-list hidden-xs">
					{{{each topics.tags}}}
					<a href="{config.relative_path}/tags/{topics.tags.valueEscaped}"><span class="tag" style="<!-- IF topics.tags.color -->color: {topics.tags.color};<!-- ENDIF topics.tags.color --><!-- IF topics.tags.bgColor -->background-color: {topics.tags.bgColor};<!-- ENDIF topics.tags.bgColor -->">{topics.tags.valueEscaped}</span></a>
					{{{end}}}
					<small>&bull;</small>
				</span>
				<!-- ENDIF topics.tags.length -->

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
				<div class="col-xs-4 stats stats-votes">
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
		
				<div class="col-xs-4 stats stats-postcount">
					<a href="{config.relative_path}/compose?tid={topics.tid}" class="text-muted">
						<i class="fa fa-comment-o"></i>
						<span class="human-readable-number" title="{topics.postcount}">{topics.postcount}</span>
					</a>
				</div>
		
				<div class="col-xs-4 stats stats-viewcount">
					<a href="{config.relative_path}/topic/{topics.slug}" class="text-muted">
						<i class="fa fa-eye"></i>
						<span class="human-readable-number" title="{topics.viewcount}">{topics.viewcount}</span>
					</a>
				</div>
			</div>
		</div>
	</li>
	{{{end}}}
</ul>

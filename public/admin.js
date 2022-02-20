"use strict";

define("admin/plugins/pnlpal", ["settings"], function (Settings) {
  var ACP = {};

  ACP.init = function () {
    Settings.load("pnlpal", $(".persona-settings"));

    $("#save").on("click", function () {
      Settings.save("pnlpal", $(".persona-settings"));
    });
  };

  return ACP;
});

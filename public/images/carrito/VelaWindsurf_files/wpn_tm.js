var _rl_cn = _rl_cn || 0,
  _rl_ptc = ("https:" == window.location.protocol ? "https" : "http");
window._rl_ids = window._rl_ids || [];
window._rely = window._rely || [];
_rl_ids.push({
  pid: 1399,
  src: 0
});
_rely.send = _rely.send ? _rely.send : function() {};
(function() {
  var rl = document.createElement("script");
  rl.type = "text/javascript";
  rl.async = true;
  rl.src = _rl_ptc + "://api.retargetly.com/loader?id=" + _rl_ids[_rl_ids.length - 1].pid;
  rl.id = "rely-api-" + (_rl_cn++);
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(rl, s);
})();
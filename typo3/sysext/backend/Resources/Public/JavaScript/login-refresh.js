/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
import $ from"jquery";import AjaxRequest from"@typo3/core/ajax/ajax-request.js";import Notification from"@typo3/backend/notification.js";var MarkupIdentifiers;!function(e){e.loginrefresh="t3js-modal-loginrefresh",e.lockedModal="t3js-modal-backendlocked",e.loginFormModal="t3js-modal-backendloginform"}(MarkupIdentifiers||(MarkupIdentifiers={}));class LoginRefresh{constructor(){this.options={modalConfig:{backdrop:"static"}},this.intervalTime=60,this.intervalId=null,this.backendIsLocked=!1,this.isTimingOut=!1,this.$timeoutModal=null,this.$backendLockedModal=null,this.$loginForm=null,this.loginFramesetUrl="",this.logoutUrl="",this.submitForm=e=>{e.preventDefault();const o=this.$loginForm.find("form"),t=o.find("input[name=p_field]"),i=o.find("input[name=userident]"),s=t.val();if(""===s&&""===i.val())return Notification.error(TYPO3.lang["mess.refresh_login_failed"],TYPO3.lang["mess.refresh_login_emptyPassword"]),void t.focus();s&&(i.val(s),t.val(""));const a={login_status:"login"};$.each(o.serializeArray(),(function(e,o){a[o.name]=o.value})),new AjaxRequest(o.attr("action")).post(a).then((async e=>{(await e.resolve()).login.success?this.hideLoginForm():(Notification.error(TYPO3.lang["mess.refresh_login_failed"],TYPO3.lang["mess.refresh_login_failed_message"]),t.focus())}))},this.checkActiveSession=()=>{new AjaxRequest(TYPO3.settings.ajaxUrls.login_timedout).get().then((async e=>{const o=await e.resolve();o.login.locked?this.backendIsLocked||(this.backendIsLocked=!0,this.showBackendLockedModal()):this.backendIsLocked&&(this.backendIsLocked=!1,this.hideBackendLockedModal()),this.backendIsLocked||(o.login.timed_out||o.login.will_time_out)&&(o.login.timed_out?this.showLoginForm():this.showTimeoutModal())}))}}initialize(e){"object"==typeof e&&this.applyOptions(e),this.initializeTimeoutModal(),this.initializeBackendLockedModal(),this.initializeLoginForm(),this.startTask()}startTask(){if(null!==this.intervalId)return;let e=1e3*this.intervalTime;this.intervalId=setInterval(this.checkActiveSession,e)}stopTask(){clearInterval(this.intervalId),this.intervalId=null}setIntervalTime(e){this.intervalTime=Math.min(e,86400)}setLogoutUrl(e){this.logoutUrl=e}setLoginFramesetUrl(e){this.loginFramesetUrl=e}showTimeoutModal(){this.isTimingOut=!0,this.$timeoutModal.modal(this.options.modalConfig),this.$timeoutModal.modal("show"),this.fillProgressbar(this.$timeoutModal)}hideTimeoutModal(){this.isTimingOut=!1,this.$timeoutModal.modal("hide")}showBackendLockedModal(){this.$backendLockedModal.modal(this.options.modalConfig),this.$backendLockedModal.modal("show")}hideBackendLockedModal(){this.$backendLockedModal.modal("hide")}showLoginForm(){new AjaxRequest(TYPO3.settings.ajaxUrls.logout).get().then((()=>{TYPO3.configuration.showRefreshLoginPopup?this.showLoginPopup():(this.$loginForm.modal(this.options.modalConfig),this.$loginForm.modal("show"))}))}showLoginPopup(){const e=window.open(this.loginFramesetUrl,"relogin_"+Math.random().toString(16).slice(2),"height=450,width=700,status=0,menubar=0,location=1");e&&e.focus()}hideLoginForm(){this.$loginForm.modal("hide")}initializeBackendLockedModal(){this.$backendLockedModal=this.generateModal(MarkupIdentifiers.lockedModal),this.$backendLockedModal.find(".modal-header h4").text(TYPO3.lang["mess.please_wait"]),this.$backendLockedModal.find(".modal-body").append($("<p />").text(TYPO3.lang["mess.be_locked"])),this.$backendLockedModal.find(".modal-footer").remove(),$("body").append(this.$backendLockedModal)}initializeTimeoutModal(){this.$timeoutModal=this.generateModal(MarkupIdentifiers.loginrefresh),this.$timeoutModal.addClass("modal-severity-notice"),this.$timeoutModal.find(".modal-header h4").text(TYPO3.lang["mess.login_about_to_expire_title"]),this.$timeoutModal.find(".modal-body").append($("<p />").text(TYPO3.lang["mess.login_about_to_expire"]),$("<div />",{class:"progress"}).append($("<div />",{class:"progress-bar progress-bar-warning progress-bar-striped progress-bar-animated",role:"progressbar","aria-valuemin":"0","aria-valuemax":"100"}).append($("<span />",{class:"visually-hidden"})))),this.$timeoutModal.find(".modal-footer").append($("<button />",{class:"btn btn-default","data-action":"logout"}).text(TYPO3.lang["mess.refresh_login_logout_button"]).on("click",(()=>{top.location.href=this.logoutUrl})),$("<button />",{class:"btn btn-primary t3js-active","data-action":"refreshSession"}).text(TYPO3.lang["mess.refresh_login_refresh_button"]).on("click",(()=>{new AjaxRequest(TYPO3.settings.ajaxUrls.login_refresh).get().then((async e=>{const o=await e.resolve();this.hideTimeoutModal(),o.refresh.success||this.showLoginForm()}))}))),this.registerDefaultModalEvents(this.$timeoutModal),$("body").append(this.$timeoutModal)}initializeLoginForm(){if(TYPO3.configuration.showRefreshLoginPopup)return;this.$loginForm=this.generateModal(MarkupIdentifiers.loginFormModal),this.$loginForm.addClass("modal-notice");let e=String(TYPO3.lang["mess.refresh_login_title"]).replace("%s",TYPO3.configuration.username);this.$loginForm.find(".modal-header h4").text(e),this.$loginForm.find(".modal-body").append($("<p />").text(TYPO3.lang["mess.login_expired"]),$("<form />",{id:"beLoginRefresh",method:"POST",action:TYPO3.settings.ajaxUrls.login}).append($("<div />").append($("<input />",{type:"text",name:"username",class:"d-none",value:TYPO3.configuration.username}),$("<input />",{type:"hidden",name:"userident",id:"t3-loginrefresh-userident"})),$("<div />",{class:"form-group"}).append($("<input />",{type:"password",name:"p_field",autofocus:"autofocus",class:"form-control",placeholder:TYPO3.lang["mess.refresh_login_password"]})))),this.$loginForm.find(".modal-body .d-none").attr("autocomplete","username"),this.$loginForm.find(".modal-body .form-control").attr("autocomplete","current-password"),this.$loginForm.find(".modal-footer").append($("<a />",{href:this.logoutUrl,class:"btn btn-default"}).text(TYPO3.lang["mess.refresh_exit_button"]),$("<button />",{type:"submit",class:"btn btn-primary","data-action":"refreshSession",form:"beLoginRefresh"}).text(TYPO3.lang["mess.refresh_login_button"]).on("click",(()=>{this.$loginForm.find("form").trigger("submit")}))),this.registerDefaultModalEvents(this.$loginForm).on("submit",this.submitForm),$("body").append(this.$loginForm)}generateModal(e){return $("<div />",{id:e,class:"t3js-modal "+e+" modal modal-type-default modal-severity-notice modal-style-light modal-size-small fade"}).append($("<div />",{class:"modal-dialog"}).append($("<div />",{class:"modal-content"}).append($("<div />",{class:"modal-header"}).append($("<h4 />",{class:"modal-title"})),$("<div />",{class:"modal-body"}),$("<div />",{class:"modal-footer"}))))}fillProgressbar(e){if(!this.isTimingOut)return;let o=0;const t=e.find(".progress-bar"),i=t.children(".visually-hidden"),s=setInterval((()=>{const e=o>=100;!this.isTimingOut||e?(clearInterval(s),e&&(this.hideTimeoutModal(),this.showLoginForm()),o=0):o+=1;const a=o+"%";t.css("width",a),i.text(a)}),300)}registerDefaultModalEvents(e){return e.on("hidden.bs.modal",(()=>{this.startTask()})).on("shown.bs.modal",(()=>{this.stopTask(),this.$timeoutModal.find(".modal-footer .t3js-active").first().focus()})),e}applyOptions(e){void 0!==e.intervalTime&&this.setIntervalTime(e.intervalTime),void 0!==e.loginFramesetUrl&&this.setLoginFramesetUrl(e.loginFramesetUrl),void 0!==e.logoutUrl&&this.setLogoutUrl(e.logoutUrl)}}let loginRefreshObject;try{window.opener&&window.opener.TYPO3&&window.opener.TYPO3.LoginRefresh&&(loginRefreshObject=window.opener.TYPO3.LoginRefresh),parent&&parent.window.TYPO3&&parent.window.TYPO3.LoginRefresh&&(loginRefreshObject=parent.window.TYPO3.LoginRefresh),top&&top.TYPO3&&top.TYPO3.LoginRefresh&&(loginRefreshObject=top.TYPO3.LoginRefresh)}catch{}loginRefreshObject||(loginRefreshObject=new LoginRefresh,"undefined"!=typeof TYPO3&&(TYPO3.LoginRefresh=loginRefreshObject));export default loginRefreshObject;